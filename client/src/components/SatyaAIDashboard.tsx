import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Home,
  Scan,
  History,
  Settings,
  HelpCircle,
  Bell,
  User,
  ChevronUp,
  BarChart3,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Upload,
  Camera,
  Video,
  Mic,
  Webcam,
  FileImage,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Brain,
  Fingerprint,
  Activity,
  Zap,
  Target,
  Radar,
  Monitor,
  Globe,
  Lock,
  Unlock,
  Search,
  Download,
  Info,
  ArrowRight,
  Volume2,
  MessageSquare,
  Database,
  Network,
  Cpu,
  HardDrive,
  Wifi,
  Layers,
  Scale,
  Building,
  Crown,
  Ghost,
  QrCode,
  Waves,
  ShieldAlert,
  AlertOctagon
} from 'lucide-react';

interface DetectionResult {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'webcam';
  status: 'authentic' | 'deepfake' | 'processing';
  confidence: number;
  timestamp: Date;
  analysis: {
    photoshop_detection?: boolean;
    gan_detection?: boolean;
    metadata_analysis?: boolean;
    facial_inconsistencies?: boolean;
    temporal_analysis?: boolean;
    lip_sync_verification?: boolean;
    voice_cloning_detection?: boolean;
    neural_patterns_analysis?: boolean;
    live_deepfake_alert?: boolean;
    facial_authentication?: boolean;
    low_light_analysis?: boolean;
  };
}

interface SystemMetrics {
  analyzed_media: number;
  detected_deepfakes: number;
  avg_detection_time: number;
  detection_accuracy: number;
  alerts: number;
}

