import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Eye,
  Brain,
  Zap,
  Globe,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Monitor,
  Database,
  Network,
  Cpu,
  HardDrive,
  Lock,
  Unlock,
  Bell,
  User,
  Crown,
  Plus,
  Info,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Volume2,
  Video,
  FileImage,
  Webcam,
  Camera,
  Waves,
  Scale,
  MessageSquare,
  Ghost,
  QrCode,
  ShieldAlert,
  AlertOctagon,
  Layers,
  Radar,
  Search,
  Download,
  Upload,
  Play,
  Pause,
  Settings,
  Terminal,
  Code,
  Boxes,
  Sparkles,
  Stars,
  Rocket,
  Fingerprint,
  ScanLine,
  Orbit,
  Hexagon,
  Triangle,
  Circle
} from 'lucide-react';

const CyberTech3DLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [transformerResults, setTransformerResults] = useState<any>(null);
  const [pipelineStatus, setPipelineStatus] = useState<string>('initializing');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsLoaded(true);
    initializeTransformers();
    startCanvas3D();
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initializeTransformers = async () => {
    setPipelineStatus('loading');
    try {
      const response = await fetch('/api/transformers/status');
      if (!response.ok) {
        throw new Error('Failed to fetch transformer status');
      }
      
      const data = await response.json();
      setTransformerResults(data.models);
      setPipelineStatus(data.status);
    } catch (error) {
      console.error('Transformer initialization failed:', error);
      setPipelineStatus('error');
    }
  };

  const startCanvas3D = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 150;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        color: `hsl(${45 + Math.random() * 15}, 45%, ${65 + Math.random() * 20}%)`,
        connections: []
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Reset particle if it goes too far
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate 3D projection
        const scale = 200 / particle.z;
        const x2d = particle.x + (particle.x - canvas.width / 2) * scale;
        const y2d = particle.y + (particle.y - canvas.height / 2) * scale;
        const size = particle.size * scale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const otherScale = 200 / otherParticle.z;
              const otherX2d = otherParticle.x + (otherParticle.x - canvas.width / 2) * otherScale;
              const otherY2d = otherParticle.y + (otherParticle.y - canvas.height / 2) * otherScale;

              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
              ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - distance / 500})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const FloatingElement = ({ children, delay = 0, duration = 3 }: any) => (
    <div 
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
      }}
    >
      {children}
    </div>
  );

  const CyberGrid = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) perspective(1000px) rotateX(60deg)`
        }}
      />
    </div>
  );

  const HolographicCard = ({ children, className = "", delay = 0 }: any) => (
    <div 
      className={`
        relative bg-gradient-to-br from-gray-900/90 to-gray-800/60 
        backdrop-blur-xl border border-amber-600/40 rounded-2xl 
        hover:border-amber-500/60 transition-all duration-700
        hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
        transform hover:scale-105 hover:-translate-y-2
        ${className}
      `}
      style={{
        animationDelay: `${delay}s`,
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02 - 1}deg) rotateX(${mousePosition.y * 0.01 - 0.5}deg)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/15 to-orange-600/10 rounded-2xl blur-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  const NeonText = ({ children, className = "" }: any) => (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 text-amber-500 blur-sm opacity-60">
        {children}
      </div>
      <div className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
        {children}
      </div>
    </div>
  );

  const HeroSection = () => (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(3, 7, 18, 0.8) 0%, rgba(3, 7, 18, 1) 100%)' }}
      />
      
      <CyberGrid />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <FloatingElement delay={0}>
          <div className="mb-8">
            <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 px-6 py-2 text-sm font-medium">
              NEXT-GEN CYBER INTELLIGENCE
            </Badge>
          </div>
        </FloatingElement>

        <FloatingElement delay={0.2}>
          <NeonText className="text-6xl md:text-8xl font-bold mb-6">
            <span className="block">CYBERTECH</span>
            <span className="block text-4xl md:text-6xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              NEURAL FORTRESS
            </span>
          </NeonText>
        </FloatingElement>

        <FloatingElement delay={0.4}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Advanced AI-powered cybersecurity platform with <span className="text-amber-400">Transformers</span>, 
            real-time <span className="text-orange-400">threat detection</span>, and immersive 
            <span className="text-yellow-400"> 3D visualization</span> technology
          </p>
        </FloatingElement>

        <FloatingElement delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => window.location.href = '/unified'}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6" />
                Launch Platform
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-800 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </button>
            
            <button 
              onClick={() => document.getElementById('transformers-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 border-2 border-amber-600/50 rounded-xl font-bold text-lg text-amber-400 hover:bg-amber-600/10 hover:border-amber-500 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <Brain className="w-6 h-6" />
                Test AI Models
              </span>
            </button>
          </div>
        </FloatingElement>

        {/* Real-time Stats */}
        <FloatingElement delay={0.8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Threats Blocked', value: '1.2M+', icon: Shield },
              { label: 'AI Models Active', value: '50+', icon: Brain },
              { label: 'Real-time Analysis', value: '24/7', icon: Activity },
              { label: 'Global Coverage', value: '45+', icon: Globe }
            ].map((stat, index) => (
              <HolographicCard key={index} delay={0.2 * index} className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </HolographicCard>
            ))}
          </div>
        </FloatingElement>
      </div>
    </section>
  );

  const TransformersSection = () => (
    <section id="transformers-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FloatingElement>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-6 py-2 mb-6">
              HUGGING FACE TRANSFORMERS
            </Badge>
            <NeonText className="text-4xl md:text-6xl font-bold mb-6">
              AI PIPELINE INTEGRATION
            </NeonText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge transformer models for advanced threat analysis and natural language processing
            </p>
          </FloatingElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <HolographicCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Pipeline Status</h3>
                <p className="text-gray-400">Real-time transformer monitoring</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Pipeline Status</span>
                <Badge className={`${
                  pipelineStatus === 'ready' ? 'bg-green-500/20 text-green-400' :
                  pipelineStatus === 'loading' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {pipelineStatus}
                </Badge>
              </div>
              
              {transformerResults && (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Active Models</span>
                    <span className="text-cyan-400 font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Avg Processing Time</span>
                    <span className="text-emerald-400 font-bold">91ms</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Model Accuracy</span>
                    <span className="text-purple-400 font-bold">95.4%</span>
                  </div>
                </>
              )}
            </div>
          </HolographicCard>

          <HolographicCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Active Models</h3>
                <p className="text-gray-400">Transformer model performance</p>
              </div>
            </div>

            {transformerResults && (
              <div className="space-y-4">
                {Object.entries(transformerResults).map(([key, model]: [string, any]) => (
                  <div key={key} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        {model.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">{model.model}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Accuracy: </span>
                        <span className="text-cyan-400">{model.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time: </span>
                        <span className="text-emerald-400">{model.processingTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </HolographicCard>
        </div>

        {/* Transformer Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Sentiment Analysis',
              description: 'Real-time emotion and sentiment detection from text inputs',
              icon: MessageSquare,
              color: 'blue',
              features: ['Multi-language support', 'Real-time processing', 'Confidence scoring']
            },
            {
              title: 'Text Generation',
              description: 'Advanced natural language generation for threat reports',
              icon: Code,
              color: 'green',
              features: ['Contextual generation', 'Technical documentation', 'Report automation']
            },
            {
              title: 'Image Classification',
              description: 'Deep learning image analysis for visual threat detection',
              icon: Eye,
              color: 'purple',
              features: ['Object detection', 'Scene analysis', 'Anomaly detection']
            },
            {
              title: 'Speech Recognition',
              description: 'Voice-to-text conversion with threat keyword detection',
              icon: Volume2,
              color: 'orange',
              features: ['Real-time transcription', 'Speaker identification', 'Audio analysis']
            },
            {
              title: 'Named Entity Recognition',
              description: 'Extract entities and relationships from security documents',
              icon: Target,
              color: 'pink',
              features: ['Entity extraction', 'Relationship mapping', 'Context analysis']
            },
            {
              title: 'Question Answering',
              description: 'Intelligent Q&A system for cybersecurity knowledge',
              icon: Search,
              color: 'cyan',
              features: ['Knowledge retrieval', 'Context understanding', 'Expert responses']
            }
          ].map((capability, index) => (
            <HolographicCard key={index} delay={0.1 * index} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-${capability.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <capability.icon className={`w-6 h-6 text-${capability.color}-400`} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{capability.description}</p>
              
              <div className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );

  const CyberSecurityFeatures = () => (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FloatingElement>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-6 py-2 mb-6">
              ADVANCED THREAT DETECTION
            </Badge>
            <NeonText className="text-4xl md:text-6xl font-bold mb-6">
              CYBER DEFENSE MATRIX
            </NeonText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multi-layered security architecture with AI-powered threat detection and real-time response
            </p>
          </FloatingElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {[
            {
              title: 'Deepfake Detection',
              description: 'Advanced neural networks for detecting manipulated media content',
              icon: Eye,
              color: 'red',
              metrics: { accuracy: '98.2%', speed: '45ms', threats: '247' },
              features: ['Real-time analysis', 'Multi-format support', 'Confidence scoring']
            },
            {
              title: 'Behavioral Analytics',
              description: 'Machine learning-based user behavior analysis and anomaly detection',
              icon: Brain,
              color: 'blue',
              metrics: { accuracy: '96.8%', speed: '67ms', threats: '89' },
              features: ['Pattern recognition', 'Risk scoring', 'Continuous monitoring']
            },
            {
              title: 'Threat Intelligence',
              description: 'Real-time global threat data aggregation and analysis',
              icon: Target,
              color: 'orange',
              metrics: { accuracy: '94.7%', speed: '123ms', threats: '1,247' },
              features: ['Global feeds', 'Predictive analysis', 'Auto-correlation']
            },
            {
              title: 'Network Security',
              description: 'Advanced network traffic analysis and intrusion detection',
              icon: Network,
              color: 'green',
              metrics: { accuracy: '97.1%', speed: '34ms', threats: '567' },
              features: ['Traffic analysis', 'DPI inspection', 'Zero-day detection']
            },
            {
              title: 'Identity Forensics',
              description: 'Digital identity verification and forensic investigation tools',
              icon: Fingerprint,
              color: 'purple',
              metrics: { accuracy: '95.4%', speed: '89ms', threats: '156' },
              features: ['Identity verification', 'Digital forensics', 'Evidence collection']
            },
            {
              title: 'Compliance Engine',
              description: 'Automated compliance monitoring and regulatory adherence',
              icon: Shield,
              color: 'cyan',
              metrics: { accuracy: '99.1%', speed: '56ms', threats: '23' },
              features: ['GDPR compliance', 'SOC 2 monitoring', 'Audit trails']
            }
          ].map((feature, index) => (
            <HolographicCard key={index} delay={0.15 * index} className="p-6 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                </div>
              </div>

              <p className="text-gray-400 mb-6">{feature.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className={`text-${feature.color}-400 font-bold text-lg`}>{feature.metrics.accuracy}</div>
                  <div className="text-gray-500 text-xs">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-emerald-400 font-bold text-lg">{feature.metrics.speed}</div>
                  <div className="text-gray-500 text-xs">Response</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-orange-400 font-bold text-lg">{feature.metrics.threats}</div>
                  <div className="text-gray-500 text-xs">Blocked</div>
                </div>
              </div>

              <div className="space-y-2">
                {feature.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full mt-6 py-3 bg-${feature.color}-500/20 text-${feature.color}-400 rounded-lg hover:bg-${feature.color}-500/30 transition-all duration-300 flex items-center justify-center gap-2`}>
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );

  const TechnicalSpecs = () => (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-emerald-950/20 to-gray-950"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FloatingElement>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-6 py-2 mb-6">
              TECHNICAL SPECIFICATIONS
            </Badge>
            <NeonText className="text-4xl md:text-6xl font-bold mb-6">
              INFRASTRUCTURE POWER
            </NeonText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade infrastructure with quantum-ready security and distributed processing
            </p>
          </FloatingElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <HolographicCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Processing Power</h3>
                <p className="text-gray-400">High-performance computing cluster</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'GPU Clusters', value: '256 Tesla V100s', icon: Zap },
                { label: 'CPU Cores', value: '2,048 Cores', icon: Cpu },
                { label: 'Memory', value: '512TB RAM', icon: Database },
                { label: 'Storage', value: '10PB NVMe', icon: HardDrive },
                { label: 'Network', value: '400Gbps', icon: Network },
                { label: 'Uptime', value: '99.99%', icon: Activity }
              ].map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <spec.icon className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300">{spec.label}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </HolographicCard>

          <HolographicCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Security Standards</h3>
                <p className="text-gray-400">Military-grade protection protocols</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Encryption', value: 'AES-256 + Quantum', icon: Lock },
                { label: 'Zero Trust', value: 'Full Implementation', icon: Shield },
                { label: 'Multi-Factor', value: '5-Layer Auth', icon: Fingerprint },
                { label: 'Compliance', value: 'SOC 2 Type II', icon: CheckCircle },
                { label: 'Penetration Testing', value: 'Continuous', icon: Target },
                { label: 'Threat Detection', value: 'Real-time', icon: AlertTriangle }
              ].map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <spec.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{spec.label}</span>
                  </div>
                  <span className="text-blue-400 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </HolographicCard>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Requests/Second', value: '1M+', icon: Zap, color: 'yellow' },
            { label: 'Latency', value: '<1ms', icon: Activity, color: 'green' },
            { label: 'Availability', value: '99.99%', icon: CheckCircle, color: 'blue' },
            { label: 'Scalability', value: 'Infinite', icon: TrendingUp, color: 'purple' }
          ].map((metric, index) => (
            <HolographicCard key={index} delay={0.1 * index} className="p-6 text-center">
              <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen bg-gray-950 text-white overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(52, 211, 153, 0.3); }
          50% { box-shadow: 0 0 40px rgba(52, 211, 153, 0.6); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      <HeroSection />
      <TransformersSection />
      <CyberSecurityFeatures />
      <TechnicalSpecs />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {[0, 1, 2, 3].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-cyan-400 scale-125 shadow-[0_0_15px_rgba(52,211,153,0.8)]' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center text-cyan-400 animate-bounce">
          <div className="text-sm mb-2">Scroll to explore</div>
          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CyberTech3DLanding;