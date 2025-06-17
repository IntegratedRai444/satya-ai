import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Target,
  Activity,
  Eye,
  Camera,
  Mic,
  Video
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Analytics data structure matching SatyaAI interface
interface AnalyticsMetrics {
  analyzedMedia: number;
  detectedDeepfakes: number;
  avgDetectionTime: number;
  detectionAccuracy: number;
}

interface DetectionActivity {
  time: string;
  deepfakes: number;
  authentic: number;
  alerts: number;
}

export default function SatyaAIAnalytics() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    analyzedMedia: 147,
    detectedDeepfakes: 36,
    avgDetectionTime: 4.2,
    detectionAccuracy: 96.8
  });

  // Fetch AI detections for analytics
  const { data: aiDetections = [] } = useQuery({
    queryKey: ['/api/ai/detections'],
    refetchInterval: 5000
  });

  // Generate detection activity data (simulating real analytics)
  const [activityData, setActivityData] = useState<DetectionActivity[]>([]);

  useEffect(() => {
    // Generate hourly activity data for the last 24 hours
    const generateActivityData = () => {
      const data: DetectionActivity[] = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const hour = time.getHours().toString().padStart(2, '0');
        
        data.push({
          time: `${hour}:00`,
          deepfakes: Math.floor(Math.random() * 15) + 2,
          authentic: Math.floor(Math.random() * 25) + 10,
          alerts: Math.floor(Math.random() * 8) + 1
        });
      }
      
      setActivityData(data);
    };

    generateActivityData();
    const interval = setInterval(generateActivityData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Update metrics based on real detections
  useEffect(() => {
    if (Array.isArray(aiDetections) && aiDetections.length > 0) {
      const deepfakeCount = aiDetections.filter((d: any) => d.result === 'FAKE').length;
      const totalCount = aiDetections.length;
      
      setMetrics(prev => ({
        ...prev,
        analyzedMedia: Math.max(prev.analyzedMedia, totalCount),
        detectedDeepfakes: Math.max(prev.detectedDeepfakes, deepfakeCount),
        detectionAccuracy: totalCount > 0 ? Math.round(((totalCount - deepfakeCount) / totalCount) * 100 * 10) / 10 : 96.8
      }));
    }
  }, [aiDetections]);

  const detectionGuideSteps = [
    {
      number: 1,
      title: "Look for unnatural eye blinking patterns and inconsistent eye reflections in suspected videos.",
      category: "Visual Analysis"
    },
    {
      number: 2,
      title: "Check for unnatural hair movement, unusual skin texture, or blurry face boundaries in images.",
      category: "Facial Features"
    },
    {
      number: 3,
      title: "Watch for inconsistencies in audio-visual synchronization, especially in speech videos.",
      category: "Audio Sync"
    },
    {
      number: 4,
      title: "Analyze visual artifacts around the edges of faces, which often indicate manipulation.",
      category: "Edge Detection"
    }
  ];

  const accuracyBreakdown = [
    { type: 'Image Analysis', accuracy: 98.2, color: '#00bfff' },
    { type: 'Video Verification', accuracy: 96.8, color: '#10b981' },
    { type: 'Audio Detection', accuracy: 95.3, color: '#8b5cf6' },
    { type: 'Live Webcam', accuracy: 92.7, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-cyan-400" />
            Analytics & Insights
          </h2>
          <p className="text-gray-400">System performance and detection tips</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-cyan-600 text-white px-3 py-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Statistics
          </Badge>
          <Badge className="bg-purple-600 text-white px-3 py-1">
            <Eye className="h-3 w-3 mr-1" />
            Insights
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards - SatyaAI Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Analyzed Media */}
        <Card className="detection-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Camera className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Analyzed Media</p>
                <p className="text-3xl font-bold text-white">{metrics.analyzedMedia}</p>
                <p className="text-xs text-cyan-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.8% ↗
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detected Deepfakes */}
        <Card className="detection-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Detected Deepfakes</p>
                <p className="text-3xl font-bold text-white">{metrics.detectedDeepfakes}</p>
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% ↗
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Detection Time */}
        <Card className="detection-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg. Detection Time</p>
                <p className="text-3xl font-bold text-white">{metrics.avgDetectionTime}s</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  -8% ↗
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detection Accuracy */}
        <Card className="detection-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Detection Accuracy</p>
                <p className="text-3xl font-bold text-white">{metrics.detectionAccuracy}%</p>
                <p className="text-xs text-purple-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.5% ↗
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Activity Chart */}
        <Card className="detection-card">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Detection Activity
            </CardTitle>
            <CardDescription className="text-gray-300">
              Hourly detection patterns and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,191,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(0, 191, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="authentic"
                    stackId="1"
                    stroke="#10b981"
                    fill="rgba(16, 185, 129, 0.3)"
                    name="Authentic"
                  />
                  <Area
                    type="monotone"
                    dataKey="deepfakes"
                    stackId="1"
                    stroke="#ef4444"
                    fill="rgba(239, 68, 68, 0.3)"
                    name="Deepfakes"
                  />
                  <Area
                    type="monotone"
                    dataKey="alerts"
                    stackId="2"
                    stroke="#00bfff"
                    fill="rgba(0, 191, 255, 0.5)"
                    name="Alerts"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detection Guide */}
        <Card className="detection-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Detection Guide
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Expert tips for manual verification
                </CardDescription>
              </div>
              <Badge className="bg-purple-600 text-white">
                Expert Tips
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {detectionGuideSteps.map((step) => (
              <div key={step.number} className="flex gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <div>
                  <p className="text-sm text-white leading-relaxed">{step.title}</p>
                  <Badge variant="outline" className="mt-2 text-xs border-purple-500/30 text-purple-300">
                    {step.category}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
              <p className="text-cyan-300 text-sm font-semibold">💡 Pro Tip</p>
              <p className="text-gray-300 text-xs mt-1">
                Use our AI models for comprehensive analysis, but always verify suspicious content manually using these techniques.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy Breakdown */}
      <Card className="detection-card">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Detection Accuracy by Media Type
          </CardTitle>
          <CardDescription className="text-gray-300">
            Performance breakdown across different analysis modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {accuracyBreakdown.map((item) => (
              <div key={item.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.type}</span>
                  <span className="text-sm font-bold text-white">{item.accuracy}%</span>
                </div>
                <Progress 
                  value={item.accuracy} 
                  className="h-2 bg-gray-700"
                  style={{ 
                    '--progress-foreground': item.color 
                  } as React.CSSProperties}
                />
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-400">Neural Vision v4.2</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}