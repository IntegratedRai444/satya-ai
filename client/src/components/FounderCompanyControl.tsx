import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  Users, 
  Bot, 
  BarChart3,
  Settings,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Database,
  Shield,
  Target,
  Activity,
  TrendingUp,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
  Network,
  Server,
  Cpu,
  HardDrive,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Briefcase,
  Code,
  Wrench,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Plus
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  employeeCount: number;
  status: string;
  subscriptionTier: string;
  revenue: number;
  location: string;
  foundedYear: number;
  website: string;
  email: string;
  phone: string;
  securityScore: number;
  complianceStatus: string;
  lastAudit: string;
  nextAudit: string;
  riskLevel: string;
  dataPoints: {
    totalAssets: number;
    criticalSystems: number;
    vulnerabilities: number;
    incidents: number;
    threatsBlocked: number;
    complianceGap: number;
  };
  aiAgents: number;
  aiEngineers: number;
  monthlyMetrics: {
    threatsDetected: number;
    incidentsResolved: number;
    systemUptime: number;
    userSatisfaction: number;
    costSavings: number;
  };
}

interface AIJob {
  id: string;
  title: string;
  category: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  assignedTo?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  estimatedTime: string;
  deadline: string;
  description: string;
  skillsRequired: string[];
  progress: number;
}

interface VoiceSession {
  isActive: boolean;
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  response: string;
  confidence: number;
}

