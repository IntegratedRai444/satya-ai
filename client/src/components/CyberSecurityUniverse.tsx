import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Globe, 
  Network, 
  Eye, 
  Brain, 
  Lock, 
  Zap, 
  Users, 
  Building, 
  Satellite,
  Server,
  Database,
  Cloud,
  Radar,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity,
  Crown,
  Diamond,
  Star
} from 'lucide-react';

interface SecurityService {
  id: string;
  name: string;
  category: 'SOC' | 'Threat Intelligence' | 'Incident Response' | 'Compliance' | 'Cloud Security' | 'Endpoint Protection';
  description: string;
  status: 'active' | 'monitoring' | 'responding' | 'maintenance';
  coverage: number;
  clients: number;
  threats_blocked: number;
  uptime: number;
  tier: 'enterprise' | 'premium' | 'elite' | 'sovereign';
  capabilities: string[];
  regions: string[];
}

interface GlobalMetrics {
  total_clients: number;
  global_threats_blocked: number;
  active_incidents: number;
  security_score: number;
  coverage_percentage: number;
  response_time: string;
  ai_predictions: number;
  quantum_operations: number;
}

export function CyberSecurityUniverse() {
  const [securityServices, setSecurityServices] = useState<SecurityService[]>([
    {
      id: 'global_soc',
      name: 'Global Security Operations Center',
      category: 'SOC',
      description: 'Premier 24/7/365 security monitoring and incident response across all time zones with quantum-enhanced threat detection.',
      status: 'active',
      coverage: 99.8,
      clients: 2847,
      threats_blocked: 18947263,
      uptime: 99.99,
      tier: 'sovereign',
      capabilities: ['Real-time Monitoring', 'AI Threat Detection', 'Incident Response', 'Forensic Analysis', 'Threat Hunting'],
      regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa']
    },
    {
      id: 'threat_intel_nexus',
      name: 'Threat Intelligence Nexus',
      category: 'Threat Intelligence',
      description: 'Advanced threat intelligence platform leveraging deep learning, dark web monitoring, and predictive analytics.',
      status: 'monitoring',
      coverage: 98.5,
      clients: 1923,
      threats_blocked: 12456789,
      uptime: 99.95,
      tier: 'elite',
      capabilities: ['Dark Web Monitoring', 'Predictive Analytics', 'IOC Generation', 'Attribution Analysis', 'Threat Actor Tracking'],
      regions: ['Global Coverage', 'Deep Web', 'Dark Web', 'Underground Forums']
    },
    {
      id: 'rapid_response',
      name: 'Rapid Incident Response Force',
      category: 'Incident Response',
      description: 'Elite cyber incident response team with autonomous AI agents and quantum-accelerated forensics capabilities.',
      status: 'responding',
      coverage: 97.2,
      clients: 1567,
      threats_blocked: 8934567,
      uptime: 99.92,
      tier: 'elite',
      capabilities: ['Emergency Response', 'Digital Forensics', 'Malware Analysis', 'Business Continuity', 'Legal Support'],
      regions: ['Americas', 'EMEA', 'APAC']
    },
    {
      id: 'compliance_guardian',
      name: 'Compliance Guardian Suite',
      category: 'Compliance',
      description: 'Comprehensive compliance management covering GDPR, HIPAA, SOX, PCI-DSS, and emerging regulatory frameworks.',
      status: 'active',
      coverage: 96.8,
      clients: 3421,
      threats_blocked: 5678912,
      uptime: 99.88,
      tier: 'premium',
      capabilities: ['Regulatory Compliance', 'Risk Assessment', 'Audit Support', 'Policy Management', 'Training Programs'],
      regions: ['US', 'EU', 'UK', 'Canada', 'Australia', 'Singapore']
    },
    {
      id: 'cloud_fortress',
      name: 'Cloud Security Fortress',
      category: 'Cloud Security',
      description: 'Multi-cloud security platform protecting AWS, Azure, GCP, and hybrid environments with zero-trust architecture.',
      status: 'active',
      coverage: 98.9,
      clients: 2156,
      threats_blocked: 15678923,
      uptime: 99.97,
      tier: 'enterprise',
      capabilities: ['Multi-Cloud Protection', 'Container Security', 'Serverless Security', 'Cloud Workload Protection', 'DevSecOps'],
      regions: ['Global Cloud Regions', 'Edge Locations', 'Hybrid Environments']
    },
    {
      id: 'endpoint_shield',
      name: 'Endpoint Protection Shield',
      category: 'Endpoint Protection',
      description: 'Advanced endpoint detection and response with behavioral analysis, machine learning, and autonomous remediation.',
      status: 'monitoring',
      coverage: 99.1,
      clients: 4782,
      threats_blocked: 23456789,
      uptime: 99.94,
      tier: 'enterprise',
      capabilities: ['EDR/XDR', 'Behavioral Analysis', 'Auto-Remediation', 'Device Management', 'Zero-Day Protection'],
      regions: ['Worldwide Deployment', 'Remote Workforce', 'IoT Networks']
    }
  ]);

  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    total_clients: 16696,
    global_threats_blocked: 85152243,
    active_incidents: 47,
    security_score: 98.7,
    coverage_percentage: 98.5,
    response_time: '0.23ms',
    ai_predictions: 1247896,
    quantum_operations: 89234
  });

  const [selectedRegion, setSelectedRegion] = useState('Global');

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityServices(prev => prev.map(service => ({
        ...service,
        threats_blocked: service.threats_blocked + Math.floor(Math.random() * 100),
        coverage: Math.max(95, Math.min(100, service.coverage + (Math.random() - 0.5) * 0.5)),
        status: Math.random() > 0.95 ? 
          (['active', 'monitoring', 'responding'][Math.floor(Math.random() * 3)] as any) : 
          service.status
      })));

      setGlobalMetrics(prev => ({
        ...prev,
        global_threats_blocked: prev.global_threats_blocked + Math.floor(Math.random() * 50),
        active_incidents: Math.max(0, prev.active_incidents + Math.floor((Math.random() - 0.5) * 5)),
        security_score: Math.max(95, Math.min(100, prev.security_score + (Math.random() - 0.5) * 0.3)),
        ai_predictions: prev.ai_predictions + Math.floor(Math.random() * 20),
        quantum_operations: prev.quantum_operations + Math.floor(Math.random() * 15)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'sovereign': return 'from-purple-600 via-pink-500 to-purple-700';
      case 'elite': return 'from-blue-600 via-cyan-500 to-blue-700';
      case 'premium': return 'from-yellow-600 via-orange-500 to-red-600';
      case 'enterprise': return 'from-green-600 via-emerald-500 to-teal-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'sovereign': return <Crown className="w-5 h-5" />;
      case 'elite': return <Diamond className="w-5 h-5" />;
      case 'premium': return <Star className="w-5 h-5" />;
      case 'enterprise': return <Building className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-green-600 to-emerald-600';
      case 'monitoring': return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'responding': return 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse';
      case 'maintenance': return 'bg-gradient-to-r from-yellow-600 to-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SOC': return <Eye className="w-6 h-6" />;
      case 'Threat Intelligence': return <Brain className="w-6 h-6" />;
      case 'Incident Response': return <Zap className="w-6 h-6" />;
      case 'Compliance': return <Lock className="w-6 h-6" />;
      case 'Cloud Security': return <Cloud className="w-6 h-6" />;
      case 'Endpoint Protection': return <Shield className="w-6 h-6" />;
      default: return <Network className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Universe Overview */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          CyberSecurity Universe
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Comprehensive global cyber security ecosystem providing enterprise-grade protection, 
          threat intelligence, and incident response across all digital frontiers.
        </p>
      </div>

      {/* Global Command Center */}
      <Card className="bg-gradient-to-br from-purple-950/80 via-purple-900/60 to-pink-950/80 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center gap-3">
            <Globe className="w-8 h-8 text-purple-400" />
            Global Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-purple-900/30 rounded-xl border border-purple-500/20">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{globalMetrics.total_clients.toLocaleString()}</div>
              <div className="text-purple-200">Global Clients</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-xl border border-blue-500/20">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{globalMetrics.global_threats_blocked.toLocaleString()}</div>
              <div className="text-blue-200">Threats Blocked</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-xl border border-green-500/20">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{globalMetrics.security_score.toFixed(1)}%</div>
              <div className="text-green-200">Security Score</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/20">
              <Activity className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{globalMetrics.response_time}</div>
              <div className="text-yellow-200">Avg Response</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">Active Incidents</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{globalMetrics.active_incidents}</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">AI Predictions</span>
              </div>
              <div className="text-2xl font-bold text-cyan-400">{globalMetrics.ai_predictions.toLocaleString()}</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Radar className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold">Quantum Ops</span>
              </div>
              <div className="text-2xl font-bold text-pink-400">{globalMetrics.quantum_operations.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {securityServices.map(service => (
          <Card key={service.id} className="bg-gradient-to-br from-gray-950/80 via-gray-900/60 to-gray-950/80 border-gray-500/30 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-r ${getTierColor(service.tier)} rounded-xl`}>
                    {getCategoryIcon(service.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{service.name}</h3>
                    <Badge variant="outline" className="border-gray-500 text-gray-300 mt-1">
                      {service.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(service.status)} text-white border-0`}>
                    {service.status.toUpperCase()}
                  </Badge>
                  <Badge className={`bg-gradient-to-r ${getTierColor(service.tier)} text-white border-0`}>
                    {getTierIcon(service.tier)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Coverage</div>
                  <div className="text-white font-semibold">{service.coverage.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Clients</div>
                  <div className="text-white font-semibold">{service.clients.toLocaleString()}</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Threats Blocked</div>
                  <div className="text-white font-semibold">{service.threats_blocked.toLocaleString()}</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Uptime</div>
                  <div className="text-white font-semibold">{service.uptime.toFixed(2)}%</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Core Capabilities</div>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.slice(0, 3).map(capability => (
                    <Badge key={capability} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {service.capabilities.length > 3 && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                      +{service.capabilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Coverage Regions</div>
                <div className="flex flex-wrap gap-2">
                  {service.regions.slice(0, 2).map(region => (
                    <Badge key={region} variant="outline" className="border-blue-600 text-blue-300 text-xs">
                      {region}
                    </Badge>
                  ))}
                  {service.regions.length > 2 && (
                    <Badge variant="outline" className="border-blue-600 text-blue-300 text-xs">
                      +{service.regions.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Service Performance</span>
                  <span className="text-white text-sm font-semibold">{service.coverage.toFixed(1)}%</span>
                </div>
                <div className="relative">
                  <Progress value={service.coverage} className="h-2 bg-gray-800" />
                  <div 
                    className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${getTierColor(service.tier)} rounded-full transition-all duration-500`}
                    style={{ width: `${service.coverage}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className={`bg-gradient-to-r ${getTierColor(service.tier)} hover:opacity-90 border-0 flex-1`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Monitor
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Server className="w-4 h-4 mr-2" />
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Universe Control Panel */}
      <Card className="bg-gradient-to-br from-purple-950/80 via-purple-900/60 to-pink-950/80 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center gap-3">
            <Network className="w-6 h-6 text-purple-400" />
            Universe Command & Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 h-12">
              <Globe className="w-5 h-5 mr-2" />
              Global View
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 h-12">
              <Satellite className="w-5 h-5 mr-2" />
              Deploy Service
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 h-12">
              <TrendingUp className="w-5 h-5 mr-2" />
              Scale Operations
            </Button>
            <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 h-12">
              <CheckCircle className="w-5 h-5 mr-2" />
              Health Check
            </Button>
            <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 border-0 h-12">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CyberSecurityUniverse;