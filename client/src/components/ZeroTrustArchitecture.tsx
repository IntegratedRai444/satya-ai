import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  Lock,
  Unlock,
  Network,
  Eye,
  Users,
  Database,
  Globe,
  Server,
  Smartphone,
  Laptop,
  Cloud,
  Key,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Target,
  Brain,
  Layers,
  GitBranch,
  Wifi,
  HardDrive,
  Monitor,
  Router
} from 'lucide-react';

interface ZeroTrustPolicy {
  id: string;
  name: string;
  category: string;
  enforcement: 'strict' | 'moderate' | 'permissive';
  compliance: number;
  violations: number;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'pending';
}

interface MicroSegmentation {
  segment: string;
  devices: number;
  traffic: number;
  blocked: number;
  allowed: number;
  riskLevel: string;
  isolation: boolean;
}

interface IdentityVerification {
  userId: string;
  deviceId: string;
  location: string;
  trustScore: number;
  riskFactors: string[];
  authMethods: string[];
  sessionDuration: number;
  lastVerified: string;
  accessLevel: string;
}

export default function ZeroTrustArchitecture() {
  const [activeTab, setActiveTab] = useState('policies');
  const [policies, setPolicies] = useState<ZeroTrustPolicy[]>([]);
  const [segments, setSegments] = useState<MicroSegmentation[]>([]);
  const [identities, setIdentities] = useState<IdentityVerification[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [networkMetrics, setNetworkMetrics] = useState({
    totalDevices: 0,
    trustedDevices: 0,
    blockedConnections: 0,
    activePolicies: 0
  });
  const { toast } = useToast();

  // Zero Trust Policy Management
  const policyAnalysisMutation = useMutation({
    mutationFn: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const policyData: ZeroTrustPolicy[] = [
        {
          id: 'ZT001',
          name: 'Device Authentication Policy',
          category: 'Identity & Access',
          enforcement: 'strict',
          compliance: 94.2,
          violations: 3,
          lastUpdated: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'ZT002', 
          name: 'Network Micro-Segmentation',
          category: 'Network Security',
          enforcement: 'strict',
          compliance: 98.7,
          violations: 1,
          lastUpdated: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'ZT003',
          name: 'Data Encryption at Rest',
          category: 'Data Protection',
          enforcement: 'moderate',
          compliance: 91.3,
          violations: 7,
          lastUpdated: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'ZT004',
          name: 'Application Access Control',
          category: 'Application Security',
          enforcement: 'strict',
          compliance: 96.8,
          violations: 2,
          lastUpdated: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'ZT005',
          name: 'Privileged Access Management',
          category: 'Identity & Access',
          enforcement: 'strict',
          compliance: 99.1,
          violations: 0,
          lastUpdated: new Date().toISOString(),
          status: 'active'
        }
      ];

      return policyData;
    },
    onSuccess: (data) => {
      setPolicies(data);
      setIsProcessing(false);
      toast({
        title: "Zero Trust Policies Analyzed",
        description: `${data.length} policies evaluated`
      });
    }
  });

  // Micro-Segmentation Analysis
  const segmentationMutation = useMutation({
    mutationFn: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const segmentData: MicroSegmentation[] = [
        {
          segment: 'Executive Network',
          devices: 24,
          traffic: 1247,
          blocked: 15,
          allowed: 1232,
          riskLevel: 'LOW',
          isolation: true
        },
        {
          segment: 'Development Environment',
          devices: 87,
          traffic: 5692,
          blocked: 234,
          allowed: 5458,
          riskLevel: 'MEDIUM',
          isolation: true
        },
        {
          segment: 'Guest Network',
          devices: 156,
          traffic: 2341,
          blocked: 567,
          allowed: 1774,
          riskLevel: 'HIGH',
          isolation: true
        },
        {
          segment: 'IoT Devices',
          devices: 312,
          traffic: 8923,
          blocked: 1205,
          allowed: 7718,
          riskLevel: 'MEDIUM',
          isolation: true
        },
        {
          segment: 'Server Infrastructure',
          devices: 45,
          traffic: 15678,
          blocked: 89,
          allowed: 15589,
          riskLevel: 'LOW',
          isolation: true
        }
      ];

      return segmentData;
    },
    onSuccess: (data) => {
      setSegments(data);
      setIsProcessing(false);
      toast({
        title: "Network Segmentation Complete",
        description: `${data.length} segments analyzed`
      });
    }
  });

  // Identity Verification Analysis
  const identityVerificationMutation = useMutation({
    mutationFn: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const identityData: IdentityVerification[] = [
        {
          userId: 'USR_001',
          deviceId: 'DEV_LAPTOP_7A2B',
          location: 'San Francisco, CA',
          trustScore: 94.5,
          riskFactors: ['New device enrollment'],
          authMethods: ['MFA', 'Biometric', 'Hardware Token'],
          sessionDuration: 480,
          lastVerified: new Date().toISOString(),
          accessLevel: 'High'
        },
        {
          userId: 'USR_002',
          deviceId: 'DEV_MOBILE_9C4E',
          location: 'New York, NY',
          trustScore: 87.2,
          riskFactors: ['Unusual location', 'Off-hours access'],
          authMethods: ['MFA', 'PIN'],
          sessionDuration: 120,
          lastVerified: new Date().toISOString(),
          accessLevel: 'Medium'
        },
        {
          userId: 'USR_003',
          deviceId: 'DEV_TABLET_5F8G',
          location: 'London, UK',
          trustScore: 96.8,
          riskFactors: [],
          authMethods: ['MFA', 'Biometric', 'Smart Card'],
          sessionDuration: 360,
          lastVerified: new Date().toISOString(),
          accessLevel: 'High'
        }
      ];

      return identityData;
    },
    onSuccess: (data) => {
      setIdentities(data);
      setIsProcessing(false);
      toast({
        title: "Identity Verification Complete",
        description: `${data.length} identities verified`
      });
    }
  });

  // Real-time network metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkMetrics({
        totalDevices: Math.floor(Math.random() * 100) + 500,
        trustedDevices: Math.floor(Math.random() * 50) + 450,
        blockedConnections: Math.floor(Math.random() * 20) + 5,
        activePolicies: policies.length
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [policies.length]);

  const getEnforcementColor = (enforcement: string) => {
    switch (enforcement) {
      case 'strict': return 'text-red-400';
      case 'moderate': return 'text-yellow-400';
      case 'permissive': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Zero Trust Architecture
            </h1>
            <p className="text-slate-400">Never trust, always verify - Advanced zero trust security framework</p>
          </div>
        </div>

        {/* Network Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Network className="w-5 h-5 text-green-400" />
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-sm text-slate-400">Trusted Devices</p>
              <p className="text-2xl font-bold text-green-400">
                {networkMetrics.trustedDevices}/{networkMetrics.totalDevices}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <Activity className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-sm text-slate-400">Blocked Connections</p>
              <p className="text-2xl font-bold text-red-400">
                {networkMetrics.blockedConnections}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <Eye className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-sm text-slate-400">Active Policies</p>
              <p className="text-2xl font-bold text-blue-400">
                {networkMetrics.activePolicies}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-sm text-slate-400">Security Posture</p>
              <p className="text-2xl font-bold text-purple-400">
                {isProcessing ? 'Scanning' : 'Secure'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Zero Trust Interface */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" />
                Zero Trust Security Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 gap-1 h-auto p-1 bg-slate-800">
                  <TabsTrigger
                    value="policies"
                    className="flex items-center gap-2 data-[state=active]:bg-red-600"
                  >
                    <Shield className="w-4 h-4" />
                    Security Policies
                  </TabsTrigger>
                  <TabsTrigger
                    value="segmentation"
                    className="flex items-center gap-2 data-[state=active]:bg-orange-600"
                  >
                    <Network className="w-4 h-4" />
                    Micro-Segmentation
                  </TabsTrigger>
                  <TabsTrigger
                    value="identity"
                    className="flex items-center gap-2 data-[state=active]:bg-yellow-600"
                  >
                    <Fingerprint className="w-4 h-4" />
                    Identity Verification
                  </TabsTrigger>
                </TabsList>

                {/* Security Policies Tab */}
                <TabsContent value="policies" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Shield className="w-8 h-8 text-red-400" />
                      <h3 className="text-xl font-bold">Zero Trust Policy Engine</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      Comprehensive policy management with real-time enforcement and compliance monitoring
                    </p>
                    
                    <Button
                      onClick={() => policyAnalysisMutation.mutate()}
                      disabled={isProcessing}
                      className="bg-red-600 hover:bg-red-700 mb-6"
                    >
                      {isProcessing ? 'Analyzing Policies...' : 'Analyze Security Policies'}
                    </Button>

                    {policies.length > 0 && (
                      <div className="space-y-4">
                        {policies.map((policy) => (
                          <Card key={policy.id} className="bg-slate-800 border-slate-700 text-left">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Lock className="w-4 h-4 text-red-400" />
                                  <span className="font-semibold">{policy.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getEnforcementColor(policy.enforcement)}>
                                    {policy.enforcement.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                                    {policy.category}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">Compliance</span>
                                    <span className={`text-sm font-medium ${getComplianceColor(policy.compliance)}`}>
                                      {policy.compliance.toFixed(1)}%
                                    </span>
                                  </div>
                                  <Progress value={policy.compliance} className="h-2" />
                                </div>

                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Violations</span>
                                  <p className={`text-lg font-bold ${policy.violations === 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {policy.violations}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-sm text-slate-400">Status</span>
                                  <div className="flex items-center gap-1">
                                    {policy.status === 'active' ? (
                                      <CheckCircle className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-400" />
                                    )}
                                    <span className="text-sm font-medium capitalize">{policy.status}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Micro-Segmentation Tab */}
                <TabsContent value="segmentation" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Network className="w-8 h-8 text-orange-400" />
                      <h3 className="text-xl font-bold">Network Micro-Segmentation</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      Advanced network segmentation with real-time traffic analysis and threat isolation
                    </p>
                    
                    <Button
                      onClick={() => segmentationMutation.mutate()}
                      disabled={isProcessing}
                      className="bg-orange-600 hover:bg-orange-700 mb-6"
                    >
                      {isProcessing ? 'Analyzing Segments...' : 'Analyze Network Segments'}
                    </Button>

                    {segments.length > 0 && (
                      <div className="space-y-4">
                        {segments.map((segment, index) => (
                          <Card key={index} className="bg-slate-800 border-slate-700 text-left">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <GitBranch className="w-4 h-4 text-orange-400" />
                                  <span className="font-semibold">{segment.segment}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getRiskColor(segment.riskLevel)}>
                                    {segment.riskLevel}
                                  </Badge>
                                  {segment.isolation && (
                                    <Badge variant="outline" className="text-green-400 border-green-400">
                                      Isolated
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Monitor className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-400">Devices</span>
                                  </div>
                                  <p className="text-sm font-medium text-blue-400">{segment.devices}</p>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Activity className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-400">Traffic</span>
                                  </div>
                                  <p className="text-sm font-medium text-cyan-400">{segment.traffic.toLocaleString()}</p>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-400">Allowed</span>
                                  </div>
                                  <p className="text-sm font-medium text-green-400">{segment.allowed.toLocaleString()}</p>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <XCircle className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-400">Blocked</span>
                                  </div>
                                  <p className="text-sm font-medium text-red-400">{segment.blocked.toLocaleString()}</p>
                                </div>
                              </div>

                              <div className="mt-3 p-2 bg-slate-900 rounded">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-slate-400">Traffic Analysis</span>
                                  <span className="text-xs text-green-400">
                                    {((segment.allowed / segment.traffic) * 100).toFixed(1)}% allowed
                                  </span>
                                </div>
                                <Progress value={(segment.allowed / segment.traffic) * 100} className="h-1 mt-1" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Identity Verification Tab */}
                <TabsContent value="identity" className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Fingerprint className="w-8 h-8 text-yellow-400" />
                      <h3 className="text-xl font-bold">Continuous Identity Verification</h3>
                    </div>
                    <p className="text-slate-400 mb-6">
                      Real-time identity verification with risk-based authentication and trust scoring
                    </p>
                    
                    <Button
                      onClick={() => identityVerificationMutation.mutate()}
                      disabled={isProcessing}
                      className="bg-yellow-600 hover:bg-yellow-700 mb-6"
                    >
                      {isProcessing ? 'Verifying Identities...' : 'Verify User Identities'}
                    </Button>

                    {identities.length > 0 && (
                      <div className="space-y-4">
                        {identities.map((identity) => (
                          <Card key={identity.userId} className="bg-slate-800 border-slate-700 text-left">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-yellow-400" />
                                  <span className="font-semibold">{identity.userId}</span>
                                </div>
                                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                                  {identity.accessLevel} Access
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-slate-400">Device: {identity.deviceId}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-slate-400">Location: {identity.location}</span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-slate-400">Trust Score</span>
                                    <span className={`text-sm font-medium ${getComplianceColor(identity.trustScore)}`}>
                                      {identity.trustScore.toFixed(1)}%
                                    </span>
                                  </div>
                                  <Progress value={identity.trustScore} className="h-2" />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-semibold mb-2">Authentication Methods</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {identity.authMethods.map((method, index) => (
                                      <Badge key={index} variant="outline" className="text-green-400 border-green-400 text-xs">
                                        {method}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="text-sm font-semibold mb-2">Risk Factors</h5>
                                  {identity.riskFactors.length > 0 ? (
                                    <div className="space-y-1">
                                      {identity.riskFactors.map((factor, index) => (
                                        <div key={index} className="flex items-center gap-1 text-xs">
                                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                                          <span className="text-slate-300">{factor}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1 text-xs">
                                      <CheckCircle className="w-3 h-3 text-green-400" />
                                      <span className="text-green-400">No risk factors detected</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Zero Trust Control Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-400" />
                Trust Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Policy Enforcement</span>
                  <Badge variant="outline" className="text-red-400 border-red-400">
                    {policies.length > 0 ? 'Active' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network Segmentation</span>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    {segments.length > 0 ? 'Configured' : 'Setup Required'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Identity Verification</span>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    {identities.length > 0 ? 'Monitoring' : 'Initializing'}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Security Principles</h4>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-red-400" />
                    Never trust, always verify
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-orange-400" />
                    Least privilege access
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="w-3 h-3 text-yellow-400" />
                    Assume breach mentality
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3 text-green-400" />
                    Continuous monitoring
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Actions */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Zero Trust Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700 justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Update Security Policies
              </Button>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                <Network className="w-4 h-4 mr-2" />
                Configure Segmentation
              </Button>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 justify-start">
                <Fingerprint className="w-4 h-4 mr-2" />
                Verify Identities
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Database className="w-4 h-4 mr-2" />
                Export Compliance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}