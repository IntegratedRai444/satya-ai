import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Video,
  Camera,
  Image,
  Mic,
  Play,
  Square,
  Download,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Upload,
  Scan,
  Eye
} from 'lucide-react';

interface AnalysisResult {
  is_authentic: boolean;
  authenticity: string;
  confidence: number;
  confidence_percentage: number;
  analysis_date: string;
  case_id: string;
  processing_time: string;
  key_findings: string[];
  detailed_analysis: any;
  forensic_score: number;
  risk_level: string;
  recommendation: string;
  user_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  analysis_type: 'image' | 'video' | 'audio';
  blockchain_validation?: {
    hash: string;
    timestamp: string;
    consensus_reached: boolean;
    validator_count: number;
  };
}

export default function RealTimeAnalysis() {
  const [selectedTab, setSelectedTab] = useState('webcam');
  const [isRecording, setIsRecording] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<'image' | 'video' | 'audio'>('image');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Analysis mutation
  const analysisMutation = useMutation({
    mutationFn: async (data: { file: Blob; type: string; userId?: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('type', data.type);
      if (data.userId) formData.append('userId', data.userId);

      return fetch('/api/analyze/media', {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
    },
    onSuccess: (result: AnalysisResult) => {
      setCurrentAnalysis(result);
      setAnalysisResults(prev => [result, ...prev.slice(0, 9)]);
      toast({
        title: "Analysis Complete",
        description: `Analysis completed with ${result.confidence_percentage}% confidence`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze media",
        variant: "destructive",
      });
    },
  });

  // Report generation mutation
  const reportMutation = useMutation({
    mutationFn: async (data: { analysisResult: AnalysisResult; format: 'pdf' | 'docx' }) => {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `SatyaAI_Analysis_Report_${data.analysisResult.case_id}.${data.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onSuccess: () => {
      toast({
        title: "Report Downloaded",
        description: "Analysis report has been downloaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Download Failed",
        description: error.message || "Failed to download report",
        variant: "destructive",
      });
    },
  });

  // Start webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use real-time analysis",
        variant: "destructive",
      });
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Capture frame for analysis
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const userId = `WEBCAM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        analysisMutation.mutate({
          file: blob,
          type: 'image',
          userId
        });
      }
    }, 'image/jpeg', 0.9);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Determine analysis type based on file type
      if (file.type.startsWith('image/')) {
        setAnalysisType('image');
      } else if (file.type.startsWith('video/')) {
        setAnalysisType('video');
      } else if (file.type.startsWith('audio/')) {
        setAnalysisType('audio');
      }
    }
  };

  // Analyze uploaded file
  const analyzeFile = () => {
    if (!selectedFile) return;

    const userId = `UPLOAD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    analysisMutation.mutate({
      file: selectedFile,
      type: analysisType,
      userId
    });
  };

  // Download report
  const downloadReport = (format: 'pdf' | 'docx') => {
    if (!currentAnalysis) return;
    
    reportMutation.mutate({
      analysisResult: currentAnalysis,
      format
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getAuthenticityIcon = (isAuthentic: boolean) => {
    return isAuthentic ? (
      <CheckCircle className="h-5 w-5 text-green-400" />
    ) : (
      <XCircle className="h-5 w-5 text-red-400" />
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Scan className="h-6 w-6 text-blue-400" />
            Real-Time Media Analysis Portal
          </CardTitle>
          <CardDescription className="text-blue-100">
            Advanced AI-powered analysis with webcam support and comprehensive reporting
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="webcam" className="data-[state=active]:bg-blue-600">
            <Camera className="h-4 w-4 mr-2" />
            Live Webcam
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-green-600">
            <Upload className="h-4 w-4 mr-2" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-purple-600">
            <Eye className="h-4 w-4 mr-2" />
            Analysis Results
          </TabsTrigger>
        </TabsList>

        {/* Webcam Analysis Tab */}
        <TabsContent value="webcam" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-400" />
                  Live Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={startWebcam}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                  <Button
                    onClick={stopWebcam}
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop Camera
                  </Button>
                </div>
                
                <Button
                  onClick={captureFrame}
                  disabled={analysisMutation.isPending || !streamRef.current}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {analysisMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Scan className="h-4 w-4 mr-2" />
                  )}
                  Analyze Current Frame
                </Button>
              </CardContent>
            </Card>

            {/* Real-time Results */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Live Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysisMutation.isPending ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                    <span className="ml-2 text-slate-300">Analyzing...</span>
                  </div>
                ) : currentAnalysis ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      {getAuthenticityIcon(currentAnalysis.is_authentic)}
                      <span className="text-white font-semibold">
                        {currentAnalysis.authenticity}
                      </span>
                      <Badge className={getRiskLevelColor(currentAnalysis.risk_level)}>
                        {currentAnalysis.risk_level.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Confidence</span>
                        <span className="text-white">{currentAnalysis.confidence_percentage}%</span>
                      </div>
                      <Progress value={currentAnalysis.confidence_percentage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Forensic Score</span>
                        <span className="text-white">{currentAnalysis.forensic_score}/100</span>
                      </div>
                      <Progress value={currentAnalysis.forensic_score} className="h-2" />
                    </div>

                    <div className="bg-slate-900 p-3 rounded">
                      <h4 className="text-white font-medium mb-2">Key Findings:</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {currentAnalysis.key_findings.slice(0, 3).map((finding, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5">•</span>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadReport('pdf')}
                        disabled={reportMutation.isPending}
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        onClick={() => downloadReport('docx')}
                        disabled={reportMutation.isPending}
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        DOC
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    Capture a frame to start analysis
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* File Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-400" />
                  Media Upload & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Select Media File</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileUpload}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Analysis Type</Label>
                  <Select value={analysisType} onValueChange={(value: any) => setAnalysisType(value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">
                        <div className="flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          Image Analysis
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video Analysis
                        </div>
                      </SelectItem>
                      <SelectItem value="audio">
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          Audio Analysis
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedFile && (
                  <div className="bg-slate-900 p-3 rounded">
                    <h4 className="text-white font-medium mb-2">Selected File:</h4>
                    <div className="text-slate-300 text-sm space-y-1">
                      <div>Name: {selectedFile.name}</div>
                      <div>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      <div>Type: {selectedFile.type}</div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={analyzeFile}
                  disabled={!selectedFile || analysisMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {analysisMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Scan className="h-4 w-4 mr-2" />
                  )}
                  Analyze Media
                </Button>
              </CardContent>
            </Card>

            {/* Upload Results */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysisMutation.isPending ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 text-green-400 animate-spin" />
                    <span className="ml-2 text-slate-300">Processing media...</span>
                  </div>
                ) : currentAnalysis ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      {getAuthenticityIcon(currentAnalysis.is_authentic)}
                      <span className="text-white font-semibold">
                        {currentAnalysis.authenticity}
                      </span>
                      <Badge className={getRiskLevelColor(currentAnalysis.risk_level)}>
                        {currentAnalysis.risk_level.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Case ID:</span>
                        <div className="text-white font-mono">{currentAnalysis.case_id}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">User ID:</span>
                        <div className="text-white font-mono">{currentAnalysis.user_id}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Processing Time:</span>
                        <div className="text-white">{currentAnalysis.processing_time}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">File Size:</span>
                        <div className="text-white">{(currentAnalysis.file_size / 1024).toFixed(2)} KB</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Confidence Level</span>
                        <span className="text-white">{currentAnalysis.confidence_percentage}%</span>
                      </div>
                      <Progress value={currentAnalysis.confidence_percentage} className="h-2" />
                    </div>

                    <div className="bg-slate-900 p-3 rounded">
                      <h4 className="text-white font-medium mb-2">Recommendation:</h4>
                      <p className="text-slate-300 text-sm">{currentAnalysis.recommendation}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadReport('pdf')}
                        disabled={reportMutation.isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        onClick={() => downloadReport('docx')}
                        disabled={reportMutation.isPending}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download DOC
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    Upload a file to start analysis
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis History Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-400" />
                Analysis History
              </CardTitle>
              <CardDescription className="text-slate-300">
                Recent analysis results with downloadable reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResults.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  No analysis results yet
                </div>
              ) : (
                <div className="space-y-4">
                  {analysisResults.map((result) => (
                    <div key={result.case_id} className="border border-slate-600 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getAuthenticityIcon(result.is_authentic)}
                            <span className="text-white font-semibold">{result.authenticity}</span>
                            <Badge className={getRiskLevelColor(result.risk_level)}>
                              {result.risk_level.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {result.analysis_type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-slate-300 text-sm space-y-1">
                            <div>Case ID: {result.case_id}</div>
                            <div>User ID: {result.user_id}</div>
                            <div>Confidence: {result.confidence_percentage}%</div>
                            <div>Analysis Date: {new Date(result.analysis_date).toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setCurrentAnalysis(result);
                              downloadReport('pdf');
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setCurrentAnalysis(result);
                              downloadReport('docx');
                            }}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}