import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Shield,
  Users,
  Lock,
  Unlock,
  Key,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  Star,
  Zap,
  Eye,
  Database,
  Network,
  Globe,
  Brain,
  Target,
  Fingerprint,
  FileText,
  Calendar,
  User,
  Building2,
  Mail,
  Phone
} from 'lucide-react';

interface AccessRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  requestedLevel: string;
  currentLevel: string;
  requestType: string;
  justification: string;
  businessNeed: string;
  department: string;
  supervisor: string;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  requestDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  expiryDate?: string;
  riskAssessment: {
    score: number;
    level: string;
    factors: string[];
  };
}

interface AccessLevel {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  riskLevel: string;
  requiresApproval: boolean;
  maxDuration: string;
  icon: any;
  color: string;
}

export default function RequestAccessPortal() {
  const [requestForm, setRequestForm] = useState({
    requestedLevel: '',
    requestType: 'upgrade',
    justification: '',
    businessNeed: '',
    department: '',
    supervisor: '',
    duration: '30'
  });
  const [activeTab, setActiveTab] = useState('request');
  const [authorizedUsers, setAuthorizedUsers] = useState([
    {
      id: 'user-1',
      email: 'rishabhkapoor@atomicmail.io',
      password: 'Rai444',
      accessLevel: 'developer',
      status: 'active',
      lastLogin: new Date().toISOString(),
      permissions: ['Full System Access', 'Developer Tools', 'Admin Panel', 'All Features']
    },
    {
      id: 'user-2', 
      email: 'rishabhkap0444@gmail.com',
      password: 'Rishabhkapoor@0444',
      accessLevel: 'company',
      status: 'active',
      lastLogin: new Date().toISOString(),
      permissions: ['Company Dashboard', 'Reports', 'Analytics', 'Team Management']
    }
  ]);
  const { toast } = useToast();

  const accessLevels: AccessLevel[] = [
    {
      id: 'basic',
      name: 'Basic Access',
      description: 'Standard detection tools and basic analysis features',
      permissions: ['Image Analysis', 'Basic Reports', 'Dashboard Access'],
      riskLevel: 'Low',
      requiresApproval: false,
      maxDuration: 'Unlimited',
      icon: Eye,
      color: 'text-green-400'
    },
    {
      id: 'advanced',
      name: 'Advanced Access',
      description: 'Enhanced analysis tools with video and audio capabilities',
      permissions: ['All Basic Features', 'Video Analysis', 'Audio Detection', 'Advanced Reports', 'Threat Intelligence'],
      riskLevel: 'Medium',
      requiresApproval: true,
      maxDuration: '90 days',
      icon: Star,
      color: 'text-blue-400'
    },
    {
      id: 'professional',
      name: 'Professional Access',
      description: 'Complete analysis suite with forensics and enterprise features',
      permissions: ['All Advanced Features', 'Identity Forensics', 'Behavioral Analysis', 'API Access', 'Custom Reports'],
      riskLevel: 'Medium',
      requiresApproval: true,
      maxDuration: '180 days',
      icon: Zap,
      color: 'text-purple-400'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Access',
      description: 'Full platform access with administrative capabilities',
      permissions: ['All Professional Features', 'User Management', 'System Configuration', 'Audit Logs', 'Integration APIs'],
      riskLevel: 'High',
      requiresApproval: true,
      maxDuration: '365 days',
      icon: Crown,
      color: 'text-orange-400'
    },
    {
      id: 'company',
      name: 'Company Access',
      description: 'Corporate level access with team management and reporting',
      permissions: ['Company Dashboard', 'Team Reports', 'Analytics', 'User Management', 'Compliance Reports'],
      riskLevel: 'Medium',
      requiresApproval: true,
      maxDuration: '365 days',
      icon: Building2,
      color: 'text-cyan-400'
    },
    {
      id: 'developer',
      name: 'Developer Access',
      description: 'Full development access with API keys and system controls',
      permissions: ['Full System Access', 'Developer Tools', 'API Management', 'Admin Panel', 'All Features', 'Code Access'],
      riskLevel: 'Critical',
      requiresApproval: true,
      maxDuration: 'Indefinite',
      icon: Settings,
      color: 'text-green-400'
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Complete system control and security management',
      permissions: ['All Enterprise Features', 'Security Policies', 'Database Access', 'Infrastructure Control', 'Emergency Response'],
      riskLevel: 'Critical',
      requiresApproval: true,
      maxDuration: 'Indefinite',
      icon: Shield,
      color: 'text-red-400'
    }
  ];

  // Mock data for demonstration
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false,
  });

  const { data: accessRequests = [] } = useQuery({
    queryKey: ['/api/access-requests'],
    queryFn: () => {
      // Mock data
      return [
        {
          id: 'req_001',
          userId: 'user_123',
          userEmail: 'john.doe@company.com',
          userName: 'John Doe',
          requestedLevel: 'professional',
          currentLevel: 'advanced',
          requestType: 'upgrade',
          justification: 'Need forensics capabilities for ongoing investigation',
          businessNeed: 'Critical security incident requires advanced analysis tools',
          department: 'Security Operations',
          supervisor: 'Jane Smith',
          status: 'pending',
          requestDate: '2025-06-18T10:30:00Z',
          riskAssessment: {
            score: 75,
            level: 'Medium',
            factors: ['Clean access history', 'Valid business justification', 'Supervisor approval']
          }
        },
        {
          id: 'req_002',
          userId: 'user_456',
          userEmail: 'alice.johnson@company.com',
          userName: 'Alice Johnson',
          requestedLevel: 'enterprise',
          currentLevel: 'professional',
          requestType: 'upgrade',
          justification: 'Promoting to team lead position requiring administrative access',
          businessNeed: 'New role responsibilities include user management and system oversight',
          department: 'Cybersecurity',
          supervisor: 'Mike Wilson',
          status: 'review',
          requestDate: '2025-06-17T14:15:00Z',
          reviewDate: '2025-06-18T09:00:00Z',
          reviewedBy: 'Security Admin',
          riskAssessment: {
            score: 85,
            level: 'High',
            factors: ['Promotion justified', 'Previous violations: None', 'Training completed']
          }
        }
      ];
    }
  });

  const submitAccessRequest = useMutation({
    mutationFn: async (requestData: any) => {
      // Mock API call
      return new Promise(resolve => 
        setTimeout(() => resolve({ 
          id: `req_${Date.now()}`, 
          status: 'pending',
          ...requestData 
        }), 1000)
      );
    },
    onSuccess: () => {
      toast({
        title: "Access Request Submitted",
        description: "Your request has been submitted for review"
      });
      setRequestForm({
        requestedLevel: '',
        requestType: 'upgrade',
        justification: '',
        businessNeed: '',
        department: '',
        supervisor: '',
        duration: '30'
      });
    },
    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmitRequest = () => {
    if (!requestForm.requestedLevel || !requestForm.justification) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    submitAccessRequest.mutate({
      ...requestForm,
      userId: (currentUser as any)?.id || 'current_user',
      userEmail: (currentUser as any)?.email || 'user@company.com',
      userName: ((currentUser as any)?.firstName + ' ' + (currentUser as any)?.lastName) || 'Current User',
      currentLevel: 'basic', // This would come from user data
      requestDate: new Date().toISOString(),
      status: 'pending'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'review': return <Eye className="w-4 h-4 text-blue-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'review': return 'text-blue-400';
      default: return 'text-yellow-400';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const currentUserLevel = 'advanced'; // This would come from user data

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
            <Key className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Request Access Portal
            </h1>
            <p className="text-slate-400">Manage access levels and permissions across the SatyaAI platform</p>
          </div>
        </div>

        {/* Current Access Level */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Current Access Level</p>
                  <p className="font-semibold text-blue-400">Advanced Access</p>
                </div>
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Request Form */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                New Access Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Access Level Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Requested Access Level *</label>
                <Select value={requestForm.requestedLevel} onValueChange={(value) => 
                  setRequestForm(prev => ({ ...prev, requestedLevel: value }))
                }>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {accessLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        <div className="flex items-center gap-2">
                          <level.icon className={`w-4 h-4 ${level.color}`} />
                          {level.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Request Type */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Request Type</label>
                <Select value={requestForm.requestType} onValueChange={(value) => 
                  setRequestForm(prev => ({ ...prev, requestType: value }))
                }>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="upgrade">Access Upgrade</SelectItem>
                    <SelectItem value="temporary">Temporary Access</SelectItem>
                    <SelectItem value="role_change">Role Change</SelectItem>
                    <SelectItem value="project">Project Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department & Supervisor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    placeholder="Your department"
                    value={requestForm.department}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, department: e.target.value }))}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Supervisor/Manager</label>
                  <Input
                    placeholder="Supervisor name"
                    value={requestForm.supervisor}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, supervisor: e.target.value }))}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>

              {/* Business Justification */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Business Justification *</label>
                <Textarea
                  placeholder="Explain why you need this access level for your role and responsibilities"
                  value={requestForm.justification}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, justification: e.target.value }))}
                  className="bg-slate-800 border-slate-700 min-h-[100px]"
                />
              </div>

              {/* Business Need */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Specific Business Need</label>
                <Textarea
                  placeholder="Describe the specific business scenarios where you'll use these permissions"
                  value={requestForm.businessNeed}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, businessNeed: e.target.value }))}
                  className="bg-slate-800 border-slate-700 min-h-[80px]"
                />
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Access Duration (days)</label>
                <Select value={requestForm.duration} onValueChange={(value) => 
                  setRequestForm(prev => ({ ...prev, duration: value }))
                }>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSubmitRequest}
                disabled={submitAccessRequest.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {submitAccessRequest.isPending ? 'Submitting...' : 'Submit Access Request'}
              </Button>
            </CardContent>
          </Card>

          {/* Authorized Users Management */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Authorized System Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {authorizedUsers.map((user) => (
                  <Card key={user.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${user.accessLevel === 'developer' ? 'bg-green-600' : 'bg-cyan-600'}`}>
                            {user.accessLevel === 'developer' ? <Settings className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-semibold">{user.email}</p>
                            <p className="text-sm text-slate-400">{user.accessLevel.toUpperCase()} ACCESS</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {user.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Login Credentials</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-blue-400" />
                              <span className="text-sm font-mono">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Lock className="w-3 h-3 text-purple-400" />
                              <span className="text-sm font-mono">{user.password}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Access Details</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs">Last Login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-3 h-3 text-green-400" />
                              <span className="text-xs">Status: Active</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 4).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-blue-400 border-blue-400">
                              {permission}
                            </Badge>
                          ))}
                          {user.permissions.length > 4 && (
                            <Badge variant="outline" className="text-xs text-slate-400 border-slate-400">
                              +{user.permissions.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                My Access Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessRequests.map((request) => (
                  <Card key={request.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <span className={`font-medium capitalize ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {request.requestedLevel}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-slate-300">{request.justification}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(request.requestDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {request.department}
                          </span>
                        </div>
                        
                        {request.riskAssessment && (
                          <div className="mt-3 p-2 bg-slate-900 rounded">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-slate-400">Risk Assessment</span>
                              <span className={`text-xs font-medium ${getRiskColor(request.riskAssessment.level)}`}>
                                {request.riskAssessment.level} Risk
                              </span>
                            </div>
                            <Progress value={request.riskAssessment.score} className="h-1" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Levels Info */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Available Access Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLevels.map((level) => (
                  <Card key={level.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <level.icon className={`w-5 h-5 ${level.color}`} />
                        <div>
                          <h4 className="font-semibold">{level.name}</h4>
                          <p className="text-xs text-slate-400">{level.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Risk Level</span>
                          <span className={getRiskColor(level.riskLevel)}>{level.riskLevel}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Approval Required</span>
                          <span>{level.requiresApproval ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Max Duration</span>
                          <span>{level.maxDuration}</span>
                        </div>
                      </div>

                      <Separator className="my-3 bg-slate-700" />
                      
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Permissions:</p>
                        <div className="space-y-1">
                          {level.permissions.slice(0, 3).map((permission, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-slate-300">{permission}</span>
                            </div>
                          ))}
                          {level.permissions.length > 3 && (
                            <p className="text-xs text-slate-500">
                              +{level.permissions.length - 3} more permissions
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}