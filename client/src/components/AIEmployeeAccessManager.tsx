import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building2,
  Shield,
  Zap,
  Settings,
  AlertTriangle,
  Eye,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  companyName: string;
  businessType: string;
  requestedAccess: 'basic' | 'premium' | 'enterprise';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  aiEmployeeLimit: number;
  features: string[];
}

interface UserAccess {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  accessLevel: 'basic' | 'premium' | 'enterprise';
  aiEmployeesCreated: number;
  aiEmployeeLimit: number;
  features: string[];
  grantedDate: string;
  lastActivity: string;
  status: 'active' | 'suspended' | 'expired';
}

export default function AIEmployeeAccessManager() {
  const [activeTab, setActiveTab] = useState("requests");
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    {
      id: "req-001",
      userId: "user-123",
      userName: "Sarah Johnson",
      userEmail: "sarah@techstartup.com",
      companyName: "TechStartup Inc",
      businessType: "Software Development",
      requestedAccess: "premium",
      reason: "Need AI employees for customer support automation and code review processes",
      status: "pending",
      requestDate: "2024-01-15T10:30:00Z",
      aiEmployeeLimit: 10,
      features: ["Custom AI Training", "Multi-language Support", "API Integration"]
    },
    {
      id: "req-002",
      userId: "user-456",
      userName: "Michael Chen",
      userEmail: "m.chen@healthcare.io",
      companyName: "HealthCare Solutions",
      businessType: "Healthcare Technology",
      requestedAccess: "enterprise",
      reason: "Enterprise-level AI employees for medical data analysis and patient communication",
      status: "pending",
      requestDate: "2024-01-14T14:20:00Z",
      aiEmployeeLimit: 50,
      features: ["HIPAA Compliance", "Advanced Analytics", "Real-time Processing", "Custom Models"]
    }
  ]);

  const [userAccess, setUserAccess] = useState<UserAccess[]>([
    {
      id: "access-001",
      userId: "user-789",
      userName: "David Wilson",
      userEmail: "david@fintech.com",
      accessLevel: "premium",
      aiEmployeesCreated: 7,
      aiEmployeeLimit: 15,
      features: ["Custom AI Training", "Multi-language Support", "API Integration"],
      grantedDate: "2024-01-10T09:00:00Z",
      lastActivity: "2024-01-15T16:45:00Z",
      status: "active"
    }
  ]);

  const { toast } = useToast();

  const handleApproveRequest = (requestId: string) => {
    setAccessRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: 'approved' as const,
            reviewDate: new Date().toISOString(),
            reviewedBy: 'Founder Admin'
          }
        : req
    ));

    // Add to user access
    const request = accessRequests.find(req => req.id === requestId);
    if (request) {
      const newUserAccess: UserAccess = {
        id: `access-${Date.now()}`,
        userId: request.userId,
        userName: request.userName,
        userEmail: request.userEmail,
        accessLevel: request.requestedAccess,
        aiEmployeesCreated: 0,
        aiEmployeeLimit: request.aiEmployeeLimit,
        features: request.features,
        grantedDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        status: 'active'
      };
      setUserAccess(prev => [...prev, newUserAccess]);
    }

    toast({
      title: "Access Approved",
      description: `AI Employee access granted to ${request?.userName}`,
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setAccessRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: 'rejected' as const,
            reviewDate: new Date().toISOString(),
            reviewedBy: 'Founder Admin'
          }
        : req
    ));

    const request = accessRequests.find(req => req.id === requestId);
    toast({
      title: "Access Rejected",
      description: `AI Employee access denied for ${request?.userName}`,
      variant: "destructive",
    });
  };

  const handleSuspendAccess = (accessId: string) => {
    setUserAccess(prev => prev.map(access => 
      access.id === accessId 
        ? { ...access, status: 'suspended' as const }
        : access
    ));

    const access = userAccess.find(acc => acc.id === accessId);
    toast({
      title: "Access Suspended",
      description: `AI Employee access suspended for ${access?.userName}`,
      variant: "destructive",
    });
  };

  const handleRestoreAccess = (accessId: string) => {
    setUserAccess(prev => prev.map(access => 
      access.id === accessId 
        ? { ...access, status: 'active' as const }
        : access
    ));

    const access = userAccess.find(acc => acc.id === accessId);
    toast({
      title: "Access Restored",
      description: `AI Employee access restored for ${access?.userName}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': case 'active': return 'bg-green-500';
      case 'rejected': case 'suspended': return 'bg-red-500';
      case 'expired': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-blue-500';
      case 'premium': return 'bg-purple-500';
      case 'enterprise': return 'bg-gold-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            AI Employee Access Management
          </h1>
          <p className="text-blue-200 text-lg">
            Manage user requests and permissions for AI employee creation
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="requests" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4 mr-2" />
              Access Requests ({accessRequests.filter(r => r.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Active Users ({userAccess.filter(u => u.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="grid gap-6">
              {accessRequests.map((request) => (
                <Card key={request.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-400" />
                        <div>
                          <CardTitle className="text-white">{request.userName}</CardTitle>
                          <CardDescription className="text-slate-300">
                            {request.userEmail} • {request.companyName}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(request.status)} text-white`}>
                        {request.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-slate-400">Business Type</Label>
                        <p className="text-white">{request.businessType}</p>
                      </div>
                      <div>
                        <Label className="text-slate-400">Requested Access</Label>
                        <Badge className={`${getAccessLevelColor(request.requestedAccess)} text-white`}>
                          {request.requestedAccess.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-slate-400">AI Employee Limit</Label>
                        <p className="text-white">{request.aiEmployeeLimit} employees</p>
                      </div>
                      <div>
                        <Label className="text-slate-400">Request Date</Label>
                        <p className="text-white">{new Date(request.requestDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label className="text-slate-400">Requested Features</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {request.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="border-blue-500 text-blue-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-slate-400">Business Justification</Label>
                      <p className="text-slate-300 bg-slate-900 p-3 rounded-lg mt-2">
                        {request.reason}
                      </p>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Access
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRejectRequest(request.id)}
                          className="border-red-500 text-red-400 hover:bg-red-900"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Request
                        </Button>
                      </div>
                    )}

                    {request.status !== 'pending' && (
                      <div className="text-slate-400 text-sm">
                        Reviewed on {new Date(request.reviewDate!).toLocaleDateString()} by {request.reviewedBy}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6">
              {userAccess.map((access) => (
                <Card key={access.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-blue-400" />
                        <div>
                          <CardTitle className="text-white">{access.userName}</CardTitle>
                          <CardDescription className="text-slate-300">
                            {access.userEmail}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getAccessLevelColor(access.accessLevel)} text-white`}>
                          {access.accessLevel.toUpperCase()}
                        </Badge>
                        <Badge className={`${getStatusColor(access.status)} text-white`}>
                          {access.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-slate-400">AI Employees Created</Label>
                        <p className="text-white text-xl font-bold">
                          {access.aiEmployeesCreated} / {access.aiEmployeeLimit}
                        </p>
                        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(access.aiEmployeesCreated / access.aiEmployeeLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-400">Access Granted</Label>
                        <p className="text-white">{new Date(access.grantedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-slate-400">Last Activity</Label>
                        <p className="text-white">{new Date(access.lastActivity).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-slate-400">Available Features</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {access.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="border-green-500 text-green-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {access.status === 'active' ? (
                        <Button
                          variant="outline"
                          onClick={() => handleSuspendAccess(access.id)}
                          className="border-red-500 text-red-400 hover:bg-red-900"
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Suspend Access
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRestoreAccess(access.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Restore Access
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-900"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View AI Employees
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-500 text-slate-400 hover:bg-slate-700"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Modify Limits
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Pending Requests</p>
                      <p className="text-2xl font-bold text-white">
                        {accessRequests.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-white">
                        {userAccess.filter(u => u.status === 'active').length}
                      </p>
                    </div>
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total AI Employees</p>
                      <p className="text-2xl font-bold text-white">
                        {userAccess.reduce((sum, u) => sum + u.aiEmployeesCreated, 0)}
                      </p>
                    </div>
                    <Bot className="h-6 w-6 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Enterprise Users</p>
                      <p className="text-2xl font-bold text-white">
                        {userAccess.filter(u => u.accessLevel === 'enterprise').length}
                      </p>
                    </div>
                    <Shield className="h-6 w-6 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Access Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['basic', 'premium', 'enterprise'].map(level => {
                    const count = userAccess.filter(u => u.accessLevel === level).length;
                    const percentage = userAccess.length > 0 ? (count / userAccess.length) * 100 : 0;
                    return (
                      <div key={level} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-300 capitalize">{level}</span>
                          <span className="text-white">{count} users ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`${getAccessLevelColor(level)} h-2 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}