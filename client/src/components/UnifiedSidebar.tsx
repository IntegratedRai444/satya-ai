import { Link, useLocation } from 'wouter';
import { BarChart3, Camera, Video, Mic, Eye, Layers, Shield, Brain, FileText, Clock, Settings, HelpCircle, Fingerprint, Scale, TrendingUp, Building, Database, Scan } from 'lucide-react';

export default function UnifiedSidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#1f2937] border-r border-[#0ea5e9]/20 p-6 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">SatyaAI</h1>
          <p className="text-gray-400 text-xs">Synthetic Authentication Technology for Your Analysis</p>
        </div>
      </div>

      {/* Detection Tools */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Detection Tools</h3>
        <div className="space-y-2">
          <Link href="/">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <BarChart3 className={`w-4 h-4 ${location === '/' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm font-medium ${location === '/' ? 'text-[#0ea5e9]' : ''}`}>Dashboard</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Camera className="w-4 h-4" />
            <span className="text-sm">Image Analysis</span>
          </div>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Video className="w-4 h-4" />
            <span className="text-sm">Video Analysis</span>
          </div>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Mic className="w-4 h-4" />
            <span className="text-sm">Audio Analysis</span>
          </div>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Webcam Live</span>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Advanced Features</h3>
        <div className="space-y-2">
          <Link href="/enterprise">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/enterprise' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Layers className={`w-4 h-4 ${location === '/enterprise' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/enterprise' ? 'text-[#0ea5e9] font-medium' : ''}`}>3D Enterprise Portal</span>
            </div>
          </Link>
          <Link href="/security">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/security' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Shield className={`w-4 h-4 ${location === '/security' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/security' ? 'text-[#0ea5e9] font-medium' : ''}`}>Security Features</span>
            </div>
          </Link>
          <Link href="/behavior">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/behavior' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Brain className={`w-4 h-4 ${location === '/behavior' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/behavior' ? 'text-[#0ea5e9] font-medium' : ''}`}>Behavior Analysis</span>
            </div>
          </Link>
          <Link href="/news">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/news' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <FileText className={`w-4 h-4 ${location === '/news' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/news' ? 'text-[#0ea5e9] font-medium' : ''}`}>Threat Intelligence</span>
            </div>
          </Link>
          <Link href="/identity-forensics">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/identity-forensics' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Fingerprint className={`w-4 h-4 ${location === '/identity-forensics' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/identity-forensics' ? 'text-[#0ea5e9] font-medium' : ''}`}>Identity Forensics</span>
            </div>
          </Link>
          <Link href="/misinformation">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/misinformation' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Shield className={`w-4 h-4 ${location === '/misinformation' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/misinformation' ? 'text-[#0ea5e9] font-medium' : ''}`}>Misinformation</span>
            </div>
          </Link>
          <Link href="/cybercrime-law">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/cybercrime-law' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Scale className={`w-4 h-4 ${location === '/cybercrime-law' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/cybercrime-law' ? 'text-[#0ea5e9] font-medium' : ''}`}>Cybercrime Law</span>
            </div>
          </Link>
          <Link href="/threat-intelligence">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/threat-intelligence' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Database className={`w-4 h-4 ${location === '/threat-intelligence' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/threat-intelligence' ? 'text-[#0ea5e9] font-medium' : ''}`}>Threat Intelligence</span>
            </div>
          </Link>
          <Link href="/startup-audit">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/startup-audit' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Scan className={`w-4 h-4 ${location === '/startup-audit' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/startup-audit' ? 'text-[#0ea5e9] font-medium' : ''}`}>Startup Audit</span>
            </div>
          </Link>
          <Link href="/cyber-ai">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/cyber-ai' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Brain className={`w-4 h-4 ${location === '/cyber-ai' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/cyber-ai' ? 'text-[#0ea5e9] font-medium' : ''}`}>Cyber AI Hub</span>
            </div>
          </Link>
          <Link href="/suraksha">
            <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${location === '/suraksha' ? 'bg-[#0ea5e9]/20' : 'text-gray-400 hover:text-white hover:bg-[#2a3441]'}`}>
              <Shield className={`w-4 h-4 ${location === '/suraksha' ? 'text-[#0ea5e9]' : ''}`} />
              <span className={`text-sm ${location === '/suraksha' ? 'text-[#0ea5e9] font-medium' : ''}`}>SuRaksha Auth</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Management */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Management</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Scan History</span>
          </div>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white hover:bg-[#2a3441] rounded-lg cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help & Support</span>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="mt-auto">
        <div className="bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-[#0ea5e9] text-sm font-medium">AI Assistant</span>
          </div>
          <p className="text-gray-300 text-xs">Ready to help with deepfake detection</p>
        </div>
      </div>
    </div>
  );
}