import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Camera, 
  FileImage, 
  FileVideo, 
  Mic, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Zap,
  Eye,
  Clock,
  TrendingUp,
  Activity
} from "lucide-react";

interface AnalysisResult {
  is_authentic: boolean;
  authenticity: string;
  confidence: number;
  confidence_percentage: number;
  analysis_date: string;
  case_id: string;
  processing_time: string;
  key_findings: string[];
  detailed_analysis?: any;
  forensic_score: number;
  risk_level: string;
  recommendation: string;
  file_size?: number;
  file_name?: string;
  content_type?: string;
  analysis_engine?: string;
  security_classification?: string;
}

export default function UnifiedAnalysis() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 },
        audio: false 
      });
      setWebcamStream(stream);
      setIsWebcamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Webcam Error",
        description: "Unable to access webcam. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
      setIsWebcamActive(false);
    }
  };

  const captureWebcamImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        analyzeWebcamImage(imageData);
      }
    }
  };

  const analyzeWebcamImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-webcam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_data: imageData }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      setActiveTab("results");
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze webcam image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Use advanced analysis for comprehensive results
      const response = await fetch('/api/analyze-advanced', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      setActiveTab("results");
      
      toast({
        title: "Analysis Complete",
        description: `${selectedFile.name} analyzed successfully`,
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze file",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="h-5 w-5" />;
    if (type.startsWith('video/')) return <FileVideo className="h-5 w-5" />;
    if (type.startsWith('audio/')) return <Mic className="h-5 w-5" />;
    return <Upload className="h-5 w-5" />;
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'MINIMAL': return 'bg-green-500';
      case 'LOW': return 'bg-blue-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'HIGH': return 'bg-orange-500';
      case 'CRITICAL': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAuthenticityIcon = (isAuthentic: boolean) => {
    return isAuthentic ? (
      <CheckCircle className="h-6 w-6 text-green-500" />
    ) : (
      <AlertTriangle className="h-6 w-6 text-red-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Unified Media Analysis Center
          </h1>
          <p className="text-blue-200 text-lg">
            Advanced AI-powered forensic analysis for all media types
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </TabsTrigger>
            <TabsTrigger 
              value="webcam"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Camera className="h-4 w-4 mr-2" />
              Live Webcam
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4 mr-2" />
              Analysis History
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              disabled={!analysisResult}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  Advanced Media Upload & Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Upload images, videos, or audio files for comprehensive forensic analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-400 bg-blue-900/20'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        {getFileTypeIcon(selectedFile.type)}
                        <span className="text-white font-medium">{selectedFile.name}</span>
                      </div>
                      <div className="text-slate-400 text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={analyzeFile}
                          disabled={isAnalyzing}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isAnalyzing ? (
                            <>
                              <Activity className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Start Analysis
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedFile(null)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-16 w-16 text-slate-400 mx-auto" />
                      <div>
                        <p className="text-white text-lg mb-2">
                          Drag & Drop Files Here
                        </p>
                        <p className="text-slate-400 text-sm mb-4">
                          Supports JPEG, PNG, MP4, AVI, MP3, WAV files up to 10MB
                        </p>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*,video/*,audio/*"
                  className="hidden"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webcam" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-400" />
                  Live Webcam Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time deepfake detection and liveness verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-96 object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    {!isWebcamActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-white mb-4">Webcam Not Active</p>
                          <Button
                            onClick={startWebcam}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start Webcam
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {isWebcamActive && (
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={captureWebcamImage}
                        disabled={isAnalyzing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Activity className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Capture & Analyze
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={stopWebcam}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Stop Webcam
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Analysis History
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Previous analysis results and case history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">No analysis history available</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Complete an analysis to see results here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysisResult && (
              <>
                {/* Main Results Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Authenticity</p>
                          <p className="text-2xl font-bold text-white">
                            {analysisResult.authenticity}
                          </p>
                        </div>
                        {getAuthenticityIcon(analysisResult.is_authentic)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <p className="text-slate-400 text-sm">Confidence Score</p>
                        <p className="text-2xl font-bold text-white">
                          {analysisResult.confidence_percentage}%
                        </p>
                        <Progress 
                          value={analysisResult.confidence_percentage} 
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Risk Level</p>
                          <Badge 
                            className={`${getRiskLevelColor(analysisResult.risk_level)} text-white mt-2`}
                          >
                            {analysisResult.risk_level}
                          </Badge>
                        </div>
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div>
                        <p className="text-slate-400 text-sm">Forensic Score</p>
                        <p className="text-2xl font-bold text-white">
                          {analysisResult.forensic_score}/100
                        </p>
                        <p className="text-slate-400 text-xs mt-1">
                          Processing: {analysisResult.processing_time}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Key Findings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-48">
                        <ul className="space-y-2">
                          {analysisResult.key_findings.map((finding, index) => (
                            <li key={index} className="flex items-start gap-2 text-slate-300">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Case Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-400 text-sm">Case ID</p>
                          <p className="text-white font-mono text-sm">{analysisResult.case_id}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Analysis Date</p>
                          <p className="text-white text-sm">{analysisResult.analysis_date}</p>
                        </div>
                        {analysisResult.file_name && (
                          <div>
                            <p className="text-slate-400 text-sm">File Name</p>
                            <p className="text-white text-sm">{analysisResult.file_name}</p>
                          </div>
                        )}
                        {analysisResult.security_classification && (
                          <div>
                            <p className="text-slate-400 text-sm">Classification</p>
                            <Badge className="bg-blue-600 text-white">
                              {analysisResult.security_classification}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Technical Analysis */}
                {analysisResult.detailed_analysis && (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Technical Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(analysisResult.detailed_analysis).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <h4 className="text-blue-400 font-medium capitalize">
                              {key.replace(/_/g, ' ')}
                            </h4>
                            <p className="text-slate-300 text-sm">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommendation */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Security Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-300">{analysisResult.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Engine Info */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Analysis Engine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          {analysisResult.analysis_engine || 'SatyaAI Advanced v5.0'}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Powered by Claude Sonnet 4.0 with Quantum Enhancement
                        </p>
                      </div>
                      <Brain className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}