import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown,
  Bot,
  Eye,
  Shield,
  Zap,
  Brain,
  Settings,
  Activity,
  Database,
  Network,
  Lock,
  Unlock,
  Play,
  Pause,

  Trash2,
  Plus,
  Edit,
  Copy,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Crosshair,
  Radar,
  Scan,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  Flame,
  Sparkles,
  Globe,
  Server,
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Cable,
  Router,
  KeyRound,
  Fingerprint,
  Code,
  Terminal,
  Command,
  FileText,
  Folder,
  Archive,
  Building2,
  Users
} from 'lucide-react';
import CompanyManagementSystem from './CompanyManagementSystem';
import FounderCompanyControl from './FounderCompanyControl';
import FounderUserManagement from './FounderUserManagement';
import AIEmployeeAccessManager from './AIEmployeeAccessManager';

interface AgentData {
  id: string;
  name: string;
  function: string;
  model: string;
  visibility: 'stealth' | 'visible' | 'phantom';
  assignment: string;
  status: 'active' | 'inactive' | 'deployed' | 'training';
  clientId?: string;
  performance: {
    accuracy: number;
    responseTime: number;
    tasksCompleted: number;
    stealthScore: number;
  };
  createdAt: string;
  lastActive: string;
}

interface FounderPortalProps {
  userData: any;
  onLogout: () => void;
}

