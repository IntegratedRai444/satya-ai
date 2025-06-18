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
  Server
} from 'lucide-react';
import BlockchainSecurityNetwork from './BlockchainSecurityNetwork';

interface AnalysisResult {
  is_authentic: boolean;
  confidence_percentage: number;
  key_findings: string[];
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
      return apiRequest('POST', '/api/analyze/media', formData);
    },
    onSuccess: (data: any) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: `Media analysis completed with ${data.confidence_percentage}% confidence`,
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
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              Security Analysis
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
                            <div className="text-white font-semibold">Image Scanner</div>
                            <div className="text-slate-400 text-sm">Basic deepfake detection</div>
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
                          <Shield className="h-6 w-6 text-green-400" />
                          <div>
                            <div className="text-white font-semibold">Basic Security Check</div>
                            <div className="text-slate-400 text-sm">Essential threat scan</div>
                          </div>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Run Security Scan
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Search className="h-6 w-6 text-purple-400" />
                          <div>
                            <div className="text-white font-semibold">URL Scanner</div>
                            <div className="text-slate-400 text-sm">Phishing detection</div>
                          </div>
                        </div>
                        <Input
                          placeholder="Enter URL to scan..."
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
                      <CardTitle className="text-white">Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Authenticity Status:</span>
                          <Badge className={analysisResult.is_authentic ? 'bg-green-600' : 'bg-red-600'}>
                            {analysisResult.is_authentic ? 'Authentic' : 'Potentially Manipulated'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Confidence:</span>
                          <span className="text-white font-semibold">{analysisResult.confidence_percentage}%</span>
                        </div>
                        <Progress value={analysisResult.confidence_percentage} className="w-full" />
                        <div className="space-y-2">
                          <span className="text-slate-300">Key Findings:</span>
                          <ul className="list-disc list-inside text-slate-400 space-y-1">
                            {analysisResult.key_findings.map((finding, index) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
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