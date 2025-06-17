import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bot, 
  Brain, 
  Cpu, 
  Eye, 
  Mic, 
  MessageSquare, 
  Shield, 
  Zap, 
  Users, 
  Settings, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  Sparkles,
  Target,
  Clock,
  Activity,
  Database,
  Network,
  Code,
  Image,
  FileText,
  Video,
  Music,
  Globe,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Plus,
  Edit,
  TrendingUp,
  Award,
  Layers,
  Workflow,
  Building2
} from 'lucide-react';

interface AIWorker {
  id: string;
  name: string;
  role: string;
  department: string;
  specialization: string;
  skills: string[];
  personality: {
    adaptability: number;
    leadership: number;
    innovation: number;
    collaboration: number;
  };
  capabilities: {
    advancedAnalytics: boolean;
    cybersecurityExpertise: boolean;
    realTimeProcessing: boolean;
    quantumComputing: boolean;
    neuralNetworkDesign: boolean;
    blockchainIntegration: boolean;
  };
  workingHours: string;
  timezone: string;
  securityClearance: string;
  trainingData: string[];
  customInstructions: string;
  autonomyLevel: number;
  learningRate: number;
  status: 'active' | 'training' | 'idle' | 'maintenance';
  performance: {
    efficiency: number;
    accuracy: number;
    taskCompletion: number;
    innovation: number;
  };
  createdAt: string;
  lastActive: string;
}

