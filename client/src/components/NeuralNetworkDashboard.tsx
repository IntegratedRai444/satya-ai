import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Cpu, 
  Activity, 
  Zap, 
  BarChart3, 
  Settings, 
  Play, 
  Pause,
  TrendingUp,
  HardDrive,
  Thermometer,
  Eye
} from 'lucide-react';
import { SciFiCard, HolographicDisplay, StatusIndicator, NeuralNetworkVisualization, CyberButton } from '@/components/SciFiInterface';

interface NeuralNetworkStatus {
  timestamp: string;
  totalModels: number;
  activeInferences: number;
  modelsStatus: Record<string, {
    status: string;
    gpuUtilization: number;
    memoryUsage: string;
    inferenceQueue: number;
    avgLatency: string;
    throughput: string;
    accuracy: number;
    lastInference: string;
  }>;
  gpuCluster: {
    totalGpus: number;
    activeGpus: number;
    totalMemory: string;
    usedMemory: string;
    totalTensorCores: number;
    activeTensorCores: number;
    powerConsumption: string;
    temperature: string;
  };
  trainingMetrics: {
    activeTrainingJobs: number;
    queuedJobs: number;
    avgEpochTime: string;
    datasetSize: string;
    modelsUpdatedToday: number;
  };
}

export default function NeuralNetworkDashboard() {
  const [neuralStatus, setNeuralStatus] = useState<NeuralNetworkStatus | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('deepfake_vision_cnn');
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    fetchNeuralStatus();
    const interval = setInterval(fetchNeuralStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchNeuralStatus = async () => {
    try {
      const response = await fetch('/api/neural/status');
      if (response.ok) {
        const data = await response.json();
        setNeuralStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch neural status:', error);
    }
  };

  const getModelDisplayName = (modelId: string) => {
    const names: Record<string, string> = {
      'deepfake_vision_cnn': 'Deepfake Vision CNN',
      'voice_temporal_rnn': 'Voice Temporal RNN', 
      'threat_bert_classifier': 'Threat BERT Classifier',
      'malware_detection_gan': 'Malware Detection GAN',
      'phishing_ensemble': 'Phishing Ensemble',
      'nas_security_model': 'NAS Security Model'
    };
    return names[modelId] || modelId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'TRAINING': return 'bg-blue-500';
      case 'IDLE': return 'bg-yellow-500';
      case 'ERROR': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const startTraining = async () => {
    setIsTraining(true);
    try {
      await fetch('/api/neural/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelType: selectedModel,
          datasetPath: '/datasets/security_v2',
          hyperparameters: {
            learningRate: 0.001,
            batchSize: 64,
            epochs: 50
          }
        })
      });
    } catch (error) {
      console.error('Training failed:', error);
    }
    setIsTraining(false);
  };

  if (!neuralStatus) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="hacker-loading text-green-400">Loading Neural Networks</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 relative">
      {/* Sci-Fi Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black pointer-events-none" />
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full circuit-pattern" />
      </div>
      
      {/* Header */}
      <HolographicDisplay className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Brain className="w-10 h-10 text-cyan-400" style={{
                filter: 'drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #00ffff)',
                animation: 'neural-network-pulse 2s ease-in-out infinite'
              }} />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                NEURAL NETWORK CONTROL CENTER
              </h1>
              <p className="text-cyan-400/70 font-mono text-sm">Advanced AI Processing Matrix</p>
            </div>
          </div>
          <StatusIndicator 
            status="online" 
            label="AI SYSTEMS" 
            value="OPERATIONAL"
            icon={Brain}
          />
        </div>
      </HolographicDisplay>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <SciFiCard variant="primary">
          <CardContent className="p-6">
            <StatusIndicator 
              status="online"
              label="ACTIVE MODELS"
              value={neuralStatus.totalModels.toString()}
              icon={Brain}
            />
          </CardContent>
        </SciFiCard>

        <SciFiCard variant="secondary">
          <CardContent className="p-6">
            <StatusIndicator 
              status="online"
              label="LIVE INFERENCES"
              value={neuralStatus.activeInferences.toString()}
              icon={Activity}
            />
          </CardContent>
        </SciFiCard>

        <SciFiCard variant="primary">
          <CardContent className="p-6">
            <StatusIndicator 
              status="warning"
              label="GPU MEMORY"
              value={neuralStatus.gpuCluster.usedMemory}
              icon={HardDrive}
            />
          </CardContent>
        </SciFiCard>

        <SciFiCard variant="danger">
          <CardContent className="p-6">
            <StatusIndicator 
              status="critical"
              label="TEMPERATURE"
              value={neuralStatus.gpuCluster.temperature}
              icon={Thermometer}
            />
          </CardContent>
        </SciFiCard>
      </div>

      {/* GPU Cluster Status */}
      <HolographicDisplay className="relative z-10">
        <div className="p-2">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-cyan-400" style={{
              filter: 'drop-shadow(0 0 8px #00ffff)'
            }} />
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              GPU CLUSTER STATUS
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatusIndicator
              status="online"
              label="ACTIVE GPUS"
              value={`${neuralStatus.gpuCluster.activeGpus}/${neuralStatus.gpuCluster.totalGpus}`}
              icon={Cpu}
            />
            
            <StatusIndicator
              status="warning"
              label="MEMORY USAGE"
              value={`${neuralStatus.gpuCluster.usedMemory} / ${neuralStatus.gpuCluster.totalMemory}`}
              icon={HardDrive}
            />
            
            <StatusIndicator
              status="online"
              label="TENSOR CORES"
              value={neuralStatus.gpuCluster.activeTensorCores.toString()}
              icon={Zap}
            />
            
            <StatusIndicator
              status="critical"
              label="POWER DRAW"
              value={neuralStatus.gpuCluster.powerConsumption}
              icon={Activity}
            />
          </div>
        </div>
      </HolographicDisplay>

      {/* Neural Network Visualization */}
      <HolographicDisplay className="relative z-10">
        <div className="p-4">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
            NEURAL NETWORK TOPOLOGY
          </h2>
          <NeuralNetworkVisualization />
        </div>
      </HolographicDisplay>

      {/* Model Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {Object.entries(neuralStatus.modelsStatus).map(([modelId, model]) => (
          <SciFiCard key={modelId} variant="primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {getModelDisplayName(modelId)}
                </CardTitle>
                <Badge className={`px-3 py-1 rounded-full border ${getStatusColor(model.status)} bg-black/50 backdrop-blur-sm`}>
                  {model.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <StatusIndicator
                  status={model.gpuUtilization > 80 ? 'critical' : model.gpuUtilization > 60 ? 'warning' : 'online'}
                  label="GPU USAGE"
                  value={`${model.gpuUtilization}%`}
                  icon={Cpu}
                />
                
                <StatusIndicator
                  status="online"
                  label="MEMORY"
                  value={model.memoryUsage}
                  icon={HardDrive}
                />
                
                <StatusIndicator
                  status="online"
                  label="LATENCY"
                  value={model.avgLatency}
                  icon={Zap}
                />
                
                <StatusIndicator
                  status="online"
                  label="THROUGHPUT"
                  value={model.throughput}
                  icon={Activity}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <StatusIndicator
                  status="online"
                  label="ACCURACY"
                  value={`${(model.accuracy * 100).toFixed(2)}%`}
                  icon={Eye}
                />
                
                <StatusIndicator
                  status={model.inferenceQueue > 5 ? 'warning' : 'online'}
                  label="QUEUE"
                  value={`${model.inferenceQueue} jobs`}
                  icon={Settings}
                />
              </div>
              
              <div className="flex gap-3">
                <CyberButton 
                  variant="primary"
                  onClick={() => setSelectedModel(modelId)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  MONITOR
                </CyberButton>
                <CyberButton 
                  variant="secondary"
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  CONFIGURE
                </CyberButton>
              </div>
            </CardContent>
          </SciFiCard>
        ))}
      </div>

      {/* Training Control Panel */}
      <HolographicDisplay className="relative z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" style={{
              filter: 'drop-shadow(0 0 8px #00ff00)'
            }} />
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              TRAINING CONTROL MATRIX
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">TRAINING METRICS</h3>
              <div className="space-y-3">
                <StatusIndicator
                  status="online"
                  label="ACTIVE JOBS"
                  value={neuralStatus.trainingMetrics.activeTrainingJobs.toString()}
                  icon={Activity}
                />
                <StatusIndicator
                  status={neuralStatus.trainingMetrics.queuedJobs > 3 ? 'warning' : 'online'}
                  label="QUEUED JOBS"
                  value={neuralStatus.trainingMetrics.queuedJobs.toString()}
                  icon={TrendingUp}
                />
                <StatusIndicator
                  status="online"
                  label="AVG EPOCH"
                  value={neuralStatus.trainingMetrics.avgEpochTime}
                  icon={Brain}
                />
                <StatusIndicator
                  status="online"
                  label="DATASET SIZE"
                  value={neuralStatus.trainingMetrics.datasetSize}
                  icon={HardDrive}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">MODEL SELECTION</h3>
              <div className="relative">
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-black/80 border-2 border-cyan-400/40 text-cyan-400 p-3 rounded-lg font-mono
                    backdrop-blur-md hover:border-cyan-400/60 transition-colors
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)'
                  }}
                >
                  {Object.keys(neuralStatus.modelsStatus).map(modelId => (
                    <option key={modelId} value={modelId} className="bg-black text-cyan-400">
                      {getModelDisplayName(modelId)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 pointer-events-none border-2 border-transparent bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 rounded-lg opacity-50" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">OPERATIONS</h3>
              <div className="space-y-3">
                <CyberButton 
                  onClick={startTraining}
                  disabled={isTraining}
                  variant={isTraining ? 'secondary' : 'primary'}
                  className="w-full"
                >
                  {isTraining ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      TRAINING IN PROGRESS...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      INITIATE TRAINING
                    </>
                  )}
                </CyberButton>
                <CyberButton variant="secondary" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  ANALYTICS MATRIX
                </CyberButton>
                <CyberButton variant="danger" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  EMERGENCY STOP
                </CyberButton>
              </div>
            </div>
          </div>
        </div>
      </HolographicDisplay>
    </div>
  );
}