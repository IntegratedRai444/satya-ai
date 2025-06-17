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
  Save
} from 'lucide-react';

interface AIEmployee {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  capabilities: string[];
  personality: {
    tone: string;
    formality: number;
    creativity: number;
    empathy: number;
    assertiveness: number;
  };
  skills: {
    category: string;
    level: number;
    specializations: string[];
  }[];
  deployment: {
    status: 'active' | 'inactive' | 'training';
    environment: string;
    apiEndpoint?: string;
    metrics: {
      tasksCompleted: number;
      accuracy: number;
      responseTime: number;
      userSatisfaction: number;
    };
  };
  configuration: {
    modelType: string;
    temperature: number;
    maxTokens: number;
    context: string;
    instructions: string;
    safety: {
      contentFilter: boolean;
      biasDetection: boolean;
      ethicalGuidelines: boolean;
    };
  };
  schedule: {
    timezone: string;
    workingHours: { start: string; end: string; };
    availability: string[];
  };
  createdAt: string;
  updatedAt: string;
}

const roleTemplates = [
  {
    name: 'Cybersecurity Analyst',
    description: 'Specialized in threat detection and security analysis',
    capabilities: ['Threat Detection', 'Risk Assessment', 'Incident Response', 'Vulnerability Analysis'],
    avatar: '🛡️',
    defaultSkills: [
      { category: 'Security Analysis', level: 90, specializations: ['Malware Detection', 'Network Security', 'SIEM'] },
      { category: 'Risk Assessment', level: 85, specializations: ['Compliance', 'Audit', 'Policy'] }
    ]
  },
  {
    name: 'Data Scientist',
    description: 'Expert in data analysis and machine learning',
    capabilities: ['Data Analysis', 'Machine Learning', 'Statistical Modeling', 'Visualization'],
    avatar: '📊',
    defaultSkills: [
      { category: 'Data Analysis', level: 95, specializations: ['Python', 'R', 'SQL'] },
      { category: 'Machine Learning', level: 88, specializations: ['Deep Learning', 'NLP', 'Computer Vision'] }
    ]
  },
  {
    name: 'Customer Support Agent',
    description: 'Friendly and helpful customer service specialist',
    capabilities: ['Customer Service', 'Problem Solving', 'Product Knowledge', 'Empathy'],
    avatar: '👥',
    defaultSkills: [
      { category: 'Communication', level: 92, specializations: ['Active Listening', 'Conflict Resolution'] },
      { category: 'Technical Support', level: 80, specializations: ['Troubleshooting', 'Documentation'] }
    ]
  },
  {
    name: 'Content Creator',
    description: 'Creative writing and content generation specialist',
    capabilities: ['Writing', 'Editing', 'SEO', 'Social Media'],
    avatar: '✍️',
    defaultSkills: [
      { category: 'Writing', level: 90, specializations: ['Blog Posts', 'Marketing Copy', 'Technical Writing'] },
      { category: 'SEO', level: 75, specializations: ['Keyword Research', 'Content Optimization'] }
    ]
  },
  {
    name: 'Research Assistant',
    description: 'Comprehensive research and analysis specialist',
    capabilities: ['Research', 'Analysis', 'Summarization', 'Fact-checking'],
    avatar: '🔍',
    defaultSkills: [
      { category: 'Research', level: 88, specializations: ['Academic Research', 'Market Research', 'Competitive Analysis'] },
      { category: 'Analysis', level: 85, specializations: ['Data Interpretation', 'Trend Analysis'] }
    ]
  }
];

const modelTypes = [
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4 (Latest)', description: 'Most advanced reasoning and analysis' },
  { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet', description: 'Balanced performance and speed' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', description: 'High performance general purpose' },
  { value: 'custom-fine-tuned', label: 'Custom Fine-tuned', description: 'Specialized for your domain' }
];

