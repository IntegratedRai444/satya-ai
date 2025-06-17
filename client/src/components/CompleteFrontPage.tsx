import { useState, useEffect } from 'react';
import { Globe, Zap, Shield, Eye, Camera, Mic, Video, Upload, Clock, AlertTriangle, CheckCircle, XCircle, BarChart3, TrendingUp, Activity, Users, Settings, HelpCircle, Bell, Layers, Brain, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';

interface ActivityItem {
  id: string;
  type: 'authentic' | 'deepfake' | 'processing';
  filename: string;
  confidence: number;
  timestamp: string;
}

export default function CompleteFrontPage() {
  const [location] = useLocation();
  const [activeUploadTab, setActiveUploadTab] = useState('Image');
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'authentic',
      filename: 'Profile_image.jpg',
      confidence: 98,
      timestamp: '2 mins ago'
    },
    {
      id: '2',
      type: 'deepfake',
      filename: 'Interview_Clip.mp4',
      confidence: 93,
      timestamp: '5 mins ago'
    },
    {
      id: '3',
      type: 'authentic',
      filename: 'Voice_Message.mp3',
      confidence: 86,
      timestamp: '8 mins ago'
    }
  ]);

  // Simulate real-time metrics updates
  const [metrics, setMetrics] = useState({
    analyzedMedia: 147,
    detectedDeepfakes: 36,
    avgDetectionTime: 4.2,
    detectionAccuracy: 96
  });

  const [detectionActivity, setDetectionActivity] = useState([
    12, 19, 15, 27, 32, 18, 45, 52, 38, 29, 41, 35, 28, 33, 47, 51, 42, 36, 29, 38, 44, 52, 48, 35
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        analyzedMedia: prev.analyzedMedia + Math.floor(Math.random() * 3),
        detectedDeepfakes: prev.detectedDeepfakes + (Math.random() > 0.8 ? 1 : 0),
        avgDetectionTime: Math.max(3.0, prev.avgDetectionTime + (Math.random() - 0.5) * 0.2),
        detectionAccuracy: Math.min(99, Math.max(94, prev.detectionAccuracy + (Math.random() - 0.5) * 0.5))
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const uploadTabs = ['Image', 'Video', 'Audio', 'Webcam'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#1f2937] border-r border-[#0ea5e9]/20 p-6">
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

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1 bg-[#0ea5e9]/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
            <span className="text-[#0ea5e9] text-xs font-medium">New AI Models Released</span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link href="/">
                <span className={`text-sm font-medium cursor-pointer ${location === '/' ? 'text-[#0ea5e9]' : 'text-gray-400 hover:text-white'}`}>Home</span>
              </Link>
              <Link href="/enterprise">
                <span className={`text-sm cursor-pointer ${location === '/enterprise' ? 'text-[#0ea5e9] font-medium' : 'text-gray-400 hover:text-white'}`}>Enterprise</span>
              </Link>
              <Link href="/security">
                <span className={`text-sm cursor-pointer ${location === '/security' ? 'text-[#0ea5e9] font-medium' : 'text-gray-400 hover:text-white'}`}>Security</span>
              </Link>
              <Link href="/behavior">
                <span className={`text-sm cursor-pointer ${location === '/behavior' ? 'text-[#0ea5e9] font-medium' : 'text-gray-400 hover:text-white'}`}>Behavior</span>
              </Link>
              <Link href="/news">
                <span className={`text-sm cursor-pointer ${location === '/news' ? 'text-[#0ea5e9] font-medium' : 'text-gray-400 hover:text-white'}`}>Intelligence</span>
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-white text-4xl font-bold mb-4">
                Detect <span className="text-[#0ea5e9]">deepfakes</span> with the power of SatyaAI
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                Our advanced detection system helps you authenticate media with unprecedented accuracy, 
                exposing manipulated content across images, videos, and audio.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <button className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Analyze Media
                </button>
                <button className="border border-gray-600 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium">
                  How it Works
                </button>
              </div>
              
              <p className="text-gray-400 text-sm">
                Upload your files or use your webcam for real-time analysis and get detailed authenticity reports instantly.
              </p>
            </div>
            
            <div className="bg-[#2a3441] rounded-lg p-6 border border-[#0ea5e9]/20">
              <div className="text-right mb-4">
                <div className="text-[#0ea5e9] text-sm">AUTHENTICITY SCORE</div>
                <div className="text-white text-3xl font-bold">79%</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
                  <span className="text-gray-300">Secure Processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Verified Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Analytics & Detection Tools */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics & Insights */}
            <div className="bg-[#2a3441] rounded-xl p-6 border border-[#0ea5e9]/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">Analytics & Insights</h2>
                  <p className="text-gray-400 text-sm">System performance and detection tips</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Statistics
                  </button>
                  <button className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg text-sm">
                    Insights
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1f2937] rounded-lg p-4 border border-[#0ea5e9]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-[#0ea5e9]" />
                    <span className="text-gray-400 text-sm">Analyzed Media</span>
                  </div>
                  <div className="text-white text-2xl font-bold">{metrics.analyzedMedia}</div>
                  <div className="text-green-400 text-xs">+24% ↑</div>
                </div>

                <div className="bg-[#1f2937] rounded-lg p-4 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-gray-400 text-sm">Detected Deepfakes</span>
                  </div>
                  <div className="text-white text-2xl font-bold">{metrics.detectedDeepfakes}</div>
                  <div className="text-red-400 text-xs">+12% ↑</div>
                </div>

                <div className="bg-[#1f2937] rounded-lg p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Avg. Detection Time</span>
                  </div>
                  <div className="text-white text-2xl font-bold">{metrics.avgDetectionTime.toFixed(1)}s</div>
                  <div className="text-yellow-400 text-xs">-8% ↓</div>
                </div>

                <div className="bg-[#1f2937] rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400 text-sm">Detection Accuracy</span>
                  </div>
                  <div className="text-white text-2xl font-bold">{metrics.detectionAccuracy.toFixed(0)}%</div>
                  <div className="text-green-400 text-xs">+5% ↑</div>
                </div>
              </div>

              {/* Detection Activity Chart */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-[#0ea5e9]" />
                  <span className="text-white font-medium">Detection Activity</span>
                </div>
                <div className="flex items-end gap-1 h-32">
                  {detectionActivity.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col justify-end">
                      <div 
                        className={`bg-[#0ea5e9] rounded-sm transition-all duration-300 ${
                          index === Math.floor(detectionActivity.length / 2) ? 'bg-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/50' : ''
                        }`}
                        style={{ height: `${(value / Math.max(...detectionActivity)) * 100}%` }}
                      />
                      {index === Math.floor(detectionActivity.length / 2) && (
                        <div className="absolute bg-[#0ea5e9] text-white text-xs px-2 py-1 rounded mt-1">
                          {value} Alerts
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>

            {/* Deepfake Detection Tools */}
            <div className="bg-[#2a3441] rounded-xl p-6 border border-[#0ea5e9]/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">Deepfake Detection Tools</h2>
                  <p className="text-gray-400 text-sm">Choose your media type for comprehensive analysis</p>
                </div>
                <div className="text-gray-400 text-sm">
                  Using <span className="text-[#0ea5e9]">Neural Vision v4.2</span> models
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f2937] border border-[#0ea5e9]/20 rounded-lg p-4 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center group-hover:bg-[#0ea5e9]/30 transition-all">
                      <Camera className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Image Analysis</h3>
                      <p className="text-gray-400 text-xs">Detect manipulated photos & generated images</p>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <div className="text-[#0ea5e9] text-xs">Accuracy</div>
                    <div className="text-white text-lg font-bold">98.2%</div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>✓ Photoshop Detection</div>
                    <div>✓ GAN Detection</div>
                    <div>✓ Metadata Analysis</div>
                  </div>
                  <button className="w-full mt-4 bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] py-2 rounded-lg text-sm font-medium transition-colors">
                    START ANALYSIS →
                  </button>
                </div>

                <div className="bg-[#1f2937] border border-[#0ea5e9]/20 rounded-lg p-4 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center group-hover:bg-[#0ea5e9]/30 transition-all">
                      <Video className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Video Verification</h3>
                      <p className="text-gray-400 text-xs">Identify deepfake videos & facial manipulations</p>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <div className="text-[#0ea5e9] text-xs">Accuracy</div>
                    <div className="text-white text-lg font-bold">96.8%</div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>✓ Facial Inconsistencies</div>
                    <div>✓ Temporal Analysis</div>
                    <div>✓ Lip Sync Verification</div>
                  </div>
                  <button className="w-full mt-4 bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] py-2 rounded-lg text-sm font-medium transition-colors">
                    START ANALYSIS →
                  </button>
                </div>

                <div className="bg-[#1f2937] border border-[#0ea5e9]/20 rounded-lg p-4 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center group-hover:bg-[#0ea5e9]/30 transition-all">
                      <Mic className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Audio Detection</h3>
                      <p className="text-gray-400 text-xs">Uncover voice cloning & synthetic speech</p>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <div className="text-[#0ea5e9] text-xs">Accuracy</div>
                    <div className="text-white text-lg font-bold">95.3%</div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>✓ Voice Cloning Detection</div>
                    <div>✓ Natural Patterns Analysis</div>
                    <div>✓ Neural Voice Filter</div>
                  </div>
                  <button className="w-full mt-4 bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] py-2 rounded-lg text-sm font-medium transition-colors">
                    START ANALYSIS →
                  </button>
                </div>

                <div className="bg-[#1f2937] border border-[#0ea5e9]/20 rounded-lg p-4 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center group-hover:bg-[#0ea5e9]/30 transition-all">
                      <Eye className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Live Webcam</h3>
                      <p className="text-gray-400 text-xs">Real-time deepfake analysis & verification</p>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <div className="text-[#0ea5e9] text-xs">Accuracy</div>
                    <div className="text-white text-lg font-bold">92.7%</div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>✓ Live Deepfake Alert</div>
                    <div>✓ Facial Authentication</div>
                    <div>✓ Low-Light Analysis</div>
                  </div>
                  <button className="w-full mt-4 bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] py-2 rounded-lg text-sm font-medium transition-colors">
                    START ANALYSIS →
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Media Section */}
            <div className="bg-[#2a3441] rounded-xl p-6 border border-[#0ea5e9]/20">
              <div className="flex items-center gap-2 mb-6">
                <Upload className="w-5 h-5 text-[#0ea5e9]" />
                <h2 className="text-white text-xl font-bold">Upload Media for Analysis</h2>
              </div>

              {/* Upload Tabs */}
              <div className="flex gap-2 mb-6">
                {uploadTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveUploadTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeUploadTab === tab
                        ? 'bg-[#0ea5e9] text-white'
                        : 'bg-[#1f2937] text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#0ea5e9]/30 rounded-lg p-8 text-center">
                <div className="mb-4">
                  <Upload className="w-12 h-12 text-[#0ea5e9] mx-auto mb-3" />
                  <h3 className="text-white text-lg font-semibold mb-2">Drag & Drop Files Here</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Upload JPEG, PNG or GIF files for analysis. Max file size: 10MB
                  </p>
                </div>
                <button className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-white px-6 py-2 rounded-lg font-medium">
                  Browse Files
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detection Guide & Recent Activity */}
          <div className="space-y-6">
            {/* Detection Guide */}
            <div className="bg-[#2a3441] rounded-xl p-6 border border-[#0ea5e9]/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-bold">Detection Guide</h2>
                <div className="flex items-center gap-1 text-xs text-[#0ea5e9]">
                  <Shield className="w-4 h-4" />
                  <span>Expert Tips</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0ea5e9] text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Look for unnatural eye blinking patterns and inconsistent eye reflections in suspected videos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0ea5e9] text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Check for unnatural hair movement, unusual skin texture, or blurry face boundaries in images.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0ea5e9] text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Watch for inconsistencies in audio-visual synchronization, especially in speech videos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0ea5e9] text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Analyze visual artifacts around the edges of faces, which often indicate manipulation.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Complete Deepfake Guide
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#2a3441] rounded-xl p-6 border border-[#0ea5e9]/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-bold">Recent Activity</h2>
                <Activity className="w-5 h-5 text-[#0ea5e9]" />
              </div>

              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-[#1f2937] rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'authentic' ? 'bg-green-500/20' :
                      item.type === 'deepfake' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {item.type === 'authentic' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : item.type === 'deepfake' ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.filename}</p>
                      <p className="text-gray-400 text-xs">{item.confidence}% confidence score</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium ${
                        item.type === 'authentic' ? 'text-green-400' :
                        item.type === 'deepfake' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {item.type === 'authentic' ? 'Authentic' :
                         item.type === 'deepfake' ? 'Deepfake' : 'Processing'}
                      </div>
                      <div className="text-gray-500 text-xs">{item.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-[#0ea5e9] text-sm font-medium hover:text-white transition-colors">
                View All History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}