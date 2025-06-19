import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Target,
  Brain,
  Search,
  AlertTriangle,
  Eye,
  Network,
  Activity,
  Zap,
  Database,
  Globe,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Lock,
  Unlock,
  Cpu,
  Radar,
  Crosshair,
  Microscope,
  Layers,
  Binary,
  Code,
  Terminal,
  FileSearch,
  ScanLine,
  Fingerprint,
  Waves,
  Settings
} from 'lucide-react';

interface ThreatHunt {
  id: string;
  name: string;
  type: 'behavioral' | 'network' | 'endpoint' | 'data' | 'insider';
  status: 'active' | 'completed' | 'investigating' | 'escalated';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  timeframe: string;
  indicators: string[];
  artifacts: string[];
  mitreMapping: string[];
  killChainPhase: string;
  threatActor: string;
  campaign: string;
  lastUpdated: string;
}

interface MLAnalysis {
  algorithm: string;
  modelAccuracy: number;
  anomalyScore: number;
  featureImportance: { [key: string]: number };
  predictions: {
    threatType: string;
    probability: number;
    timeToIncident: string;
    impactLevel: string;
  }[];
  patternRecognition: {
    behavioralDeviations: number;
    networkAnomalies: number;
    dataExfiltration: number;
    privilegeEscalation: number;
  };
}

interface HuntingQuery {
  queryId: string;
  query: string;
  dataSource: string;
  results: number;
  executionTime: number;
  severity: string;
  findings: {
    indicator: string;
    frequency: number;
    riskScore: number;
    context: string;
  }[];
}

