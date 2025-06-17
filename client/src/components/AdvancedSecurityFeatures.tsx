import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Bot, 
  Trophy, 
  Target, 
  Users, 
  FileText, 
  Brain, 
  Zap,
  ChartBar,
  MessageCircle,
  Gamepad2,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Sparkles,
  Activity,
  Globe,
  Download,
  Share2,
  Eye,
  Lightbulb,
  Puzzle
} from 'lucide-react';

interface ThreatIntelligence {
  id: string;
  source: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  timestamp: string;
  iocs: string[];
  mitreAttack: string[];
}

interface SecurityAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface RiskMetric {
  category: string;
  score: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  recommendations: string[];
}

export default function AdvancedSecurityFeatures() {
  const [threatIntel, setThreatIntel] = useState<ThreatIntelligence[]>([]);
  const [achievements, setAchievements] = useState<SecurityAchievement[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'mentor', emoji: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [gamificationScore, setGamificationScore] = useState(0);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Initialize threat intelligence data
    setThreatIntel([
      {
        id: 'ti-001',
        source: 'MISP',
        category: 'Malware',
        severity: 'CRITICAL',
        description: 'New APT group targeting financial institutions with advanced persistent threats',
        timestamp: new Date().toISOString(),
        iocs: ['192.168.1.100', 'malicious-domain.com', 'SHA256:abc123...'],
        mitreAttack: ['T1566', 'T1055', 'T1012']
      },
      {
        id: 'ti-002',
        source: 'OpenCTI',
        category: 'Phishing',
        severity: 'HIGH',
        description: 'Widespread phishing campaign using AI-generated emails',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        iocs: ['phishing-site.net', 'fake-bank.org'],
        mitreAttack: ['T1566.001', 'T1204']
      },
      {
        id: 'ti-003',
        source: 'MISP',
        category: 'Vulnerability',
        severity: 'MEDIUM',
        description: 'Zero-day vulnerability discovered in popular web framework',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        iocs: ['CVE-2024-XXXX'],
        mitreAttack: ['T1190']
      }
    ]);

    // Initialize achievements
    setAchievements([
      {
        id: 'ach-001',
        title: 'Threat Hunter',
        description: 'Identify 10 security threats',
        icon: '🎯',
        points: 100,
        unlocked: true,
        progress: 10,
        maxProgress: 10
      },
      {
        id: 'ach-002',
        title: 'Security Analyst',
        description: 'Complete 50 security assessments',
        icon: '🔍',
        points: 250,
        unlocked: false,
        progress: 23,
        maxProgress: 50
      },
      {
        id: 'ach-003',
        title: 'Incident Response Expert',
        description: 'Successfully resolve 25 security incidents',
        icon: '🚨',
        points: 500,
        unlocked: false,
        progress: 8,
        maxProgress: 25
      },
      {
        id: 'ach-004',
        title: 'AI Security Pioneer',
        description: 'Use AI-powered security tools 100 times',
        icon: '🤖',
        points: 300,
        unlocked: false,
        progress: 67,
        maxProgress: 100
      }
    ]);

    // Initialize risk metrics
    setRiskMetrics([
      {
        category: 'Network Security',
        score: 85,
        trend: 'UP',
        recommendations: ['Update firewall rules', 'Enable network segmentation']
      },
      {
        category: 'Endpoint Protection',
        score: 72,
        trend: 'STABLE',
        recommendations: ['Deploy EDR solutions', 'Update antivirus signatures']
      },
      {
        category: 'Identity & Access',
        score: 91,
        trend: 'UP',
        recommendations: ['Implement MFA', 'Review access permissions']
      },
      {
        category: 'Data Protection',
        score: 68,
        trend: 'DOWN',
        recommendations: ['Encrypt sensitive data', 'Implement DLP policies']
      }
    ]);

    // Initialize chat messages
    setChatMessages([
      {
        id: 'msg-001',
        text: 'Welcome to your personalized security mentor! 🛡️ How can I help you today?',
        sender: 'mentor',
        emoji: '🤖'
      }
    ]);

    setGamificationScore(1250);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      text: currentMessage,
      sender: 'user' as const,
      emoji: '👤'
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI mentor response
    setTimeout(() => {
      const responses = [
        { text: "Great question! Let me analyze that for you... 🔍", emoji: "🤖" },
        { text: "Based on current threat intelligence, I recommend... 💡", emoji: "🛡️" },
        { text: "That's an excellent security practice! Keep it up! 🌟", emoji: "👏" },
        { text: "Here's what our ML models are detecting... 📊", emoji: "🔬" }
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      const mentorMessage = {
        id: `msg-${Date.now() + 1}`,
        text: response.text,
        sender: 'mentor' as const,
        emoji: response.emoji
      };

      setChatMessages(prev => [...prev, mentorMessage]);
    }, 1000);

    setCurrentMessage('');
  };

  const generateCustomReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const reportData = {
      title: 'Advanced Security Intelligence Report',
      timestamp: new Date().toISOString(),
      threatCount: threatIntel.length,
      riskScore: Math.round(riskMetrics.reduce((acc, metric) => acc + metric.score, 0) / riskMetrics.length),
      recommendations: riskMetrics.flatMap(metric => metric.recommendations)
    };

    // Create downloadable report
    const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const reportUrl = URL.createObjectURL(reportBlob);
    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = 'security-intelligence-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(reportUrl);

    setIsGeneratingReport(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-black';
      case 'LOW': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'UP': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'DOWN': return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Advanced Security Intelligence Platform
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive cybersecurity features powered by AI and real-time threat intelligence
          </p>
        </div>

        <Tabs defaultValue="threat-intel" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="threat-intel" className="data-[state=active]:bg-cyan-600">
              <Globe className="w-4 h-4 mr-2" />
              Threat Intel
            </TabsTrigger>
            <TabsTrigger value="risk-dashboard" className="data-[state=active]:bg-cyan-600">
              <ChartBar className="w-4 h-4 mr-2" />
              Risk Dashboard
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="data-[state=active]:bg-cyan-600">
              <Users className="w-4 h-4 mr-2" />
              Collaboration
            </TabsTrigger>
            <TabsTrigger value="gamification" className="data-[state=active]:bg-cyan-600">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Gamification
            </TabsTrigger>
            <TabsTrigger value="mentor-chat" className="data-[state=active]:bg-cyan-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Mentor
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-cyan-600">
              <Eye className="w-4 h-4 mr-2" />
              Visualization
            </TabsTrigger>
          </TabsList>

          {/* Threat Intelligence Tab */}
          <TabsContent value="threat-intel" className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Real-Time Threat Intelligence
                </CardTitle>
                <CardDescription>
                  Integration with MISP, OpenCTI, and advanced ML models for threat prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatIntel.map((threat) => (
                  <div key={threat.id} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                          {threat.source}
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          {new Date(threat.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2">{threat.category}</h4>
                    <p className="text-gray-300 mb-3">{threat.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-cyan-400 font-medium mb-2">Indicators of Compromise</h5>
                        <div className="space-y-1">
                          {threat.iocs.map((ioc, index) => (
                            <code key={index} className="block bg-gray-900 px-2 py-1 rounded text-sm text-green-400">
                              {ioc}
                            </code>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-cyan-400 font-medium mb-2">MITRE ATT&CK Techniques</h5>
                        <div className="flex flex-wrap gap-2">
                          {threat.mitreAttack.map((technique, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-300">
                              {technique}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Dashboard Tab */}
          <TabsContent value="risk-dashboard" className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ChartBar className="w-5 h-5 text-cyan-400" />
                  Personalized Cybersecurity Risk Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time risk assessment with ML-powered predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {riskMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{metric.category}</h4>
                        {getTrendIcon(metric.trend)}
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Risk Score</span>
                          <span className="text-cyan-400 font-bold">{metric.score}/100</span>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </div>
                      
                      <div>
                        <h5 className="text-cyan-400 font-medium mb-2">Recommendations</h5>
                        <ul className="space-y-1">
                          {metric.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="text-gray-300 text-sm flex items-start gap-2">
                              <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Real-Time Team Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AK</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Alex Kim</p>
                        <p className="text-gray-400 text-sm">Investigating incident #2024-001</p>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">SJ</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Sarah Johnson</p>
                        <p className="text-gray-400 text-sm">Analyzing threat patterns</p>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Current Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Advanced Export Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">Generate custom reports with ML insights and threat intelligence</p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={generateCustomReport}
                      disabled={isGeneratingReport}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isGeneratingReport ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Generate Intelligence Report
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" className="w-full border-cyan-400 text-cyan-400">
                      <FileText className="w-4 h-4 mr-2" />
                      Export to STIX/TAXII
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gamification Tab */}
          <TabsContent value="gamification" className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                  Security Awareness Gamification
                </CardTitle>
                <CardDescription>
                  Achievements, badges, and interactive security challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">Security Score</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xl">{gamificationScore}</span>
                    </div>
                  </div>
                  <Progress value={75} className="h-3 mb-2" />
                  <p className="text-gray-300 text-sm">Level 7 Security Expert - 250 points to next level</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-xl border ${
                      achievement.unlocked 
                        ? 'bg-green-600/20 border-green-500/50' 
                        : 'bg-gray-800/50 border-gray-700'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-400' : 'text-white'}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Progress</span>
                          <span className="text-cyan-400 text-sm">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2" 
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-sm">+{achievement.points} points</span>
                          {achievement.unlocked && (
                            <Badge className="bg-green-600 text-white">Unlocked!</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Mentor Chat Tab */}
          <TabsContent value="mentor-chat" className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  Interactive Security Mentor Chatbot
                </CardTitle>
                <CardDescription>
                  AI-powered security guidance with emoji reactions and personalized advice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto space-y-3 mb-4 p-4 bg-gray-800/30 rounded-lg">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                        {message.emoji}
                      </div>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-gray-700 text-gray-200'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask your security mentor anything..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                  <Button onClick={handleSendMessage} className="bg-cyan-600 hover:bg-cyan-700">
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visualization Tab */}
          <TabsContent value="visualization" className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  One-Click Threat Visualization Wizard
                </CardTitle>
                <CardDescription>
                  Interactive threat maps and security dashboards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-24 bg-gradient-to-br from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 flex-col">
                    <AlertTriangle className="w-8 h-8 mb-2" />
                    Threat Map
                  </Button>
                  <Button className="h-24 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 flex-col">
                    <Activity className="w-8 h-8 mb-2" />
                    Network Topology
                  </Button>
                  <Button className="h-24 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-col">
                    <Puzzle className="w-8 h-8 mb-2" />
                    Attack Timeline
                  </Button>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Live Threat Visualization
                  </h4>
                  <div className="h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-gray-300">Interactive threat visualization will appear here</p>
                      <p className="text-gray-500 text-sm mt-2">Real-time global threat intelligence mapping</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}