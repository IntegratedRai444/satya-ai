import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Shield,
  Brain,
  Eye,
  Fingerprint,
  Activity,
  Lock,
  Unlock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Settings,
  Bell,
  Search,
  FileText,
  Database,
  Zap,
  Target,
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
  Scale,
  Building,
  Clock,
  Info,
  Download,
  Smartphone,
  MousePointer,
  Keyboard,
  Hand,
  MapPin,
  Timer,
  BarChart3,
  LineChart,
  PieChart,
  Layers,
  Globe,
  UserCheck,
  UserX,
  Key,
  Camera,
  Mic,
  Navigation,
  Gauge,
  Battery,
  Accessibility,
  Languages,
  WifiOff,
  Gamepad2,
  MessageSquare
} from 'lucide-react';

interface BehaviorMetrics {
  swipe_patterns: number;
  tap_pressure: number;
  typing_speed: number;
  gesture_heatmap: number;
  navigation_flow: number;
  micro_motion: number;
  keystroke_dynamics: number;
  location_consistency: number;
  screen_pressure: number;
  gait_analysis: number;
  device_usage: number;
  ambient_correlation: number;
  anomaly_score: number;
  trust_score: number;
}

interface AuthenticationSession {
  id: string;
  user_id: string;
  device_id: string;
  login_method: 'behavior' | 'biometric' | 'fusion' | 'fallback';
  trust_level: 'high' | 'medium' | 'low' | 'critical';
  anomaly_flags: string[];
  session_start: Date;
  last_activity: Date;
  location: string;
  device_fingerprint: string;
  behavior_score: number;
  is_active: boolean;
  verification_required: boolean;
}

interface ComplianceStatus {
  dpdp_compliant: boolean;
  gdpr_compliant: boolean;
  rbi_compliant: boolean;
  consent_valid: boolean;
  data_retention_days: number;
  audit_trail_complete: boolean;
  encryption_status: string;
  last_compliance_check: Date;
}

interface AnomalyDetection {
  id: string;
  type: 'behavior' | 'location' | 'device' | 'session' | 'fraud';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  confidence: number;
  action_taken: 'monitor' | 'challenge' | 'block' | 'logout';
  timestamp: Date;
  user_notified: boolean;
  resolved: boolean;
}

