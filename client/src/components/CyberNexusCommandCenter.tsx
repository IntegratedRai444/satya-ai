import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Router,
  Fingerprint,
  KeyRound,
  UserCheck,
  Bug,
  Webhook,
  Terminal,
  Monitor,
  Layers,
  GitBranch,
  Microscope,
  Atom,
  CircuitBoard,
  Binary,
  Gauge,
  Flame,
  Snowflake,
  Telescope,
  Beaker,
  Dna,
  Orbit,
  Radio,
  Satellite,
  Waves,
  Cog,
  Wrench,
  Hash,
  Key,
  Skull
} from 'lucide-react';

interface SecurityNode {
  id: string;
  name: string;
  category: 'core' | 'ai' | 'quantum' | 'blockchain' | 'forensics' | 'monitoring' | 'analysis' | 'defense';
  status: 'active' | 'inactive' | 'warning' | 'critical';
  icon: any;
  description: string;
  metrics: {
    performance: number;
    accuracy: number;
    threats_detected: number;
    uptime: number;
  };
  connections: string[];
  position: { x: number; y: number; z: number };
  color: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function CyberNexusCommandCenter() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const [threatLevel, setThreatLevel] = useState('medium');
  const [viewMode, setViewMode] = useState('3d');
  const [stats, setStats] = useState({
    threatsBlocked: 1247,
    systemsMonitored: 156,
    activeScans: 23,
    securityScore: 94,
    aiAgents: 45,
    quantumProcessors: 8,
    neuralNetworks: 12,
    blockchainValidators: 6,
    forensicsModules: 15,
    monitoringSensors: 89,
    defenseShields: 34
  });

