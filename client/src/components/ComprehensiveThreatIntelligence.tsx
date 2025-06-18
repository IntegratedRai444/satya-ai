import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Shield,
  Brain,
  Target,
  Users,
  Download,
  AlertTriangle,
  TrendingUp,
  Activity,
  Globe,
  Zap,
  Eye,
  FileText,
  Settings,
  Play,
  Award,
  BookOpen,
  Network,
  Server,
  Lock,
  Cpu,
  BarChart3,
  Timer,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Share2,
  Bell,
  GamepadIcon,
  Star,
  Trophy,
  Flame
} from 'lucide-react';

interface ThreatIntelligenceResult {
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  threatScore: number;
  predictions: {
    malwareProbability: number;
    phishingRisk: number;
    ransomwareIndicators: number;
    dataBreachLikelihood: number;
    vulnerabilityExposure: number;
  };
  realTimeThreats: {
    source: string;
    category: string;
    severity: string;
    description: string;
    timestamp: string;
    iocs: string[];
  }[];
  mitreMapping: string[];
  collaborationData: {
    teamAlerts: number;
    sharedThreatFeeds: number;
    activeIncidents: number;
    resolvedThreats: number;
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  exportData: {
    reportId: string;
    customFields: any;
    formats: string[];
  };
  quickSnapshot: {
    networkHealth: number;
    activeThreats: number;
    securityPosture: string;
    lastUpdate: string;
  };
  riskColoring: {
    level: string;
    color: string;
    bgColor: string;
    textColor: string;
  };
  securityHealth: {
    score: number;
    components: {
      firewall: number;
      antivirus: number;
      patches: number;
      access: number;
      monitoring: number;
    };
    recommendations: string[];
  };
  gamification: {
    securityScore: number;
    achievements: string[];
    currentLevel: string;
    nextMilestone: string;
  };
  personalizedEngine: {
    userProfile: string;
    tailoredThreats: string[];
    customRecommendations: string[];
    learningPath: string[];
  };
}

export default function ComprehensiveThreatIntelligence() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [threatData, setThreatData] = useState<ThreatIntelligenceResult | null>(null);
  const [gameMode, setGameMode] = useState(false);
  
  const { toast } = useToast();

  // Threat intelligence query with auto-refresh
  const { data: intelligence, refetch, isLoading } = useQuery({
    queryKey: ['/api/threat-intelligence/comprehensive'],
    refetchInterval: autoRefresh ? refreshInterval * 1000 : false,
  });

  // Update threatData when intelligence changes
  useEffect(() => {
    if (intelligence) {
      setThreatData(intelligence as ThreatIntelligenceResult);
    }
  }, [intelligence]);

