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
  FileText,
  AlertTriangle,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'founder' | 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

interface GlobalNavigationProps {
  user?: AuthenticatedUser;
  onLogout?: () => void;
}

export function GlobalNavigation({ user, onLogout }: GlobalNavigationProps = {}) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Developer Access - Full Development Tools and System Access
  const developerPortals = [
    {
      path: '/',
      label: 'Developer Dashboard',
      icon: Settings,
      description: 'Full system control and development environment'
    },
    {
      path: '/unified-analysis',
      label: 'Analysis Portal',
      icon: Scan,
      description: 'Complete analysis suite with all content types'
    },
    {
      path: '/quantum-security',
      label: 'Quantum Security Lab',
      icon: Zap,
      description: 'Advanced quantum computing and cryptography'
    },
    {
      path: '/ai-threat-hunting',
      label: 'AI Threat Hunting',
      icon: Target,
      description: 'Advanced AI-powered threat detection system'
    },
    {
      path: '/behavioral-intelligence',
      label: 'Behavioral Intelligence',
      icon: Brain,
      description: 'AI behavioral analysis and prediction'
    },
    {
      path: '/zero-trust',
      label: 'Zero Trust Architecture',
      icon: Shield,
      description: 'Enterprise zero-trust security framework'
    },
    {
      path: '/machine-learning-prediction',
      label: 'ML Threat Prediction',
      icon: Activity,
      description: 'Machine learning models for advanced threat prediction'
    },
    {
      path: '/real-time-collaboration',
      label: 'Real-time Collaboration',
      icon: Users,
      description: 'Real-time collaboration features for security teams'
    },
    {
      path: '/animated-threat-timeline',
      label: 'Threat Timeline',
      icon: Activity,
      description: 'Animated threat timeline with interactive storytelling'
    },
    {
      path: '/micro-animations',
      label: 'Threat Indicators',
      icon: Eye,
      description: 'Micro-animations for threat status indicators'
    }
  ];

  // Company Access - Business and Team Management Tools (No Overlap with Developer)
  const companyPortals = [
    {
      path: '/',
      label: 'Company Dashboard',
      icon: Building2,
      description: 'Business analytics and team overview'
    },
    {
      path: '/team-management',
      label: 'Team Management',
      icon: Users,
      description: 'Employee security and productivity management'
    },
    {
      path: '/compliance-center',
      label: 'Compliance Center',
      icon: CheckCircle,
      description: 'Regulatory compliance and audit management'
    },
    {
      path: '/business-reports',
      label: 'Business Reports',
      icon: BarChart3,
      description: 'Executive security and performance reports'
    },
    {
      path: '/employee-training',
      label: 'Employee Training',
      icon: GraduationCap,
      description: 'Security awareness and training programs'
    },
    {
      path: '/contextual-help',
      label: 'Security Assistant',
      icon: Bot,
      description: 'Contextual help tooltips with playful security mascot'
    },
    {
      path: '/security-mood',
      label: 'Security Mood',
      icon: Activity,
      description: 'One-click security mood generator'
    },
    {
      path: '/whisper-mode',
      label: 'Whisper Mode',
      icon: Eye,
      description: 'Low-intensity UI for sensitive environments'
    },
    {
      path: '/vendor-security',
      label: 'Vendor Security',
      icon: Network,
      description: 'Third-party vendor security management'
    }
  ];

  // Basic Access - Comprehensive Essential Tools for General Users
  const basicPortals = [
    {
      path: '/',
      label: 'Security Dashboard',
      icon: BarChart3,
      description: 'Complete security overview and metrics'
    },
    {
      path: '/unified-analysis',
      label: 'Analysis Portal',
      icon: Scan,
      description: 'Content analysis for all media types'
    },
    {
      path: '/ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      description: 'Intelligent security assistant and chat'
    },
    {
      path: '/security-news',
      label: 'Live Security News',
      icon: Globe,
      description: 'Real-time cybersecurity news and updates'
    },
    {
      path: '/daily-reports',
      label: 'Daily Reports',
      icon: FileText,
      description: 'Daily security and threat reports'
    },
    {
      path: '/threat-reports',
      label: 'Threat Reports',
      icon: AlertTriangle,
      description: 'Daily threat intelligence reports'
    },
    {
      path: '/cyber-reports',
      label: 'Cyber Reports',
      icon: Shield,
      description: 'Comprehensive cybersecurity reports'
    },
    {
      path: '/message-center',
      label: 'Message Center',
      icon: Mail,
      description: 'Send and receive security messages'
    },
    {
      path: '/basic-compliance',
      label: 'Basic Compliance',
      icon: CheckCircle,
      description: 'Essential compliance monitoring'
    },
    {
      path: '/security-training',
      label: 'Security Training',
      icon: GraduationCap,
      description: 'Basic security awareness training'
    },
    {
      path: '/personal-security',
      label: 'Personal Security',
      icon: User,
      description: 'Individual security assessment and tips'
    },
    {
      path: '/security-calculator',
      label: 'Security Calculator',
      icon: BarChart3,
      description: 'Calculate your security score and risks'
    },
    {
      path: '/security-tips',
      label: 'Daily Security Tips',
      icon: Eye,
      description: 'Practical daily security recommendations'
    },
    {
      path: '/incident-reporter',
      label: 'Incident Reporter',
      icon: AlertTriangle,
      description: 'Report security incidents easily'
    },
    {
      path: '/ai-security-agent',
      label: 'AI Security Agent',
      icon: Bot,
      description: 'Intelligent security assistant with detailed insights'
    }
  ];

  // Founder Access - Complete Platform Control
  const founderPortals = [
    {
      path: '/',
      label: 'Founder Control',
      icon: Crown,
      description: 'Complete platform oversight and control'
    },
    {
      path: '/unified-analysis',
      label: 'Master Analysis',
      icon: Scan,
      description: 'Supreme analysis authority with all capabilities'
    },
    {
      path: '/quantum-security',
      label: 'Quantum Security',
      icon: Zap,
      description: 'Advanced quantum computing and cryptography'
    },
    {
      path: '/ai-threat-hunting',
      label: 'AI Threat Hunting',
      icon: Target,
      description: 'Master AI threat detection and response'
    },
    {
      path: '/machine-learning-prediction',
      label: 'ML Predictions',
      icon: Brain,
      description: 'Machine learning threat forecasting'
    },
    {
      path: '/animated-threat-timeline',
      label: 'Threat Timeline',
      icon: Activity,
      description: 'Interactive threat storytelling'
    },
    {
      path: '/security-mood',
      label: 'Security Mood',
      icon: Activity,
      description: 'Platform-wide security mood control'
    },
    {
      path: '/real-time-analysis',
      label: 'Real-time Analysis',
      icon: Eye,
      description: 'Live system monitoring and analysis'
    },
    {
      path: '/comprehensive-threat-intelligence',
      label: 'Threat Intelligence',
      icon: Shield,
      description: 'Complete threat intelligence oversight'
    },
    {
      path: '/founder-control',
      label: 'System Override',
      icon: Settings,
      description: 'Ultimate system control and configuration'
    }
  ];

  // Select portals based on user access level
  const getPortalsByAccessLevel = () => {
    if (!user) return basicPortals;
    
    switch (user.accessLevel) {
      case 'founder':
        return founderPortals;
      case 'developer':
        return developerPortals;
      case 'company':
        return companyPortals;
      case 'basic':
      default:
        return basicPortals;
    }
  };

  const mainPortals = getPortalsByAccessLevel();

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
        { path: '/news', label: 'Real-time Feeds', icon: Zap, description: 'Live cyber intelligence and news feeds' },
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
    },
    {
      category: 'Advanced Research & Development',
      items: [
        { path: '/quantum-security', label: 'Quantum Security Lab', icon: Scan, description: 'Quantum computing and advanced cryptography' },
        { path: '/behavioral-intelligence', label: 'Behavioral Intelligence', icon: Brain, description: 'AI-powered behavioral analysis and prediction' },
        { path: '/zero-trust', label: 'Zero Trust Architecture', icon: Shield, description: 'Never trust, always verify security framework' },
        { path: '/ai-threat-hunting', label: 'AI Threat Hunting', icon: Target, description: 'Advanced AI-powered threat detection and hunting' }
      ]
    }
  ];

  const navigationItems = mainPortals;

  const isActive = (path: string) => {
    return location === path;
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'developer': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'company': return 'text-cyan-400 border-cyan-400 bg-cyan-400/10';
      case 'basic': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <>
      {/* User Profile Header */}
      {user && (
        <div className="fixed top-0 right-0 z-50 p-4">
          <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${user.accessLevel === 'developer' ? 'bg-green-600' : user.accessLevel === 'company' ? 'bg-cyan-600' : 'bg-blue-600'}`}>
                {user.accessLevel === 'developer' ? <Settings className="w-4 h-4" /> : 
                 user.accessLevel === 'company' ? <Building2 className="w-4 h-4" /> : 
                 <User className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-xs text-slate-400">Logged in as</p>
                <p className="text-sm font-medium text-white">{user.email}</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded border text-xs font-medium ${getAccessLevelColor(user.accessLevel)}`}>
              {user.accessLevel.toUpperCase()}
            </div>
            {onLogout && (
              <Button
                onClick={onLogout}
                size="sm"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}

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