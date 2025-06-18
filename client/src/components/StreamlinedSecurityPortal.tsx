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
                    Distributed 120-node consensus network with interconnected validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    {/* Connected Nodes Visualization */}
                    <div className="relative mb-8 h-64 bg-slate-900 rounded-lg p-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
                      
                      {/* Node Network Visualization */}
                      <div className="relative h-full">
                        {/* Central Hub Node */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-cyan-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                        </div>
                        
                        {/* Connected Regional Nodes */}
                        {[
                          { top: '20%', left: '25%', color: 'green' },
                          { top: '20%', right: '25%', color: 'blue' },
                          { bottom: '20%', left: '25%', color: 'purple' },
                          { bottom: '20%', right: '25%', color: 'orange' },
                          { top: '40%', left: '10%', color: 'pink' },
                          { top: '40%', right: '10%', color: 'yellow' },
                          { bottom: '40%', left: '10%', color: 'red' },
                          { bottom: '40%', right: '10%', color: 'indigo' }
                        ].map((node, index) => (
                          <div key={index} className={`absolute`} style={node.top ? {top: node.top, left: node.left, right: node.right} : {bottom: node.bottom, left: node.left, right: node.right}}>
                            <div className={`w-3 h-3 bg-${node.color}-400 rounded-full animate-pulse`}></div>
                            {/* Connection Lines */}
                            <svg className="absolute top-1.5 left-1.5 w-32 h-32 pointer-events-none">
                              <line 
                                x1="0" y1="0" 
                                x2={node.left ? "60" : "-60"} 
                                y2={node.top ? "60" : "-60"} 
                                stroke={`rgb(${node.color === 'cyan' ? '34, 211, 238' : '156, 163, 175'})`} 
                                strokeWidth="1" 
                                opacity="0.3"
                                className="animate-pulse"
                              />
                            </svg>
                          </div>
                        ))}
                        
                        {/* Network Stats Overlay */}
                        <div className="absolute top-4 right-4 bg-slate-800/80 p-3 rounded-lg">
                          <div className="text-cyan-400 text-sm font-semibold">Live Network</div>
                          <div className="text-white text-xs">147 Active Nodes</div>
                          <div className="text-green-400 text-xs">99.97% Uptime</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-slate-900 p-6 rounded-lg border border-cyan-500/20">
                        <Server className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">147+ Connected Nodes</h3>
                        <p className="text-slate-400 text-sm">
                          Global mesh network with real-time interconnectivity across 45+ countries
                        </p>
                        <div className="mt-3 text-cyan-400 text-xs">
                          AWS: 52 • Azure: 41 • GCP: 38 • Private: 16
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 p-6 rounded-lg border border-green-500/20">
                        <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">Distributed Consensus</h3>
                        <p className="text-slate-400 text-sm">
                          Byzantine fault-tolerant consensus with 67% agreement threshold
                        </p>
                        <div className="mt-3 text-green-400 text-xs">
                          Validators: 98 • Consensus Time: 2.3s avg
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 p-6 rounded-lg border border-orange-500/20">
                        <Activity className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">Real-time Sync</h3>
                        <p className="text-slate-400 text-sm">
                          Live network health monitoring with instant threat propagation
                        </p>
                        <div className="mt-3 text-orange-400 text-xs">
                          Sync Rate: 147ms • Threat Alerts: 12.4k/day
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-purple-600 rounded-lg p-6 bg-purple-900/10">
                      <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">Layer 3 Access Required</h3>
                      <p className="text-slate-400 mb-4">
                        Full blockchain security network requires Developer Arsenal access ($499/month)
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
                  Advanced Threat Intelligence Platform
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Comprehensive threat monitoring with 15+ intelligence modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Core Intelligence Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-green-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="h-6 w-6 text-green-400" />
                          <div>
                            <div className="text-white font-semibold">Dark Web Monitoring</div>
                            <div className="text-slate-400 text-sm">Real-time dark web intelligence</div>
                          </div>
                        </div>
                        <div className="text-green-400 text-xs">124 Sources • 24/7 Active</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-red-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Target className="h-6 w-6 text-red-400" />
                          <div>
                            <div className="text-white font-semibold">APT Tracking</div>
                            <div className="text-slate-400 text-sm">Advanced persistent threat analysis</div>
                          </div>
                        </div>
                        <div className="text-red-400 text-xs">47 Active Groups • 12 New IOCs</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-orange-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Search className="h-6 w-6 text-orange-400" />
                          <div>
                            <div className="text-white font-semibold">IOC Intelligence</div>
                            <div className="text-slate-400 text-sm">Indicators of compromise database</div>
                          </div>
                        </div>
                        <div className="text-orange-400 text-xs">2.8M IOCs • 847 New Today</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-purple-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Activity className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">MITRE ATT&CK Mapping</div>
                            <div className="text-slate-400 text-sm">Threat technique correlation</div>
                          </div>
                        </div>
                        <div className="text-purple-400 text-xs">14 Tactics • 188 Techniques</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-cyan-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Network className="h-6 w-6 text-cyan-400" />
                          <div>
                            <div className="text-white font-semibold">Botnet Monitoring</div>
                            <div className="text-slate-400 text-sm">Active botnet tracking</div>
                          </div>
                        </div>
                        <div className="text-cyan-400 text-xs">73 Active Botnets • 12.4K IPs</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-yellow-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap className="h-6 w-6 text-yellow-400" />
                          <div>
                            <div className="text-white font-semibold">Zero-Day Intelligence</div>
                            <div className="text-slate-400 text-sm">Emerging vulnerability tracking</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 text-xs">14 Critical • 29 High Severity</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-pink-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Shield className="h-6 w-6 text-pink-400" />
                          <div>
                            <div className="text-white font-semibold">Ransomware Tracker</div>
                            <div className="text-slate-400 text-sm">Active ransomware campaigns</div>
                          </div>
                        </div>
                        <div className="text-pink-400 text-xs">23 Active Families • 4 New</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-indigo-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <User className="h-6 w-6 text-indigo-400" />
                          <div>
                            <div className="text-white font-semibold">Threat Actor Profiling</div>
                            <div className="text-slate-400 text-sm">Nation-state & criminal groups</div>
                          </div>
                        </div>
                        <div className="text-indigo-400 text-xs">127 Profiles • 18 State-Sponsored</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-teal-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="h-6 w-6 text-teal-400" />
                          <div>
                            <div className="text-white font-semibold">Geopolitical Intel</div>
                            <div className="text-slate-400 text-sm">Cyber warfare & attribution</div>
                          </div>
                        </div>
                        <div className="text-teal-400 text-xs">47 Regions • 12 Active Campaigns</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-emerald-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <BarChart3 className="h-6 w-6 text-emerald-400" />
                          <div>
                            <div className="text-white font-semibold">Threat Scoring</div>
                            <div className="text-slate-400 text-sm">Risk assessment & prioritization</div>
                          </div>
                        </div>
                        <div className="text-emerald-400 text-xs">AI-Powered • 99.3% Accuracy</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-rose-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <MessageCircle className="h-6 w-6 text-rose-400" />
                          <div>
                            <div className="text-white font-semibold">Social Engineering</div>
                            <div className="text-slate-400 text-sm">Phishing & social attack patterns</div>
                          </div>
                        </div>
                        <div className="text-rose-400 text-xs">1.2K Campaigns • 89% Detection</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-violet-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Server className="h-6 w-6 text-violet-400" />
                          <div>
                            <div className="text-white font-semibold">Infrastructure Analysis</div>
                            <div className="text-slate-400 text-sm">Malicious infrastructure mapping</div>
                          </div>
                        </div>
                        <div className="text-violet-400 text-xs">47K Domains • 8.2K IPs</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-amber-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Brain className="h-6 w-6 text-amber-400" />
                          <div>
                            <div className="text-white font-semibold">AI Threat Prediction</div>
                            <div className="text-slate-400 text-sm">Machine learning threat forecasting</div>
                          </div>
                        </div>
                        <div className="text-amber-400 text-xs">72hr Forecast • 94% Accuracy</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-lime-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="h-6 w-6 text-lime-400" />
                          <div>
                            <div className="text-white font-semibold">Real-time Alerts</div>
                            <div className="text-slate-400 text-sm">Instant threat notifications</div>
                          </div>
                        </div>
                        <div className="text-lime-400 text-xs">2.4s Response • 24/7 Active</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-sky-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="h-6 w-6 text-sky-400" />
                          <div>
                            <div className="text-white font-semibold">Intelligence Reports</div>
                            <div className="text-slate-400 text-sm">Automated threat briefings</div>
                          </div>
                        </div>
                        <div className="text-sky-400 text-xs">Daily Reports • Custom Analytics</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Live Threat Feed */}
                  <Card className="bg-slate-900 border-red-600/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Activity className="h-5 w-5 text-red-400" />
                        Live Threat Feed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {[
                          { time: "2m ago", threat: "APT29 Infrastructure Update", severity: "HIGH", source: "Dark Web" },
                          { time: "7m ago", threat: "New Ransomware Variant Detected", severity: "CRITICAL", source: "Honeypot" },
                          { time: "12m ago", threat: "Phishing Campaign Targeting Banks", severity: "MEDIUM", source: "Email Intel" },
                          { time: "18m ago", threat: "Botnet C2 Server Discovered", severity: "HIGH", source: "Network Scan" },
                          { time: "25m ago", threat: "Zero-Day Exploit in the Wild", severity: "CRITICAL", source: "Threat Hunting" }
                        ].map((alert, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                alert.severity === 'CRITICAL' ? 'bg-red-500' :
                                alert.severity === 'HIGH' ? 'bg-orange-500' : 'bg-yellow-500'
                              }`}></div>
                              <div>
                                <div className="text-white text-sm font-semibold">{alert.threat}</div>
                                <div className="text-slate-400 text-xs">{alert.source} • {alert.time}</div>
                              </div>
                            </div>
                            <Badge className={
                              alert.severity === 'CRITICAL' ? 'bg-red-600' :
                              alert.severity === 'HIGH' ? 'bg-orange-600' : 'bg-yellow-600'
                            }>
                              {alert.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Access Upgrade Notice */}
                  <div className="border border-green-600 rounded-lg p-6 bg-green-900/10">
                    <Lock className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2 text-center">Enhanced Intelligence Available</h3>
                    <p className="text-slate-400 mb-4 text-center">
                      Access full threat intelligence platform with Layer 2+ subscription
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Upgrade for Full Access
                    </Button>
                  </div>
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
                  SatyaAI Cybersecurity Academy
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Comprehensive cybersecurity education with 25+ specialized courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Learning Path Overview */}
                  <div className="bg-slate-900 p-6 rounded-lg border border-purple-600/50">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      Learning Pathways
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-green-400 font-bold">1</span>
                        </div>
                        <div className="text-white text-sm font-semibold">Fundamentals</div>
                        <div className="text-slate-400 text-xs">8 Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-400 font-bold">2</span>
                        </div>
                        <div className="text-white text-sm font-semibold">Intermediate</div>
                        <div className="text-slate-400 text-xs">10 Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-orange-400 font-bold">3</span>
                        </div>
                        <div className="text-white text-sm font-semibold">Advanced</div>
                        <div className="text-slate-400 text-xs">8 Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-red-400 font-bold">4</span>
                        </div>
                        <div className="text-white text-sm font-semibold">Expert</div>
                        <div className="text-slate-400 text-xs">6 Courses</div>
                      </div>
                    </div>
                  </div>

                  {/* Fundamentals Level */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-500/20 rounded text-green-400 text-sm flex items-center justify-center">1</span>
                      Fundamentals Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-slate-900 border-green-600/50">
                        <CardContent className="p-4">
                          <BookOpen className="h-8 w-8 text-green-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Security Fundamentals</h4>
                          <p className="text-slate-400 text-sm mb-3">Basic cybersecurity principles</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 4h</span>
                            <Badge className="bg-green-600">Beginner</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-green-600/50">
                        <CardContent className="p-4">
                          <Network className="h-8 w-8 text-green-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Network Security Basics</h4>
                          <p className="text-slate-400 text-sm mb-3">Network protocols and security</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 3h</span>
                            <Badge className="bg-green-600">Beginner</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-green-600/50">
                        <CardContent className="p-4">
                          <Lock className="h-8 w-8 text-green-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Cryptography 101</h4>
                          <p className="text-slate-400 text-sm mb-3">Encryption and hashing basics</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 5h</span>
                            <Badge className="bg-green-600">Beginner</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-green-600/50">
                        <CardContent className="p-4">
                          <User className="h-8 w-8 text-green-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Identity & Access</h4>
                          <p className="text-slate-400 text-sm mb-3">Authentication mechanisms</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 3h</span>
                            <Badge className="bg-green-600">Beginner</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Start Course</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Intermediate Level */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500/20 rounded text-blue-400 text-sm flex items-center justify-center">2</span>
                      Intermediate Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-slate-900 border-blue-600/50">
                        <CardContent className="p-4">
                          <Target className="h-8 w-8 text-blue-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Threat Hunting</h4>
                          <p className="text-slate-400 text-sm mb-3">Proactive threat detection</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 6h</span>
                            <Badge className="bg-blue-600">Intermediate</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-blue-600/50">
                        <CardContent className="p-4">
                          <Search className="h-8 w-8 text-blue-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Digital Forensics</h4>
                          <p className="text-slate-400 text-sm mb-3">Evidence collection & analysis</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 8h</span>
                            <Badge className="bg-blue-600">Intermediate</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-blue-600/50">
                        <CardContent className="p-4">
                          <Brain className="h-8 w-8 text-blue-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">AI in Cybersecurity</h4>
                          <p className="text-slate-400 text-sm mb-3">Machine learning for security</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 7h</span>
                            <Badge className="bg-blue-600">Intermediate</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-blue-600/50">
                        <CardContent className="p-4">
                          <Shield className="h-8 w-8 text-blue-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Incident Response</h4>
                          <p className="text-slate-400 text-sm mb-3">Emergency response protocols</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 5h</span>
                            <Badge className="bg-blue-600">Intermediate</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Start Course</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Advanced Level */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 bg-orange-500/20 rounded text-orange-400 text-sm flex items-center justify-center">3</span>
                      Advanced Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="bg-slate-900 border-orange-600/50">
                        <CardContent className="p-4">
                          <Zap className="h-8 w-8 text-orange-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Zero-Day Research</h4>
                          <p className="text-slate-400 text-sm mb-3">Vulnerability discovery</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 12h</span>
                            <Badge className="bg-orange-600">Advanced</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-orange-600/50">
                        <CardContent className="p-4">
                          <Globe className="h-8 w-8 text-orange-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">APT Analysis</h4>
                          <p className="text-slate-400 text-sm mb-3">Advanced persistent threats</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 10h</span>
                            <Badge className="bg-orange-600">Advanced</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-orange-600/50">
                        <CardContent className="p-4">
                          <Activity className="h-8 w-8 text-orange-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Malware Analysis</h4>
                          <p className="text-slate-400 text-sm mb-3">Reverse engineering</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 15h</span>
                            <Badge className="bg-orange-600">Advanced</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-orange-600/50">
                        <CardContent className="p-4">
                          <Server className="h-8 w-8 text-orange-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Cloud Security</h4>
                          <p className="text-slate-400 text-sm mb-3">Multi-cloud security architecture</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 9h</span>
                            <Badge className="bg-orange-600">Advanced</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">Start Course</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Expert Level */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500/20 rounded text-red-400 text-sm flex items-center justify-center">4</span>
                      Expert Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="bg-slate-900 border-red-600/50">
                        <CardContent className="p-4">
                          <Crown className="h-8 w-8 text-red-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Nation-State Threats</h4>
                          <p className="text-slate-400 text-sm mb-3">State-sponsored cyber warfare</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 20h</span>
                            <Badge className="bg-red-600">Expert</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-red-600/50">
                        <CardContent className="p-4">
                          <Brain className="h-8 w-8 text-red-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Quantum Cryptography</h4>
                          <p className="text-slate-400 text-sm mb-3">Post-quantum security</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 18h</span>
                            <Badge className="bg-red-600">Expert</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">Start Course</Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-red-600/50">
                        <CardContent className="p-4">
                          <Network className="h-8 w-8 text-red-400 mb-3" />
                          <h4 className="text-white font-semibold mb-2">Blockchain Security</h4>
                          <p className="text-slate-400 text-sm mb-3">Distributed system security</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-slate-500">Duration: 16h</span>
                            <Badge className="bg-red-600">Expert</Badge>
                          </div>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">Start Course</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Live Labs & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-slate-900 border-purple-600/50">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Settings className="h-5 w-5 text-purple-400" />
                          Live Lab Environment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">Virtual Security Lab Active</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">12 Hands-on Scenarios</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">Real-time Attack Simulations</span>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
                            Launch Lab Environment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-gold-600/50">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-yellow-400" />
                          Professional Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">SatyaAI Certified Security Analyst</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">Advanced Threat Hunter</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-slate-300 text-sm">AI Security Specialist</span>
                          </div>
                          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 mt-4">
                            View Certification Paths
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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