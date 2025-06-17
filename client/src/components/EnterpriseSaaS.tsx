import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Lock,
  Monitor,
  Database,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  User,
  Crown,
  Zap,
  Target,
  Eye,
  Network,
  Cpu,
  HardDrive,
  Wifi,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employees: number;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'suspended';
  securityScore: number;
  lastScan: string;
  threats: number;
  vulnerabilities: number;
  compliance: number;
}

interface SecurityMetric {
  name: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
}

const EnterpriseSaaS = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');

  useEffect(() => {
    fetchCompanies();
    fetchMetrics();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/enterprise/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      // Fallback data for demonstration
      setCompanies([
        {
          id: '1',
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          industry: 'Technology',
          employees: 250,
          plan: 'enterprise',
          status: 'active',
          securityScore: 94,
          lastScan: '2024-06-17T08:30:00Z',
          threats: 2,
          vulnerabilities: 5,
          compliance: 98
        },
        {
          id: '2',
          name: 'FinanceFirst Bank',
          domain: 'financefirst.com',
          industry: 'Financial Services',
          employees: 450,
          plan: 'enterprise',
          status: 'active',
          securityScore: 97,
          lastScan: '2024-06-17T07:45:00Z',
          threats: 0,
          vulnerabilities: 2,
          compliance: 100
        },
        {
          id: '3',
          name: 'HealthPlus Medical',
          domain: 'healthplus.org',
          industry: 'Healthcare',
          employees: 180,
          plan: 'professional',
          status: 'active',
          securityScore: 91,
          lastScan: '2024-06-17T06:20:00Z',
          threats: 1,
          vulnerabilities: 8,
          compliance: 95
        },
        {
          id: '4',
          name: 'StartupXYZ',
          domain: 'startupxyz.io',
          industry: 'Technology',
          employees: 25,
          plan: 'starter',
          status: 'trial',
          securityScore: 78,
          lastScan: '2024-06-17T05:15:00Z',
          threats: 4,
          vulnerabilities: 12,
          compliance: 82
        }
      ]);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/enterprise/metrics');
      if (response.ok) {
        const data = await response.json();
        // Handle metrics data
      }
    } catch (error) {
      console.log('Using fallback metrics');
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || company.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold">SatyaAI Security</div>
            <div className="text-gray-400 text-xs">Enterprise Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'companies', label: 'Companies', icon: Building },
            { id: 'security', label: 'Security Center', icon: Shield },
            { id: 'threats', label: 'Threat Monitor', icon: AlertTriangle },
            { id: 'compliance', label: 'Compliance', icon: CheckCircle },
            { id: 'analytics', label: 'Analytics', icon: Activity },
            { id: 'billing', label: 'Billing', icon: Crown },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeView === item.id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
          <Crown className="w-6 h-6 text-cyan-400 mb-2" />
          <div className="text-white font-medium text-sm mb-1">Platform Admin</div>
          <div className="text-gray-400 text-xs">Managing 247 companies</div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Security Dashboard</h1>
          <p className="text-gray-400">Enterprise security overview and management</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/20 text-green-400">All Systems Operational</Badge>
          <Bell className="w-6 h-6 text-gray-400" />
          <User className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-400" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">+12 this month</Badge>
            </div>
            <div className="text-white text-2xl font-bold">247</div>
            <div className="text-gray-400 text-sm">Active Companies</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+5.2% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <Badge className="bg-red-500/20 text-red-400">Critical</Badge>
            </div>
            <div className="text-white text-2xl font-bold">23</div>
            <div className="text-gray-400 text-sm">Active Threats</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingDown className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">-15% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
            </div>
            <div className="text-white text-2xl font-bold">94.7%</div>
            <div className="text-gray-400 text-sm">Avg Security Score</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+2.1% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400">Compliant</Badge>
            </div>
            <div className="text-white text-2xl font-bold">96.2%</div>
            <div className="text-gray-400 text-sm">Compliance Rate</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+1.8% this quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: 'TechCorp Solutions',
                  event: 'Critical vulnerability patched',
                  time: '2 minutes ago',
                  severity: 'high',
                  icon: Shield
                },
                {
                  company: 'FinanceFirst Bank',
                  event: 'Security scan completed',
                  time: '15 minutes ago',
                  severity: 'low',
                  icon: CheckCircle
                },
                {
                  company: 'HealthPlus Medical',
                  event: 'Threat detected and blocked',
                  time: '1 hour ago',
                  severity: 'medium',
                  icon: AlertTriangle
                },
                {
                  company: 'StartupXYZ',
                  event: 'Compliance check failed',
                  time: '2 hours ago',
                  severity: 'high',
                  icon: Target
                }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.severity === 'high' ? 'bg-red-500/20' :
                    event.severity === 'medium' ? 'bg-orange-500/20' : 'bg-green-500/20'
                  }`}>
                    <event.icon className={`w-5 h-5 ${
                      event.severity === 'high' ? 'text-red-400' :
                      event.severity === 'medium' ? 'text-orange-400' : 'text-green-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{event.company}</div>
                    <div className="text-gray-400 text-sm">{event.event}</div>
                  </div>
                  <div className="text-gray-500 text-xs">{event.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.slice(0, 4).map((company, index) => (
                <div key={company.id} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{company.name}</div>
                    <div className="text-gray-400 text-xs">{company.industry}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${
                      company.securityScore >= 95 ? 'text-green-400' :
                      company.securityScore >= 80 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {company.securityScore}%
                    </div>
                    <Badge className={`text-xs ${
                      company.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                      company.plan === 'professional' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {company.plan}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CompaniesView = () => (
    <div className="p-6 space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Company Management</h1>
          <p className="text-gray-400">Manage security for all client companies</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Plans</option>
          <option value="starter">Starter</option>
          <option value="professional">Professional</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{company.name}</div>
                    <div className="text-gray-400 text-sm">{company.domain}</div>
                  </div>
                </div>
                <Badge className={`${
                  company.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  company.status === 'trial' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {company.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Security Score</span>
                  <span className={`font-bold ${
                    company.securityScore >= 90 ? 'text-green-400' :
                    company.securityScore >= 70 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {company.securityScore}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Employees</span>
                  <span className="text-white">{company.employees}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Plan</span>
                  <Badge className={`${
                    company.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                    company.plan === 'professional' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {company.plan}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-sm">{company.threats}</div>
                    <div className="text-gray-500 text-xs">Threats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold text-sm">{company.vulnerabilities}</div>
                    <div className="text-gray-500 text-xs">Vulnerabilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-sm">{company.compliance}%</div>
                    <div className="text-gray-500 text-xs">Compliance</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <button className="flex-1 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                    Manage
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SecurityCenterView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Security Center</h1>
          <p className="text-gray-400">Real-time security monitoring and threat detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400">Real-time Monitoring</Badge>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Scans',
            value: '47',
            change: '+12%',
            icon: Activity,
            color: 'blue'
          },
          {
            title: 'Threats Blocked',
            value: '1,247',
            change: '+8%',
            icon: Shield,
            color: 'green'
          },
          {
            title: 'Vulnerabilities',
            value: '89',
            change: '-15%',
            icon: AlertTriangle,
            color: 'orange'
          },
          {
            title: 'Incidents Resolved',
            value: '156',
            change: '+22%',
            icon: CheckCircle,
            color: 'purple'
          }
        ].map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-white text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Threat Map and Recent Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Global Threat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gray-900 rounded-lg p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-white font-bold">247 Protected Networks</div>
                  <div className="text-gray-400 text-sm">Across 45 countries</div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">234</div>
                      <div className="text-gray-500 text-xs">Secure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400 font-bold">11</div>
                      <div className="text-gray-500 text-xs">Monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-bold">2</div>
                      <div className="text-gray-500 text-xs">Under Attack</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'DDoS Attack',
                  target: 'TechCorp Solutions',
                  severity: 'high',
                  time: '5 min ago',
                  status: 'blocked'
                },
                {
                  type: 'Phishing Email',
                  target: 'FinanceFirst Bank',
                  severity: 'medium',
                  time: '12 min ago',
                  status: 'quarantined'
                },
                {
                  type: 'Malware Detection',
                  target: 'HealthPlus Medical',
                  severity: 'high',
                  time: '25 min ago',
                  status: 'cleaned'
                },
                {
                  type: 'Unauthorized Access',
                  target: 'StartupXYZ',
                  severity: 'critical',
                  time: '1 hour ago',
                  status: 'investigating'
                }
              ].map((threat, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    threat.severity === 'critical' ? 'bg-red-500' :
                    threat.severity === 'high' ? 'bg-orange-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{threat.type}</div>
                    <div className="text-gray-400 text-xs">{threat.target}</div>
                  </div>
                  <Badge className={`text-xs ${
                    threat.status === 'blocked' || threat.status === 'cleaned' ? 'bg-green-500/20 text-green-400' :
                    threat.status === 'quarantined' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {threat.status}
                  </Badge>
                  <div className="text-gray-500 text-xs">{threat.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ComplianceView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Compliance Management</h1>
          <p className="text-gray-400">Monitor compliance across all regulatory frameworks</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400">96.2% Overall Compliance</Badge>
      </div>

      {/* Compliance Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'GDPR', compliance: 96, status: 'compliant', color: 'green' },
          { name: 'HIPAA', compliance: 94, status: 'compliant', color: 'green' },
          { name: 'SOX', compliance: 91, status: 'compliant', color: 'green' },
          { name: 'PCI DSS', compliance: 88, status: 'warning', color: 'orange' }
        ].map((framework) => (
          <Card key={framework.name} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">{framework.name}</h3>
                <Badge className={`bg-${framework.color}-500/20 text-${framework.color}-400`}>
                  {framework.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{framework.compliance}%</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-${framework.color}-400 h-2 rounded-full`}
                  style={{ width: `${framework.compliance}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Compliance Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: 'FinanceFirst Bank',
                  framework: 'SOX',
                  status: 'passed',
                  date: '2 hours ago'
                },
                {
                  company: 'HealthPlus Medical',
                  framework: 'HIPAA',
                  status: 'passed',
                  date: '6 hours ago'
                },
                {
                  company: 'TechCorp Solutions',
                  framework: 'GDPR',
                  status: 'minor_issues',
                  date: '1 day ago'
                },
                {
                  company: 'RetailGiant Corp',
                  framework: 'PCI DSS',
                  status: 'failed',
                  date: '2 days ago'
                }
              ].map((check, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    check.status === 'passed' ? 'bg-green-400' :
                    check.status === 'minor_issues' ? 'bg-orange-400' : 'bg-red-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{check.company}</div>
                    <div className="text-gray-400 text-xs">{check.framework} compliance check</div>
                  </div>
                  <Badge className={`text-xs ${
                    check.status === 'passed' ? 'bg-green-500/20 text-green-400' :
                    check.status === 'minor_issues' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {check.status.replace('_', ' ')}
                  </Badge>
                  <div className="text-gray-500 text-xs">{check.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Compliance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { framework: 'GDPR', trend: '+2.1%', companies: 67 },
                { framework: 'HIPAA', trend: '+1.8%', companies: 45 },
                { framework: 'SOX', trend: '+0.9%', companies: 23 },
                { framework: 'PCI DSS', trend: '-1.2%', companies: 34 }
              ].map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{trend.framework}</div>
                    <div className="text-gray-400 text-sm">{trend.companies} companies</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      trend.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trend.trend}
                    </div>
                    <div className="text-gray-400 text-sm">this month</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-gray-400">Business intelligence and security metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white">
            <Download className="w-4 h-4 inline mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue & Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <Badge className="bg-green-500/20 text-green-400">+12.8%</Badge>
            </div>
            <div className="text-white text-2xl font-bold">$1.03M</div>
            <div className="text-gray-400 text-sm">Monthly Revenue</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">+5.2%</Badge>
            </div>
            <div className="text-white text-2xl font-bold">47,500</div>
            <div className="text-gray-400 text-sm">Protected Employees</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400">-15.3%</Badge>
            </div>
            <div className="text-white text-2xl font-bold">1,247</div>
            <div className="text-gray-400 text-sm">Threats Blocked</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <Badge className="bg-orange-500/20 text-orange-400">2.1%</Badge>
            </div>
            <div className="text-white text-2xl font-bold">2.1%</div>
            <div className="text-gray-400 text-sm">Churn Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Industry and Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Industry Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { industry: 'Technology', count: 89, percentage: 36, color: 'blue' },
                { industry: 'Financial Services', count: 67, percentage: 27, color: 'green' },
                { industry: 'Healthcare', count: 45, percentage: 18, color: 'purple' },
                { industry: 'Education', count: 28, percentage: 11, color: 'orange' },
                { industry: 'Retail', count: 18, percentage: 8, color: 'pink' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{item.industry}</span>
                      <span className="text-gray-400">{item.count} companies</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-${item.color}-400 h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { plan: 'Enterprise', count: 156, revenue: 780000, color: 'purple' },
                { plan: 'Professional', count: 78, revenue: 234000, color: 'blue' },
                { plan: 'Starter', count: 13, revenue: 13000, color: 'gray' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 bg-${item.color}-400 rounded-full`}></div>
                    <div>
                      <div className="text-white font-medium">{item.plan}</div>
                      <div className="text-gray-400 text-sm">{item.count} companies</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">${(item.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-gray-400 text-sm">monthly</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const BillingView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Billing & Revenue</h1>
          <p className="text-gray-400">Financial overview and transaction management</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            <Plus className="w-4 h-4 inline mr-2" />
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Monthly Revenue</div>
              <div className="text-white text-3xl font-bold">$1.03M</div>
              <div className="text-green-400 text-sm mt-2">+12.8% growth</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Annual Revenue</div>
              <div className="text-white text-3xl font-bold">$12.3M</div>
              <div className="text-blue-400 text-sm mt-2">Projected</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Outstanding</div>
              <div className="text-white text-3xl font-bold">$45.6K</div>
              <div className="text-orange-400 text-sm mt-2">23 invoices</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Avg Revenue/User</div>
              <div className="text-white text-3xl font-bold">$4,158</div>
              <div className="text-purple-400 text-sm mt-2">Per month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 'TXN-001',
                company: 'TechCorp Solutions',
                amount: 5000,
                plan: 'Enterprise',
                date: '2024-06-15',
                status: 'paid'
              },
              {
                id: 'TXN-002',
                company: 'FinanceFirst Bank',
                amount: 7500,
                plan: 'Enterprise',
                date: '2024-06-14',
                status: 'paid'
              },
              {
                id: 'TXN-003',
                company: 'HealthPlus Medical',
                amount: 3000,
                plan: 'Professional',
                date: '2024-06-12',
                status: 'pending'
              },
              {
                id: 'TXN-004',
                company: 'StartupXYZ',
                amount: 1000,
                plan: 'Starter',
                date: '2024-06-10',
                status: 'overdue'
              }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center gap-6 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex-1">
                  <div className="text-white font-medium">{transaction.company}</div>
                  <div className="text-gray-400 text-sm">{transaction.id} • {transaction.plan}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">${transaction.amount.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">{transaction.date}</div>
                </div>
                <Badge className={`${
                  transaction.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                  transaction.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'companies':
        return <CompaniesView />;
      case 'security':
        return <SecurityCenterView />;
      case 'compliance':
        return <ComplianceView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'billing':
        return <BillingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default EnterpriseSaaS;