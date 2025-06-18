import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Crown,
  Users,
  Building2,
  Shield,
  UserPlus,
  Settings,
  Lock,
  Unlock,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  FileText,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  email: string;
  requestedAccessLevel: 'developer' | 'company' | 'founder';
  currentAccessLevel: string;
  reason: string;
  businessJustification: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  expiryDate?: string;
}

interface UserAccess {
  id: string;
  userId: string;
  userName: string;
  email: string;
  accessLevel: 'community' | 'developer' | 'company' | 'founder';
  grantedBy: string;
  grantedDate: string;
  expiryDate?: string;
  status: 'active' | 'suspended' | 'expired';
  lastActivity: string;
  permissions: string[];
}

export default function FounderAccessManagement() {
  const [selectedTab, setSelectedTab] = useState('grant-access');
  const [newAccessForm, setNewAccessForm] = useState({
    userName: '',
    email: '',
    accessLevel: '',
    duration: '30',
    reason: '',
    permissions: [] as string[]
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accessRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ['/api/founder/access-requests'],
    refetchInterval: 30000,
  });

  const { data: activeUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/founder/active-users'],
    refetchInterval: 60000,
  });

  const { data: systemStats } = useQuery({
    queryKey: ['/api/founder/system-stats'],
    refetchInterval: 60000,
  });

  const grantAccessMutation = useMutation({
    mutationFn: async (accessData: any) => {
      return apiRequest('POST', '/api/founder/grant-access', accessData);
    },
    onSuccess: () => {
      toast({
        title: "Access Granted",
        description: "User access has been successfully granted",
      });
      setNewAccessForm({
        userName: '',
        email: '',
        accessLevel: '',
        duration: '30',
        reason: '',
        permissions: []
      });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/active-users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Access Grant Failed",
        description: error.message || "Failed to grant access",
        variant: "destructive",
      });
    },
  });

  const reviewRequestMutation = useMutation({
    mutationFn: async ({ requestId, approved, notes }: { requestId: string; approved: boolean; notes: string }) => {
      return apiRequest('POST', '/api/founder/review-request', {
        requestId,
        approved,
        reviewNotes: notes
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Reviewed",
        description: "Access request has been processed",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/access-requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/active-users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Review Failed",
        description: error.message || "Failed to review request",
        variant: "destructive",
      });
    },
  });

  const revokeAccessMutation = useMutation({
    mutationFn: async ({ userId, reason }: { userId: string; reason: string }) => {
      return apiRequest('POST', '/api/founder/revoke-access', { userId, reason });
    },
    onSuccess: () => {
      toast({
        title: "Access Revoked",
        description: "User access has been revoked",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/active-users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Revoke Failed",
        description: error.message || "Failed to revoke access",
        variant: "destructive",
      });
    },
  });

  const handleGrantAccess = () => {
    if (!newAccessForm.userName || !newAccessForm.email || !newAccessForm.accessLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(newAccessForm.duration));

    grantAccessMutation.mutate({
      ...newAccessForm,
      grantedBy: 'Rishabh Kapoor',
      expiryDate: expiryDate.toISOString()
    });
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'founder': return 'bg-yellow-600';
      case 'company': return 'bg-orange-600';
      case 'developer': return 'bg-purple-600';
      case 'community': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'approved': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'suspended': return 'bg-orange-600';
      case 'expired': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredRequests = accessRequests?.filter((request: AccessRequest) => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }) || [];

  const filteredUsers = activeUsers?.filter((user: UserAccess) => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-yellow-900 to-orange-900 border-yellow-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            Founder Access Management Portal
          </CardTitle>
          <CardDescription className="text-yellow-100">
            Exclusive access control for Rishabh Kapoor - Grant and manage developer, company, and founder access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-100 text-sm">Total Users</span>
              </div>
              <div className="text-2xl font-bold text-white">{systemStats?.totalUsers || 0}</div>
            </div>
            
            <div className="bg-orange-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="text-orange-100 text-sm">Pending Requests</span>
              </div>
              <div className="text-2xl font-bold text-white">{systemStats?.pendingRequests || 0}</div>
            </div>
            
            <div className="bg-green-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-100 text-sm">Active Access</span>
              </div>
              <div className="text-2xl font-bold text-white">{systemStats?.activeAccess || 0}</div>
            </div>
            
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-purple-400" />
                <span className="text-purple-100 text-sm">Company Access</span>
              </div>
              <div className="text-2xl font-bold text-white">{systemStats?.companyAccess || 0}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="grant-access" className="data-[state=active]:bg-green-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Grant Access
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-yellow-600">
            <Clock className="h-4 w-4 mr-2" />
            Review Requests
          </TabsTrigger>
          <TabsTrigger value="active-users" className="data-[state=active]:bg-blue-600">
            <Users className="h-4 w-4 mr-2" />
            Active Users
          </TabsTrigger>
          <TabsTrigger value="audit-log" className="data-[state=active]:bg-purple-600">
            <FileText className="h-4 w-4 mr-2" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        {/* Grant Access Tab */}
        <TabsContent value="grant-access" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-400" />
                Grant Direct Access
              </CardTitle>
              <CardDescription className="text-slate-300">
                Directly grant access to users without requiring them to submit a request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">User Name</Label>
                  <Input
                    value={newAccessForm.userName}
                    onChange={(e) => setNewAccessForm(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder="Enter user name"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-slate-300">Email Address</Label>
                  <Input
                    type="email"
                    value={newAccessForm.email}
                    onChange={(e) => setNewAccessForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Access Level</Label>
                  <Select value={newAccessForm.accessLevel} onValueChange={(value) => setNewAccessForm(prev => ({ ...prev, accessLevel: value }))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Developer Access</SelectItem>
                      <SelectItem value="company">Company Access</SelectItem>
                      <SelectItem value="founder">Founder Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-slate-300">Duration (Days)</Label>
                  <Select value={newAccessForm.duration} onValueChange={(value) => setNewAccessForm(prev => ({ ...prev, duration: value }))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="999999">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Reason for Access</Label>
                <Textarea
                  value={newAccessForm.reason}
                  onChange={(e) => setNewAccessForm(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Enter reason for granting access..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Button 
                onClick={handleGrantAccess}
                disabled={grantAccessMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {grantAccessMutation.isPending ? 'Granting Access...' : 'Grant Access'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Review Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                Access Requests Review
              </CardTitle>
              <CardDescription className="text-slate-300">
                Review and approve/reject pending access requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredRequests.map((request: AccessRequest) => (
                  <Card key={request.id} className="bg-slate-900 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold">{request.userName}</h3>
                            <Badge className={getAccessLevelColor(request.requestedAccessLevel)}>
                              {request.requestedAccessLevel.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{request.email}</p>
                          <p className="text-slate-300 text-sm mb-2">{request.reason}</p>
                          <p className="text-slate-400 text-xs">
                            Requested: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => reviewRequestMutation.mutate({ 
                                requestId: request.id, 
                                approved: true, 
                                notes: 'Approved by founder' 
                              })}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => reviewRequestMutation.mutate({ 
                                requestId: request.id, 
                                approved: false, 
                                notes: 'Rejected by founder' 
                              })}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Users Tab */}
        <TabsContent value="active-users" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Active User Management
              </CardTitle>
              <CardDescription className="text-slate-300">
                View and manage users with elevated access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredUsers.map((user: UserAccess) => (
                  <Card key={user.id} className="bg-slate-900 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold">{user.userName}</h3>
                            <Badge className={getAccessLevelColor(user.accessLevel)}>
                              {user.accessLevel.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm mb-1">{user.email}</p>
                          <p className="text-slate-300 text-sm mb-1">
                            Granted by: {user.grantedBy} on {new Date(user.grantedDate).toLocaleDateString()}
                          </p>
                          {user.expiryDate && (
                            <p className="text-slate-400 text-xs">
                              Expires: {new Date(user.expiryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => revokeAccessMutation.mutate({ 
                              userId: user.userId, 
                              reason: 'Access revoked by founder' 
                            })}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit-log" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                System Audit Log
              </CardTitle>
              <CardDescription className="text-slate-300">
                Complete audit trail of all access management activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-white font-semibold mb-2">Comprehensive Audit Trail</p>
                <p className="text-slate-400">
                  Detailed logging of all access grants, revocations, and system activities
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}