  const securityNodes: SecurityNode[] = [
    // Core Security Nodes
    {
      id: 'central-ai',
      name: 'Central AI Command',
      category: 'core',
      status: 'active',
      icon: Brain,
      description: 'Primary AI orchestration system for all security operations',
      metrics: { performance: 98, accuracy: 96, threats_detected: 1247, uptime: 99.9 },
      connections: ['threat-intel', 'behavioral-ai', 'quantum-core', 'neural-defense'],
      position: { x: 0, y: 0, z: 0 },
      color: 'blue',
      priority: 'critical'
    },
    {
      id: 'shield-core',
      name: 'Defense Shield Matrix',
      category: 'core',
      status: 'active',
      icon: Shield,
      description: 'Multi-layered defense coordination system',
      metrics: { performance: 95, accuracy: 98, threats_detected: 892, uptime: 99.8 },
      connections: ['firewall-ai', 'intrusion-detect', 'endpoint-guard'],
      position: { x: -2, y: 1, z: 0 },
      color: 'green',
      priority: 'critical'
    },
    {
      id: 'quantum-core',
      name: 'Quantum Processing Hub',
      category: 'quantum',
      status: 'active',
      icon: Atom,
      description: 'Quantum computing for advanced cryptographic analysis',
      metrics: { performance: 99, accuracy: 99, threats_detected: 456, uptime: 98.5 },
      connections: ['crypto-analyzer', 'quantum-encrypt', 'entanglement-net'],
      position: { x: 2, y: -1, z: 1 },
      color: 'purple',
      priority: 'high'
    },

    // AI Security Nodes
    {
      id: 'threat-intel',
      name: 'Threat Intelligence AI',
      category: 'ai',
      status: 'active',
      icon: Eye,
      description: 'Advanced threat detection and analysis using machine learning',
      metrics: { performance: 94, accuracy: 97, threats_detected: 2341, uptime: 99.7 },
      connections: ['behavioral-ai', 'pattern-recog', 'threat-predict'],
      position: { x: -1, y: 2, z: 0 },
      color: 'red',
      priority: 'high'
    },
    {
      id: 'behavioral-ai',
      name: 'Behavioral Analysis Engine',
      category: 'ai',
      status: 'active',
      icon: Users,
      description: 'User behavior analysis for anomaly detection',
      metrics: { performance: 92, accuracy: 94, threats_detected: 178, uptime: 99.3 },
      connections: ['user-profiler', 'anomaly-detect', 'risk-scorer'],
      position: { x: 1, y: 2, z: -1 },
      color: 'yellow',
      priority: 'medium'
    },
    {
      id: 'neural-defense',
      name: 'Neural Network Defense',
      category: 'ai',
      status: 'active',
      icon: Network,
      description: 'Deep learning-based attack prevention and response',
      metrics: { performance: 96, accuracy: 95, threats_detected: 567, uptime: 99.1 },
      connections: ['deep-learner', 'response-ai', 'auto-mitigate'],
      position: { x: 0, y: -2, z: 1 },
      color: 'cyan',
      priority: 'high'
    },
    {
      id: 'pattern-recog',
      name: 'Pattern Recognition AI',
      category: 'ai',
      status: 'active',
      icon: Target,
      description: 'Advanced pattern matching for threat identification',
      metrics: { performance: 93, accuracy: 96, threats_detected: 834, uptime: 98.9 },
      connections: ['signature-match', 'behavior-pattern', 'trend-analyzer'],
      position: { x: -2, y: 0, z: 2 },
      color: 'orange',
      priority: 'medium'
    },

    // Quantum Security Nodes
    {
      id: 'quantum-encrypt',
      name: 'Quantum Encryption Engine',
      category: 'quantum',
      status: 'active',
      icon: Lock,
      description: 'Quantum-resistant encryption and key management',
      metrics: { performance: 98, accuracy: 99, threats_detected: 23, uptime: 99.9 },
      connections: ['key-quantum', 'encrypt-vault', 'quantum-channel'],
      position: { x: 3, y: 0, z: 0 },
      color: 'purple',
      priority: 'critical'
    },
    {
      id: 'entanglement-net',
      name: 'Quantum Entanglement Network',
      category: 'quantum',
      status: 'active',
      icon: Orbit,
      description: 'Secure quantum communication channels',
      metrics: { performance: 97, accuracy: 98, threats_detected: 12, uptime: 99.5 },
      connections: ['quantum-relay', 'secure-tunnel', 'entangle-auth'],
      position: { x: 2, y: 1, z: 2 },
      color: 'indigo',
      priority: 'high'
    },
    {
      id: 'crypto-analyzer',
      name: 'Cryptographic Analysis Unit',
      category: 'quantum',
      status: 'active',
      icon: Key,
      description: 'Advanced cryptographic attack detection and analysis',
      metrics: { performance: 95, accuracy: 97, threats_detected: 89, uptime: 98.7 },
      connections: ['cipher-break', 'hash-verify', 'crypto-audit'],
      position: { x: 1, y: -1, z: 2 },
      color: 'violet',
      priority: 'medium'
    },

    // Blockchain Security Nodes
    {
      id: 'blockchain-guard',
      name: 'Blockchain Security Monitor',
      category: 'blockchain',
      status: 'active',
      icon: Layers,
      description: 'Blockchain integrity and smart contract security',
      metrics: { performance: 94, accuracy: 96, threats_detected: 67, uptime: 99.2 },
      connections: ['smart-audit', 'chain-verify', 'consensus-watch'],
      position: { x: -1, y: -2, z: 0 },
      color: 'emerald',
      priority: 'medium'
    },
    {
      id: 'smart-audit',
      name: 'Smart Contract Auditor',
      category: 'blockchain',
      status: 'active',
      icon: Code,
      description: 'Automated smart contract vulnerability detection',
      metrics: { performance: 91, accuracy: 94, threats_detected: 45, uptime: 98.8 },
      connections: ['code-analyzer', 'vuln-scanner', 'contract-verifier'],
      position: { x: -2, y: -1, z: 1 },
      color: 'teal',
      priority: 'medium'
    },

    // Forensics Nodes
    {
      id: 'digital-forensics',
      name: 'Digital Forensics Lab',
      category: 'forensics',
      status: 'active',
      icon: Microscope,
      description: 'Advanced digital evidence collection and analysis',
      metrics: { performance: 93, accuracy: 98, threats_detected: 156, uptime: 99.1 },
      connections: ['evidence-vault', 'trace-analyzer', 'timeline-builder'],
      position: { x: 0, y: 2, z: 2 },
      color: 'amber',
      priority: 'high'
    },
    {
      id: 'deepfake-detect',
      name: 'Deepfake Detection Engine',
      category: 'forensics',
      status: 'active',
      icon: Camera,
      description: 'AI-powered deepfake and synthetic media detection',
      metrics: { performance: 96, accuracy: 97, threats_detected: 234, uptime: 99.4 },
      connections: ['media-analyzer', 'face-verify', 'voice-auth'],
      position: { x: 1, y: 3, z: 1 },
      color: 'pink',
      priority: 'high'
    },
    {
      id: 'identity-forensics',
      name: 'Identity Forensics Unit',
      category: 'forensics',
      status: 'active',
      icon: Fingerprint,
      description: 'Biometric analysis and identity verification',
      metrics: { performance: 95, accuracy: 99, threats_detected: 89, uptime: 99.6 },
      connections: ['bio-scanner', 'identity-verifier', 'fraud-detector'],
      position: { x: -1, y: 3, z: 0 },
      color: 'rose',
      priority: 'medium'
    },

    // Monitoring Nodes
    {
      id: 'network-monitor',
      name: 'Network Traffic Monitor',
      category: 'monitoring',
      status: 'active',
      icon: Activity,
      description: 'Real-time network traffic analysis and monitoring',
      metrics: { performance: 97, accuracy: 95, threats_detected: 1456, uptime: 99.8 },
      connections: ['packet-analyzer', 'flow-monitor', 'bandwidth-watch'],
      position: { x: 3, y: 1, z: -1 },
      color: 'blue',
      priority: 'high'
    },
    {
      id: 'endpoint-guard',
      name: 'Endpoint Security Monitor',
      category: 'monitoring',
      status: 'active',
      icon: Laptop,
      description: 'Comprehensive endpoint protection and monitoring',
      metrics: { performance: 94, accuracy: 96, threats_detected: 678, uptime: 99.3 },
      connections: ['device-scanner', 'malware-detect', 'behavior-watch'],
      position: { x: -3, y: 0, z: 0 },
      color: 'green',
      priority: 'high'
    },
    {
      id: 'cloud-sentinel',
      name: 'Cloud Security Sentinel',
      category: 'monitoring',
      status: 'active',
      icon: Cloud,
      description: 'Multi-cloud security monitoring and compliance',
      metrics: { performance: 92, accuracy: 94, threats_detected: 345, uptime: 98.9 },
      connections: ['cloud-scanner', 'config-audit', 'access-monitor'],
      position: { x: 0, y: -3, z: 0 },
      color: 'sky',
      priority: 'medium'
    },

    // Analysis Nodes
    {
      id: 'malware-lab',
      name: 'Malware Analysis Lab',
      category: 'analysis',
      status: 'active',
      icon: Bug,
      description: 'Advanced malware reverse engineering and analysis',
      metrics: { performance: 96, accuracy: 98, threats_detected: 567, uptime: 99.2 },
      connections: ['sandbox-env', 'reverse-eng', 'signature-gen'],
      position: { x: 2, y: 2, z: 0 },
      color: 'red',
      priority: 'high'
    },
    {
      id: 'vulnerability-scanner',
      name: 'Vulnerability Assessment Engine',
      category: 'analysis',
      status: 'active',
      icon: Search,
      description: 'Comprehensive vulnerability scanning and assessment',
      metrics: { performance: 93, accuracy: 95, threats_detected: 789, uptime: 99.0 },
      connections: ['vuln-database', 'exploit-detect', 'patch-recommend'],
      position: { x: -2, y: 2, z: 1 },
      color: 'orange',
      priority: 'medium'
    },
    {
      id: 'threat-hunter',
      name: 'Advanced Threat Hunter',
      category: 'analysis',
      status: 'active',
      icon: Crosshair,
      description: 'Proactive threat hunting and investigation platform',
      metrics: { performance: 95, accuracy: 97, threats_detected: 234, uptime: 99.5 },
      connections: ['hunt-engine', 'ioc-tracker', 'campaign-analyzer'],
      position: { x: 2, y: -2, z: -1 },
      color: 'purple',
      priority: 'high'
    },

    // Defense Nodes
    {
      id: 'firewall-ai',
      name: 'AI-Powered Firewall',
      category: 'defense',
      status: 'active',
      icon: Shield,
      description: 'Intelligent firewall with machine learning capabilities',
      metrics: { performance: 97, accuracy: 96, threats_detected: 2156, uptime: 99.9 },
      connections: ['rule-engine', 'traffic-filter', 'geo-blocker'],
      position: { x: -1, y: 1, z: -2 },
      color: 'green',
      priority: 'critical'
    },
    {
      id: 'intrusion-detect',
      name: 'Intrusion Detection System',
      category: 'defense',
      status: 'active',
      icon: Radar,
      description: 'Advanced intrusion detection and prevention',
      metrics: { performance: 94, accuracy: 95, threats_detected: 1234, uptime: 99.4 },
      connections: ['anomaly-engine', 'signature-match', 'behavioral-detect'],
      position: { x: 1, y: 1, z: -2 },
      color: 'yellow',
      priority: 'high'
    },
    {
      id: 'incident-response',
      name: 'Automated Incident Response',
      category: 'defense',
      status: 'active',
      icon: Zap,
      description: 'Rapid automated incident response and containment',
      metrics: { performance: 96, accuracy: 94, threats_detected: 456, uptime: 99.1 },
      connections: ['response-engine', 'containment-sys', 'recovery-auto'],
      position: { x: 0, y: 1, z: -3 },
      color: 'red',
      priority: 'critical'
    }
  ];

