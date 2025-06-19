import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  MessageCircle,
  Send,
  Lightbulb,
  Shield,
  Search,
  Book,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Zap,
  Star,
  User
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AISecurityAgent() {
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'agent',
      message: 'Hello! I\'m your AI Security Agent. I can help you with security questions, threat analysis, best practices, and detailed insights about cybersecurity. What would you like to know?',
      timestamp: new Date().toLocaleTimeString(),
      category: 'greeting'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const securityTopics = [
    {
      title: 'Password Security',
      description: 'Learn about strong passwords and multi-factor authentication',
      icon: Shield,
      questions: [
        'How to create strong passwords?',
        'What is multi-factor authentication?',
        'Best password managers to use?'
      ]
    },
    {
      title: 'Phishing Protection',
      description: 'Identify and avoid phishing attacks',
      icon: AlertTriangle,
      questions: [
        'How to identify phishing emails?',
        'What to do if I clicked a suspicious link?',
        'Signs of a legitimate website?'
      ]
    },
    {
      title: 'Device Security',
      description: 'Secure your devices and data',
      icon: CheckCircle,
      questions: [
        'How to secure my smartphone?',
        'Best practices for laptop security?',
        'Safe browsing habits?'
      ]
    },
    {
      title: 'Network Safety',
      description: 'Stay safe on public and private networks',
      icon: Eye,
      questions: [
        'Is public WiFi safe to use?',
        'How to set up a secure home network?',
        'What is a VPN and should I use one?'
      ]
    }
  ];

  const quickActions = [
    { label: 'Security Score Check', icon: TrendingUp, action: 'security-score' },
    { label: 'Threat Assessment', icon: AlertTriangle, action: 'threat-assessment' },
    { label: 'Best Practices', icon: Book, action: 'best-practices' },
    { label: 'Incident Guidance', icon: Zap, action: 'incident-guidance' }
  ];

  const generateAgentResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('password')) {
      return {
        message: 'Great question about passwords! Here are key recommendations:\n\n• Use unique passwords for each account\n• Include uppercase, lowercase, numbers, and symbols\n• Minimum 12 characters length\n• Enable two-factor authentication (2FA)\n• Consider using a reputable password manager\n• Avoid personal information in passwords\n\nWould you like specific guidance on password managers or 2FA setup?',
        category: 'password-security'
      };
    } else if (lowerMessage.includes('phishing')) {
      return {
        message: 'Phishing protection is crucial! Watch for these red flags:\n\n• Urgent or threatening language\n• Suspicious sender addresses\n• Unexpected attachments or links\n• Poor grammar and spelling\n• Requests for sensitive information\n• Generic greetings like "Dear Customer"\n\nAlways verify sender identity through official channels. Never click suspicious links or download unexpected attachments.',
        category: 'phishing-protection'
      };
    } else if (lowerMessage.includes('security score') || lowerMessage.includes('assessment')) {
      return {
        message: 'Your current security assessment shows:\n\n✅ Authentication: Strong (97%)\n✅ Device Security: Good (89%)\n⚠️ Network Security: Moderate (76%)\n✅ Email Security: Strong (94%)\n⚠️ Social Media Privacy: Needs attention (68%)\n\nOverall Security Score: 85/100\n\nRecommendations:\n• Review social media privacy settings\n• Consider VPN for public networks\n• Enable automatic security updates',
        category: 'assessment'
      };
    } else if (lowerMessage.includes('threat') || lowerMessage.includes('attack')) {
      return {
        message: 'Current threat landscape analysis:\n\n🔴 High Risk: Ransomware attacks (↑15% this month)\n🟡 Medium Risk: Phishing campaigns (stable)\n🟢 Low Risk: Physical device theft (↓5%)\n\nEmerging threats:\n• AI-powered social engineering\n• Supply chain attacks\n• Cloud misconfigurations\n\nStay protected by keeping software updated and maintaining security awareness.',
        category: 'threat-intel'
      };
    } else if (lowerMessage.includes('incident') || lowerMessage.includes('help') || lowerMessage.includes('problem')) {
      return {
        message: 'I\'m here to help with your security concern! For immediate assistance:\n\n🚨 If actively under attack:\n1. Disconnect from internet\n2. Run antivirus scan\n3. Change all passwords\n4. Contact IT support\n\n📋 For general incidents:\n1. Document what happened\n2. Take screenshots if safe\n3. Report to security team\n4. Follow company protocols\n\nPlease describe your specific situation for targeted guidance.',
        category: 'incident-response'
      };
    } else {
      return {
        message: 'I understand you\'re asking about cybersecurity. I can help with:\n\n• Password and authentication security\n• Phishing and email security\n• Device and network protection\n• Threat analysis and prevention\n• Security best practices\n• Incident response guidance\n\nPlease ask a specific question or choose from the topics above. I\'m here to provide detailed, actionable security advice!',
        category: 'general'
      };
    }
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage = {
      id: conversation.length + 1,
      type: 'user',
      message: userMessage,
      timestamp: new Date().toLocaleTimeString(),
      category: 'user-query'
    };

    setConversation(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const agentResponse = generateAgentResponse(userMessage);
      const newAgentMessage = {
        id: conversation.length + 2,
        type: 'agent',
        message: agentResponse.message,
        timestamp: new Date().toLocaleTimeString(),
        category: agentResponse.category
      };
      
      setConversation(prev => [...prev, newAgentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      'security-score': 'What is my current security score?',
      'threat-assessment': 'What are the current security threats?',
      'best-practices': 'What are the latest security best practices?',
      'incident-guidance': 'I need help with a security incident'
    };
    
    setUserMessage(actionMessages[action] || '');
  };

  const handleTopicQuestion = (question: string) => {
    setUserMessage(question);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              AI Security Agent
            </h1>
            <p className="text-slate-400">Your intelligent cybersecurity assistant with detailed insights</p>
          </div>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-900 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Questions Answered</p>
                  <p className="text-2xl font-bold text-green-400">1,247</p>
                </div>
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-blue-400">97%</p>
                </div>
                <Star className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Response Time</p>
                  <p className="text-2xl font-bold text-purple-400">1.2s</p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Active Users</p>
                  <p className="text-2xl font-bold text-orange-400">892</p>
                </div>
                <User className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Conversation Area */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800 h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-400" />
                Security Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {conversation.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.type === 'agent' && <Bot className="w-4 h-4 text-green-400" />}
                        {msg.type === 'user' && <User className="w-4 h-4" />}
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-green-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about cybersecurity..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="bg-slate-800 border-slate-700"
                />
                <Button onClick={sendMessage} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900 border-slate-800 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="bg-slate-800 hover:bg-slate-700 justify-start h-auto p-4"
                  >
                    <action.icon className="w-5 h-5 mr-3 text-blue-400" />
                    <span>{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Topics & Suggestions */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-400" />
                Security Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityTopics.map((topic, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <topic.icon className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="font-semibold">{topic.title}</h3>
                        <p className="text-sm text-slate-400">{topic.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {topic.questions.map((question, qIndex) => (
                        <Button
                          key={qIndex}
                          onClick={() => handleTopicQuestion(question)}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="text-slate-300">• Real-time threat analysis</p>
                <p className="text-slate-300">• Personalized security recommendations</p>
                <p className="text-slate-300">• Incident response guidance</p>
                <p className="text-slate-300">• Security best practices</p>
                <p className="text-slate-300">• Risk assessment calculations</p>
                <p className="text-slate-300">• Educational security content</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}