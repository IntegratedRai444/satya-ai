import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Eye,
  Brain,
  Zap,
  Globe,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Activity,
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Target,
  Monitor,
  Database,
  Network,
  Cpu,
  HardDrive,
  Lock,
  Unlock,
  Bell,
  User,
  Crown,
  Plus,
  Info,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Volume2,
  Video,
  FileImage,
  Webcam,
  Camera,
  Waves,
  Scale,
  MessageSquare,
  Ghost,
  QrCode,
  ShieldAlert,
  AlertOctagon,
  Layers,
  Radar,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Home,
  History,
  HelpCircle,
  ChevronUp,
  Wifi
} from 'lucide-react';

interface ThreatData {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  timestamp: string;
  source: string;
}

interface CompanyData {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employees: number;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'suspended';
  securityScore: number;
  threats: number;
  vulnerabilities: number;
  compliance: number;
}

interface DetectionResult {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio';
  status: 'authentic' | 'deepfake' | 'suspicious';
  confidence: number;
  timestamp: Date;
}

const UnifiedCyberPlatform = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState('overview');
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [recentActivity, setRecentActivity] = useState<DetectionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [realTimeData, setRealTimeData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchRealTimeData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch threat intelligence
      const threatResponse = await fetch('/api/threat-intelligence/current');
      if (threatResponse.ok) {
        const threatData = await threatResponse.json();
        setThreats(threatData.threats || []);
      }

      // Fetch enterprise companies
      const companiesResponse = await fetch('/api/enterprise/companies');
      if (companiesResponse.ok) {
        const companiesData = await companiesResponse.json();
        setCompanies(companiesData);
      }

      // Fetch behavioral analysis
      const behaviorResponse = await fetch('/api/behavioral-auth/analysis');
      if (behaviorResponse.ok) {
        const behaviorData = await behaviorResponse.json();
        setRealTimeData((prev: any) => ({ ...prev, behavior: behaviorData }));
      }

      // Initialize sample recent activity
      setRecentActivity([
        {
          id: '1',
          filename: 'profile_verification.jpg',
          type: 'image',
          status: 'authentic',
          confidence: 94.2,
          timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
          id: '2',
          filename: 'security_footage.mp4',
          type: 'video',
          status: 'suspicious',
          confidence: 67.8,
          timestamp: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: '3',
          filename: 'voice_sample.wav',
          type: 'audio',
          status: 'deepfake',
          confidence: 89.5,
          timestamp: new Date(Date.now() - 45 * 60 * 1000)
        }
      ]);
    } catch (error) {
      console.log('Using fallback data');
    }
  };

  const fetchRealTimeData = async () => {
    try {
      const [threatRes, enterpriseRes, behaviorRes] = await Promise.all([
        fetch('/api/threat-intelligence/current'),
        fetch('/api/enterprise/metrics'),
        fetch('/api/behavioral-auth/analysis')
      ]);

      if (threatRes.ok) {
        const data = await threatRes.json();
        setThreats(data.threats || []);
      }

      if (enterpriseRes.ok) {
        const data = await enterpriseRes.json();
        setRealTimeData((prev: any) => ({ ...prev, enterprise: data }));
      }

      if (behaviorRes.ok) {
        const data = await behaviorRes.json();
        setRealTimeData((prev: any) => ({ ...prev, behavior: data }));
      }
    } catch (error) {
      console.log('Real-time update failed');
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze-media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        
        const newActivity: DetectionResult = {
          id: Date.now().toString(),
          filename: file.name,
          type: file.type.startsWith('video/') ? 'video' : 
                file.type.startsWith('audio/') ? 'audio' : 'image',
          status: result.is_authentic ? 'authentic' : 'deepfake',
          confidence: result.confidence_percentage || (result.confidence * 100),
          timestamp: new Date()
        };

        setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
        
        setAnalysisResults({
          filename: file.name,
          isAuthentic: result.is_authentic,
          confidence: result.confidence_percentage || (result.confidence * 100),
          details: result.key_findings || [],
          riskLevel: result.risk_level || 'UNKNOWN',
          recommendation: result.recommendation || 'Analysis complete'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold">SatyaAI</div>
            <div className="text-gray-400 text-xs">Unified Cyber Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Core Features */}
          <div>
            <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Core Platform</div>
            <div className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3, subsections: ['overview', 'metrics', 'alerts'] },
                { id: 'deepfake', label: 'Deepfake Detection', icon: Eye, subsections: ['analysis', 'webcam', 'batch'] },
                { id: 'threats', label: 'Threat Intelligence', icon: Target, subsections: ['live', 'analysis', 'reports'] },
                { id: 'behavioral', label: 'Behavioral Auth', icon: Brain, subsections: ['monitoring', 'patterns', 'scores'] }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Security Services */}
          <div>
            <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Security Services</div>
            <div className="space-y-1">
              {[
                { id: 'forensics', label: 'Identity Forensics', icon: Search, subsections: ['cases', 'tools', 'evidence'] },
                { id: 'misinformation', label: 'Misinformation', icon: MessageSquare, subsections: ['detector', 'analysis', 'reports'] },
                { id: 'compliance', label: 'Compliance', icon: CheckCircle, subsections: ['frameworks', 'audits', 'reports'] },
                { id: 'startup-audit', label: 'Startup Audit', icon: Building, subsections: ['assessment', 'recommendations', 'remediation'] }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enterprise & Business */}
          <div>
            <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Enterprise</div>
            <div className="space-y-1">
              {[
                { id: 'enterprise', label: 'Company Management', icon: Building, subsections: ['companies', 'scans', 'incidents'] },
                { id: 'cybercrime-law', label: 'Cybercrime Law', icon: Scale, subsections: ['database', 'cases', 'consultation'] },
                { id: 'news', label: 'Cyber Intelligence', icon: Globe, subsections: ['live-news', 'analysis', 'trends'] }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Advanced</div>
            <div className="space-y-1">
              {[
                { id: 'neural', label: 'Neural Networks', icon: Cpu, subsections: ['models', 'training', 'inference'] },
                { id: 'analytics', label: 'Advanced Analytics', icon: Activity, subsections: ['dashboards', 'insights', 'reports'] },
                { id: 'api', label: 'API Management', icon: Database, subsections: ['endpoints', 'documentation', 'testing'] }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Status Panel */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">All Systems Active</span>
          </div>
          <div className="text-white text-xs">
            247 companies protected
          </div>
          <div className="text-gray-400 text-xs">
            Real-time monitoring
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Unified Cyber Intelligence</h1>
          <p className="text-gray-400">Complete security analysis and threat detection platform</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/20 text-green-400">All Systems Operational</Badge>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">Real-time Active</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <Badge className="bg-red-500/20 text-red-400">Active</Badge>
            </div>
            <div className="text-white text-2xl font-bold">{threats.length || 23}</div>
            <div className="text-gray-400 text-sm">Active Threats</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingDown className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">-15% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-400" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">Protected</Badge>
            </div>
            <div className="text-white text-2xl font-bold">{companies.length || 247}</div>
            <div className="text-gray-400 text-sm">Companies Secured</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+5.2% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
              <Badge className="bg-green-500/20 text-green-400">Analysis</Badge>
            </div>
            <div className="text-white text-2xl font-bold">1,247</div>
            <div className="text-gray-400 text-sm">Media Analyzed</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+22% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400">Security</Badge>
            </div>
            <div className="text-white text-2xl font-bold">94.7%</div>
            <div className="text-gray-400 text-sm">Detection Accuracy</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+2.1% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Threat Feed */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-red-400" />
              Live Threat Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threats.slice(0, 5).map((threat, index) => (
                <div key={threat.id || index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    threat.severity === 'critical' ? 'bg-red-500' :
                    threat.severity === 'high' ? 'bg-orange-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{threat.type || 'Security Alert'}</div>
                    <div className="text-gray-400 text-xs">{threat.source || 'System Detection'}</div>
                  </div>
                  <Badge className={`text-xs ${
                    threat.status === 'blocked' ? 'bg-green-500/20 text-green-400' :
                    threat.status === 'investigating' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {threat.status || 'Detected'}
                  </Badge>
                  <div className="text-gray-500 text-xs">
                    {new Date(threat.timestamp || Date.now()).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Analysis Results */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              Recent Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.status === 'authentic' ? 'bg-green-500/20' :
                    activity.status === 'deepfake' ? 'bg-red-500/20' : 'bg-orange-500/20'
                  }`}>
                    {activity.type === 'image' ? <FileImage className="w-5 h-5 text-blue-400" /> :
                     activity.type === 'video' ? <Video className="w-5 h-5 text-green-400" /> :
                     <Volume2 className="w-5 h-5 text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{activity.filename}</div>
                    <div className="text-gray-400 text-xs">
                      {activity.confidence.toFixed(1)}% confidence
                    </div>
                  </div>
                  <Badge className={`text-xs ${
                    activity.status === 'authentic' ? 'bg-green-500/20 text-green-400' :
                    activity.status === 'deepfake' ? 'bg-red-500/20 text-red-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'API Response Time', value: '245ms', status: 'good' },
                { name: 'Detection Accuracy', value: '94.7%', status: 'excellent' },
                { name: 'System Uptime', value: '99.94%', status: 'excellent' },
                { name: 'Active Connections', value: '1,247', status: 'good' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{metric.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-400' :
                      metric.status === 'good' ? 'bg-blue-400' : 'bg-orange-400'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Global Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-white">45</div>
              <div className="text-gray-400 text-sm">Countries Protected</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white font-bold">247</div>
                  <div className="text-gray-400">Active Networks</div>
                </div>
                <div>
                  <div className="text-white font-bold">47.5K</div>
                  <div className="text-gray-400">Protected Users</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              AI Models Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Deepfake Detection', status: 'active', accuracy: 98.2 },
                { name: 'Threat Analysis', status: 'active', accuracy: 94.7 },
                { name: 'Behavioral Auth', status: 'active', accuracy: 96.1 },
                { name: 'Voice Cloning', status: 'training', accuracy: 92.3 }
              ].map((model, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{model.name}</div>
                    <div className="text-gray-400 text-xs">{model.accuracy}% accuracy</div>
                  </div>
                  <Badge className={`text-xs ${
                    model.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {model.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const DeepfakeDetectionView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Deepfake Detection Suite</h1>
          <p className="text-gray-400">Advanced AI-powered media authentication and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-500/20 text-cyan-400">Neural Vision v4.2</Badge>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Detection Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Image Analysis',
            accuracy: '98.2%',
            icon: FileImage,
            color: 'blue',
            features: ['Photoshop Detection', 'GAN Detection', 'Metadata Analysis']
          },
          {
            title: 'Video Verification',
            accuracy: '96.8%',
            icon: Video,
            color: 'green',
            features: ['Facial Inconsistencies', 'Temporal Analysis', 'Lip-Sync Verification']
          },
          {
            title: 'Audio Detection',
            accuracy: '95.3%',
            icon: Volume2,
            color: 'purple',
            features: ['Voice Cloning', 'Spectral Analysis', 'Prosody Patterns']
          },
          {
            title: 'Live Webcam',
            accuracy: '92.7%',
            icon: Webcam,
            color: 'orange',
            features: ['Real-time Analysis', 'Face Authentication', 'Live Detection']
          }
        ].map((tool, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${tool.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">Accuracy</div>
                  <div className={`text-${tool.color}-400 font-bold`}>{tool.accuracy}</div>
                </div>
              </div>
              <h3 className="text-white font-bold mb-2">{tool.title}</h3>
              <div className="space-y-2 mb-4">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-2 bg-${tool.color}-500/20 text-${tool.color}-400 rounded-lg hover:bg-${tool.color}-500/30 transition-colors flex items-center justify-center gap-2`}>
                START ANALYSIS
                <ArrowRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              Media Upload & Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Drag & Drop Files Here</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Upload images, videos, or audio files for analysis
                  </p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Browse Files'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResults && (
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-bold">Analysis Complete</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">File:</span>
                    <span className="text-white">{analysisResults.filename}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <Badge className={analysisResults.isAuthentic ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                      {analysisResults.isAuthentic ? 'AUTHENTIC' : 'DEEPFAKE'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="text-cyan-400 font-bold">{analysisResults.confidence.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Processing Indicator */}
            {isAnalyzing && (
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                  <span className="text-blue-400 font-medium">Processing media analysis...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              Recent Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.status === 'authentic' ? 'bg-green-500/20' :
                    activity.status === 'deepfake' ? 'bg-red-500/20' : 'bg-orange-500/20'
                  }`}>
                    {activity.type === 'image' ? <FileImage className="w-5 h-5 text-blue-400" /> :
                     activity.type === 'video' ? <Video className="w-5 h-5 text-green-400" /> :
                     <Volume2 className="w-5 h-5 text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{activity.filename}</div>
                    <div className="text-gray-400 text-xs">
                      {activity.confidence.toFixed(1)}% confidence • {activity.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge className={`text-xs ${
                    activity.status === 'authentic' ? 'bg-green-500/20 text-green-400' :
                    activity.status === 'deepfake' ? 'bg-red-500/20 text-red-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ThreatIntelligenceView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Threat Intelligence Center</h1>
          <p className="text-gray-400">Real-time threat monitoring and advanced security analysis</p>
        </div>
        <Badge className="bg-red-500/20 text-red-400">23 Active Threats</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Critical Threats', value: '5', change: '-12%', color: 'red' },
          { title: 'Vulnerabilities', value: '89', change: '-8%', color: 'orange' },
          { title: 'Incidents Resolved', value: '1,247', change: '+15%', color: 'green' },
          { title: 'Security Score', value: '94.7%', change: '+2.1%', color: 'blue' }
        ].map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className={`text-${metric.color}-400 text-2xl font-bold mb-2`}>{metric.value}</div>
              <div className="text-gray-400 text-sm mb-2">{metric.title}</div>
              <div className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change} from yesterday
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Live Threat Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threats.slice(0, 6).map((threat, index) => (
                <div key={threat.id || index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    threat.severity === 'critical' ? 'bg-red-500' :
                    threat.severity === 'high' ? 'bg-orange-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{threat.type || 'Security Event'}</div>
                    <div className="text-gray-400 text-xs">{threat.source || 'Automated Detection'}</div>
                  </div>
                  <Badge className={`text-xs ${
                    threat.status === 'blocked' ? 'bg-green-500/20 text-green-400' :
                    threat.status === 'investigating' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {threat.status || 'Active'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Threat Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'DDoS Attacks', count: 45, trend: 'down' },
                { category: 'Malware Detection', count: 123, trend: 'up' },
                { category: 'Phishing Attempts', count: 67, trend: 'down' },
                { category: 'Data Breaches', count: 12, trend: 'stable' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{item.category}</div>
                    <div className="text-gray-400 text-sm">{item.count} incidents this week</div>
                  </div>
                  <div className={`text-sm ${
                    item.trend === 'up' ? 'text-red-400' :
                    item.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const BehavioralAuthView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Behavioral Authentication</h1>
          <p className="text-gray-400">Advanced behavioral pattern analysis and user verification</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400">50+ Metrics Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Authentication Score', value: '96.8%', icon: Brain, color: 'blue' },
          { title: 'Trust Level', value: 'High', icon: Shield, color: 'green' },
          { title: 'Risk Score', value: 'Low', icon: AlertTriangle, color: 'orange' },
          { title: 'Verification Rate', value: '94.2%', icon: CheckCircle, color: 'purple' }
        ].map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
              </div>
              <div className="text-white text-xl font-bold mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Behavioral Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { pattern: 'Typing Rhythm', score: 94, status: 'normal' },
                { pattern: 'Mouse Movement', score: 87, status: 'normal' },
                { pattern: 'Navigation Pattern', score: 92, status: 'normal' },
                { pattern: 'Session Duration', score: 78, status: 'suspicious' },
                { pattern: 'Location Access', score: 96, status: 'normal' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{item.pattern}</div>
                    <div className="text-gray-400 text-sm">Confidence: {item.score}%</div>
                  </div>
                  <Badge className={`text-xs ${
                    item.status === 'normal' ? 'bg-green-500/20 text-green-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Authentication Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'john.doe@company.com', action: 'Login Attempt', result: 'Success', time: '2 min ago' },
                { user: 'jane.smith@company.com', action: 'Password Reset', result: 'Verified', time: '5 min ago' },
                { user: 'unknown.user@suspicious.com', action: 'Login Attempt', result: 'Blocked', time: '8 min ago' },
                { user: 'admin@company.com', action: 'Privileged Access', result: 'Success', time: '12 min ago' }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{event.user}</div>
                    <div className="text-gray-400 text-xs">{event.action} • {event.time}</div>
                  </div>
                  <Badge className={`text-xs ${
                    event.result === 'Success' || event.result === 'Verified' ? 'bg-green-500/20 text-green-400' :
                    event.result === 'Blocked' ? 'bg-red-500/20 text-red-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {event.result}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const EnterpriseManagementView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Enterprise Management</h1>
          <p className="text-gray-400">Company security management and monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-500/20 text-blue-400">{companies.length} Companies</Badge>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Company
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-blue-400 text-2xl font-bold mb-2">{companies.length}</div>
            <div className="text-gray-400 text-sm">Active Companies</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-green-400 text-2xl font-bold mb-2">94.7%</div>
            <div className="text-gray-400 text-sm">Avg Security Score</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-orange-400 text-2xl font-bold mb-2">23</div>
            <div className="text-gray-400 text-sm">Active Incidents</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-purple-400 text-2xl font-bold mb-2">$1.03M</div>
            <div className="text-gray-400 text-sm">Monthly Revenue</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Company Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.slice(0, 6).map((company) => (
              <div key={company.id} className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-bold">{company.name}</div>
                  <Badge className={`text-xs ${
                    company.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    company.status === 'trial' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {company.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Score:</span>
                    <span className="text-white">{company.securityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employees:</span>
                    <span className="text-white">{company.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-white capitalize">{company.plan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const IdentityForensicsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Identity Forensics Lab</h1>
          <p className="text-gray-400">Advanced digital identity analysis and investigation tools</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400">23 Active Cases</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Cases', value: '23', icon: Search, color: 'blue' },
          { title: 'Solved Cases', value: '156', icon: CheckCircle, color: 'green' },
          { title: 'Evidence Items', value: '1,247', icon: Database, color: 'purple' },
          { title: 'Success Rate', value: '94.7%', icon: Target, color: 'orange' }
        ].map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
              </div>
              <div className="text-white text-xl font-bold mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'CASE-2024-001', type: 'Identity Theft', status: 'investigating', priority: 'high' },
                { id: 'CASE-2024-002', type: 'Synthetic Identity', status: 'closed', priority: 'medium' },
                { id: 'CASE-2024-003', type: 'Account Takeover', status: 'evidence', priority: 'high' },
                { id: 'CASE-2024-004', type: 'Document Fraud', status: 'analyzing', priority: 'low' }
              ].map((case_, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{case_.id}</div>
                    <div className="text-gray-400 text-xs">{case_.type}</div>
                  </div>
                  <Badge className={`text-xs ${
                    case_.status === 'closed' ? 'bg-green-500/20 text-green-400' :
                    case_.status === 'investigating' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {case_.status}
                  </Badge>
                  <Badge className={`text-xs ${
                    case_.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    case_.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {case_.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Forensic Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Facial Reconstruction', status: 'active' },
                { name: 'Voice Analysis', status: 'active' },
                { name: 'Digital Fingerprinting', status: 'active' },
                { name: 'Metadata Extraction', status: 'active' },
                { name: 'Timeline Analysis', status: 'maintenance' }
              ].map((tool, index) => (
                <button key={index} className="w-full flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    tool.status === 'active' ? 'bg-green-400' : 'bg-orange-400'
                  }`}></div>
                  <span className="text-white flex-1 text-left">{tool.name}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'deepfake':
        return <DeepfakeDetectionView />;
      case 'threats':
        return <ThreatIntelligenceView />;
      case 'behavioral':
        return <BehavioralAuthView />;
      case 'enterprise':
        return <EnterpriseManagementView />;
      case 'forensics':
        return <IdentityForensicsView />;
      case 'misinformation':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Misinformation Detector</h1>
            <p className="text-gray-400">AI-powered fake news and misinformation analysis</p>
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Compliance Management</h1>
            <p className="text-gray-400">Regulatory compliance monitoring and reporting</p>
          </div>
        );
      case 'startup-audit':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Startup Security Audit</h1>
            <p className="text-gray-400">Comprehensive security assessment for startups</p>
          </div>
        );
      case 'cybercrime-law':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Cybercrime Law Center</h1>
            <p className="text-gray-400">Legal database and cybercrime case management</p>
          </div>
        );
      case 'news':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Cyber Intelligence News</h1>
            <p className="text-gray-400">Real-time cybersecurity news and threat intelligence</p>
          </div>
        );
      case 'neural':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Neural Networks</h1>
            <p className="text-gray-400">AI model management and neural network operations</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">Advanced Analytics</h1>
            <p className="text-gray-400">Business intelligence and security analytics</p>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <h1 className="text-white text-3xl font-bold">API Management</h1>
            <p className="text-gray-400">API endpoints, documentation, and testing tools</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UnifiedCyberPlatform;