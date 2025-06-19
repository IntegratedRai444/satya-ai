import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye,
  Calendar,
  Download,
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Target
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DailySecurityReports() {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [securityMetrics, setSecurityMetrics] = useState({
    overallScore: 97,
    threatsBlocked: 1847,
    incidentsResolved: 23,
    systemUptime: 99.8,
    vulnerabilitiesFixed: 15,
    complianceScore: 94
  });

  const todayReports = [
    {
      title: 'Daily Threat Summary',
      type: 'Threat Intelligence',
      time: '06:00 AM',
      status: 'completed',
      threats: 45,
      blocked: 43,
      severity: 'Medium',
      summary: 'Detected and mitigated 43 of 45 identified threats. 2 low-priority items under investigation.'
    },
    {
      title: 'Security Compliance Check',
      type: 'Compliance',
      time: '08:00 AM', 
      status: 'completed',
      score: 97,
      issues: 2,
      severity: 'Low',
      summary: 'Overall compliance at 97%. Minor configuration adjustments recommended for GDPR alignment.'
    },
    {
      title: 'Vulnerability Assessment',
      type: 'Assessment',
      time: '10:00 AM',
      status: 'completed',
      found: 8,
      patched: 6,
      severity: 'Medium',
      summary: '6 vulnerabilities patched successfully. 2 remaining items scheduled for next maintenance window.'
    },
    {
      title: 'User Activity Analysis',
      type: 'Behavioral',
      time: '12:00 PM',
      status: 'completed',
      users: 1247,
      anomalies: 3,
      severity: 'Low',
      summary: '1247 users monitored. 3 minor behavioral anomalies detected and resolved automatically.'
    },
    {
      title: 'Network Security Scan',
      type: 'Network',
      time: '02:00 PM',
      status: 'completed',
      endpoints: 892,
      secure: 889,
      severity: 'Low',
      summary: '892 endpoints scanned. 889 fully secure. 3 endpoints require routine updates.'
    },
    {
      title: 'Evening Security Briefing',
      type: 'Summary',
      time: '06:00 PM',
      status: 'in-progress',
      completion: 75,
      eta: '30 min',
      severity: 'Info',
      summary: 'Comprehensive end-of-day security summary in progress. Estimated completion in 30 minutes.'
    }
  ];

  const weeklyTrends = [
    { day: 'Mon', threats: 52, blocked: 50, score: 96 },
    { day: 'Tue', threats: 48, blocked: 47, score: 98 },
    { day: 'Wed', threats: 41, blocked: 40, score: 97 },
    { day: 'Thu', threats: 55, blocked: 53, score: 95 },
    { day: 'Fri', threats: 45, blocked: 43, score: 97 },
    { day: 'Sat', threats: 38, blocked: 38, score: 99 },
    { day: 'Sun', threats: 42, blocked: 41, score: 98 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'in-progress': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'pending': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      case 'failed': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      case 'Info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Daily Security Reports
            </h1>
            <p className="text-slate-400">Comprehensive daily security analysis and monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            <Calendar className="w-4 h-4 mr-2" />
            {currentDate}
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            Security Score: {securityMetrics.overallScore}%
          </Badge>
        </div>
      </div>

      {/* Daily Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Card className="bg-slate-900 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-sm text-slate-400">Security Score</p>
            <p className="text-2xl font-bold text-green-400">
              {securityMetrics.overallScore}%
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
              {securityMetrics.threatsBlocked.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm text-slate-400">Incidents Resolved</p>
            <p className="text-2xl font-bold text-blue-400">
              {securityMetrics.incidentsResolved}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-sm text-slate-400">System Uptime</p>
            <p className="text-2xl font-bold text-purple-400">
              {securityMetrics.systemUptime}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <Shield className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-sm text-slate-400">Vulnerabilities Fixed</p>
            <p className="text-2xl font-bold text-orange-400">
              {securityMetrics.vulnerabilitiesFixed}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <BarChart3 className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-sm text-slate-400">Compliance Score</p>
            <p className="text-2xl font-bold text-cyan-400">
              {securityMetrics.complianceScore}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Reports */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Today's Security Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayReports.map((report, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-slate-400">{report.type} • {report.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                        <p className={`text-sm font-medium ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3">{report.summary}</p>
                    
                    {report.status === 'in-progress' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-blue-400">{report.completion}%</span>
                        </div>
                        <Progress value={report.completion} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Trends & Actions */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Weekly Security Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyTrends.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">{day.day}</div>
                      <div className="text-xs text-slate-400">
                        {day.blocked}/{day.threats} blocked
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-400">{day.score}%</span>
                      <div className="w-12 h-2 bg-slate-700 rounded-full">
                        <div 
                          className="h-full bg-green-400 rounded-full"
                          style={{ width: `${day.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-400" />
                Report Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Daily Report
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Summary
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Detailed Analysis
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Schedule Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}