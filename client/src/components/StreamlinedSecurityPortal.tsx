import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Shield, 
  Eye, 
  Users,
  Settings,
  Bot,
  BarChart3,
  Globe,
  BookOpen,
  Play,
  MessageCircle,
  Lock,
  Crown,
  Zap,
  Brain,
  Target,
  Activity,
  GraduationCap,
  Search,
  Network,
  Server,
  Download,
  FileText,
  User,
  Clock
} from 'lucide-react';
import BlockchainSecurityNetwork from './BlockchainSecurityNetwork';

interface AnalysisResult {
  is_authentic: boolean;
  confidence_percentage: number;
  key_findings: string[];
  user_id: string;
  case_id: string;
  analysis_date: string;
  processing_time: string;
  forensic_score: number;
  risk_level: string;
  recommendation: string;
  detailed_analysis?: any;
}

export default function StreamlinedSecurityPortal() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [userLayer] = useState<'layer1' | 'layer2' | 'layer3' | 'layer4'>('layer1'); // In real app, get from context
  const { toast } = useToast();

  const analyzeFileMutation = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      // Generate random user ID
      const userId = `USER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      formData.append('userId', userId);
      
      return apiRequest('POST', '/api/analyze/media', formData);
    },
    onSuccess: (data: any) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: `Analysis completed for User ID: ${data.user_id}. Confidence: ${data.confidence_percentage}%`,
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

  const generatePDFReport = async () => {
    if (!analysisResult) return;

    try {
      const response = await apiRequest('POST', '/api/generate-report', {
        analysisResult,
        format: 'pdf'
      });

      // Create download link
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SatyaAI_Analysis_Report_${analysisResult.case_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: "PDF report has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "Failed to generate PDF report",
        variant: "destructive",
      });
    }
  };

  const generateDocReport = async () => {
    if (!analysisResult) return;

    try {
      const response = await apiRequest('POST', '/api/generate-report', {
        analysisResult,
        format: 'docx'
      });

      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SatyaAI_Analysis_Report_${analysisResult.case_id}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: "Word document report has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "Failed to generate Word document report",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeFileMutation.mutate({ file, type });
    }
  };

  const hasAccess = (requiredLayer: string) => {
    const layerLevels = { layer1: 1, layer2: 2, layer3: 3, layer4: 4 };
    return layerLevels[userLayer] >= layerLevels[requiredLayer as keyof typeof layerLevels];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            SatyaAI Security Portal
          </h1>
          <p className="text-blue-200 text-lg">
            Unified AI-powered cybersecurity analysis and threat detection platform
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="bg-blue-600">Current Access: Layer 1 - Community Guardian</Badge>
          </div>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              Security Analysis
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-cyan-600">
              <Network className="h-4 w-4 mr-2" />
              Blockchain Network
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-green-600">
              <Brain className="h-4 w-4 mr-2" />
              Threat Intelligence
            </TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-purple-600">
              <GraduationCap className="h-4 w-4 mr-2" />
              Security Academy
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-orange-600">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Tools
            </TabsTrigger>
          </TabsList>

          {/* Security Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Multi-Layer Security Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Progressive security tools based on your access level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Layer 1: Community Guardian */}
                <div className="border border-blue-600 rounded-lg p-4 bg-blue-900/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    Layer 1: Community Guardian (Your Access)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Eye className="h-6 w-6 text-blue-400" />
                          <div>
                            <div className="text-white font-semibold">Image Analysis</div>
                            <div className="text-slate-400 text-sm">Advanced deepfake detection with PDF report</div>
                          </div>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'image')}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Play className="h-6 w-6 text-green-400" />
                          <div>
                            <div className="text-white font-semibold">Video Analysis</div>
                            <div className="text-slate-400 text-sm">Motion forensics with full report</div>
                          </div>
                        </div>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, 'video')}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <MessageCircle className="h-6 w-6 text-orange-400" />
                          <div>
                            <div className="text-white font-semibold">Audio Analysis</div>
                            <div className="text-slate-400 text-sm">Voice cloning detection + report</div>
                          </div>
                        </div>
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleFileUpload(e, 'audio')}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Layer 2: Corporate Shield */}
                <div className="border border-orange-600 rounded-lg p-4 bg-orange-900/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-400" />
                    Layer 2: Corporate Shield ($99/month)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-orange-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <BarChart3 className="h-6 w-6 text-orange-400" />
                          <div>
                            <div className="text-white font-semibold">Enterprise Analytics</div>
                            <div className="text-slate-400 text-sm">Advanced data visualization</div>
                          </div>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-orange-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Activity className="h-6 w-6 text-orange-400" />
                          <div>
                            <div className="text-white font-semibold">Behavioral Analysis</div>
                            <div className="text-slate-400 text-sm">SuRaksha trust monitoring</div>
                          </div>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-orange-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="h-6 w-6 text-orange-400" />
                          <div>
                            <div className="text-white font-semibold">3D Enterprise Hub</div>
                            <div className="text-slate-400 text-sm">Holographic interface</div>
                          </div>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Layer 3: Developer Arsenal */}
                <div className="border border-purple-600 rounded-lg p-4 bg-purple-900/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-400" />
                    Layer 3: Developer Arsenal ($499/month)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-purple-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Bot className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">AI Workforce Creator</div>
                            <div className="text-slate-400 text-sm">Intelligent worker deployment</div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-purple-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">CyberNexus Hub</div>
                            <div className="text-slate-400 text-sm">3D Operations Center</div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-purple-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Network className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">Blockchain Security</div>
                            <div className="text-slate-400 text-sm">120-node distributed validation</div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-purple-600 opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Target className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">Advanced Configuration</div>
                            <div className="text-slate-400 text-sm">Full system customization</div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade Required
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Layer 4: Founder Nexus */}
                <div className="border border-yellow-600 rounded-lg p-4 bg-yellow-900/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    Layer 4: Founder Nexus (Restricted Access)
                  </h3>
                  <div className="text-center py-8">
                    <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <p className="text-white font-semibold mb-2">Ultimate System Control</p>
                    <p className="text-slate-400 text-sm mb-4">
                      Reserved for Rishabh Kapoor - Founder-level privileges required
                    </p>
                    <Button className="bg-yellow-600 hover:bg-yellow-700" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Founder Access Only
                    </Button>
                  </div>
                </div>

                {/* Analysis Results */}
                {analysisResult && (
                  <Card className="bg-slate-900 border-blue-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Comprehensive Analysis Report
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        Complete forensic analysis with downloadable reports
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* User & Case Information */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800 p-4 rounded-lg">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-blue-400" />
                              <span className="text-slate-400 text-sm">User ID</span>
                            </div>
                            <span className="text-white font-mono">{analysisResult.user_id}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-green-400" />
                              <span className="text-slate-400 text-sm">Case ID</span>
                            </div>
                            <span className="text-white font-mono">{analysisResult.case_id}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-4 w-4 text-orange-400" />
                              <span className="text-slate-400 text-sm">Analysis Date</span>
                            </div>
                            <span className="text-white text-sm">{new Date(analysisResult.analysis_date).toLocaleString()}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="h-4 w-4 text-purple-400" />
                              <span className="text-slate-400 text-sm">Processing Time</span>
                            </div>
                            <span className="text-white text-sm">{analysisResult.processing_time}</span>
                          </div>
                        </div>

                        {/* Core Analysis Results */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">Authenticity Status:</span>
                            <Badge className={analysisResult.is_authentic ? 'bg-green-600' : 'bg-red-600'}>
                              {analysisResult.is_authentic ? 'Authentic' : 'Potentially Manipulated'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-300">Confidence:</span>
                                <span className="text-white font-semibold">{analysisResult.confidence_percentage}%</span>
                              </div>
                              <Progress value={analysisResult.confidence_percentage} className="w-full" />
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-300">Forensic Score:</span>
                                <span className="text-white font-semibold">{analysisResult.forensic_score}/100</span>
                              </div>
                              <Progress value={analysisResult.forensic_score} className="w-full" />
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-300">Risk Level:</span>
                                <Badge className={
                                  analysisResult.risk_level === 'HIGH' ? 'bg-red-600' :
                                  analysisResult.risk_level === 'MEDIUM' ? 'bg-yellow-600' :
                                  'bg-green-600'
                                }>
                                  {analysisResult.risk_level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Findings */}
                        <div className="space-y-2">
                          <span className="text-slate-300 font-semibold">Key Findings:</span>
                          <ul className="list-disc list-inside text-slate-400 space-y-1 bg-slate-800 p-4 rounded-lg">
                            {analysisResult.key_findings.map((finding, index) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Security Recommendation
                          </h4>
                          <p className="text-slate-300 text-sm">{analysisResult.recommendation}</p>
                        </div>

                        {/* Report Generation */}
                        <div className="border-t border-slate-700 pt-4">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Generate Full Reports
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button 
                              onClick={generatePDFReport}
                              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              Download PDF Report
                            </Button>
                            <Button 
                              onClick={generateDocReport}
                              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              Download Word Document
                            </Button>
                          </div>
                          <p className="text-slate-400 text-xs mt-2">
                            Comprehensive reports include detailed analysis, forensic metadata, blockchain validation, and expert recommendations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blockchain Security Network Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            {hasAccess('layer3') ? (
              <BlockchainSecurityNetwork />
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Network className="h-5 w-5 text-cyan-400" />
                    Blockchain Security Network
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Distributed 120-node consensus network for security validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-slate-900 p-6 rounded-lg">
                        <Server className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">120+ Nodes</h3>
                        <p className="text-slate-400 text-sm">
                          Global distribution across AWS, Azure, GCP regions
                        </p>
                      </div>
                      
                      <div className="bg-slate-900 p-6 rounded-lg">
                        <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">Consensus Security</h3>
                        <p className="text-slate-400 text-sm">
                          Multi-validator consensus for threat validation
                        </p>
                      </div>
                      
                      <div className="bg-slate-900 p-6 rounded-lg">
                        <Activity className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">Real-time Monitoring</h3>
                        <p className="text-slate-400 text-sm">
                          Live network health and threat detection
                        </p>
                      </div>
                    </div>
                    
                    <div className="border border-purple-600 rounded-lg p-6 bg-purple-900/10">
                      <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">Layer 3 Access Required</h3>
                      <p className="text-slate-400 mb-4">
                        Blockchain security network requires Developer Arsenal access ($499/month)
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Request Layer 3 Access
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Threat Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-400" />
                  Live Threat Intelligence
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time cybersecurity alerts and threat monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <p className="text-white font-semibold mb-2">Advanced Threat Intelligence</p>
                  <p className="text-slate-400">
                    Real-time threat feeds and security intelligence available in upgraded layers
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Academy Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-400" />
                  Cybersecurity Academy
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Educational resources and security training programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900 border-slate-600">
                    <CardContent className="p-6">
                      <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
                      <h3 className="text-white font-semibold mb-2">Security Fundamentals</h3>
                      <p className="text-slate-400 text-sm mb-4">
                        Learn the basics of cybersecurity and threat detection
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-600">
                    <CardContent className="p-6">
                      <Target className="h-12 w-12 text-green-400 mb-4" />
                      <h3 className="text-white font-semibold mb-2">Threat Hunting</h3>
                      <p className="text-slate-400 text-sm mb-4">
                        Advanced techniques for identifying security threats
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-400" />
                  Advanced Security Tools
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Professional security tools and system configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-white font-semibold mb-2">Professional Tools</p>
                  <p className="text-slate-400 mb-4">
                    Advanced security tools available with Layer 2+ access
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Request Access Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}