export default function AIThreatHuntingSystem() {
  const [activeTab, setActiveTab] = useState('hunting');
  const [activeHunts, setActiveHunts] = useState<ThreatHunt[]>([]);
  const [mlAnalysis, setMlAnalysis] = useState<MLAnalysis | null>(null);
  const [huntingQueries, setHuntingQueries] = useState<HuntingQuery[]>([]);
  const [customQuery, setCustomQuery] = useState('');
  const [isHunting, setIsHunting] = useState(false);
  const [huntingMetrics, setHuntingMetrics] = useState({
    activeHunts: 0,
    threatsDetected: 0,
    falsePositives: 0,
    accuracy: 0
  });
  const { toast } = useToast();

  // Advanced Threat Hunting
  const threatHuntingMutation = useMutation({
    mutationFn: async () => {
      setIsHunting(true);
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const hunts: ThreatHunt[] = [
        {
          id: 'HUNT-001',
          name: 'Advanced Persistent Threat Campaign',
          type: 'behavioral',
          status: 'investigating',
          severity: 'critical',
          confidence: 94.7,
          timeframe: '7 days',
          indicators: ['Unusual lateral movement', 'Credential dumping', 'Data staging'],
          artifacts: ['Suspicious PowerShell commands', 'Memory dumps', 'Network logs'],
          mitreMapping: ['T1003', 'T1055', 'T1041'],
          killChainPhase: 'Actions on Objectives',
          threatActor: 'APT29 (Cozy Bear)',
          campaign: 'Operation Cloud Hopper',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'HUNT-002',
          name: 'Insider Threat - Data Exfiltration',
          type: 'insider',
          status: 'active',
          severity: 'high',
          confidence: 87.3,
          timeframe: '3 days',
          indicators: ['Large file transfers', 'Off-hours access', 'Cloud uploads'],
          artifacts: ['USB activity logs', 'Email attachments', 'Cloud API calls'],
          mitreMapping: ['T1041', 'T1052', 'T1567'],
          killChainPhase: 'Exfiltration',
          threatActor: 'Internal User',
          campaign: 'Data Theft Operation',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'HUNT-003',
          name: 'Ransomware Deployment Preparation',
          type: 'endpoint',
          status: 'escalated',
          severity: 'critical',
          confidence: 96.2,
          timeframe: '2 days',
          indicators: ['File encryption tools', 'Backup deletion', 'Shadow copy removal'],
          artifacts: ['Registry modifications', 'Process execution logs', 'File system changes'],
          mitreMapping: ['T1486', 'T1490', 'T1562'],
          killChainPhase: 'Impact',
          threatActor: 'REvil Group',
          campaign: 'Corporate Ransomware',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'HUNT-004',
          name: 'Supply Chain Compromise',
          type: 'network',
          status: 'completed',
          severity: 'medium',
          confidence: 78.9,
          timeframe: '14 days',
          indicators: ['Compromised third-party software', 'Backdoor communications'],
          artifacts: ['Software updates', 'Network traffic', 'Certificate anomalies'],
          mitreMapping: ['T1195', 'T1071', 'T1573'],
          killChainPhase: 'Initial Access',
          threatActor: 'UNC2452 (SolarWinds)',
          campaign: 'Supply Chain Attack',
          lastUpdated: new Date().toISOString()
        }
      ];

      return hunts;
    },
    onSuccess: (data) => {
      setActiveHunts(data);
      setIsHunting(false);
      toast({
        title: "Threat Hunting Complete",
        description: `${data.length} active threat hunts identified`
      });
    }
  });

  // Machine Learning Analysis
  const mlAnalysisMutation = useMutation({
    mutationFn: async () => {
      setIsHunting(true);
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      return {
        algorithm: "Deep Neural Network with LSTM",
        modelAccuracy: 96.4 + Math.random() * 3,
        anomalyScore: 87.2 + Math.random() * 10,
        featureImportance: {
          "Network Traffic": 0.34,
          "User Behavior": 0.28,
          "File Access": 0.22,
          "Process Execution": 0.16
        },
        predictions: [
          {
            threatType: "Advanced Persistent Threat",
            probability: 0.89,
            timeToIncident: "72 hours",
            impactLevel: "Critical"
          },
          {
            threatType: "Insider Threat",
            probability: 0.67,
            timeToIncident: "5 days",
            impactLevel: "High"
          },
          {
            threatType: "Ransomware Attack",
            probability: 0.45,
            timeToIncident: "2 weeks",
            impactLevel: "Critical"
          }
        ],
        patternRecognition: {
          behavioralDeviations: 23,
          networkAnomalies: 45,
          dataExfiltration: 12,
          privilegeEscalation: 8
        }
      };
    },
    onSuccess: (data) => {
      setMlAnalysis(data);
      setIsHunting(false);
      toast({
        title: "ML Analysis Complete",
        description: `Model accuracy: ${data.modelAccuracy.toFixed(1)}%`
      });
    }
  });

  // Hunting Query Execution
  const executeQueryMutation = useMutation({
    mutationFn: async (query: string) => {
      setIsHunting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const queryResult: HuntingQuery = {
        queryId: `Q${Date.now()}`,
        query: query,
        dataSource: 'Multi-Source SIEM',
        results: Math.floor(Math.random() * 1000) + 50,
        executionTime: Math.random() * 5 + 0.5,
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        findings: [
          {
            indicator: 'Suspicious PowerShell execution',
            frequency: Math.floor(Math.random() * 20) + 5,
            riskScore: Math.random() * 100,
            context: 'Encoded command execution detected'
          },
          {
            indicator: 'Unusual network connection',
            frequency: Math.floor(Math.random() * 15) + 3,
            riskScore: Math.random() * 100,
            context: 'Connection to known malicious IP'
          },
          {
            indicator: 'Privilege escalation attempt',
            frequency: Math.floor(Math.random() * 10) + 1,
            riskScore: Math.random() * 100,
            context: 'UAC bypass technique identified'
          }
        ]
      };

      return queryResult;
    },
    onSuccess: (data) => {
      setHuntingQueries(prev => [data, ...prev]);
      setIsHunting(false);
      toast({
        title: "Query Executed",
        description: `Found ${data.results} results in ${data.executionTime.toFixed(2)}s`
      });
    }
  });

  // Update hunting metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setHuntingMetrics({
        activeHunts: activeHunts.filter(h => h.status === 'active' || h.status === 'investigating').length,
        threatsDetected: Math.floor(Math.random() * 50) + 150,
        falsePositives: Math.floor(Math.random() * 20) + 5,
        accuracy: 92 + Math.random() * 7
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeHunts]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'investigating': return 'text-yellow-400';
      case 'escalated': return 'text-red-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const handleQueryExecution = () => {
    if (customQuery.trim()) {
      executeQueryMutation.mutate(customQuery);
      setCustomQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              AI Threat Hunting System
            </h1>
            <p className="text-slate-400">Advanced AI-powered threat detection and hunting platform</p>
          </div>
        </div>

        {/* Hunting Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Search className="w-5 h-5 text-green-400" />
                <Activity className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-sm text-slate-400">Active Hunts</p>
              <p className="text-2xl font-bold text-green-400">
                {huntingMetrics.activeHunts}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-sm text-slate-400">Threats Detected</p>
              <p className="text-2xl font-bold text-red-400">
                {huntingMetrics.threatsDetected}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-5 h-5 text-yellow-400" />
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-sm text-slate-400">False Positives</p>
              <p className="text-2xl font-bold text-yellow-400">
                {huntingMetrics.falsePositives}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <Target className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-sm text-slate-400">Hunt Accuracy</p>
              <p className="text-2xl font-bold text-blue-400">
                {huntingMetrics.accuracy.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Hunting Interface */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-red-400" />
                Threat Hunting Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 gap-1 h-auto p-1 bg-slate-800">
                  <TabsTrigger
                    value="hunting"
                    className="flex items-center gap-2 data-[state=active]:bg-red-600"
                  >
                    <Target className="w-4 h-4" />
                    Active Hunts
                  </TabsTrigger>
                  <TabsTrigger
                    value="ml-analysis"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600"
                  >
                    <Brain className="w-4 h-4" />
                    ML Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="queries"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600"
                  >
                    <Search className="w-4 h-4" />
                    Hunt Queries
                  </TabsTrigger>
                </TabsList>

                {/* Active Hunts Tab */}
                <TabsContent value="hunting" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Target className="w-8 h-8 text-red-400" />
                      <h3 className="text-xl font-bold">Advanced Threat Hunting</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      AI-powered threat hunting with behavioral analysis and pattern recognition
                    </p>
                    
                    <Button
                      onClick={() => threatHuntingMutation.mutate()}
                      disabled={isHunting}
                      className="bg-red-600 hover:bg-red-700 mb-6"
                    >
                      {isHunting ? 'Hunting Threats...' : 'Launch Threat Hunt'}
                    </Button>

                    {activeHunts.length > 0 && (
                      <div className="space-y-4">
                        {activeHunts.map((hunt) => (
                          <Card key={hunt.id} className="bg-slate-800 border-slate-700 text-left">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Radar className="w-4 h-4 text-red-400" />
                                  <span className="font-semibold">{hunt.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getSeverityColor(hunt.severity)}>
                                    {hunt.severity.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className={getStatusColor(hunt.status)}>
                                    {hunt.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">Confidence</span>
                                    <span className={`text-sm font-medium ${hunt.confidence >= 90 ? 'text-green-400' : hunt.confidence >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                                      {hunt.confidence.toFixed(1)}%
                                    </span>
                                  </div>
                                  <Progress value={hunt.confidence} className="h-2" />
                                </div>

                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Threat Actor</span>
                                  <p className="text-sm font-medium text-red-400">{hunt.threatActor}</p>
                                  <span className="text-xs text-slate-500">{hunt.campaign}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-semibold mb-2">Indicators</h5>
                                  <div className="space-y-1">
                                    {hunt.indicators.slice(0, 3).map((indicator, index) => (
                                      <div key={index} className="flex items-center gap-1 text-xs">
                                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                                        <span className="text-slate-300">{indicator}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="text-sm font-semibold mb-2">MITRE ATT&CK</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {hunt.mitreMapping.map((technique, index) => (
                                      <Badge key={index} variant="outline" className="text-purple-400 border-purple-400 text-xs">
                                        {technique}
                                      </Badge>
                                    ))}
                                  </div>
                                  <p className="text-xs text-slate-500 mt-1">{hunt.killChainPhase}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* ML Analysis Tab */}
                <TabsContent value="ml-analysis" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Brain className="w-8 h-8 text-purple-400" />
                      <h3 className="text-xl font-bold">Machine Learning Analysis</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      Advanced ML algorithms for predictive threat analysis and pattern recognition
                    </p>
                    
                    <Button
                      onClick={() => mlAnalysisMutation.mutate()}
                      disabled={isHunting}
                      className="bg-purple-600 hover:bg-purple-700 mb-6"
                    >
                      {isHunting ? 'Analyzing Patterns...' : 'Run ML Analysis'}
                    </Button>

                    {mlAnalysis && (
                      <div className="space-y-6">
                        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Cpu className="w-5 h-5 text-purple-400" />
                              <h4 className="font-semibold">Model Performance</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <p className="text-2xl font-bold text-purple-400">
                                  {mlAnalysis.modelAccuracy.toFixed(1)}%
                                </p>
                                <p className="text-xs text-slate-400">Model Accuracy</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-red-400">
                                  {mlAnalysis.anomalyScore.toFixed(1)}
                                </p>
                                <p className="text-xs text-slate-400">Anomaly Score</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-slate-800 border-blue-500/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Activity className="w-5 h-5 text-blue-400" />
                                <h4 className="font-semibold">Feature Importance</h4>
                              </div>
                              <div className="space-y-3">
                                {Object.entries(mlAnalysis.featureImportance).map(([feature, importance]) => (
                                  <div key={feature} className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-slate-400">{feature}</span>
                                      <span className="text-sm font-medium text-blue-400">
                                        {(importance * 100).toFixed(0)}%
                                      </span>
                                    </div>
                                    <Progress value={importance * 100} className="h-2" />
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-800 border-green-500/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Waves className="w-5 h-5 text-green-400" />
                                <h4 className="font-semibold">Pattern Recognition</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-center">
                                {Object.entries(mlAnalysis.patternRecognition).map(([pattern, count]) => (
                                  <div key={pattern} className="space-y-1">
                                    <p className="text-lg font-bold text-green-400">{count}</p>
                                    <p className="text-xs text-slate-400 capitalize">
                                      {pattern.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-slate-800 border-orange-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-5 h-5 text-orange-400" />
                              <h4 className="font-semibold">Threat Predictions</h4>
                            </div>
                            <div className="space-y-3">
                              {mlAnalysis.predictions.map((prediction, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-slate-900 rounded">
                                  <div>
                                    <p className="text-sm font-medium">{prediction.threatType}</p>
                                    <p className="text-xs text-slate-400">
                                      {prediction.timeToIncident} • {prediction.impactLevel} Impact
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-bold text-orange-400">
                                      {(prediction.probability * 100).toFixed(0)}%
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Hunt Queries Tab */}
                <TabsContent value="queries" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Search className="w-8 h-8 text-blue-400" />
                      <h3 className="text-xl font-bold">Advanced Hunt Queries</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      Execute custom threat hunting queries across multiple data sources
                    </p>
                    
                    <div className="flex gap-2 mb-6">
                      <Input
                        placeholder="Enter custom hunting query (e.g., process_name:powershell AND command_line:*encoded*)"
                        value={customQuery}
                        onChange={(e) => setCustomQuery(e.target.value)}
                        className="bg-slate-800 border-slate-700"
                        onKeyPress={(e) => e.key === 'Enter' && handleQueryExecution()}
                      />
                      <Button
                        onClick={handleQueryExecution}
                        disabled={isHunting || !customQuery.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isHunting ? 'Executing...' : 'Execute'}
                      </Button>
                    </div>

                    {huntingQueries.length > 0 && (
                      <div className="space-y-4">
                        {huntingQueries.map((queryResult) => (
                          <Card key={queryResult.queryId} className="bg-slate-800 border-slate-700 text-left">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Terminal className="w-4 h-4 text-blue-400" />
                                  <span className="font-semibold font-mono text-sm">{queryResult.query}</span>
                                </div>
                                <Badge variant="outline" className={getSeverityColor(queryResult.severity)}>
                                  {queryResult.severity.toUpperCase()}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Results</span>
                                  <p className="text-lg font-bold text-blue-400">{queryResult.results.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Execution Time</span>
                                  <p className="text-lg font-bold text-green-400">{queryResult.executionTime.toFixed(2)}s</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Data Source</span>
                                  <p className="text-sm font-medium text-purple-400">{queryResult.dataSource}</p>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-sm font-semibold mb-2">Key Findings</h5>
                                <div className="space-y-2">
                                  {queryResult.findings.map((finding, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-slate-900 rounded">
                                      <div>
                                        <p className="text-sm font-medium">{finding.indicator}</p>
                                        <p className="text-xs text-slate-400">{finding.context}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-bold text-yellow-400">
                                          Risk: {finding.riskScore.toFixed(0)}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                          Freq: {finding.frequency}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Hunting Control Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="w-5 h-5 text-red-400" />
                Hunt Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Hunts</span>
                  <Badge variant="outline" className="text-red-400 border-red-400">
                    {activeHunts.length > 0 ? 'Running' : 'Idle'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ML Models</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {mlAnalysis ? 'Trained' : 'Ready'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Query Engine</span>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Online
                  </Badge>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Hunt Capabilities</h4>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Brain className="w-3 h-3 text-purple-400" />
                    AI-powered pattern recognition
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="w-3 h-3 text-blue-400" />
                    Multi-source data correlation
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-red-400" />
                    Behavioral anomaly detection
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3 text-green-400" />
                    Real-time threat hunting
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-yellow-400" />
                Hunt Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700 justify-start">
                <Target className="w-4 h-4 mr-2" />
                Launch Hunt Campaign
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Train ML Models
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Search className="w-4 h-4 mr-2" />
                Custom Query Builder
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Database className="w-4 h-4 mr-2" />
                Export Hunt Results
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}