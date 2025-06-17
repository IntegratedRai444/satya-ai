import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  Camera, 
  MapPin, 
  Users, 
  Globe, 
  Shield, 
  AlertTriangle,
  Play,
  Pause,
  Search,
  Target,
  Zap,
  Monitor,
  Radar,
  Activity,
  Clock,
  Map
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IPTrafficData {
  sourceIP: string;
  targetIP: string;
  sourceCountry: string;
  targetCountry: string;
  attackType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  coordinates: {
    source: [number, number];
    target: [number, number];
  };
}

interface CCTVAlert {
  cameraId: string;
  location: string;
  alertType: 'fight' | 'intrusion' | 'violence' | 'suspicious';
  confidence: number;
  timestamp: string;
  imageUrl?: string;
  description: string;
}

interface FaceMatch {
  personId: string;
  matchedFrames: number;
  confidence: number;
  lastSeen: string;
  locations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface GPSSpoofingAlert {
  deviceId: string;
  suspectedLocation: [number, number];
  actualLocation: [number, number];
  confidence: number;
  spoofingMethod: string;
  timestamp: string;
}

interface DarknetActivity {
  marketplaceName: string;
  activityType: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  itemsTracked: number;
  lastUpdate: string;
  categories: string[];
}

interface PatternOfLife {
  targetId: string;
  routinePatterns: string[];
  frequentLocations: string[];
  timePatterns: string[];
  socialConnections: number;
  riskAssessment: string;
  lastUpdated: string;
}

export default function SurveillanceDashboard() {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('CAM-001');
  const [faceSearchTarget, setFaceSearchTarget] = useState('');
  const [targetPersonId, setTargetPersonId] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Live IP Traffic Data
  const { data: ipTrafficData } = useQuery({
    queryKey: ['/api/surveillance/ip-traffic'],
    refetchInterval: isLiveMode ? 2000 : false,
    enabled: isLiveMode
  });

  // CCTV Alerts
  const { data: cctvAlerts } = useQuery({
    queryKey: ['/api/surveillance/cctv-alerts'],
    refetchInterval: isLiveMode ? 3000 : false
  });

  // Face Matching Results
  const { data: faceMatches } = useQuery({
    queryKey: ['/api/surveillance/face-matches'],
    refetchInterval: isLiveMode ? 5000 : false
  });

  // GPS Spoofing Detection
  const { data: gpsAlerts } = useQuery({
    queryKey: ['/api/surveillance/gps-spoofing'],
    refetchInterval: isLiveMode ? 4000 : false
  });

  // Darknet Monitoring
  const { data: darknetData } = useQuery({
    queryKey: ['/api/surveillance/darknet-activity'],
    refetchInterval: 30000 // Update every 30 seconds
  });

  // Pattern of Life Analysis
  const patternAnalysis = useMutation({
    mutationFn: async (targetId: string) => {
      const response = await fetch('/api/surveillance/pattern-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId })
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    }
  });

  // Face Search Mutation
  const searchFaces = useMutation({
    mutationFn: async (targetImage: string) => {
      const response = await fetch('/api/surveillance/face-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetImage })
      });
      if (!response.ok) throw new Error('Face search failed');
      return response.json();
    }
  });

  // Real-time IP Traffic Visualization
  useEffect(() => {
    if (!canvasRef.current || !ipTrafficData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw world map outline (simplified)
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.stroke();

    // Draw attack vectors
    ipTrafficData.forEach((attack: IPTrafficData, index: number) => {
      const startX = (attack.coordinates.source[1] + 180) * (canvas.width - 100) / 360 + 50;
      const startY = (90 - attack.coordinates.source[0]) * (canvas.height - 100) / 180 + 50;
      const endX = (attack.coordinates.target[1] + 180) * (canvas.width - 100) / 360 + 50;
      const endY = (90 - attack.coordinates.target[0]) * (canvas.height - 100) / 180 + 50;

      // Color based on severity
      const colors = {
        low: '#22c55e',
        medium: '#eab308',
        high: '#f97316',
        critical: '#dc2626'
      };

      ctx.strokeStyle = colors[attack.severity];
      ctx.lineWidth = attack.severity === 'critical' ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Draw source and target points
      ctx.fillStyle = colors[attack.severity];
      ctx.beginPath();
      ctx.arc(startX, startY, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(endX, endY, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [ipTrafficData]);

  return (
    <div className="space-y-6 satya-bg min-h-screen p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Surveillance & Real-Time Monitoring Center
        </h1>
        <p className="text-gray-400">
          Advanced surveillance tools for comprehensive threat monitoring
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`${isLiveMode ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isLiveMode ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLiveMode ? 'Stop Live Mode' : 'Start Live Mode'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ip-traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-cyan-500/30">
          <TabsTrigger value="ip-traffic" className="data-[state=active]:bg-cyan-600">
            <Globe className="h-4 w-4 mr-2" />
            IP Traffic
          </TabsTrigger>
          <TabsTrigger value="cctv-ai" className="data-[state=active]:bg-purple-600">
            <Camera className="h-4 w-4 mr-2" />
            CCTV AI
          </TabsTrigger>
          <TabsTrigger value="face-tracking" className="data-[state=active]:bg-orange-600">
            <Users className="h-4 w-4 mr-2" />
            Face Tracking
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-red-600">
            <Radar className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Live IP Traffic Visualizer */}
        <TabsContent value="ip-traffic" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Globe className="h-5 w-5" />
                Live Global Threat Map
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time visualization of IP traffic and cyber attacks worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full border border-cyan-500/30 rounded-lg bg-gray-900/50"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-400 font-medium">Critical</span>
                    </div>
                    <p className="text-2xl font-bold text-white">47</p>
                    <p className="text-sm text-gray-400">Active attacks</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-400 font-medium">High</span>
                    </div>
                    <p className="text-2xl font-bold text-white">124</p>
                    <p className="text-sm text-gray-400">Suspicious IPs</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-400 font-medium">Medium</span>
                    </div>
                    <p className="text-2xl font-bold text-white">289</p>
                    <p className="text-sm text-gray-400">Port scans</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-medium">Countries</span>
                    </div>
                    <p className="text-2xl font-bold text-white">67</p>
                    <p className="text-sm text-gray-400">Source origins</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CCTV AI Observer */}
        <TabsContent value="cctv-ai" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Camera className="h-5 w-5" />
                AI-Powered CCTV Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time detection of fights, intrusions, violence, and suspicious activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Monitor className="h-8 w-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Active Cameras</h4>
                  <p className="text-2xl font-bold text-purple-400">24</p>
                  <p className="text-sm text-gray-400">Currently monitoring</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Active Alerts</h4>
                  <p className="text-2xl font-bold text-red-400">3</p>
                  <p className="text-sm text-gray-400">Requiring attention</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Eye className="h-8 w-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Detection Rate</h4>
                  <p className="text-2xl font-bold text-green-400">97.3%</p>
                  <p className="text-sm text-gray-400">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Face Tracking & Matching */}
        <TabsContent value="face-tracking" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Users className="h-5 w-5" />
                Advanced Face Matching System
              </CardTitle>
              <CardDescription className="text-gray-300">
                Cross-reference faces across multiple video feeds and public databases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Upload target photo or person ID..."
                  value={faceSearchTarget}
                  onChange={(e) => setFaceSearchTarget(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => searchFaces.mutate(faceSearchTarget)}
                  disabled={searchFaces.isPending || !faceSearchTarget}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Surveillance */}
        <TabsContent value="advanced" className="space-y-6">
          {/* GPS Spoofing Detection */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <MapPin className="h-5 w-5" />
                GPS Spoofing Detection
              </CardTitle>
              <CardDescription className="text-gray-300">
                Triangulation and ML pattern analysis for location verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <MapPin className="h-8 w-8 text-red-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Spoofing Attempts</h4>
                  <p className="text-2xl font-bold text-red-400">7</p>
                  <p className="text-sm text-gray-400">Detected today</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Zap className="h-8 w-8 text-yellow-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Detection Rate</h4>
                  <p className="text-2xl font-bold text-yellow-400">94.2%</p>
                  <p className="text-sm text-gray-400">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Darknet Monitoring */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Shield className="h-5 w-5" />
                Darknet Intelligence Monitor
              </CardTitle>
              <CardDescription className="text-gray-300">
                Safe OSINT tool for monitoring darknet marketplaces and forums
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Globe className="h-8 w-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Marketplaces</h4>
                  <p className="text-2xl font-bold text-purple-400">12</p>
                  <p className="text-sm text-gray-400">Active monitoring</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Threats</h4>
                  <p className="text-2xl font-bold text-red-400">1,847</p>
                  <p className="text-sm text-gray-400">Items tracked</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Updates</h4>
                  <p className="text-2xl font-bold text-green-400">24/7</p>
                  <p className="text-sm text-gray-400">Real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pattern of Life Tracker */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Activity className="h-5 w-5" />
                Pattern-of-Life Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Behavioral pattern analysis using publicly available information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter target person ID or public identifier..."
                  value={targetPersonId}
                  onChange={(e) => setTargetPersonId(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => patternAnalysis.mutate(targetPersonId)}
                  disabled={patternAnalysis.isPending || !targetPersonId}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}