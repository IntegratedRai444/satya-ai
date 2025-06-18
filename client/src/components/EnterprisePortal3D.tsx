import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Shield, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  BarChart3,
  Network,
  Database,
  Clock,
  Zap,
  Target,
  Activity,
  Camera,
  Mic,
  Video,
  Globe,
  Brain,
  Lock
} from 'lucide-react';

interface ThreatMetric {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  count: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  isAnimating: boolean;
}

interface SecurityScore {
  overall: number;
  categories: {
    infrastructure: number;
    compliance: number;
    threats: number;
    incidents: number;
  };
  lastUpdated: string;
  isChanging: boolean;
}

interface HealthSnapshot {
  id: string;
  timestamp: string;
  overallHealth: number;
  criticalIssues: number;
  resolvedThreats: number;
  activeMonitoring: number;
  complianceScore: number;
}

export function EnterprisePortal3D() {
  const [securityScore, setSecurityScore] = useState<SecurityScore>({
    overall: 87.4,
    categories: {
      infrastructure: 92.1,
      compliance: 88.7,
      threats: 85.3,
      incidents: 84.2
    },
    lastUpdated: new Date().toISOString(),
    isChanging: false
  });

  const [threatMetrics, setThreatMetrics] = useState<ThreatMetric[]>([]);
  const [healthSnapshots, setHealthSnapshots] = useState<HealthSnapshot[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGeneratingSnapshot, setIsGeneratingSnapshot] = useState(false);

  useEffect(() => {
    // Initialize threat metrics with dynamic scoring
    const initialMetrics: ThreatMetric[] = [
      {
        id: 'apt_threats',
        type: 'APT Campaigns',
        severity: 'CRITICAL',
        count: 3,
        trend: 'down',
        change: -12.3,
        isAnimating: false
      },
      {
        id: 'phishing',
        type: 'Phishing Attempts',
        severity: 'HIGH',
        count: 47,
        trend: 'up',
        change: 8.7,
        isAnimating: false
      },
      {
        id: 'malware',
        type: 'Malware Detection',
        severity: 'MEDIUM',
        count: 23,
        trend: 'stable',
        change: 0.2,
        isAnimating: false
      },
      {
        id: 'anomalies',
        type: 'Behavioral Anomalies',
        severity: 'LOW',
        count: 156,
        trend: 'down',
        change: -5.1,
        isAnimating: false
      }
    ];

    setThreatMetrics(initialMetrics);

    // Simulate dynamic score changes with micro-animations
    const scoreInterval = setInterval(() => {
      setSecurityScore(prev => {
        const newScore = {
          ...prev,
          overall: Math.max(75, Math.min(95, prev.overall + (Math.random() - 0.5) * 2)),
          categories: {
            infrastructure: Math.max(80, Math.min(98, prev.categories.infrastructure + (Math.random() - 0.5) * 1.5)),
            compliance: Math.max(75, Math.min(95, prev.categories.compliance + (Math.random() - 0.5) * 1.2)),
            threats: Math.max(70, Math.min(92, prev.categories.threats + (Math.random() - 0.5) * 2.5)),
            incidents: Math.max(72, Math.min(90, prev.categories.incidents + (Math.random() - 0.5) * 1.8))
          },
          lastUpdated: new Date().toISOString(),
          isChanging: true
        };

        // Reset animation after a brief moment
        setTimeout(() => {
          setSecurityScore(current => ({ ...current, isChanging: false }));
        }, 1000);

        return newScore;
      });

      // Update threat metrics with animations
      setThreatMetrics(prev => prev.map(metric => {
        const shouldUpdate = Math.random() > 0.7;
        if (shouldUpdate) {
          const countChange = Math.floor((Math.random() - 0.5) * 5);
          return {
            ...metric,
            count: Math.max(0, metric.count + countChange),
            change: (Math.random() - 0.5) * 20,
            trend: countChange > 0 ? 'up' : countChange < 0 ? 'down' : 'stable',
            isAnimating: true
          };
        }
        return { ...metric, isAnimating: false };
      }));

      // Reset metric animations
      setTimeout(() => {
        setThreatMetrics(prev => prev.map(metric => ({ ...metric, isAnimating: false })));
      }, 800);
    }, 8000);

    return () => clearInterval(scoreInterval);
  }, []);

  const generateHealthSnapshot = () => {
    setIsGeneratingSnapshot(true);
    
    setTimeout(() => {
      const newSnapshot: HealthSnapshot = {
        id: `snapshot_${Date.now()}`,
        timestamp: new Date().toISOString(),
        overallHealth: securityScore.overall,
        criticalIssues: threatMetrics.filter(m => m.severity === 'CRITICAL').reduce((sum, m) => sum + m.count, 0),
        resolvedThreats: Math.floor(Math.random() * 50) + 150,
        activeMonitoring: Math.floor(Math.random() * 20) + 95,
        complianceScore: securityScore.categories.compliance
      };

      setHealthSnapshots(prev => [newSnapshot, ...prev.slice(0, 4)]);
      setIsGeneratingSnapshot(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'HIGH': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'LOW': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    const color = trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-gray-400';
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
        <span className="text-xs">{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Building2 className="h-10 w-10 text-cyan-400" />
            3D Enterprise Security Portal
          </h1>
          <p className="text-slate-300 text-lg">
            Advanced enterprise cybersecurity command center with real-time intelligence
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-cyan-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="image" className="text-white data-[state=active]:bg-cyan-600">
              <Camera className="h-4 w-4 mr-2" />
              Image Analysis
            </TabsTrigger>
            <TabsTrigger value="video" className="text-white data-[state=active]:bg-cyan-600">
              <Video className="h-4 w-4 mr-2" />
              Video Analysis
            </TabsTrigger>
            <TabsTrigger value="audio" className="text-white data-[state=active]:bg-cyan-600">
              <Mic className="h-4 w-4 mr-2" />
              Audio Analysis
            </TabsTrigger>
            <TabsTrigger value="webcam" className="text-white data-[state=active]:bg-cyan-600">
              <Eye className="h-4 w-4 mr-2" />
              Webcam Live
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Security Score Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className={`bg-slate-800 border-slate-700 transition-all duration-1000 ${securityScore.isChanging ? 'ring-2 ring-cyan-400 scale-105' : ''}`}>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className={`text-3xl font-bold text-white transition-all duration-500 ${securityScore.isChanging ? 'text-cyan-400' : ''}`}>
                    {securityScore.overall.toFixed(1)}%
                  </div>
                  <div className="text-slate-400 text-sm">Overall Security</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Network className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{securityScore.categories.infrastructure.toFixed(1)}%</div>
                  <div className="text-slate-400 text-sm">Infrastructure</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Lock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{securityScore.categories.compliance.toFixed(1)}%</div>
                  <div className="text-slate-400 text-sm">Compliance</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{securityScore.categories.threats.toFixed(1)}%</div>
                  <div className="text-slate-400 text-sm">Threat Defense</div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Threat Metrics with Micro-animations */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-400" />
                    Live Threat Intelligence
                  </CardTitle>
                  <Badge className="bg-red-600 text-white animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
                <CardDescription className="text-slate-300">
                  Real-time threat detection with dynamic scoring updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {threatMetrics.map((metric) => (
                    <div 
                      key={metric.id} 
                      className={`p-4 rounded-lg border transition-all duration-800 ${
                        metric.isAnimating ? 'scale-105 ring-2 ring-cyan-400' : ''
                      } ${getSeverityColor(metric.severity)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{metric.type}</h3>
                        <Badge className={`text-xs ${getSeverityColor(metric.severity).split(' ')[0]} bg-transparent`}>
                          {metric.severity}
                        </Badge>
                      </div>
                      <div className={`text-2xl font-bold mb-1 transition-all duration-500 ${
                        metric.isAnimating ? 'text-cyan-400' : ''
                      }`}>
                        {metric.count}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs opacity-80">Active</span>
                        {getTrendIcon(metric.trend, metric.change)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* One-Click Health Snapshot Generator */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Security Health Snapshot Generator
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Generate comprehensive security health reports instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Button 
                    onClick={generateHealthSnapshot}
                    disabled={isGeneratingSnapshot}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    {isGeneratingSnapshot ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Health Snapshot
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Eye className="h-4 w-4 mr-2" />
                    View Historical Reports
                  </Button>
                </div>

                {/* Recent Snapshots */}
                {healthSnapshots.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Recent Health Snapshots</h3>
                    <div className="space-y-3">
                      {healthSnapshots.map((snapshot) => (
                        <div key={snapshot.id} className="bg-slate-700 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-white font-medium">
                              Health Report {snapshot.id.split('_')[1]}
                            </span>
                            <span className="text-slate-400 text-sm">
                              {new Date(snapshot.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <div className="text-slate-400">Overall Health</div>
                              <div className="text-cyan-400 font-bold">{snapshot.overallHealth.toFixed(1)}%</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Critical Issues</div>
                              <div className="text-red-400 font-bold">{snapshot.criticalIssues}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Resolved</div>
                              <div className="text-green-400 font-bold">{snapshot.resolvedThreats}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Monitoring</div>
                              <div className="text-blue-400 font-bold">{snapshot.activeMonitoring}%</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Compliance</div>
                              <div className="text-yellow-400 font-bold">{snapshot.complianceScore.toFixed(1)}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tabs */}
          <TabsContent value="image" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-400" />
                  Advanced Image Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  AI-powered deepfake detection and image forensics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Camera className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">Image analysis tools will be displayed here</p>
                <p className="text-slate-500 text-sm mt-2">Upload an image to begin advanced forensic analysis</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-400" />
                  Video Deepfake Detection
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Frame-by-frame analysis and temporal consistency checking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Video className="h-16 w-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">Video analysis tools will be displayed here</p>
                <p className="text-slate-500 text-sm mt-2">Upload a video file for comprehensive deepfake detection</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mic className="h-5 w-5 text-green-400" />
                  Audio Authenticity Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Voice cloning detection and audio manipulation analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Mic className="h-16 w-16 text-green-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">Audio analysis tools will be displayed here</p>
                <p className="text-slate-500 text-sm mt-2">Upload an audio file to detect voice manipulation</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webcam" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-red-400" />
                  Live Webcam Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time deepfake detection from webcam feed
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Eye className="h-16 w-16 text-red-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">Live webcam analysis will be displayed here</p>
                <p className="text-slate-500 text-sm mt-2">Enable camera access for real-time authentication</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}