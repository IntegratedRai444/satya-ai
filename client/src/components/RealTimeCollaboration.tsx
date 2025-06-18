import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  Bell, 
  Share2, 
  Video, 
  Phone,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Paperclip,
  Eye,
  Target,
  Activity
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  avatar: string;
  location: string;
  expertise: string[];
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  type: 'message' | 'alert' | 'system' | 'file';
  attachments?: any[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

interface SecurityAlert {
  id: string;
  title: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved';
  assignedTo: string[];
  description: string;
  timestamp: string;
  responses: number;
}

export function RealTimeCollaboration() {
  const [activeTab, setActiveTab] = useState('chat');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    // Initialize team members
    const members: TeamMember[] = [
      {
        id: 'user_001',
        name: 'Sarah Chen',
        role: 'Security Analyst',
        status: 'online',
        avatar: '/api/placeholder/40/40',
        location: 'San Francisco, CA',
        expertise: ['Malware Analysis', 'Incident Response', 'SIEM']
      },
      {
        id: 'user_002',
        name: 'Marcus Rodriguez',
        role: 'Threat Hunter',
        status: 'online',
        avatar: '/api/placeholder/40/40',
        location: 'Austin, TX',
        expertise: ['APT Detection', 'Network Forensics', 'IOC Analysis']
      },
      {
        id: 'user_003',
        name: 'Emily Watson',
        role: 'Security Engineer',
        status: 'away',
        avatar: '/api/placeholder/40/40',
        location: 'New York, NY',
        expertise: ['Cloud Security', 'DevSecOps', 'Compliance']
      },
      {
        id: 'user_004',
        name: 'David Kim',
        role: 'SOC Manager',
        status: 'busy',
        avatar: '/api/placeholder/40/40',
        location: 'Seattle, WA',
        expertise: ['Team Leadership', 'Risk Assessment', 'Strategic Planning']
      }
    ];

    // Initialize chat messages
    const messages: ChatMessage[] = [
      {
        id: 'msg_001',
        userId: 'user_001',
        userName: 'Sarah Chen',
        userAvatar: '/api/placeholder/40/40',
        message: 'Just detected suspicious activity on the finance network. Investigating now.',
        timestamp: '2025-01-17T13:45:00Z',
        type: 'alert',
        priority: 'high'
      },
      {
        id: 'msg_002',
        userId: 'user_002',
        userName: 'Marcus Rodriguez',
        userAvatar: '/api/placeholder/40/40',
        message: 'I can assist with the threat hunting. Pulling IOCs from our threat intelligence feeds.',
        timestamp: '2025-01-17T13:46:30Z',
        type: 'message'
      },
      {
        id: 'msg_003',
        userId: 'user_003',
        userName: 'Emily Watson',
        userAvatar: '/api/placeholder/40/40',
        message: 'Checking cloud infrastructure logs for any related activity.',
        timestamp: '2025-01-17T13:47:15Z',
        type: 'message'
      }
    ];

    // Initialize security alerts
    const securityAlerts: SecurityAlert[] = [
      {
        id: 'alert_001',
        title: 'APT Group Activity Detected',
        severity: 'CRITICAL',
        status: 'investigating',
        assignedTo: ['user_001', 'user_002'],
        description: 'Advanced persistent threat indicators found in network traffic',
        timestamp: '2025-01-17T13:30:00Z',
        responses: 5
      },
      {
        id: 'alert_002',
        title: 'Unusual Data Exfiltration Pattern',
        severity: 'HIGH',
        status: 'new',
        assignedTo: ['user_003'],
        description: 'Large volume data transfer to external IP detected',
        timestamp: '2025-01-17T13:42:00Z',
        responses: 2
      },
      {
        id: 'alert_003',
        title: 'Failed Authentication Spike',
        severity: 'MEDIUM',
        status: 'acknowledged',
        assignedTo: ['user_004'],
        description: 'Increased failed login attempts across multiple systems',
        timestamp: '2025-01-17T13:15:00Z',
        responses: 8
      }
    ];

    setTeamMembers(members);
    setChatMessages(messages);
    setAlerts(securityAlerts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="h-4 w-4 text-red-400" />;
      case 'acknowledged': return <Eye className="h-4 w-4 text-yellow-400" />;
      case 'investigating': return <Activity className="h-4 w-4 text-blue-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: 'current_user',
      userName: 'You',
      userAvatar: '/api/placeholder/40/40',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const startVideoCall = () => {
    // Video call implementation would go here
    console.log('Starting video call with selected members:', selectedMembers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="h-10 w-10 text-green-400" />
            Real-Time Security Collaboration
          </h1>
          <p className="text-slate-300 text-lg">
            Coordinate security operations with your team in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Team Members Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Team Members
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {teamMembers.filter(m => m.status === 'online').length} online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer"
                        onClick={() => {
                          if (selectedMembers.includes(member.id)) {
                            setSelectedMembers(prev => prev.filter(id => id !== member.id));
                          } else {
                            setSelectedMembers(prev => [...prev, member.id]);
                          }
                        }}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-slate-600 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium truncate">{member.name}</div>
                          <div className="text-slate-400 text-sm truncate">{member.role}</div>
                          <div className="text-slate-500 text-xs">{member.location}</div>
                        </div>
                        {selectedMembers.includes(member.id) && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 space-y-2">
                  <Button 
                    onClick={startVideoCall}
                    disabled={selectedMembers.length === 0}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call ({selectedMembers.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Audio Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Collaboration Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
                <TabsTrigger value="chat" className="text-white data-[state=active]:bg-green-600">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </TabsTrigger>
                <TabsTrigger value="alerts" className="text-white data-[state=active]:bg-green-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Security Alerts
                </TabsTrigger>
                <TabsTrigger value="shared" className="text-white data-[state=active]:bg-green-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Shared Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-400" />
                        Security Operations Chat
                      </span>
                      <Badge className="bg-green-600 text-white">
                        {teamMembers.filter(m => m.status === 'online').length} Active
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96 mb-4">
                      <div className="space-y-4">
                        {chatMessages.map((message) => (
                          <div key={message.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.userAvatar} />
                              <AvatarFallback className="bg-slate-600 text-white text-xs">
                                {message.userName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium">{message.userName}</span>
                                <span className="text-slate-400 text-xs">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                                {message.priority && (
                                  <Badge className={`text-xs ${message.priority === 'high' ? 'bg-red-600' : message.priority === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'}`}>
                                    {message.priority}
                                  </Badge>
                                )}
                              </div>
                              <div className={`text-sm p-3 rounded-lg ${message.type === 'alert' ? 'bg-red-900/30 border border-red-600/30' : 'bg-slate-700'}`}>
                                {message.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-400 inline mr-2" />}
                                <span className="text-slate-300">{message.message}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="bg-slate-700 border-slate-600 text-white resize-none"
                        rows={2}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                      />
                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white flex items-center gap-2">
                            {getAlertStatusIcon(alert.status)}
                            {alert.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {alert.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-slate-300">
                          {alert.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300 text-sm">
                                {new Date(alert.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300 text-sm">{alert.responses} responses</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Target className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shared" className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-green-400" />
                      Shared Security Resources
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Collaborative workspace for security documentation and tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-700 rounded-lg">
                        <Shield className="h-8 w-8 text-blue-400 mb-3" />
                        <h3 className="text-white font-medium mb-2">Incident Playbooks</h3>
                        <p className="text-slate-300 text-sm">Standardized response procedures</p>
                      </div>
                      <div className="p-4 bg-slate-700 rounded-lg">
                        <Target className="h-8 w-8 text-red-400 mb-3" />
                        <h3 className="text-white font-medium mb-2">Threat Intelligence</h3>
                        <p className="text-slate-300 text-sm">Latest IOCs and threat data</p>
                      </div>
                      <div className="p-4 bg-slate-700 rounded-lg">
                        <Activity className="h-8 w-8 text-green-400 mb-3" />
                        <h3 className="text-white font-medium mb-2">Live Dashboards</h3>
                        <p className="text-slate-300 text-sm">Real-time security metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}