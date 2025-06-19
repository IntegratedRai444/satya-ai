import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Settings,
  Code,
  Database,
  Terminal,
  Cpu,
  Network,
  Key,
  Shield,
  Users,
  Activity,
  Zap,
  Brain,
  Target,
  Building2
} from 'lucide-react';

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

interface DeveloperDashboardProps {
  user: AuthenticatedUser;
}

export default function DeveloperDashboard({ user }: DeveloperDashboardProps) {
  const systemMetrics = {
    serverHealth: 98.5,
    databaseConnections: 847,
    activeUsers: 1250,
    apiRequests: 15420,
    threatsBlocked: 342,
    systemLoad: 67.3
  };

  const developerTools = [
    {
      name: 'System Console',
      description: 'Direct system access and configuration',
      icon: Terminal,
      status: 'online',
      usage: 95
    },
    {
      name: 'Database Manager',
      description: 'Database administration and monitoring',
      icon: Database,
      status: 'online',
      usage: 73
    },
    {
      name: 'API Gateway',
      description: 'API management and endpoint configuration',
      icon: Network,
      status: 'online',
      usage: 86
    },
    {
      name: 'Security Engine',
      description: 'Core security algorithm management',
      icon: Shield,
      status: 'online',
      usage: 91
    },
    {
      name: 'AI Model Hub',
      description: 'Machine learning model deployment',
      icon: Brain,
      status: 'online',
      usage: 78
    },
    {
      name: 'User Access Control',
      description: 'Permission and role management',
      icon: Users,
      status: 'online',
      usage: 64
    }
  ];

  const recentLogs = [
    { time: '14:32:15', level: 'INFO', message: 'System health check completed successfully' },
    { time: '14:31:42', level: 'DEBUG', message: 'AI model retrained with new threat patterns' },
    { time: '14:30:18', level: 'WARN', message: 'High CPU usage detected on node-03' },
    { time: '14:29:55', level: 'INFO', message: 'Database backup completed' },
    { time: '14:28:33', level: 'ERROR', message: 'Failed authentication attempt from IP 192.168.1.100' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 border-green-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'error': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-400';
      case 'DEBUG': return 'text-green-400';
      case 'WARN': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Developer Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Developer Control Center
            </h1>
            <p className="text-slate-400">Full system access and development environment</p>
          </div>
        </div>

        {/* Developer Access Badge */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
            DEVELOPER ACCESS
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {user.email}
          </Badge>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Card className="bg-slate-900 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <Cpu className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-slate-400">Server Health</p>
            <p className="text-2xl font-bold text-green-400">
              {systemMetrics.serverHealth}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-5 h-5 text-blue-400" />
              <Network className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm text-slate-400">DB Connections</p>
            <p className="text-2xl font-bold text-blue-400">
              {systemMetrics.databaseConnections.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-sm text-slate-400">Active Users</p>
            <p className="text-2xl font-bold text-purple-400">
              {systemMetrics.activeUsers.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-sm text-slate-400">API Requests</p>
            <p className="text-2xl font-bold text-cyan-400">
              {systemMetrics.apiRequests.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-red-400" />
              <Target className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-sm text-slate-400">Threats Blocked</p>
            <p className="text-2xl font-bold text-red-400">
              {systemMetrics.threatsBlocked}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-orange-400" />
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-sm text-slate-400">System Load</p>
            <p className="text-2xl font-bold text-orange-400">
              {systemMetrics.systemLoad}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Developer Tools */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                Developer Tools & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {developerTools.map((tool, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <tool.icon className="w-5 h-5 text-blue-400" />
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
                        <span className="text-slate-400">Usage</span>
                        <span className="text-blue-400">{tool.usage}%</span>
                      </div>
                      <Progress value={tool.usage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Logs & Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <div key={index} className="p-3 bg-slate-800 rounded-lg border-l-2 border-slate-600">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{log.time}</span>
                      <Badge variant="outline" className={`text-xs ${getLogLevelColor(log.level)} border-current`}>
                        {log.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">{log.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Terminal className="w-4 h-4 mr-2" />
                System Console
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Database className="w-4 h-4 mr-2" />
                Database Manager
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Network className="w-4 h-4 mr-2" />
                API Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}