import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SecurityLayer, SECURITY_LAYERS } from '@shared/securityLayers';
import { 
  Crown, 
  Shield,
  Lock,
  Users,
  Settings,
  Eye,
  UserPlus,
  Clock,
  AlertTriangle,
  Key,
  RefreshCw,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

interface FounderAuth {
  isAuthenticated: boolean;
  authLevel: 'none' | 'temp_founder' | 'main_founder';
  authenticatedAt?: Date;
  expiresAt?: Date;
}

interface TempFounderGrant {
  id: string;
  grantedTo: string;
  grantedBy: string;
  grantedAt: Date;
  expiresAt: Date;
  isActive: boolean;
  permissions: string[];
}

export default function FounderAccessControl() {
  const [founderAuth, setFounderAuth] = useState<FounderAuth>({ 
    isAuthenticated: false, 
    authLevel: 'none' 
  });
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [tempFounderForm, setTempFounderForm] = useState({
    userId: '',
    duration: 30, // days
    permissions: [] as string[]
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all users for management
  const { data: allUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/security-layers/all-users'],
    enabled: founderAuth.isAuthenticated,
  });

  // Fetch pending access requests
  const { data: pendingRequests } = useQuery({
    queryKey: ['/api/security-layers/access-requests/pending'],
    enabled: founderAuth.isAuthenticated,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Fetch temporary founder grants
  const { data: tempGrants } = useQuery({
    queryKey: ['/api/security-layers/temp-founder-grants'],
    enabled: founderAuth.authLevel === 'main_founder',
  });

  // Founder authentication mutation
  const authenticateFounderMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest('POST', '/api/security-layers/authenticate-founder', {
        password,
        requestType: 'main_founder'
      });
      return response;
    },
    onSuccess: (data: any) => {
      const authLevel = data.authLevel || 'main_founder';
      setFounderAuth({
        isAuthenticated: true,
        authLevel,
        authenticatedAt: new Date(),
        expiresAt: authLevel === 'temp_founder' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
      });
      setShowAuthDialog(false);
      setAuthPassword('');
      toast({
        title: "Authentication Successful",
        description: `Authenticated as ${authLevel === 'main_founder' ? 'Main Founder' : 'Temporary Founder'}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Authentication Failed",
        description: "Invalid founder password. Only Rishabh Kapoor can access founder controls.",
        variant: "destructive",
      });
    },
  });

  // Grant temporary founder access mutation
  const grantTempFounderMutation = useMutation({
    mutationFn: async (grantData: any) => {
      return apiRequest('POST', '/api/security-layers/grant-temp-founder', {
        ...grantData,
        grantedBy: 'Rishabh Kapoor'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/security-layers'] });
      toast({
        title: "Temporary Founder Access Granted",
        description: "User has been granted temporary founder privileges",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Grant Failed",
        description: error.message || "Failed to grant temporary founder access",
        variant: "destructive",
      });
    },
  });

  // Update user security layer mutation
  const updateUserLayerMutation = useMutation({
    mutationFn: async (updateData: { userId: string; newLayer: SecurityLayer }) => {
      return apiRequest('POST', '/api/security-layers/update-user', {
        ...updateData,
        updatedBy: founderAuth.authLevel === 'main_founder' ? 'Rishabh Kapoor' : 'Temporary Founder'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/security-layers'] });
      toast({
        title: "User Access Updated",
        description: "Security layer access has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update user access",
        variant: "destructive",
      });
    },
  });

  const handleAuthenticate = () => {
    if (!authPassword.trim()) {
      toast({
        title: "Password Required",
        description: "Please enter the founder password",
        variant: "destructive",
      });
      return;
    }
    authenticateFounderMutation.mutate(authPassword);
  };

  const handleGrantTempFounder = () => {
    if (!tempFounderForm.userId.trim()) {
      toast({
        title: "User ID Required",
        description: "Please specify a user ID for temporary founder access",
        variant: "destructive",
      });
      return;
    }
    grantTempFounderMutation.mutate(tempFounderForm);
  };

  const handleUpdateUserLayer = (userId: string, newLayer: SecurityLayer) => {
    updateUserLayerMutation.mutate({ userId, newLayer });
  };

  const getAuthLevelBadge = (level: string) => {
    switch (level) {
      case 'main_founder':
        return <Badge className="bg-orange-600"><Crown className="h-3 w-3 mr-1" />Main Founder</Badge>;
      case 'temp_founder':
        return <Badge className="bg-purple-600"><Clock className="h-3 w-3 mr-1" />Temp Founder</Badge>;
      default:
        return <Badge className="bg-gray-600"><Lock className="h-3 w-3 mr-1" />Unauthenticated</Badge>;
    }
  };

  const getLayerIcon = (layer: SecurityLayer) => {
    switch (layer) {
      case 'layer1': return User;
      case 'layer2': return Users;
      case 'layer3': return Settings;
      case 'layer4': return Crown;
      case 'temp_founder': return Clock;
      default: return Shield;
    }
  };

  if (!founderAuth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-16 w-16 text-orange-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Founder Access Control
            </h1>
            <p className="text-blue-200 text-lg">
              Restricted to Rishabh Kapoor - Main Founder Authentication Required
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Lock className="h-5 w-5" />
                Founder Authentication
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter founder password to access security layer management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="founder-password" className="text-white">
                  Founder Password
                </Label>
                <Input
                  id="founder-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter founder password..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
                />
              </div>
              
              <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                  <div className="text-orange-200 text-sm">
                    <strong>Authorized Personnel Only:</strong> Access restricted to Rishabh Kapoor with passwords "Rishabhkapoor@0444" or "Rai444"
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAuthenticate}
                disabled={authenticateFounderMutation.isPending}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {authenticateFounderMutation.isPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Key className="h-4 w-4 mr-2" />
                )}
                Authenticate as Founder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Founder Access Control Center
            </h1>
            <p className="text-blue-200 text-lg">
              Manage security layers and user access permissions
            </p>
          </div>
          <div className="text-right">
            {getAuthLevelBadge(founderAuth.authLevel)}
            <div className="text-slate-400 text-sm mt-1">
              Authenticated: {founderAuth.authenticatedAt?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <Tabs defaultValue="user-management" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="user-management" className="data-[state=active]:bg-orange-600">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="access-requests" className="data-[state=active]:bg-blue-600">
              <Eye className="h-4 w-4 mr-2" />
              Access Requests
            </TabsTrigger>
            <TabsTrigger 
              value="temp-founder" 
              className="data-[state=active]:bg-purple-600"
              disabled={founderAuth.authLevel !== 'main_founder'}
            >
              <Clock className="h-4 w-4 mr-2" />
              Temp Founder
            </TabsTrigger>
            <TabsTrigger value="system-settings" className="data-[state=active]:bg-green-600">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="user-management" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Security Layer Management</CardTitle>
                <CardDescription className="text-slate-300">
                  Manage user access levels across all security layers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 text-orange-400 animate-spin" />
                    </div>
                  ) : !allUsers || allUsers.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No users found in the system.
                    </div>
                  ) : (
                    allUsers.map((user: any) => {
                      const LayerIcon = getLayerIcon(user.layer);
                      const config = SECURITY_LAYERS[user.layer];
                      return (
                        <div key={user.userId} className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <LayerIcon className="h-6 w-6 text-orange-400" />
                              <div>
                                <div className="text-white font-semibold">{user.userId}</div>
                                <div className="text-slate-400 text-sm">
                                  Current: {config.name}
                                </div>
                                <div className="text-slate-500 text-xs">
                                  Granted: {new Date(user.grantedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {(['layer1', 'layer2', 'layer3', 'layer4', 'temp_founder'] as SecurityLayer[]).map((layer) => {
                                if (layer === 'layer4' && founderAuth.authLevel !== 'main_founder') return null;
                                if (layer === 'temp_founder' && founderAuth.authLevel !== 'main_founder') return null;
                                
                                const isCurrentLayer = user.layer === layer;
                                return (
                                  <Button
                                    key={layer}
                                    size="sm"
                                    variant={isCurrentLayer ? "default" : "outline"}
                                    onClick={() => !isCurrentLayer && handleUpdateUserLayer(user.userId, layer)}
                                    disabled={isCurrentLayer || updateUserLayerMutation.isPending}
                                    className={`text-xs ${
                                      isCurrentLayer 
                                        ? 'bg-orange-600 hover:bg-orange-700' 
                                        : 'border-slate-600 hover:bg-slate-700'
                                    }`}
                                  >
                                    {SECURITY_LAYERS[layer].name.split(' ')[0]}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Requests Tab */}
          <TabsContent value="access-requests" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pending Access Requests</CardTitle>
                <CardDescription className="text-slate-300">
                  Review and approve user requests for higher security layers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!pendingRequests || pendingRequests.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No pending access requests.
                    </div>
                  ) : (
                    pendingRequests.map((request: any) => (
                      <div key={request.id} className="border border-slate-600 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-white font-semibold">{request.userName}</div>
                            <div className="text-blue-400">
                              Requesting: {SECURITY_LAYERS[request.requestedLayer].name}
                            </div>
                            <div className="text-slate-300 text-sm mt-1">
                              {request.reason}
                            </div>
                            <div className="text-slate-400 text-xs mt-1">
                              Requested: {new Date(request.requestedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Temporary Founder Tab (Main Founder Only) */}
          <TabsContent value="temp-founder" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Temporary Founder Access</CardTitle>
                <CardDescription className="text-slate-300">
                  Grant limited-time founder privileges to trusted users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="temp-user-id" className="text-white">User ID</Label>
                    <Input
                      id="temp-user-id"
                      value={tempFounderForm.userId}
                      onChange={(e) => setTempFounderForm({
                        ...tempFounderForm,
                        userId: e.target.value
                      })}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter user ID..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="temp-duration" className="text-white">Duration (Days)</Label>
                    <Input
                      id="temp-duration"
                      type="number"
                      min="1"
                      max="90"
                      value={tempFounderForm.duration}
                      onChange={(e) => setTempFounderForm({
                        ...tempFounderForm,
                        duration: parseInt(e.target.value) || 30
                      })}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleGrantTempFounder}
                      disabled={grantTempFounderMutation.isPending}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Grant Access
                    </Button>
                  </div>
                </div>

                <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-3">
                  <div className="text-purple-200 text-sm">
                    <strong>Temporary Founder Privileges:</strong> Security layer management, user access control, advanced monitoring, incident response - excludes core system architecture and permanent founder access.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system-settings" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">System Configuration</CardTitle>
                <CardDescription className="text-slate-300">
                  Advanced system settings and security policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-slate-400 text-center py-8">
                  System configuration panel - Coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}