import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  AlertTriangle,
  Shield,
  Target,
  Zap,
  Activity,
  Eye,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AnimatedThreatTimeline() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const threatEvents = [
    {
      id: 1,
      time: '09:15:23',
      type: 'Phishing Attempt',
      severity: 'Medium',
      source: 'External Email',
      target: 'Finance Department',
      status: 'Blocked',
      description: 'Suspicious email with malicious link detected and quarantined',
      impact: 'Potential credential theft prevented',
      animation: 'bounce'
    },
    {
      id: 2,
      time: '10:32:45',
      type: 'Malware Detection',
      severity: 'High',
      source: 'USB Device',
      target: 'Workstation-047',
      status: 'Contained',
      description: 'Trojan horse detected on removable media',
      impact: 'System isolation and cleanup completed',
      animation: 'pulse'
    },
    {
      id: 3,
      time: '11:47:12',
      type: 'Unauthorized Access',
      severity: 'Critical',
      source: 'External IP',
      target: 'Database Server',
      status: 'Investigating',
      description: 'Failed login attempts from suspicious IP address',
      impact: 'Account lockout triggered, monitoring escalated',
      animation: 'flash'
    },
    {
      id: 4,
      time: '13:22:18',
      type: 'Data Exfiltration',
      severity: 'Critical',
      source: 'Internal Network',
      target: 'File Server',
      status: 'Mitigated',
      description: 'Unusual data transfer patterns detected',
      impact: 'Network segmentation activated, access revoked',
      animation: 'shake'
    },
    {
      id: 5,
      time: '14:55:33',
      type: 'Ransomware Activity',
      severity: 'Critical',
      source: 'Email Attachment',
      target: 'HR Department',
      status: 'Prevented',
      description: 'Encryption behavior detected and stopped',
      impact: 'Zero data loss, system restored from backup',
      animation: 'glow'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-orange-400 border-orange-400 bg-orange-400/10';
      case 'Critical': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Blocked': return 'text-green-400';
      case 'Contained': return 'text-blue-400';
      case 'Investigating': return 'text-yellow-400';
      case 'Mitigated': return 'text-purple-400';
      case 'Prevented': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getAnimationClass = (animation: string, isActive: boolean) => {
    if (!isActive) return '';
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'flash': return 'animate-ping';
      case 'shake': return 'animate-bounce';
      case 'glow': return 'animate-pulse';
      default: return '';
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % threatEvents.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, threatEvents.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Animated Threat Timeline
            </h1>
            <p className="text-slate-400">Interactive storytelling for security events</p>
          </div>
        </div>

        {/* Timeline Controls */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button 
            onClick={() => setCurrentTime(0)}
            className="bg-slate-600 hover:bg-slate-700"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Badge variant="outline" className="text-orange-400 border-orange-400">
            Event {currentTime + 1} of {threatEvents.length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Timeline Visualization */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                Security Event Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-600"></div>
                
                {/* Timeline Events */}
                <div className="space-y-6">
                  {threatEvents.map((event, index) => (
                    <div 
                      key={event.id}
                      className={`relative flex items-start cursor-pointer transition-all duration-300 ${
                        index === currentTime ? 'scale-105' : 'opacity-60'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                        index === currentTime 
                          ? getSeverityColor(event.severity).replace('text-', 'border-').split(' ')[0] + ' bg-slate-900'
                          : 'border-slate-600 bg-slate-800'
                      } ${getAnimationClass(event.animation, index === currentTime)}`}>
                      </div>
                      
                      {/* Event Card */}
                      <div className={`ml-4 flex-1 ${getAnimationClass(event.animation, index === currentTime)}`}>
                        <Card className={`bg-slate-800 border-slate-700 transition-all duration-300 ${
                          index === currentTime ? 'border-orange-500 shadow-lg shadow-orange-500/20' : ''
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400">{event.time}</span>
                                <Badge variant="outline" className={getSeverityColor(event.severity)}>
                                  {event.severity}
                                </Badge>
                              </div>
                              <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-white mb-1">{event.type}</h3>
                            <p className="text-sm text-slate-400 mb-2">{event.description}</p>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Source: {event.source}</span>
                              <span>Target: {event.target}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details & Analytics */}
        <div className="space-y-6">
          {/* Current Event Details */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvent || threatEvents[currentTime] ? (
                <div className="space-y-4">
                  {(() => {
                    const event = selectedEvent || threatEvents[currentTime];
                    return (
                      <>
                        <div>
                          <h3 className="font-semibold text-white mb-2">{event.type}</h3>
                          <Badge variant="outline" className={getSeverityColor(event.severity)}>
                            {event.severity} Severity
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-slate-400">Description</p>
                            <p className="text-sm text-white">{event.description}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-400">Impact</p>
                            <p className="text-sm text-white">{event.impact}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Source</p>
                              <p className="text-white">{event.source}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Target</p>
                              <p className="text-white">{event.target}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-slate-400">Status</p>
                            <p className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                              {event.status}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-slate-400">Select an event to view details</p>
              )}
            </CardContent>
          </Card>

          {/* Threat Statistics */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Threat Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-400">3</p>
                  <p className="text-xs text-slate-400">Critical Threats</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-400">100%</p>
                  <p className="text-xs text-slate-400">Threat Response</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Response Time</span>
                  <span className="text-green-400">2.3 min avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Detection Rate</span>
                  <span className="text-blue-400">99.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">False Positives</span>
                  <span className="text-yellow-400">0.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Actions */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Timeline Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Export Timeline
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}