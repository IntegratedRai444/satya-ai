import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  Activity,
  Globe,
  Cpu,
  Database,
  Network,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  Settings,
  BarChart3,
  Target,
  Users,
  Server
} from 'lucide-react';

interface BlockchainNode {
  id: string;
  address: string;
  location: string;
  status: 'active' | 'inactive' | 'syncing' | 'maintenance';
  lastHeartbeat: string;
  blockHeight: number;
  reputation: number;
  securityScore: number;
  validatorType: 'consensus' | 'security' | 'verification' | 'audit';
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  uptime: number;
  validatedTransactions: number;
  detectedThreats: number;
  region: string;
  provider: string;
}

interface NetworkStatus {
  totalNodes: number;
  activeNodes: number;
  networkHealth: number;
  avgReputation: number;
  avgSecurityScore: number;
  totalBlocks: number;
  pendingTransactions: number;
  lastBlockTime: string;
  threatDetections: number;
  totalValidations: number;
}

interface ConsensusResult {
  isValid: boolean;
  confidence: number;
  validatorCount: number;
  consensusReached: boolean;
  threatLevel: string;
  recommendation: string;
}

export default function BlockchainSecurityNetwork() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [testEventData, setTestEventData] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: networkStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/blockchain/network-status'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: nodes, isLoading: nodesLoading } = useQuery({
    queryKey: ['/api/blockchain/nodes'],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: nodesByRegion } = useQuery({
    queryKey: ['/api/blockchain/nodes-by-region'],
    refetchInterval: 60000,
  });

  const { data: blockchainInfo } = useQuery({
    queryKey: ['/api/blockchain/info'],
    refetchInterval: 30000,
  });

  const validateEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      return apiRequest('POST', '/api/blockchain/validate-security-event', eventData);
    },
    onSuccess: (data: ConsensusResult) => {
      toast({
        title: "Event Validated",
        description: `Consensus reached: ${data.consensusReached ? 'Yes' : 'No'}. Confidence: ${Math.round(data.confidence * 100)}%`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blockchain/network-status'] });
    },
    onError: (error: any) => {
      toast({
        title: "Validation Failed",
        description: error.message || "Failed to validate security event",
        variant: "destructive",
      });
    },
  });

  const handleTestValidation = () => {
    if (!testEventData.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter test event data",
        variant: "destructive",
      });
      return;
    }

    try {
      const eventData = JSON.parse(testEventData);
      validateEventMutation.mutate(eventData);
    } catch (error) {
      // If it's not JSON, treat as simple text event
      validateEventMutation.mutate({
        type: 'threat_detection',
        data: testEventData,
        timestamp: new Date().toISOString()
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'syncing': return 'bg-yellow-600';
      case 'maintenance': return 'bg-blue-600';
      case 'inactive': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getValidatorTypeIcon = (type: string) => {
    switch (type) {
      case 'consensus': return <Users className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'verification': return <CheckCircle className="h-4 w-4" />;
      case 'audit': return <Eye className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  if (statusLoading || nodesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-400" />
            SatyaAI Blockchain Security Network
          </CardTitle>
          <CardDescription className="text-slate-300">
            Distributed consensus network with 120+ security validation nodes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300 text-sm">Total Nodes</span>
              </div>
              <div className="text-2xl font-bold text-white">{networkStatus?.totalNodes || 0}</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span className="text-slate-300 text-sm">Active Nodes</span>
              </div>
              <div className="text-2xl font-bold text-white">{networkStatus?.activeNodes || 0}</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-400" />
                <span className="text-slate-300 text-sm">Network Health</span>
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(networkStatus?.networkHealth || 0)}%</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <span className="text-slate-300 text-sm">Threat Detections</span>
              </div>
              <div className="text-2xl font-bold text-white">{networkStatus?.threatDetections || 0}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">Network Health</span>
              <span className="text-white font-semibold">{Math.round(networkStatus?.networkHealth || 0)}%</span>
            </div>
            <Progress value={networkStatus?.networkHealth || 0} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nodes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="nodes" className="data-[state=active]:bg-blue-600">
            <Server className="h-4 w-4 mr-2" />
            Node Network
          </TabsTrigger>
          <TabsTrigger value="consensus" className="data-[state=active]:bg-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Consensus
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-purple-600">
            <Database className="h-4 w-4 mr-2" />
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="regions" className="data-[state=active]:bg-orange-600">
            <Globe className="h-4 w-4 mr-2" />
            Global Map
          </TabsTrigger>
        </TabsList>

        {/* Node Network Tab */}
        <TabsContent value="nodes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nodes?.slice(0, 12).map((node: BlockchainNode) => (
              <Card key={node.id} className="bg-slate-900 border-slate-600 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => setSelectedNode(node.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getValidatorTypeIcon(node.validatorType)}
                      <span className="text-white font-medium text-sm">{node.id}</span>
                    </div>
                    <Badge className={getStatusColor(node.status)}>
                      {node.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-slate-300">{node.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reputation:</span>
                      <span className="text-green-400">{node.reputation}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security:</span>
                      <span className="text-blue-400">{node.securityScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="text-orange-400">{node.uptime.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">CPU</span>
                        <span className="text-slate-300">{node.cpuUsage}%</span>
                      </div>
                      <Progress value={node.cpuUsage} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Memory</span>
                        <span className="text-slate-300">{node.memoryUsage}%</span>
                      </div>
                      <Progress value={node.memoryUsage} className="h-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="text-slate-400 text-sm">
              Showing 12 of {nodes?.length || 0} nodes. Total network capacity: {networkStatus?.totalNodes || 0} nodes
            </p>
          </div>
        </TabsContent>

        {/* Consensus Tab */}
        <TabsContent value="consensus" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                Security Event Validation
              </CardTitle>
              <CardDescription className="text-slate-300">
                Test blockchain consensus mechanism with security events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Test Event Data (JSON or text)</label>
                <Input
                  value={testEventData}
                  onChange={(e) => setTestEventData(e.target.value)}
                  placeholder='{"threat_type": "malware", "source": "192.168.1.100", "severity": "high"}'
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button 
                onClick={handleTestValidation}
                disabled={validateEventMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {validateEventMutation.isPending ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate Event
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-900 p-3 rounded-lg">
                  <div className="text-slate-400 text-xs">Avg Reputation</div>
                  <div className="text-white font-semibold">{Math.round(networkStatus?.avgReputation || 0)}%</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <div className="text-slate-400 text-xs">Avg Security Score</div>
                  <div className="text-white font-semibold">{Math.round(networkStatus?.avgSecurityScore || 0)}%</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <div className="text-slate-400 text-xs">Total Validations</div>
                  <div className="text-white font-semibold">{networkStatus?.totalValidations || 0}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg">
                  <div className="text-slate-400 text-xs">Pending Transactions</div>
                  <div className="text-white font-semibold">{networkStatus?.pendingTransactions || 0}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blockchain Tab */}
        <TabsContent value="blockchain" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                Blockchain Information
              </CardTitle>
              <CardDescription className="text-slate-300">
                Security blockchain metrics and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    <span className="text-slate-300">Block Height</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{blockchainInfo?.height || 0}</div>
                  <div className="text-slate-400 text-sm">Total blocks mined</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="text-slate-300">Total Transactions</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{blockchainInfo?.totalTransactions || 0}</div>
                  <div className="text-slate-400 text-sm">Security validations</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-5 w-5 text-blue-400" />
                    <span className="text-slate-300">Difficulty</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{blockchainInfo?.difficulty || 0}</div>
                  <div className="text-slate-400 text-sm">Mining difficulty</div>
                </div>
              </div>

              {blockchainInfo?.lastBlock && (
                <div className="mt-6 bg-slate-900 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Latest Block</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Index:</span>
                      <span className="text-white ml-2">{blockchainInfo.lastBlock.index}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-white ml-2">{new Date(blockchainInfo.lastBlock.timestamp).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Validator:</span>
                      <span className="text-white ml-2">{blockchainInfo.lastBlock.validator}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Transactions:</span>
                      <span className="text-white ml-2">{blockchainInfo.lastBlock.data?.length || 0}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Map Tab */}
        <TabsContent value="regions" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-400" />
                Global Node Distribution
              </CardTitle>
              <CardDescription className="text-slate-300">
                120 nodes distributed across global regions for maximum security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nodesByRegion && Object.entries(nodesByRegion).map(([region, regionNodes]) => (
                  <div key={region} className="bg-slate-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{region}</h4>
                      <Badge className="bg-blue-600">{(regionNodes as BlockchainNode[]).length} nodes</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Active:</span>
                        <span className="text-green-400">
                          {(regionNodes as BlockchainNode[]).filter(n => n.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Avg Reputation:</span>
                        <span className="text-blue-400">
                          {Math.round((regionNodes as BlockchainNode[]).reduce((sum, n) => sum + n.reputation, 0) / (regionNodes as BlockchainNode[]).length)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Threats Detected:</span>
                        <span className="text-red-400">
                          {(regionNodes as BlockchainNode[]).reduce((sum, n) => sum + n.detectedThreats, 0)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-slate-400 mb-1">Regional Health</div>
                      <Progress 
                        value={(regionNodes as BlockchainNode[]).filter(n => n.status === 'active').length / (regionNodes as BlockchainNode[]).length * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}