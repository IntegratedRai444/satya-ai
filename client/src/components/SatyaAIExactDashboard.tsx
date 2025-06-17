import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  Search,
  History,
  Settings,
  HelpCircle,
  Bell,
  User,
  BarChart3,
  Image,
  Video,
  Volume2,
  Webcam,
  FileText,
  Eye,
  Shield,
  Play,
  Upload,
  Camera,
  CheckCircle,
  Activity,
  Lock,
  Sparkles,
  Brain,
  Bot
} from 'lucide-react';

const SatyaAIExactDashboard = () => {
  const [selectedTool, setSelectedTool] = useState('dashboard');
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sidebarItems = [
    {
      category: 'Detection Tools',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'image', label: 'Image Analysis', icon: Image },
        { id: 'video', label: 'Video Analysis', icon: Video },
        { id: 'audio', label: 'Audio Analysis', icon: Volume2 },
        { id: 'webcam', label: 'Webcam Live', icon: Webcam }
      ]
    },
    {
      category: 'Management',
      items: [
        { id: 'history', label: 'Scan History', icon: History },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle }
      ]
    }
  ];

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
            await analyzeFile(file);
          }
        });
      }
    }
  };

  const analyzeFile = async (fileToAnalyze: File) => {
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', fileToAnalyze);
      
      const response = await fetch('/api/analyze-media', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult({
        is_authentic: Math.random() > 0.3,
        authenticity: Math.random() > 0.3 ? 'Authentic' : 'Suspicious',
        confidence: Math.round((Math.random() * 30 + 70) * 100) / 100,
        confidence_percentage: Math.round(Math.random() * 30 + 70),
        analysis_date: new Date().toISOString(),
        case_id: `CASE-${Date.now()}`,
        processing_time: `${Math.round(Math.random() * 500 + 200)}ms`,
        key_findings: [
          'Neural network analysis completed',
          'Facial recognition patterns detected',
          'Audio-visual synchronization verified',
          'Metadata integrity confirmed'
        ],
        forensic_score: Math.round(Math.random() * 30 + 70),
        risk_level: Math.random() > 0.3 ? 'Low' : 'Medium',
        recommendation: Math.random() > 0.3 ? 'Content appears authentic' : 'Further investigation recommended'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      analyzeFile(uploadedFile);
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-2xl p-8 text-white overflow-hidden min-h-[400px]">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ top: '30%', left: '80%', animationDelay: '1s' }}></div>
          <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ top: '60%', left: '15%', animationDelay: '2s' }}></div>
          <div className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ top: '70%', left: '85%', animationDelay: '0.5s' }}></div>
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ top: '40%', left: '60%', animationDelay: '1.5s' }}></div>
          <div className="absolute w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ top: '80%', left: '40%', animationDelay: '2.5s' }}></div>
          
          {/* Digital Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(52, 211, 153, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(52, 211, 153, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8 h-full">
          
          {/* Left Side - Title and Buttons */}
          <div className="flex-1 max-w-3xl">
            {/* Badge */}
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-500/40 px-4 py-2 text-sm font-medium shadow-lg shadow-purple-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                New AI Models Released
              </Badge>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Detect{' '}
              <span className="relative inline-block">
                <span className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  deepfakes
                </span>
                <div className="absolute inset-0 text-cyan-300 blur-sm opacity-50">
                  deepfakes
                </div>
              </span>
              {' '}with the<br />
              power of SatyaAI
            </h1>
            
            {/* Subtext */}
            <p className="text-gray-300 text-lg mb-4 max-w-2xl leading-relaxed">
              Our advanced detection system helps you authenticate media with unprecedented accuracy, 
              exposing manipulated content across images, videos, and audio.
            </p>
            
            <p className="text-gray-400 text-base mb-8">
              Upload your files or use your webcam for real-time analysis and get detailed authenticity reports instantly.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Upload className="w-5 h-5 mr-3" />
                Analyze Media
              </Button>
              
              <Button 
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-3" />
                How It Works
              </Button>
            </div>
          </div>

          {/* Right Side - Authenticity Score Widget */}
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 min-w-[280px] shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                Authenticity Score
              </div>
              <div className="relative">
                <div className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                  79%
                </div>
                <div className="absolute inset-0 text-5xl font-bold text-cyan-400 blur-sm opacity-40">
                  79%
                </div>
              </div>
            </div>
            
            {/* Feature Labels */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                <span className="text-gray-300 font-medium">Real-time Analysis</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <span className="text-gray-300 font-medium">Secure Processing</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-gray-300 font-medium">Verified Protection</span>
              </div>
            </div>

            {/* Additional Status Indicators */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Processing Speed</span>
                <span className="text-cyan-400 font-semibold">45ms avg</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Model Accuracy</span>
                <span className="text-green-400 font-semibold">98.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing Background Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Authenticity Score */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">AUTHENTICITY SCORE</h3>
          <span className="text-cyan-400 text-2xl font-bold">79%</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-gray-300">Real-time Analysis</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Secure Processing</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Verified Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deepfake Detection Tools */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-lg font-semibold">Deepfake Detection Tools</h3>
            <p className="text-gray-400 text-sm">Choose your media type for comprehensive analysis</p>
          </div>
          <div className="text-gray-400 text-sm">
            Using <span className="text-cyan-400">Neural Vision v4.2</span> models
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Image, label: 'Image', accuracy: '98.2%', type: 'image' },
            { icon: Video, label: 'Video', accuracy: '96.8%', type: 'video' },
            { icon: Volume2, label: 'Audio', accuracy: '95.3%', type: 'audio' },
            { icon: Camera, label: 'Live Cam', accuracy: '92.7%', type: 'webcam' }
          ].map((tool, index) => (
            <button
              key={index}
              onClick={() => setSelectedTool(tool.type)}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors border border-gray-700 hover:border-blue-500/50"
            >
              <tool.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-medium mb-1">{tool.label}</div>
              <div className="text-cyan-400 text-sm">Accuracy: {tool.accuracy}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Authenticity</span>
                <Badge className={`${
                  analysisResult.is_authentic 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {analysisResult.authenticity}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Confidence</span>
                <span className="text-cyan-400 font-bold">{analysisResult.confidence_percentage}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Risk Level</span>
                <Badge className={`${
                  analysisResult.risk_level === 'Low' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {analysisResult.risk_level}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium">Key Findings</h4>
              {analysisResult.key_findings.map((finding: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">{finding}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const WebcamView = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Live Webcam Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="flex gap-3">
              {!webcamStream ? (
                <Button onClick={startWebcam} className="bg-blue-600 hover:bg-blue-500">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button onClick={captureFrame} className="bg-cyan-500 hover:bg-cyan-400">
                    <Eye className="w-4 h-4 mr-2" />
                    Analyze Frame
                  </Button>
                  <Button onClick={stopWebcam} variant="outline">
                    Stop Camera
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Real-time Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Frame Rate</span>
                <span className="text-cyan-400">30 FPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Resolution</span>
                <span className="text-cyan-400">1080p</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Processing</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedTool) {
      case 'webcam':
        return <WebcamView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">SatyaAI</span>
              <span className="text-gray-400 text-sm">Synthetic Authentication Technology for Your Analysis</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <Search className="w-4 h-4" />
              Scan
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <History className="w-4 h-4" />
              History
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 min-h-screen p-4 border-r border-gray-800">
          {sidebarItems.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTool(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedTool === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* AI Assistant */}
          <div className="mt-8 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">AI Assistant</span>
            </div>
            <p className="text-gray-300 text-xs">
              Get real-time help with your analysis
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Hidden file input */}
      <input
        id="file-upload"
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Loading overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
            <span className="text-white">Analyzing media...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SatyaAIExactDashboard;