export default function SatyaXFounderPortal({ userData, onLogout }: FounderPortalProps) {
  const [activeTab, setActiveTab] = useState('command');
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [systemMetrics, setSystemMetrics] = useState({
    totalAgents: 0,
    activeDeployments: 0,
    threatsNeutralized: 0,
    clientsProtected: 0,
    stealthLevel: 98.7
  });
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with demo agents
    const demoAgents: AgentData[] = [
      {
        id: 'agent_001',
        name: 'PhishSniper',
        function: 'Email Threat Detection',
        model: 'Claude-Sonnet-4-Stealth',
        visibility: 'stealth',
        assignment: 'Global Email Security',
        status: 'active',
        clientId: 'client_001',
        performance: {
          accuracy: 98.7,
          responseTime: 45,
          tasksCompleted: 15847,
          stealthScore: 99.2
        },
        createdAt: '2024-01-15T10:30:00Z',
        lastActive: new Date().toISOString()
      },
      {
        id: 'agent_002',
        name: 'PatchGenie',
        function: 'Automated Vulnerability Patching',
        model: 'GPT-4-Stealth-Ops',
        visibility: 'phantom',
        assignment: 'Infrastructure Security',
        status: 'deployed',
        clientId: 'client_002',
        performance: {
          accuracy: 96.3,
          responseTime: 120,
          tasksCompleted: 8234,
          stealthScore: 97.8
        },
        createdAt: '2024-01-20T14:15:00Z',
        lastActive: new Date().toISOString()
      },
      {
        id: 'agent_003',
        name: 'ThreatHunter',
        function: 'Advanced Persistent Threat Detection',
        model: 'Custom-Neural-Ensemble',
        visibility: 'stealth',
        assignment: 'Network Surveillance',
        status: 'active',
        clientId: 'client_003',
        performance: {
          accuracy: 94.8,
          responseTime: 78,
          tasksCompleted: 23156,
          stealthScore: 98.9
        },
        createdAt: '2024-01-25T09:45:00Z',
        lastActive: new Date().toISOString()
      }
    ];

    setAgents(demoAgents);
    setSystemMetrics({
      totalAgents: demoAgents.length,
      activeDeployments: demoAgents.filter(a => a.status === 'active' || a.status === 'deployed').length,
      threatsNeutralized: 47293,
      clientsProtected: 156,
      stealthLevel: 98.7
    });
  }, []);

  const executeCommand = (command: string) => {
    setCommandHistory(prev => [...prev, `> ${command}`, executeFounderCommand(command)]);
    setCommandInput('');
  };

  const executeFounderCommand = (command: string): string => {
    const [cmd, ...args] = command.trim().split(' ');
    
    switch (cmd.toLowerCase()) {
      case 'create_agent':
        return `✓ Agent created: ${args[0] || 'NewAgent'} | Function: ${args[1] || 'General'} | Status: Initializing`;
      
      case 'assign_agent':
        return `✓ Agent ${args[0]} assigned to client ${args[1]} | Mode: ${args[2] || 'stealth'}`;
      
      case 'withdraw_agent':
        return `✓ Agent ${args[0]} withdrawn | Clean exit completed | Logs purged`;
      
      case 'monitor':
        return `✓ Monitoring client ${args[0]} | 47 endpoints | 12 active threats | Status: Secure`;
      
      case 'simulate_attack':
        return `✓ Red team simulation initiated | Vector: ${args[1]} | Target: ${args[0]} | ETA: 5 minutes`;
      
      case 'trigger_autopatch':
        return `✓ AutoPatch queue activated | Client: ${args[0]} | 8 critical patches queued | Deploying silently`;
      
      case 'summarize_logs':
        return `✓ Log analysis complete | Timeframe: ${args[1] || 'last 24h'} | 0 anomalies | 15 routine events`;
      
      case 'generate_compliance_report':
        return `✓ Compliance report generated | Standard: ${args[1] || 'SOC2'} | Status: 98.7% compliant`;
      
      case 'clone_agent':
        return `✓ Agent ${args[0]} cloned | Sandbox mode: ${args[1] || 'enabled'} | Clone ID: ${args[0]}_clone_${Date.now()}`;
      
      case 'query_vault':
        return `✓ Vault query: "${args.join(' ')}" | 23 matches found | Access level: FOUNDER`;
      
      case 'purge_agent_logs':
        return `✓ Agent ${args[0]} logs purged | 14,567 entries cleared | Attribution removed`;
      
      case 'override_detection_threshold':
        return `✓ Detection threshold updated | Agent: ${args[0]} | New threshold: ${args[1]}% | Applied instantly`;
      
      case 'help':
        return `Available commands: create_agent, assign_agent, withdraw_agent, monitor, simulate_attack, trigger_autopatch, summarize_logs, generate_compliance_report, clone_agent, query_vault, purge_agent_logs, override_detection_threshold`;
      
      default:
        return `⚠ Unknown command: ${cmd} | Type 'help' for available commands`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl">
                <Crown className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SatyaX Founder Portal</h1>
                <p className="text-purple-400 font-medium">Root Admin Control Interface</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-500/20 text-purple-200 border border-purple-500/40 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Founder Access: {userData.name}
              </Badge>
              <Button variant="outline" onClick={onLogout} className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                Secure Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6 text-center">
              <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{systemMetrics.totalAgents}</div>
              <div className="text-gray-400 text-sm">Total Agents</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{systemMetrics.activeDeployments}</div>
              <div className="text-gray-400 text-sm">Active Deployments</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{systemMetrics.threatsNeutralized.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Threats Neutralized</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{systemMetrics.clientsProtected}</div>
              <div className="text-gray-400 text-sm">Clients Protected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{systemMetrics.stealthLevel}%</div>
              <div className="text-gray-400 text-sm">Stealth Level</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-gray-700/50 p-2 rounded-xl">
            <TabsTrigger value="command" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Terminal className="w-4 h-4 mr-2" />
              Command Center
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Bot className="w-4 h-4 mr-2" />
              Agent Control
            </TabsTrigger>
            <TabsTrigger value="telemetry" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Monitor className="w-4 h-4 mr-2" />
              Telemetry Master
            </TabsTrigger>
            <TabsTrigger value="vault" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Archive className="w-4 h-4 mr-2" />
              Vault Inspector
            </TabsTrigger>
            <TabsTrigger value="redteam" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Target className="w-4 h-4 mr-2" />
              Red Team Sim
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Building2 className="w-4 h-4 mr-2" />
              Company Control
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="ai-access" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Bot className="w-4 h-4 mr-2" />
              AI Employee Access
            </TabsTrigger>
          </TabsList>

          {/* Command Center */}
          <TabsContent value="command" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  SatyaX Command Interface
                </CardTitle>
                <CardDescription>Execute founder-level commands to control the AI agent mesh</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                  {commandHistory.length === 0 ? (
                    <div className="text-green-400">SatyaX v5.0 - Founder Terminal Ready</div>
                  ) : (
                    commandHistory.map((line, index) => (
                      <div key={index} className={line.startsWith('>') ? 'text-cyan-400' : 'text-green-400'}>
                        {line}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && executeCommand(commandInput)}
                    placeholder="Enter SatyaX command..."
                    className="bg-gray-800 border-gray-700 text-white font-mono"
                  />
                  <Button 
                    onClick={() => executeCommand(commandInput)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Execute
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    'help',
                    'monitor client_001',
                    'simulate_attack client_002 phishing',
                    'trigger_autopatch client_003',
                    'create_agent StealthGuard detection',
                    'query_vault breach_logs',
                    'purge_agent_logs agent_001',
                    'override_detection_threshold agent_002 85'
                  ].map((cmd, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setCommandInput(cmd)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 text-xs"
                    >
                      {cmd}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agent Control */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-900/50 border-gray-700/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Bot className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                            <CardDescription className="text-purple-400">{agent.function}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            agent.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            agent.status === 'deployed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                            agent.status === 'training' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }`}>
                            {agent.status}
                          </Badge>
                          <Badge className={`${
                            agent.visibility === 'stealth' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                            agent.visibility === 'phantom' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {agent.visibility}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Accuracy</div>
                          <div className="text-green-400 font-semibold">{agent.performance.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Response Time</div>
                          <div className="text-cyan-400 font-semibold">{agent.performance.responseTime}ms</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Tasks</div>
                          <div className="text-blue-400 font-semibold">{agent.performance.tasksCompleted.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Stealth Score</div>
                          <div className="text-purple-400 font-semibold">{agent.performance.stealthScore}%</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/20">
                          <Play className="w-4 h-4 mr-1" />
                          Deploy
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20">
                          <Pause className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
                          <Copy className="w-4 h-4 mr-1" />
                          Clone
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Purge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Agent Generator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Agent Name</Label>
                      <Input className="bg-gray-800 border-gray-700 text-white" placeholder="e.g., ThreatHunter" />
                    </div>
                    <div>
                      <Label className="text-gray-300">Function</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select function" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="detection">Threat Detection</SelectItem>
                          <SelectItem value="prevention">Attack Prevention</SelectItem>
                          <SelectItem value="forensics">Digital Forensics</SelectItem>
                          <SelectItem value="compliance">Compliance Monitoring</SelectItem>
                          <SelectItem value="patching">Auto Patching</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Visibility Mode</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="stealth">Stealth</SelectItem>
                          <SelectItem value="phantom">Phantom</SelectItem>
                          <SelectItem value="visible">Visible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Agent
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Telemetry Master */}
          <TabsContent value="telemetry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Global Threat Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-cyan-400">Real-time Global Monitoring</div>
                      <div className="text-gray-400 text-sm">156 clients • 47,293 threats blocked</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Network Traffic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'HTTP/HTTPS', value: 78, color: 'bg-green-500' },
                      { name: 'DNS Queries', value: 65, color: 'bg-blue-500' },
                      { name: 'SSH Connections', value: 23, color: 'bg-yellow-500' },
                      { name: 'Suspicious Traffic', value: 8, color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{item.name}</span>
                          <span className="text-white">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vault Inspector */}
          <TabsContent value="vault" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Archive className="w-5 h-5 text-purple-400" />
                  Encrypted Forensic Vault
                </CardTitle>
                <CardDescription>Access historical data, breach archives, and forensic evidence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-black/30 border-gray-700/50">
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">Incident Reports</div>
                      <div className="text-gray-400 text-sm">2,847 entries</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-gray-700/50">
                    <CardContent className="p-4 text-center">
                      <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">Breach Evidence</div>
                      <div className="text-gray-400 text-sm">1,234 cases</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-gray-700/50">
                    <CardContent className="p-4 text-center">
                      <Code className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">Agent Logs</div>
                      <div className="text-gray-400 text-sm">45,678 records</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search vault (e.g., 'breach_2024', 'agent_logs', 'compliance')"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Search className="w-4 h-4 mr-2" />
                    Query
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Red Team Simulator */}
          <TabsContent value="redteam" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-400" />
                  Red Team Attack Simulator
                </CardTitle>
                <CardDescription>Launch controlled attack simulations to test client defenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Target Client</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="client_001">TechCorp Global</SelectItem>
                          <SelectItem value="client_002">FinanceFirst Bank</SelectItem>
                          <SelectItem value="client_003">HealthSecure Ltd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Attack Vector</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select attack type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="phishing">Phishing Campaign</SelectItem>
                          <SelectItem value="malware">Malware Injection</SelectItem>
                          <SelectItem value="social_eng">Social Engineering</SelectItem>
                          <SelectItem value="ddos">DDoS Attack</SelectItem>
                          <SelectItem value="apt">Advanced Persistent Threat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Intensity Level</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select intensity" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="low">Low - Basic Testing</SelectItem>
                          <SelectItem value="medium">Medium - Standard Simulation</SelectItem>
                          <SelectItem value="high">High - Advanced Scenarios</SelectItem>
                          <SelectItem value="extreme">Extreme - Nation-State Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Duration (minutes)</Label>
                      <Input type="number" defaultValue="30" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Notification</Label>
                      <div className="flex items-center gap-3">
                        <Switch />
                        <span className="text-gray-300 text-sm">Notify client of simulation</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Report Generation</Label>
                      <div className="flex items-center gap-3">
                        <Switch defaultChecked />
                        <span className="text-gray-300 text-sm">Auto-generate report</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 flex-1">
                    <Target className="w-4 h-4 mr-2" />
                    Launch Simulation
                  </Button>
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Attack
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Management System */}
          <TabsContent value="companies" className="space-y-6">
            <FounderCompanyControl />
          </TabsContent>

          {/* User Management System */}
          <TabsContent value="users" className="space-y-6">
            <FounderUserManagement currentUser={{
              ...userData,
              isFounder: true,
              username: 'rishabhkapoor'
            }} />
          </TabsContent>

          {/* AI Employee Access Management */}
          <TabsContent value="ai-access" className="space-y-6">
            <AIEmployeeAccessManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}