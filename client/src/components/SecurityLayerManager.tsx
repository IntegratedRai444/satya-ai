import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SecurityLayer, SecurityLayerConfig, SECURITY_LAYERS } from '@shared/securityLayers';
import { 
  Shield, 
  Users, 
  Code, 
  Crown,
  Lock,
  Unlock,
  TrendingUp,
  Eye,
  Settings,
  BarChart3,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Database,
  Cpu,
  Network,
  Key,
  Target,
  Brain,
  Radar
} from 'lucide-react';

interface UserSecurityData {
  userAccess: {
    userId: string;
    layer: SecurityLayer;
    grantedAt: string;
    isActive: boolean;
    permissions: string[];
    restrictions: string[];
  };
  dailyLimit: {
    allowed: boolean;
    remaining: number;
  };
  availableUpgrades: {
    currentLayer: SecurityLayer;
    availableUpgrades: Array<{
      layer: SecurityLayer;
      config: SecurityLayerConfig;
      newFeatures: string[];
      pricingDifference: number;
    }>;
  };
}

export default function SecurityLayerManager() {
  const [selectedUserId, setSelectedUserId] = useState('user1');
  const [founderPassword, setFounderPassword] = useState('');
  const [showFounderAuth, setShowFounderAuth] = useState(false);
  const [isFounderAuthenticated, setIsFounderAuthenticated] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<SecurityLayer>('layer1');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user security data
  const { data: userSecurityData, isLoading: userDataLoading } = useQuery({
    queryKey: ['/api/security-layers/user', selectedUserId],
    enabled: !!selectedUserId,
  });

  // Fetch layers overview
  const { data: layersOverview, isLoading: overviewLoading } = useQuery({
    queryKey: ['/api/security-layers/overview'],
  });

  // Fetch specific layer dashboard
  const { data: layerDashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ['/api/security-layers/dashboard', selectedLayer],
  });

  // Founder authentication mutation
  const founderAuthMutation = useMutation({
    mutationFn: async (password: string) => {
      return apiRequest('POST', '/api/security-layers/authenticate-founder', { password });
    },
    onSuccess: (data) => {
      if (data.authenticated) {
        setIsFounderAuthenticated(true);
        setShowFounderAuth(false);
        toast({
          title: "Founder Access Granted",
          description: "Welcome to Layer 4 - Founder Nexus",
        });
      }
    },
    onError: () => {
      toast({
        title: "Authentication Failed",
        description: "Invalid founder credentials",
        variant: "destructive",
      });
    },
  });

  // Layer upgrade mutation
  const upgradeMutation = useMutation({
    mutationFn: async ({ userId, targetLayer }: { userId: string; targetLayer: SecurityLayer }) => {
      return apiRequest('POST', '/api/security-layers/upgrade', {
        userId,
        targetLayer,
        grantedBy: isFounderAuthenticated ? 'founder' : 'system'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/security-layers'] });
      toast({
        title: "Security Layer Updated",
        description: "User access level has been successfully upgraded",
      });
    },
    onError: () => {
      toast({
        title: "Upgrade Failed",
        description: "Failed to upgrade security layer",
        variant: "destructive",
      });
    },
  });

  const getLayerIcon = (layer: SecurityLayer) => {
    switch (layer) {
      case 'layer1': return Users;
      case 'layer2': return Shield;
      case 'layer3': return Code;
      case 'layer4': return Crown;
      default: return Shield;
    }
  };

  const getLayerColor = (layer: SecurityLayer) => {
    switch (layer) {
      case 'layer1': return 'bg-green-600';
      case 'layer2': return 'bg-blue-600';
      case 'layer3': return 'bg-purple-600';
      case 'layer4': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleFounderAuth = () => {
    if (founderPassword.trim()) {
      founderAuthMutation.mutate(founderPassword);
    }
  };

  const handleLayerUpgrade = (userId: string, targetLayer: SecurityLayer) => {
    upgradeMutation.mutate({ userId, targetLayer });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            SatyaAI Security Layer Management
          </h1>
          <p className="text-blue-200 text-lg">
            4-Tier Security Access Control System with Progressive Feature Access
          </p>
        </div>

        {/* Global Overview */}
        {layersOverview && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Global Security Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{layersOverview.totalUsers}</div>
                  <div className="text-slate-400 text-sm">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">${layersOverview.totalRevenue}</div>
                  <div className="text-slate-400 text-sm">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{layersOverview.securityMetrics.averageSecurityScore.toFixed(1)}%</div>
                  <div className="text-slate-400 text-sm">Avg Security Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">{layersOverview.securityMetrics.totalThreatsDetected}</div>
                  <div className="text-slate-400 text-sm">Threats Detected</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4">Layer Distribution</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Object.entries(layersOverview.layerDistribution).map(([layer, count]) => {
                    const config = SECURITY_LAYERS[layer as SecurityLayer];
                    const Icon = getLayerIcon(layer as SecurityLayer);
                    return (
                      <div key={layer} className="bg-slate-900 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-white" />
                          <div>
                            <div className="text-white font-semibold">{config.name}</div>
                            <div className="text-slate-400 text-sm">{count} users</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(SECURITY_LAYERS).map((config) => {
            const Icon = getLayerIcon(config.id);
            return (
              <Card 
                key={config.id} 
                className={`bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer ${
                  selectedLayer === config.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedLayer(config.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-white" />
                    <Badge className={getLayerColor(config.id)}>
                      Level {config.accessLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{config.name}</CardTitle>
                  <CardDescription className="text-slate-300 text-sm">
                    {config.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">User Type</span>
                      <span className="text-white">{config.userType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Daily Analysis</span>
                      <span className="text-white">
                        {config.maxAnalysisPerDay === -1 ? 'Unlimited' : config.maxAnalysisPerDay}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Pricing</span>
                      <span className="text-white">
                        {config.pricing.tier === 'free' ? 'Free' : `$${config.pricing.monthlyPrice}/mo`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-slate-400">Key Features</div>
                    <div className="space-y-1">
                      {config.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-slate-300 text-xs">{feature}</span>
                        </div>
                      ))}
                      {config.features.length > 3 && (
                        <div className="text-slate-400 text-xs">
                          +{config.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* User Management Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">User Security Management</CardTitle>
            <CardDescription className="text-slate-300">
              Manage individual user access levels and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="user-select" className="text-white">Select User</Label>
                <select
                  id="user-select"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full mt-1 bg-slate-700 border-slate-600 text-white rounded-md p-2"
                >
                  <option value="user1">John Doe (Regular User)</option>
                  <option value="user2">Jane Smith (Company)</option>
                  <option value="user3">Mike Johnson (Developer)</option>
                  <option value="founder">System Founder</option>
                </select>
              </div>
              
              {!isFounderAuthenticated && (
                <Dialog open={showFounderAuth} onOpenChange={setShowFounderAuth}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Crown className="h-4 w-4 mr-2" />
                      Founder Access
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Founder Authentication</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Enter founder password to access Layer 4 privileges
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="founder-password" className="text-white">Password</Label>
                        <Input
                          id="founder-password"
                          type="password"
                          value={founderPassword}
                          onChange={(e) => setFounderPassword(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Enter founder password"
                        />
                      </div>
                      <Button
                        onClick={handleFounderAuth}
                        disabled={founderAuthMutation.isPending}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        {founderAuthMutation.isPending ? 'Authenticating...' : 'Authenticate'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {userSecurityData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Current Access Level</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getLayerIcon(userSecurityData.userAccess.layer);
                        return <Icon className="h-8 w-8 text-white" />;
                      })()}
                      <div>
                        <div className="text-white font-semibold">
                          {SECURITY_LAYERS[userSecurityData.userAccess.layer].name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {SECURITY_LAYERS[userSecurityData.userAccess.layer].userType}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Daily Limit</span>
                        <span className="text-white">
                          {userSecurityData.dailyLimit.remaining === -1 
                            ? 'Unlimited' 
                            : `${userSecurityData.dailyLimit.remaining} remaining`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Active Permissions</span>
                        <span className="text-white">{userSecurityData.userAccess.permissions.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Status</span>
                        <span className="text-green-400">
                          {userSecurityData.userAccess.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Available Upgrades</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userSecurityData.availableUpgrades.availableUpgrades.length > 0 ? (
                      userSecurityData.availableUpgrades.availableUpgrades.map((upgrade) => (
                        <div key={upgrade.layer} className="border border-slate-600 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-semibold">{upgrade.config.name}</span>
                            <Badge className={getLayerColor(upgrade.layer)}>
                              ${upgrade.pricingDifference}/mo
                            </Badge>
                          </div>
                          <div className="text-slate-400 text-sm mb-2">
                            +{upgrade.newFeatures.length} new features
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleLayerUpgrade(selectedUserId, upgrade.layer)}
                            disabled={upgradeMutation.isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Upgrade to {upgrade.config.name}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-400 py-4">
                        Maximum access level reached
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Layer-Specific Dashboard */}
        {layerDashboard && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">{layerDashboard.config.name} Dashboard</CardTitle>
              <CardDescription className="text-slate-300">
                {layerDashboard.config.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{layerDashboard.metrics.activeUsers}</div>
                  <div className="text-slate-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{layerDashboard.metrics.dailyAnalysis}</div>
                  <div className="text-slate-400 text-sm">Daily Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">${layerDashboard.metrics.monthlyRevenue}</div>
                  <div className="text-slate-400 text-sm">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{layerDashboard.metrics.totalThreatsDetected}</div>
                  <div className="text-slate-400 text-sm">Threats Detected</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Available Features</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {layerDashboard.config.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">API Limits & Restrictions</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Requests per Hour</div>
                      <div className="text-white font-semibold">
                        {layerDashboard.config.apiLimits.requestsPerHour === -1 
                          ? 'Unlimited' 
                          : layerDashboard.config.apiLimits.requestsPerHour.toLocaleString()
                        }
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">File Upload Limit</div>
                      <div className="text-white font-semibold">
                        {layerDashboard.config.apiLimits.fileUploadSizeMB} MB
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Data Retention</div>
                      <div className="text-white font-semibold">
                        {layerDashboard.config.dataRetention.analysisDays} days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}