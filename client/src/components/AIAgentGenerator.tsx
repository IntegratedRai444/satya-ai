import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Settings, 
  Play, 
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Network,
  Lock
} from 'lucide-react';

interface AgentTemplate {
  name: string;
  role: string;
  specialization: string;
  base_capabilities: string[];
  required_skills: string[];
}

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  status: string;
  created_at: string;
  profile: any;
  deployment: any;
  performance: any;
}

interface GeneratedAgent {
  success: boolean;
  agent?: AgentProfile;
  error?: string;
}

export function AIAgentGenerator() {
  const [templates, setTemplates] = useState<Record<string, AgentTemplate>>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customRequirements, setCustomRequirements] = useState<string>('');
  const [generatedAgents, setGeneratedAgents] = useState<AgentProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('generator');
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/ai-agents/templates');
      const data = await response.json();
      setTemplates(data.templates || {});
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      // Set default templates if API fails
      setTemplates({
        security_analyst: {
          name: 'CyberGuard Analyst',
          role: 'Security Operations Analyst',
          specialization: 'Threat Detection and Analysis',
          base_capabilities: ['Real-time threat monitoring', 'SIEM data analysis'],
          required_skills: ['Network security protocols', 'Malware analysis']
        },
        ai_engineer: {
          name: 'SatyaAI Engineer', 
          role: 'AI/ML Security Engineer',
          specialization: 'AI-powered Security Solutions',
          base_capabilities: ['ML model development', 'Anomaly detection'],
          required_skills: ['Machine learning frameworks', 'Deep learning']
        }
      });
      toast({
        title: "Error",
        description: "Failed to load agent templates",
        variant: "destructive",
      });
    }
  };

  const generateAgent = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select an agent template",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setDeploymentProgress(0);

    try {
      const requirements = customRequirements ? 
        JSON.parse(customRequirements) : {};

      const response = await fetch('/api/ai-agents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedTemplate,
          requirements
        })
      });

      const result: GeneratedAgent = await response.json();

      if (result.success && result.agent) {
        setGeneratedAgents(prev => [result.agent!, ...prev]);
        setDeploymentProgress(100);
        toast({
          title: "Success",
          description: `AI Agent "${result.agent.name}" generated successfully`,
        });
        setActiveTab('agents');
      } else {
        throw new Error(result.error || 'Failed to generate agent');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deployAgent = async (agent: AgentProfile) => {
    try {
      const response = await fetch('/api/ai-agents/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Deployment Successful",
          description: `Agent deployed at ${result.deployment.endpoint_url}`,
        });
      } else {
        throw new Error(result.error || 'Deployment failed');
      }
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'initializing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Bot className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'security_analyst': return <Shield className="h-6 w-6 text-blue-500" />;
      case 'ai_engineer': return <Brain className="h-6 w-6 text-purple-500" />;
      case 'blockchain_specialist': return <Network className="h-6 w-6 text-green-500" />;
      case 'incident_responder': return <Zap className="h-6 w-6 text-orange-500" />;
      case 'compliance_officer': return <Lock className="h-6 w-6 text-red-500" />;
      default: return <Bot className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Bot className="h-10 w-10 text-cyan-400" />
            SatyaAI Agent Generator
          </h1>
          <p className="text-slate-300 text-lg">
            Generate advanced AI agents powered by Google Gemini for cybersecurity operations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="generator" className="text-white data-[state=active]:bg-cyan-600">
              <Settings className="h-4 w-4 mr-2" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="agents" className="text-white data-[state=active]:bg-cyan-600">
              <Users className="h-4 w-4 mr-2" />
              Generated Agents ({generatedAgents.length})
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-white data-[state=active]:bg-cyan-600">
              <Database className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  AI Agent Configuration
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure and generate custom AI agents for your cybersecurity operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="template" className="text-white">Agent Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select an agent template" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {Object.entries(templates).map(([key, template]) => (
                            <SelectItem key={key} value={key} className="text-white hover:bg-slate-600">
                              <div className="flex items-center gap-2">
                                {getTemplateIcon(key)}
                                <div>
                                  <div className="font-medium">{template.name}</div>
                                  <div className="text-sm text-slate-400">{template.specialization}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTemplate && templates[selectedTemplate] && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-white">Capabilities</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {templates[selectedTemplate].base_capabilities.map((capability, index) => (
                              <Badge key={index} variant="secondary" className="bg-cyan-900 text-cyan-100">
                                {capability}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-white">Required Skills</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {templates[selectedTemplate].required_skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requirements" className="text-white">Custom Requirements (JSON)</Label>
                      <Textarea
                        id="requirements"
                        placeholder='{"specialization": "Advanced threat hunting", "priority_domains": ["APT analysis", "Zero-day detection"]}'
                        value={customRequirements}
                        onChange={(e) => setCustomRequirements(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white h-32"
                      />
                    </div>

                    {loading && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white">
                          <Cpu className="h-4 w-4 animate-spin" />
                          Generating AI Agent...
                        </div>
                        <Progress value={deploymentProgress} className="bg-slate-700" />
                      </div>
                    )}

                    <Button 
                      onClick={generateAgent} 
                      disabled={!selectedTemplate || loading}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      {loading ? (
                        <>
                          <Cpu className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Generate AI Agent
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedAgents.map((agent) => (
                <Card key={agent.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTemplateIcon(agent.role.toLowerCase().replace(/\s+/g, '_'))}
                        {agent.name}
                      </div>
                      {getStatusIcon(agent.status)}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {agent.specialization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Role:</span>
                        <span className="text-white">{agent.role}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Created:</span>
                        <span className="text-white">
                          {new Date(agent.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Status:</span>
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => deployAgent(agent)}
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Deploy
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {generatedAgents.length === 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-12">
                  <div className="text-center text-slate-400">
                    <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No Agents Generated</h3>
                    <p>Generate your first AI agent using the configuration panel</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(templates).map(([key, template]) => (
                <Card key={key} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {getTemplateIcon(key)}
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {template.specialization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white text-sm">Role</Label>
                      <p className="text-slate-300 text-sm mt-1">{template.role}</p>
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm">Base Capabilities</Label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.base_capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="secondary" className="bg-cyan-900 text-cyan-100 text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {template.base_capabilities.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            +{template.base_capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(key);
                        setActiveTab('generator');
                      }}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      Use Template
                    </Button>
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