  const filteredNodes = selectedCategory === 'all' 
    ? securityNodes 
    : securityNodes.filter(node => node.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20';
      case 'critical': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        activeScans: Math.floor(Math.random() * 30) + 15
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CyberNexus Command Center
          </h1>
          <p className="text-blue-200 text-lg">
            Advanced 3D Security Operations Center with AI-Powered Threat Intelligence
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Threats Blocked</p>
                  <p className="text-2xl font-bold text-white">{stats.threatsBlocked.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">AI Agents Active</p>
                  <p className="text-2xl font-bold text-white">{stats.aiAgents}</p>
                </div>
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Quantum Cores</p>
                  <p className="text-2xl font-bold text-white">{stats.quantumProcessors}</p>
                </div>
                <Atom className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Security Score</p>
                  <p className="text-2xl font-bold text-white">{stats.securityScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs defaultValue="nodes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="nodes" className="data-[state=active]:bg-blue-600">
              <Network className="h-4 w-4 mr-2" />
              Security Nodes
            </TabsTrigger>
            <TabsTrigger value="3d-view" className="data-[state=active]:bg-blue-600">
              <Layers className="h-4 w-4 mr-2" />
              3D Network View
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Operations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nodes" className="space-y-6">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-slate-800 border-slate-600">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="core">Core Systems</SelectItem>
                  <SelectItem value="ai">AI Security</SelectItem>
                  <SelectItem value="quantum">Quantum Security</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="forensics">Digital Forensics</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="defense">Defense</SelectItem>
                </SelectContent>
              </Select>
              
              <Badge className="bg-blue-600">
                {filteredNodes.length} Active Nodes
              </Badge>
            </div>

            {/* Security Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNodes.map((node) => {
                const IconComponent = node.icon;
                return (
                  <Card 
                    key={node.id} 
                    className={`bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer ${
                      activeNode === node.id ? 'ring-2 ring-blue-500' : ''
                    } ${getPriorityColor(node.priority)}`}
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <IconComponent className={`h-8 w-8 text-${node.color}-400`} />
                        <Badge className={getStatusColor(node.status)}>
                          {node.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-sm font-medium">
                        {node.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs">
                        {node.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Performance</span>
                          <span className="text-white">{node.metrics.performance}%</span>
                        </div>
                        <Progress value={node.metrics.performance} className="h-1" />
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Accuracy</span>
                          <span className="text-white">{node.metrics.accuracy}%</span>
                        </div>
                        <Progress value={node.metrics.accuracy} className="h-1" />
                        
                        <div className="flex justify-between text-xs pt-2">
                          <span className="text-slate-400">Threats</span>
                          <span className="text-green-400">{node.metrics.threats_detected}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Uptime</span>
                          <span className="text-blue-400">{node.metrics.uptime}%</span>
                        </div>
                        
                        {activeNode === node.id && (
                          <div className="mt-4 pt-3 border-t border-slate-600">
                            <p className="text-xs text-slate-400 mb-2">Connected to:</p>
                            <div className="flex flex-wrap gap-1">
                              {node.connections.slice(0, 3).map((conn, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {conn}
                                </Badge>
                              ))}
                              {node.connections.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{node.connections.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="3d-view" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">3D Network Visualization</CardTitle>
                <CardDescription className="text-slate-300">
                  Interactive 3D view of all security nodes and their connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
                  <div className="grid grid-cols-6 gap-8 relative z-10">
                    {filteredNodes.slice(0, 24).map((node, index) => {
                      const IconComponent = node.icon;
                      return (
                        <div
                          key={node.id}
                          className={`relative group cursor-pointer transition-all duration-500 hover:scale-110 ${
                            activeNode === node.id ? 'scale-125' : ''
                          }`}
                          onClick={() => setActiveNode(node.id)}
                          style={{
                            transform: `translate3d(${node.position.x * 20}px, ${node.position.y * 20}px, ${node.position.z * 10}px)`,
                            animation: `float ${3 + index * 0.1}s ease-in-out infinite alternate`
                          }}
                        >
                          <div className={`w-12 h-12 rounded-full bg-${node.color}-600/30 border-2 border-${node.color}-400 flex items-center justify-center backdrop-blur-sm`}>
                            <IconComponent className={`h-6 w-6 text-${node.color}-400`} />
                          </div>
                          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-xs text-white whitespace-nowrap">
                              {node.name}
                            </div>
                          </div>
                          {node.status === 'active' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {filteredNodes.slice(0, 12).map((node, index) => (
                      <g key={`connections-${node.id}`}>
                        {node.connections.slice(0, 2).map((_, connIndex) => (
                          <line
                            key={`line-${index}-${connIndex}`}
                            x1={`${30 + (index % 6) * 16}%`}
                            y1={`${30 + Math.floor(index / 6) * 25}%`}
                            x2={`${45 + ((index + connIndex + 1) % 6) * 16}%`}
                            y2={`${45 + Math.floor((index + connIndex + 1) / 6) * 25}%`}
                            stroke={`rgb(59 130 246 / 0.3)`}
                            strokeWidth="1"
                            className="animate-pulse"
                          />
                        ))}
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Node Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Core Systems', 'AI Security', 'Quantum Security', 'Defense'].map((category) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">{category}</span>
                          <span className="text-white">{Math.floor(Math.random() * 15) + 85}%</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 15) + 85} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Threat Detection Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Malware Detected', value: 234, color: 'red' },
                      { name: 'Intrusions Blocked', value: 567, color: 'orange' },
                      { name: 'Anomalies Found', value: 89, color: 'yellow' },
                      { name: 'Vulnerabilities', value: 145, color: 'purple' }
                    ].map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between">
                        <span className="text-slate-400">{metric.name}</span>
                        <Badge className={`bg-${metric.color}-600`}>{metric.value}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">System Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Full System Scan
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Activate Defense Mode
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Atom className="h-4 w-4 mr-2" />
                    Initialize Quantum Core
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Target className="h-4 w-4 mr-2" />
                    Deploy Threat Hunters
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Node Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Nodes</span>
                      <span className="text-green-400">{filteredNodes.filter(n => n.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Warning Nodes</span>
                      <span className="text-yellow-400">{filteredNodes.filter(n => n.status === 'warning').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Critical Nodes</span>
                      <span className="text-red-400">{filteredNodes.filter(n => n.status === 'critical').length}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-slate-600 hover:bg-slate-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Node Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}