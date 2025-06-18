import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Camera,
  Video,
  Mic,
  Link,
  Phone,
  Mail,
  Smartphone,
  FileText,
  Globe,
  Upload,
  Zap,
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Scan,
  Brain
} from 'lucide-react';

interface AnalysisResult {
  id: string;
  isAuthentic: boolean;
  confidence: number;
  verdict: string;
  analysisType: string;
  processingTime: string;
  keyFindings: string[];
  riskLevel: string;
  recommendations: string[];
  detailedAnalysis?: any;
}

export default function UnifiedAnalysisPortal() {
  const [activeTab, setActiveTab] = useState('image');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [appInput, setAppInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [newsInput, setNewsInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  // Image Analysis Mutation
  const imageAnalysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return apiRequest('POST', '/api/ultra-detect', formData);
    },
    onSuccess: (data: AnalysisResult) => {
      setAnalysisResults(prev => [data, ...prev]);
      toast({
        title: "Image Analysis Complete",
        description: `Analysis completed with ${data.confidence}% confidence`
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Video Analysis Mutation
  const videoAnalysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('video', file);
      return apiRequest('POST', '/api/3d-enterprise/video-analysis', formData);
    },
    onSuccess: (data: AnalysisResult) => {
      setAnalysisResults(prev => [data, ...prev]);
      toast({
        title: "Video Analysis Complete",
        description: `Video analysis completed successfully`
      });
    },
    onError: (error) => {
      toast({
        title: "Video Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Audio Analysis Mutation
  const audioAnalysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('audio', file);
      return apiRequest('POST', '/api/soundscape/audio-analysis', formData);
    },
    onSuccess: (data) => {
      setAnalysisResults(prev => [data, ...prev]);
      toast({
        title: "Audio Analysis Complete",
        description: `Audio analysis completed successfully`
      });
    },
    onError: (error) => {
      toast({
        title: "Audio Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Legitimacy Analysis Mutation
  const legitimacyAnalysisMutation = useMutation({
    mutationFn: async ({ type, input }: { type: string; input: string }) => {
      return apiRequest('POST', '/api/legitimacy-analyzer', { type, input });
    },
    onSuccess: (data) => {
      setAnalysisResults(prev => [data, ...prev]);
      toast({
        title: "Legitimacy Analysis Complete",
        description: `Analysis completed with verdict: ${data.verdict}`
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const analyzeImage = () => {
    if (imageFile) {
      imageAnalysisMutation.mutate(imageFile);
    }
  };

  const analyzeVideo = () => {
    if (videoFile) {
      videoAnalysisMutation.mutate(videoFile);
    }
  };

  const analyzeAudio = () => {
    if (audioFile) {
      audioAnalysisMutation.mutate(audioFile);
    }
  };

  const analyzeLegitimacy = (type: string, input: string) => {
    if (input.trim()) {
      legitimacyAnalysisMutation.mutate({ type, input: input.trim() });
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getVerdict = (isAuthentic: boolean) => {
    return isAuthentic ? 'Authentic' : 'Suspicious';
  };

  const getVerdictIcon = (isAuthentic: boolean) => {
    return isAuthentic ? (
      <CheckCircle className="w-5 h-5 text-green-400" />
    ) : (
      <XCircle className="w-5 h-5 text-red-400" />
    );
  };

  const analysisTypes = [
    { id: 'image', label: 'Image Analysis', icon: Camera, description: 'Deep fake detection & authenticity verification' },
    { id: 'video', label: 'Video Analysis', icon: Video, description: 'Video manipulation & deepfake detection' },
    { id: 'audio', label: 'Audio Analysis', icon: Mic, description: 'Voice cloning & audio manipulation detection' },
    { id: 'url', label: 'URL Analysis', icon: Link, description: 'Website legitimacy & threat assessment' },
    { id: 'phone', label: 'Phone Analysis', icon: Phone, description: 'Phone number verification & scam detection' },
    { id: 'email', label: 'Email Analysis', icon: Mail, description: 'Email authenticity & phishing detection' },
    { id: 'app', label: 'App Analysis', icon: Smartphone, description: 'Mobile app security & legitimacy check' },
    { id: 'text', label: 'Text Analysis', icon: FileText, description: 'Content authenticity & misinformation detection' },
    { id: 'news', label: 'News Analysis', icon: Globe, description: 'News article verification & fact checking' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
            <Scan className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Unified Analysis Portal
            </h1>
            <p className="text-slate-400">Comprehensive AI-powered detection & verification system</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Analysis Panel */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Multi-Modal Analysis Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-1 h-auto p-1 bg-slate-800">
                  {analysisTypes.map((type) => (
                    <TabsTrigger
                      key={type.id}
                      value={type.id}
                      className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-xs">{type.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Image Analysis */}
                <TabsContent value="image" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Image Deepfake Detection</h3>
                  </div>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-400 mb-2">Upload image for analysis</p>
                      <p className="text-sm text-slate-500">Supports JPG, PNG, WebP formats</p>
                    </label>
                  </div>
                  {imageFile && (
                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                      <span className="text-sm">{imageFile.name}</span>
                      <Button
                        onClick={analyzeImage}
                        disabled={imageAnalysisMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {imageAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Image'}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Video Analysis */}
                <TabsContent value="video" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Video className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Video Authenticity Verification</h3>
                  </div>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Video className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-400 mb-2">Upload video for analysis</p>
                      <p className="text-sm text-slate-500">Supports MP4, AVI, MOV formats</p>
                    </label>
                  </div>
                  {videoFile && (
                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                      <span className="text-sm">{videoFile.name}</span>
                      <Button
                        onClick={analyzeVideo}
                        disabled={videoAnalysisMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {videoAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Video'}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Audio Analysis */}
                <TabsContent value="audio" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Mic className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Audio Manipulation Detection</h3>
                  </div>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="hidden"
                      id="audio-upload"
                    />
                    <label htmlFor="audio-upload" className="cursor-pointer">
                      <Mic className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-400 mb-2">Upload audio for analysis</p>
                      <p className="text-sm text-slate-500">Supports MP3, WAV, M4A formats</p>
                    </label>
                  </div>
                  {audioFile && (
                    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                      <span className="text-sm">{audioFile.name}</span>
                      <Button
                        onClick={analyzeAudio}
                        disabled={audioAnalysisMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {audioAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Audio'}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* URL Analysis */}
                <TabsContent value="url" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Link className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">URL Legitimacy Check</h3>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter URL to analyze (e.g., https://example.com)"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('url', urlInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !urlInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze URL'}
                    </Button>
                  </div>
                </TabsContent>

                {/* Phone Analysis */}
                <TabsContent value="phone" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Phone Number Verification</h3>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter phone number (e.g., +1-555-123-4567)"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('phone', phoneInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !phoneInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Phone'}
                    </Button>
                  </div>
                </TabsContent>

                {/* Email Analysis */}
                <TabsContent value="email" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Email Authenticity Check</h3>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter email address to verify"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('email', emailInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !emailInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Email'}
                    </Button>
                  </div>
                </TabsContent>

                {/* App Analysis */}
                <TabsContent value="app" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">App Security Check</h3>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter app name or store link"
                      value={appInput}
                      onChange={(e) => setAppInput(e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('app', appInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !appInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze App'}
                    </Button>
                  </div>
                </TabsContent>

                {/* Text Analysis */}
                <TabsContent value="text" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Text Content Verification</h3>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter text content to analyze for authenticity and misinformation"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      className="bg-slate-800 border-slate-700 min-h-[100px]"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('text', textInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !textInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze Text'}
                    </Button>
                  </div>
                </TabsContent>

                {/* News Analysis */}
                <TabsContent value="news" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">News Article Verification</h3>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter news article URL or content for fact-checking"
                      value={newsInput}
                      onChange={(e) => setNewsInput(e.target.value)}
                      className="bg-slate-800 border-slate-700 min-h-[100px]"
                    />
                    <Button
                      onClick={() => analyzeLegitimacy('news', newsInput)}
                      disabled={legitimacyAnalysisMutation.isPending || !newsInput.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {legitimacyAnalysisMutation.isPending ? 'Analyzing...' : 'Analyze News'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResults.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400">No analyses yet</p>
                  <p className="text-sm text-slate-500">Upload content or enter data to begin</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {analysisResults.map((result, index) => (
                    <Card key={result.id} className="bg-slate-800 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getVerdictIcon(result.isAuthentic)}
                            <span className="font-semibold">{getVerdict(result.isAuthentic)}</span>
                          </div>
                          <Badge variant="outline" className={getRiskColor(result.riskLevel)}>
                            {result.riskLevel || 'Unknown'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Confidence</span>
                            <span className="text-sm font-medium">{result.confidence}%</span>
                          </div>
                          <Progress value={result.confidence} className="h-2" />
                        </div>

                        <div className="mt-3 text-sm">
                          <p className="text-slate-300">{result.verdict}</p>
                          {result.keyFindings && result.keyFindings.length > 0 && (
                            <div className="mt-2">
                              <p className="text-slate-400 text-xs">Key Findings:</p>
                              <ul className="text-xs text-slate-300 mt-1 space-y-1">
                                {result.keyFindings.slice(0, 3).map((finding, i) => (
                                  <li key={i} className="flex items-start gap-1">
                                    <span className="text-blue-400">•</span>
                                    {finding}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-700">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {result.processingTime}
                          </span>
                          <span className="capitalize">{result.analysisType}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}