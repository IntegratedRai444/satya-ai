import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  Zap, 
  Brain, 
  Shield, 
  Target, 
  Settings,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Cpu,
  Database,
  Network,
  Eye,
  Lock,
  Unlock,
  Star,
  Activity,
  BarChart3,
  Code,
  Wrench,
  Lightbulb,
  Rocket
} from 'lucide-react';

interface AgentTemplate {
  id: string;
  name: string;
  category: string;
  role: string;
  specialization: string;
  baseCapabilities: string[];
  requiredSkills: string[];
  performanceMetrics: {
    accuracy: number;
    efficiency: number;
    responseTime: number;
    learningRate: number;
  };
  deploymentRequirements: {
    minCpuCores: number;
    minMemoryGB: number;
    storageGB: number;
    networkBandwidth: string;
  };
}

interface AIAgent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  status: string;
  capabilities: string[];
  performance: {
    accuracy: number;
    efficiency: number;
    responseTime: number;
    tasksCompleted: number;
    uptime: number;
  };
  createdAt: string;
}

interface AIEngineer {
  id: string;
  name: string;
  specialization: string;
  experienceLevel: string;
  certifications: string[];
  skills: {
    technical: string[];
    analytical: string[];
    leadership: string[];
    communication: string[];
  };
  performance: {
    projectsCompleted: number;
    successRate: number;
    clientSatisfaction: number;
  };
  availability: {
    status: string;
    capacity: number;
  };
}

interface AIAgentCreationWizardProps {
  companyId: string;
  onAgentCreated?: (agent: AIAgent) => void;
  onEngineerCreated?: (engineer: AIEngineer) => void;
}

