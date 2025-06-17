import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { 
  Shield, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  Lock, 
  Activity,
  Target,
  Crown,
  Zap,
  CheckCircle,
  Database,
  Network,
  Globe,
  Brain,
  Cpu,
  Radar,
  Layers,
  Orbit,
  Sparkles,
  Wifi,
  Server,
  Monitor,
  HardDrive,
  Camera,
  Video,
  Mic,
  BarChart3,
  FileText,
  Clock,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react';

interface HolographicNode {
  id: string;
  x: number;
  y: number;
  z: number;
  type: 'company' | 'threat' | 'server' | 'endpoint' | 'firewall' | 'database';
  status: 'secure' | 'warning' | 'critical' | 'compromised' | 'scanning';
  data: any;
  connections: string[];
  pulse: number;
}

interface ParticleSystem {
  particles: Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }>;
}

function Holographic3DPortal() {
  const queryClient = useQueryClient();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'globe' | 'network' | 'threats' | 'compliance' | 'quantum'>('quantum');
  const [nodes, setNodes] = useState<HolographicNode[]>([]);
  const [particleSystem, setParticleSystem] = useState<ParticleSystem>({ particles: [] });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [metrics, setMetrics] = useState({
    globalThreatLevel: 'SECURE',
    aiConfidence: 99.7,
    dataProcessingRate: '847.3 TB/hr',
    activeScans: 1247,
    blockedAttacks: 89634,
    quantumEncryption: 'ACTIVE',
    networkNodes: 156,
    complianceScore: 98.5
  });

  // Fetch enterprise data
  const { data: companies = [], isLoading: companiesLoading } = useQuery<any[]>({
    queryKey: ['/api/enterprise/companies'],
    refetchInterval: 30000,
    retry: false
  });

  const { data: threats = [], isLoading: threatsLoading } = useQuery<any[]>({
    queryKey: ['/api/enterprise/threats'],
    refetchInterval: 5000,
    retry: false
  });

  const { data: incidents = [], isLoading: incidentsLoading } = useQuery<any[]>({
    queryKey: ['/api/enterprise/incidents'],
    refetchInterval: 10000,
    retry: false
  });

  const { data: assessments = [] } = useQuery<any[]>({
    queryKey: ['/api/enterprise/assessments'],
    refetchInterval: 60000,
    retry: false
  });

  // Initialize demonstration nodes for visualization
  useEffect(() => {
    const initNodes: HolographicNode[] = [];
    
    // Create enterprise demonstration nodes
    const enterpriseNodes = [
      { id: 'hq-1', name: 'Global HQ', type: 'company', securityScore: 98, x: 0, y: 0, z: 0 },
      { id: 'dc-1', name: 'Data Center Alpha', type: 'server', securityScore: 95, x: 120, y: 0, z: 20 },
      { id: 'dc-2', name: 'Data Center Beta', type: 'server', securityScore: 92, x: -120, y: 0, z: -20 },
      { id: 'fw-1', name: 'Perimeter Firewall', type: 'firewall', securityScore: 97, x: 0, y: 150, z: 0 },
      { id: 'db-1', name: 'Primary Database', type: 'database', securityScore: 94, x: 0, y: -150, z: 30 },
      { id: 'end-1', name: 'Endpoint Cluster', type: 'endpoint', securityScore: 88, x: 80, y: 80, z: 10 },
      { id: 'threat-1', name: 'Detected Anomaly', type: 'threat', securityScore: 20, x: 200, y: 100, z: -40 },
      { id: 'threat-2', name: 'Suspicious Activity', type: 'threat', securityScore: 35, x: -180, y: -120, z: 50 }
    ];

    enterpriseNodes.forEach((node, index) => {
      initNodes.push({
        id: node.id,
        x: node.x,
        y: node.y,
        z: node.z,
        type: node.type as any,
        status: node.securityScore > 95 ? 'secure' : 
                node.securityScore > 85 ? 'warning' : 
                node.securityScore > 50 ? 'critical' : 'compromised',
        data: node,
        connections: [],
        pulse: index * 0.5
      });
    });

    setNodes(initNodes);
  }, []);

  // Initialize particle system
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 100,
        maxLife: 100,
        color: `hsl(${180 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
        size: Math.random() * 2 + 1
      });
    }
    setParticleSystem({ particles });
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setTime(prev => prev + 0.016);
      
      // Update particles
      setParticleSystem(prev => ({
        particles: prev.particles.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          z: p.z + p.vz,
          life: p.life - 0.5
        })).filter(p => p.life > 0).concat(
          // Add new particles
          Array.from({ length: 1 }, () => ({
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400,
            z: (Math.random() - 0.5) * 300,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            vz: (Math.random() - 0.5) * 0.3,
            life: 80,
            maxLife: 80,
            color: `hsl(${180 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
            size: Math.random() * 2 + 1
          }))
        )
      }));

      // Update node animations
      setNodes(prev => prev.map(node => ({
        ...node,
        pulse: node.pulse + 0.03,
        z: node.type === 'threat' ? 
          node.z + Math.sin(time * 1.5 + node.pulse) * 0.8 : 
          node.z + Math.sin(time * 0.5 + node.pulse) * 0.3
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [time]);

  // 3D projection helper
  const project3D = (x: number, y: number, z: number, rotX: number, rotY: number) => {
    // Apply rotation
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    
    const y1 = y * cosRX - z * sinRX;
    const z1 = y * sinRX + z * cosRX;
    const x1 = x * cosRY - z1 * sinRY;
    const z2 = x * sinRY + z1 * cosRY;
    
    // Project to 2D
    const scale = 300 / (300 + z2) * zoom;
    return {
      x: x1 * scale,
      y: y1 * scale,
      z: z2
    };
  };

  // Render holographic display
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create quantum background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height));
    gradient.addColorStop(0, 'rgba(20, 15, 50, 0.95)');
    gradient.addColorStop(0.4, 'rgba(10, 8, 30, 0.98)');
    gradient.addColorStop(1, 'rgba(5, 5, 15, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(centerX, centerY);

    const rotX = rotation.x + time * 0.08;
    const rotY = rotation.y + time * 0.12;

    // Render particles
    particleSystem.particles.forEach(particle => {
      const projected = project3D(particle.x, particle.y, particle.z, rotX, rotY);
      const alpha = particle.life / particle.maxLife;
      
      ctx.globalAlpha = alpha * 0.6;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, particle.size * (1 + projected.z * 0.001), 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Render connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i];
        const node2 = nodes[j];
        
        const distance = Math.sqrt(
          Math.pow(node1.x - node2.x, 2) + 
          Math.pow(node1.y - node2.y, 2) + 
          Math.pow(node1.z - node2.z, 2)
        );
        
        if (distance < 200) {
          const proj1 = project3D(node1.x, node1.y, node1.z, rotX, rotY);
          const proj2 = project3D(node2.x, node2.y, node2.z, rotX, rotY);
          
          const alpha = Math.max(0, 1 - (distance / 200));
          const connectionColor = node1.type === 'threat' || node2.type === 'threat' ? 
            'rgba(239, 68, 68, ' : 'rgba(59, 130, 246, ';
          
          ctx.strokeStyle = connectionColor + (alpha * 0.4) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(proj1.x, proj1.y);
          ctx.lineTo(proj2.x, proj2.y);
          ctx.stroke();
        }
      }
    }

    // Render nodes
    nodes.forEach(node => {
      const projected = project3D(node.x, node.y, node.z, rotX, rotY);
      
      // Node appearance based on type and status
      const getNodeColor = (status: string) => {
        switch (status) {
          case 'secure': return '#10b981';
          case 'warning': return '#f59e0b';
          case 'critical': return '#ef4444';
          case 'compromised': return '#dc2626';
          case 'scanning': return '#3b82f6';
          default: return '#6b7280';
        }
      };

      const nodeColor = getNodeColor(node.status);
      const pulseSize = 8 + Math.sin(node.pulse) * 3;
      
      // Node glow effect
      const glowGradient = ctx.createRadialGradient(
        projected.x, projected.y, 0,
        projected.x, projected.y, pulseSize * 2
      );
      glowGradient.addColorStop(0, nodeColor + '80');
      glowGradient.addColorStop(0.5, nodeColor + '20');
      glowGradient.addColorStop(1, nodeColor + '00');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, pulseSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Main node
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Node highlight
      if (selectedNode === node.id) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, pulseSize + 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Node label
      if (projected.z > -100) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.data.name || node.id, projected.x, projected.y + pulseSize + 15);
      }
    });

    ctx.restore();
  }, [rotation, zoom, nodes, particleSystem, time, selectedNode]);

  // Mouse interactions
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons === 1) {
      setRotation(prev => ({
        x: prev.x + e.movementY * 0.008,
        y: prev.y + e.movementX * 0.008
      }));
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.max(0.3, Math.min(3, prev + e.deltaY * -0.001)));
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    let closestNode = null;
    let closestDistance = Infinity;
    
    nodes.forEach(node => {
      const projected = project3D(node.x, node.y, node.z, rotation.x, rotation.y);
      const distance = Math.sqrt((projected.x - x) ** 2 + (projected.y - y) ** 2);
      
      if (distance < 25 && distance < closestDistance) {
        closestDistance = distance;
        closestNode = node.id;
      }
    });
    
    setSelectedNode(closestNode);
  }, [nodes, rotation]);

  // Real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        dataProcessingRate: `${(800 + Math.random() * 150).toFixed(1)} TB/hr`,
        aiConfidence: 99.4 + Math.random() * 0.6,
        activeScans: Math.max(1000, prev.activeScans + Math.floor(Math.random() * 20 - 10)),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 8)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      <UnifiedSidebar />
      <div className="ml-64 p-6 overflow-hidden">
        <div className="max-w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Quantum Holographic Security Command
              </h1>
              <p className="text-gray-400 mt-2 text-lg">Advanced 3D threat visualization and autonomous protection matrix</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2">
                <Radar className="w-5 h-5 mr-2" />
                {metrics.globalThreatLevel}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                <Sparkles className="w-5 h-5 mr-2" />
                Quantum Active
              </Badge>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-500/30 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Brain className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{metrics.aiConfidence.toFixed(1)}%</div>
                <div className="text-blue-200">AI Confidence</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-green-500/30 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{metrics.blockedAttacks.toLocaleString()}</div>
                <div className="text-green-200">Blocked Attacks</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Database className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{metrics.dataProcessingRate}</div>
                <div className="text-purple-200">Processing Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/60 to-orange-800/40 border-orange-500/30 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <Eye className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{metrics.activeScans}</div>
                <div className="text-orange-200">Active Scans</div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Holographic Display */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Orbit className="w-8 h-8 text-cyan-400" />
                  Holographic Security Matrix
                </CardTitle>
                <div className="flex gap-2">
                  {['quantum', 'network', 'threats', 'globe', 'compliance'].map((mode) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode(mode as any)}
                      className="text-white capitalize"
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 border border-gray-600 rounded-lg cursor-grab active:cursor-grabbing"
                  onMouseMove={handleMouseMove}
                  onWheel={handleWheel}
                  onClick={handleCanvasClick}
                />
                
                {/* Overlay Controls */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                    Nodes: {nodes.length}
                  </div>
                  <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                    Zoom: {(zoom * 100).toFixed(0)}%
                  </div>
                </div>

                {selectedNode && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-lg max-w-sm">
                    <h3 className="font-semibold text-cyan-400 mb-2">Node Details</h3>
                    <div className="space-y-1 text-sm">
                      <div>ID: {selectedNode}</div>
                      <div>Status: {nodes.find(n => n.id === selectedNode)?.status}</div>
                      <div>Type: {nodes.find(n => n.id === selectedNode)?.type}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Live System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantum Encryption</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Integrity</span>
                    <span className="text-green-400">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Threat Detection</span>
                    <span className="text-blue-400">SCANNING</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm">Quantum encryption verified</div>
                      <div className="text-green-400 text-xs">2 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm">Anomaly detected in sector 7</div>
                      <div className="text-yellow-400 text-xs">5 minutes ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm">Deep scan initiated</div>
                      <div className="text-blue-400 text-xs">8 minutes ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Holographic3DPortal;