const AI_JOB_TEMPLATES = [
  // Security Operations (10 jobs)
  { title: 'Threat Intelligence Analysis', category: 'Security', priority: 'HIGH' as const, estimatedTime: '2-4 hours', skills: ['Threat Analysis', 'OSINT', 'Malware Research'] },
  { title: 'Vulnerability Assessment', category: 'Security', priority: 'HIGH' as const, estimatedTime: '4-6 hours', skills: ['Penetration Testing', 'CVE Analysis', 'Risk Assessment'] },
  { title: 'Incident Response Coordination', category: 'Security', priority: 'CRITICAL' as const, estimatedTime: '1-2 hours', skills: ['Forensics', 'Crisis Management', 'Documentation'] },
  { title: 'Security Policy Review', category: 'Security', priority: 'MEDIUM' as const, estimatedTime: '3-5 hours', skills: ['Policy Analysis', 'Compliance', 'Risk Management'] },
  { title: 'Phishing Campaign Analysis', category: 'Security', priority: 'HIGH' as const, estimatedTime: '2-3 hours', skills: ['Email Security', 'Social Engineering', 'User Training'] },
  { title: 'Network Traffic Monitoring', category: 'Security', priority: 'MEDIUM' as const, estimatedTime: '6-8 hours', skills: ['Network Analysis', 'IDS/IPS', 'Log Analysis'] },
  { title: 'Malware Reverse Engineering', category: 'Security', priority: 'HIGH' as const, estimatedTime: '8-12 hours', skills: ['Reverse Engineering', 'Assembly', 'Dynamic Analysis'] },
  { title: 'Security Awareness Training', category: 'Security', priority: 'LOW' as const, estimatedTime: '4-6 hours', skills: ['Training Design', 'Communication', 'Psychology'] },
  { title: 'Penetration Testing Report', category: 'Security', priority: 'HIGH' as const, estimatedTime: '6-10 hours', skills: ['Penetration Testing', 'Report Writing', 'Risk Analysis'] },
  { title: 'Zero-Day Vulnerability Research', category: 'Security', priority: 'CRITICAL' as const, estimatedTime: '20-40 hours', skills: ['Vulnerability Research', 'Exploit Development', 'Code Analysis'] },

  // Compliance & Governance (8 jobs)
  { title: 'GDPR Compliance Audit', category: 'Compliance', priority: 'HIGH' as const, estimatedTime: '8-12 hours', skills: ['GDPR', 'Privacy Law', 'Data Mapping'] },
  { title: 'SOC 2 Type II Assessment', category: 'Compliance', priority: 'HIGH' as const, estimatedTime: '16-24 hours', skills: ['SOC 2', 'Control Testing', 'Audit Management'] },
  { title: 'Risk Register Update', category: 'Compliance', priority: 'MEDIUM' as const, estimatedTime: '4-6 hours', skills: ['Risk Management', 'Documentation', 'Analysis'] },
  { title: 'Vendor Security Assessment', category: 'Compliance', priority: 'MEDIUM' as const, estimatedTime: '6-8 hours', skills: ['Vendor Management', 'Due Diligence', 'Contracts'] },
  { title: 'Business Continuity Planning', category: 'Compliance', priority: 'HIGH' as const, estimatedTime: '12-16 hours', skills: ['BCP', 'Disaster Recovery', 'Crisis Management'] },
  { title: 'Data Classification Review', category: 'Compliance', priority: 'MEDIUM' as const, estimatedTime: '8-10 hours', skills: ['Data Classification', 'Information Security', 'Taxonomy'] },
  { title: 'Regulatory Compliance Report', category: 'Compliance', priority: 'HIGH' as const, estimatedTime: '6-8 hours', skills: ['Regulatory Knowledge', 'Report Writing', 'Analysis'] },
  { title: 'Third-Party Risk Assessment', category: 'Compliance', priority: 'MEDIUM' as const, estimatedTime: '10-14 hours', skills: ['Risk Assessment', 'Vendor Analysis', 'Documentation'] },

  // Data Analysis & Intelligence (8 jobs)
  { title: 'Security Metrics Dashboard', category: 'Analytics', priority: 'MEDIUM' as const, estimatedTime: '6-8 hours', skills: ['Data Visualization', 'KPIs', 'Business Intelligence'] },
  { title: 'Threat Trend Analysis', category: 'Analytics', priority: 'HIGH' as const, estimatedTime: '4-6 hours', skills: ['Statistical Analysis', 'Trend Forecasting', 'Data Mining'] },
  { title: 'User Behavior Analytics', category: 'Analytics', priority: 'MEDIUM' as const, estimatedTime: '8-12 hours', skills: ['UEBA', 'Machine Learning', 'Anomaly Detection'] },
  { title: 'Cost-Benefit Security Analysis', category: 'Analytics', priority: 'MEDIUM' as const, estimatedTime: '6-10 hours', skills: ['Financial Analysis', 'ROI Calculation', 'Business Analysis'] },
  { title: 'Log Correlation Analysis', category: 'Analytics', priority: 'HIGH' as const, estimatedTime: '4-8 hours', skills: ['SIEM', 'Log Analysis', 'Pattern Recognition'] },
  { title: 'Security ROI Measurement', category: 'Analytics', priority: 'LOW' as const, estimatedTime: '8-12 hours', skills: ['Financial Modeling', 'Metrics', 'Reporting'] },
  { title: 'Predictive Threat Modeling', category: 'Analytics', priority: 'HIGH' as const, estimatedTime: '12-16 hours', skills: ['Machine Learning', 'Threat Modeling', 'Predictive Analytics'] },
  { title: 'Performance Optimization Study', category: 'Analytics', priority: 'MEDIUM' as const, estimatedTime: '10-14 hours', skills: ['Performance Analysis', 'Optimization', 'Systems Analysis'] },

  // Technical Operations (8 jobs)
  { title: 'SIEM Rule Tuning', category: 'Technical', priority: 'HIGH' as const, estimatedTime: '6-8 hours', skills: ['SIEM Administration', 'Rule Development', 'Alert Management'] },
  { title: 'Firewall Configuration Review', category: 'Technical', priority: 'MEDIUM' as const, estimatedTime: '4-6 hours', skills: ['Firewall Management', 'Network Security', 'Policy Review'] },
  { title: 'Endpoint Security Deployment', category: 'Technical', priority: 'HIGH' as const, estimatedTime: '8-12 hours', skills: ['Endpoint Security', 'Deployment', 'Configuration Management'] },
  { title: 'Security Tool Integration', category: 'Technical', priority: 'MEDIUM' as const, estimatedTime: '12-16 hours', skills: ['API Integration', 'Tool Administration', 'Automation'] },
  { title: 'Backup System Verification', category: 'Technical', priority: 'HIGH' as const, estimatedTime: '4-6 hours', skills: ['Backup Management', 'Data Recovery', 'Testing'] },
  { title: 'Access Control Audit', category: 'Technical', priority: 'MEDIUM' as const, estimatedTime: '6-10 hours', skills: ['Identity Management', 'Access Control', 'Privilege Review'] },
  { title: 'Security Patch Management', category: 'Technical', priority: 'HIGH' as const, estimatedTime: '4-8 hours', skills: ['Patch Management', 'Vulnerability Management', 'Change Control'] },
  { title: 'Disaster Recovery Testing', category: 'Technical', priority: 'HIGH' as const, estimatedTime: '8-16 hours', skills: ['Disaster Recovery', 'Testing', 'Documentation'] },

  // Research & Development (6 jobs)
  { title: 'Emerging Threat Research', category: 'Research', priority: 'MEDIUM' as const, estimatedTime: '16-24 hours', skills: ['Threat Research', 'OSINT', 'Analysis'] },
  { title: 'Security Tool Evaluation', category: 'Research', priority: 'LOW' as const, estimatedTime: '12-20 hours', skills: ['Tool Evaluation', 'POC Development', 'Vendor Analysis'] },
  { title: 'Machine Learning Model Development', category: 'Research', priority: 'MEDIUM' as const, estimatedTime: '20-30 hours', skills: ['Machine Learning', 'Data Science', 'Model Development'] },
  { title: 'Cyber Threat Intelligence Report', category: 'Research', priority: 'MEDIUM' as const, estimatedTime: '8-12 hours', skills: ['Threat Intelligence', 'Research', 'Report Writing'] },
  { title: 'Security Architecture Review', category: 'Research', priority: 'HIGH' as const, estimatedTime: '12-18 hours', skills: ['Security Architecture', 'Design Review', 'Best Practices'] },
  { title: 'Innovation Lab Project', category: 'Research', priority: 'LOW' as const, estimatedTime: '40-60 hours', skills: ['Innovation', 'Prototyping', 'Research'] }
];