export default function SatyaAIDashboard() {
  const [activeView, setActiveView] = useState('home');
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'audio' | 'webcam'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentActivity, setRecentActivity] = useState<DetectionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    analyzed_media: 147,
    detected_deepfakes: 36,
    avg_detection_time: 4.2,
    detection_accuracy: 96.8,
    alerts: 5
  });

  // Enhanced state for comprehensive features
  const [threatIntelligence, setThreatIntelligence] = useState<any>(null);
  const [behaviorAnalysis, setBehaviorAnalysis] = useState<any>(null);
  const [enterpriseMetrics, setEnterpriseMetrics] = useState<any>(null);
  const [webcamStream, setWebcamStream] = useState<any>(null);
  const [realTimeThreats, setRealTimeThreats] = useState<any[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<any>(null);
  const [identityForensics, setIdentityForensics] = useState<any>(null);
  const [misinformationData, setMisinformationData] = useState<any>(null);
  const [startupAudit, setStartupAudit] = useState<any>(null);
  const [cyberLawData, setCyberLawData] = useState<any>(null);
  const [newsIntelligence, setNewsIntelligence] = useState<any>(null);

  // Comprehensive data fetching for all features
  useEffect(() => {
    // Fetch all comprehensive intelligence data
    const fetchData = async () => {
      try {
        const [threatRes, behaviorRes, enterpriseRes, complianceRes, forensicsRes, misinfoRes, auditRes, lawRes, newsRes] = await Promise.all([
          fetch('/api/threat-intelligence/current').catch(() => null),
          fetch('/api/behavioral-auth/analysis').catch(() => null),
          fetch('/api/enterprise/metrics').catch(() => null),
          fetch('/api/compliance/status').catch(() => null),
          fetch('/api/identity-forensics/cases').catch(() => null),
          fetch('/api/misinformation/analysis').catch(() => null),
          fetch('/api/startup-audit/report').catch(() => null),
          fetch('/api/cyber-law/cases').catch(() => null),
          fetch('/api/news/cyber-ai').catch(() => null)
        ]);

        if (threatRes?.ok) setThreatIntelligence(await threatRes.json());
        if (behaviorRes?.ok) setBehaviorAnalysis(await behaviorRes.json());
        if (enterpriseRes?.ok) setEnterpriseMetrics(await enterpriseRes.json());
        if (complianceRes?.ok) setComplianceStatus(await complianceRes.json());
        if (forensicsRes?.ok) setIdentityForensics(await forensicsRes.json());
        if (misinfoRes?.ok) setMisinformationData(await misinfoRes.json());
        if (auditRes?.ok) setStartupAudit(await auditRes.json());
        if (lawRes?.ok) setCyberLawData(await lawRes.json());
        if (newsRes?.ok) setNewsIntelligence(await newsRes.json());
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    };

    fetchData();
  }, []);

  // Real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        analyzed_media: prev.analyzed_media + Math.floor(Math.random() * 3),
        detected_deepfakes: prev.detected_deepfakes + (Math.random() > 0.8 ? 1 : 0),
        avg_detection_time: Math.max(2.0, Math.min(6.0, prev.avg_detection_time + (Math.random() - 0.5) * 0.2)),
        detection_accuracy: Math.max(90, Math.min(99, prev.detection_accuracy + (Math.random() - 0.5) * 0.5)),
        alerts: prev.alerts + (Math.random() > 0.95 ? 1 : 0)
      }));

      // Update real-time threat feed
      if (Math.random() > 0.7) {
        setRealTimeThreats(prev => [
          ...prev.slice(-9),
          {
            id: Date.now(),
            type: ['Advanced Persistent Threat', 'Deepfake Campaign', 'Phishing Attack', 'Data Breach', 'Malware Injection'][Math.floor(Math.random() * 5)],
            severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
            timestamp: new Date(),
            source: ['Network Monitoring', 'AI Detection', 'Behavioral Analysis', 'Threat Intelligence'][Math.floor(Math.random() * 4)],
            confidence: 75 + Math.random() * 25
          }
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample detection activity data
  useEffect(() => {
    setRecentActivity([
      {
        id: '1',
        filename: 'Profile_Image.jpg',
        type: 'image',
        status: 'authentic',
        confidence: 98.5,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        analysis: {
          photoshop_detection: false,
          gan_detection: false,
          metadata_analysis: true
        }
      },
      {
        id: '2',
        filename: 'Interview_Clip.mp4',
        type: 'video',
        status: 'deepfake',
        confidence: 93.2,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        analysis: {
          facial_inconsistencies: true,
          temporal_analysis: true,
          lip_sync_verification: false
        }
      },
      {
        id: '3',
        filename: 'Voice_Message.mp3',
        type: 'audio',
        status: 'authentic',
        confidence: 89.7,
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        analysis: {
          voice_cloning_detection: false,
          neural_patterns_analysis: true
        }
      }
    ]);
  }, []);

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const newResult: DetectionResult = {
        id: `analysis_${Date.now()}`,
        filename: file.name,
        type: uploadType,
        status: Math.random() > 0.7 ? 'deepfake' : 'authentic',
        confidence: 85 + Math.random() * 15,
        timestamp: new Date(),
        analysis: {
          photoshop_detection: uploadType === 'image' ? Math.random() > 0.8 : undefined,
          gan_detection: uploadType === 'image' ? Math.random() > 0.7 : undefined,
          metadata_analysis: true,
          facial_inconsistencies: uploadType === 'video' ? Math.random() > 0.6 : undefined,
          temporal_analysis: uploadType === 'video' ? Math.random() > 0.7 : undefined,
          lip_sync_verification: uploadType === 'video' ? Math.random() > 0.5 : undefined,
          voice_cloning_detection: uploadType === 'audio' ? Math.random() > 0.6 : undefined,
          neural_patterns_analysis: Math.random() > 0.3
        }
      };

      setRecentActivity(prev => [newResult, ...prev.slice(0, 9)]);
      setIsAnalyzing(false);
      setSelectedFile(null);
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const getAccuracyForType = (type: string) => {
    switch (type) {
      case 'image': return '98.2%';
      case 'video': return '96.8%';
      case 'audio': return '95.3%';
      case 'webcam': return '92.7%';
      default: return '96.8%';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'authentic': return 'text-green-400 bg-green-500/10';
      case 'deepfake': return 'text-red-400 bg-red-500/10';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const SidebarMenu = () => (
    <div className="w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">SatyaAI</h1>
            <p className="text-gray-400 text-xs">Synthetic Authentication Technology for Your Analysis</p>
          </div>
        </div>
      </div>

      {/* Detection Tools */}
      <div className="px-4 py-4">
        <h3 className="text-gray-400 text-sm font-medium mb-3">Detection Tools</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveView('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'home' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('image')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'image' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <FileImage className="w-4 h-4" />
            Image Analysis
          </button>
          <button
            onClick={() => setActiveView('video')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'video' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Analysis
          </button>
          <button
            onClick={() => setActiveView('audio')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'audio' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Audio Analysis
          </button>
          <button
            onClick={() => setActiveView('webcam')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'webcam' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Webcam className="w-4 h-4" />
            Webcam Live
          </button>
        </div>
      </div>

      {/* Advanced Intelligence */}
      <div className="px-4 py-4">
        <h3 className="text-gray-400 text-sm font-medium mb-3">Advanced Intelligence</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveView('behavior')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'behavior' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Target className="w-4 h-4" />
            Behavioral Auth
          </button>
          <button
            onClick={() => setActiveView('threats')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'threats' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Radar className="w-4 h-4" />
            Threat Intelligence
          </button>
          <button
            onClick={() => setActiveView('forensics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'forensics' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Search className="w-4 h-4" />
            Identity Forensics
          </button>
          <button
            onClick={() => setActiveView('misinformation')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'misinformation' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            Misinformation Detector
          </button>
          <button
            onClick={() => setActiveView('startup-audit')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'startup-audit' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Building className="w-4 h-4" />
            Startup Security
          </button>
          <button
            onClick={() => setActiveView('cyber-law')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'cyber-law' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Scale className="w-4 h-4" />
            Cyber Law Center
          </button>
        </div>
      </div>

      {/* Enterprise & Management */}
      <div className="px-4 py-4">
        <h3 className="text-gray-400 text-sm font-medium mb-3">Enterprise & Management</h3>
        <div className="space-y-1">
          <button
            onClick={() => setActiveView('enterprise')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'enterprise' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Crown className="w-4 h-4" />
            Enterprise Portal
          </button>
          <button
            onClick={() => setActiveView('news')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'news' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Globe className="w-4 h-4" />
            Cyber News
          </button>
          <button
            onClick={() => setActiveView('complete-hub')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'complete-hub' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Complete Hub
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <History className="w-4 h-4" />
            Scan History
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'settings' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => setActiveView('help')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'help' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Help & Support
          </button>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="mt-auto p-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">AI Assistant</span>
          </div>
          <p className="text-gray-300 text-xs">Advanced deepfake detection</p>
        </div>
      </div>
    </div>
  );

  const TopNavigation = () => (
    <div className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView('home')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeView === 'home' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={() => setActiveView('scan')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeView === 'scan' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Scan className="w-4 h-4" />
            Scan
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeView === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeView === 'settings' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => setActiveView('help')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeView === 'help' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Statistics
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              Insights
            </Button>
          </div>
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {systemMetrics.alerts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {systemMetrics.alerts}
              </span>
            )}
          </button>
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-2xl p-8 border border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm mb-4">
              <Zap className="w-4 h-4" />
              New AI Models Released
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Detect <span className="text-cyan-400">deepfakes</span> with the power of SatyaAI
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Our advanced detection system helps you authenticate media with unprecedented accuracy, 
              exposing manipulated content across images, videos, and audio.
            </p>
            <p className="text-gray-400 mb-8">
              Upload your files or use your webcam for real-time analysis and get detailed authenticity reports instantly.
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => setActiveView('scan')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3"
              >
                <Scan className="w-4 h-4 mr-2" />
                Analyze Media
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 px-6 py-3"
              >
                <Info className="w-4 h-4 mr-2" />
                How it Works
              </Button>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="text-center mb-4">
              <div className="text-cyan-400 text-sm font-medium">AUTHENTICITY SCORE</div>
              <div className="text-white text-3xl font-bold">79%</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Secure Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">Verified Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Analytics & Insights
              </CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-cyan-500/20 text-cyan-400">Statistics</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">Insights</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 text-sm mb-6">System performance and detection tips</div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Waves className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Analyzed Media</div>
                      <div className="text-gray-400 text-sm">+2.8% ↗</div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold">{systemMetrics.analyzed_media}</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Detected Deepfakes</div>
                      <div className="text-gray-400 text-sm">+12% ↗</div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold">{systemMetrics.detected_deepfakes}</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Avg. Detection Time</div>
                      <div className="text-gray-400 text-sm">-18% ↓</div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold">{systemMetrics.avg_detection_time.toFixed(1)}s</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Detection Accuracy</div>
                      <div className="text-gray-400 text-sm">+0.5% ↗</div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold">{systemMetrics.detection_accuracy.toFixed(1)}%</div>
                </div>
              </div>

              {/* Detection Activity Chart */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-medium">Detection Activity</span>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4 h-48 flex items-end justify-between gap-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-cyan-500/60 rounded-t-sm flex-1 transition-all hover:bg-cyan-400/80"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        minHeight: '8px'
                      }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-cyan-500 text-white px-3 py-1 rounded text-sm">
                      {systemMetrics.alerts} Alerts
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-gray-400 text-xs mt-2">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Detection Guide */}
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                Detection Guide
                <Badge className="bg-blue-500/20 text-blue-400 ml-auto">Expert Tips</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <div className="text-white text-sm font-medium">Look for unnatural eye blinking patterns and inconsistent eye reflections in suspected videos.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <div>
                    <div className="text-white text-sm font-medium">Check for unnatural hair movement, unusual skin texture, or blurry face boundaries in images.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <div>
                    <div className="text-white text-sm font-medium">Watch for inconsistencies in audio-visual synchronization, especially in speech videos.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <div>
                    <div className="text-white text-sm font-medium">Analyze visual artifacts around the edges of faces, which often indicate manipulation.</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30">
                <Download className="w-4 h-4 mr-2" />
                View Complete Deepfake Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.status === 'authentic' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {item.status === 'authentic' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{item.filename}</div>
                      <div className="text-gray-400 text-xs">
                        {item.confidence.toFixed(1)}% confidence score
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'authentic' ? 'Authentic' : 'Deepfake'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setActiveView('history')}
                variant="outline" 
                className="w-full mt-4 border-gray-600 text-gray-300"
              >
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deepfake Detection Tools */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white text-xl font-semibold">Deepfake Detection Tools</h2>
          <Badge className="bg-purple-500/20 text-purple-400 ml-2">★★</Badge>
        </div>
        <div className="text-gray-400 text-sm mb-6">
          Choose your media type for comprehensive analysis
        </div>
        <div className="text-right text-gray-400 text-sm mb-6">
          Using <span className="text-cyan-400">Neural Vision v4.2</span> models
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="bg-gray-900/90 border-gray-700/50 cursor-pointer hover:border-cyan-500/50 transition-colors"
            onClick={() => { setActiveView('image'); setUploadType('image'); }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Image Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">Detect manipulated photos & generated images</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Photoshop Detection</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>GAN Detection</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Metadata Analysis</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="text-gray-400 text-xs">Accuracy: {getAccuracyForType('image')}</div>
              </div>
              <Button className="w-full mt-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                START ANALYSIS →
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gray-900/90 border-gray-700/50 cursor-pointer hover:border-green-500/50 transition-colors"
            onClick={() => { setActiveView('video'); setUploadType('video'); }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Video Verification</h3>
              <p className="text-gray-400 text-sm mb-4">Identify deepfake videos & facial manipulations</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Facial Inconsistencies</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Temporal Analysis</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Lip Sync Verification</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="text-gray-400 text-xs">Accuracy: {getAccuracyForType('video')}</div>
              </div>
              <Button className="w-full mt-4 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                START ANALYSIS →
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gray-900/90 border-gray-700/50 cursor-pointer hover:border-purple-500/50 transition-colors"
            onClick={() => { setActiveView('audio'); setUploadType('audio'); }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Audio Detection</h3>
              <p className="text-gray-400 text-sm mb-4">Uncover voice cloning & synthetic speech</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Voice Cloning Detection</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Neural Patterns Analysis</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <XCircle className="w-3 h-3" />
                  <span>Neural Voice Filter</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="text-gray-400 text-xs">Accuracy: {getAccuracyForType('audio')}</div>
              </div>
              <Button className="w-full mt-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                START ANALYSIS →
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gray-900/90 border-gray-700/50 cursor-pointer hover:border-red-500/50 transition-colors"
            onClick={() => { setActiveView('webcam'); setUploadType('webcam'); }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Webcam className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Live Webcam</h3>
              <p className="text-gray-400 text-sm mb-4">Real-time deepfake analysis & verification</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Live Deepfake Alert</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Facial Authentication</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Low Light Analysis</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="text-gray-400 text-xs">Accuracy: {getAccuracyForType('webcam')}</div>
              </div>
              <Button className="w-full mt-4 bg-red-500/20 text-red-400 hover:bg-red-500/30">
                START ANALYSIS →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const AnalysisView = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                Upload Media for Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUploadType('image')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    uploadType === 'image' 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <FileImage className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium">Image</div>
                </button>
                <button
                  onClick={() => setUploadType('video')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    uploadType === 'video' 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <Video className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium">Video</div>
                </button>
                <button
                  onClick={() => setUploadType('audio')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    uploadType === 'audio' 
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <Volume2 className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium">Audio</div>
                </button>
                <button
                  onClick={() => setUploadType('webcam')}
                  className={`flex-1 p-3 rounded-lg border transition-colors ${
                    uploadType === 'webcam' 
                      ? 'border-red-500 bg-red-500/10 text-red-400' 
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <Webcam className="w-5 h-5 mx-auto mb-2" />
                  <div className="font-medium">Webcam</div>
                </button>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-cyan-500 bg-cyan-500/5' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div className="text-white font-medium">Analyzing {uploadType}...</div>
                    <div className="text-gray-400">Processing with advanced AI models</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-2">Drag & Drop Files Here</div>
                      <div className="text-gray-400">
                        Upload JPEG, PNG or GIF files for analysis. Max file size: 10MB
                      </div>
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={uploadType === 'image' ? 'image/*' : uploadType === 'video' ? 'video/*' : 'audio/*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.status === 'authentic' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {item.status === 'authentic' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{item.filename}</div>
                      <div className="text-gray-400 text-xs">
                        {item.confidence.toFixed(1)}% confidence score
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'authentic' ? 'Authentic' : 'Deepfake'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setActiveView('history')}
                variant="outline" 
                className="w-full mt-4 border-gray-600 text-gray-300"
              >
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const BehavioralAuthView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Behavioral Authentication - SuRaksha Engine</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Behavioral Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Keystroke Dynamics</span>
                <span className="text-cyan-400 font-mono">97.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mouse Movement Pattern</span>
                <span className="text-cyan-400 font-mono">95.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Device Fingerprinting</span>
                <span className="text-cyan-400 font-mono">99.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Biometric Patterns</span>
                <span className="text-cyan-400 font-mono">96.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Real-time Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realTimeThreats.slice(0, 5).map((threat, index) => (
                <div key={threat.id || index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      threat.severity === 'Critical' ? 'bg-red-500' : 
                      threat.severity === 'High' ? 'bg-orange-500' : 
                      threat.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <span className="text-gray-300 text-sm">{threat.type}</span>
                  </div>
                  <span className="text-cyan-400 text-xs">{threat.confidence?.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ThreatIntelligenceView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Threat Intelligence Dashboard</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Radar className="w-5 h-5 text-red-400" />
              Active Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {threatIntelligence?.threats?.length || 247}
            </div>
            <div className="text-gray-400 text-sm">Detected in last 24h</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-400" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-400 mb-2">12</div>
            <div className="text-gray-400 text-sm">Requiring immediate action</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              Global Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-400 mb-2">156</div>
            <div className="text-gray-400 text-sm">Countries monitored</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const IdentityForensicsView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Identity Forensics Laboratory</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              Digital Fingerprinting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Latest Analysis</div>
                <div className="text-white font-mono text-sm">Identity_Profile_847293</div>
                <div className="text-purple-400 text-xs mt-1">98.7% Match Confidence</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Active Cases</span>
                <span className="text-purple-400">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Solved This Month</span>
                <span className="text-green-400">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Forensic Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                Face Recognition Analysis
              </button>
              <button className="w-full p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                Digital DNA Extraction
              </button>
              <button className="w-full p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                Metadata Investigation
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const MisinformationDetectorView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Misinformation Detection Engine</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-orange-400" />
              Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Latest Detection</div>
                <div className="text-white text-sm">Fake news article about AI breakthrough</div>
                <div className="text-orange-400 text-xs mt-1">91.3% Misinformation Probability</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Verified Sources</span>
                <span className="text-green-400">2,847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Flagged Content</span>
                <span className="text-orange-400">156</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Detection Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Source Verification</span>
                <span className="text-cyan-400">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sentiment Analysis</span>
                <span className="text-cyan-400">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Fact Checking</span>
                <span className="text-cyan-400">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const StartupAuditView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Startup Security Audit - HyperSatya-X</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              Security Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400 mb-2">A+</div>
            <div className="text-gray-400 text-sm">Overall Security Score</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Vulnerabilities</span>
                <span className="text-green-400">0 Critical</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Compliance</span>
                <span className="text-blue-400">98.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Multi-Factor Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Real-time Monitoring</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-2 bg-blue-500/20 rounded text-blue-400">
                Implement behavioral biometrics
              </div>
              <div className="p-2 bg-green-500/20 rounded text-green-400">
                Deploy AI threat detection
              </div>
              <div className="p-2 bg-purple-500/20 rounded text-purple-400">
                Enhanced identity verification
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CyberLawView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Cybercrime Law Center</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Legal Case Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Recent Case</div>
                <div className="text-white text-sm">Identity Theft vs TechCorp</div>
                <div className="text-amber-400 text-xs mt-1">Status: Under Investigation</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Active Cases</span>
                <span className="text-amber-400">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Resolved Cases</span>
                <span className="text-green-400">1,834</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Legal Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors">
                Cybercrime Legal Framework
              </button>
              <button className="w-full p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors">
                Evidence Collection Protocols
              </button>
              <button className="w-full p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors">
                Digital Forensics Guidelines
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const EnterprisePortalView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Enterprise Security Portal</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">24/7 Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Custom Integrations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-green-400">23%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Memory</span>
                <span className="text-yellow-400">67%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Storage</span>
                <span className="text-green-400">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">GDPR</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">SOC 2</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">ISO 27001</span>
                <span className="text-green-400">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full p-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-sm hover:bg-blue-500/30 transition-colors">
                Generate Report
              </button>
              <button className="w-full p-2 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-sm hover:bg-purple-500/30 transition-colors">
                Run Audit
              </button>
              <button className="w-full p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-sm hover:bg-green-500/30 transition-colors">
                Deploy Updates
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CyberNewsView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Cyber Intelligence News</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Breaking Cyber News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-white font-medium text-sm mb-2">Advanced AI Deepfake Detection Breakthrough</div>
                <div className="text-gray-400 text-xs">2 hours ago • TechCrunch</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-white font-medium text-sm mb-2">New Cybersecurity Framework Released</div>
                <div className="text-gray-400 text-xs">5 hours ago • CyberScoop</div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-white font-medium text-sm mb-2">Identity Theft Prevention Guidelines Updated</div>
                <div className="text-gray-400 text-xs">1 day ago • Security Week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Threat Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium text-sm">Critical Alert</span>
                </div>
                <div className="text-white text-sm">New ransomware strain detected</div>
                <div className="text-gray-400 text-xs mt-1">Affects Windows systems</div>
              </div>
              <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-medium text-sm">High Priority</span>
                </div>
                <div className="text-white text-sm">Phishing campaign targeting banks</div>
                <div className="text-gray-400 text-xs mt-1">Multiple regions affected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CompleteHubView = () => (
    <div className="p-6">
      <div className="text-white text-2xl font-bold mb-6">Complete Cyber Intelligence Hub</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-cyan-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              SuRaksha Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Advanced behavioral authentication with 50+ security features including keystroke dynamics, biometric patterns, and device fingerprinting.
            </div>
            <button 
              onClick={() => window.open('/suraksha', '_blank')}
              className="w-full p-2 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              Access Platform
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-purple-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              Identity Forensics Lab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Digital forensics tools for identity verification, face recognition analysis, and comprehensive metadata investigation.
            </div>
            <button 
              onClick={() => window.open('/identity-forensics', '_blank')}
              className="w-full p-2 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 hover:bg-purple-500/30 transition-colors"
            >
              Launch Lab
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-orange-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-orange-400" />
              Misinformation Detector
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              AI-powered content analysis with source verification, sentiment analysis, and real-time fact-checking capabilities.
            </div>
            <button 
              onClick={() => window.open('/misinformation', '_blank')}
              className="w-full p-2 bg-orange-500/20 border border-orange-500/30 rounded text-orange-400 hover:bg-orange-500/30 transition-colors"
            >
              Start Detection
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-red-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Radar className="w-5 h-5 text-red-400" />
              Threat Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Global threat monitoring with real-time analysis covering 156 countries and advanced persistent threat detection.
            </div>
            <button 
              onClick={() => window.open('/threat-intelligence', '_blank')}
              className="w-full p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 hover:bg-red-500/30 transition-colors"
            >
              View Threats
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              Startup Security Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              HyperSatya-X security assessment with comprehensive vulnerability analysis and compliance tracking.
            </div>
            <button 
              onClick={() => window.open('/startup-audit', '_blank')}
              className="w-full p-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              Run Audit
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-amber-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Cybercrime Law Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Legal framework database with evidence collection protocols and digital forensics guidelines for cybercrime cases.
            </div>
            <button 
              onClick={() => window.open('/cybercrime-law', '_blank')}
              className="w-full p-2 bg-amber-500/20 border border-amber-500/30 rounded text-amber-400 hover:bg-amber-500/30 transition-colors"
            >
              Access Center
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-yellow-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Enterprise Portal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Premium enterprise features with 24/7 monitoring, advanced analytics, and custom security integrations.
            </div>
            <button 
              onClick={() => window.open('/enterprise', '_blank')}
              className="w-full p-2 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 hover:bg-yellow-500/30 transition-colors"
            >
              Enter Portal
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-green-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              Cyber News Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Real-time cybersecurity news feed with breaking threat alerts and global intelligence updates.
            </div>
            <button 
              onClick={() => window.open('/news', '_blank')}
              className="w-full p-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 hover:bg-green-500/30 transition-colors"
            >
              Read News
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700/50 hover:border-indigo-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Advanced Security Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 text-sm mb-4">
              Comprehensive security toolkit with advanced protection mechanisms and proactive threat prevention.
            </div>
            <button 
              onClick={() => window.open('/security', '_blank')}
              className="w-full p-2 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 hover:bg-indigo-500/30 transition-colors"
            >
              Access Tools
            </button>
          </CardContent>
        </Card>
      </div>

      {/* System Status Overview */}
      <div className="mt-8">
        <h3 className="text-white text-xl font-bold mb-4">System Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">All Systems Operational</div>
                  <div className="text-gray-400 text-xs">99.8% Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">Active Monitoring</div>
                  <div className="text-gray-400 text-xs">24/7 Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">AI Models Updated</div>
                  <div className="text-gray-400 text-xs">Latest Version</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/90 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">Security Patches</div>
                  <div className="text-gray-400 text-xs">Up to Date</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="flex">
        <SidebarMenu />
        <div className="flex-1">
          <TopNavigation />
          <main className="overflow-auto">
            {activeView === 'home' && <HomeView />}
            {(activeView === 'scan' || activeView === 'image' || activeView === 'video' || activeView === 'audio' || activeView === 'webcam') && <AnalysisView />}
            {activeView === 'behavior' && <BehavioralAuthView />}
            {activeView === 'threats' && <ThreatIntelligenceView />}
            {activeView === 'forensics' && <IdentityForensicsView />}
            {activeView === 'misinformation' && <MisinformationDetectorView />}
            {activeView === 'startup-audit' && <StartupAuditView />}
            {activeView === 'cyber-law' && <CyberLawView />}
            {activeView === 'enterprise' && <EnterprisePortalView />}
            {activeView === 'news' && <CyberNewsView />}
            {activeView === 'complete-hub' && <CompleteHubView />}
            {activeView === 'history' && (
              <div className="p-6">
                <div className="text-white text-2xl font-bold mb-6">Scan History</div>
                <div className="space-y-4">
                  {recentActivity.map((item) => (
                    <Card key={item.id} className="bg-gray-900/90 border-gray-700/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              item.status === 'authentic' ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}>
                              {item.status === 'authentic' ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium">{item.filename}</div>
                              <div className="text-gray-400 text-sm">
                                {item.type} • {item.timestamp.toLocaleDateString()} • {item.confidence.toFixed(1)}% confidence
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'authentic' ? 'Authentic' : 'Deepfake'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}