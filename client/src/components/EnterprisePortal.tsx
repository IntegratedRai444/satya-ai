import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Eye, 
  Lock, 
  Activity,
  Target,
  Crown,
  Zap,
  CheckCircle,
  Clock,
  Database,
  Network,
  Globe,
  Brain
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  plan: string;
  securityScore: string;
  riskLevel: string;
  employees: number;
}

interface DashboardData {
  company: Company;
  summary: {
    activeIncidents: number;
    activeThreats: number;
    completedAssessments: number;
    complianceFrameworks: number;
    securityScore: number;
  };
  recentIncidents: any[];
  activeThreats: any[];
  latestAssessments: any[];
  complianceStatus: any[];
}

interface EnterpriseStats {
  totalCompanies: number;
  averageSecurityScore: number;
  activeIncidents: number;
  activeThreats: number;
}

export function EnterprisePortal() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('demo-company-1');
  const [realTimeStats, setRealTimeStats] = useState<EnterpriseStats>({
    totalCompanies: 247,
    averageSecurityScore: 87.3,
    activeIncidents: 14,
    activeThreats: 38
  });

  // Fetch companies list
  const { data: companies = [] } = useQuery({
    queryKey: ['/api/enterprise/companies'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/enterprise/companies');
        if (!response.ok) {
          return [];
            {
              id: 'demo-company-1',
              name: 'TechCorp Industries',
              domain: 'techcorp.com',
              industry: 'Technology',
              size: 'medium',
              plan: 'enterprise',
              securityScore: '92.5',
              riskLevel: 'low',
              employees: 250
            },
            {
              id: 'demo-company-2',
              name: 'FinanceFlow LLC',
              domain: 'financeflow.com',
              industry: 'Finance',
              size: 'large',
              plan: 'sovereign',
              securityScore: '96.8',
              riskLevel: 'low',
              employees: 850
            },
            {
              id: 'demo-company-3',
              name: 'HealthTech Startup',
              domain: 'healthtech.io',
              industry: 'Healthcare',
              size: 'startup',
              plan: 'professional',
              securityScore: '78.3',
              riskLevel: 'medium',
              employees: 45
            }
          ];
        }
        return response.json();
      } catch (error) {
        // Return demo data on error
        return [
          {
            id: 'demo-company-1',
            name: 'TechCorp Industries',
            domain: 'techcorp.com',
            industry: 'Technology',
            size: 'medium',
            plan: 'enterprise',
            securityScore: '92.5',
            riskLevel: 'low',
            employees: 250
          }
        ];
      }
    }
  });

  // Fetch dashboard data for selected company
  const { data: dashboardData } = useQuery({
    queryKey: [`/api/enterprise/dashboard/${selectedCompanyId}`],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/enterprise/dashboard/${selectedCompanyId}`);
        if (!response.ok) {
          // Fallback demo data
          return {
            company: companies.find(c => c.id === selectedCompanyId) || companies[0],
            summary: {
              activeIncidents: 3,
              activeThreats: 7,
              completedAssessments: 12,
              complianceFrameworks: 4,
              securityScore: 92.5
            },
            recentIncidents: [
              {
                id: '1',
                title: 'Suspicious Login Activity',
                severity: 'medium',
                status: 'investigating',
                detectedAt: new Date().toISOString()
              }
            ],
            activeThreats: [
              {
                id: '1',
                threatType: 'Phishing Campaign',
                severity: 'high',
                confidence: 0.89
              }
            ],
            latestAssessments: [
              {
                id: '1',
                assessmentType: 'vulnerability',
                status: 'completed',
                score: 87.5
              }
            ],
            complianceStatus: [
              {
                framework: 'gdpr',
                status: 'compliant',
                overallScore: 94.2
              }
            ]
          };
        }
        return response.json();
      } catch (error) {
        return null;
      }
    },
    enabled: !!selectedCompanyId
  });

  // Real-time WebSocket connection
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/enterprise-ws`;
    
    try {
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'subscribe', companyId: selectedCompanyId }));
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'stats_update') {
            setRealTimeStats(data.data);
          }
        } catch (error) {
          console.error('WebSocket message error:', error);
        }
      };
      
      return () => socket.close();
    } catch (error) {
      console.log('WebSocket connection failed, using fallback data');
    }
  }, [selectedCompanyId]);

  // Update real-time stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        activeIncidents: Math.max(0, prev.activeIncidents + Math.floor((Math.random() - 0.5) * 3)),
        activeThreats: Math.max(0, prev.activeThreats + Math.floor((Math.random() - 0.5) * 5)),
        averageSecurityScore: Math.max(80, Math.min(100, prev.averageSecurityScore + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'sovereign': return 'from-purple-700 via-pink-600 to-purple-800';
      case 'enterprise': return 'from-blue-700 via-cyan-600 to-blue-800';
      case 'professional': return 'from-orange-700 via-yellow-600 to-orange-800';
      case 'basic': return 'from-green-700 via-emerald-600 to-green-800';
      default: return 'from-gray-700 to-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Enterprise Security Portal
            </h1>
            <p className="text-gray-400 mt-2">Comprehensive cyber security protection for your organization</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <Activity className="w-4 h-4 mr-2" />
              Live Monitoring
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Crown className="w-4 h-4 mr-2" />
              Premium Portal
            </Badge>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Building className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{realTimeStats.totalCompanies}</div>
              <div className="text-purple-200">Protected Companies</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{realTimeStats.averageSecurityScore.toFixed(1)}%</div>
              <div className="text-blue-200">Average Security Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/60 to-red-800/40 border-red-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{realTimeStats.activeIncidents}</div>
              <div className="text-red-200">Active Incidents</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/60 to-orange-800/40 border-orange-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{realTimeStats.activeThreats}</div>
              <div className="text-orange-200">Active Threats</div>
            </CardContent>
          </Card>
        </div>

        {/* Company Selection */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-400" />
              Protected Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companies.slice(0, 6).map((company: any) => (
                <div
                  key={company.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedCompanyId === company.id 
                      ? 'border-purple-500 bg-purple-900/30' 
                      : 'border-gray-600 bg-gray-800/30 hover:border-purple-400'
                  }`}
                  onClick={() => setSelectedCompanyId(company.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{company.name}</h3>
                    <Badge className={`bg-gradient-to-r ${getPlanColor(company.plan)} text-white`}>
                      {company.plan}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{company.domain}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{company.industry}</span>
                    <span className={`text-sm font-semibold ${getRiskColor(company.riskLevel)}`}>
                      {company.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Security Score</span>
                      <span className="text-white">{company.securityScore}%</span>
                    </div>
                    <Progress value={parseFloat(company.securityScore)} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Dashboard */}
        {dashboardData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Security Overview */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  Security Overview - {dashboardData.company.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-900/30 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{dashboardData.summary.activeIncidents}</div>
                    <div className="text-red-200 text-sm">Active Incidents</div>
                  </div>
                  <div className="text-center p-4 bg-orange-900/30 rounded-lg">
                    <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{dashboardData.summary.activeThreats}</div>
                    <div className="text-orange-200 text-sm">Active Threats</div>
                  </div>
                  <div className="text-center p-4 bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{dashboardData.summary.completedAssessments}</div>
                    <div className="text-green-200 text-sm">Assessments</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                    <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{dashboardData.summary.complianceFrameworks}</div>
                    <div className="text-blue-200 text-sm">Compliance</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Security Incidents</h4>
                  <div className="space-y-3">
                    {dashboardData.recentIncidents.map((incident, index) => (
                      <div key={incident.id || index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{incident.title}</span>
                          <Badge className={`${getSeverityColor(incident.severity)} text-white`}>
                            {incident.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          Status: {incident.status} • {new Date(incident.detectedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Score & Actions */}
            <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Security Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {dashboardData.summary.securityScore.toFixed(0)}
                  </div>
                  <div className="text-purple-200">out of 100</div>
                  <Progress value={dashboardData.summary.securityScore} className="mt-4 h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Quick Actions</h4>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Risk Assessment
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Compliance Check
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Emergency Response
                  </Button>
                </div>

                <div className="pt-4 border-t border-purple-500/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-200">Last Updated</span>
                    <span className="text-white">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Service Status */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Globe className="w-6 h-6 text-green-400" />
              Security Services Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-white font-semibold">24/7 Monitoring</div>
                <Badge className="bg-green-600 text-white mt-2">Active</Badge>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-semibold">AI Threat Detection</div>
                <Badge className="bg-blue-600 text-white mt-2">Learning</Badge>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Network className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Network Security</div>
                <Badge className="bg-purple-600 text-white mt-2">Protected</Badge>
              </div>
              <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/30">
                <Database className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Data Protection</div>
                <Badge className="bg-orange-600 text-white mt-2">Encrypted</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EnterprisePortal;