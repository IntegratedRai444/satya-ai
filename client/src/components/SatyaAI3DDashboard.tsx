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
  Orbit
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
    voice_cloning?: boolean;
    spectral_analysis?: boolean;
    processing_time?: number;
    ai_model?: string;
    threat_level?: string;
    risk_score?: number;
  };
}

interface SystemMetrics {
  analyzed_media: number;
  detected_deepfakes: number;
  avg_detection_time: number;
  detection_accuracy: number;
  alerts: number;
}

export default function SatyaAI3DDashboard() {
  const [activeView, setActiveView] = useState('home');
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'audio' | 'webcam'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentActivity, setRecentActivity] = useState<DetectionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([]);

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

  // 3D Animation and Effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for 3D effects
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create matrix-like digital rain effect
      ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.font = '12px "Orbitron", monospace';
      
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, x, y);
      }

      // Floating geometric shapes
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i) * 100) + canvas.width / 2;
        const y = (Math.cos(Date.now() * 0.002 + i) * 50) + canvas.height / 2;
        const size = 10 + Math.sin(Date.now() * 0.003 + i) * 5;
        
        ctx.beginPath();
        ctx.rect(x - size/2, y - size/2, size, size);
        ctx.stroke();
      }

      // Neural network connections
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < 15; i++) {
        const x1 = Math.sin(Date.now() * 0.001 + i * 0.5) * 200 + canvas.width / 2;
        const y1 = Math.cos(Date.now() * 0.002 + i * 0.5) * 100 + canvas.height / 2;
        const x2 = Math.sin(Date.now() * 0.001 + (i + 1) * 0.5) * 200 + canvas.width / 2;
        const y2 = Math.cos(Date.now() * 0.002 + (i + 1) * 0.5) * 100 + canvas.height / 2;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Comprehensive data fetching for all features
  useEffect(() => {
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

  // Real-time metrics updates with 3D effects
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

  const getAccuracyByType = (type: string) => {
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

  const HolographicCard = ({ children, className = "", glowColor = "cyan" }: {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
  }) => (
    <div className={`
      relative group
      bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90
      border border-gray-700/50
      rounded-xl
      backdrop-blur-xl
      overflow-hidden
      transition-all duration-500
      hover:scale-105 hover:rotate-1
      hover:border-${glowColor}-500/50
      hover:shadow-2xl hover:shadow-${glowColor}-500/20
      ${className}
    `}>
      <div className={`
        absolute inset-0 
        bg-gradient-to-r from-transparent via-${glowColor}-500/5 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        animate-pulse
      `} />
      <div className="relative z-10">
        {children}
      </div>
      <div className={`
        absolute -top-1 -right-1 w-8 h-8
        bg-gradient-to-br from-${glowColor}-400/20 to-transparent
        rounded-full blur-md
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      `} />
    </div>
  );

  const FloatingMetric = ({ 
    icon: Icon, 
    value, 
    label, 
    color = "cyan",
    delay = 0 
  }: {
    icon: any;
    value: string | number;
    label: string;
    color?: string;
    delay?: number;
  }) => (
    <div 
      className={`animate-3d-float`} 
      style={{ animationDelay: `${delay}s` }}
    >
      <HolographicCard 
        className="p-6" 
        glowColor={color}
      >
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-xl 
          bg-gradient-to-br from-${color}-500/20 to-${color}-600/10
          flex items-center justify-center
          group-hover:rotate-12 transition-transform duration-500
        `}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div>
          <div className={`text-2xl font-bold text-${color}-400 font-mono`}>
            {value}
          </div>
          <div className="text-gray-300 text-sm">{label}</div>
        </div>
      </div>
      </HolographicCard>
    </div>
  );

  const NeuralNetworkNode = ({ 
    x, 
    y, 
    size = 40, 
    color = "cyan", 
    pulse = false,
    onClick
  }: {
    x: number;
    y: number;
    size?: number;
    color?: string;
    pulse?: boolean;
    onClick?: () => void;
  }) => (
    <div 
      className={`
        absolute rounded-full cursor-pointer
        bg-gradient-to-br from-${color}-500/30 to-${color}-600/10
        border-2 border-${color}-500/50
        backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-300
        hover:scale-125 hover:border-${color}-400
        ${pulse ? 'animate-pulse' : ''}
      `}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
    >
      <div className={`w-2 h-2 bg-${color}-400 rounded-full`} />
    </div>
  );

  const SidebarMenu3D = () => (
    <div className="w-80 bg-gradient-to-b from-gray-950/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5" />
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header with 3D logo */}
      <div className="relative p-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <Atom className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SatyaAI 3D
            </h1>
            <p className="text-gray-400 text-xs">Neural Intelligence Matrix</p>
          </div>
        </div>
      </div>

      {/* 3D Detection Tools */}
      <div className="px-4 py-6 relative">
        <h3 className="text-cyan-400 text-sm font-medium mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          3D Detection Tools
        </h3>
        <div className="space-y-2">
          {[
            { id: 'home', icon: Home, label: 'Holographic Dashboard', color: 'cyan' },
            { id: 'image', icon: FileImage, label: 'Neural Image Scanner', color: 'purple' },
            { id: 'video', icon: Video, label: 'Temporal Analysis', color: 'blue' },
            { id: 'audio', icon: Volume2, label: 'Spectral Detection', color: 'green' },
            { id: 'webcam', icon: Webcam, label: 'Live Neural Stream', color: 'orange' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                transition-all duration-300 group relative overflow-hidden
                ${activeView === item.id 
                  ? `bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/10 text-${item.color}-400 border border-${item.color}-500/30` 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <item.icon className={`w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300`} />
              <span className="relative z-10 font-medium">{item.label}</span>
              {activeView === item.id && (
                <div className={`absolute right-2 w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Intelligence with Neural Network Visualization */}
      <div className="px-4 py-6 relative">
        <h3 className="text-purple-400 text-sm font-medium mb-4 flex items-center gap-2">
          <Orbit className="w-4 h-4 animate-spin-slow" />
          Advanced Neural Intelligence
        </h3>
        <div className="space-y-2">
          {[
            { id: 'behavior', icon: Target, label: 'Behavioral Matrix', color: 'cyan' },
            { id: 'threats', icon: Radar, label: 'Threat Intelligence', color: 'red' },
            { id: 'forensics', icon: Search, label: 'Digital Forensics', color: 'purple' },
            { id: 'misinformation', icon: AlertOctagon, label: 'Info Verification', color: 'orange' },
            { id: 'startup-audit', icon: Building, label: 'Security Assessment', color: 'blue' },
            { id: 'cyber-law', icon: Scale, label: 'Legal Framework', color: 'amber' }
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                transition-all duration-300 group relative overflow-hidden
                ${activeView === item.id 
                  ? `bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/10 text-${item.color}-400 border border-${item.color}-500/30` 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <item.icon className={`w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300`} />
              <span className="relative z-10 font-medium">{item.label}</span>
              {activeView === item.id && (
                <div className={`absolute right-2 w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Portal */}
      <div className="px-4 py-6 relative">
        <h3 className="text-yellow-400 text-sm font-medium mb-4 flex items-center gap-2">
          <Crown className="w-4 h-4" />
          Enterprise Portal
        </h3>
        <div className="space-y-2">
          {[
            { id: 'enterprise', icon: Crown, label: 'Enterprise Hub', color: 'yellow' },
            { id: 'news', icon: Globe, label: 'Cyber Intelligence', color: 'green' },
            { id: 'complete-hub', icon: Layers, label: 'Complete Platform', color: 'indigo' },
            { id: 'history', icon: History, label: 'Analysis History', color: 'gray' }
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                transition-all duration-300 group relative overflow-hidden
                ${activeView === item.id 
                  ? `bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/10 text-${item.color}-400 border border-${item.color}-500/30` 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <item.icon className={`w-5 h-5 relative z-10 group-hover:rotate-6 transition-transform duration-300`} />
              <span className="relative z-10 font-medium">{item.label}</span>
              {activeView === item.id && (
                <div className={`absolute right-2 w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant with 3D Avatar */}
      <div className="mt-auto p-4">
        <HolographicCard className="p-4" glowColor="green">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-full flex items-center justify-center">
                <Ghost className="w-5 h-5 text-green-400 animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="text-green-400 text-sm font-medium">Neural Assistant</div>
              <div className="text-gray-400 text-xs">Always Learning</div>
            </div>
          </div>
        </HolographicCard>
      </div>
    </div>
  );

  const TopNavigation3D = () => (
    <div className="border-b border-cyan-500/20 bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl relative overflow-hidden">
      {/* Animated header background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 animate-gradient-x" />
      
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <h2 className="text-white text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Neural Detection Matrix
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('statistics')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300
                hover:bg-cyan-500/20 hover:scale-105
                ${activeView === 'statistics' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300'}
              `}
            >
              <BarChart3 className="w-4 h-4" />
              Statistics
            </button>
            <button 
              onClick={() => setActiveView('insights')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300
                hover:bg-purple-500/20 hover:scale-105
                ${activeView === 'insights' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'}
              `}
            >
              <Eye className="w-4 h-4" />
              Insights
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer" />
              {systemMetrics.alerts > 0 && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{systemMetrics.alerts}</span>
                </div>
              )}
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Animated 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Mouse follower effect */}
      <div 
        className="fixed w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none z-10 transition-all duration-1000"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      <div className="flex relative z-20">
        <SidebarMenu3D />
        <div className="flex-1">
          <TopNavigation3D />
          <main className="overflow-auto p-6">
            {activeView === 'home' && (
              <div className="space-y-8">
                {/* Hero Section with 3D Elements */}
                <div className="relative">
                  <HolographicCard className="p-8 text-center" glowColor="cyan">
                    <div className="relative">
                      <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Detect deepfakes with the power of SatyaAI 3D
                      </h1>
                      <p className="text-gray-300 text-lg mb-6">
                        Advanced neural network analysis with holographic visualization
                      </p>
                      <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Start Neural Scan
                        </button>
                        <button className="px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300 flex items-center gap-2">
                          <Play className="w-5 h-5" />
                          View Demo
                        </button>
                      </div>
                    </div>
                  </HolographicCard>
                </div>

                {/* 3D Metrics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FloatingMetric
                    icon={Activity}
                    value={systemMetrics.analyzed_media}
                    label="Media Analyzed"
                    color="cyan"
                    delay={0}
                  />
                  <FloatingMetric
                    icon={AlertTriangle}
                    value={systemMetrics.detected_deepfakes}
                    label="Deepfakes Detected"
                    color="red"
                    delay={0.2}
                  />
                  <FloatingMetric
                    icon={Zap}
                    value={`${systemMetrics.avg_detection_time.toFixed(1)}s`}
                    label="Avg Detection Time"
                    color="purple"
                    delay={0.4}
                  />
                  <FloatingMetric
                    icon={CheckCircle}
                    value={`${systemMetrics.detection_accuracy.toFixed(1)}%`}
                    label="Detection Accuracy"
                    color="green"
                    delay={0.6}
                  />
                </div>

                {/* Neural Network Visualization */}
                <div className="relative">
                  <HolographicCard className="p-8" glowColor="purple">
                    <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                      <Boxes className="w-6 h-6 text-purple-400" />
                      Neural Network Activity
                    </h3>
                    <div className="relative h-64 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-lg overflow-hidden">
                      {/* Neural network nodes */}
                      <NeuralNetworkNode x={20} y={30} color="cyan" pulse={true} />
                      <NeuralNetworkNode x={40} y={60} color="purple" />
                      <NeuralNetworkNode x={60} y={40} color="blue" pulse={true} />
                      <NeuralNetworkNode x={80} y={70} color="green" />
                      
                      {/* Activity indicators */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          <span className="text-cyan-400 text-sm">Input Layer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                          <span className="text-purple-400 text-sm">Hidden Layers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-sm">Output Layer</span>
                        </div>
                      </div>
                    </div>
                  </HolographicCard>
                </div>

                {/* 3D Detection Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      type: 'image', 
                      icon: FileImage, 
                      title: 'Neural Image Analysis', 
                      accuracy: getAccuracyByType('image'),
                      color: 'purple',
                      description: 'Advanced CNN detection with quantum enhancement'
                    },
                    { 
                      type: 'video', 
                      icon: Video, 
                      title: 'Temporal Verification', 
                      accuracy: getAccuracyByType('video'),
                      color: 'blue',
                      description: 'Frame-by-frame analysis with temporal consistency'
                    },
                    { 
                      type: 'audio', 
                      icon: Volume2, 
                      title: 'Spectral Detection', 
                      accuracy: getAccuracyByType('audio'),
                      color: 'green',
                      description: 'Voice cloning detection with neural patterns'
                    },
                    { 
                      type: 'webcam', 
                      icon: Webcam, 
                      title: 'Live Neural Stream', 
                      accuracy: getAccuracyByType('webcam'),
                      color: 'orange',
                      description: 'Real-time deepfake detection with 3D mapping'
                    }
                  ].map((tool, index) => (
                    <HolographicCard 
                      key={tool.type} 
                      className="p-6 cursor-pointer group"
                      glowColor={tool.color}
                    >
                      <div className="text-center">
                        <div className={`
                          w-16 h-16 mx-auto mb-4 rounded-xl 
                          bg-gradient-to-br from-${tool.color}-500/20 to-${tool.color}-600/10
                          flex items-center justify-center
                          group-hover:scale-110 group-hover:rotate-12 
                          transition-transform duration-500
                        `}>
                          <tool.icon className={`w-8 h-8 text-${tool.color}-400`} />
                        </div>
                        <h4 className="text-white font-bold mb-2">{tool.title}</h4>
                        <div className={`text-2xl font-bold text-${tool.color}-400 mb-2`}>
                          {tool.accuracy}
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                        <button 
                          onClick={() => setActiveView(tool.type)}
                          className={`
                            w-full py-2 bg-gradient-to-r from-${tool.color}-500/20 to-${tool.color}-600/10
                            border border-${tool.color}-500/30 text-${tool.color}-400 rounded-lg
                            hover:bg-${tool.color}-500/30 transition-colors duration-300
                            flex items-center justify-center gap-2
                          `}
                        >
                          <ArrowRight className="w-4 h-4" />
                          Launch Scanner
                        </button>
                      </div>
                    </HolographicCard>
                  ))}
                </div>
              </div>
            )}

            {/* Other views would go here with similar 3D styling */}
            {activeView !== 'home' && (
              <HolographicCard className="p-8" glowColor="cyan">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {activeView.charAt(0).toUpperCase() + activeView.slice(1)} - 3D Mode
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Enhanced neural interface with holographic visualization
                  </p>
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <Atom className="w-16 h-16 text-cyan-400 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </HolographicCard>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}