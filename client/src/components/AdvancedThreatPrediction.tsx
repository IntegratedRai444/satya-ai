import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Activity,
  Zap,
  Eye,
  Database,
  Network,
  Clock,
  BarChart3
} from 'lucide-react';

interface ThreatPrediction {
  id: string;
  threatType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probability: number;
  confidence: number;
  timeframe: string;
  description: string;
  indicators: string[];
  mitigations: string[];
  mlModel: string;
  learningAccuracy: number;
}

interface MLModel {
  name: string;
  type: string;
  accuracy: number;
  lastTrained: string;
  predictions: number;
  status: 'active' | 'training' | 'updating';
}

export function AdvancedThreatPrediction() {
  const [predictions, setPredictions] = useState<ThreatPrediction[]>([]);
  const [mlModels, setMLModels] = useState<MLModel[]>([]);
  const [activeTab, setActiveTab] = useState('predictions');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Initialize with sample data
    const samplePredictions: ThreatPrediction[] = [
      {
        id: 'pred_001',
        threatType: 'Advanced Persistent Threat',
        severity: 'CRITICAL',
        probability: 87.3,
        confidence: 94.1,
        timeframe: '24-48 hours',
        description: 'ML models detect patterns indicating imminent APT campaign targeting financial sector',
        indicators: [
          'Unusual network reconnaissance patterns',
          'Suspicious domain registrations',
          'Email phishing campaign escalation',
          'Zero-day exploit signatures'
        ],
        mitigations: [
          'Enhance email filtering rules',
          'Implement network segmentation',
          'Deploy additional EDR sensors',
          'Activate incident response team'
        ],
        mlModel: 'ThreatNet-Alpha',
        learningAccuracy: 96.8
      },
      {
        id: 'pred_002',
        threatType: 'Ransomware Campaign',
        severity: 'HIGH',
        probability: 73.2,
        confidence: 89.5,
        timeframe: '3-7 days',
        description: 'Behavioral analysis suggests ransomware deployment preparation in healthcare sector',
        indicators: [
          'Shadow IT discovery scans',
          'Credential harvesting attempts',
          'Backup system reconnaissance',
          'Lateral movement patterns'
        ],
        mitigations: [
          'Backup verification and isolation',
          'Privileged access review',
          'Network traffic monitoring',
          'User behavior analytics'
        ],
        mlModel: 'RansomGuard-Beta',
        learningAccuracy: 92.4
      },
      {
        id: 'pred_003',
        threatType: 'Supply Chain Attack',
        severity: 'HIGH',
        probability: 68.7,
        confidence: 85.3,
        timeframe: '1-2 weeks',
        description: 'Predictive models identify potential third-party vendor compromise scenarios',
        indicators: [
          'Vendor security posture changes',
          'Software update anomalies',
          'Certificate authority irregularities',
          'Code signing inconsistencies'
        ],
        mitigations: [
          'Vendor security assessment',
          'Software integrity verification',
          'Supply chain monitoring',
          'Isolated testing environments'
        ],
        mlModel: 'SupplyChain-Gamma',
        learningAccuracy: 88.9
      }
    ];

    const sampleMLModels: MLModel[] = [
      {
        name: 'ThreatNet-Alpha',
        type: 'Deep Neural Network',
        accuracy: 96.8,
        lastTrained: '2025-01-17 08:00:00',
        predictions: 1247,
        status: 'active'
      },
      {
        name: 'RansomGuard-Beta',
        type: 'Ensemble Learning',
        accuracy: 92.4,
        lastTrained: '2025-01-17 06:30:00',
        predictions: 856,
        status: 'active'
      },
      {
        name: 'SupplyChain-Gamma',
        type: 'Random Forest',
        accuracy: 88.9,
        lastTrained: '2025-01-17 04:15:00',
        predictions: 634,
        status: 'training'
      },
      {
        name: 'ZeroDay-Delta',
        type: 'Transformer Network',
        accuracy: 94.2,
        lastTrained: '2025-01-17 02:45:00',
        predictions: 423,
        status: 'updating'
      }
    ];

    setPredictions(samplePredictions);
    setMLModels(sampleMLModels);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-blue-500';
      case 'updating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const runPredictionAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="h-10 w-10 text-blue-400" />
            Machine Learning Threat Prediction
          </h1>
          <p className="text-slate-300 text-lg">
            Advanced AI models for predictive threat intelligence and proactive security
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="predictions" className="text-white data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Threat Predictions
            </TabsTrigger>
            <TabsTrigger value="models" className="text-white data-[state=active]:bg-blue-600">
              <Database className="h-4 w-4 mr-2" />
              ML Models
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Prediction Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Button 
                  onClick={runPredictionAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Run Prediction Analysis
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Eye className="h-4 w-4 mr-2" />
                  View Historical Data
                </Button>
              </div>
              <div className="text-slate-300 text-sm">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                        {prediction.threatType}
                      </CardTitle>
                      <Badge className={`${getSeverityColor(prediction.severity)} text-white`}>
                        {prediction.severity}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300">
                      {prediction.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-slate-400">Probability</div>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.probability} className="flex-1" />
                          <span className="text-white font-medium">{prediction.probability}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Confidence</div>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.confidence} className="flex-1" />
                          <span className="text-white font-medium">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-400 mb-2">Timeframe</div>
                      <div className="flex items-center gap-2 text-white">
                        <Clock className="h-4 w-4 text-blue-400" />
                        {prediction.timeframe}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-400 mb-2">Key Indicators</div>
                      <div className="space-y-1">
                        {prediction.indicators.slice(0, 3).map((indicator, index) => (
                          <div key={index} className="text-sm text-slate-300 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            {indicator}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm text-slate-400">
                        Model: {prediction.mlModel}
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Apply Mitigations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mlModels.map((model, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-400" />
                        {model.name}
                      </span>
                      <Badge className={`${getStatusColor(model.status)} text-white`}>
                        {model.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {model.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Accuracy</div>
                      <div className="flex items-center gap-2">
                        <Progress value={model.accuracy} className="flex-1" />
                        <span className="text-white font-medium">{model.accuracy}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Predictions Made:</span>
                        <span className="text-white">{model.predictions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Trained:</span>
                        <span className="text-white">{new Date(model.lastTrained).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Retrain
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">847</div>
                  <div className="text-slate-400 text-sm">Total Predictions</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">94.2%</div>
                  <div className="text-slate-400 text-sm">Average Accuracy</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">23</div>
                  <div className="text-slate-400 text-sm">Threats Prevented</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Prediction Performance Trends</CardTitle>
                <CardDescription className="text-slate-300">
                  ML model accuracy and threat detection over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-400">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Performance analytics visualization would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}