export default function SuRakshaSecurityPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [behaviorMetrics, setBehaviorMetrics] = useState<BehaviorMetrics>({
    swipe_patterns: 95,
    tap_pressure: 87,
    typing_speed: 92,
    gesture_heatmap: 89,
    navigation_flow: 94,
    micro_motion: 88,
    keystroke_dynamics: 91,
    location_consistency: 96,
    screen_pressure: 85,
    gait_analysis: 82,
    device_usage: 93,
    ambient_correlation: 79,
    anomaly_score: 8,
    trust_score: 94
  });

  const [activeSessions, setActiveSessions] = useState<AuthenticationSession[]>([
    {
      id: 'session_1',
      user_id: 'user_12345',
      device_id: 'device_abc123',
      login_method: 'fusion',
      trust_level: 'high',
      anomaly_flags: [],
      session_start: new Date(Date.now() - 3600000),
      last_activity: new Date(Date.now() - 300000),
      location: 'Mumbai, India',
      device_fingerprint: 'Android_12_Samsung_Galaxy',
      behavior_score: 94,
      is_active: true,
      verification_required: false
    },
    {
      id: 'session_2',
      user_id: 'user_67890',
      device_id: 'device_xyz789',
      login_method: 'behavior',
      trust_level: 'medium',
      anomaly_flags: ['unusual_location', 'typing_speed_variance'],
      session_start: new Date(Date.now() - 1800000),
      last_activity: new Date(Date.now() - 120000),
      location: 'Delhi, India',
      device_fingerprint: 'iOS_16_iPhone_14',
      behavior_score: 76,
      is_active: true,
      verification_required: true
    }
  ]);

  const [recentAnomalies, setRecentAnomalies] = useState<AnomalyDetection[]>([
    {
      id: 'anomaly_1',
      type: 'behavior',
      severity: 'medium',
      description: 'Unusual typing pattern detected - 40% deviation from baseline',
      confidence: 85,
      action_taken: 'challenge',
      timestamp: new Date(Date.now() - 600000),
      user_notified: true,
      resolved: false
    },
    {
      id: 'anomaly_2',
      type: 'location',
      severity: 'high',
      description: 'Login from new geographic location (Bangalore) within 2 hours of Mumbai session',
      confidence: 92,
      action_taken: 'block',
      timestamp: new Date(Date.now() - 1200000),
      user_notified: true,
      resolved: true
    }
  ]);

  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>({
    dpdp_compliant: true,
    gdpr_compliant: true,
    rbi_compliant: true,
    consent_valid: true,
    data_retention_days: 90,
    audit_trail_complete: true,
    encryption_status: 'AES-256 Active',
    last_compliance_check: new Date()
  });

  // Real-time behavior monitoring simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBehaviorMetrics(prev => ({
        ...prev,
        swipe_patterns: Math.max(70, Math.min(100, prev.swipe_patterns + (Math.random() - 0.5) * 5)),
        tap_pressure: Math.max(70, Math.min(100, prev.tap_pressure + (Math.random() - 0.5) * 4)),
        typing_speed: Math.max(70, Math.min(100, prev.typing_speed + (Math.random() - 0.5) * 3)),
        anomaly_score: Math.max(0, Math.min(100, prev.anomaly_score + (Math.random() - 0.7) * 2)),
        trust_score: Math.max(60, Math.min(100, (prev.swipe_patterns + prev.tap_pressure + prev.typing_speed) / 3 - prev.anomaly_score * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Passwordless authentication handler
  const handlePasswordlessLogin = async (method: 'behavior' | 'biometric' | 'fusion') => {
    setIsAuthenticating(true);
    
    // Simulate authentication process
    setTimeout(() => {
      const authSuccess = Math.random() > 0.2; // 80% success rate
      
      if (authSuccess) {
        const newSession: AuthenticationSession = {
          id: `session_${Date.now()}`,
          user_id: `user_${Math.random().toString(36).substr(2, 9)}`,
          device_id: `device_${Math.random().toString(36).substr(2, 9)}`,
          login_method: method,
          trust_level: behaviorMetrics.trust_score > 90 ? 'high' : behaviorMetrics.trust_score > 75 ? 'medium' : 'low',
          anomaly_flags: behaviorMetrics.anomaly_score > 20 ? ['high_anomaly_score'] : [],
          session_start: new Date(),
          last_activity: new Date(),
          location: 'Current Location',
          device_fingerprint: 'Current Device',
          behavior_score: behaviorMetrics.trust_score,
          is_active: true,
          verification_required: behaviorMetrics.anomaly_score > 15
        };
        
        setActiveSessions(prev => [newSession, ...prev.slice(0, 9)]);
      }
      
      setIsAuthenticating(false);
    }, 2000);
  };

  // Anomaly response handler
  const handleAnomalyResponse = (anomalyId: string, action: 'dismiss' | 'investigate' | 'block_user') => {
    setRecentAnomalies(prev => 
      prev.map(anomaly => 
        anomaly.id === anomalyId 
          ? { ...anomaly, resolved: true, action_taken: action === 'block_user' ? 'block' : 'monitor' }
          : anomaly
      )
    );
  };

  const getTrustLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
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
                <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-3xl font-bold">SuRaksha Security Platform</h1>
                  <p className="text-gray-400">Behavior-Based Continuous Authentication & Fraud Detection</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-4 h-4 mr-2" />
                  Real-time Active
                </Badge>
                <Badge className="bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30">
                  <Scale className="w-4 h-4 mr-2" />
                  DPDP Compliant
                </Badge>
              </div>
            </div>

            {/* Core Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{behaviorMetrics.trust_score}%</div>
                      <div className="text-green-200">Trust Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{activeSessions.length}</div>
                      <div className="text-blue-200">Active Sessions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/60 to-orange-800/40 border-orange-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-orange-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{behaviorMetrics.anomaly_score}</div>
                      <div className="text-orange-200">Anomaly Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Scale className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white text-xl font-bold">100%</div>
                      <div className="text-purple-200">Compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 bg-gray-800/50">
              <TabsTrigger value="dashboard" className="text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="behavior" className="text-white">Behavior Auth</TabsTrigger>
              <TabsTrigger value="passwordless" className="text-white">Passwordless</TabsTrigger>
              <TabsTrigger value="privacy" className="text-white">Privacy Control</TabsTrigger>
              <TabsTrigger value="compliance" className="text-white">Compliance</TabsTrigger>
              <TabsTrigger value="anomalies" className="text-white">Anomaly Detection</TabsTrigger>
              <TabsTrigger value="sessions" className="text-white">Session Manager</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Behavior Metrics */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#0ea5e9]" />
                      Real-time Behavior Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <MousePointer className="w-3 h-3" />
                              Swipe Patterns
                            </span>
                            <span className="text-white">{behaviorMetrics.swipe_patterns}%</span>
                          </div>
                          <Progress value={behaviorMetrics.swipe_patterns} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Hand className="w-3 h-3" />
                              Tap Pressure
                            </span>
                            <span className="text-white">{behaviorMetrics.tap_pressure}%</span>
                          </div>
                          <Progress value={behaviorMetrics.tap_pressure} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Keyboard className="w-3 h-3" />
                              Typing Speed
                            </span>
                            <span className="text-white">{behaviorMetrics.typing_speed}%</span>
                          </div>
                          <Progress value={behaviorMetrics.typing_speed} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Navigation className="w-3 h-3" />
                              Navigation Flow
                            </span>
                            <span className="text-white">{behaviorMetrics.navigation_flow}%</span>
                          </div>
                          <Progress value={behaviorMetrics.navigation_flow} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Micro-motion
                            </span>
                            <span className="text-white">{behaviorMetrics.micro_motion}%</span>
                          </div>
                          <Progress value={behaviorMetrics.micro_motion} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Location Consistency
                            </span>
                            <span className="text-white">{behaviorMetrics.location_consistency}%</span>
                          </div>
                          <Progress value={behaviorMetrics.location_consistency} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              Keystroke Dynamics
                            </span>
                            <span className="text-white">{behaviorMetrics.keystroke_dynamics}%</span>
                          </div>
                          <Progress value={behaviorMetrics.keystroke_dynamics} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Monitor className="w-3 h-3" />
                              Screen Pressure
                            </span>
                            <span className="text-white">{behaviorMetrics.screen_pressure}%</span>
                          </div>
                          <Progress value={behaviorMetrics.screen_pressure} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Gait Analysis
                            </span>
                            <span className="text-white">{behaviorMetrics.gait_analysis}%</span>
                          </div>
                          <Progress value={behaviorMetrics.gait_analysis} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Smartphone className="w-3 h-3" />
                              Device Usage
                            </span>
                            <span className="text-white">{behaviorMetrics.device_usage}%</span>
                          </div>
                          <Progress value={behaviorMetrics.device_usage} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <Mic className="w-3 h-3" />
                              Ambient Correlation
                            </span>
                            <span className="text-white">{behaviorMetrics.ambient_correlation}%</span>
                          </div>
                          <Progress value={behaviorMetrics.ambient_correlation} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Overall Trust Score
                            </span>
                            <span className="text-white font-bold">{behaviorMetrics.trust_score}%</span>
                          </div>
                          <Progress value={behaviorMetrics.trust_score} className="h-3" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Passwordless Authentication Options */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Key className="w-5 h-5 text-[#0ea5e9]" />
                      Passwordless Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Button 
                        onClick={() => handlePasswordlessLogin('behavior')}
                        disabled={isAuthenticating}
                        className="w-full bg-blue-600 hover:bg-blue-600/80 flex items-center gap-2"
                      >
                        <Brain className="w-4 h-4" />
                        Behavior-Based Login
                        <Badge className="ml-2 bg-green-500/20 text-green-400">
                          {behaviorMetrics.trust_score}% Trust
                        </Badge>
                      </Button>

                      <Button 
                        onClick={() => handlePasswordlessLogin('biometric')}
                        disabled={isAuthenticating}
                        className="w-full bg-green-600 hover:bg-green-600/80 flex items-center gap-2"
                      >
                        <Fingerprint className="w-4 h-4" />
                        Biometric Login
                        <Badge className="ml-2 bg-blue-500/20 text-blue-400">
                          Face + Voice
                        </Badge>
                      </Button>

                      <Button 
                        onClick={() => handlePasswordlessLogin('fusion')}
                        disabled={isAuthenticating}
                        className="w-full bg-purple-600 hover:bg-purple-600/80 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        AI Fusion Login
                        <Badge className="ml-2 bg-purple-500/20 text-purple-400">
                          Multi-Modal
                        </Badge>
                      </Button>

                      {isAuthenticating && (
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-4 h-4 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-white font-medium">Analyzing behavioral patterns...</span>
                          </div>
                          <Progress value={75} className="h-2" />
                          <div className="text-gray-400 text-sm mt-2">
                            Processing biometric data and behavior analytics
                          </div>
                        </div>
                      )}
                    </div>

                    <Alert className="bg-green-500/10 border-green-500/30">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-gray-300">
                        <strong>Frictionless & Secure:</strong> No passwords required. Authentication adapts to your unique behavioral patterns.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Authentication Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Continuous background monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Adaptive threshold learning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Silent re-verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Anti-spoofing protection</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Feed */}
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0ea5e9]" />
                    Real-time Security Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {recentAnomalies.map((anomaly, index) => (
                        <div key={anomaly.id} className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-400" />
                              <span className="text-white font-medium">{anomaly.type.replace('_', ' ').toUpperCase()} Anomaly</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(anomaly.severity)}>
                                {anomaly.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                {anomaly.confidence}% confidence
                              </Badge>
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm mb-2">{anomaly.description}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500 text-xs">
                              {anomaly.timestamp.toLocaleTimeString()} • Action: {anomaly.action_taken}
                            </div>
                            {!anomaly.resolved && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAnomalyResponse(anomaly.id, 'dismiss')}
                                  className="text-white"
                                >
                                  Dismiss
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAnomalyResponse(anomaly.id, 'investigate')}
                                  className="bg-orange-600 hover:bg-orange-600/80"
                                >
                                  Investigate
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#0ea5e9]" />
                    Behavior-Based Continuous Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">50+ Behavioral Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-[#0ea5e9] text-sm font-medium">Touch & Gesture</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Swipe pattern recognition</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Tap pressure analytics</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Gesture heatmap analysis</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Screen hold pressure ML</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[#0ea5e9] text-sm font-medium">Typing & Navigation</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Typing speed biometric</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Keystroke dynamics engine</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">App navigation flow learning</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Typing rhythm + dwell time</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[#0ea5e9] text-sm font-medium">Motion & Context</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Micro-motion gyroscope tracking</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Gait analysis for motion</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Pocket vs. hand detection</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Ambient sound correlation</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[#0ea5e9] text-sm font-medium">Intelligence & Security</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Location consistency modeling</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Real-time anomaly engine</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Passive face + voice fusion</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Context-aware detection</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Alert className="bg-blue-500/10 border-blue-500/30">
                        <Info className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-gray-300">
                          <strong>Continuous Learning:</strong> The system adapts to your unique patterns and becomes more accurate over time.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">ML Models Active</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">LSTM Behavior Model</span>
                            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">CNN Pattern Classifier</span>
                            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">SVM Anomaly Scorer</span>
                            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Real-time Clustering</span>
                            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Performance Metrics</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">False Positive Rate</span>
                              <span className="text-white">0.8%</span>
                            </div>
                            <Progress value={8} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Detection Accuracy</span>
                              <span className="text-white">99.2%</span>
                            </div>
                            <Progress value={99.2} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Response Time</span>
                              <span className="text-white">&lt; 100ms</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="passwordless" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#0ea5e9]" />
                    Smart Passwordless Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Advanced Passwordless System</div>
                    <div className="text-gray-400 mb-6">Device fusion, biometric, and behavior-based authentication</div>
                    <Button className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80">
                      <Unlock className="w-4 h-4 mr-2" />
                      Configure Authentication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0ea5e9]" />
                    Data Privacy & Control Framework
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Privacy-First Design</div>
                    <div className="text-gray-400 mb-6">Minimal data exposure, differential privacy, and user control</div>
                    <Button className="bg-green-600 hover:bg-green-600/80">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#0ea5e9]" />
                    Compliance & Legal Trust Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Regulatory Compliance</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">DPDP Act 2023</span>
                            <Badge className={complianceStatus.dpdp_compliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {complianceStatus.dpdp_compliant ? 'Compliant' : 'Non-Compliant'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">GDPR</span>
                            <Badge className={complianceStatus.gdpr_compliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {complianceStatus.gdpr_compliant ? 'Compliant' : 'Non-Compliant'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">RBI Guidelines</span>
                            <Badge className={complianceStatus.rbi_compliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {complianceStatus.rbi_compliant ? 'Compliant' : 'Non-Compliant'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Consent Management</span>
                            <Badge className={complianceStatus.consent_valid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {complianceStatus.consent_valid ? 'Valid' : 'Invalid'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Data Protection</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Encryption Status</span>
                            <span className="text-white text-sm">{complianceStatus.encryption_status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Data Retention</span>
                            <span className="text-white text-sm">{complianceStatus.data_retention_days} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Audit Trail</span>
                            <span className="text-white text-sm">{complianceStatus.audit_trail_complete ? 'Complete' : 'Incomplete'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Last Check</span>
                            <span className="text-white text-sm">{complianceStatus.last_compliance_check.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Alert className="bg-green-500/10 border-green-500/30">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-gray-300">
                          <strong>Fully Compliant:</strong> All regulatory requirements met with automated monitoring and reporting.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-3">Compliance Features</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Built-in DPDP, GDPR, RBI checker</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Consent log hashing for legal proof</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Right to forget: On-demand deletion</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Data residency control</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Access audit reports (PDF/CSV)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">Role-based data access (RBAC)</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-600/80">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Compliance Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Real-time Anomaly Detection & Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {recentAnomalies.map((anomaly) => (
                        <div key={anomaly.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <AlertTriangle className="w-5 h-5 text-orange-400" />
                              <div>
                                <div className="text-white font-medium">{anomaly.type.replace('_', ' ').toUpperCase()} Detection</div>
                                <div className="text-gray-400 text-sm">{anomaly.timestamp.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(anomaly.severity)}>
                                {anomaly.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                {anomaly.confidence}% confidence
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="text-white text-sm font-medium mb-1">Detection Details</div>
                              <div className="text-gray-400 text-sm">{anomaly.description}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-400">Action Taken</div>
                                <div className="text-white font-medium">{anomaly.action_taken.replace('_', ' ').toUpperCase()}</div>
                              </div>
                              <div>
                                <div className="text-gray-400">User Notified</div>
                                <div className="text-white font-medium">{anomaly.user_notified ? 'Yes' : 'No'}</div>
                              </div>
                            </div>

                            {!anomaly.resolved && (
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAnomalyResponse(anomaly.id, 'dismiss')}
                                  className="text-white"
                                >
                                  Mark Safe
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAnomalyResponse(anomaly.id, 'investigate')}
                                  className="bg-yellow-600 hover:bg-yellow-600/80"
                                >
                                  Investigate
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAnomalyResponse(anomaly.id, 'block_user')}
                                  className="bg-red-600 hover:bg-red-600/80"
                                >
                                  Block User
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0ea5e9]" />
                    Active Session Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {activeSessions.map((session) => (
                        <div key={session.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <UserCheck className="w-5 h-5 text-blue-400" />
                              <div>
                                <div className="text-white font-medium">User: {session.user_id}</div>
                                <div className="text-gray-400 text-sm">Device: {session.device_fingerprint}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getTrustLevelColor(session.trust_level)}>
                                {session.trust_level.toUpperCase()} TRUST
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                {session.behavior_score}% score
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <div className="text-gray-400">Login Method</div>
                              <div className="text-white font-medium">{session.login_method.toUpperCase()}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Location</div>
                              <div className="text-white font-medium">{session.location}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Session Start</div>
                              <div className="text-white font-medium">{session.session_start.toLocaleTimeString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Last Activity</div>
                              <div className="text-white font-medium">{session.last_activity.toLocaleTimeString()}</div>
                            </div>
                          </div>

                          {session.anomaly_flags.length > 0 && (
                            <div className="mb-4">
                              <div className="text-white text-sm font-medium mb-2">Anomaly Flags</div>
                              <div className="flex flex-wrap gap-1">
                                {session.anomaly_flags.map((flag, index) => (
                                  <Badge key={index} variant="outline" className="text-orange-400 border-orange-400/30">
                                    {flag.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            {session.verification_required && (
                              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-600/80">
                                <Shield className="w-3 h-3 mr-1" />
                                Verify
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-white">
                              <Eye className="w-3 h-3 mr-1" />
                              Monitor
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-600/80">
                              <XCircle className="w-3 h-3 mr-1" />
                              End Session
                            </Button>
                          </div>
                        </div>
                      ))}
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