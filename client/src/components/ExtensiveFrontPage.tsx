import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Brain, 
  Eye, 
  Zap, 
  Globe, 
  Lock, 
  Activity, 
  Users, 
  ChevronRight,
  Star,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Database,
  Cloud,
  Smartphone,
  Laptop,
  Server,
  Wifi,
  Camera,
  Mic,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Settings,
  Play,
  Pause,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Crosshair,
  Radar,
  Scan,
  Bot,
  Cpu,
  Network,
  HardDrive,
  Monitor,
  KeyRound,
  Fingerprint,
  ScanFace,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Building2,
  Factory,
  Home,
  Car,
  Plane,
  Ship,
  Truck,
  Train,
  Rocket,
  Satellite,
  Radio,
  Signal,
  Bluetooth,
  Usb,
  MemoryStick,
  Disc,
  CircuitBoard,
  Microchip,
  BatteryCharging,
  PowerOff,
  Power,
  Volume2,
  VolumeX,
  Headphones,
  Speaker,
  Gamepad2,
  MousePointer,
  Keyboard,
  Printer,
  Projector,
  Tv,
  Antenna,
  Router,
  Cable,
  Plug,
  Lightbulb,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Gauge,
  Timer,
  AlarmClock,
  Watch,
  Hourglass,
  BookOpen,
  Book,
  Bookmark,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  Archive,
  Package,
  Gift,
  ShoppingCart,
  CreditCard,
  Wallet,
  Coins,
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  Award,
  Medal,
  Trophy,
  Crown,
  Diamond,
  Gem,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Tag,
  Tags,
  Hash,
  AtSign,
  Percent,
  Plus,
  Minus,
  X,
  Divide,
  Equal,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  List,
  Columns,
  Rows,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Sparkles,
  Flame,
  Snowflake,
  Droplet,
  Leaf,
  Trees,
  Flower,
  Sunrise,
  Sunset,
  Mountain,
  Waves,
  Fish,
  Bird,
  Bug,
  Rabbit,
  Turtle,
  Cat,
  Dog,
  Apple,
  Banana,
  Cherry,
  Grape,
  Carrot,
  Egg,
  Sandwich,
  Pizza,
  Salad,
  Coffee
} from 'lucide-react';

