import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Upload,
  FileImage,
  Video,
  Mic,
  Camera,
  CheckCircle,
  Shield,
  Loader2,
  Download,
  Eye,
  Settings,
  AlertTriangle,
  Info,
  FileText,
  Clock,
  BarChart3
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
  detailed_analysis: {
    multimodal_assessment: string;
    neural_network_analysis: string;
    quantum_processing: string;
    forensic_validation: string;
    biometric_verification: string;
    temporal_consistency: string;
    spectral_analysis: string;
    metadata_forensics: string;
    ai_generation_detection: string;
    deepfake_signatures: string;
  };
  forensic_score: number;
  risk_level: string;
  recommendation: string;
  file_name: string;
  file_size: number;
  file_type: string;
}

export default function AdvancedAnalysisInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisType, setAnalysisType] = useState<'image' | 'video' | 'audio' | 'webcam'>('image');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Analysis mutation
  const analysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('analysis_type', analysisType);

      const response = await fetch('/api/analyze-advanced', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      return response.json();
    },
    onSuccess: (result) => {
      setAnalysisResult(result);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Media analyzed with ${result.confidence_percentage}% confidence`
      });
    },
    onError: (error: any) => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze media",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalysis = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    analysisMutation.mutate(selectedFile);
  };

  const getAnalysisTypeConfig = (type: string) => {
    switch (type) {
      case 'image':
        return {
          icon: FileImage,
          title: 'Image Analysis',
          description: 'Detect manipulated photos & generated images',
          features: ['Photoshop Detection', 'GAN Detection', 'Metadata Analysis'],
          accuracy: '98.2%'
        };
      case 'video':
        return {
          icon: Video,
          title: 'Video Verification',
          description: 'Identify deepfake videos & facial manipulations',
          features: ['Facial Inconsistencies', 'Temporal Analysis', 'Lip-Sync Verification'],
          accuracy: '96.8%'
        };
      case 'audio':
        return {
          icon: Mic,
          title: 'Audio Detection',
          description: 'Uncover voice cloning & synthetic speech',
          features: ['Voice Cloning Detection', 'Natural Patterns Analysis', 'Neural Voice Filter'],
          accuracy: '95.3%'
        };
      case 'webcam':
        return {
          icon: Camera,
          title: 'Live Webcam',
          description: 'Real-time deepfake analysis & verification',
          features: ['Live Deepfake Alert', 'Facial Authentication', 'Low-Light Analysis'],
          accuracy: '97.7%'
        };
      default:
        return {
          icon: FileImage,
          title: 'Analysis',
          description: 'Advanced media analysis',
          features: [],
          accuracy: '98%'
        };
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    if (confidence >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAuthenticityBadge = (isAuthentic: boolean, confidence: number) => {
    if (isAuthentic) {
      return (
        <Badge className="bg-green-600 text-white text-lg px-4 py-2">
          ✓ AUTHENTIC
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-600 text-white text-lg px-4 py-2">
          ⚠ SUSPICIOUS
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-400" />
              Deepfake Detection Tools
            </div>
            <Badge className="bg-blue-600 text-white">
              Using Neural Vision v4.2 models
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Choose your media type for comprehensive analysis
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Analysis Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(['image', 'video', 'audio', 'webcam'] as const).map((type) => {
          const config = getAnalysisTypeConfig(type);
          const IconComponent = config.icon;
          const isSelected = analysisType === type;
          
          return (
            <Card 
              key={type}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-slate-700 border-blue-500 ring-2 ring-blue-400' 
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500'
              }`}
              onClick={() => setAnalysisType(type)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-2">
                  <IconComponent className="h-12 w-12 text-blue-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-white text-lg">{config.title}</CardTitle>
                  <Badge className="bg-green-600 text-white text-xs">
                    Accuracy {config.accuracy}
                  </Badge>
                </div>
                <CardDescription className="text-slate-300 text-sm">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {config.features.map((feature, index) => (
                    <li key={index} className="text-slate-400 text-xs flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-4 ${
                    isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (type === 'webcam') {
                      // Handle webcam analysis
                      toast({
                        title: "Webcam Analysis",
                        description: "Live webcam analysis feature coming soon"
                      });
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  START ANALYSIS →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* File Upload */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept={analysisType === 'image' ? 'image/*' : analysisType === 'video' ? 'video/*' : 'audio/*'}
        className="hidden"
      />

      {/* File Info */}
      {selectedFile && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileImage className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{selectedFile.name}</div>
                  <div className="text-slate-400 text-sm">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Results Header */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">Advanced Analysis</CardTitle>
                    <CardDescription className="text-slate-300">
                      {analysisResult.file_name} • Image analysis • Analyzed on {new Date(analysisResult.analysis_date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-center">
                  {getAuthenticityBadge(analysisResult.is_authentic, analysisResult.confidence)}
                  <div className="mt-2">
                    <div className={`text-4xl font-bold ${getConfidenceColor(analysisResult.confidence_percentage)}`}>
                      {analysisResult.confidence_percentage}%
                    </div>
                    <div className="text-slate-400 text-sm">Confidence Score</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Analysis Details */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                <Eye className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-purple-600">
                <Settings className="h-4 w-4 mr-2" />
                Technical Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Summary */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-green-400 mb-2">
                        {analysisResult.is_authentic ? 'AUTHENTIC MEDIA' : 'SUSPICIOUS MEDIA'}
                      </div>
                      <div className="text-slate-300">
                        {analysisResult.is_authentic 
                          ? `No signs of manipulation detected with ${analysisResult.confidence_percentage}% confidence.`
                          : `Potential manipulation detected with ${analysisResult.confidence_percentage}% confidence.`
                        }
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Overall Confidence</span>
                        <span className={`font-bold ${getConfidenceColor(analysisResult.confidence_percentage)}`}>
                          {analysisResult.confidence_percentage}%
                        </span>
                      </div>
                      <Progress value={analysisResult.confidence_percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Key Findings */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.key_findings.map((finding, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mt-0.5">
                            {index + 1}
                          </div>
                          <div className="text-slate-300 text-sm">{finding}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Metrics */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Analysis Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{analysisResult.forensic_score}</div>
                      <div className="text-slate-400 text-sm">Forensic Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{analysisResult.processing_time}</div>
                      <div className="text-slate-400 text-sm">Processing Time</div>
                    </div>
                    <div className="text-center">
                      <Badge className={`text-lg px-3 py-1 ${
                        analysisResult.risk_level === 'LOW' ? 'bg-green-600' :
                        analysisResult.risk_level === 'MEDIUM' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {analysisResult.risk_level}
                      </Badge>
                      <div className="text-slate-400 text-sm mt-1">Risk Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-400" />
                    Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-300">
                    {analysisResult.recommendation}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Technical Analysis Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(analysisResult.detailed_analysis).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="text-white font-medium capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-slate-300 text-sm bg-slate-700 p-3 rounded">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* File Metadata */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">File Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm">File Name</div>
                      <div className="text-white">{analysisResult.file_name}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">File Size</div>
                      <div className="text-white">{formatFileSize(analysisResult.file_size)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">File Type</div>
                      <div className="text-white">{analysisResult.file_type}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Case ID</div>
                      <div className="text-white">{analysisResult.case_id}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="border-slate-600">
              <FileText className="h-4 w-4 mr-2" />
              Generate Certificate
            </Button>
            <Button variant="outline" className="border-slate-600">
              <Clock className="h-4 w-4 mr-2" />
              Analysis History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}