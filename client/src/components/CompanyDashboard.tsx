import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Globe,
  Activity,
  Target,
  FileText,
  Crown,
  Brain,
  Eye,
  Settings
} from 'lucide-react';

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'founder' | 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

interface CompanyDashboardProps {
  user: AuthenticatedUser;
}

export default function CompanyDashboard({ user }: CompanyDashboardProps) {
  const companyMetrics = {
    totalEmployees: 347,
    securityScore: 87.3,
    threatsBlocked: 1247,
    complianceLevel: 94.7,
    teamProductivity: 91.2,
    securityTraining: 78.5
  };

  const businessTools = [
    {
      name: 'Team Analytics',
      description: 'Employee behavior and performance insights',
      icon: Users,
      status: 'active',
      usage: 89
    },
    {
      name: 'Compliance Center',
      description: 'Regulatory compliance monitoring',
      icon: CheckCircle,
      status: 'active',
      usage: 94
    },
    {
      name: 'Security Reports',
      description: 'Business security analysis and reporting',
      icon: Shield,
      status: 'active',
      usage: 76
    },
    {
      name: 'Threat Intelligence',
      description: 'Industry threat reports and updates',
      icon: Brain,
      status: 'active',
      usage: 83
    },
    {
      name: 'Business Audit',
      description: 'Comprehensive security assessments',
      icon: FileText,
      status: 'active',
      usage: 67
    },
    {
      name: 'Enterprise Hub',
      description: 'Central business command center',
      icon: Crown,
      status: 'active',
      usage: 92
    }
  ];

  const securityAlerts = [
    { time: '2 hours ago', level: 'MEDIUM', message: 'Unusual login pattern detected from Marketing team' },
    { time: '4 hours ago', level: 'LOW', message: 'Routine security scan completed successfully' },
    { time: '6 hours ago', level: 'HIGH', message: 'Suspicious email attachments blocked in Finance department' },
    { time: '8 hours ago', level: 'LOW', message: 'Employee security training completion reminder sent' },
    { time: '10 hours ago', level: 'MEDIUM', message: 'VPN connection anomaly detected and resolved' }
  ];

  const complianceStatus = [
    { framework: 'GDPR', status: 'compliant', score: 96 },
    { framework: 'HIPAA', status: 'compliant', score: 89 },
    { framework: 'SOC 2', status: 'in-progress', score: 78 },
    { framework: 'ISO 27001', status: 'compliant', score: 94 },
    { framework: 'PCI DSS', status: 'compliant', score: 91 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'inactive': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-400 border-green-400';
      case 'MEDIUM': return 'text-yellow-400 border-yellow-400';
      case 'HIGH': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'in-progress': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'non-compliant': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Company Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Company Security Center
            </h1>
            <p className="text-slate-400">Business analytics and team security management</p>
          </div>
        </div>

        {/* Company Access Badge */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400 bg-cyan-400/10">
            COMPANY ACCESS
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {user.email}
          </Badge>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Card className="bg-slate-900 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <Building2 className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-sm text-slate-400">Total Employees</p>
            <p className="text-2xl font-bold text-cyan-400">
              {companyMetrics.totalEmployees}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-slate-400">Security Score</p>
            <p className="text-2xl font-bold text-green-400">
              {companyMetrics.securityScore}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-red-400" />
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-sm text-slate-400">Threats Blocked</p>
            <p className="text-2xl font-bold text-red-400">
              {companyMetrics.threatsBlocked.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm text-slate-400">Compliance</p>
            <p className="text-2xl font-bold text-blue-400">
              {companyMetrics.complianceLevel}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-sm text-slate-400">Productivity</p>
            <p className="text-2xl font-bold text-purple-400">
              {companyMetrics.teamProductivity}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-yellow-400" />
              <Users className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-sm text-slate-400">Training</p>
            <p className="text-2xl font-bold text-yellow-400">
              {companyMetrics.securityTraining}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Business Tools */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-cyan-400" />
                Business Security Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {businessTools.map((tool, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <tool.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-sm text-slate-400">{tool.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(tool.status)}>
                        {tool.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Utilization</span>
                        <span className="text-cyan-400">{tool.usage}%</span>
                      </div>
                      <Progress value={tool.usage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Security Alerts & Compliance */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-slate-800 rounded-lg border-l-2 border-slate-600">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{alert.time}</span>
                      <Badge variant="outline" className={`text-xs ${getAlertLevelColor(alert.level)} border-current`}>
                        {alert.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium">{item.framework}</p>
                    <p className="text-xs text-slate-400">Score: {item.score}%</p>
                  </div>
                  <Badge variant="outline" className={getComplianceColor(item.status)}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 justify-start">
                <Users className="w-4 h-4 mr-2" />
                Team Management
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Security Reports
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <CheckCircle className="w-4 h-4 mr-2" />
                Compliance Center
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Crown className="w-4 h-4 mr-2" />
                Enterprise Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}