import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import {
  Shield,
  Lock,
  Eye,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  Users,
  Database,
  Network,
  Settings,
  FileText,
  Clock,
  TrendingUp,
  Target,
  Brain,
  Fingerprint
} from 'lucide-react';

interface SecurityMetric {
  label: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface SecurityAlert {
  id: string;
  type: 'threat' | 'compliance' | 'access' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export default function StreamlinedSecurityCenter() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock security data - replace with real API calls
  const securityMetrics: SecurityMetric[] = [
    {
      label: 'Threat Detection Rate',
      value: 98.7,
      status: 'good',
      trend: 'up',
      description: 'AI-powered threat detection accuracy'
    },
    {
      label: 'System Security Score',
      value: 94.2,
      status: 'good',
      trend: 'stable',
      description: 'Overall platform security health'
    },
    {
      label: 'Access Control Compliance',
      value: 89.5,
      status: 'warning',
      trend: 'down',
      description: 'User access policy adherence'
    },
    {
      label: 'Data Protection Level',
      value: 96.8,
      status: 'good',
      trend: 'up',
      description: 'Data encryption and privacy protection'
    }
  ];

  const securityAlerts: SecurityAlert[] = [
    {
      id: 'alert_001',
      type: 'threat',
      severity: 'high',
      title: 'Suspicious Login Attempt Detected',
      description: 'Multiple failed login attempts from unknown IP address',
      timestamp: '2025-06-18T16:30:00Z',
      resolved: false
    },
    {
      id: 'alert_002',
      type: 'compliance',
      severity: 'medium',
      title: 'Access Review Required',
      description: 'Quarterly access review deadline approaching',
      timestamp: '2025-06-18T14:15:00Z',
      resolved: false
    },
    {
      id: 'alert_003',
      type: 'system',
      severity: 'low',
      title: 'Security Update Available',
      description: 'New security patches available for installation',
      timestamp: '2025-06-18T12:00:00Z',
      resolved: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'compliance': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'access': return <Lock className="w-4 h-4 text-purple-400" />;
      case 'system': return <Settings className="w-4 h-4 text-gray-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Security Center
            </h1>
            <p className="text-slate-400">Comprehensive security monitoring and management</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{metric.label}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                  <Badge variant="outline" className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <Progress value={metric.value} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Security Dashboard */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Security Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 gap-1 h-auto p-1 bg-slate-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
                    Monitoring
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-600">
                    Compliance
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Eye className="w-5 h-5 text-cyan-400" />
                          <h3 className="font-semibold">Threat Detection</h3>
                        </div>
                        <p className="text-2xl font-bold text-cyan-400 mb-2">847</p>
                        <p className="text-sm text-slate-400">Threats detected today</p>
                        <div className="mt-3 p-2 bg-slate-900 rounded">
                          <div className="flex justify-between text-xs">
                            <span>Blocked</span>
                            <span className="text-green-400">842</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Under Review</span>
                            <span className="text-yellow-400">5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold">User Activity</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-400 mb-2">1,247</p>
                        <p className="text-sm text-slate-400">Active sessions</p>
                        <div className="mt-3 p-2 bg-slate-900 rounded">
                          <div className="flex justify-between text-xs">
                            <span>Authenticated</span>
                            <span className="text-green-400">1,245</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Suspicious</span>
                            <span className="text-red-400">2</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Database className="w-5 h-5 text-green-400" />
                          <h3 className="font-semibold">Data Protection</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mb-2">99.9%</p>
                        <p className="text-sm text-slate-400">Encryption coverage</p>
                        <div className="mt-3">
                          <Progress value={99.9} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Network className="w-5 h-5 text-orange-400" />
                          <h3 className="font-semibold">Network Security</h3>
                        </div>
                        <p className="text-2xl font-bold text-orange-400 mb-2">Secure</p>
                        <p className="text-sm text-slate-400">All endpoints protected</p>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Firewall Active
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-4">
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">Real-time monitoring dashboard</p>
                    <p className="text-sm text-slate-500">Monitor system performance and security events</p>
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-4">
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">Compliance management</p>
                    <p className="text-sm text-slate-500">Track regulatory compliance and audit requirements</p>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">Security reports</p>
                    <p className="text-sm text-slate-500">Generate and export security analysis reports</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Security Alerts Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.type)}
                          <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {alert.resolved ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-slate-400 mb-3">{alert.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        <Badge variant="outline" className="text-purple-400 border-purple-400 text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      
                      {!alert.resolved && (
                        <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                          Investigate
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Run Security Scan
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Users className="w-4 h-4 mr-2" />
                Review User Access
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Update Policies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}