export default function ExtensiveFrontPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [threatStats, setThreatStats] = useState({
    detected: 0,
    blocked: 0,
    analyzed: 0
  });

  useEffect(() => {
    // Animate threat statistics
    const interval = setInterval(() => {
      setThreatStats(prev => ({
        detected: Math.min(prev.detected + Math.floor(Math.random() * 3), 99847),
        blocked: Math.min(prev.blocked + Math.floor(Math.random() * 2), 87234),
        analyzed: Math.min(prev.analyzed + Math.floor(Math.random() * 5), 156892)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const heroFeatures = [
    {
      icon: Shield,
      title: "Advanced Threat Detection",
      description: "AI-powered detection of deepfakes, malware, and sophisticated attacks",
      color: "text-blue-400"
    },
    {
      icon: Brain,
      title: "Neural Security Analysis",
      description: "Deep learning models for behavioral pattern recognition",
      color: "text-purple-400"
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "24/7 surveillance with instant threat identification",
      color: "text-cyan-400"
    },
    {
      icon: Zap,
      title: "Lightning Response",
      description: "Automated incident response in milliseconds",
      color: "text-yellow-400"
    }
  ];

  const securityModules = [
    {
      category: "Identity & Authentication",
      modules: [
        { name: "Deepfake Detection", accuracy: 98.7, icon: ScanFace },
        { name: "Voice Cloning Analysis", accuracy: 96.3, icon: Mic },
        { name: "Biometric Verification", accuracy: 99.2, icon: Fingerprint },
        { name: "Behavioral Authentication", accuracy: 94.8, icon: Activity }
      ]
    },
    {
      category: "Network Security",
      modules: [
        { name: "Intrusion Detection", accuracy: 97.4, icon: Network },
        { name: "DDoS Protection", accuracy: 99.1, icon: Shield },
        { name: "Firewall Intelligence", accuracy: 95.6, icon: Lock },
        { name: "Traffic Analysis", accuracy: 92.8, icon: BarChart3 }
      ]
    },
    {
      category: "Data Protection",
      modules: [
        { name: "Encryption Management", accuracy: 99.9, icon: KeyRound },
        { name: "Data Loss Prevention", accuracy: 96.7, icon: Database },
        { name: "Privacy Compliance", accuracy: 98.2, icon: FileText },
        { name: "Backup Security", accuracy: 97.8, icon: HardDrive }
      ]
    },
    {
      category: "Threat Intelligence",
      modules: [
        { name: "Dark Web Monitoring", accuracy: 93.4, icon: Globe },
        { name: "Malware Analysis", accuracy: 98.9, icon: Bug },
        { name: "Vulnerability Assessment", accuracy: 95.2, icon: Search },
        { name: "Risk Prediction", accuracy: 91.7, icon: TrendingUp }
      ]
    }
  ];

  const enterprises = [
    { name: "TechCorp", logo: "🏢", employees: "50K+", industry: "Technology" },
    { name: "FinanceFirst", logo: "🏦", employees: "25K+", industry: "Banking" },
    { name: "HealthSecure", logo: "🏥", employees: "30K+", industry: "Healthcare" },
    { name: "EduProtect", logo: "🎓", employees: "15K+", industry: "Education" },
    { name: "RetailGuard", logo: "🛍️", employees: "40K+", industry: "Retail" },
    { name: "ManufactureSafe", logo: "🏭", employees: "35K+", industry: "Manufacturing" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO, TechCorp Global",
      avatar: "👩‍💼",
      quote: "SatyaAI has revolutionized our security posture. The deepfake detection alone has saved us from multiple social engineering attacks.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Security Director, FinanceFirst",
      avatar: "👨‍💻",
      quote: "The behavioral authentication system is incredible. We've reduced false positives by 87% while maintaining the highest security standards.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "IT Security Lead, HealthSecure",
      avatar: "👩‍⚕️",
      quote: "HIPAA compliance made easy. SatyaAI handles all our privacy requirements while providing enterprise-grade protection.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Startup Shield",
      price: "$99",
      period: "/month",
      description: "Perfect for growing companies",
      features: [
        "Up to 100 employees",
        "Basic threat detection",
        "Email & chat support",
        "Standard compliance reports",
        "Mobile device protection"
      ],
      popular: false
    },
    {
      name: "Enterprise Fortress",
      price: "$499",
      period: "/month",
      description: "Advanced security for enterprises",
      features: [
        "Up to 1,000 employees",
        "Advanced AI detection",
        "24/7 priority support",
        "Custom compliance reports",
        "Advanced behavioral analytics",
        "API integration",
        "Custom training modules"
      ],
      popular: true
    },
    {
      name: "Global Defense",
      price: "Custom",
      period: "pricing",
      description: "Enterprise-scale protection",
      features: [
        "Unlimited employees",
        "Full AI security suite",
        "Dedicated support team",
        "Custom integrations",
        "On-premise deployment",
        "Advanced threat hunting",
        "Executive security briefings",
        "Incident response team"
      ],
      popular: false
    }
  ];

  const newsUpdates = [
    {
      title: "SatyaAI Detects New Deepfake Campaign",
      summary: "Our AI systems identified and blocked a sophisticated deepfake campaign targeting financial institutions.",
      time: "2 hours ago",
      category: "Threat Alert",
      severity: "high"
    },
    {
      title: "Neural Network Model Update",
      summary: "Version 4.2 of our detection models now includes enhanced voice cloning detection capabilities.",
      time: "6 hours ago",
      category: "Product Update",
      severity: "medium"
    },
    {
      title: "Partnership with Global Banks",
      summary: "Major international banks adopt SatyaAI for comprehensive fraud prevention and security analysis.",
      time: "1 day ago",
      category: "Partnership",
      severity: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Announcement Banner */}
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-500/40 px-6 py-3 text-lg font-medium shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 mr-2" />
              Introducing SatyaAI 5.0 - Next-Gen Cyber Intelligence
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
            The Future of
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                Cyber Security
              </span>
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 blur-sm opacity-50">
                Cyber Security
              </div>
            </span>
          </h1>

          <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Powered by advanced AI and machine learning, SatyaAI provides comprehensive protection against deepfakes, 
            sophisticated attacks, and emerging cyber threats. Protect your organization with intelligence that never sleeps.
          </p>

          {/* Live Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-red-400 mb-2">{threatStats.detected.toLocaleString()}</div>
              <div className="text-gray-300">Threats Detected Today</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">{threatStats.blocked.toLocaleString()}</div>
              <div className="text-gray-300">Attacks Blocked</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{threatStats.analyzed.toLocaleString()}</div>
              <div className="text-gray-300">Files Analyzed</div>
            </div>
          </div>

          {/* Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {heroFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'border-cyan-500/50 bg-cyan-500/10' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4 mx-auto`} />
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
              <Play className="w-6 h-6 mr-3" />
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-300">
              <Video className="w-6 h-6 mr-3" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Security Modules Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Comprehensive Security <span className="text-cyan-400">Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered security modules work together to provide 360-degree protection for your organization
            </p>
          </div>

          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-700/50 p-2 rounded-2xl mb-12">
              {securityModules.map((category, index) => (
                <TabsTrigger 
                  key={index}
                  value={index.toString()}
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 text-lg py-4 rounded-xl"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {securityModules.map((category, categoryIndex) => (
              <TabsContent key={categoryIndex} value={categoryIndex.toString()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.modules.map((module, moduleIndex) => (
                    <Card key={moduleIndex} className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl">
                              <module.icon className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-xl">{module.name}</CardTitle>
                              <CardDescription className="text-cyan-400 font-semibold">
                                {module.accuracy}% Accuracy
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={module.accuracy} className="h-3" />
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Performance</span>
                            <span className="text-green-400 font-semibold">Excellent</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Enterprise Customers Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Trusted by <span className="text-purple-400">Global Enterprises</span>
            </h2>
            <p className="text-xl text-gray-300">
              Leading organizations worldwide rely on SatyaAI for their cybersecurity needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {enterprises.map((enterprise, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700/50 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{enterprise.logo}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{enterprise.name}</h3>
                  <p className="text-purple-400 font-semibold mb-2">{enterprise.employees} employees</p>
                  <p className="text-gray-400">{enterprise.industry}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700/50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-24 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Advanced <span className="text-blue-400">AI Capabilities</span>
            </h2>
            <p className="text-xl text-gray-300">
              Cutting-edge artificial intelligence powers every aspect of our security platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h3 className="text-4xl font-bold mb-6 text-blue-400">Deepfake Detection Engine</h3>
              <p className="text-xl text-gray-300 mb-8">
                Our proprietary neural networks can detect even the most sophisticated deepfakes with 98.7% accuracy, 
                protecting your organization from advanced social engineering attacks.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Real-time video analysis in under 200ms</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Advanced facial landmark detection</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Multi-modal verification (audio + video)</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Continuous model updates against new threats</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <ScanFace className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-white">Detection Accuracy</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Face Swap Detection</span>
                    <span className="text-blue-400 font-semibold">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Voice Cloning Detection</span>
                    <span className="text-blue-400 font-semibold">96.3%</span>
                  </div>
                  <Progress value={96.3} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Lip Sync Analysis</span>
                    <span className="text-blue-400 font-semibold">94.8%</span>
                  </div>
                  <Progress value={94.8} className="h-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 order-2 lg:order-1">
              <div className="text-center mb-6">
                <Brain className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-white">Behavioral Analytics</h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Behavioral Metrics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.2%</div>
                  <div className="text-gray-300 text-sm">User Verification</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">145ms</div>
                  <div className="text-gray-300 text-sm">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">0.01%</div>
                  <div className="text-gray-300 text-sm">False Positive Rate</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-4xl font-bold mb-6 text-purple-400">Behavioral Authentication</h3>
              <p className="text-xl text-gray-300 mb-8">
                Our machine learning algorithms analyze over 50 behavioral patterns to create unique user profiles, 
                providing seamless authentication without compromising security.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Continuous user authentication</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Keystroke dynamics analysis</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Mouse movement patterns</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Adaptive risk scoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Simple, <span className="text-green-400">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-300">
              Choose the perfect plan for your organization's security needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`bg-gray-900/50 border-gray-700/50 relative ${
                plan.popular ? 'border-green-500/50 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-6 py-2 text-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-white mb-4">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-green-400">{plan.price}</span>
                    <span className="text-gray-400 text-xl">{plan.period}</span>
                  </div>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-3 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600'
                  }`}>
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Latest <span className="text-orange-400">Security Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300">
              Stay informed about the latest threats, updates, and security insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newsUpdates.map((news, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700/50 hover:border-orange-500/30 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${
                      news.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      news.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {news.category}
                    </Badge>
                    <span className="text-gray-400 text-sm">{news.time}</span>
                  </div>
                  <CardTitle className="text-white text-xl mb-3">{news.title}</CardTitle>
                  <CardDescription className="text-gray-300">{news.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/20">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & API Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Seamless <span className="text-indigo-400">Integration</span>
            </h2>
            <p className="text-xl text-gray-300">
              Connect SatyaAI with your existing security infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 text-indigo-400">Enterprise APIs</h3>
              <p className="text-xl text-gray-300 mb-8">
                Our comprehensive API suite allows seamless integration with your existing security tools, 
                SIEM systems, and business applications.
              </p>
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Popular Integrations</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-gray-300">Splunk SIEM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Cloud className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">AWS Security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-gray-300">Microsoft Sentinel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-gray-300">ServiceNow</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">API Response Time</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Threat Detection API</span>
                    <span className="text-indigo-400 font-semibold">45ms</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">User Authentication API</span>
                    <span className="text-indigo-400 font-semibold">12ms</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Risk Assessment API</span>
                    <span className="text-indigo-400 font-semibold">78ms</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="text-center pt-4">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
                  <div className="text-gray-300">API Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section className="py-24 bg-gradient-to-b from-gray-800/50 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Secure Your <span className="text-cyan-400">Future?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of organizations protecting their digital assets with SatyaAI
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-4 rounded-xl font-semibold text-xl">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 px-12 py-4 rounded-xl font-semibold text-xl">
                Schedule Demo
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-300">security@satyaai.com</p>
              <p className="text-gray-400 text-sm">24/7 Enterprise Support</p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-gray-300">+1 (555) 123-CYBER</p>
              <p className="text-gray-400 text-sm">Emergency Hotline Available</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Presence</h3>
              <p className="text-gray-300">50+ Countries</p>
              <p className="text-gray-400 text-sm">Local Support Worldwide</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-2xl mb-4">
                  <Zap className="w-8 h-8" />
                  <span>SatyaAI</span>
                </div>
                <p className="text-gray-400">
                  The future of cybersecurity, powered by artificial intelligence and machine learning.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Threat Detection</li>
                  <li>Behavioral Analytics</li>
                  <li>Identity Verification</li>
                  <li>Risk Assessment</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Documentation</li>
                  <li>API Reference</li>
                  <li>Security Blog</li>
                  <li>Best Practices</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SatyaAI. All rights reserved. Protecting the digital world with advanced AI security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}