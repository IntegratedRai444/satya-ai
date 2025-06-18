import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Building2, 
  Shield, 
  Activity, 
  Menu,
  X,
  Zap,
  Brain,
  Eye,
  Settings,
  Globe,
  Bot,
  LogOut,
  User,
  Layers,
  Crown,
  BarChart3,
  Camera,
  Video,
  Mic,
  Target,
  Users,
  MapPin,
  Music,
  GraduationCap,
  Network,
  Scan,
  Fingerprint,
  Key,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function GlobalNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Main Navigation - Maximum 10 Portals
  const mainPortals = [
    {
      path: '/',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Main analytics and security overview'
    },
    {
      path: '/unified-analysis',
      label: 'Analysis Portal',
      icon: Scan,
      description: 'Unified analysis for images, videos, audio, URLs, emails, phones & text'
    },
    {
      path: '/enterprise-portal',
      label: 'Enterprise Hub',
      icon: Building2,
      description: 'Advanced enterprise security command center'
    },
    {
      path: '/threat-intelligence',
      label: 'Threat Intelligence',
      icon: Brain,
      description: 'AI-powered threat prediction and real-time intelligence'
    },
    {
      path: '/identity-forensics',
      label: 'Identity Forensics',
      icon: Fingerprint,
      description: 'Digital identity verification and forensic analysis'
    },
    {
      path: '/behavior',
      label: 'Behavior Trust',
      icon: Activity,
      description: 'Behavioral pattern analysis and trust scoring'
    },
    {
      path: '/security-features',
      label: 'Security Center',
      icon: Shield,
      description: 'Comprehensive security tools and features'
    },
    {
      path: '/cybercrime-law',
      label: 'Legal Center',
      icon: Crown,
      description: 'Legal frameworks and cybercrime database'
    },
    {
      path: '/request-access',
      label: 'Access Control',
      icon: Key,
      description: 'Request and manage access levels'
    },
    {
      path: '/ai-coach',
      label: 'AI Coach',
      icon: Bot,
      description: 'AI-powered security guidance and training'
    }
  ];

  // Side Navigation - Detailed Features
  const sideFeatures = [
    {
      category: 'Detection & Analysis',
      items: [
        { path: '/ultra-detection', label: 'Ultra Detection', icon: Camera, description: 'Advanced deepfake detection' },
        { path: '/3d-enterprise', label: 'Video Analysis', icon: Video, description: 'Video authenticity verification' },
        { path: '/soundscape', label: 'Audio Analysis', icon: Mic, description: 'Voice cloning detection' },
        { path: '/advanced-analysis', label: 'Webcam Live', icon: Eye, description: 'Real-time webcam analysis' },
        { path: '/legitimacy-analyzer', label: 'Legitimacy Check', icon: Target, description: 'URL, email, phone verification' }
      ]
    },
    {
      category: 'Intelligence & Monitoring',
      items: [
        { path: '/news', label: 'Threat Feeds', icon: Zap, description: 'Real-time cyber intelligence' },
        { path: '/startup-audit', label: 'Security Audit', icon: Settings, description: 'Comprehensive security assessment' },
        { path: '/compliance', label: 'Compliance', icon: CheckCircle, description: 'Regulatory compliance monitoring' }
      ]
    },
    {
      category: 'Enterprise & Management',
      items: [
        { path: '/user-management', label: 'User Management', icon: Users, description: 'User access and permissions' },
        { path: '/audit-logs', label: 'Audit Logs', icon: FileText, description: 'System activity monitoring' },
        { path: '/api-access', label: 'API Access', icon: Network, description: 'API keys and integration' }
      ]
    }
  ];

  const navigationItems = mainPortals;

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-cyan-600 hover:bg-cyan-700 text-white"
        size="sm"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-full px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Zap className="w-5 h-5" />
            <span>SatyaAI</span>
          </div>
          
          <div className="w-px h-6 bg-slate-700" />
          
          <div className="flex items-center gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    title={item.description}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </div>
          
          <div className="w-px h-6 bg-slate-700" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">User</span>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem('satyaai_session');
                window.location.reload();
              }}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-full"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 w-80 h-full bg-slate-900/95 backdrop-blur-lg border-l border-slate-700/50 p-6">
            <div className="mt-16 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl mb-8">
                <Brain className="w-6 h-6" />
                <span>SatyaAI Portal</span>
              </div>
              
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-cyan-600 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-slate-400">{item.description}</div>
                      </div>
                    </a>
                  </Link>
                );
              })}
              
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-xs text-slate-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>All systems operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    <span>Real-time monitoring active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Quantum encryption enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalNavigation;