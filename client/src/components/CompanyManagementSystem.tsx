import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AIAgentCreationWizard from './AIAgentCreationWizard';
import { 
  Building2, 
  Users, 
  Bot, 
  Shield, 
  TrendingUp, 
  Activity, 
  Eye, 
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  Database,
  Zap,
  Target,
  Globe,
  Lock,
  Unlock,
  Star,
  Award,
  Calendar,
  FileText,
  Download,
  Search,
  Filter,
  RefreshCw,
  UserPlus,
  BotIcon,
  Cog
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  status: 'ACTIVE' | 'INACTIVE' | 'TRIAL' | 'SUSPENDED';
  createdAt: string;
  lastActivity: string;
  securityScore: number;
  aiAgentsCount: number;
  employeesCount: number;
  subscription: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
}

interface AIAgent {
  id: string;
  companyId: string;
  name: string;
  role: string;
  specialization: string;
  status: 'ACTIVE' | 'INACTIVE' | 'TRAINING' | 'MAINTENANCE';
  efficiency: number;
  tasksCompleted: number;
  uptime: number;
  lastActive: string;
  capabilities: string[];
  assignedDepartment: string;
}

interface ProcessMetrics {
  companyId: string;
  date: string;
  threatsDetected: number;
  incidentsResolved: number;
  securityScans: number;
  systemUptime: number;
  aiAgentUtilization: number;
  userSatisfaction: number;
  complianceScore: number;
  dataProcessed: number;
}

export default function CompanyManagementSystem() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [processMetrics, setProcessMetrics] = useState<ProcessMetrics[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [newCompany, setNewCompany] = useState({
    name: '',
    domain: '',
    industry: '',
    size: '',
    location: '',
    contactPerson: '',
    email: '',
    phone: ''
  });
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    specialization: '',
    capabilities: '',
    assignedDepartment: ''
  });

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Initialize sample companies
    setCompanies([
      {
        id: 'comp-001',
        name: 'TechCorp Solutions',
        domain: 'techcorp.com',
        industry: 'Technology',
        size: 'Large (500+ employees)',
        status: 'ACTIVE',
        createdAt: '2024-01-15',
        lastActivity: new Date(Date.now() - 3600000).toISOString(),
        securityScore: 92,
        aiAgentsCount: 15,
        employeesCount: 750,
        subscription: 'ENTERPRISE',
        location: 'San Francisco, CA',
        contactPerson: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone: '+1-555-0123'
      },
      {
        id: 'comp-002',
        name: 'SecureBank Financial',
        domain: 'securebank.com',
        industry: 'Finance',
        size: 'Medium (100-500 employees)',
        status: 'ACTIVE',
        createdAt: '2024-02-20',
        lastActivity: new Date(Date.now() - 1800000).toISOString(),
        securityScore: 88,
        aiAgentsCount: 12,
        employeesCount: 350,
        subscription: 'PREMIUM',
        location: 'New York, NY',
        contactPerson: 'Sarah Johnson',
        email: 'sarah.johnson@securebank.com',
        phone: '+1-555-0456'
      },
      {
        id: 'comp-003',
        name: 'HealthTech Innovations',
        domain: 'healthtech.io',
        industry: 'Healthcare',
        size: 'Small (10-100 employees)',
        status: 'TRIAL',
        createdAt: '2024-03-10',
        lastActivity: new Date(Date.now() - 7200000).toISOString(),
        securityScore: 75,
        aiAgentsCount: 5,
        employeesCount: 85,
        subscription: 'BASIC',
        location: 'Boston, MA',
        contactPerson: 'Dr. Michael Chen',
        email: 'michael.chen@healthtech.io',
        phone: '+1-555-0789'
      }
    ]);

    // Initialize AI agents
    setAIAgents([
      {
        id: 'agent-001',
        companyId: 'comp-001',
        name: 'CyberGuard Alpha',
        role: 'Threat Detection Specialist',
        specialization: 'Network Security',
        status: 'ACTIVE',
        efficiency: 96,
        tasksCompleted: 2847,
        uptime: 99.8,
        lastActive: new Date(Date.now() - 300000).toISOString(),
        capabilities: ['Threat Detection', 'Malware Analysis', 'Network Monitoring'],
        assignedDepartment: 'Security Operations'
      },
      {
        id: 'agent-002',
        companyId: 'comp-001',
        name: 'DataShield Beta',
        role: 'Data Protection Agent',
        specialization: 'Data Loss Prevention',
        status: 'ACTIVE',
        efficiency: 94,
        tasksCompleted: 1923,
        uptime: 99.5,
        lastActive: new Date(Date.now() - 600000).toISOString(),
        capabilities: ['Data Classification', 'Encryption Management', 'Access Control'],
        assignedDepartment: 'Data Security'
      },
      {
        id: 'agent-003',
        companyId: 'comp-002',
        name: 'ComplianceBot Gamma',
        role: 'Compliance Monitor',
        specialization: 'Regulatory Compliance',
        status: 'ACTIVE',
        efficiency: 91,
        tasksCompleted: 1567,
        uptime: 98.9,
        lastActive: new Date(Date.now() - 900000).toISOString(),
        capabilities: ['Regulatory Scanning', 'Policy Enforcement', 'Audit Reporting'],
        assignedDepartment: 'Compliance'
      }
    ]);

    // Initialize process metrics
    const today = new Date();
    const metricsData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      metricsData.push({
        companyId: 'comp-001',
        date: date.toISOString().split('T')[0],
        threatsDetected: Math.floor(Math.random() * 20) + 5,
        incidentsResolved: Math.floor(Math.random() * 15) + 3,
        securityScans: Math.floor(Math.random() * 100) + 50,
        systemUptime: 95 + Math.random() * 5,
        aiAgentUtilization: 80 + Math.random() * 20,
        userSatisfaction: 85 + Math.random() * 15,
        complianceScore: 90 + Math.random() * 10,
        dataProcessed: Math.floor(Math.random() * 1000) + 500
      });
    }
    setProcessMetrics(metricsData);
  };

  const handleAddCompany = () => {
    const company: Company = {
      id: `comp-${Date.now()}`,
      name: newCompany.name,
      domain: newCompany.domain,
      industry: newCompany.industry,
      size: newCompany.size,
      status: 'TRIAL',
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString(),
      securityScore: 70,
      aiAgentsCount: 0,
      employeesCount: 0,
      subscription: 'BASIC',
      location: newCompany.location,
      contactPerson: newCompany.contactPerson,
      email: newCompany.email,
      phone: newCompany.phone
    };

    setCompanies(prev => [...prev, company]);
    setNewCompany({
      name: '',
      domain: '',
      industry: '',
      size: '',
      location: '',
      contactPerson: '',
      email: '',
      phone: ''
    });
    setShowAddCompany(false);
  };

  const handleAddAgent = () => {
    if (!selectedCompany) return;

    const agent: AIAgent = {
      id: `agent-${Date.now()}`,
      companyId: selectedCompany.id,
      name: newAgent.name,
      role: newAgent.role,
      specialization: newAgent.specialization,
      status: 'TRAINING',
      efficiency: 85,
      tasksCompleted: 0,
      uptime: 100,
      lastActive: new Date().toISOString(),
      capabilities: newAgent.capabilities.split(',').map(cap => cap.trim()),
      assignedDepartment: newAgent.assignedDepartment
    };

    setAIAgents(prev => [...prev, agent]);
    
    // Update company agent count
    setCompanies(prev => prev.map(comp => 
      comp.id === selectedCompany.id 
        ? { ...comp, aiAgentsCount: comp.aiAgentsCount + 1 }
        : comp
    ));

    setNewAgent({
      name: '',
      role: '',
      specialization: '',
      capabilities: '',
      assignedDepartment: ''
    });
    setShowAddAgent(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500 text-white';
      case 'INACTIVE': return 'bg-gray-500 text-white';
      case 'TRIAL': return 'bg-blue-500 text-white';
      case 'SUSPENDED': return 'bg-red-500 text-white';
      case 'TRAINING': return 'bg-yellow-500 text-black';
      case 'MAINTENANCE': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'BASIC': return 'bg-blue-500 text-white';
      case 'PREMIUM': return 'bg-purple-500 text-white';
      case 'ENTERPRISE': return 'bg-gold-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getCompanyAgents = (companyId: string) => {
    return aiAgents.filter(agent => agent.companyId === companyId);
  };

  const getCompanyMetrics = (companyId: string) => {
    return processMetrics.filter(metric => metric.companyId === companyId).slice(0, 7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Company Management System
            </h1>
            <p className="text-gray-300 mt-2">
              Manage client companies, AI agents, and monitor their security operations
            </p>
          </div>
          <Button 
            onClick={() => setShowAddCompany(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="TRIAL">Trial</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="companies" className="data-[state=active]:bg-cyan-600">
              <Building2 className="w-4 h-4 mr-2" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-cyan-600">
              <Bot className="w-4 h-4 mr-2" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Create AI
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="bg-gray-900/80 border-gray-700 hover:border-cyan-500/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{company.name}</CardTitle>
                      <Badge className={getStatusColor(company.status)}>
                        {company.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {company.domain} • {company.industry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Security Score</span>
                        <div className="flex items-center gap-2">
                          <Progress value={company.securityScore} className="h-2" />
                          <span className="text-cyan-400 font-semibold">{company.securityScore}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Subscription</span>
                        <div>
                          <Badge className={getSubscriptionColor(company.subscription)}>
                            {company.subscription}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">AI Agents</span>
                        <div className="text-white font-semibold">{company.aiAgentsCount}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Employees</span>
                        <div className="text-white font-semibold">{company.employeesCount}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Contact:</span>
                        <span className="text-white">{company.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{company.location}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedCompany(company)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowAddAgent(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-400 hover:bg-green-500/20"
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            {selectedCompany && (
              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    AI Agents for {selectedCompany.name}
                  </CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>
                      Manage and monitor AI security agents
                    </CardDescription>
                    <Button
                      onClick={() => setShowAddAgent(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agent
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getCompanyAgents(selectedCompany.id).map((agent) => (
                      <div key={agent.id} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">{agent.name}</h4>
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Role:</span>
                            <span className="text-white">{agent.role}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Department:</span>
                            <span className="text-white">{agent.assignedDepartment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Efficiency:</span>
                            <span className="text-cyan-400 font-semibold">{agent.efficiency}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tasks Completed:</span>
                            <span className="text-green-400 font-semibold">{agent.tasksCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Uptime:</span>
                            <span className="text-blue-400 font-semibold">{agent.uptime}%</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-gray-400 text-sm">Capabilities:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {agent.capabilities.map((cap, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cap}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* AI Creation Tab */}
          <TabsContent value="create" className="space-y-6">
            {selectedCompany ? (
              <AIAgentCreationWizard 
                companyId={selectedCompany.id}
                onAgentCreated={(agent) => {
                  // Update agents list
                  setAIAgents(prev => [...prev, {
                    id: agent.id,
                    companyId: selectedCompany.id,
                    name: agent.name,
                    role: agent.role,
                    specialization: agent.specialization,
                    status: agent.status,
                    efficiency: agent.performance.efficiency,
                    tasksCompleted: agent.performance.tasksCompleted,
                    uptime: agent.performance.uptime,
                    lastActive: agent.createdAt,
                    capabilities: agent.capabilities,
                    assignedDepartment: 'Security Operations'
                  }]);
                  
                  // Update company agent count
                  setCompanies(prev => prev.map(comp => 
                    comp.id === selectedCompany.id 
                      ? { ...comp, aiAgentsCount: comp.aiAgentsCount + 1 }
                      : comp
                  ));
                }}
                onEngineerCreated={(engineer) => {
                  // Engineers are managed globally, so we could add them to a global list
                  console.log('Engineer created:', engineer);
                }}
              />
            ) : (
              <Card className="bg-gray-900/80 border-gray-700">
                <CardContent className="p-12 text-center">
                  <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Company</h3>
                  <p className="text-gray-400">
                    Choose a company from the Companies tab to create AI agents and engineers for them.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {selectedCompany && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getCompanyMetrics(selectedCompany.id).slice(0, 1).map((metrics) => (
                  <React.Fragment key={metrics.date}>
                    <Card className="bg-gray-900/80 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Threats Detected</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-400">{metrics.threatsDetected}</div>
                        <p className="text-xs text-gray-500">Last 24 hours</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Incidents Resolved</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-400">{metrics.incidentsResolved}</div>
                        <p className="text-xs text-gray-500">Last 24 hours</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">System Uptime</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-400">{metrics.systemUptime.toFixed(1)}%</div>
                        <p className="text-xs text-gray-500">Current period</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">AI Utilization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-400">{metrics.aiAgentUtilization.toFixed(1)}%</div>
                        <p className="text-xs text-gray-500">Agent efficiency</p>
                      </CardContent>
                    </Card>
                  </React.Fragment>
                ))}
              </div>
            )}

            {selectedCompany && (
              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Daily Process Analytics</CardTitle>
                  <CardDescription>
                    Comprehensive monitoring of {selectedCompany.name}'s security operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getCompanyMetrics(selectedCompany.id).map((metric) => (
                      <div key={metric.date} className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">{new Date(metric.date).toLocaleDateString()}</h4>
                          <div className="flex gap-2">
                            <Badge className="bg-green-600 text-white">
                              Compliance: {metric.complianceScore.toFixed(0)}%
                            </Badge>
                            <Badge className="bg-blue-600 text-white">
                              Satisfaction: {metric.userSatisfaction.toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Security Scans</span>
                            <div className="text-white font-semibold">{metric.securityScans}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Data Processed</span>
                            <div className="text-white font-semibold">{metric.dataProcessed} GB</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Threats</span>
                            <div className="text-red-400 font-semibold">{metric.threatsDetected}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Resolved</span>
                            <div className="text-green-400 font-semibold">{metric.incidentsResolved}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Company Modal */}
        {showAddCompany && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white">Add New Company</CardTitle>
                <CardDescription>Register a new client company for security management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
                    <Input
                      id="companyName"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="TechCorp Inc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain" className="text-gray-300">Domain</Label>
                    <Input
                      id="domain"
                      value={newCompany.domain}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, domain: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="techcorp.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                    <Input
                      id="industry"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, industry: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Technology"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-gray-300">Company Size</Label>
                    <select
                      value={newCompany.size}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                      <option value="">Select size</option>
                      <option value="Small (10-100 employees)">Small (10-100 employees)</option>
                      <option value="Medium (100-500 employees)">Medium (100-500 employees)</option>
                      <option value="Large (500+ employees)">Large (500+ employees)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <Input
                    id="location"
                    value={newCompany.location}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson" className="text-gray-300">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={newCompany.contactPerson}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="phone"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="+1-555-0123"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="john.smith@techcorp.com"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddCompany}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add Company
                  </Button>
                  <Button
                    onClick={() => setShowAddCompany(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Agent Modal */}
        {showAddAgent && selectedCompany && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Add AI Agent for {selectedCompany.name}</CardTitle>
                <CardDescription>Deploy a new AI security agent to the company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agentName" className="text-gray-300">Agent Name</Label>
                    <Input
                      id="agentName"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="CyberGuard Delta"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agentRole" className="text-gray-300">Role</Label>
                    <Input
                      id="agentRole"
                      value={newAgent.role}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, role: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Threat Detection Specialist"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization" className="text-gray-300">Specialization</Label>
                    <Input
                      id="specialization"
                      value={newAgent.specialization}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, specialization: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Network Security"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-gray-300">Department</Label>
                    <Input
                      id="department"
                      value={newAgent.assignedDepartment}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, assignedDepartment: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Security Operations"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="capabilities" className="text-gray-300">Capabilities (comma-separated)</Label>
                  <Textarea
                    id="capabilities"
                    value={newAgent.capabilities}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, capabilities: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Threat Detection, Malware Analysis, Network Monitoring"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddAgent}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <BotIcon className="w-4 h-4 mr-2" />
                    Deploy Agent
                  </Button>
                  <Button
                    onClick={() => setShowAddAgent(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}