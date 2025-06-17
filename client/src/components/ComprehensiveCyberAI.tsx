import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Shield,
  Brain,
  Eye,
  Camera,
  Video,
  Mic,
  Upload,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  FileText,
  Database,
  Zap,
  Target,
  Layers,
  Network,
  Server,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Radar,
  Orbit,
  Sparkles,
  Crown,
  Fingerprint,
  Scale,
  Building,
  Clock,
  Info,
  Download,
  Bug
} from 'lucide-react';

interface DetectionResult {
  id: string;
  type: 'deepfake' | 'misinformation' | 'phishing' | 'malware' | 'identity_theft';
  confidence: number;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  timestamp: Date;
  source: string;
  metadata: any;
}

interface RealTimeMetrics {
  total_scans: number;
  threats_detected: number;
  accuracy_rate: number;
  processing_speed: string;
  active_monitors: number;
  blocked_attacks: number;
  deepfakes_detected: number;
  misinformation_flagged: number;
  phishing_prevented: number;
  identity_verifications: number;
}

export default function ComprehensiveCyberAI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<DetectionResult[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    total_scans: 15847,
    threats_detected: 1289,
    accuracy_rate: 98.7,
    processing_speed: '2.3s avg',
    active_monitors: 47,
    blocked_attacks: 8934,
    deepfakes_detected: 456,
    misinformation_flagged: 234,
    phishing_prevented: 389,
    identity_verifications: 567
  });

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        total_scans: prev.total_scans + Math.floor(Math.random() * 5) + 1,
        threats_detected: prev.threats_detected + (Math.random() > 0.8 ? 1 : 0),
        accuracy_rate: 98.5 + Math.random() * 0.5,
        blocked_attacks: prev.blocked_attacks + Math.floor(Math.random() * 3),
        deepfakes_detected: prev.deepfakes_detected + (Math.random() > 0.9 ? 1 : 0),
        misinformation_flagged: prev.misinformation_flagged + (Math.random() > 0.85 ? 1 : 0),
        phishing_prevented: prev.phishing_prevented + (Math.random() > 0.88 ? 1 : 0),
        identity_verifications: prev.identity_verifications + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // File upload handler
  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate AI analysis
    setTimeout(() => {
      const result: DetectionResult = {
        id: `analysis_${Date.now()}`,
        type: Math.random() > 0.7 ? 'deepfake' : 'misinformation',
        confidence: 85 + Math.random() * 15,
        threat_level: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        description: `Advanced AI analysis of ${file.name} completed. Multiple detection algorithms applied.`,
        recommendation: 'Further manual review recommended for verification.',
        timestamp: new Date(),
        source: file.name,
        metadata: {
          file_size: file.size,
          file_type: file.type,
          analysis_duration: '2.34s'
        }
      };

      setAnalysisResults(prev => [result, ...prev.slice(0, 9)]);
      setIsProcessing(false);
      setUploadProgress(0);
    }, 3000);
  };

  // URL analysis handler
  const analyzeUrl = async () => {
    if (!urlInput.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const result: DetectionResult = {
        id: `url_analysis_${Date.now()}`,
        type: 'phishing',
        confidence: 75 + Math.random() * 25,
        threat_level: Math.random() > 0.6 ? 'high' : 'medium',
        description: `URL security analysis completed for ${urlInput}`,
        recommendation: 'Block access and report to security team.',
        timestamp: new Date(),
        source: urlInput,
        metadata: {
          domain_age: '15 days',
          ssl_status: 'invalid',
          reputation_score: 2.1
        }
      };

      setAnalysisResults(prev => [result, ...prev.slice(0, 9)]);
      setIsProcessing(false);
      setUrlInput('');
    }, 2000);
  };

  // Text analysis handler
  const analyzeText = async () => {
    if (!textInput.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const result: DetectionResult = {
        id: `text_analysis_${Date.now()}`,
        type: 'misinformation',
        confidence: 88 + Math.random() * 12,
        threat_level: Math.random() > 0.7 ? 'high' : 'medium',
        description: 'Text sentiment and misinformation analysis completed',
        recommendation: 'Content requires fact-checking and source verification.',
        timestamp: new Date(),
        source: 'Text Input',
        metadata: {
          word_count: textInput.split(' ').length,
          sentiment_score: -0.3,
          credibility_indicators: 2
        }
      };

      setAnalysisResults(prev => [result, ...prev.slice(0, 9)]);
      setIsProcessing(false);
      setTextInput('');
    }, 1500);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deepfake': return <Camera className="w-4 h-4" />;
      case 'misinformation': return <AlertTriangle className="w-4 h-4" />;
      case 'phishing': return <Shield className="w-4 h-4" />;
      case 'malware': return <AlertTriangle className="w-4 h-4" />;
      case 'identity_theft': return <Fingerprint className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      <UnifiedSidebar />
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-3xl font-bold">SatyaAI Cyber Intelligence Hub</h1>
                  <p className="text-gray-400">Advanced AI-Powered Threat Detection & Analysis Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-4 h-4 mr-2" />
                  System Active
                </Badge>
                <Badge className="bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium AI
                </Badge>
              </div>
            </div>

            {/* Real-time Metrics Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-[#0ea5e9]/10 border-[#0ea5e9]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Radar className="w-8 h-8 text-[#0ea5e9]" />
                    <div>
                      <div className="text-white text-xl font-bold">{metrics.total_scans.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Total Scans</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{metrics.threats_detected}</div>
                      <div className="text-gray-400 text-sm">Threats Detected</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{metrics.accuracy_rate.toFixed(1)}%</div>
                      <div className="text-gray-400 text-sm">Accuracy Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{metrics.processing_speed}</div>
                      <div className="text-gray-400 text-sm">Avg Speed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{metrics.active_monitors}</div>
                      <div className="text-gray-400 text-sm">Active Monitors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
              <TabsTrigger value="dashboard" className="text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="deepfake" className="text-white">Deepfake Detection</TabsTrigger>
              <TabsTrigger value="misinformation" className="text-white">Misinformation</TabsTrigger>
              <TabsTrigger value="phishing" className="text-white">Phishing Guard</TabsTrigger>
              <TabsTrigger value="identity" className="text-white">Identity Forensics</TabsTrigger>
              <TabsTrigger value="analysis" className="text-white">Analysis Results</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Detection Categories */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#0ea5e9]" />
                      Detection Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">Deepfakes</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">{metrics.deepfakes_detected}</div>
                        <div className="text-gray-400 text-sm">Detected Today</div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                          <span className="text-white font-medium">Misinformation</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">{metrics.misinformation_flagged}</div>
                        <div className="text-gray-400 text-sm">Flagged Today</div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-red-400" />
                          <span className="text-white font-medium">Phishing</span>
                        </div>
                        <div className="text-2xl font-bold text-red-400">{metrics.phishing_prevented}</div>
                        <div className="text-gray-400 text-sm">Prevented Today</div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Fingerprint className="w-5 h-5 text-green-400" />
                          <span className="text-white font-medium">Identity</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">{metrics.identity_verifications}</div>
                        <div className="text-gray-400 text-sm">Verified Today</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#0ea5e9]" />
                      Quick Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Upload Media File</label>
                        <div 
                          className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-[#0ea5e9] transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <div className="text-gray-400">
                            {selectedFile ? selectedFile.name : 'Drop files here or click to upload'}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">
                            Supports images, videos, and audio files
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*,video/*,audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                        />
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="mt-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <div className="text-gray-400 text-sm mt-1">
                              Processing... {uploadProgress.toFixed(0)}%
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Analyze URL</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter URL to analyze..."
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                          <Button
                            onClick={analyzeUrl}
                            disabled={!urlInput.trim() || isProcessing}
                            className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                          >
                            <Search className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Analyze Text</label>
                        <Textarea
                          placeholder="Enter text content to analyze for misinformation..."
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white min-h-20"
                        />
                        <Button
                          onClick={analyzeText}
                          disabled={!textInput.trim() || isProcessing}
                          className="mt-2 w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                        >
                          {isProcessing ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <Brain className="w-4 h-4 mr-2" />
                          )}
                          Analyze Text
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Analysis Results */}
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#0ea5e9]" />
                    Recent Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {analysisResults.map((result, index) => (
                        <div key={result.id} className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(result.type)}
                              <span className="text-white font-medium">{result.source}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getThreatColor(result.threat_level)}>
                                {result.threat_level.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                {result.confidence.toFixed(1)}% confidence
                              </Badge>
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm mb-1">{result.description}</div>
                          <div className="text-gray-500 text-xs">
                            {result.timestamp.toLocaleTimeString()} • {result.recommendation}
                          </div>
                        </div>
                      ))}

                      {analysisResults.length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          <Eye className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                          <div className="text-white text-lg font-medium mb-2">No Analysis Results Yet</div>
                          <div className="text-gray-400">Upload a file or analyze a URL to get started</div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deepfake" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#0ea5e9]" />
                    Advanced Deepfake Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Detection Capabilities</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Face swap detection</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Voice cloning identification</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Lip-sync manipulation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Neural network artifacts</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">Temporal inconsistencies</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Analysis Metrics</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Detection Accuracy</span>
                              <span className="text-white">99.2%</span>
                            </div>
                            <Progress value={99.2} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Processing Speed</span>
                              <span className="text-white">1.8s avg</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">False Positive Rate</span>
                              <span className="text-white">0.3%</span>
                            </div>
                            <Progress value={3} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Alert className="bg-blue-500/10 border-blue-500/30">
                        <Info className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-gray-300">
                          Upload images, videos, or audio files for comprehensive deepfake analysis using our advanced neural networks.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Supported Formats</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {['JPEG', 'PNG', 'MP4', 'AVI', 'MP3', 'WAV', 'WEBM', 'MOV', 'AAC'].map((format) => (
                            <Badge key={format} variant="outline" className="text-center text-gray-400">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="misinformation" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    Misinformation Detection Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Advanced Misinformation Analysis</div>
                    <div className="text-gray-400 mb-6">Real-time fact-checking and credibility assessment</div>
                    <Button className="bg-yellow-600 hover:bg-yellow-600/80">
                      <FileText className="w-4 h-4 mr-2" />
                      Analyze Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phishing" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    Phishing Protection Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Advanced Phishing Detection</div>
                    <div className="text-gray-400 mb-6">URL analysis and email security scanning</div>
                    <Button className="bg-red-600 hover:bg-red-600/80">
                      <Globe className="w-4 h-4 mr-2" />
                      Scan URL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="identity" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-green-400" />
                    Identity Forensics Laboratory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <Fingerprint className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Digital Identity Analysis</div>
                    <div className="text-gray-400 mb-6">Biometric verification and identity forensics</div>
                    <Button className="bg-green-600 hover:bg-green-600/80">
                      <Users className="w-4 h-4 mr-2" />
                      Verify Identity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#0ea5e9]" />
                    Detailed Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {analysisResults.map((result) => (
                        <div key={result.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {getTypeIcon(result.type)}
                              <div>
                                <div className="text-white font-medium">{result.source}</div>
                                <div className="text-gray-400 text-sm">{result.type.replace('_', ' ').toUpperCase()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getThreatColor(result.threat_level)}>
                                {result.threat_level.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                {result.confidence.toFixed(1)}%
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="text-white text-sm font-medium mb-1">Analysis Result</div>
                              <div className="text-gray-400 text-sm">{result.description}</div>
                            </div>

                            <div>
                              <div className="text-white text-sm font-medium mb-1">Recommendation</div>
                              <div className="text-gray-400 text-sm">{result.recommendation}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-400">Confidence Score</div>
                                <div className="text-white font-medium">{result.confidence.toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-400">Analysis Time</div>
                                <div className="text-white font-medium">{result.timestamp.toLocaleTimeString()}</div>
                              </div>
                            </div>

                            {result.metadata && (
                              <div className="bg-gray-900/30 rounded-lg p-3">
                                <div className="text-white text-sm font-medium mb-2">Technical Details</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {Object.entries(result.metadata).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="text-gray-400">{key.replace('_', ' ')}: </span>
                                      <span className="text-gray-300">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {analysisResults.length === 0 && (
                        <div className="text-center text-gray-400 py-12">
                          <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <div className="text-white text-xl font-medium mb-2">No Analysis Results</div>
                          <div className="text-gray-400">Start analyzing content to see detailed results here</div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}