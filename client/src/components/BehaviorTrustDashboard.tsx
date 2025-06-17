import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  Clock,
  User,
  Brain,
  Target,
  BarChart3,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react';

interface BehaviorPoint {
  timestamp: number;
  trustScore: number;
  event: string;
  details: string;
}

interface BehaviorSession {
  id: string;
  startTime: Date;
  trustPoints: BehaviorPoint[];
  status: 'good' | 'uncertain' | 'blocked';
  riskFactors: string[];
}

export function BehaviorTrustDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSession, setCurrentSession] = useState<BehaviorSession | null>(null);
  const [privacyScore, setPrivacyScore] = useState(87.3);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [behaviorStatus, setBehaviorStatus] = useState<'good' | 'uncertain' | 'blocked'>('good');
  const [recentChanges, setRecentChanges] = useState<string[]>([]);
  const [userHabits, setUserHabits] = useState({
    avgTypingSpeed: 65,
    mouseMovements: 'steady',
    clickPattern: 'consistent',
    scrollBehavior: 'normal'
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize session data
  useEffect(() => {
    const session: BehaviorSession = {
      id: 'session-' + Date.now(),
      startTime: new Date(),
      trustPoints: [],
      status: 'good',
      riskFactors: []
    };

    // Generate trust timeline data
    const now = Date.now();
    for (let i = 0; i < 20; i++) {
      const timestamp = now - (19 - i) * 30000; // 30 second intervals
      const baseScore = 85 + Math.random() * 10;
      const variation = (Math.sin(i * 0.3) * 5) + (Math.random() * 10 - 5);
      
      session.trustPoints.push({
        timestamp,
        trustScore: Math.max(0, Math.min(100, baseScore + variation)),
        event: i % 4 === 0 ? 'Authentication' : i % 3 === 0 ? 'Activity Check' : 'Passive Monitor',
        details: `Trust verification at ${new Date(timestamp).toLocaleTimeString()}`
      });
    }

    setCurrentSession(session);
  }, []);

  // Draw behavior trust timeline
  useEffect(() => {
    if (!canvasRef.current || !currentSession) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;

    // Clear canvas with dark background
    ctx.fillStyle = darkMode ? '#0f172a' : '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = darkMode ? '#334155' : '#475569';
    ctx.lineWidth = 1;
    
    // Vertical grid lines (time)
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * (width - padding * 2);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines (trust score)
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * (height - padding * 2);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw trust timeline
    if (currentSession.trustPoints.length > 0) {
      const points = currentSession.trustPoints;
      const xStep = (width - padding * 2) / (points.length - 1);
      
      // Create gradient for trust line
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#22d3ee'); // Cyan
      gradient.addColorStop(0.5, '#06b6d4'); // Darker cyan
      gradient.addColorStop(1, '#0891b2'); // Dark cyan
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      points.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = height - padding - ((point.trustScore / 100) * (height - padding * 2));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw trust points
      points.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = height - padding - ((point.trustScore / 100) * (height - padding * 2));
        
        // Point color based on trust score
        if (point.trustScore > 80) {
          ctx.fillStyle = '#10b981'; // Green
        } else if (point.trustScore > 60) {
          ctx.fillStyle = '#f59e0b'; // Yellow
        } else {
          ctx.fillStyle = '#ef4444'; // Red
        }
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw labels
    ctx.fillStyle = darkMode ? '#e2e8f0' : '#f1f5f9';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    
    // Y-axis labels (trust score)
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * (height - padding * 2);
      const score = 100 - (i * 20);
      ctx.fillText(score.toString(), 20, y + 4);
    }
    
    // X-axis labels (time)
    ctx.fillText('Time →', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Trust Score', 0, 0);
    ctx.restore();

  }, [currentSession, darkMode]);

  // Simulate behavioral changes
  useEffect(() => {
    const changes = [
      "Typing speed increased by 15% (65 → 75 WPM)",
      "Mouse movement pattern changed to more erratic",
      "Login time differs from usual pattern (+2.3 hours)",
      "New device detected: Chrome on Windows",
      "Scroll behavior: Faster than normal baseline"
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newChange = changes[Math.floor(Math.random() * changes.length)];
        setRecentChanges(prev => [newChange, ...prev.slice(0, 4)]);
        
        // Update behavior status based on changes
        if (recentChanges.length > 2) {
          setBehaviorStatus('uncertain');
        } else if (recentChanges.length > 4) {
          setBehaviorStatus('blocked');
        } else {
          setBehaviorStatus('good');
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [recentChanges.length]);

  // Emergency freeze gesture
  const handleEmergencySwipe = () => {
    setEmergencyMode(true);
    setBehaviorStatus('blocked');
    setTimeout(() => {
      setEmergencyMode(false);
      setBehaviorStatus('good');
    }, 5000);
  };

  // AI Privacy Score calculation
  useEffect(() => {
    const interval = setInterval(() => {
      const newScore = 85 + Math.random() * 10 + (darkMode ? 2 : 0);
      setPrivacyScore(newScore);
    }, 3000);

    return () => clearInterval(interval);
  }, [darkMode]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-[#10b981]';
      case 'uncertain': return 'bg-[#eab308]';
      case 'blocked': return 'bg-[#dc2626]';
      default: return 'bg-[#6b7280]';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-[#10b981]';
      case 'uncertain': return 'text-[#eab308]';
      case 'blocked': return 'text-[#dc2626]';
      default: return 'text-[#6b7280]';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#1e2a3a] via-[#131b26] to-[#1e2a3a]' 
        : 'bg-gradient-to-br from-[#1e2a3a] via-[#131b26] to-[#1e2a3a]'
    } p-6`}>
      
      {/* Emergency Mode Overlay */}
      {emergencyMode && (
        <div className="fixed inset-0 bg-red-950/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <Pause className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h2 className="text-3xl font-bold mb-2">Emergency Mode Active</h2>
            <p className="text-red-200">All data processing frozen</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Behavior Trust Dashboard</h1>
            <p className="text-slate-400 mt-2">Real-time behavioral analysis and trust monitoring</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <Button
              onClick={handleEmergencySwipe}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={emergencyMode}
            >
              <Pause className="w-4 h-4 mr-2" />
              Emergency Freeze
            </Button>
          </div>
        </div>

        {/* Status Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Live Behavior Status */}
          <Card className="bg-[#131b26]/80 border-[#1f2937]/50 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#00bfff]" />
                Live Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(behaviorStatus)} animate-pulse`} />
                <span className={`font-semibold text-lg capitalize ${getStatusTextColor(behaviorStatus)}`}>
                  {behaviorStatus}
                </span>
              </div>
              <div className="text-slate-400 text-sm mt-2">
                {behaviorStatus === 'good' && 'All patterns normal'}
                {behaviorStatus === 'uncertain' && 'Some anomalies detected'}
                {behaviorStatus === 'blocked' && 'High risk - access limited'}
              </div>
            </CardContent>
          </Card>

          {/* AI Privacy Score */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Privacy Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {privacyScore.toFixed(1)}%
              </div>
              <Progress value={privacyScore} className="h-2 mb-2" />
              <div className="text-slate-400 text-xs">
                AI-generated based on behavior patterns
              </div>
            </CardContent>
          </Card>

          {/* Session Timer */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Session Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {currentSession ? 
                  Math.floor((Date.now() - currentSession.startTime.getTime()) / 60000) : 0}m
              </div>
              <div className="text-slate-400 text-xs">
                Active monitoring since login
              </div>
            </CardContent>
          </Card>

          {/* Trust Points */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Trust Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {currentSession?.trustPoints.length || 0}
              </div>
              <div className="text-slate-400 text-xs">
                Verification events this session
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Behavior Trust Timeline */}
          <Card className="lg:col-span-2 bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
                Behavior Trust Timeline
              </CardTitle>
              <div className="text-slate-400 text-sm">
                Real-time trust score visualization per session
              </div>
            </CardHeader>
            <CardContent>
              <canvas
                ref={canvasRef}
                className="w-full h-64 rounded-lg border border-slate-700/30"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Session Start</span>
                <span>Current Time</span>
              </div>
            </CardContent>
          </Card>

          {/* User Habits Visualization */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-6 h-6 text-purple-400" />
                User Habits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Typing Speed</span>
                  <span className="text-white">{userHabits.avgTypingSpeed} WPM</span>
                </div>
                <Progress value={(userHabits.avgTypingSpeed / 100) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Mouse Pattern</span>
                  <Badge className="bg-cyan-600 text-white text-xs">
                    {userHabits.mouseMovements}
                  </Badge>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Click Pattern</span>
                  <Badge className="bg-green-600 text-white text-xs">
                    {userHabits.clickPattern}
                  </Badge>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Scroll Behavior</span>
                  <Badge className="bg-blue-600 text-white text-xs">
                    {userHabits.scrollBehavior}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Behavioral Changes Log */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                Behavioral Changes
              </CardTitle>
              <div className="text-slate-400 text-sm">
                Recent deviations from normal patterns
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {recentChanges.length === 0 ? (
                  <div className="text-slate-500 text-center py-4">
                    No recent behavioral changes detected
                  </div>
                ) : (
                  recentChanges.map((change, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-white text-sm">{change}</div>
                        <div className="text-slate-400 text-xs mt-1">
                          {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Correct
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* App Behavior Simulator */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-400" />
                Behavior Simulator
              </CardTitle>
              <div className="text-slate-400 text-sm">
                Test scenarios for new user training
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setBehaviorStatus('good')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Normal User
                </Button>
                
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => setBehaviorStatus('uncertain')}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Suspicious
                </Button>
                
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setBehaviorStatus('blocked')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Blocked User
                </Button>
                
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    const newChange = "Simulated: Unusual keyboard pattern detected";
                    setRecentChanges(prev => [newChange, ...prev.slice(0, 4)]);
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Trigger Alert
                </Button>
              </div>
              
              <div className="text-xs text-slate-400 text-center pt-2">
                Use these controls to simulate different user behaviors for testing
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BehaviorTrustDashboard;