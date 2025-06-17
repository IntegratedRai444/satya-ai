import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Globe,
  Database,
  Activity,
  TrendingUp,
  Clock,
  Shield,
  Brain,
  Zap,
  Target,
  Eye,
  Hash,
  Link,
  Mail,
  FileText,
  Server,
  Wifi,
  Bug,
  Users,
  Layers
} from 'lucide-react';

interface ThreatIntelligenceQuery {
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'cve';
  value: string;
  source?: 'misp' | 'opencti' | 'both';
}

interface ThreatIntelligenceResult {
  query: ThreatIntelligenceQuery;
  sources: {
    misp?: {
      events: any[];
      total_count: number;
      threat_level: 'low' | 'medium' | 'high' | 'critical';
    };
    opencti?: {
      indicators: any[];
      total_count: number;
      confidence_score: number;
    };
  };
  analysis: {
    overall_threat_level: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    indicators_found: number;
    last_seen?: string;
    threat_types: string[];
    recommendations: string[];
  };
  timestamp: Date;
}

interface ConnectionStatus {
  connections: {
    misp: boolean;
    opencti: boolean;
    errors: string[];
  };
  configured_sources: {
    misp: boolean;
    opencti: boolean;
  };
}

export default function ThreatIntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState('query');
  const [queryType, setQueryType] = useState<ThreatIntelligenceQuery['type']>('ip');
  const [queryValue, setQueryValue] = useState('');
  const [selectedSource, setSelectedSource] = useState<'misp' | 'opencti' | 'both'>('both');
  const [bulkQueries, setBulkQueries] = useState('');
  const [queryHistory, setQueryHistory] = useState<ThreatIntelligenceResult[]>([]);

  const queryClient = useQueryClient();

  // Check threat intelligence connection status
  const { data: connectionStatus, isLoading: statusLoading } = useQuery<ConnectionStatus>({
    queryKey: ['/api/threat-intelligence/status'],
    refetchInterval: 30000 // Check every 30 seconds
  });

  // Get recent threats
  const { data: recentThreats, isLoading: threatsLoading } = useQuery<{
    misp?: any[];
    opencti?: any[];
    trends?: any;
  }>({
    queryKey: ['/api/threat-intelligence/recent'],
    refetchInterval: 60000 // Refresh every minute
  });

  // Single query mutation
  const singleQueryMutation = useMutation({
    mutationFn: async (query: ThreatIntelligenceQuery): Promise<ThreatIntelligenceResult> => {
      const response = await fetch('/api/threat-intelligence/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      if (!response.ok) throw new Error(`Query failed: ${response.statusText}`);
      return await response.json();
    },
    onSuccess: (data) => {
      setQueryHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 queries
      queryClient.invalidateQueries({ queryKey: ['/api/threat-intelligence/recent'] });
    }
  });

  // Bulk query mutation
  const bulkQueryMutation = useMutation({
    mutationFn: async (queries: ThreatIntelligenceQuery[]) => {
      const response = await fetch('/api/threat-intelligence/bulk-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queries })
      });
      if (!response.ok) throw new Error(`Bulk query failed: ${response.statusText}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/threat-intelligence/recent'] });
    }
  });

  const handleSingleQuery = () => {
    if (!queryValue.trim()) return;

    const query: ThreatIntelligenceQuery = {
      type: queryType,
      value: queryValue.trim(),
      source: selectedSource
    };

    singleQueryMutation.mutate(query);
  };

  const handleBulkQuery = () => {
    const lines = bulkQueries.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    const queries: ThreatIntelligenceQuery[] = lines.map(line => {
      const [type, value] = line.trim().split(/\s+/);
      return {
        type: (type as ThreatIntelligenceQuery['type']) || 'ip',
        value: value || type,
        source: selectedSource
      };
    });

    bulkQueryMutation.mutate(queries);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getQueryTypeIcon = (type: string) => {
    switch (type) {
      case 'ip': return <Server className="w-4 h-4" />;
      case 'domain': return <Globe className="w-4 h-4" />;
      case 'hash': return <Hash className="w-4 h-4" />;
      case 'url': return <Link className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'cve': return <Bug className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'misp': return <Database className="w-4 h-4 text-blue-400" />;
      case 'opencti': return <Layers className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      <UnifiedSidebar />
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">Threat Intelligence Center</h1>
                  <p className="text-gray-400">MISP & OpenCTI Integration Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {connectionStatus && (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      connectionStatus.connections.misp ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white text-sm">MISP</span>
                    <div className={`w-3 h-3 rounded-full ${
                      connectionStatus.connections.opencti ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white text-sm">OpenCTI</span>
                  </div>
                )}
              </div>
            </div>

            {/* Connection Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0ea5e9]/10 border-[#0ea5e9]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-[#0ea5e9]" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {connectionStatus?.connections.misp ? 'Connected' : 'Offline'}
                      </div>
                      <div className="text-gray-400 text-sm">MISP Platform</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Layers className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {connectionStatus?.connections.opencti ? 'Connected' : 'Offline'}
                      </div>
                      <div className="text-gray-400 text-sm">OpenCTI Platform</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {queryHistory.length}
                      </div>
                      <div className="text-gray-400 text-sm">Queries Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {(recentThreats?.misp?.length || 0) + (recentThreats?.opencti?.length || 0)}
                      </div>
                      <div className="text-gray-400 text-sm">Recent Threats</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="query" className="text-white">Threat Query</TabsTrigger>
              <TabsTrigger value="bulk" className="text-white">Bulk Analysis</TabsTrigger>
              <TabsTrigger value="recent" className="text-white">Recent Threats</TabsTrigger>
              <TabsTrigger value="history" className="text-white">Query History</TabsTrigger>
            </TabsList>

            <TabsContent value="query" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Query Input */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Search className="w-5 h-5 text-[#0ea5e9]" />
                      Threat Intelligence Query
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {['ip', 'domain', 'hash', 'url', 'email', 'cve'].map((type) => (
                        <Button
                          key={type}
                          variant={queryType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setQueryType(type as ThreatIntelligenceQuery['type'])}
                          className="text-white"
                        >
                          {getQueryTypeIcon(type)}
                          <span className="ml-1">{type.toUpperCase()}</span>
                        </Button>
                      ))}
                    </div>

                    <Input
                      placeholder={`Enter ${queryType} to analyze...`}
                      value={queryValue}
                      onChange={(e) => setQueryValue(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />

                    <div className="space-y-2">
                      <label className="text-white text-sm">Data Source</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'both', label: 'Both', icon: Activity },
                          { value: 'misp', label: 'MISP', icon: Database },
                          { value: 'opencti', label: 'OpenCTI', icon: Layers }
                        ].map((source) => (
                          <Button
                            key={source.value}
                            variant={selectedSource === source.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSource(source.value as any)}
                            className="text-white"
                          >
                            <source.icon className="w-4 h-4 mr-1" />
                            {source.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={handleSingleQuery}
                      disabled={!queryValue.trim() || singleQueryMutation.isPending}
                      className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                    >
                      {singleQueryMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Query Threat Intelligence
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Query Results */}
                {singleQueryMutation.data && (
                  <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#0ea5e9]" />
                        Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getQueryTypeIcon(singleQueryMutation.data.query.type)}
                            <span className="text-white font-medium">
                              {singleQueryMutation.data.query.value}
                            </span>
                          </div>
                          <Badge className={getThreatLevelColor(singleQueryMutation.data.analysis.overall_threat_level)}>
                            {singleQueryMutation.data.analysis.overall_threat_level.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-gray-400 text-sm">Indicators Found</div>
                            <div className="text-white text-lg font-bold">
                              {singleQueryMutation.data.analysis.indicators_found}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Confidence</div>
                            <div className="text-white text-lg font-bold">
                              {singleQueryMutation.data.analysis.confidence.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-white text-sm font-medium">Sources</div>
                          <div className="flex gap-2">
                            {singleQueryMutation.data.sources.misp && (
                              <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                                <Database className="w-3 h-3 mr-1" />
                                MISP ({singleQueryMutation.data.sources.misp.total_count})
                              </Badge>
                            )}
                            {singleQueryMutation.data.sources.opencti && (
                              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                                <Layers className="w-3 h-3 mr-1" />
                                OpenCTI ({singleQueryMutation.data.sources.opencti.total_count})
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-white text-sm font-medium">Threat Types</div>
                          <div className="flex flex-wrap gap-1">
                            {singleQueryMutation.data.analysis.threat_types.slice(0, 5).map((type, index) => (
                              <Badge key={index} variant="outline" className="text-gray-400 text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-white text-sm font-medium">Recommendations</div>
                          <ul className="space-y-1">
                            {singleQueryMutation.data.analysis.recommendations.slice(0, 3).map((rec, index) => (
                              <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                                <div className="w-1 h-1 bg-[#0ea5e9] rounded-full mt-2 flex-shrink-0"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0ea5e9]" />
                    Bulk Threat Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm">
                      Enter indicators (one per line, format: type value)
                    </label>
                    <Textarea
                      placeholder={`ip 192.168.1.1\ndomain malicious.com\nhash a1b2c3d4e5f6...\nurl https://suspicious.site\nemail bad@actor.com\ncve CVE-2023-1234`}
                      value={bulkQueries}
                      onChange={(e) => setBulkQueries(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white min-h-32"
                      rows={8}
                    />
                  </div>

                  <Button 
                    onClick={handleBulkQuery}
                    disabled={!bulkQueries.trim() || bulkQueryMutation.isPending}
                    className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                  >
                    {bulkQueryMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Bulk Query...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 mr-2" />
                        Analyze All Indicators
                      </>
                    )}
                  </Button>

                  {bulkQueryMutation.data && (
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-gray-400 text-sm">Total Queries</div>
                          <div className="text-white text-lg font-bold">
                            {bulkQueryMutation.data.total_queries}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Successful</div>
                          <div className="text-green-400 text-lg font-bold">
                            {bulkQueryMutation.data.successful}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Failed</div>
                          <div className="text-red-400 text-lg font-bold">
                            {bulkQueryMutation.data.failed}
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Full Report
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MISP Recent Events */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-400" />
                      Recent MISP Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      {threatsLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-8 h-8 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {recentThreats?.misp?.slice(0, 10).map((event: any, index: number) => (
                            <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-sm font-medium truncate">
                                  {event.info || 'Untitled Event'}
                                </span>
                                <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                                  MISP
                                </Badge>
                              </div>
                              <div className="text-gray-400 text-xs">
                                Event ID: {event.id} • {new Date(event.date).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* OpenCTI Recent Indicators */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-400" />
                      Recent OpenCTI Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      {threatsLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-8 h-8 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {recentThreats?.opencti?.slice(0, 10).map((indicator: any, index: number) => (
                            <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-sm font-medium truncate">
                                  {indicator.pattern || indicator.standard_id}
                                </span>
                                <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                                  OpenCTI
                                </Badge>
                              </div>
                              <div className="text-gray-400 text-xs">
                                Confidence: {indicator.confidence || 'N/A'}% • {new Date(indicator.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0ea5e9]" />
                    Query History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {queryHistory.map((result, index) => (
                        <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getQueryTypeIcon(result.query.type)}
                              <span className="text-white font-medium">
                                {result.query.value}
                              </span>
                            </div>
                            <Badge className={getThreatLevelColor(result.analysis.overall_threat_level)}>
                              {result.analysis.overall_threat_level.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Indicators</div>
                              <div className="text-white">{result.analysis.indicators_found}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Confidence</div>
                              <div className="text-white">{result.analysis.confidence.toFixed(1)}%</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Queried</div>
                              <div className="text-white">
                                {new Date(result.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {queryHistory.length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          No queries performed yet. Start by analyzing an indicator above.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}