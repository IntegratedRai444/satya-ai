import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Brain, 
  Radar, 
  Globe, 
  Lock, 
  Zap, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Activity,
  Wifi,
  Search,
  FileX,
  Network
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DeepfakeAnalyzer from './DeepfakeAnalyzer';
import TextAnalyzer from './TextAnalyzer';

interface SecurityMetrics {
  deepfakeDetections: number;
  phishingBlocked: number;
  vulnerabilities: number;
  darkWebMentions: number;
  systemIntegrity: number;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface RealTimeAlert {
  id: string;
  type: 'DEEPFAKE' | 'PHISHING' | 'VULNERABILITY' | 'DARK_WEB' | 'INJECTION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: string;
  source?: string;
}

export default function CyberIntelligenceDashboard() {
  const [realTimeAlerts, setRealTimeAlerts] = useState<RealTimeAlert[]>([]);
  const [urlToScan, setUrlToScan] = useState('');
  const [entityToScan, setEntityToScan] = useState('');
  const [ssid, setSsid] = useState('');
  const [bssid, setBssid] = useState('');
  const queryClient = useQueryClient();

  // Fetch AI detections
  const { data: aiDetections = [] } = useQuery({
    queryKey: ['/api/ai/detections'],
    refetchInterval: 5000
  });

  // Fetch security metrics
  const { data: metrics = {} } = useQuery({
    queryKey: ['/api/metrics/latest'],
    refetchInterval: 3000
  });

  // URL Scanner
  const scanUrl = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch('/api/security/scan-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Scan failed');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.isPhishing) {
        setRealTimeAlerts(prev => [...prev, {
          id: Date.now().toString(),
          type: 'PHISHING',
          severity: data.riskScore > 80 ? 'CRITICAL' : data.riskScore > 60 ? 'HIGH' : 'MEDIUM',
          message: `Phishing detected: ${urlToScan}`,
          timestamp: new Date().toISOString(),
          source: urlToScan
        }]);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/security'] });
    }
  });

  // Dark Web Scanner
  const scanDarkWeb = useMutation({
    mutationFn: async (data: { entity: string; entityType: string }) => {
      const response = await fetch('/api/security/scan-darkweb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Scan failed');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.found) {
        setRealTimeAlerts(prev => [...prev, {
          id: Date.now().toString(),
          type: 'DARK_WEB',
          severity: data.threatLevel === 'HIGH' ? 'CRITICAL' : 'HIGH',
          message: `Dark web mention found: ${entityToScan}`,
          timestamp: new Date().toISOString(),
          source: data.sources.join(', ')
        }]);
      }
    }
  });

  // WiFi Security Scanner
  const scanWifi = useMutation({
    mutationFn: async (data: { ssid: string; bssid: string }) => {
      const response = await fetch('/api/security/analyze-wifi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.isSuspicious) {
        setRealTimeAlerts(prev => [...prev, {
          id: Date.now().toString(),
          type: 'PHISHING',
          severity: data.spoofingLikelihood > 0.8 ? 'CRITICAL' : 'HIGH',
          message: `Suspicious WiFi network: ${ssid}`,
          timestamp: new Date().toISOString(),
          source: `${ssid} (${bssid})`
        }]);
      }
    }
  });

  // Real-time WebSocket connection for threat updates
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'threat_update' && data.data) {
        // Add new threat as real-time alert
        setRealTimeAlerts(prev => [...prev.slice(-9), {
          id: Date.now().toString(),
          type: 'VULNERABILITY',
          severity: data.data.severity as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
          message: data.data.title,
          timestamp: data.timestamp,
          source: data.data.source
        }]);
      }
    };

    return () => socket.close();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DEEPFAKE': return <Eye className="h-4 w-4" />;
      case 'PHISHING': return <Shield className="h-4 w-4" />;
      case 'VULNERABILITY': return <AlertTriangle className="h-4 w-4" />;
      case 'DARK_WEB': return <Globe className="h-4 w-4" />;
      case 'INJECTION': return <Lock className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          AI Cyber Intelligence Center
        </h1>
        <p className="text-gray-400">
          Advanced AI-powered threat detection and analysis platform
        </p>
      </div>

      {/* Real-time Alerts */}
      <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Activity className="h-5 w-5" />
            Real-time Threat Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {realTimeAlerts.slice(-10).reverse().map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                  {getTypeIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(alert.timestamp).toLocaleTimeString()} • {alert.source}
                  </p>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
            {realTimeAlerts.length === 0 && (
              <p className="text-gray-400 text-center py-4">No recent alerts</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Eye className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Deepfake Scans</p>
                <p className="text-xl font-bold text-white">{Array.isArray(aiDetections) ? aiDetections.filter((d: any) => d.detectionType === 'DEEPFAKE').length : 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Text Analysis</p>
                <p className="text-xl font-bold text-white">{Array.isArray(aiDetections) ? aiDetections.filter((d: any) => d.detectionType === 'FAKE_NEWS').length : 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Threats Blocked</p>
                <p className="text-xl font-bold text-white">{(metrics as any)?.detectedThreats || 42}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">System Health</p>
                <p className="text-xl font-bold text-white">{(metrics as any)?.systemHealth || 95}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tools */}
      <Tabs defaultValue="media" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="media" className="data-[state=active]:bg-cyan-600">
            <Eye className="h-4 w-4 mr-2" />
            Media Analysis
          </TabsTrigger>
          <TabsTrigger value="text" className="data-[state=active]:bg-purple-600">
            <Brain className="h-4 w-4 mr-2" />
            Text Analysis
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-orange-600">
            <Network className="h-4 w-4 mr-2" />
            Network Security
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="data-[state=active]:bg-red-600">
            <Radar className="h-4 w-4 mr-2" />
            Threat Intel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media">
          <DeepfakeAnalyzer />
        </TabsContent>

        <TabsContent value="text">
          <TextAnalyzer />
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          {/* URL Scanner */}
          <Card className="bg-black/40 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Search className="h-5 w-5" />
                Phishing URL Scanner
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time URL analysis and threat detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Enter URL to scan for phishing..."
                  value={urlToScan}
                  onChange={(e) => setUrlToScan(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400"
                />
                <Button
                  onClick={() => scanUrl.mutate(urlToScan)}
                  disabled={scanUrl.isPending || !urlToScan}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {scanUrl.isPending ? 'Scanning...' : 'Scan URL'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* WiFi Security */}
          <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Wifi className="h-5 w-5" />
                WiFi Security Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Detect evil twin attacks and suspicious networks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Network SSID"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="BSSID (MAC Address)"
                  value={bssid}
                  onChange={(e) => setBssid(e.target.value)}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={() => scanWifi.mutate({ ssid, bssid })}
                disabled={scanWifi.isPending || !ssid || !bssid}
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                {scanWifi.isPending ? 'Analyzing...' : 'Analyze Network'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          {/* Dark Web Scanner */}
          <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Globe className="h-5 w-5" />
                Dark Web Intelligence
              </CardTitle>
              <CardDescription className="text-gray-300">
                Monitor for data breaches and compromised credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Email, domain, or credential to monitor..."
                  value={entityToScan}
                  onChange={(e) => setEntityToScan(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400"
                />
                <select className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white">
                  <option value="email">Email</option>
                  <option value="domain">Domain</option>
                  <option value="credential">Credential</option>
                </select>
                <Button
                  onClick={() => scanDarkWeb.mutate({ entity: entityToScan, entityType: 'email' })}
                  disabled={scanDarkWeb.isPending || !entityToScan}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {scanDarkWeb.isPending ? 'Scanning...' : 'Scan Dark Web'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent AI Detections */}
          <Card className="bg-black/40 border-gray-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-400">
                <FileX className="h-5 w-5" />
                Recent AI Detections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.isArray(aiDetections) && aiDetections.slice(-5).map((detection: any) => (
                  <div key={detection.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">{detection.detectionType}</p>
                      <p className="text-gray-400 text-xs">
                        {detection.fileName || 'Text analysis'} • {new Date(detection.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={getSeverityColor(detection.result === 'FAKE' ? 'HIGH' : 'LOW')}>
                      {detection.result}
                    </Badge>
                  </div>
                ))}
                {(!Array.isArray(aiDetections) || aiDetections.length === 0) && (
                  <p className="text-gray-400 text-center py-4">No detections yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}