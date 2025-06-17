import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Globe,
  FileText,
  Search,
  BookOpen,
  Shield,
  Brain,
  Zap,
  Target,
  Database,
  Eye,
  Clock,
  MapPin,
  Users,
  Gavel,
  Flag,
  Building,
  Phone,
  Mail,
  Hash,
  TrendingUp,
  Activity
} from 'lucide-react';

interface LegalCase {
  id: string;
  title: string;
  jurisdiction: string;
  case_number: string;
  date: Date;
  category: 'cybercrime' | 'ai_ethics' | 'data_privacy' | 'intellectual_property' | 'digital_rights';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'ongoing' | 'resolved' | 'appealed' | 'precedent';
  summary: string;
  key_points: string[];
  implications: string[];
  related_laws: string[];
}

interface LegalRegulation {
  id: string;
  name: string;
  jurisdiction: string;
  category: 'cybersecurity' | 'ai_governance' | 'privacy' | 'digital_evidence' | 'cross_border';
  effective_date: Date;
  compliance_score: number;
  requirements: Array<{
    requirement: string;
    mandatory: boolean;
    deadline?: Date;
    status: 'compliant' | 'partial' | 'non_compliant' | 'pending';
  }>;
  penalties: {
    financial: string;
    operational: string;
    criminal: string;
  };
}

interface LegalAlert {
  id: string;
  type: 'new_regulation' | 'case_update' | 'compliance_deadline' | 'enforcement_action';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  jurisdiction: string;
  deadline?: Date;
  action_required: boolean;
  timestamp: Date;
}

