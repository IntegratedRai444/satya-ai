import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Activity,
  Target,
  TrendingUp,
  AlertTriangle,
  Zap,
  Eye,
  Shield,
  BarChart3,
  Cpu,
  Network,
  Database
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MachineLearningThreatPrediction() {
  const [predictionData, setPredictionData] = useState({
    overallRisk: 72,
    activeModels: 14,
    predictions: 847,
    accuracy: 94.7
  });

  const [modelStatus, setModelStatus] = useState([
    {
      name: 'Neural Threat Classifier',
      accuracy: 96.2,
      status: 'active',
      prediction: 'Low Risk',
      confidence: 89
    },
    {
      name: 'Behavioral Anomaly Detector',
      accuracy: 94.8,
      status: 'active',
      prediction: 'Medium Risk',
      confidence: 76
    },
    {
      name: 'Network Pattern Analyzer',
      accuracy: 93.1,
      status: 'training',
      prediction: 'High Risk',
      confidence: 92
    },
    {
      name: 'Malware Signature Predictor',
      accuracy: 97.5,
      status: 'active',
      prediction: 'Critical Risk',
      confidence: 88
    }
  ]);

  const [realtimePredictions, setRealtimePredictions] = useState([
    {
      timestamp: '14:32:15',
      threat: 'Advanced Persistent Threat',
      probability: 87.3,
      model: 'Deep Learning Ensemble',
      action: 'Block & Monitor'
    },
    {
      timestamp: '14:31:42',
      threat: 'Phishing Campaign',
      probability: 92.1,
      model: 'NLP Threat Classifier',
      action: 'Quarantine'
    },
    {
      timestamp: '14:30:18',
      threat: 'Ransomware Variant',
      probability: 95.7,
      model: 'Behavioral Analyzer',
      action: 'Immediate Block'
    },
    {
      timestamp: '14:29:55',
      threat: 'Data Exfiltration',
      probability: 78.4,
      model: 'Network Flow Analyzer',
      action: 'Deep Scan'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'training': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getRiskColor = (prediction: string) => {
    switch (prediction) {
      case 'Low Risk': return 'text-green-400';
      case 'Medium Risk': return 'text-yellow-400';
      case 'High Risk': return 'text-orange-400';
      case 'Critical Risk': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 90) return 'text-red-400';
    if (probability >= 70) return 'text-orange-400';
    if (probability >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setPredictionData(prev => ({
        ...prev,
        overallRisk: Math.max(0, Math.min(100, prev.overallRisk + (Math.random() - 0.5) * 5)),
        predictions: prev.predictions + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Machine Learning Threat Prediction
            </h1>
            <p className="text-slate-400">Advanced AI models for predictive threat intelligence</p>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-900 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-purple-400" />
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-sm text-slate-400">Overall Risk Score</p>
            <p className="text-2xl font-bold text-purple-400">
              {predictionData.overallRisk}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm text-slate-400">Active Models</p>
            <p className="text-2xl font-bold text-blue-400">
              {predictionData.activeModels}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-green-400" />
              <BarChart3 className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-slate-400">Predictions Made</p>
            <p className="text-2xl font-bold text-green-400">
              {predictionData.predictions.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-sm text-slate-400">Model Accuracy</p>
            <p className="text-2xl font-bold text-yellow-400">
              {predictionData.accuracy}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ML Models Status */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Machine Learning Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelStatus.map((model, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <Cpu className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-sm text-slate-400">Accuracy: {model.accuracy}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={getStatusColor(model.status)}>
                          {model.status.toUpperCase()}
                        </Badge>
                        <p className={`text-sm font-medium ${getRiskColor(model.prediction)}`}>
                          {model.prediction}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Confidence</span>
                        <span className="text-blue-400">{model.confidence}%</span>
                      </div>
                      <Progress value={model.confidence} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Real-time Predictions */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Real-time Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realtimePredictions.map((prediction, index) => (
                  <div key={index} className="p-3 bg-slate-800 rounded-lg border-l-2 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">{prediction.timestamp}</span>
                      <span className={`text-sm font-bold ${getProbabilityColor(prediction.probability)}`}>
                        {prediction.probability}%
                      </span>
                    </div>
                    <h4 className="font-medium text-white mb-1">{prediction.threat}</h4>
                    <p className="text-xs text-slate-400 mb-1">{prediction.model}</p>
                    <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                      {prediction.action}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Model Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Train New Model
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Database className="w-4 h-4 mr-2" />
                Update Dataset
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Validate Predictions
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Network className="w-4 h-4 mr-2" />
                Deploy Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}