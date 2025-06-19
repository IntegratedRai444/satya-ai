import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Send,
  Inbox,
  Archive,
  Trash2,
  Star,
  Reply,
  Forward,
  Search,
  Filter,
  AlertTriangle,
  Shield,
  Clock,
  User,
  Paperclip
} from 'lucide-react';
import { useState } from 'react';

export default function MessageCenter() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      from: 'Security Team',
      subject: 'Daily Security Alert - High Priority',
      preview: 'Multiple suspicious login attempts detected from IP 192.168.1.100...',
      time: '2 hours ago',
      priority: 'high',
      read: false,
      starred: true,
      type: 'alert'
    },
    {
      id: 2,
      from: 'Compliance Officer',
      subject: 'Monthly Compliance Report Ready',
      preview: 'Your monthly compliance report has been generated and is ready for review...',
      time: '4 hours ago',
      priority: 'medium',
      read: true,
      starred: false,
      type: 'report'
    },
    {
      id: 3,
      from: 'IT Administrator',
      subject: 'System Maintenance Window Scheduled',
      preview: 'Scheduled maintenance window for security updates planned for this weekend...',
      time: '6 hours ago',
      priority: 'medium',
      read: true,
      starred: false,
      type: 'maintenance'
    },
    {
      id: 4,
      from: 'Threat Intelligence',
      subject: 'New Threat Vector Identified',
      preview: 'Our threat intelligence team has identified a new attack vector targeting...',
      time: '8 hours ago',
      priority: 'high',
      read: false,
      starred: true,
      type: 'threat'
    },
    {
      id: 5,
      from: 'Training Team',
      subject: 'Security Training Completion Reminder',
      preview: 'Reminder: Your quarterly security training is due for completion...',
      time: '1 day ago',
      priority: 'low',
      read: true,
      starred: false,
      type: 'training'
    },
    {
      id: 6,
      from: 'Audit Team',
      subject: 'Security Audit Results',
      preview: 'The security audit for Q4 has been completed. Overall score: 97%...',
      time: '2 days ago',
      priority: 'medium',
      read: true,
      starred: false,
      type: 'audit'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 border-green-400 bg-green-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'threat': return Shield;
      case 'report': return Mail;
      case 'maintenance': return Clock;
      case 'training': return User;
      case 'audit': return Shield;
      default: return Mail;
    }
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (messageText.trim()) {
      // Simulate sending message
      console.log('Sending message:', messageText);
      setMessageText('');
      // Add success toast here
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Security Message Center
            </h1>
            <p className="text-slate-400">Send and receive security communications</p>
          </div>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-900 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Messages</p>
                  <p className="text-2xl font-bold text-blue-400">{messages.length}</p>
                </div>
                <Inbox className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Unread</p>
                  <p className="text-2xl font-bold text-red-400">
                    {messages.filter(m => !m.read).length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">High Priority</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {messages.filter(m => m.priority === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Starred</p>
                  <p className="text-2xl font-bold text-green-400">
                    {messages.filter(m => m.starred).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700"
            />
          </div>
          <Button className="bg-slate-700 hover:bg-slate-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-cyan-400" />
                Security Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredMessages.map((message) => {
                const TypeIcon = getTypeIcon(message.type);
                return (
                  <Card 
                    key={message.id} 
                    className={`bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-all ${
                      !message.read ? 'border-l-4 border-l-blue-400' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <TypeIcon className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="font-semibold">{message.from}</p>
                            <p className="text-sm text-slate-400">{message.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {message.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          <Badge variant="outline" className={getPriorityColor(message.priority)}>
                            {message.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <h3 className={`font-medium mb-1 ${!message.read ? 'text-white' : 'text-slate-300'}`}>
                        {message.subject}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{message.preview}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Message Actions & Compose */}
        <div className="space-y-6">
          {/* Compose Message */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-green-400" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="To: Security Team"
                className="bg-slate-800 border-slate-700"
              />
              <Input
                placeholder="Subject"
                className="bg-slate-800 border-slate-700"
              />
              <Textarea
                placeholder="Write your security message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="bg-slate-800 border-slate-700"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={sendMessage}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-600">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Reply className="w-4 h-4 mr-2" />
                Reply to Selected
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Forward className="w-4 h-4 mr-2" />
                Forward Message
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archive Messages
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 justify-start">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            </CardContent>
          </Card>

          {/* Message Preview */}
          {selectedMessage && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Message Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">From</p>
                  <p className="font-medium">{selectedMessage.from}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Subject</p>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Priority</p>
                  <Badge variant="outline" className={getPriorityColor(selectedMessage.priority)}>
                    {selectedMessage.priority.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Preview</p>
                  <p className="text-sm text-slate-300">{selectedMessage.preview}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}