  // Export report mutation
  const exportMutation = useMutation({
    mutationFn: async (format: string) => {
      const response = await fetch('/api/threat-intelligence/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, data: threatData })
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ThreatIntelligence_${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => {
      toast({
        title: "Export Successful",
        description: "Threat intelligence report has been downloaded"
      });
    }
  });

  // Team collaboration mutation
  const shareMutation = useMutation({
    mutationFn: async (data: { type: string; content: any }) => {
      return apiRequest('POST', '/api/threat-intelligence/collaborate', data);
    },
    onSuccess: () => {
      toast({
        title: "Shared Successfully",
        description: "Threat intelligence shared with team"
      });
    }
  });

  const getThreatLevelIcon = (level: string) => {
    switch (level) {
      case 'CRITICAL': return <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />;
      case 'HIGH': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'MEDIUM': return <Eye className="h-5 w-5 text-yellow-500" />;
      default: return <Shield className="h-5 w-5 text-green-500" />;
    }
  };

  const getRiskAnimation = (level: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium transition-all duration-1000";
    switch (level) {
      case 'CRITICAL': return `${baseClasses} bg-red-100 text-red-800 animate-pulse shadow-lg shadow-red-200`;
      case 'HIGH': return `${baseClasses} bg-orange-100 text-orange-800 animate-bounce shadow-lg shadow-orange-200`;
      case 'MEDIUM': return `${baseClasses} bg-yellow-100 text-yellow-800 animate-pulse shadow-lg shadow-yellow-200`;
      default: return `${baseClasses} bg-green-100 text-green-800 shadow-lg shadow-green-200`;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Quick Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-600 col-span-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-400" />
              Advanced Threat Intelligence Platform
              <Badge className="ml-auto bg-blue-600 text-white">
                {threatData?.quickSnapshot.securityPosture || 'Analyzing...'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-blue-100">
              Integrated MISP & OpenCTI • ML Predictions • Real-time Collaboration
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Threat Snapshot Widget */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {getThreatLevelIcon(threatData?.threatLevel || 'LOW')}
              <div>
                <div className="text-white font-semibold">Threat Level</div>
                <div className={getRiskAnimation(threatData?.threatLevel || 'LOW')}>
                  {threatData?.threatLevel || 'LOW'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-white font-semibold">Network Health</div>
                <div className="text-2xl font-bold text-green-400">
                  {threatData?.quickSnapshot.networkHealth || 0}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-red-400" />
              <div>
                <div className="text-white font-semibold">Active Threats</div>
                <div className="text-2xl font-bold text-red-400">
                  {threatData?.quickSnapshot.activeThreats || 0}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-white font-semibold">Team Alerts</div>
                <div className="text-2xl font-bold text-blue-400">
                  {threatData?.collaborationData.teamAlerts || 0}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => refetch()}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>

              <div className="flex items-center gap-2">
                <label className="text-white text-sm">Auto-refresh:</label>
                <Select
                  value={refreshInterval.toString()}
                  onValueChange={(value) => setRefreshInterval(parseInt(value))}
                >
                  <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10s</SelectItem>
                    <SelectItem value="30">30s</SelectItem>
                    <SelectItem value="60">1m</SelectItem>
                    <SelectItem value="300">5m</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant={gameMode ? "default" : "outline"}
                onClick={() => setGameMode(!gameMode)}
                className="border-slate-600"
              >
                <GamepadIcon className="h-4 w-4 mr-2" />
                Game Mode
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => shareMutation.mutate({ type: 'alert', content: threatData })}
                className="bg-green-600 hover:bg-green-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Alert
              </Button>

              <Select onValueChange={(format) => exportMutation.mutate(format)}>
                <SelectTrigger className="w-32 bg-purple-600 border-purple-500 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF Report</SelectItem>
                  <SelectItem value="DOCX">Word Doc</SelectItem>
                  <SelectItem value="JSON">JSON Data</SelectItem>
                  <SelectItem value="STIX">STIX Format</SelectItem>
                  <SelectItem value="MISP">MISP Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            <Eye className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-green-600">
            <Brain className="h-4 w-4 mr-2" />
            ML Predictions
          </TabsTrigger>
          <TabsTrigger value="realtime" className="data-[state=active]:bg-red-600">
            <Activity className="h-4 w-4 mr-2" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="data-[state=active]:bg-purple-600">
            <Users className="h-4 w-4 mr-2" />
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-yellow-600">
            <Shield className="h-4 w-4 mr-2" />
            Health Report
          </TabsTrigger>
          <TabsTrigger value="gamification" className="data-[state=active]:bg-orange-600">
            <Trophy className="h-4 w-4 mr-2" />
            Security Games
          </TabsTrigger>
          <TabsTrigger value="personalized" className="data-[state=active]:bg-cyan-600">
            <Star className="h-4 w-4 mr-2" />
            Personalized
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-400" />
                  Threat Analysis Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Overall Threat Score</span>
                  <span className="text-2xl font-bold text-white">{threatData?.threatScore || 0}/100</span>
                </div>
                <Progress value={threatData?.threatScore || 0} className="h-3" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Risk Level</span>
                    <Badge className={getRiskAnimation(threatData?.threatLevel || 'LOW')}>
                      {threatData?.threatLevel || 'LOW'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Last Updated</span>
                    <span className="text-slate-400 text-sm">
                      {threatData?.quickSnapshot.lastUpdate ? formatTimestamp(threatData.quickSnapshot.lastUpdate) : 'Never'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  MITRE ATT&CK Mapping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {threatData?.mitreMapping.slice(0, 5).map((technique, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-600 text-blue-400">
                        {technique.split(' - ')[0]}
                      </Badge>
                      <span className="text-slate-300 text-sm">
                        {technique.split(' - ')[1]}
                      </span>
                    </div>
                  )) || []}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-400" />
                Security Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-400" />
                    Immediate Actions
                  </h4>
                  <ul className="space-y-2">
                    {threatData?.recommendations.immediate.map((rec, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    )) || []}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Timer className="h-4 w-4 text-yellow-400" />
                    Short-term Goals
                  </h4>
                  <ul className="space-y-2">
                    {threatData?.recommendations.shortTerm.map((rec, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <Eye className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    )) || []}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    Long-term Strategy
                  </h4>
                  <ul className="space-y-2">
                    {threatData?.recommendations.longTerm.map((rec, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <Shield className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    )) || []}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ML Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-400" />
                Machine Learning Threat Predictions
              </CardTitle>
              <CardDescription className="text-slate-300">
                Advanced ML models analyzing current threat landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Malware Probability</span>
                    <span className="text-red-400 font-semibold">
                      {Math.round((threatData?.predictions.malwareProbability || 0) * 100)}%
                    </span>
                  </div>
                  <Progress value={(threatData?.predictions.malwareProbability || 0) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Phishing Risk</span>
                    <span className="text-orange-400 font-semibold">
                      {Math.round((threatData?.predictions.phishingRisk || 0) * 100)}%
                    </span>
                  </div>
                  <Progress value={(threatData?.predictions.phishingRisk || 0) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Ransomware Indicators</span>
                    <span className="text-purple-400 font-semibold">
                      {Math.round((threatData?.predictions.ransomwareIndicators || 0) * 100)}%
                    </span>
                  </div>
                  <Progress value={(threatData?.predictions.ransomwareIndicators || 0) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Data Breach Likelihood</span>
                    <span className="text-yellow-400 font-semibold">
                      {Math.round((threatData?.predictions.dataBreachLikelihood || 0) * 100)}%
                    </span>
                  </div>
                  <Progress value={(threatData?.predictions.dataBreachLikelihood || 0) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Vulnerability Exposure</span>
                    <span className="text-blue-400 font-semibold">
                      {Math.round((threatData?.predictions.vulnerabilityExposure || 0) * 100)}%
                    </span>
                  </div>
                  <Progress value={(threatData?.predictions.vulnerabilityExposure || 0) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Real-time Threats Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-400 animate-pulse" />
                Real-time Threat Feed
                <Badge className="ml-auto bg-red-600 text-white animate-pulse">
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatData?.realTimeThreats.map((threat, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-4 bg-slate-900">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className={
                          threat.severity === 'HIGH' ? 'bg-red-600' :
                          threat.severity === 'MEDIUM' ? 'bg-yellow-600' : 'bg-green-600'
                        }>
                          {threat.severity}
                        </Badge>
                        <span className="text-white font-semibold">{threat.category}</span>
                        <span className="text-slate-400 text-sm">from {threat.source}</span>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {formatTimestamp(threat.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 mb-3">{threat.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="text-slate-400 text-sm">IOCs:</span>
                      {threat.iocs.map((ioc, iocIndex) => (
                        <Badge key={iocIndex} variant="outline" className="border-blue-600 text-blue-400">
                          {ioc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )) || []}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collaboration Tab */}
        <TabsContent value="collaboration" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{threatData?.collaborationData.teamAlerts || 0}</div>
                <div className="text-slate-300 text-sm">Team Alerts</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <Network className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{threatData?.collaborationData.sharedThreatFeeds || 0}</div>
                <div className="text-slate-300 text-sm">Shared Feeds</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{threatData?.collaborationData.activeIncidents || 0}</div>
                <div className="text-slate-300 text-sm">Active Incidents</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{threatData?.collaborationData.resolvedThreats || 0}</div>
                <div className="text-slate-300 text-sm">Resolved Threats</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                One-Click Security Health Report
                <Button
                  onClick={() => exportMutation.mutate('PDF')}
                  size="sm"
                  className="ml-auto bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-400">
                      {threatData?.securityHealth.score || 0}%
                    </div>
                    <div className="text-slate-300">Overall Security Score</div>
                  </div>

                  <div className="space-y-4">
                    {threatData?.securityHealth.components && Object.entries(threatData.securityHealth.components).map(([component, score]) => (
                      <div key={component} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 capitalize">{component}</span>
                          <span className="text-white font-semibold">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Health Recommendations</h4>
                  <ul className="space-y-3">
                    {threatData?.securityHealth.recommendations.map((rec, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    )) || []}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gamification Tab */}
        <TabsContent value="gamification" className="space-y-6">
          <Card className="bg-gradient-to-r from-orange-900 to-red-900 border-orange-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Interactive Security Awareness Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-yellow-400">
                      {threatData?.gamification.securityScore || 0}
                    </div>
                    <div className="text-orange-100">Security Points</div>
                    <div className="text-orange-200 text-sm mt-1">
                      {threatData?.gamification.currentLevel || 'Beginner'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-white font-medium">Achievements Unlocked:</div>
                    {threatData?.gamification.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-400" />
                        <span className="text-orange-100">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <div className="text-white font-medium mb-2">Next Milestone:</div>
                    <div className="text-orange-200">{threatData?.gamification.nextMilestone || 'Keep learning!'}</div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <Play className="h-4 w-4 mr-2" />
                      Phishing Detection Challenge
                    </Button>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Target className="h-4 w-4 mr-2" />
                      Incident Response Simulator
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Brain className="h-4 w-4 mr-2" />
                      Threat Hunting Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalized Tab */}
        <TabsContent value="personalized" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-cyan-400" />
                Personalized Security Recommendation Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-400" />
                    Your Profile
                  </h4>
                  <div className="bg-slate-900 p-3 rounded">
                    <div className="text-cyan-400 font-medium">
                      {threatData?.personalizedEngine.userProfile || 'Security Analyst'}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      Specialized recommendations based on your role
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-400" />
                    Tailored Threats
                  </h4>
                  <ul className="space-y-2">
                    {threatData?.personalizedEngine.tailoredThreats.map((threat, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                        {threat}
                      </li>
                    )) || []}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-400" />
                    Learning Path
                  </h4>
                  <ul className="space-y-2">
                    {threatData?.personalizedEngine.learningPath.map((course, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <Star className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {course}
                      </li>
                    )) || []}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">Custom Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {threatData?.personalizedEngine.customRecommendations.map((rec, index) => (
                    <div key={index} className="bg-slate-900 p-3 rounded flex items-start gap-2">
                      <Flame className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{rec}</span>
                    </div>
                  )) || []}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}