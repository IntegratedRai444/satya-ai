import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Skull, 
  Zap, 
  AlertTriangle, 
  Shield, 
  Brain, 
  Lock, 
  Eye, 
  Radar,
  Crosshair,
  Bomb,
  Bug,
  Flame,
  Sword,
  Crown,
  Diamond,
  Star
} from 'lucide-react';

interface ThreatSimulation {
  id: string;
  name: string;
  type: 'APT' | 'Ransomware' | 'Zero-Day' | 'Social Engineering' | 'Supply Chain' | 'Nation-State';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'CATASTROPHIC';
  status: 'planning' | 'executing' | 'monitoring' | 'analyzing' | 'completed';
  progress: number;
  duration: string;
  targets: string[];
  techniques: string[];
  mitre_tactics: string[];
  success_rate: number;
  detection_rate: number;
  response_time: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'nation-state';
}

interface SimulationMetrics {
  total_simulations: number;
  active_campaigns: number;
  success_rate: number;
  detection_improvement: number;
  response_improvement: number;
  vulnerabilities_found: number;
  defenders_trained: number;
  attack_vectors_tested: number;
}

export function ThreatSimulationCenter() {
  const [simulations, setSimulations] = useState<ThreatSimulation[]>([
    {
      id: 'apt_shadow_dragon',
      name: 'APT Shadow Dragon Campaign',
      type: 'APT',
      severity: 'CATASTROPHIC',
      status: 'executing',
      progress: 73,
      duration: '14 days',
      targets: ['Financial Infrastructure', 'Government Networks', 'Critical Infrastructure'],
      techniques: ['Spear Phishing', 'Living off the Land', 'Lateral Movement', 'Data Exfiltration'],
      mitre_tactics: ['T1566.001', 'T1078', 'T1055', 'T1041'],
      success_rate: 87.3,
      detection_rate: 34.7,
      response_time: '4.2 hours',
      complexity: 'nation-state'
    },
    {
      id: 'ransomware_crimson_lock',
      name: 'Crimson Lock Ransomware Simulation',
      type: 'Ransomware',
      severity: 'CRITICAL',
      status: 'monitoring',
      progress: 56,
      duration: '7 days',
      targets: ['Healthcare Systems', 'Educational Institutions', 'SMB Networks'],
      techniques: ['Email Phishing', 'Privilege Escalation', 'File Encryption', 'Backup Destruction'],
      mitre_tactics: ['T1566.002', 'T1068', 'T1486', 'T1490'],
      success_rate: 78.9,
      detection_rate: 67.2,
      response_time: '2.1 hours',
      complexity: 'advanced'
    },
    {
      id: 'zeroday_ghost_exploit',
      name: 'Ghost Zero-Day Exploitation',
      type: 'Zero-Day',
      severity: 'HIGH',
      status: 'planning',
      progress: 12,
      duration: '21 days',
      targets: ['Web Applications', 'Mobile Platforms', 'IoT Devices'],
      techniques: ['Memory Corruption', 'Code Injection', 'Sandbox Escape', 'Persistence'],
      mitre_tactics: ['T1203', 'T1055', 'T1055.012', 'T1547'],
      success_rate: 92.1,
      detection_rate: 23.8,
      response_time: '8.7 hours',
      complexity: 'expert'
    },
    {
      id: 'social_silver_tongue',
      name: 'Silver Tongue Social Engineering',
      type: 'Social Engineering',
      severity: 'HIGH',
      status: 'analyzing',
      progress: 89,
      duration: '5 days',
      targets: ['Executive Personnel', 'IT Administrators', 'Finance Teams'],
      techniques: ['Vishing', 'Pretexting', 'Baiting', 'Quid Pro Quo'],
      mitre_tactics: ['T1566.004', 'T1204.002', 'T1091', 'T1078.004'],
      success_rate: 84.5,
      detection_rate: 45.3,
      response_time: '1.8 hours',
      complexity: 'intermediate'
    },
    {
      id: 'supply_chain_venom',
      name: 'Venom Supply Chain Attack',
      type: 'Supply Chain',
      severity: 'CRITICAL',
      status: 'completed',
      progress: 100,
      duration: '30 days',
      targets: ['Software Vendors', 'Package Repositories', 'Build Systems'],
      techniques: ['Code Injection', 'Dependency Confusion', 'Trojanized Updates', 'Certificate Abuse'],
      mitre_tactics: ['T1195.002', 'T1195.001', 'T1553.002', 'T1554'],
      success_rate: 76.8,
      detection_rate: 58.9,
      response_time: '12.4 hours',
      complexity: 'expert'
    },
    {
      id: 'nation_state_eclipse',
      name: 'Eclipse Nation-State Operation',
      type: 'Nation-State',
      severity: 'CATASTROPHIC',
      status: 'executing',
      progress: 34,
      duration: '90 days',
      targets: ['Defense Contractors', 'Energy Grid', 'Telecommunications'],
      techniques: ['Advanced Malware', 'Infrastructure Hijacking', 'Supply Chain Compromise', 'Insider Threats'],
      mitre_tactics: ['T1583', 'T1584', 'T1195', 'T1078.001'],
      success_rate: 94.2,
      detection_rate: 28.1,
      response_time: '16.8 hours',
      complexity: 'nation-state'
    }
  ]);

  const [metrics, setMetrics] = useState<SimulationMetrics>({
    total_simulations: 247,
    active_campaigns: 6,
    success_rate: 82.7,
    detection_improvement: 34.8,
    response_improvement: 67.2,
    vulnerabilities_found: 1847,
    defenders_trained: 5623,
    attack_vectors_tested: 892
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulations(prev => prev.map(sim => ({
        ...sim,
        progress: sim.status === 'executing' ? 
          Math.min(100, sim.progress + Math.random() * 2) : sim.progress,
        success_rate: Math.max(70, Math.min(95, sim.success_rate + (Math.random() - 0.5) * 2)),
        detection_rate: Math.max(20, Math.min(80, sim.detection_rate + (Math.random() - 0.5) * 3)),
        status: sim.progress >= 100 ? 'completed' : sim.status
      })));

      setMetrics(prev => ({
        ...prev,
        detection_improvement: Math.max(30, Math.min(50, prev.detection_improvement + (Math.random() - 0.5) * 2)),
        response_improvement: Math.max(60, Math.min(80, prev.response_improvement + (Math.random() - 0.5) * 2)),
        vulnerabilities_found: prev.vulnerabilities_found + Math.floor(Math.random() * 3)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CATASTROPHIC': return 'from-red-700 via-red-600 to-pink-600';
      case 'CRITICAL': return 'from-red-600 via-orange-600 to-red-700';
      case 'HIGH': return 'from-orange-600 via-yellow-600 to-orange-700';
      case 'MEDIUM': return 'from-yellow-600 via-amber-600 to-yellow-700';
      case 'LOW': return 'from-green-600 via-emerald-600 to-green-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'nation-state': return 'from-purple-700 via-pink-600 to-purple-800';
      case 'expert': return 'from-red-600 via-orange-600 to-red-700';
      case 'advanced': return 'from-orange-600 via-yellow-600 to-orange-700';
      case 'intermediate': return 'from-blue-600 via-cyan-600 to-blue-700';
      case 'beginner': return 'from-green-600 via-emerald-600 to-green-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'executing': return 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse';
      case 'monitoring': return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'analyzing': return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'planning': return 'bg-gradient-to-r from-yellow-600 to-orange-600';
      case 'completed': return 'bg-gradient-to-r from-green-600 to-emerald-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'APT': return <Skull className="w-6 h-6" />;
      case 'Ransomware': return <Lock className="w-6 h-6" />;
      case 'Zero-Day': return <Bomb className="w-6 h-6" />;
      case 'Social Engineering': return <Eye className="w-6 h-6" />;
      case 'Supply Chain': return <Bug className="w-6 h-6" />;
      case 'Nation-State': return <Crown className="w-6 h-6" />;
      default: return <Bug className="w-6 h-6" />;
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'nation-state': return <Crown className="w-4 h-4" />;
      case 'expert': return <Diamond className="w-4 h-4" />;
      case 'advanced': return <Star className="w-4 h-4" />;
      case 'intermediate': return <Target className="w-4 h-4" />;
      case 'beginner': return <Shield className="w-4 h-4" />;
      default: return <Bug className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Simulation Command Center */}
      <Card className="bg-gradient-to-br from-red-950/80 via-red-900/60 to-orange-950/80 border-red-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent flex items-center gap-3">
            <Target className="w-8 h-8 text-red-400" />
            Advanced Threat Simulation Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-900/30 rounded-xl border border-red-500/20">
              <Crosshair className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{metrics.total_simulations}</div>
              <div className="text-red-200">Total Simulations</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-xl border border-orange-500/20">
              <Flame className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{metrics.active_campaigns}</div>
              <div className="text-orange-200">Active Campaigns</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/20">
              <Sword className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{metrics.success_rate.toFixed(1)}%</div>
              <div className="text-yellow-200">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-xl border border-purple-500/20">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{metrics.defenders_trained.toLocaleString()}</div>
              <div className="text-purple-200">Defenders Trained</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">Vulnerabilities Found</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{metrics.vulnerabilities_found.toLocaleString()}</div>
            </div>
            <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-orange-400" />
                <span className="text-white font-semibold">Detection Improvement</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{metrics.detection_improvement.toFixed(1)}%</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Response Improvement</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.response_improvement.toFixed(1)}%</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Radar className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Attack Vectors</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{metrics.attack_vectors_tested}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Simulations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {simulations.map(simulation => (
          <Card key={simulation.id} className="bg-gradient-to-br from-gray-950/80 via-gray-900/60 to-gray-950/80 border-gray-500/30 backdrop-blur-lg hover:border-red-500/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-r ${getSeverityColor(simulation.severity)} rounded-xl`}>
                    {getTypeIcon(simulation.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{simulation.name}</h3>
                    <Badge variant="outline" className="border-gray-500 text-gray-300 mt-1">
                      {simulation.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(simulation.status)} text-white border-0`}>
                    {simulation.status.toUpperCase()}
                  </Badge>
                  <Badge className={`bg-gradient-to-r ${getSeverityColor(simulation.severity)} text-white border-0`}>
                    {simulation.severity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Duration</div>
                  <div className="text-white font-semibold">{simulation.duration}</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Success Rate</div>
                  <div className="text-white font-semibold">{simulation.success_rate.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Detection Rate</div>
                  <div className="text-white font-semibold">{simulation.detection_rate.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-400">Response Time</div>
                  <div className="text-white font-semibold">{simulation.response_time}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Campaign Progress</span>
                  <span className="text-white text-sm font-semibold">{simulation.progress.toFixed(0)}%</span>
                </div>
                <div className="relative">
                  <Progress value={simulation.progress} className="h-3 bg-gray-800" />
                  <div 
                    className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${getSeverityColor(simulation.severity)} rounded-full transition-all duration-500`}
                    style={{ width: `${simulation.progress}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Primary Targets</div>
                <div className="flex flex-wrap gap-2">
                  {simulation.targets.slice(0, 2).map(target => (
                    <Badge key={target} variant="outline" className="border-red-600 text-red-300 text-xs">
                      {target}
                    </Badge>
                  ))}
                  {simulation.targets.length > 2 && (
                    <Badge variant="outline" className="border-red-600 text-red-300 text-xs">
                      +{simulation.targets.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Attack Techniques</div>
                <div className="flex flex-wrap gap-2">
                  {simulation.techniques.slice(0, 3).map(technique => (
                    <Badge key={technique} variant="outline" className="border-orange-600 text-orange-300 text-xs">
                      {technique}
                    </Badge>
                  ))}
                  {simulation.techniques.length > 3 && (
                    <Badge variant="outline" className="border-orange-600 text-orange-300 text-xs">
                      +{simulation.techniques.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Complexity:</span>
                  <Badge className={`bg-gradient-to-r ${getComplexityColor(simulation.complexity)} text-white border-0 text-xs`}>
                    {getComplexityIcon(simulation.complexity)}
                    <span className="ml-1 capitalize">{simulation.complexity}</span>
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className={`bg-gradient-to-r ${getSeverityColor(simulation.severity)} hover:opacity-90 border-0 flex-1`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Monitor
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Target className="w-4 h-4 mr-2" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Control Panel */}
      <Card className="bg-gradient-to-br from-red-950/80 via-red-900/60 to-orange-950/80 border-red-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent flex items-center gap-3">
            <Sword className="w-6 h-6 text-red-400" />
            Simulation Command & Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-0 h-12">
              <Target className="w-5 h-5 mr-2" />
              New Campaign
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 h-12">
              <Brain className="w-5 h-5 mr-2" />
              AI Scenarios
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 h-12">
              <Radar className="w-5 h-5 mr-2" />
              Monitor All
            </Button>
            <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 h-12">
              <Shield className="w-5 h-5 mr-2" />
              Defense Mode
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 h-12">
              <Eye className="w-5 h-5 mr-2" />
              Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ThreatSimulationCenter;