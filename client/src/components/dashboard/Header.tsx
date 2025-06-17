import { useState, useEffect } from "react";
import { Shield, Bell, Settings, ShieldCheck, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      timeZone: 'UTC' 
    }) + ' UTC';
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-cyan-400/30">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center animate-glow">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-cyan-400 font-mono">HyperSatya X</h1>
                <p className="text-xs text-slate-400">AI Cyber Intelligence v2.0</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="px-3 py-1 bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
              >
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700/50">
                Network
              </Button>
              <Button variant="ghost" size="sm" className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700/50">
                Threats
              </Button>
              <Link href="/enterprise">
                <Button variant="ghost" size="sm" className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700/50 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Enterprise
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700/50">
                Analytics
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="status-indicator bg-green-400"></div>
                <span className="text-green-400">System Online</span>
              </div>
              <div className="text-sm text-slate-400 font-mono">
                {formatTime(currentTime)}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-800/50 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-800/50">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full cursor-pointer"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
