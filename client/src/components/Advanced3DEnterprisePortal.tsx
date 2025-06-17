import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Eye, 
  Lock, 
  Activity,
  Target,
  Crown,
  Zap,
  CheckCircle,
  Clock,
  Database,
  Network,
  Globe,
  Brain,
  Cpu,
  Radar,
  Layers,
  Orbit,
  Sparkles
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  plan: string;
  securityScore: string;
  riskLevel: string;
  employees: number;
}

interface ThreatNode {
  id: string;
  x: number;
  y: number;
  z: number;
  type: string;
  severity: string;
  active: boolean;
}

interface NetworkConnection {
  from: string;
  to: string;
  strength: number;
  encrypted: boolean;
}

export function Advanced3DEnterprisePortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('demo-company-1');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [activeView, setActiveView] = useState<'globe' | 'network' | 'threats' | 'compliance'>('globe');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Demo data for companies
  const companies = [
    {
      id: 'demo-company-1',
      name: 'TechCorp Industries',
      domain: 'techcorp.com',
      industry: 'Technology',
      size: 'medium',
      plan: 'enterprise',
      securityScore: '92.5',
      riskLevel: 'low',
      employees: 250
    },
    {
      id: 'demo-company-2',
      name: 'FinanceFlow LLC',
      domain: 'financeflow.com',
      industry: 'Finance',
      size: 'large',
      plan: 'sovereign',
      securityScore: '96.8',
      riskLevel: 'low',
      employees: 850
    },
    {
      id: 'demo-company-3',
      name: 'HealthTech Startup',
      domain: 'healthtech.io',
      industry: 'Healthcare',
      size: 'startup',
      plan: 'professional',
      securityScore: '78.3',
      riskLevel: 'medium',
      employees: 45
    },
    {
      id: 'demo-company-4',
      name: 'CloudFirst Solutions',
      domain: 'cloudfirst.io',
      industry: 'Cloud Services',
      size: 'medium',
      plan: 'professional',
      securityScore: '89.4',
      riskLevel: 'low',
      employees: 180
    }
  ];

  // Real-time threat data
  const [threatNodes, setThreatNodes] = useState<ThreatNode[]>([]);
  const [networkConnections, setNetworkConnections] = useState<NetworkConnection[]>([]);
  const [realTimeStats, setRealTimeStats] = useState({
    totalCompanies: 247,
    averageSecurityScore: 87.3,
    activeIncidents: 14,
    activeThreats: 38,
    dataProcessed: '2.4TB',
    quantumEncryption: 'Active'
  });

  // Initialize 3D visualization
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Generate threat nodes
    const nodes: ThreatNode[] = [];
    for (let i = 0; i < 50; i++) {
      nodes.push({
        id: `threat-${i}`,
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 200,
        type: ['malware', 'phishing', 'apt', 'ransomware', 'ddos'][Math.floor(Math.random() * 5)],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        active: Math.random() > 0.3
      });
    }
    setThreatNodes(nodes);

    // Generate network connections
    const connections: NetworkConnection[] = [];
    for (let i = 0; i < 30; i++) {
      connections.push({
        from: `node-${Math.floor(Math.random() * 20)}`,
        to: `node-${Math.floor(Math.random() * 20)}`,
        strength: Math.random(),
        encrypted: Math.random() > 0.2
      });
    }
    setNetworkConnections(connections);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Save context
      ctx.save();

      // Center the coordinate system
      ctx.translate(width / 2, height / 2);

      // Apply rotation
      const rotX = rotation.x + Date.now() * 0.0001;
      const rotY = rotation.y + Date.now() * 0.0002;

      if (activeView === 'globe') {
        drawGlobalView(ctx, rotX, rotY);
      } else if (activeView === 'network') {
        drawNetworkView(ctx, rotX, rotY);
      } else if (activeView === 'threats') {
        drawThreatView(ctx, rotX, rotY);
      } else if (activeView === 'compliance') {
        drawComplianceView(ctx, rotX, rotY);
      }

      // Restore context
      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [rotation, zoom, activeView, threatNodes, networkConnections]);

  const drawGlobalView = (ctx: CanvasRenderingContext2D, rotX: number, rotY: number) => {
    // Draw global security grid
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)';
    ctx.lineWidth = 1;

    // Draw 3D grid
    for (let i = -200; i <= 200; i += 40) {
      for (let j = -200; j <= 200; j += 40) {
        const x1 = i * Math.cos(rotY) - j * Math.sin(rotY);
        const y1 = i * Math.sin(rotY) + j * Math.cos(rotY);
        const z1 = 0;

        const x2 = x1;
        const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);

        ctx.beginPath();
        ctx.arc(x2 * zoom, y2 * zoom, 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Draw company nodes
    companies.forEach((company, index) => {
      const angle = (index / companies.length) * Math.PI * 2;
      const radius = 120;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.sin(Date.now() * 0.001 + index) * 20;

      // 3D transformation
      const x3d = x * Math.cos(rotY) - z * Math.sin(rotY);
      const y3d = (y * Math.cos(rotX) - z * Math.sin(rotX)) + z * Math.sin(rotY);

      // Color based on security score
      const score = parseFloat(company.securityScore);
      const hue = score > 90 ? 120 : score > 80 ? 60 : 0;
      
      ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
      ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.6)`;
      ctx.shadowBlur = 15;

      ctx.beginPath();
      ctx.arc(x3d * zoom, y3d * zoom, 8 * zoom, 0, Math.PI * 2);
      ctx.fill();

      // Company label
      if (zoom > 0.5) {
        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(company.name, x3d * zoom, y3d * zoom + 20);
      }
    });
  };

  const drawNetworkView = (ctx: CanvasRenderingContext2D, rotX: number, rotY: number) => {
    // Draw network topology
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
    ctx.lineWidth = 2;

    // Draw connections
    networkConnections.forEach((connection, index) => {
      const angle1 = (index / networkConnections.length) * Math.PI * 2;
      const angle2 = ((index + 1) / networkConnections.length) * Math.PI * 2;
      
      const x1 = Math.cos(angle1) * 100;
      const y1 = Math.sin(angle1) * 100;
      const x2 = Math.cos(angle2) * 100;
      const y2 = Math.sin(angle2) * 100;

      ctx.beginPath();
      ctx.moveTo(x1 * zoom, y1 * zoom);
      ctx.lineTo(x2 * zoom, y2 * zoom);
      ctx.stroke();

      // Draw nodes
      ctx.fillStyle = connection.encrypted ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
      ctx.beginPath();
      ctx.arc(x1 * zoom, y1 * zoom, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Central hub
    ctx.fillStyle = 'rgba(147, 51, 234, 0.9)';
    ctx.shadowColor = 'rgba(147, 51, 234, 0.6)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, 0, 15 * zoom, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawThreatView = (ctx: CanvasRenderingContext2D, rotX: number, rotY: number) => {
    // Draw threat landscape
    threatNodes.forEach((node, index) => {
      const time = Date.now() * 0.001;
      
      // Animate threat positions
      const x = node.x + Math.sin(time + index) * 10;
      const y = node.y + Math.cos(time + index) * 10;
      const z = node.z + Math.sin(time * 2 + index) * 5;

      // 3D transformation
      const x3d = x * Math.cos(rotY) - z * Math.sin(rotY);
      const y3d = y * Math.cos(rotX) - z * Math.sin(rotX);

      // Color based on severity
      let color = 'rgba(34, 197, 94, 0.7)'; // low
      if (node.severity === 'medium') color = 'rgba(234, 179, 8, 0.7)';
      if (node.severity === 'high') color = 'rgba(249, 115, 22, 0.7)';
      if (node.severity === 'critical') color = 'rgba(239, 68, 68, 0.7)';

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = node.active ? 10 : 5;

      const size = node.severity === 'critical' ? 8 : node.severity === 'high' ? 6 : 4;
      
      ctx.beginPath();
      ctx.arc(x3d * zoom * 0.5, y3d * zoom * 0.5, size * zoom, 0, Math.PI * 2);
      ctx.fill();

      // Pulse effect for active threats
      if (node.active && Math.sin(time * 10) > 0) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x3d * zoom * 0.5, y3d * zoom * 0.5, (size + 5) * zoom, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };

  const drawComplianceView = (ctx: CanvasRenderingContext2D, rotX: number, rotY: number) => {
    // Draw compliance frameworks as 3D structures
    const frameworks = ['GDPR', 'HIPAA', 'SOX', 'PCI-DSS', 'ISO27001'];
    
    frameworks.forEach((framework, index) => {
      const angle = (index / frameworks.length) * Math.PI * 2;
      const radius = 80;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.sin(Date.now() * 0.002 + index) * 30;

      // 3D transformation
      const x3d = x * Math.cos(rotY) - z * Math.sin(rotY);
      const y3d = y * Math.cos(rotX) - z * Math.sin(rotX);

      // Compliance level color
      const compliance = 85 + Math.random() * 15; // 85-100%
      const hue = compliance > 95 ? 120 : compliance > 90 ? 60 : 30;
      
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.8)`;
      ctx.shadowColor = `hsla(${hue}, 70%, 50%, 0.4)`;
      ctx.shadowBlur = 12;

      // Draw framework block
      const size = 20;
      ctx.fillRect(x3d * zoom - size/2, y3d * zoom - size/2, size, size);

      // Framework label
      ctx.fillStyle = 'white';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(framework, x3d * zoom, y3d * zoom + 35);
      ctx.fillText(`${compliance.toFixed(1)}%`, x3d * zoom, y3d * zoom + 50);
    });
  };

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button
      setRotation(prev => ({
        x: prev.x + e.movementY * 0.01,
        y: prev.y + e.movementX * 0.01
      }));
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.max(0.1, Math.min(3, prev + e.deltaY * -0.001)));
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'sovereign': return 'from-purple-700 via-pink-600 to-purple-800';
      case 'enterprise': return 'from-blue-700 via-cyan-600 to-blue-800';
      case 'professional': return 'from-orange-700 via-yellow-600 to-orange-800';
      case 'basic': return 'from-green-700 via-emerald-600 to-green-800';
      default: return 'from-gray-700 to-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Update real-time stats
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        activeIncidents: Math.max(0, prev.activeIncidents + Math.floor((Math.random() - 0.5) * 3)),
        activeThreats: Math.max(0, prev.activeThreats + Math.floor((Math.random() - 0.5) * 5)),
        averageSecurityScore: Math.max(80, Math.min(100, prev.averageSecurityScore + (Math.random() - 0.5) * 2)),
        dataProcessed: `${(parseFloat(prev.dataProcessed) + Math.random() * 0.1).toFixed(1)}TB`
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 p-6 overflow-hidden">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              3D Enterprise Security Command Center
            </h1>
            <p className="text-gray-400 mt-2">Advanced holographic cyber threat visualization and monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <Radar className="w-4 h-4 mr-2" />
              Quantum Scanner Active
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              3D Holographic Mode
            </Badge>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Building className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{realTimeStats.totalCompanies}</div>
              <div className="text-purple-200 text-sm">Protected</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{realTimeStats.averageSecurityScore.toFixed(1)}%</div>
              <div className="text-blue-200 text-sm">Avg Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/60 to-red-800/40 border-red-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{realTimeStats.activeIncidents}</div>
              <div className="text-red-200 text-sm">Incidents</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/60 to-orange-800/40 border-orange-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{realTimeStats.activeThreats}</div>
              <div className="text-orange-200 text-sm">Threats</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/60 to-cyan-800/40 border-cyan-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Database className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{realTimeStats.dataProcessed}</div>
              <div className="text-cyan-200 text-sm">Processed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-green-500/30 backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">ACTIVE</div>
              <div className="text-green-200 text-sm">Quantum Shield</div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Visualization Controls */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Orbit className="w-6 h-6 text-cyan-400" />
                3D Security Visualization
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={activeView === 'globe' ? 'default' : 'outline'}
                  onClick={() => setActiveView('globe')}
                  className={activeView === 'globe' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Global
                </Button>
                <Button
                  size="sm"
                  variant={activeView === 'network' ? 'default' : 'outline'}
                  onClick={() => setActiveView('network')}
                  className={activeView === 'network' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <Network className="w-4 h-4 mr-2" />
                  Network
                </Button>
                <Button
                  size="sm"
                  variant={activeView === 'threats' ? 'default' : 'outline'}
                  onClick={() => setActiveView('threats')}
                  className={activeView === 'threats' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Threats
                </Button>
                <Button
                  size="sm"
                  variant={activeView === 'compliance' ? 'default' : 'outline'}
                  onClick={() => setActiveView('compliance')}
                  className={activeView === 'compliance' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Compliance
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-purple-500/30 cursor-grab active:cursor-grabbing"
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute top-4 left-4 text-white text-sm">
                <div className="bg-black/50 p-2 rounded">
                  <div>View: {activeView.toUpperCase()}</div>
                  <div>Zoom: {(zoom * 100).toFixed(0)}%</div>
                  <div>Drag to rotate • Scroll to zoom</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Grid */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-400" />
              Protected Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedCompanyId === company.id 
                      ? 'border-purple-500 bg-purple-900/30 scale-105' 
                      : 'border-gray-600 bg-gray-800/30 hover:border-purple-400 hover:scale-102'
                  }`}
                  onClick={() => setSelectedCompanyId(company.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white text-lg">{company.name}</h3>
                    <Badge className={`bg-gradient-to-r ${getPlanColor(company.plan)} text-white`}>
                      {company.plan}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{company.domain}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-300">{company.industry}</span>
                    <span className={`text-sm font-semibold ${getRiskColor(company.riskLevel)}`}>
                      {company.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Security Score</span>
                      <span className="text-white font-bold">{company.securityScore}%</span>
                    </div>
                    <Progress value={parseFloat(company.securityScore)} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Employees</span>
                    <span className="text-white">{company.employees}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-400" />
                Live Security Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-medium">Quantum encryption activated</span>
                  <span className="text-xs text-green-300">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-medium">Neural network updated</span>
                  <span className="text-xs text-blue-300">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-medium">Anomaly detected - investigating</span>
                  <span className="text-xs text-yellow-300">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                AI Control Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Cpu className="w-4 h-4 mr-2" />
                Quantum Threat Analysis
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Brain className="w-4 h-4 mr-2" />
                Neural Defense Matrix
              </Button>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Shield className="w-4 h-4 mr-2" />
                Autonomous Protection
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Zap className="w-4 h-4 mr-2" />
                Emergency Lockdown
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Advanced3DEnterprisePortal;