export default function AIAgentCreationWizard({ companyId, onAgentCreated, onEngineerCreated }: AIAgentCreationWizardProps) {
  const [activeTab, setActiveTab] = useState<'agents' | 'engineers'>('agents');
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  const { toast } = useToast();

  // Agent creation state
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    specialization: '',
    securityLevel: 'standard' as 'standard' | 'high' | 'maximum',
    autonomyLevel: 5,
    department: '',
    customCapabilities: ''
  });

  // Engineer creation state
  const [engineerSpec, setEngineerSpec] = useState({
    name: '',
    specialization: 'cybersecurity' as 'cybersecurity' | 'data-analysis' | 'network-security' | 'incident-response' | 'compliance' | 'threat-hunting',
    experienceLevel: 'mid' as 'junior' | 'mid' | 'senior' | 'expert' | 'architect',
    skills: '',
    certifications: '',
    workPreferences: {
      autonomy: 7,
      collaboration: 7,
      innovation: 7,
      structure: 7
    }
  });

  useEffect(() => {
    fetchAgentTemplates();
  }, []);

  const fetchAgentTemplates = async () => {
    try {
      const response = await fetch('/api/ai-agents/templates');
      const data = await response.json();
      if (data.status === 'success') {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load agent templates",
        variant: "destructive"
      });
    }
  };

  const createAIAgent = async () => {
    if (!selectedTemplate || !agentConfig.name) {
      toast({
        title: "Validation Error",
        description: "Please select a template and provide an agent name",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    setCreationProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setCreationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const customization = {
        name: agentConfig.name,
        specialization: agentConfig.specialization || undefined,
        securityLevel: agentConfig.securityLevel,
        autonomyLevel: agentConfig.autonomyLevel,
        department: agentConfig.department || undefined
      };

      const response = await fetch('/api/ai-agents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          companyId,
          customization
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setCreationProgress(100);
        
        toast({
          title: "Agent Created Successfully",
          description: `${data.agent.name} has been deployed and is initializing`,
          variant: "default"
        });

        if (onAgentCreated) {
          onAgentCreated(data.agent);
        }

        // Reset form
        setAgentConfig({
          name: '',
          specialization: '',
          securityLevel: 'standard',
          autonomyLevel: 5,
          department: '',
          customCapabilities: ''
        });
        setSelectedTemplate('');
      } else {
        throw new Error(data.error || 'Failed to create agent');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create AI agent",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
      setCreationProgress(0);
    }
  };

  const createAIEngineer = async () => {
    if (!engineerSpec.name || !engineerSpec.skills) {
      toast({
        title: "Validation Error",
        description: "Please provide engineer name and skills",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    setCreationProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setCreationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 15;
        });
      }, 300);

      const specification = {
        name: engineerSpec.name,
        specialization: engineerSpec.specialization,
        experienceLevel: engineerSpec.experienceLevel,
        skills: engineerSpec.skills.split(',').map(skill => skill.trim()),
        certifications: engineerSpec.certifications ? engineerSpec.certifications.split(',').map(cert => cert.trim()) : [],
        workPreferences: engineerSpec.workPreferences
      };

      const response = await fetch('/api/ai-engineers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(specification)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setCreationProgress(100);
        
        toast({
          title: "Engineer Created Successfully",
          description: `${data.engineer.name} is now available for assignment`,
          variant: "default"
        });

        if (onEngineerCreated) {
          onEngineerCreated(data.engineer);
        }

        // Reset form
        setEngineerSpec({
          name: '',
          specialization: 'cybersecurity',
          experienceLevel: 'mid',
          skills: '',
          certifications: '',
          workPreferences: {
            autonomy: 7,
            collaboration: 7,
            innovation: 7,
            structure: 7
          }
        });
      } else {
        throw new Error(data.error || 'Failed to create engineer');
      }
    } catch (error) {
      console.error('Error creating engineer:', error);
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create AI engineer",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
      setCreationProgress(0);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'analyst': return <BarChart3 className="w-4 h-4" />;
      case 'engineer': return <Wrench className="w-4 h-4" />;
      case 'specialist': return <Target className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'standard': return 'bg-blue-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'maximum': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Tab Selection */}
      <div className="flex gap-2">
        <Button
          onClick={() => setActiveTab('agents')}
          variant={activeTab === 'agents' ? 'default' : 'outline'}
          className={activeTab === 'agents' ? 'bg-cyan-600' : 'border-gray-600 text-gray-300'}
        >
          <Bot className="w-4 h-4 mr-2" />
          AI Agents
        </Button>
        <Button
          onClick={() => setActiveTab('engineers')}
          variant={activeTab === 'engineers' ? 'default' : 'outline'}
          className={activeTab === 'engineers' ? 'bg-cyan-600' : 'border-gray-600 text-gray-300'}
        >
          <User className="w-4 h-4 mr-2" />
          AI Engineers
        </Button>
      </div>

      {/* AI Agent Creation */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <Card className="bg-gray-900/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                Create AI Security Agent
              </CardTitle>
              <CardDescription>
                Deploy specialized AI agents with customized capabilities for your security operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Selection */}
              <div>
                <Label className="text-gray-300 mb-3 block">Select Agent Template</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(template.category)}
                        <h4 className="text-white font-semibold">{template.name}</h4>
                        <Badge variant="secondary" className="ml-auto">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{template.role}</p>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-green-400">{template.performanceMetrics.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Efficiency:</span>
                          <span className="text-blue-400">{template.performanceMetrics.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-yellow-400">{template.performanceMetrics.responseTime}ms</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Details */}
              {selectedTemplateData && (
                <Card className="bg-gray-800/30 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{selectedTemplateData.name} Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-cyan-400 font-medium mb-2">Capabilities</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplateData.baseCapabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-gray-300 border-gray-600">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-cyan-400 font-medium mb-2">Required Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplateData.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-cyan-400 font-medium mb-2">Resource Requirements</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">CPU Cores:</span>
                            <span className="text-white">{selectedTemplateData.deploymentRequirements.minCpuCores}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Memory:</span>
                            <span className="text-white">{selectedTemplateData.deploymentRequirements.minMemoryGB} GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Storage:</span>
                            <span className="text-white">{selectedTemplateData.deploymentRequirements.storageGB} GB</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-cyan-400 font-medium mb-2">Performance Metrics</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Learning Rate:</span>
                            <span className="text-white">{selectedTemplateData.performanceMetrics.learningRate}/10</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bandwidth:</span>
                            <span className="text-white">{selectedTemplateData.deploymentRequirements.networkBandwidth}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Agent Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="agentName" className="text-gray-300">Agent Name</Label>
                    <Input
                      id="agentName"
                      value={agentConfig.name}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="CyberGuard Delta"
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialization" className="text-gray-300">Custom Specialization (Optional)</Label>
                    <Input
                      id="specialization"
                      value={agentConfig.specialization}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, specialization: e.target.value }))}
                      placeholder="Advanced Threat Detection"
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-gray-300">Department Assignment</Label>
                    <Select value={agentConfig.department} onValueChange={(value) => setAgentConfig(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Security Operations">Security Operations</SelectItem>
                        <SelectItem value="Incident Response">Incident Response</SelectItem>
                        <SelectItem value="Threat Intelligence">Threat Intelligence</SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                        <SelectItem value="Data Protection">Data Protection</SelectItem>
                        <SelectItem value="Network Security">Network Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Security Level</Label>
                    <Select value={agentConfig.securityLevel} onValueChange={(value: any) => setAgentConfig(prev => ({ ...prev, securityLevel: value }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="standard">Standard Security</SelectItem>
                        <SelectItem value="high">High Security</SelectItem>
                        <SelectItem value="maximum">Maximum Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Autonomy Level: {agentConfig.autonomyLevel}/10</Label>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={agentConfig.autonomyLevel}
                        onChange={(e) => setAgentConfig(prev => ({ ...prev, autonomyLevel: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Supervised</span>
                        <span>Autonomous</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creation Progress */}
              {isCreating && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span className="text-cyan-400">Creating AI Agent...</span>
                  </div>
                  <Progress value={creationProgress} className="h-2" />
                  <p className="text-gray-400 text-sm">
                    {creationProgress < 30 && "Initializing neural networks..."}
                    {creationProgress >= 30 && creationProgress < 60 && "Configuring security protocols..."}
                    {creationProgress >= 60 && creationProgress < 90 && "Deploying to secure environment..."}
                    {creationProgress >= 90 && "Finalizing agent activation..."}
                  </p>
                </div>
              )}

              {/* Create Button */}
              <Button
                onClick={createAIAgent}
                disabled={!selectedTemplate || !agentConfig.name || isCreating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
              >
                {isCreating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Creating Agent...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Deploy AI Agent
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Engineer Creation */}
      {activeTab === 'engineers' && (
        <Card className="bg-gray-900/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Create AI Security Engineer
            </CardTitle>
            <CardDescription>
              Generate specialized AI engineers with expertise in specific security domains
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="engineerName" className="text-gray-300">Engineer Name</Label>
                  <Input
                    id="engineerName"
                    value={engineerSpec.name}
                    onChange={(e) => setEngineerSpec(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Alex SecurityExpert"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Specialization</Label>
                  <Select value={engineerSpec.specialization} onValueChange={(value: any) => setEngineerSpec(prev => ({ ...prev, specialization: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="data-analysis">Data Analysis</SelectItem>
                      <SelectItem value="network-security">Network Security</SelectItem>
                      <SelectItem value="incident-response">Incident Response</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="threat-hunting">Threat Hunting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Experience Level</Label>
                  <Select value={engineerSpec.experienceLevel} onValueChange={(value: any) => setEngineerSpec(prev => ({ ...prev, experienceLevel: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                      <SelectItem value="mid">Mid-Level (3-6 years)</SelectItem>
                      <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      <SelectItem value="architect">Architect (15+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills" className="text-gray-300">Skills (comma-separated)</Label>
                  <Textarea
                    id="skills"
                    value={engineerSpec.skills}
                    onChange={(e) => setEngineerSpec(prev => ({ ...prev, skills: e.target.value }))}
                    placeholder="Network Security, Malware Analysis, Incident Response, Risk Assessment"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="certifications" className="text-gray-300">Certifications (optional, comma-separated)</Label>
                  <Textarea
                    id="certifications"
                    value={engineerSpec.certifications}
                    onChange={(e) => setEngineerSpec(prev => ({ ...prev, certifications: e.target.value }))}
                    placeholder="CISSP, CISM, CEH, SANS GIAC"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Work Preferences */}
            <div>
              <Label className="text-gray-300 mb-4 block">Work Preferences</Label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-400 text-sm">Autonomy: {engineerSpec.workPreferences.autonomy}/10</Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={engineerSpec.workPreferences.autonomy}
                    onChange={(e) => setEngineerSpec(prev => ({
                      ...prev,
                      workPreferences: { ...prev.workPreferences, autonomy: parseInt(e.target.value) }
                    }))}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Collaboration: {engineerSpec.workPreferences.collaboration}/10</Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={engineerSpec.workPreferences.collaboration}
                    onChange={(e) => setEngineerSpec(prev => ({
                      ...prev,
                      workPreferences: { ...prev.workPreferences, collaboration: parseInt(e.target.value) }
                    }))}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Innovation: {engineerSpec.workPreferences.innovation}/10</Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={engineerSpec.workPreferences.innovation}
                    onChange={(e) => setEngineerSpec(prev => ({
                      ...prev,
                      workPreferences: { ...prev.workPreferences, innovation: parseInt(e.target.value) }
                    }))}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Structure: {engineerSpec.workPreferences.structure}/10</Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={engineerSpec.workPreferences.structure}
                    onChange={(e) => setEngineerSpec(prev => ({
                      ...prev,
                      workPreferences: { ...prev.workPreferences, structure: parseInt(e.target.value) }
                    }))}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Creation Progress */}
            {isCreating && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-cyan-400">Creating AI Engineer...</span>
                </div>
                <Progress value={creationProgress} className="h-2" />
                <p className="text-gray-400 text-sm">
                  {creationProgress < 40 && "Generating personality profile..."}
                  {creationProgress >= 40 && creationProgress < 70 && "Training knowledge base..."}
                  {creationProgress >= 70 && creationProgress < 90 && "Configuring expertise areas..."}
                  {creationProgress >= 90 && "Finalizing engineer profile..."}
                </p>
              </div>
            )}

            {/* Create Button */}
            <Button
              onClick={createAIEngineer}
              disabled={!engineerSpec.name || !engineerSpec.skills || isCreating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
            >
              {isCreating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Creating Engineer...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate AI Engineer
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}