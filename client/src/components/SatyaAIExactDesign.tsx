import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileImage,
  Video,
  Webcam,
  Home,
  History,
  Settings,
  HelpCircle,
  Bell,
  User,
  ChevronUp,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
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
  AlertOctagon,
  Activity,
  Sparkles,
  Atom,
  Boxes,
  Orbit,
  Mic,
  Camera,
  Scan
} from 'lucide-react';

interface DetectionResult {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'webcam';
  status: 'authentic' | 'deepfake' | 'processing';
  confidence: number;
  timestamp: Date;
}

interface SystemMetrics {
  analyzed_media: number;
  detected_deepfakes: number;
  avg_detection_time: number;
  detection_accuracy: number;
  alerts: number;
}

export default function SatyaAIExactDesign() {
  const [activeView, setActiveView] = useState('home');
  const [activeTab, setActiveTab] = useState('Image');
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentActivity, setRecentActivity] = useState<DetectionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

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
  const [realTimeThreats, setRealTimeThreats] = useState<any[]>([]);

  // Comprehensive data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch threat intelligence
        fetch('/api/threat-intelligence/current')
          .then(res => res.json())
          .then(data => setThreatIntelligence(data))
          .catch(() => {
            setThreatIntelligence({
              active_threats: 23,
              vulnerabilities: 8,
              network_scans: 156,
              mitigated: 47
            });
          });

        // Fetch behavioral analysis
        fetch('/api/behavioral-auth/analysis')
          .then(res => res.json())
          .then(data => setBehaviorAnalysis(data))
          .catch(() => {
            setBehaviorAnalysis({
              keystroke: { speed: '45 WPM', dwell: '120ms', flight: '85ms' },
              mouse: { speed: '1.2 px/ms', pressure: '85%', trajectory: 'Normal' },
              touch: { velocity: '890 px/s', pressure: '12%', area: '15.2 px²' }
            });
          });

        // Fetch enterprise metrics
        fetch('/api/enterprise/metrics')
          .then(res => res.json())
          .then(data => setEnterpriseMetrics(data))
          .catch(() => {
            setEnterpriseMetrics({
              total_companies: 147,
              avg_security_score: 94.2,
              active_incidents: 23,
              monthly_revenue: '2.4M'
            });
          });

        // Initialize real-time threat data
        setRealTimeThreats([
          {
            category: "Advanced Persistent Threat",
            description: "Suspicious network activity detected from foreign IP",
            severity: "CRITICAL",
            timestamp: "2 minutes ago"
          },
          {
            category: "Phishing Campaign",
            description: "Mass email campaign targeting enterprise credentials",
            severity: "HIGH", 
            timestamp: "15 minutes ago"
          },
          {
            category: "Data Exfiltration",
            description: "Unusual data transfer patterns identified",
            severity: "MEDIUM",
            timestamp: "1 hour ago"
          }
        ]);

      } catch (error) {
        console.error('Data initialization error:', error);
      }
    };

    fetchData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    
    return () => clearInterval(interval);
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
        confidence: 94.2,
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: '2',
        filename: 'Interview_Clip.mp4',
        type: 'video',
        status: 'deepfake',
        confidence: 89.7,
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: '3',
        filename: 'Voice_Message.mp3',
        type: 'audio',
        status: 'authentic',
        confidence: 96.1,
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      }
    ]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
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
        
        // Create new activity entry
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
        
        // Update analysis state with detailed results
        setAnalysisResults({
          filename: file.name,
          isAuthentic: result.is_authentic,
          confidence: result.confidence_percentage || (result.confidence * 100),
          details: result.key_findings || [],
          riskLevel: result.risk_level || 'UNKNOWN',
          recommendation: result.recommendation || 'Analysis complete'
        });
        
        console.log('Analysis complete:', result);
      } else {
        console.error('Analysis failed:', await response.text());
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">SatyaAI</h1>
            <p className="text-gray-400 text-xs">Synthetic Authentication Technology for Your Analysis</p>
          </div>
        </div>
      </div>

      {/* Detection Tools */}
      <div className="px-4 py-6">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Detection Tools</h3>
        <div className="space-y-2">
          <button
            onClick={() => setActiveView('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'home' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('image')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'image' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <FileImage className="w-4 h-4" />
            Image Analysis
          </button>
          <button
            onClick={() => setActiveView('video')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'video' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Analysis
          </button>
          <button
            onClick={() => setActiveView('audio')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'audio' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            Audio Analysis
          </button>
          <button
            onClick={() => setActiveView('webcam')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'webcam' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Webcam className="w-4 h-4" />
            Webcam Live
          </button>
          <button
            onClick={() => setActiveView('behavior')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'behavior' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Target className="w-4 h-4" />
            Behavioral Auth
          </button>
          <button
            onClick={() => setActiveView('threats')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'threats' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Radar className="w-4 h-4" />
            Threat Intelligence
          </button>
          <button
            onClick={() => setActiveView('forensics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'forensics' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Search className="w-4 h-4" />
            Identity Forensics
          </button>
          <button
            onClick={() => setActiveView('misinformation')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'misinformation' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            Misinformation Detector
          </button>
          <button
            onClick={() => setActiveView('startup-audit')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'startup-audit' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Building className="w-4 h-4" />
            Startup Security
          </button>
          <button
            onClick={() => setActiveView('enterprise')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'enterprise' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Crown className="w-4 h-4" />
            Enterprise Security
          </button>
          <button
            onClick={() => setActiveView('cyber-law')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'cyber-law' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            Cyber Law
          </button>
          <button
            onClick={() => setActiveView('compliance')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'compliance' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            Privacy Compliance
          </button>
          <button
            onClick={() => setActiveView('news')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'news' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            Cyber News Intel
          </button>
        </div>
      </div>

      {/* Management */}
      <div className="px-4 py-6">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Management</h3>
        <div className="space-y-2">
          <button
            onClick={() => setActiveView('history')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <History className="w-4 h-4" />
            Scan History
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'settings' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => setActiveView('help')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === 'help' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Ghost className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-green-400 text-sm font-medium">AI Assistant</div>
              <div className="text-gray-400 text-xs">Always learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TopNavigation = () => (
    <div className="border-b border-gray-700 bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('home')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeView === 'home' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button 
              onClick={() => setActiveView('scan')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeView === 'scan' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Scan className="w-4 h-4" />
              Scan
            </button>
            <button 
              onClick={() => setActiveView('history')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeView === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>
            <button 
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeView === 'settings' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={() => setActiveView('help')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeView === 'help' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-4 h-4 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer" />
              {systemMetrics.alerts > 0 && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{systemMetrics.alerts}</span>
                </div>
              )}
            </div>
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute top-4 left-4">
          <div className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full">
            <span className="text-blue-400 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New AI Models Released
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Detect <span className="text-cyan-400">deepfakes</span> with the<br />
              power of SatyaAI
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Our advanced detection system helps you authenticate media with unprecedented 
              accuracy, exposing manipulated content across images, videos, and audio.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Upload your files or use your webcam for real-time analysis and get detailed authenticity reports instantly.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Analyze Media
              </button>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5" />
                How it Works
              </button>
            </div>
          </div>

          {/* Authenticity Score Card */}
          <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="text-center">
              <div className="text-cyan-400 text-sm font-medium mb-2">AUTHENTICITY SCORE</div>
              <div className="text-white text-3xl font-bold">79%</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-xs">Real-time Analysis</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 text-xs">Secure Processing</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-purple-400 text-xs">Verified Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deepfake Detection Tools Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Deepfake Detection Tools</h2>
          <div className="text-gray-400 text-sm">
            Using <span className="text-blue-400">Neural Vision v4.2</span> models
          </div>
        </div>
        <div className="text-gray-400 text-sm mb-6">Choose your media type for comprehensive analysis</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Image Analysis */}
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <FileImage className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">Accuracy</div>
                <div className="text-blue-400 font-bold">98.2%</div>
              </div>
            </div>
            <h3 className="text-white font-bold mb-2">Image Analysis</h3>
            <p className="text-gray-400 text-sm mb-4">Detect manipulated photos & generated images</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Photoshop Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">GAN Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Metadata Analysis</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
              START ANALYSIS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Video Verification */}
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">Accuracy</div>
                <div className="text-green-400 font-bold">96.8%</div>
              </div>
            </div>
            <h3 className="text-white font-bold mb-2">Video Verification</h3>
            <p className="text-gray-400 text-sm mb-4">Identify deepfake videos & facial manipulations</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Facial Inconsistencies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Temporal Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Lip-Sync Verification</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
              START ANALYSIS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Detection */}
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">Accuracy</div>
                <div className="text-purple-400 font-bold">95.3%</div>
              </div>
            </div>
            <h3 className="text-white font-bold mb-2">Audio Detection</h3>
            <p className="text-gray-400 text-sm mb-4">Uncover voice cloning & synthetic speech</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Voice Cloning Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Neural Patterns Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm">Neural Voice Filter</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
              START ANALYSIS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Webcam */}
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">Accuracy</div>
                <div className="text-red-400 font-bold">92.7%</div>
              </div>
            </div>
            <h3 className="text-white font-bold mb-2">Live Webcam</h3>
            <p className="text-gray-400 text-sm mb-4">Real-time deepfake analysis & verification</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Live Deepfake Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Facial Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Low-Light Analysis</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2">
              START ANALYSIS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamAnalyzing, setWebcamAnalyzing] = useState(false);
  const [webcamResults, setWebcamResults] = useState<any>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setWebcamStream(stream);
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };

  const captureFrame = () => {
    if (!webcamRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = webcamRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const analyzeWebcamFrame = async () => {
    setWebcamAnalyzing(true);
    try {
      const imageData = captureFrame();
      if (!imageData) return;

      const response = await fetch('/api/analyze-webcam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: imageData })
      });

      if (response.ok) {
        const result = await response.json();
        setWebcamResults(result);
      }
    } catch (error) {
      console.error('Webcam analysis error:', error);
    } finally {
      setWebcamAnalyzing(false);
    }
  };

  const ScanView = () => (
    <div className="p-6 space-y-6">
      {/* Detection Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Exact replica of the cards from the reference image */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileImage className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Accuracy</div>
              <div className="text-blue-400 font-bold">98.2%</div>
            </div>
          </div>
          <h3 className="text-white font-bold mb-2">Image Analysis</h3>
          <p className="text-gray-400 text-sm mb-4">Detect manipulated photos & generated images</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Photoshop Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">GAN Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Metadata Analysis</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
            START ANALYSIS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Accuracy</div>
              <div className="text-green-400 font-bold">96.8%</div>
            </div>
          </div>
          <h3 className="text-white font-bold mb-2">Video Verification</h3>
          <p className="text-gray-400 text-sm mb-4">Identify deepfake videos & facial manipulations</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Facial Inconsistencies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Temporal Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Lip-Sync Verification</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
            START ANALYSIS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Accuracy</div>
              <div className="text-purple-400 font-bold">95.3%</div>
            </div>
          </div>
          <h3 className="text-white font-bold mb-2">Audio Detection</h3>
          <p className="text-gray-400 text-sm mb-4">Uncover voice cloning & synthetic speech</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Voice Cloning Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Neural Patterns Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm">Neural Voice Filter</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
            START ANALYSIS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Accuracy</div>
              <div className="text-red-400 font-bold">92.7%</div>
            </div>
          </div>
          <h3 className="text-white font-bold mb-2">Live Webcam</h3>
          <p className="text-gray-400 text-sm mb-4">Real-time deepfake analysis & verification</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Live Deepfake Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Facial Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Low-Light Analysis</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2">
            START ANALYSIS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Upload Section - Exact replica from reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Upload className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-bold">Upload Media for Analysis</h3>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-6 border-b border-gray-700">
              {['Image', 'Video', 'Audio', 'Webcam'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Drag & Drop Files Here</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Upload JPEG, PNG or GIF files for analysis. Max file size: 10MB
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

            {/* Analysis Results Display */}
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
                  <div className="flex justify-between">
                    <span className="text-gray-300">Risk Level:</span>
                    <span className="text-orange-400">{analysisResults.riskLevel}</span>
                  </div>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded">
                    <div className="text-gray-400 text-sm mb-1">Key Findings:</div>
                    {analysisResults.details.map((finding: string, index: number) => (
                      <div key={index} className="text-gray-300 text-sm">• {finding}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-gray-400 text-sm">
                    <strong>Recommendation:</strong> {analysisResults.recommendation}
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
                <div className="mt-2 text-gray-400 text-sm">Advanced AI models are analyzing your file for authenticity</div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity - Exact replica from reference image */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-white font-bold">Recent Activity</h3>
            </div>
          </div>

          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Profile_Image.jpg</div>
                <div className="text-green-400 text-xs">94% confidence score</div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">Authentic</Badge>
            </div>

            {/* Interview Clip */}
            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Interview_Clip.mp4</div>
                <div className="text-red-400 text-xs">93% confidence score</div>
              </div>
              <Badge className="bg-red-500/20 text-red-400 text-xs">Deepfake</Badge>
            </div>

            {/* Voice Message */}
            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Voice_Message.mp3</div>
                <div className="text-green-400 text-xs">96% confidence score</div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">Authentic</Badge>
            </div>
          </div>

          <button className="w-full mt-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            View All History
          </button>
        </div>
      </div>
    </div>
  );

  const BehavioralAuthView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Behavioral Authentication</h2>
        <Badge className="bg-green-500/20 text-green-400">50+ Features Active</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Keystroke Dynamics */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white font-bold">Keystroke Dynamics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Typing Speed</span>
              <span className="text-white text-sm">{behaviorAnalysis?.keystroke?.speed || '45 WPM'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Dwell Time</span>
              <span className="text-white text-sm">{behaviorAnalysis?.keystroke?.dwell || '120ms'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Flight Time</span>
              <span className="text-white text-sm">{behaviorAnalysis?.keystroke?.flight || '85ms'}</span>
            </div>
          </div>
        </div>

        {/* Mouse Dynamics */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold">Mouse Dynamics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Movement Speed</span>
              <span className="text-white text-sm">{behaviorAnalysis?.mouse?.speed || '1.2 px/ms'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Click Pressure</span>
              <span className="text-white text-sm">{behaviorAnalysis?.mouse?.pressure || '85%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Trajectory</span>
              <span className="text-white text-sm">{behaviorAnalysis?.mouse?.trajectory || 'Normal'}</span>
            </div>
          </div>
        </div>

        {/* Touch Pattern */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Scan className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-bold">Touch Patterns</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Swipe Velocity</span>
              <span className="text-white text-sm">{behaviorAnalysis?.touch?.velocity || '890 px/s'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Pressure Variance</span>
              <span className="text-white text-sm">{behaviorAnalysis?.touch?.pressure || '12%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Contact Area</span>
              <span className="text-white text-sm">{behaviorAnalysis?.touch?.area || '15.2 px²'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Status */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Authentication Status</h3>
            <p className="text-gray-300">Continuous behavioral monitoring active</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">96.8%</div>
            <div className="text-green-400 text-sm">Confidence Score</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ThreatIntelligenceView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Threat Intelligence</h2>
        <Badge className="bg-red-500/20 text-red-400">Live Monitoring</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <Badge className="bg-red-500/20 text-red-400 text-xs">CRITICAL</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Active Threats</h3>
          <div className="text-2xl font-bold text-red-400 mb-2">
            {threatIntelligence?.active_threats || 23}
          </div>
          <p className="text-gray-400 text-sm">Detected in last 24h</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">HIGH</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Vulnerabilities</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">
            {threatIntelligence?.vulnerabilities || 8}
          </div>
          <p className="text-gray-400 text-sm">Require immediate attention</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">ACTIVE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Network Scans</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {threatIntelligence?.network_scans || 156}
          </div>
          <p className="text-gray-400 text-sm">Continuous monitoring</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">SECURE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Mitigated</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">
            {threatIntelligence?.mitigated || 47}
          </div>
          <p className="text-gray-400 text-sm">Threats neutralized</p>
        </div>
      </div>

      {/* Threat Timeline */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4">Recent Threat Activity</h3>
        <div className="space-y-4">
          {realTimeThreats.length > 0 ? realTimeThreats.map((threat, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                threat.severity === 'CRITICAL' ? 'bg-red-500' :
                threat.severity === 'HIGH' ? 'bg-orange-500' :
                threat.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="text-white font-medium">{threat.category}</div>
                <div className="text-gray-400 text-sm">{threat.description}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">{threat.timestamp}</div>
                <Badge className={`text-xs ${
                  threat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                  threat.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  threat.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {threat.severity}
                </Badge>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-400">
              <Radar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent threat activity detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const IdentityForensicsView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Identity Forensics</h2>
        <Badge className="bg-purple-500/20 text-purple-400">Advanced Analysis</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white font-bold">Digital Footprint</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Social Media</span>
              <span className="text-white text-sm">47 profiles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Email Addresses</span>
              <span className="text-white text-sm">12 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Phone Numbers</span>
              <span className="text-white text-sm">5 linked</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-bold">Biometric Data</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Facial Recognition</span>
              <span className="text-green-400 text-sm">Match 94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Voice Print</span>
              <span className="text-green-400 text-sm">Match 87.6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Gait Analysis</span>
              <span className="text-yellow-400 text-sm">Partial 65.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold">Database Cross-Reference</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Criminal Records</span>
              <span className="text-green-400 text-sm">Clean</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Credit History</span>
              <span className="text-white text-sm">Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Employment</span>
              <span className="text-white text-sm">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Case Analysis */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4">Active Case Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Case #2024-001</span>
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">IN PROGRESS</Badge>
              </div>
              <p className="text-gray-400 text-sm">Identity theft investigation - financial fraud pattern analysis</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 text-xs">Evidence collection: 78% complete</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Case #2024-002</span>
                <Badge className="bg-green-500/20 text-green-400 text-xs">CLOSED</Badge>
              </div>
              <p className="text-gray-400 text-sm">Synthetic identity verification - deepfake profile detection</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-xs">Successfully identified synthetic identity</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-white font-bold mb-4">Forensic Tools</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <Camera className="w-5 h-5 text-blue-400" />
                <span className="text-white">Facial Reconstruction</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <Waves className="w-5 h-5 text-green-400" />
                <span className="text-white">Voice Analysis</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <Network className="w-5 h-5 text-purple-400" />
                <span className="text-white">Digital Trace</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MisinformationDetectorView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Misinformation Detector</h2>
        <Badge className="bg-orange-500/20 text-orange-400">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertOctagon className="w-5 h-5 text-red-400" />
            </div>
            <Badge className="bg-red-500/20 text-red-400 text-xs">FAKE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Fake News</h3>
          <div className="text-2xl font-bold text-red-400 mb-2">89</div>
          <p className="text-gray-400 text-sm">Articles flagged today</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">MISLEADING</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Misleading</h3>
          <div className="text-2xl font-bold text-yellow-400 mb-2">156</div>
          <p className="text-gray-400 text-sm">Content under review</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">DISPUTED</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Disputed</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">43</div>
          <p className="text-gray-400 text-sm">Claims fact-checked</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">VERIFIED</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Verified</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">1,247</div>
          <p className="text-gray-400 text-sm">Authentic sources</p>
        </div>
      </div>

      {/* Analysis Tools */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4">Content Analysis Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Text Analysis</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Sentiment Score</span>
                  <span className="text-white text-sm">0.73</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Bias Detection</span>
                  <span className="text-yellow-400 text-sm">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Credibility</span>
                  <span className="text-green-400 text-sm">High</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Source Verification</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Domain Authority</span>
                  <span className="text-green-400 text-sm">85/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">SSL Certificate</span>
                  <span className="text-green-400 text-sm">Valid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Reputation</span>
                  <span className="text-green-400 text-sm">Trusted</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/20">
            <h4 className="text-white font-bold mb-4">Detection Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Natural Language Processing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Cross-Reference Verification</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Social Media Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Expert Fact-Checking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm">Historical Data Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StartupSecurityView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Startup Security Audit</h2>
        <Badge className="bg-blue-500/20 text-blue-400">Comprehensive Analysis</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">SECURE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Security Score</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">87/100</div>
          <p className="text-gray-400 text-sm">Overall assessment</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">MEDIUM</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Vulnerabilities</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">12</div>
          <p className="text-gray-400 text-sm">Issues identified</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">COMPLIANT</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Compliance</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">94%</div>
          <p className="text-gray-400 text-sm">GDPR, SOC 2, ISO 27001</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">PREMIUM</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Recommendations</h3>
          <div className="text-2xl font-bold text-purple-400 mb-2">23</div>
          <p className="text-gray-400 text-sm">Security improvements</p>
        </div>
      </div>

      {/* Audit Results */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4">Security Audit Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Strengths Identified</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Strong encryption protocols implemented</li>
                <li>• Multi-factor authentication enabled</li>
                <li>• Regular security updates maintained</li>
                <li>• Employee security training program</li>
                <li>• Incident response plan documented</li>
              </ul>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-medium">Areas for Improvement</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• API rate limiting needs enhancement</li>
                <li>• Database backup encryption required</li>
                <li>• Third-party vendor security review</li>
                <li>• Privileged access management upgrade</li>
                <li>• Security monitoring system expansion</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
            <h4 className="text-white font-bold mb-4">Recommended Actions</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Critical: Patch SQL injection vulnerability</div>
                  <div className="text-gray-400 text-xs">Priority: Immediate</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">High: Implement SIEM solution</div>
                  <div className="text-gray-400 text-xs">Priority: This week</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Medium: Update security policies</div>
                  <div className="text-gray-400 text-xs">Priority: This month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EnterpriseSecurityView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Enterprise Security</h2>
        <Badge className="bg-purple-500/20 text-purple-400">Enterprise Grade</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">ACTIVE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Companies</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {enterpriseMetrics?.total_companies || 147}
          </div>
          <p className="text-gray-400 text-sm">Under protection</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">SECURE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Security Score</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">
            {enterpriseMetrics?.avg_security_score || 94.2}%
          </div>
          <p className="text-gray-400 text-sm">Average across all clients</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">INCIDENTS</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Active Incidents</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">
            {enterpriseMetrics?.active_incidents || 23}
          </div>
          <p className="text-gray-400 text-sm">Requiring attention</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">PREMIUM</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Revenue</h3>
          <div className="text-2xl font-bold text-purple-400 mb-2">
            ${enterpriseMetrics?.monthly_revenue || '2.4M'}
          </div>
          <p className="text-gray-400 text-sm">Monthly recurring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Top Enterprise Clients</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">TechCorp Industries</div>
                  <div className="text-gray-400 text-xs">Fortune 500 • 50,000 employees</div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">98.7%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Global Finance Ltd</div>
                  <div className="text-gray-400 text-xs">Banking • 25,000 employees</div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">96.4%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Innovation Labs</div>
                  <div className="text-gray-400 text-xs">Startup • 2,500 employees</div>
                </div>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">89.2%</Badge>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Security Services</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-white text-sm font-medium">Threat Detection</div>
              <div className="text-blue-400 text-xs">24/7 Monitoring</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Lock className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-white text-sm font-medium">Data Protection</div>
              <div className="text-green-400 text-xs">GDPR Compliant</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Network className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-white text-sm font-medium">Network Security</div>
              <div className="text-purple-400 text-xs">Advanced Firewall</div>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-white text-sm font-medium">Incident Response</div>
              <div className="text-orange-400 text-xs">Rapid Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CyberLawView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Cyber Law & Compliance</h2>
        <Badge className="bg-blue-500/20 text-blue-400">Legal Framework</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">ACTIVE</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Legal Cases</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">1,247</div>
          <p className="text-gray-400 text-sm">In database</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">WON</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Cases Won</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">967</div>
          <p className="text-gray-400 text-sm">Success rate: 77.5%</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">PENDING</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Pending</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">89</div>
          <p className="text-gray-400 text-sm">Awaiting judgment</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">LANDMARK</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Landmark</h3>
          <div className="text-2xl font-bold text-purple-400 mb-2">23</div>
          <p className="text-gray-400 text-sm">Precedent setting</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Recent Cyber Crime Cases</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">State vs. CyberCorp Ltd</span>
                <Badge className="bg-green-500/20 text-green-400 text-xs">WON</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-2">Data breach affecting 2.3M users - GDPR violation</p>
              <div className="flex justify-between text-xs">
                <span className="text-blue-400">€15M fine imposed</span>
                <span className="text-gray-500">Dec 2024</span>
              </div>
            </div>

            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">People vs. DeepFake Network</span>
                <Badge className="bg-orange-500/20 text-orange-400 text-xs">PENDING</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-2">Synthetic media distribution for fraud</p>
              <div className="flex justify-between text-xs">
                <span className="text-orange-400">Criminal charges filed</span>
                <span className="text-gray-500">Nov 2024</span>
              </div>
            </div>

            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Tech Giant Privacy Case</span>
                <Badge className="bg-purple-500/20 text-purple-400 text-xs">LANDMARK</Badge>
              </div>
              <p className="text-gray-400 text-sm mb-2">First AI-generated content liability ruling</p>
              <div className="flex justify-between text-xs">
                <span className="text-purple-400">New precedent set</span>
                <span className="text-gray-500">Oct 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Legal Framework Coverage</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-medium">GDPR Compliance</span>
                <span className="text-blue-400 text-sm">EU</span>
              </div>
              <div className="text-gray-300 text-sm">General Data Protection Regulation</div>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium">CCPA Compliance</span>
                <span className="text-green-400 text-sm">CA, USA</span>
              </div>
              <div className="text-gray-300 text-sm">California Consumer Privacy Act</div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-medium">SOX Compliance</span>
                <span className="text-purple-400 text-sm">USA</span>
              </div>
              <div className="text-gray-300 text-sm">Sarbanes-Oxley Act</div>
            </div>

            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-medium">PIPEDA</span>
                <span className="text-orange-400 text-sm">Canada</span>
              </div>
              <div className="text-gray-300 text-sm">Personal Information Protection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComplianceView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Privacy Compliance</h2>
        <Badge className="bg-green-500/20 text-green-400">Fully Compliant</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">GDPR</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">GDPR Score</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">98.7%</div>
          <p className="text-gray-400 text-sm">EU compliance</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">CCPA</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">CCPA Score</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">96.3%</div>
          <p className="text-gray-400 text-sm">California compliance</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple-400" />
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">SOC 2</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">SOC 2</h3>
          <div className="text-2xl font-bold text-purple-400 mb-2">94.8%</div>
          <p className="text-gray-400 text-sm">Type II certified</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">ISO</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">ISO 27001</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">97.1%</div>
          <p className="text-gray-400 text-sm">Information security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Data Protection Measures</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">End-to-End Encryption</span>
              </div>
              <span className="text-green-400 text-sm">AES-256</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Data Anonymization</span>
              </div>
              <span className="text-green-400 text-sm">PII Protected</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Right to be Forgotten</span>
              </div>
              <span className="text-green-400 text-sm">Automated</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Data Portability</span>
              </div>
              <span className="text-green-400 text-sm">JSON/CSV</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Audit Logging</span>
              </div>
              <span className="text-green-400 text-sm">Immutable</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Compliance Monitoring</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-medium">Real-time Monitoring</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-gray-300 text-sm">Continuous compliance assessment</div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-medium">Automated Reporting</span>
                <span className="text-purple-400 text-sm">Monthly</span>
              </div>
              <div className="text-gray-300 text-sm">Compliance reports generation</div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium">Risk Assessment</span>
                <span className="text-green-400 text-sm">Weekly</span>
              </div>
              <div className="text-gray-300 text-sm">Privacy impact analysis</div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-medium">Training Programs</span>
                <span className="text-orange-400 text-sm">Ongoing</span>
              </div>
              <div className="text-gray-300 text-sm">Staff compliance education</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NewsIntelView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">Cyber News Intelligence</h2>
        <Badge className="bg-blue-500/20 text-blue-400">Real-time Feed</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <Badge className="bg-red-500/20 text-red-400 text-xs">CRITICAL</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Critical News</h3>
          <div className="text-2xl font-bold text-red-400 mb-2">12</div>
          <p className="text-gray-400 text-sm">Today</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-400" />
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">GLOBAL</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Global Threats</h3>
          <div className="text-2xl font-bold text-orange-400 mb-2">89</div>
          <p className="text-gray-400 text-sm">This week</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">AI</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">AI Security</h3>
          <div className="text-2xl font-bold text-blue-400 mb-2">156</div>
          <p className="text-gray-400 text-sm">Articles tracked</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">TRENDING</Badge>
          </div>
          <h3 className="text-white font-bold mb-2">Trend Score</h3>
          <div className="text-2xl font-bold text-green-400 mb-2">94.7</div>
          <p className="text-gray-400 text-sm">Relevance index</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Breaking Cyber News</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-red-500/20 text-red-400 text-xs">CRITICAL</Badge>
                <span className="text-gray-400 text-xs">2 hours ago</span>
              </div>
              <h4 className="text-white font-medium mb-2">Zero-Day Vulnerability Discovered in Major Cloud Provider</h4>
              <p className="text-gray-300 text-sm">Critical security flaw affects millions of enterprise users worldwide...</p>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-orange-500/20 text-orange-400 text-xs">HIGH</Badge>
                <span className="text-gray-400 text-xs">4 hours ago</span>
              </div>
              <h4 className="text-white font-medium mb-2">New Deepfake Technology Poses Threat to Elections</h4>
              <p className="text-gray-300 text-sm">Advanced AI-generated content could influence democratic processes...</p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">MEDIUM</Badge>
                <span className="text-gray-400 text-xs">6 hours ago</span>
              </div>
              <h4 className="text-white font-medium mb-2">AI Security Startup Raises $50M Series B</h4>
              <p className="text-gray-300 text-sm">Investment to accelerate development of next-gen threat detection...</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-green-500/20 text-green-400 text-xs">INFO</Badge>
                <span className="text-gray-400 text-xs">8 hours ago</span>
              </div>
              <h4 className="text-white font-medium mb-2">New Cybersecurity Framework Released by NIST</h4>
              <p className="text-gray-300 text-sm">Updated guidelines for enterprise security management...</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Trending Topics</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Quantum Computing Threats</span>
                <span className="text-red-400 text-sm">↑ 127%</span>
              </div>
              <div className="text-gray-400 text-sm">Impact on current encryption methods</div>
            </div>

            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">AI-Powered Phishing</span>
                <span className="text-orange-400 text-sm">↑ 89%</span>
              </div>
              <div className="text-gray-400 text-sm">Sophisticated social engineering attacks</div>
            </div>

            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Supply Chain Security</span>
                <span className="text-blue-400 text-sm">↑ 76%</span>
              </div>
              <div className="text-gray-400 text-sm">Third-party vendor vulnerabilities</div>
            </div>

            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">IoT Device Exploits</span>
                <span className="text-purple-400 text-sm">↑ 65%</span>
              </div>
              <div className="text-gray-400 text-sm">Smart device security concerns</div>
            </div>

            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Privacy Regulations</span>
                <span className="text-green-400 text-sm">↑ 43%</span>
              </div>
              <div className="text-gray-400 text-sm">Global compliance requirements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <div className="flex-1">
        <TopNavigation />
        <main className="overflow-auto">
          {activeView === 'home' && <HomeView />}
          {activeView === 'scan' && <ScanView />}
          {(activeView === 'image' || activeView === 'video' || activeView === 'audio' || activeView === 'webcam') && <ScanView />}
          {activeView === 'behavior' && <BehavioralAuthView />}
          {activeView === 'threats' && <ThreatIntelligenceView />}
          {activeView === 'forensics' && <IdentityForensicsView />}
          {activeView === 'misinformation' && <MisinformationDetectorView />}
          {activeView === 'startup-audit' && <StartupSecurityView />}
          {activeView === 'enterprise' && <EnterpriseSecurityView />}
          {activeView === 'cyber-law' && <CyberLawView />}
          {activeView === 'compliance' && <ComplianceView />}
          {activeView === 'news' && <NewsIntelView />}
          {activeView === 'history' && (
            <div className="p-6">
              <h2 className="text-white text-2xl font-bold mb-6">Detection History</h2>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          item.status === 'authentic' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {item.status === 'authentic' ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.filename}</div>
                          <div className="text-gray-400 text-sm">
                            {item.type} • {item.timestamp.toLocaleDateString()} • {item.confidence.toFixed(1)}% confidence
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        item.status === 'authentic' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {item.status === 'authentic' ? 'Authentic' : 'Deepfake'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(activeView === 'settings' || activeView === 'help') && (
            <div className="p-6">
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <h2 className="text-white text-2xl font-bold mb-4">
                  {activeView === 'settings' ? 'Settings' : 'Help & Support'}
                </h2>
                <p className="text-gray-400">
                  {activeView === 'settings' 
                    ? 'Configure your SatyaAI preferences and security settings.' 
                    : 'Get help with SatyaAI features and troubleshooting.'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}