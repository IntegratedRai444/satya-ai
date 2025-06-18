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
  Crown
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function GlobalNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: Home,
      description: 'Main control center and analytics overview'
    },
    {
      path: '/unified-security',
      label: 'Security Portal',
      icon: Shield,
      description: 'AI security analysis, threat detection & learning'
    },
    {
      path: '/news',
      label: 'Threat Intelligence',
      icon: Brain,
      description: 'Real-time cybersecurity intelligence and alerts'
    },
    {
      path: '/access-requests',
      label: 'Access Requests',
      icon: User,
      description: 'Request higher security layer access'
    },
    {
      path: '/founder-control',
      label: 'Founder Control',
      icon: Crown,
      description: 'Founder-only system management (Rishabh Kapoor)'
    }
  ];

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