export default function AIEmployeeDesigner() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentEmployee, setCurrentEmployee] = useState<Partial<AIEmployee>>({
    name: '',
    role: '',
    description: '',
    avatar: '🤖',
    capabilities: [],
    personality: {
      tone: 'professional',
      formality: 50,
      creativity: 50,
      empathy: 50,
      assertiveness: 50
    },
    skills: [],
    deployment: {
      status: 'inactive',
      environment: 'development',
      metrics: {
        tasksCompleted: 0,
        accuracy: 0,
        responseTime: 0,
        userSatisfaction: 0
      }
    },
    configuration: {
      modelType: 'claude-sonnet-4',
      temperature: 0.7,
      maxTokens: 4000,
      context: '',
      instructions: '',
      safety: {
        contentFilter: true,
        biasDetection: true,
        ethicalGuidelines: true
      }
    },
    schedule: {
      timezone: 'UTC',
      workingHours: { start: '09:00', end: '17:00' },
      availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing AI employees
  const { data: employees = [], isLoading } = useQuery<AIEmployee[]>({
    queryKey: ['/api/ai-employees'],
    retry: false
  });

  // Create/Update AI Employee
  const saveEmployeeMutation = useMutation({
    mutationFn: async (employee: Partial<AIEmployee>) => {
      const endpoint = employee.id ? `/api/ai-employees/${employee.id}` : '/api/ai-employees';
      const method = employee.id ? 'PUT' : 'POST';
      return await apiRequest(method, endpoint, employee);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "AI Employee saved successfully",
        variant: "default"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/ai-employees'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save AI Employee",
        variant: "destructive"
      });
    }
  });

  // Delete AI Employee
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/ai-employees/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "AI Employee deleted successfully",
        variant: "default"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/ai-employees'] });
    }
  });

  // Train AI Employee
  const trainEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('POST', `/api/ai-employees/${id}/train`);
    },
    onSuccess: () => {
      setIsTraining(true);
      // Simulate training progress
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTraining(false);
            toast({
              title: "Training Complete",
              description: "AI Employee has been successfully trained",
              variant: "default"
            });
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
    }
  });

  const applyTemplate = (template: typeof roleTemplates[0]) => {
    setCurrentEmployee(prev => ({
      ...prev,
      name: '',
      role: template.name,
      description: template.description,
      avatar: template.avatar,
      capabilities: template.capabilities,
      skills: template.defaultSkills
    }));
    setSelectedTemplate(template.name);
  };

  const addCapability = (capability: string) => {
    if (!currentEmployee.capabilities?.includes(capability)) {
      setCurrentEmployee(prev => ({
        ...prev,
        capabilities: [...(prev.capabilities || []), capability]
      }));
    }
  };

  const removeCapability = (capability: string) => {
    setCurrentEmployee(prev => ({
      ...prev,
      capabilities: prev.capabilities?.filter(c => c !== capability) || []
    }));
  };

  const updatePersonality = (trait: string, value: number) => {
    setCurrentEmployee(prev => ({
      ...prev,
      personality: {
        ...prev.personality!,
        [trait]: value
      }
    }));
  };

  const saveEmployee = () => {
    if (!currentEmployee.name || !currentEmployee.role) {
      toast({
        title: "Validation Error",
        description: "Please provide a name and role for the AI Employee",
        variant: "destructive"
      });
      return;
    }

    const employeeData = {
      ...currentEmployee,
      id: currentEmployee.id || Date.now().toString(),
      createdAt: currentEmployee.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveEmployeeMutation.mutate(employeeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl">
              <Bot className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI Employee Designer</h1>
              <p className="text-gray-400">Create and manage specialized AI employees for your organization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="w-4 h-4 mr-2" />
              {employees.length} Active Employees
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Activity className="w-4 h-4 mr-2" />
              Real-time Monitoring
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-gray-700/50 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Eye className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="designer" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Brain className="w-4 h-4 mr-2" />
              Designer
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Settings className="w-4 h-4 mr-2" />
              Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee: AIEmployee) => (
                <Card key={employee.id} className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{employee.avatar}</div>
                        <div>
                          <CardTitle className="text-white text-lg">{employee.name}</CardTitle>
                          <CardDescription className="text-cyan-400">{employee.role}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`${
                        employee.deployment.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : employee.deployment.status === 'training'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {employee.deployment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{employee.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {employee.capabilities.slice(0, 3).map((capability, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                          {capability}
                        </Badge>
                      ))}
                      {employee.capabilities.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-500/20 text-gray-400 text-xs">
                          +{employee.capabilities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Accuracy</div>
                        <div className="text-cyan-400 font-semibold">{employee.deployment.metrics.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Tasks</div>
                        <div className="text-green-400 font-semibold">{employee.deployment.metrics.tasksCompleted}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setCurrentEmployee(employee)}
                        className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => trainEmployeeMutation.mutate(employee.id)}
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                      >
                        <Brain className="w-4 h-4 mr-1" />
                        Train
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add New Employee Card */}
              <Card 
                className="bg-gray-900/30 border-gray-700/50 border-dashed hover:border-cyan-500/50 transition-colors cursor-pointer"
                onClick={() => setActiveTab('designer')}
              >
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                  <Plus className="w-12 h-12 text-cyan-400 mb-4" />
                  <CardTitle className="text-white mb-2">Create New AI Employee</CardTitle>
                  <CardDescription>Design a specialized AI for your specific needs</CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Designer Tab */}
          <TabsContent value="designer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Template Selection */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      Role Templates
                    </CardTitle>
                    <CardDescription>Start with a pre-configured template</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {roleTemplates.map((template, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedTemplate === template.name
                            ? 'border-cyan-500/50 bg-cyan-500/10'
                            : 'border-gray-700/50 hover:border-gray-600/50'
                        }`}
                        onClick={() => applyTemplate(template)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{template.avatar}</div>
                          <div>
                            <div className="text-white font-medium text-sm">{template.name}</div>
                            <div className="text-gray-400 text-xs">{template.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Designer Panel */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Basic Information */}
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-cyan-400" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Name</Label>
                        <Input
                          id="name"
                          value={currentEmployee.name || ''}
                          onChange={(e) => setCurrentEmployee(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Sarah the Security Analyst"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role" className="text-gray-300">Role</Label>
                        <Input
                          id="role"
                          value={currentEmployee.role || ''}
                          onChange={(e) => setCurrentEmployee(prev => ({ ...prev, role: e.target.value }))}
                          placeholder="e.g., Cybersecurity Analyst"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="description"
                        value={currentEmployee.description || ''}
                        onChange={(e) => setCurrentEmployee(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what this AI employee specializes in..."
                        className="bg-gray-800 border-gray-700 text-white min-h-20"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Avatar</Label>
                      <div className="flex gap-2 mt-2">
                        {['🤖', '👨‍💻', '👩‍💻', '🛡️', '📊', '👥', '✍️', '🔍', '⚡', '🎯'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setCurrentEmployee(prev => ({ ...prev, avatar: emoji }))}
                            className={`p-2 text-2xl rounded-lg border transition-colors ${
                              currentEmployee.avatar === emoji
                                ? 'border-cyan-500/50 bg-cyan-500/10'
                                : 'border-gray-700/50 hover:border-gray-600/50'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Capabilities */}
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-cyan-400" />
                      Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(currentEmployee.capabilities || []).map((capability, index) => (
                        <Badge
                          key={index}
                          className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 cursor-pointer hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30"
                          onClick={() => removeCapability(capability)}
                        >
                          {capability} ×
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Threat Detection', 'Data Analysis', 'Content Creation', 'Customer Support',
                        'Code Review', 'Research', 'Translation', 'Image Analysis', 'Voice Processing',
                        'Compliance Check', 'Risk Assessment', 'Automation', 'Training', 'Documentation'
                      ].filter(cap => !currentEmployee.capabilities?.includes(cap)).map((capability) => (
                        <Button
                          key={capability}
                          variant="outline"
                          size="sm"
                          onClick={() => addCapability(capability)}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 text-xs"
                        >
                          + {capability}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Personality Configuration */}
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      Personality Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-300">Communication Tone</Label>
                      <Select
                        value={currentEmployee.personality?.tone || 'professional'}
                        onValueChange={(value) => setCurrentEmployee(prev => ({
                          ...prev,
                          personality: { ...prev.personality!, tone: value }
                        }))}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {[
                      { key: 'formality', label: 'Formality', icon: '🎭' },
                      { key: 'creativity', label: 'Creativity', icon: '🎨' },
                      { key: 'empathy', label: 'Empathy', icon: '❤️' },
                      { key: 'assertiveness', label: 'Assertiveness', icon: '💪' }
                    ].map(({ key, label, icon }) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300 flex items-center gap-2">
                            <span>{icon}</span>
                            {label}
                          </Label>
                          <span className="text-cyan-400 font-semibold">
                            {currentEmployee.personality?.[key as keyof typeof currentEmployee.personality] || 50}%
                          </span>
                        </div>
                        <Slider
                          value={[currentEmployee.personality?.[key as keyof typeof currentEmployee.personality] || 50]}
                          onValueChange={(values) => updatePersonality(key, values[0])}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* AI Configuration */}
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      AI Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Model Type</Label>
                      <Select
                        value={currentEmployee.configuration?.modelType || 'claude-sonnet-4'}
                        onValueChange={(value) => setCurrentEmployee(prev => ({
                          ...prev,
                          configuration: { ...prev.configuration!, modelType: value }
                        }))}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {modelTypes.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div>
                                <div className="font-medium">{model.label}</div>
                                <div className="text-xs text-gray-400">{model.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Temperature</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Slider
                            value={[currentEmployee.configuration?.temperature || 0.7]}
                            onValueChange={(values) => setCurrentEmployee(prev => ({
                              ...prev,
                              configuration: { ...prev.configuration!, temperature: values[0] }
                            }))}
                            max={1}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="text-cyan-400 font-semibold w-12">
                            {currentEmployee.configuration?.temperature || 0.7}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-gray-300">Max Tokens</Label>
                        <Input
                          type="number"
                          value={currentEmployee.configuration?.maxTokens || 4000}
                          onChange={(e) => setCurrentEmployee(prev => ({
                            ...prev,
                            configuration: { ...prev.configuration!, maxTokens: parseInt(e.target.value) }
                          }))}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300">System Instructions</Label>
                      <Textarea
                        value={currentEmployee.configuration?.instructions || ''}
                        onChange={(e) => setCurrentEmployee(prev => ({
                          ...prev,
                          configuration: { ...prev.configuration!, instructions: e.target.value }
                        }))}
                        placeholder="Provide specific instructions for how this AI should behave..."
                        className="bg-gray-800 border-gray-700 text-white min-h-32"
                      />
                    </div>

                    {/* Safety Settings */}
                    <div className="space-y-3">
                      <Label className="text-gray-300 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Safety Settings
                      </Label>
                      
                      {[
                        { key: 'contentFilter', label: 'Content Filtering', description: 'Filter inappropriate content' },
                        { key: 'biasDetection', label: 'Bias Detection', description: 'Detect and mitigate bias' },
                        { key: 'ethicalGuidelines', label: 'Ethical Guidelines', description: 'Follow ethical AI principles' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{label}</div>
                            <div className="text-gray-400 text-sm">{description}</div>
                          </div>
                          <Switch
                            checked={currentEmployee.configuration?.safety?.[key as keyof typeof currentEmployee.configuration.safety] || false}
                            onCheckedChange={(checked) => setCurrentEmployee(prev => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration!,
                                safety: {
                                  ...prev.configuration!.safety,
                                  [key]: checked
                                }
                              }
                            }))}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={saveEmployee}
                    disabled={saveEmployeeMutation.isPending}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 font-semibold"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {saveEmployeeMutation.isPending ? 'Saving...' : 'Save AI Employee'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentEmployee({})}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Clear Form
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Management Tab */}
          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Employee List */}
              <div className="xl:col-span-2">
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-cyan-400" />
                      Employee Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employees.map((employee: AIEmployee) => (
                        <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{employee.avatar}</div>
                            <div>
                              <div className="text-white font-medium">{employee.name}</div>
                              <div className="text-gray-400 text-sm">{employee.role}</div>
                            </div>
                            <Badge className={`${
                              employee.deployment.status === 'active' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                : employee.deployment.status === 'training'
                                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            }`}>
                              {employee.deployment.status}
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                            >
                              {employee.deployment.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCurrentEmployee(employee)}
                              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteEmployeeMutation.mutate(employee.id)}
                              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Training Progress */}
              <div className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-cyan-400" />
                      Training Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isTraining ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Training Model...</span>
                          <span className="text-cyan-400 font-semibold">{trainingProgress}%</span>
                        </div>
                        <Progress value={trainingProgress} className="h-2" />
                        <div className="text-gray-400 text-sm">
                          Estimated time remaining: {Math.ceil((100 - trainingProgress) / 10)} minutes
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <div className="text-gray-400">No training in progress</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">API Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Model Cache</span>
                      <span className="text-cyan-400">98% Hit Rate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Avg Response</span>
                      <span className="text-green-400">145ms</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Employees', value: employees.length.toString(), icon: Bot, color: 'cyan' },
                { title: 'Active Tasks', value: '247', icon: Activity, color: 'green' },
                { title: 'Avg Accuracy', value: '94.2%', icon: Target, color: 'blue' },
                { title: 'Response Time', value: '145ms', icon: Clock, color: 'purple' }
              ].map((metric, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{metric.title}</p>
                        <p className="text-white text-2xl font-bold">{metric.value}</p>
                      </div>
                      <metric.icon className={`w-8 h-8 text-${metric.color}-400`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Performance analytics chart would be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Task Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Task distribution chart would be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}