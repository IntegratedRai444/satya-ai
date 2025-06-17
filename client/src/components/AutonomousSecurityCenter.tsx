import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Bot, 
  Zap, 
  Activity, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  Eye,
  Lock,
  Cpu,
  Network,
  Clock,
  TrendingUp,
  Radar
} from 'lucide-react';

interface AutonomousAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'responding' | 'learning';
  confidence: number;
  threatsDetected: number;
  responseTime: string;
  autonomyLevel: number;
  capabilities: string[];
}

interface ThreatPrediction {
  id: string;
  threatType: string;
  probability: number;
  timeframe: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  indicators: string[];
  countermeasures: string[];
}

export function AutonomousSecurityCenter() {
  const [autonomousAgents, setAutonomousAgents] = useState<AutonomousAgent[]>([
    {
      id: 'apex_defender',
      name: 'APEX Autonomous Defender',
      type: 'Multi-Modal Defense AI',
      status: 'active',
      confidence: 97.8,
      threatsDetected: 1247,
      responseTime: '0.3ms',
      autonomyLevel: 95,
      capabilities: ['Threat Prediction', 'Auto-Response', 'Adaptive Learning', 'Zero-Day Detection']
    },
    {
      id: 'quantum_sentinel',
      name: 'Quantum Threat Sentinel',
      type: 'Quantum-Enhanced Predictor',
      status: 'active',
      confidence: 99.2,
      threatsDetected: 892,
      responseTime: '0.1ms',
      autonomyLevel: 98,
      capabilities: ['Quantum Analysis', 'Cryptographic Protection', 'Future Threat Modeling']
    },
    {
      id: 'neural_guardian',
      name: 'Neural Network Guardian',
      type: 'Deep Learning Security Agent',
      status: 'responding',
      confidence: 94.5,
      threatsDetected: 2156,
      responseTime: '0.8ms',
      autonomyLevel: 92,
      capabilities: ['Behavioral Analysis', 'Anomaly Detection', 'Continuous Learning']
    },
    {
      id: 'adaptive_shield',
      name: 'Adaptive Security Shield',
      type: 'Self-Evolving Protection System',
      status: 'learning',
      confidence: 96.1,
      threatsDetected: 1589,
      responseTime: '0.4ms',
      autonomyLevel: 89,
      capabilities: ['Self-Modification', 'Threat Evolution', 'Predictive Countermeasures']
    }
  ]);

  const [threatPredictions, setThreatPredictions] = useState<ThreatPrediction[]>([
    {
      id: 'pred_001',
      threatType: 'Advanced Persistent Threat (Nation-State)',
      probability: 87.3,
      timeframe: '6-12 hours',
      severity: 'CRITICAL',
      indicators: ['Unusual network patterns', 'Encrypted communications spike', 'Social engineering attempts'],
      countermeasures: ['Enhanced monitoring', 'Network isolation protocols', 'Threat hunting activation']
    },
    {
      id: 'pred_002',
      threatType: 'AI-Generated Deepfake Campaign',
      probability: 73.8,
      timeframe: '2-4 days',
      severity: 'HIGH',
      indicators: ['Synthetic media detection', 'Social platform anomalies', 'Voice pattern irregularities'],
      countermeasures: ['Media verification systems', 'Public awareness alerts', 'Content filtering enhancement']
    },
    {
      id: 'pred_003',
      threatType: 'Quantum-Resistant Cryptographic Attack',
      probability: 45.2,
      timeframe: '1-2 weeks',
      severity: 'MEDIUM',
      indicators: ['Cryptographic pattern analysis', 'Quantum computing advances', 'Post-quantum research trends'],
      countermeasures: ['Crypto-agility protocols', 'Quantum-safe migrations', 'Enhanced encryption standards']
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalThreatsBlocked: 45782,
    autonomousResponses: 12456,
    predictiveAccuracy: 94.7,
    responseTime: 0.23,
    learningRate: 97.2,
    systemAdaptations: 847
  });

  const [autonomousMode, setAutonomousMode] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutonomousAgents(prev => prev.map(agent => ({
        ...agent,
        status: Math.random() > 0.8 ? 
          (['active', 'responding', 'learning'][Math.floor(Math.random() * 3)] as any) : 
          agent.status,
        confidence: Math.max(90, Math.min(100, agent.confidence + (Math.random() - 0.5) * 2)),
        threatsDetected: agent.threatsDetected + Math.floor(Math.random() * 3)
      })));

      setThreatPredictions(prev => prev.map(pred => ({
        ...pred,
        probability: Math.max(20, Math.min(100, pred.probability + (Math.random() - 0.5) * 5))
      })));

      setSystemMetrics(prev => ({
        ...prev,
        totalThreatsBlocked: prev.totalThreatsBlocked + Math.floor(Math.random() * 5),
        autonomousResponses: prev.autonomousResponses + Math.floor(Math.random() * 3),
        predictiveAccuracy: Math.max(90, Math.min(100, prev.predictiveAccuracy + (Math.random() - 0.5) * 1)),
        responseTime: Math.max(0.1, Math.min(1.0, prev.responseTime + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'responding': return 'bg-red-600 animate-pulse';
      case 'learning': return 'bg-blue-600';
      case 'standby': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 bg-red-500/10';
      case 'HIGH': return 'border-orange-500 bg-orange-500/10';
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-500/10';
      case 'LOW': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="detection-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Threats Blocked</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.totalThreatsBlocked.toLocaleString()}</p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="detection-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Autonomous Responses</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.autonomousResponses.toLocaleString()}</p>
                </div>
              </div>
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="detection-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Predictive Accuracy</p>
                  <p className="text-2xl font-bold text-white">{systemMetrics.predictiveAccuracy.toFixed(1)}%</p>
                </div>
              </div>
              <Target className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Autonomous Mode Control */}
      <Card className="detection-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Bot className="w-6 h-6 text-blue-400" />
              Autonomous Security Control
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Autonomous Mode</span>
              <Button 
                variant={autonomousMode ? "default" : "outline"}
                size="sm"
                onClick={() => setAutonomousMode(!autonomousMode)}
                className={autonomousMode ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300"}
              >
                {autonomousMode ? "ENABLED" : "DISABLED"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{systemMetrics.responseTime.toFixed(2)}ms</div>
              <div className="text-gray-400">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{systemMetrics.learningRate.toFixed(1)}%</div>
              <div className="text-gray-400">Learning Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{systemMetrics.systemAdaptations}</div>
              <div className="text-gray-400">System Adaptations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{autonomousAgents.length}</div>
              <div className="text-gray-400">Active Agents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Autonomous Agents */}
      <Card className="detection-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Bot className="w-6 h-6 text-green-400" />
            Autonomous Security Agents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {autonomousAgents.map(agent => (
            <div key={agent.id} className="p-4 rounded bg-gray-800/60 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                  <h3 className="font-semibold text-white">{agent.name}</h3>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                    {agent.type}
                  </Badge>
                </div>
                <Badge className={`${getStatusColor(agent.status)} text-white`}>
                  {agent.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-400">Confidence</p>
                  <p className="text-white font-semibold">{agent.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Threats Detected</p>
                  <p className="text-white font-semibold">{agent.threatsDetected.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Response Time</p>
                  <p className="text-white font-semibold">{agent.responseTime}</p>
                </div>
                <div>
                  <p className="text-gray-400">Autonomy Level</p>
                  <p className="text-white font-semibold">{agent.autonomyLevel}%</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-400 text-sm mb-2">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map(capability => (
                    <Badge key={capability} variant="outline" className="border-gray-600 text-gray-300">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Operational Efficiency</span>
                  <span className="text-xs text-gray-300">{agent.confidence.toFixed(1)}%</span>
                </div>
                <Progress value={agent.confidence} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Threat Predictions */}
      <Card className="detection-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Radar className="w-6 h-6 text-orange-400" />
            Predictive Threat Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {threatPredictions.map(prediction => (
            <div key={prediction.id} className={`p-4 rounded border-l-4 ${getSeverityColor(prediction.severity)}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{prediction.threatType}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${prediction.severity === 'CRITICAL' ? 'bg-red-600' : 
                                   prediction.severity === 'HIGH' ? 'bg-orange-600' :
                                   prediction.severity === 'MEDIUM' ? 'bg-yellow-600' : 'bg-green-600'} text-white`}>
                    {prediction.severity}
                  </Badge>
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{prediction.timeframe}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Probability</span>
                  <span className="text-sm text-white font-semibold">{prediction.probability.toFixed(1)}%</span>
                </div>
                <Progress value={prediction.probability} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-2">Threat Indicators</p>
                  <ul className="space-y-1">
                    {prediction.indicators.map((indicator, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full" />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Recommended Countermeasures</p>
                  <ul className="space-y-1">
                    {prediction.countermeasures.map((countermeasure, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {countermeasure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card className="detection-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            Autonomous Action Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Shield className="w-4 h-4 mr-2" />
              Deploy Shields
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Brain className="w-4 h-4 mr-2" />
              Train Models
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Cpu className="w-4 h-4 mr-2" />
              Optimize Systems
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Network className="w-4 h-4 mr-2" />
              Adaptive Response
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AutonomousSecurityCenter;