export default function FounderCompanyControl() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [aiJobs, setAiJobs] = useState<AIJob[]>([]);
  const [voiceSession, setVoiceSession] = useState<VoiceSession>({
    isActive: false,
    isListening: false,
    isProcessing: false,
    transcript: '',
    response: '',
    confidence: 0
  });
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCategory, setNewJobCategory] = useState('');
  const [newJobPriority, setNewJobPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [selectedJobTemplate, setSelectedJobTemplate] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const { toast } = useToast();

  useEffect(() => {
    loadCompanies();
    loadAIJobs();
  }, []);

  const loadCompanies = () => {
    // Mock company data with comprehensive information
    const mockCompanies: Company[] = [
      {
        id: 'comp-001',
        name: 'TechCorp Solutions',
        industry: 'Technology',
        employeeCount: 1250,
        status: 'ACTIVE',
        subscriptionTier: 'Enterprise Premium',
        revenue: 45000000,
        location: 'San Francisco, CA',
        foundedYear: 2018,
        website: 'https://techcorp.com',
        email: 'security@techcorp.com',
        phone: '+1-555-0123',
        securityScore: 92,
        complianceStatus: 'COMPLIANT',
        lastAudit: '2024-01-15',
        nextAudit: '2024-07-15',
        riskLevel: 'LOW',
        dataPoints: {
          totalAssets: 3400,
          criticalSystems: 45,
          vulnerabilities: 12,
          incidents: 3,
          threatsBlocked: 2847,
          complianceGap: 2
        },
        aiAgents: 15,
        aiEngineers: 8,
        monthlyMetrics: {
          threatsDetected: 1240,
          incidentsResolved: 98,
          systemUptime: 99.8,
          userSatisfaction: 94,
          costSavings: 340000
        }
      },
      {
        id: 'comp-002',
        name: 'FinanceSecure Bank',
        industry: 'Financial Services',
        employeeCount: 3500,
        status: 'ACTIVE',
        subscriptionTier: 'Enterprise Ultimate',
        revenue: 120000000,
        location: 'New York, NY',
        foundedYear: 1995,
        website: 'https://financesecure.com',
        email: 'cybersec@financesecure.com',
        phone: '+1-555-0456',
        securityScore: 96,
        complianceStatus: 'COMPLIANT',
        lastAudit: '2024-02-01',
        nextAudit: '2024-08-01',
        riskLevel: 'VERY_LOW',
        dataPoints: {
          totalAssets: 8900,
          criticalSystems: 127,
          vulnerabilities: 5,
          incidents: 1,
          threatsBlocked: 8456,
          complianceGap: 0
        },
        aiAgents: 32,
        aiEngineers: 18,
        monthlyMetrics: {
          threatsDetected: 3420,
          incidentsResolved: 145,
          systemUptime: 99.95,
          userSatisfaction: 97,
          costSavings: 890000
        }
      },
      {
        id: 'comp-003',
        name: 'HealthGuard Medical',
        industry: 'Healthcare',
        employeeCount: 850,
        status: 'ACTIVE',
        subscriptionTier: 'Professional',
        revenue: 25000000,
        location: 'Chicago, IL',
        foundedYear: 2010,
        website: 'https://healthguard.com',
        email: 'security@healthguard.com',
        phone: '+1-555-0789',
        securityScore: 88,
        complianceStatus: 'MINOR_GAPS',
        lastAudit: '2024-01-20',
        nextAudit: '2024-07-20',
        riskLevel: 'MEDIUM',
        dataPoints: {
          totalAssets: 2100,
          criticalSystems: 28,
          vulnerabilities: 18,
          incidents: 5,
          threatsBlocked: 1567,
          complianceGap: 8
        },
        aiAgents: 9,
        aiEngineers: 5,
        monthlyMetrics: {
          threatsDetected: 780,
          incidentsResolved: 65,
          systemUptime: 99.6,
          userSatisfaction: 91,
          costSavings: 185000
        }
      }
    ];
    setCompanies(mockCompanies);
  };

  const loadAIJobs = () => {
    // Generate initial jobs from templates
    const initialJobs: AIJob[] = AI_JOB_TEMPLATES.slice(0, 15).map((template, index) => ({
      id: `job-${index + 1}`,
      title: template.title,
      category: template.category,
      priority: template.priority,
      status: ['PENDING', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 3)] as any,
      estimatedTime: template.estimatedTime,
      deadline: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: `Comprehensive ${template.title.toLowerCase()} for enhanced security posture and compliance requirements.`,
      skillsRequired: template.skills,
      progress: Math.floor(Math.random() * 100)
    }));
    setAiJobs(initialJobs);
  };

  const startVoiceSession = async () => {
    if (!selectedCompany) {
      toast({
        title: "No Company Selected",
        description: "Please select a company first to start voice analysis",
        variant: "destructive"
      });
      return;
    }

    setVoiceSession(prev => ({ ...prev, isActive: true, isListening: true }));
    
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceSession(prev => ({ 
        ...prev, 
        isListening: false, 
        isProcessing: true,
        transcript: "Tell me about the current security status and any critical threats"
      }));
      
      // Simulate AI processing and response
      setTimeout(() => {
        const response = `Based on current analysis of ${selectedCompany.name}:

Security Status: ${selectedCompany.securityScore}% - ${selectedCompany.riskLevel} risk level
Current Threats: ${selectedCompany.monthlyMetrics.threatsDetected} detected this month
Critical Systems: ${selectedCompany.dataPoints.criticalSystems} systems monitored
Active Incidents: ${selectedCompany.dataPoints.incidents} requiring attention

Immediate Recommendations:
1. Review ${selectedCompany.dataPoints.vulnerabilities} open vulnerabilities
2. Update security policies for ${selectedCompany.dataPoints.complianceGap} compliance gaps
3. Monitor threat landscape for industry-specific attacks

All AI agents are operational with ${selectedCompany.aiEngineers} engineers actively managing security operations.`;

        setVoiceSession(prev => ({ 
          ...prev, 
          isProcessing: false,
          response,
          confidence: 0.95
        }));
      }, 3000);
    }, 2000);
  };

  const stopVoiceSession = () => {
    setVoiceSession({
      isActive: false,
      isListening: false,
      isProcessing: false,
      transcript: '',
      response: '',
      confidence: 0
    });
  };

  const createJobFromTemplate = () => {
    if (!selectedJobTemplate || !selectedCompany) return;

    const template = AI_JOB_TEMPLATES.find(t => t.title === selectedJobTemplate);
    if (!template) return;

    const newJob: AIJob = {
      id: `job-${Date.now()}`,
      title: template.title,
      category: template.category,
      priority: template.priority,
      status: 'PENDING',
      estimatedTime: template.estimatedTime,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: `${template.title} for ${selectedCompany.name} - Comprehensive analysis and implementation`,
      skillsRequired: template.skills,
      progress: 0
    };

    setAiJobs(prev => [...prev, newJob]);
    setSelectedJobTemplate('');
    
    toast({
      title: "Job Created",
      description: `${newJob.title} has been added to the queue`,
      variant: "default"
    });
  };

  const assignJobToEngineer = async (jobId: string, engineerId: string) => {
    setAiJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, assignedTo: engineerId, status: 'IN_PROGRESS' }
        : job
    ));

    toast({
      title: "Job Assigned",
      description: "AI Engineer has been assigned and will begin work immediately",
      variant: "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500 text-white';
      case 'IN_PROGRESS': return 'bg-blue-500 text-white';
      case 'COMPLETED': return 'bg-green-500 text-white';
      case 'FAILED': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-600 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-white';
      case 'LOW': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'VERY_LOW': return 'text-green-400';
      case 'LOW': return 'text-green-300';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-orange-400';
      case 'CRITICAL': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredJobs = aiJobs.filter(job => {
    const categoryMatch = filterCategory === 'ALL' || job.category === filterCategory;
    const statusMatch = filterStatus === 'ALL' || job.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  if (!selectedCompany) {
    return (
      <div className="space-y-6">
        <Card className="bg-gray-900/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Founder Company Control Center
            </CardTitle>
            <CardDescription>
              Select a company to access comprehensive data analysis and AI task management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="bg-gray-800/50 border-gray-700 cursor-pointer hover:border-cyan-500 transition-all"
                  onClick={() => setSelectedCompany(company)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">{company.name}</h3>
                      <Badge className={company.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}>
                        {company.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Industry:</span>
                        <span className="text-white">{company.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Employees:</span>
                        <span className="text-white">{company.employeeCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-cyan-400 font-semibold">{company.securityScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level:</span>
                        <span className={getRiskLevelColor(company.riskLevel)}>{company.riskLevel.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Agents:</span>
                        <span className="text-blue-400">{company.aiAgents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Engineers:</span>
                        <span className="text-purple-400">{company.aiEngineers}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700"
                      onClick={() => setSelectedCompany(company)}
                    >
                      Access Control Center
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setSelectedCompany(null)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                ← Back to Companies
              </Button>
              <div>
                <CardTitle className="text-white text-2xl">{selectedCompany.name}</CardTitle>
                <CardDescription className="text-lg">
                  {selectedCompany.industry} • {selectedCompany.employeeCount.toLocaleString()} employees • Founded {selectedCompany.foundedYear}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-cyan-600 text-white text-lg px-4 py-2">
                Security Score: {selectedCompany.securityScore}%
              </Badge>
              <Badge className={selectedCompany.riskLevel === 'LOW' || selectedCompany.riskLevel === 'VERY_LOW' ? 'bg-green-500' : 'bg-orange-500'}>
                {selectedCompany.riskLevel.replace('_', ' ')} Risk
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Voice AI Control */}
      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            Voice AI Assistant - Founder Access
          </CardTitle>
          <CardDescription>
            Speak with your AI to get real-time company analysis and situation reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {!voiceSession.isActive ? (
              <Button 
                onClick={startVoiceSession}
                className="bg-green-600 hover:bg-green-700"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Voice Session
              </Button>
            ) : (
              <Button 
                onClick={stopVoiceSession}
                className="bg-red-600 hover:bg-red-700"
              >
                <MicOff className="w-4 h-4 mr-2" />
                End Session
              </Button>
            )}
            
            {voiceSession.isActive && (
              <div className="flex items-center gap-2">
                {voiceSession.isListening && (
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    Listening...
                  </div>
                )}
                {voiceSession.isProcessing && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-spin"></div>
                    Processing...
                  </div>
                )}
              </div>
            )}
          </div>

          {voiceSession.transcript && (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <Label className="text-gray-300">Your Request:</Label>
              <p className="text-white mt-1">{voiceSession.transcript}</p>
            </div>
          )}

          {voiceSession.response && (
            <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-700">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-cyan-300">AI Response:</Label>
                <Badge className="bg-cyan-600">
                  {(voiceSession.confidence * 100).toFixed(1)}% Confidence
                </Badge>
              </div>
              <pre className="text-cyan-100 text-sm whitespace-pre-wrap">{voiceSession.response}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-cyan-600">
            <Database className="w-4 h-4 mr-2" />
            Company Data
          </TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-cyan-600">
            <Briefcase className="w-4 h-4 mr-2" />
            AI Jobs (40+)
          </TabsTrigger>
          <TabsTrigger value="engineers" className="data-[state=active]:bg-cyan-600">
            <Bot className="w-4 h-4 mr-2" />
            AI Engineers
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Threats</p>
                    <p className="text-2xl font-bold text-red-400">{selectedCompany.monthlyMetrics.threatsDetected}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Incidents Resolved</p>
                    <p className="text-2xl font-bold text-green-400">{selectedCompany.monthlyMetrics.incidentsResolved}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">System Uptime</p>
                    <p className="text-2xl font-bold text-blue-400">{selectedCompany.monthlyMetrics.systemUptime}%</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Cost Savings</p>
                    <p className="text-2xl font-bold text-green-400">${(selectedCompany.monthlyMetrics.costSavings / 1000).toFixed(0)}k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Security Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Overall Security Score</span>
                  <span className="text-cyan-400 font-semibold">{selectedCompany.securityScore}%</span>
                </div>
                <Progress value={selectedCompany.securityScore} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">User Satisfaction</span>
                  <span className="text-green-400 font-semibold">{selectedCompany.monthlyMetrics.userSatisfaction}%</span>
                </div>
                <Progress value={selectedCompany.monthlyMetrics.userSatisfaction} className="h-2" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Total Assets</p>
                    <p className="text-white font-semibold">{selectedCompany.dataPoints.totalAssets}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Critical Systems</p>
                    <p className="text-white font-semibold">{selectedCompany.dataPoints.criticalSystems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Workforce Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active AI Agents</span>
                  <span className="text-blue-400 font-semibold">{selectedCompany.aiAgents}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">AI Engineers</span>
                  <span className="text-purple-400 font-semibold">{selectedCompany.aiEngineers}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Jobs</span>
                  <span className="text-yellow-400 font-semibold">{filteredJobs.filter(j => j.status === 'IN_PROGRESS').length}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completed This Month</span>
                  <span className="text-green-400 font-semibold">{filteredJobs.filter(j => j.status === 'COMPLETED').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Company Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Revenue</Label>
                    <p className="text-white font-semibold">${(selectedCompany.revenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Subscription</Label>
                    <p className="text-cyan-400 font-semibold">{selectedCompany.subscriptionTier}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Location</Label>
                    <p className="text-white">{selectedCompany.location}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Website</Label>
                    <p className="text-blue-400">{selectedCompany.website}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <p className="text-white">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Phone</Label>
                    <p className="text-white">{selectedCompany.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Compliance & Audit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-400">Compliance Status</Label>
                  <Badge className={selectedCompany.complianceStatus === 'COMPLIANT' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {selectedCompany.complianceStatus.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Last Audit</Label>
                    <p className="text-white">{selectedCompany.lastAudit}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Next Audit</Label>
                    <p className="text-white">{selectedCompany.nextAudit}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Label className="text-gray-400">Compliance Gaps</Label>
                  <span className={selectedCompany.dataPoints.complianceGap === 0 ? 'text-green-400' : 'text-yellow-400'}>
                    {selectedCompany.dataPoints.complianceGap}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security Data Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Vulnerabilities</p>
                  <p className="text-2xl font-bold text-red-400">{selectedCompany.dataPoints.vulnerabilities}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Incidents</p>
                  <p className="text-2xl font-bold text-orange-400">{selectedCompany.dataPoints.incidents}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Threats Blocked</p>
                  <p className="text-2xl font-bold text-green-400">{selectedCompany.dataPoints.threatsBlocked}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total Assets</p>
                  <p className="text-2xl font-bold text-blue-400">{selectedCompany.dataPoints.totalAssets}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Critical Systems</p>
                  <p className="text-2xl font-bold text-purple-400">{selectedCompany.dataPoints.criticalSystems}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Compliance Gaps</p>
                  <p className="text-2xl font-bold text-yellow-400">{selectedCompany.dataPoints.complianceGap}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">AI Job Management (40+ Available)</CardTitle>
                  <CardDescription>Assign specialized tasks to AI engineers for {selectedCompany.name}</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="ALL">All Categories</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Job Creation */}
              <Card className="bg-gray-900/50 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Create New Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={selectedJobTemplate} onValueChange={setSelectedJobTemplate}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select job template" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
                        {AI_JOB_TEMPLATES.map(template => (
                          <SelectItem key={template.title} value={template.title}>
                            {template.title} ({template.category})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      onClick={createJobFromTemplate}
                      disabled={!selectedJobTemplate}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Job
                    </Button>
                    
                    <div className="text-sm text-gray-400">
                      {AI_JOB_TEMPLATES.length} job templates available
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Jobs List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredJobs.map(job => (
                  <Card key={job.id} className="bg-gray-900/30 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{job.title}</h4>
                          <p className="text-gray-400 text-sm">{job.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getPriorityColor(job.priority)}>
                            {job.priority}
                          </Badge>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{job.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Estimated Time:</span>
                          <span className="text-white">{job.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deadline:</span>
                          <span className="text-white">{job.deadline}</span>
                        </div>
                        {job.assignedTo && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Assigned to:</span>
                            <span className="text-cyan-400">{job.assignedTo}</span>
                          </div>
                        )}
                      </div>

                      {job.status === 'IN_PROGRESS' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      )}

                      <div className="mt-3">
                        <Label className="text-gray-400 text-sm">Required Skills:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.skillsRequired.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {job.status === 'PENDING' && (
                        <Button
                          onClick={() => assignJobToEngineer(job.id, `ai-engineer-${Math.floor(Math.random() * selectedCompany.aiEngineers) + 1}`)}
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          Assign to AI Engineer
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No jobs found matching current filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Engineers Tab */}
        <TabsContent value="engineers" className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI Engineer Workforce</CardTitle>
              <CardDescription>
                Manage {selectedCompany.aiEngineers} AI engineers working for {selectedCompany.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: selectedCompany.aiEngineers }, (_, index) => {
                  const engineerId = `ai-engineer-${index + 1}`;
                  const assignedJobs = filteredJobs.filter(job => job.assignedTo === engineerId);
                  const specializations = ['Cybersecurity', 'Data Analysis', 'Network Security', 'Incident Response', 'Compliance', 'Threat Hunting'];
                  const specialization = specializations[index % specializations.length];
                  
                  return (
                    <Card key={engineerId} className="bg-gray-900/30 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">{engineerId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                          <Badge className="bg-purple-600">
                            AI Engineer
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Specialization:</span>
                            <span className="text-white">{specialization}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Jobs:</span>
                            <span className="text-cyan-400">{assignedJobs.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Efficiency:</span>
                            <span className="text-green-400">{85 + Math.floor(Math.random() * 15)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Uptime:</span>
                            <span className="text-blue-400">{95 + Math.floor(Math.random() * 5)}%</span>
                          </div>
                        </div>

                        {assignedJobs.length > 0 && (
                          <div className="mt-3">
                            <Label className="text-gray-400 text-sm">Current Jobs:</Label>
                            <div className="space-y-1 mt-1">
                              {assignedJobs.slice(0, 2).map(job => (
                                <div key={job.id} className="text-xs bg-gray-800/50 p-2 rounded">
                                  <span className="text-white">{job.title}</span>
                                  <div className="flex justify-between mt-1">
                                    <Badge className={getStatusColor(job.status)} style={{ fontSize: '10px' }}>
                                      {job.status.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-gray-400">{job.progress}%</span>
                                  </div>
                                </div>
                              ))}
                              {assignedJobs.length > 2 && (
                                <p className="text-xs text-gray-400">+{assignedJobs.length - 2} more jobs</p>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}