export default function IntelligentWorkforceCreator() {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [aiWorker, setAIWorker] = useState({
    name: '',
    role: '',
    department: '',
    specialization: '',
    skills: [],
    personality: {
      adaptability: 70,
      leadership: 60,
      innovation: 80,
      collaboration: 65
    },
    capabilities: {
      advancedAnalytics: true,
      cybersecurityExpertise: true,
      realTimeProcessing: false,
      quantumComputing: false,
      neuralNetworkDesign: false,
      blockchainIntegration: false
    },
    workingHours: '24/7',
    timezone: 'Global',
    securityClearance: 'enterprise',
    trainingData: [],
    customInstructions: '',
    autonomyLevel: 75,
    learningRate: 85
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing AI workers
  const { data: aiWorkers = [], isLoading } = useQuery({
    queryKey: ['/api/ai-workers'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/ai-workers');
        return response;
      } catch (error) {
        // Return mock data for demo
        return [
          {
            id: 'worker_001',
            name: 'Aria CyberGuard',
            role: 'Senior Cybersecurity Analyst',
            department: 'Security Operations',
            specialization: 'Threat Intelligence & Analysis',
            skills: ['SIEM Management', 'Incident Response', 'Forensic Analysis', 'Risk Assessment'],
            personality: { adaptability: 85, leadership: 90, innovation: 95, collaboration: 80 },
            capabilities: { advancedAnalytics: true, cybersecurityExpertise: true, realTimeProcessing: true, quantumComputing: false, neuralNetworkDesign: true, blockchainIntegration: false },
            workingHours: '24/7',
            timezone: 'Global',
            securityClearance: 'Top Secret',
            status: 'active',
            performance: { efficiency: 94, accuracy: 97, taskCompletion: 91, innovation: 89 },
            autonomyLevel: 90,
            learningRate: 95,
            createdAt: '2024-01-10T08:00:00Z',
            lastActive: '2024-01-16T14:30:00Z'
          },
          {
            id: 'worker_002',
            name: 'Maxwell DataMind',
            role: 'Chief Data Intelligence Officer',
            department: 'Analytics & Intelligence',
            specialization: 'Quantum Data Processing',
            skills: ['Machine Learning', 'Quantum Algorithms', 'Predictive Analytics', 'Data Mining'],
            personality: { adaptability: 75, leadership: 85, innovation: 100, collaboration: 70 },
            capabilities: { advancedAnalytics: true, cybersecurityExpertise: false, realTimeProcessing: true, quantumComputing: true, neuralNetworkDesign: true, blockchainIntegration: true },
            workingHours: '24/7',
            timezone: 'Global',
            securityClearance: 'Secret',
            status: 'active',
            performance: { efficiency: 96, accuracy: 99, taskCompletion: 94, innovation: 98 },
            autonomyLevel: 95,
            learningRate: 98,
            createdAt: '2024-01-08T10:15:00Z',
            lastActive: '2024-01-16T16:45:00Z'
          },
          {
            id: 'worker_003',
            name: 'Nova NetworkGuard',
            role: 'Network Security Architect',
            department: 'Infrastructure Security',
            specialization: 'Zero-Trust Architecture',
            skills: ['Network Design', 'Penetration Testing', 'Vulnerability Assessment', 'Security Architecture'],
            personality: { adaptability: 80, leadership: 75, innovation: 85, collaboration: 90 },
            capabilities: { advancedAnalytics: true, cybersecurityExpertise: true, realTimeProcessing: true, quantumComputing: false, neuralNetworkDesign: false, blockchainIntegration: true },
            workingHours: '24/7',
            timezone: 'Global',
            securityClearance: 'Top Secret',
            status: 'training',
            performance: { efficiency: 88, accuracy: 92, taskCompletion: 87, innovation: 84 },
            autonomyLevel: 85,
            learningRate: 88,
            createdAt: '2024-01-12T12:00:00Z',
            lastActive: '2024-01-16T12:20:00Z'
          }
        ];
      }
    }
  });

  // Create new AI worker
  const createWorkerMutation = useMutation({
    mutationFn: async (workerData: any) => {
      return await apiRequest('POST', '/api/ai-workers', workerData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ai-workers'] });
      toast({
        title: "AI Worker Created",
        description: `${aiWorker.name} has been successfully deployed to your workforce.`
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Creation Failed",
        description: "Failed to create AI worker. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Deploy AI worker
  const deployWorkerMutation = useMutation({
    mutationFn: async (workerId: string) => {
      return await apiRequest('POST', `/api/ai-workers/${workerId}/deploy`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ai-workers'] });
      toast({
        title: "Worker Deployed",
        description: "AI worker has been successfully deployed to production."
      });
    }
  });

  const resetForm = () => {
    setAIWorker({
      name: '',
      role: '',
      department: '',
      specialization: '',
      skills: [],
      personality: {
        adaptability: 70,
        leadership: 60,
        innovation: 80,
        collaboration: 65
      },
      capabilities: {
        advancedAnalytics: true,
        cybersecurityExpertise: true,
        realTimeProcessing: false,
        quantumComputing: false,
        neuralNetworkDesign: false,
        blockchainIntegration: false
      },
      workingHours: '24/7',
      timezone: 'Global',
      securityClearance: 'enterprise',
      trainingData: [],
      customInstructions: '',
      autonomyLevel: 75,
      learningRate: 85
    });
  };

  const handleCreateWorker = () => {
    if (!aiWorker.name || !aiWorker.role || !aiWorker.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const workerData = {
      ...aiWorker,
      id: `worker_${Date.now()}`,
      status: 'training',
      performance: { efficiency: 0, accuracy: 0, taskCompletion: 0, innovation: 0 },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    createWorkerMutation.mutate(workerData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-blue-500';
      case 'idle': return 'bg-yellow-500';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Exceptional', color: 'text-green-400' };
    if (score >= 80) return { level: 'Excellent', color: 'text-blue-400' };
    if (score >= 70) return { level: 'Good', color: 'text-yellow-400' };
    if (score >= 60) return { level: 'Average', color: 'text-orange-400' };
    return { level: 'Needs Improvement', color: 'text-red-400' };
  };

  const workerTemplates = [
    {
      id: 'cybersec_analyst',
      name: 'Cybersecurity Analyst',
      description: 'Advanced threat detection and incident response specialist',
      defaultData: {
        role: 'Cybersecurity Analyst',
        department: 'Security Operations',
        specialization: 'Threat Intelligence',
        skills: ['SIEM Management', 'Incident Response', 'Malware Analysis', 'Forensics'],
        capabilities: { advancedAnalytics: true, cybersecurityExpertise: true, realTimeProcessing: true }
      }
    },
    {
      id: 'data_scientist',
      name: 'Data Intelligence Specialist',
      description: 'Quantum-enhanced data analysis and predictive modeling expert',
      defaultData: {
        role: 'Data Intelligence Specialist',
        department: 'Analytics',
        specialization: 'Quantum Computing',
        skills: ['Machine Learning', 'Statistical Analysis', 'Quantum Algorithms', 'Predictive Modeling'],
        capabilities: { advancedAnalytics: true, quantumComputing: true, neuralNetworkDesign: true }
      }
    },
    {
      id: 'compliance_officer',
      name: 'Compliance & Risk Manager',
      description: 'Automated compliance monitoring and risk assessment specialist',
      defaultData: {
        role: 'Compliance Officer',
        department: 'Risk Management',
        specialization: 'Regulatory Compliance',
        skills: ['GDPR Compliance', 'Risk Assessment', 'Audit Management', 'Policy Development'],
        capabilities: { advancedAnalytics: true, realTimeProcessing: true }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Intelligent Workforce Creator
          </h1>
          <p className="text-blue-200 text-lg">
            Design, deploy, and manage advanced AI workers for your organization
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="create" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Worker
            </TabsTrigger>
            <TabsTrigger 
              value="workforce"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Workforce ({aiWorkers.length})
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="templates"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Layers className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* Create Worker Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-400" />
                    Worker Identity
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Define the core identity and role of your AI worker
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Worker Name *</Label>
                    <Input
                      value={aiWorker.name}
                      onChange={(e) => setAIWorker(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Aria CyberGuard"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Professional Role *</Label>
                    <Input
                      value={aiWorker.role}
                      onChange={(e) => setAIWorker(prev => ({ ...prev, role: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Senior Cybersecurity Analyst"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Department *</Label>
                    <Select value={aiWorker.department} onValueChange={(value) => setAIWorker(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Security Operations">Security Operations</SelectItem>
                        <SelectItem value="Analytics & Intelligence">Analytics & Intelligence</SelectItem>
                        <SelectItem value="Risk Management">Risk Management</SelectItem>
                        <SelectItem value="Infrastructure Security">Infrastructure Security</SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                        <SelectItem value="Research & Development">Research & Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Specialization</Label>
                    <Input
                      value={aiWorker.specialization}
                      onChange={(e) => setAIWorker(prev => ({ ...prev, specialization: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Threat Intelligence & Analysis"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Capabilities */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-400" />
                    Advanced Capabilities
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Configure the AI worker's technical abilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(aiWorker.capabilities).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label className="text-slate-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setAIWorker(prev => ({
                            ...prev,
                            capabilities: { ...prev.capabilities, [key]: checked }
                          }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Personality & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Personality Matrix
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Fine-tune behavioral characteristics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(aiWorker.personality).map(([trait, value]) => (
                    <div key={trait} className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-slate-300 capitalize">{trait}</Label>
                        <span className="text-blue-400">{value}%</span>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={([newValue]) => 
                          setAIWorker(prev => ({
                            ...prev,
                            personality: { ...prev.personality, [trait]: newValue }
                          }))
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-400" />
                    Advanced Configuration
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Performance and operational settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Autonomy Level: {aiWorker.autonomyLevel}%</Label>
                    <Slider
                      value={[aiWorker.autonomyLevel]}
                      onValueChange={([value]) => setAIWorker(prev => ({ ...prev, autonomyLevel: value }))}
                      max={100}
                      step={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Learning Rate: {aiWorker.learningRate}%</Label>
                    <Slider
                      value={[aiWorker.learningRate]}
                      onValueChange={([value]) => setAIWorker(prev => ({ ...prev, learningRate: value }))}
                      max={100}
                      step={5}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Security Clearance</Label>
                    <Select value={aiWorker.securityClearance} onValueChange={(value) => setAIWorker(prev => ({ ...prev, securityClearance: value }))}>
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="secret">Secret</SelectItem>
                        <SelectItem value="top-secret">Top Secret</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Custom Instructions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  Custom Instructions & Training
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Provide specific instructions and behavioral guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={aiWorker.customInstructions}
                  onChange={(e) => setAIWorker(prev => ({ ...prev, customInstructions: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white min-h-32"
                  placeholder="Enter specific instructions, protocols, and behavioral guidelines for your AI worker..."
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Reset Form
              </Button>
              <Button
                onClick={handleCreateWorker}
                disabled={createWorkerMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {createWorkerMutation.isPending ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Deploy AI Worker
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Workforce Management Tab */}
          <TabsContent value="workforce" className="space-y-6">
            <div className="grid gap-6">
              {aiWorkers.map((worker: AIWorker) => (
                <Card key={worker.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-blue-400" />
                        <div>
                          <CardTitle className="text-white">{worker.name}</CardTitle>
                          <CardDescription className="text-slate-300">
                            {worker.role} • {worker.department}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(worker.status)} text-white`}>
                          {worker.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500 text-blue-300">
                          {worker.securityClearance}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{worker.performance.efficiency}%</div>
                        <div className="text-slate-400 text-sm">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{worker.performance.accuracy}%</div>
                        <div className="text-slate-400 text-sm">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{worker.autonomyLevel}%</div>
                        <div className="text-slate-400 text-sm">Autonomy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{worker.learningRate}%</div>
                        <div className="text-slate-400 text-sm">Learning</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {worker.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-green-500 text-green-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => deployWorkerMutation.mutate(worker.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Deploy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-900"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500 text-yellow-400 hover:bg-yellow-900"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Workers</p>
                      <p className="text-2xl font-bold text-white">{aiWorkers.length}</p>
                    </div>
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Workers</p>
                      <p className="text-2xl font-bold text-white">
                        {aiWorkers.filter(w => w.status === 'active').length}
                      </p>
                    </div>
                    <Activity className="h-6 w-6 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Avg Efficiency</p>
                      <p className="text-2xl font-bold text-white">
                        {Math.round(aiWorkers.reduce((sum, w) => sum + w.performance.efficiency, 0) / aiWorkers.length || 0)}%
                      </p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Top Performers</p>
                      <p className="text-2xl font-bold text-white">
                        {aiWorkers.filter(w => w.performance.efficiency >= 90).length}
                      </p>
                    </div>
                    <Award className="h-6 w-6 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workerTemplates.map((template) => (
                <Card key={template.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Workflow className="h-5 w-5 text-blue-400" />
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-slate-400">Role</Label>
                        <p className="text-white">{template.defaultData.role}</p>
                      </div>
                      <div>
                        <Label className="text-slate-400">Department</Label>
                        <p className="text-white">{template.defaultData.department}</p>
                      </div>
                      <div>
                        <Label className="text-slate-400">Core Skills</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.defaultData.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="border-blue-500 text-blue-300 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setAIWorker(prev => ({
                            ...prev,
                            ...template.defaultData,
                            capabilities: { ...prev.capabilities, ...template.defaultData.capabilities }
                          }));
                          setActiveTab('create');
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}