export default function CybercrimeLawCenter() {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
  const [regulations, setRegulations] = useState<LegalRegulation[]>([]);
  const [alerts, setAlerts] = useState<LegalAlert[]>([]);
  const [complianceOverview, setComplianceOverview] = useState<any>({});

  useEffect(() => {
    // Initialize sample legal data
    const sampleCases: LegalCase[] = [
      {
        id: 'case-1',
        title: 'United States v. Deepfake Creator Network',
        jurisdiction: 'United States (Federal)',
        case_number: '2024-CR-00847',
        date: new Date('2024-03-15'),
        category: 'cybercrime',
        severity: 'critical',
        status: 'ongoing',
        summary: 'Federal prosecution of criminal network using AI to create non-consensual deepfake content for extortion and fraud.',
        key_points: [
          'First federal prosecution specifically targeting AI-generated content',
          'Charges include wire fraud, extortion, and identity theft',
          'Evidence includes blockchain forensics and AI model analysis',
          'International cooperation with EU authorities'
        ],
        implications: [
          'Sets precedent for prosecuting AI-assisted crimes',
          'Establishes framework for digital evidence handling',
          'Impacts AI development liability standards'
        ],
        related_laws: ['18 USC 1030 (Computer Fraud)', 'EU AI Act', 'DMCA Section 512']
      },
      {
        id: 'case-2',
        title: 'European Commission v. Social Media Giant - AI Bias Case',
        jurisdiction: 'European Union',
        case_number: 'C-2024/156',
        date: new Date('2024-01-22'),
        category: 'ai_ethics',
        severity: 'high',
        status: 'resolved',
        summary: 'EU enforcement action against platform for discriminatory AI recommendation algorithms violating fundamental rights.',
        key_points: [
          'First major AI Act enforcement case',
          'Algorithmic bias in content recommendation systems',
          '€15M fine imposed for systematic discrimination',
          'Mandatory algorithm auditing requirements'
        ],
        implications: [
          'Defines AI accountability standards in EU',
          'Establishes audit requirements for AI systems',
          'Impact on global AI development practices'
        ],
        related_laws: ['EU AI Act Article 5', 'GDPR Article 22', 'Charter of Fundamental Rights']
      },
      {
        id: 'case-3',
        title: 'State of California v. Cybercrime Syndicate',
        jurisdiction: 'California, USA',
        case_number: '2024-SF-4821',
        date: new Date('2024-02-08'),
        category: 'cybercrime',
        severity: 'high',
        status: 'precedent',
        summary: 'Landmark case establishing liability for AI-assisted social engineering attacks targeting elderly victims.',
        key_points: [
          'AI voice cloning used in elder fraud schemes',
          'Cross-border digital evidence collection',
          'Restitution orders including cryptocurrency recovery',
          'Establishes "AI enhancement" as aggravating factor'
        ],
        implications: [
          'AI enhancement increases criminal penalties',
          'Victim protection standards for AI crimes',
          'Digital asset recovery procedures'
        ],
        related_laws: ['California Penal Code 484e', 'Elder Abuse Act', 'CFAA']
      }
    ];

    const sampleRegulations: LegalRegulation[] = [
      {
        id: 'reg-1',
        name: 'EU AI Act',
        jurisdiction: 'European Union',
        category: 'ai_governance',
        effective_date: new Date('2024-08-01'),
        compliance_score: 78.4,
        requirements: [
          { requirement: 'High-risk AI system registration', mandatory: true, deadline: new Date('2025-02-01'), status: 'pending' },
          { requirement: 'AI impact assessment documentation', mandatory: true, status: 'partial' },
          { requirement: 'Human oversight implementation', mandatory: true, status: 'compliant' },
          { requirement: 'Bias testing and mitigation', mandatory: true, status: 'partial' }
        ],
        penalties: {
          financial: 'Up to €35M or 7% of global turnover',
          operational: 'System suspension or market withdrawal',
          criminal: 'Individual prosecution possible'
        }
      },
      {
        id: 'reg-2',
        name: 'NIST AI Risk Management Framework',
        jurisdiction: 'United States',
        category: 'ai_governance',
        effective_date: new Date('2023-01-26'),
        compliance_score: 89.2,
        requirements: [
          { requirement: 'AI governance structure', mandatory: false, status: 'compliant' },
          { requirement: 'Risk assessment procedures', mandatory: false, status: 'compliant' },
          { requirement: 'Incident response planning', mandatory: false, status: 'compliant' },
          { requirement: 'Third-party AI vendor management', mandatory: false, status: 'partial' }
        ],
        penalties: {
          financial: 'Regulatory enforcement varies by sector',
          operational: 'Federal contract implications',
          criminal: 'Not directly applicable'
        }
      },
      {
        id: 'reg-3',
        name: 'UK Online Safety Act',
        jurisdiction: 'United Kingdom',
        category: 'cybersecurity',
        effective_date: new Date('2024-01-16'),
        compliance_score: 67.8,
        requirements: [
          { requirement: 'Content moderation systems', mandatory: true, deadline: new Date('2024-12-31'), status: 'partial' },
          { requirement: 'User safety risk assessments', mandatory: true, status: 'pending' },
          { requirement: 'Transparency reporting', mandatory: true, status: 'non_compliant' },
          { requirement: 'Age verification systems', mandatory: true, deadline: new Date('2025-03-01'), status: 'pending' }
        ],
        penalties: {
          financial: 'Up to £18M or 10% of qualifying revenue',
          operational: 'Service blocking orders',
          criminal: 'Senior manager liability'
        }
      }
    ];

    const sampleAlerts: LegalAlert[] = [
      {
        id: 'alert-1',
        type: 'compliance_deadline',
        priority: 'critical',
        title: 'EU AI Act High-Risk System Registration Deadline',
        description: 'Mandatory registration for high-risk AI systems under EU AI Act required by February 1, 2025.',
        jurisdiction: 'European Union',
        deadline: new Date('2025-02-01'),
        action_required: true,
        timestamp: new Date()
      },
      {
        id: 'alert-2',
        type: 'new_regulation',
        priority: 'high',
        title: 'California AI Transparency Law Passed',
        description: 'New legislation requiring disclosure of AI use in consumer-facing applications.',
        jurisdiction: 'California, USA',
        action_required: true,
        timestamp: new Date(Date.now() - 86400000)
      },
      {
        id: 'alert-3',
        type: 'enforcement_action',
        priority: 'medium',
        title: 'FTC Issues AI Guidance for Financial Services',
        description: 'New enforcement priorities for AI bias in lending and insurance decisions.',
        jurisdiction: 'United States',
        action_required: false,
        timestamp: new Date(Date.now() - 172800000)
      }
    ];

    setLegalCases(sampleCases);
    setRegulations(sampleRegulations);
    setAlerts(sampleAlerts);
    
    setComplianceOverview({
      overall_score: 78.5,
      compliant_regulations: 12,
      pending_actions: 8,
      critical_deadlines: 3,
      jurisdictions_covered: 15
    });
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'partial': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'non_compliant': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'pending': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'non_compliant': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'partial': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-blue-400" />;
      default: return <Eye className="w-4 h-4 text-gray-400" />;
    }
  };

  const jurisdictions = ['all', 'United States', 'European Union', 'United Kingdom', 'California', 'China', 'Canada', 'Australia'];
  const categories = ['all', 'cybercrime', 'ai_ethics', 'data_privacy', 'intellectual_property', 'digital_rights', 'cybersecurity', 'ai_governance'];

  const filteredCases = legalCases.filter(case_ => {
    const matchesSearch = searchQuery === '' || 
      case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJurisdiction = selectedJurisdiction === 'all' || case_.jurisdiction.includes(selectedJurisdiction);
    const matchesCategory = selectedCategory === 'all' || case_.category === selectedCategory;
    return matchesSearch && matchesJurisdiction && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      <UnifiedSidebar />
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">Cybercrime & AI Law Center</h1>
                  <p className="text-gray-400">Legal intelligence for cybersecurity and AI governance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-[#0ea5e9] border-[#0ea5e9]/30">
                  <Brain className="w-3 h-3 mr-1" />
                  Legal AI
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Live Updates
                </Badge>
              </div>
            </div>

            {/* Compliance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-[#0ea5e9]/10 border-[#0ea5e9]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-[#0ea5e9]" />
                    <div>
                      <div className="text-white text-xl font-bold">{complianceOverview.overall_score}%</div>
                      <div className="text-gray-400 text-sm">Overall Compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{complianceOverview.compliant_regulations}</div>
                      <div className="text-gray-400 text-sm">Compliant Regs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{complianceOverview.pending_actions}</div>
                      <div className="text-gray-400 text-sm">Pending Actions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-red-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{complianceOverview.critical_deadlines}</div>
                      <div className="text-gray-400 text-sm">Critical Deadlines</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white text-xl font-bold">{complianceOverview.jurisdictions_covered}</div>
                      <div className="text-gray-400 text-sm">Jurisdictions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="cases" className="text-white">Legal Cases</TabsTrigger>
              <TabsTrigger value="regulations" className="text-white">Regulations</TabsTrigger>
              <TabsTrigger value="alerts" className="text-white">Legal Alerts</TabsTrigger>
              <TabsTrigger value="compliance" className="text-white">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-6">
              {/* Search and Filters */}
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#0ea5e9]" />
                    Legal Case Search
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Search cases, keywords, or case numbers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                    <select
                      value={selectedJurisdiction}
                      onChange={(e) => setSelectedJurisdiction(e.target.value)}
                      className="bg-gray-800/50 border border-gray-700 text-white rounded-md px-3 py-2"
                    >
                      {jurisdictions.map(jurisdiction => (
                        <option key={jurisdiction} value={jurisdiction}>
                          {jurisdiction === 'all' ? 'All Jurisdictions' : jurisdiction}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-gray-800/50 border border-gray-700 text-white rounded-md px-3 py-2"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.replace('_', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Cases */}
              <div className="space-y-4">
                {filteredCases.map((case_) => (
                  <Card key={case_.id} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Gavel className="w-5 h-5 text-[#0ea5e9]" />
                            <CardTitle className="text-white text-lg">{case_.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {case_.case_number}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {case_.jurisdiction}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {case_.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getPriorityColor(case_.severity)}>
                            {case_.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-white">
                            {case_.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="text-white text-sm font-medium mb-2">Case Summary</div>
                        <div className="text-gray-300 text-sm">{case_.summary}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-white text-sm font-medium mb-2">Key Points</div>
                          <ul className="space-y-1">
                            {case_.key_points.slice(0, 3).map((point, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                                <div className="w-1 h-1 bg-[#0ea5e9] rounded-full mt-2 flex-shrink-0"></div>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-white text-sm font-medium mb-2">Legal Implications</div>
                          <ul className="space-y-1">
                            {case_.implications.slice(0, 3).map((implication, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                {implication}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                        <div className="flex gap-2">
                          {case_.related_laws.slice(0, 2).map((law, index) => (
                            <Badge key={index} variant="outline" className="text-[#0ea5e9] border-[#0ea5e9]/30 text-xs">
                              {law}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" className="text-white" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          View Full Case
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations" className="space-y-6">
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <Card key={regulation.id} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-[#0ea5e9]" />
                            <CardTitle className="text-white text-lg">{regulation.name}</CardTitle>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Flag className="w-3 h-3" />
                              {regulation.jurisdiction}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Effective: {regulation.effective_date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-xl font-bold">{regulation.compliance_score.toFixed(1)}%</div>
                          <div className="text-gray-400 text-sm">Compliance Score</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="text-white text-sm font-medium">Requirements</div>
                        {regulation.requirements.map((req, index) => (
                          <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(req.status)}
                                <span className="text-white text-sm">{req.requirement}</span>
                                {req.mandatory && <Badge variant="outline" className="text-red-400 border-red-400/30 text-xs">Mandatory</Badge>}
                              </div>
                              <Badge className={getStatusColor(req.status)}>
                                {req.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            {req.deadline && (
                              <div className="text-gray-400 text-xs">
                                Deadline: {req.deadline.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/30">
                        <div className="bg-gray-800/30 rounded-lg p-3">
                          <div className="text-red-400 text-sm font-medium mb-1">Financial Penalties</div>
                          <div className="text-gray-300 text-xs">{regulation.penalties.financial}</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-3">
                          <div className="text-orange-400 text-sm font-medium mb-1">Operational Impact</div>
                          <div className="text-gray-300 text-xs">{regulation.penalties.operational}</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-3">
                          <div className="text-purple-400 text-sm font-medium mb-1">Criminal Liability</div>
                          <div className="text-gray-300 text-xs">{regulation.penalties.criminal}</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-white">
                        <Target className="w-4 h-4 mr-2" />
                        Generate Compliance Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
                            {alert.type === 'compliance_deadline' && <Clock className="w-5 h-5 text-[#0ea5e9]" />}
                            {alert.type === 'new_regulation' && <BookOpen className="w-5 h-5 text-[#0ea5e9]" />}
                            {alert.type === 'enforcement_action' && <Gavel className="w-5 h-5 text-[#0ea5e9]" />}
                            {alert.type === 'case_update' && <FileText className="w-5 h-5 text-[#0ea5e9]" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-medium">{alert.title}</h3>
                              <Badge className={getPriorityColor(alert.priority)}>
                                {alert.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{alert.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {alert.jurisdiction}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {alert.timestamp.toLocaleDateString()}
                              </span>
                              {alert.deadline && (
                                <span className="flex items-center gap-1 text-red-400">
                                  <AlertTriangle className="w-3 h-3" />
                                  Due: {alert.deadline.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {alert.action_required && (
                          <Button size="sm" className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80">
                            <Zap className="w-4 h-4 mr-2" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Compliance Dashboard */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#0ea5e9]" />
                      Compliance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { category: 'AI Governance', score: 82.4, trend: '+5.2%' },
                        { category: 'Data Privacy', score: 91.7, trend: '+2.1%' },
                        { category: 'Cybersecurity', score: 76.3, trend: '-1.8%' },
                        { category: 'Digital Rights', score: 68.9, trend: '+8.4%' }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">{item.category}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{item.score}%</span>
                              <span className={`text-xs ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {item.trend}
                              </span>
                            </div>
                          </div>
                          <Progress value={item.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#0ea5e9]" />
                      Priority Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      <div className="space-y-3">
                        {[
                          { action: 'Complete EU AI Act registration', priority: 'critical', due: '2025-02-01' },
                          { action: 'Update privacy policy for UK regulations', priority: 'high', due: '2024-12-31' },
                          { action: 'Conduct AI bias audit', priority: 'medium', due: '2025-01-15' },
                          { action: 'Train staff on new compliance requirements', priority: 'medium', due: '2024-11-30' },
                          { action: 'Review third-party AI vendor contracts', priority: 'low', due: '2025-03-01' }
                        ].map((item, index) => (
                          <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-sm">{item.action}</span>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-gray-400 text-xs">Due: {item.due}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}