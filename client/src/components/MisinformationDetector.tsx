import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Globe,
  Link,
  FileText,
  Image,
  Video,
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Brain,
  Zap,
  Target,
  Database,
  Eye,
  Hash,
  Activity
} from 'lucide-react';

interface MisinformationAnalysis {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'url' | 'social_post';
  credibility_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  indicators: {
    factual_accuracy: number;
    source_credibility: number;
    bias_detection: number;
    emotional_manipulation: number;
    viral_patterns: number;
  };
  sources: Array<{
    url: string;
    credibility: number;
    type: 'news' | 'academic' | 'government' | 'social' | 'unknown';
  }>;
  fact_checks: Array<{
    claim: string;
    verdict: 'true' | 'false' | 'mixed' | 'unverified';
    source: string;
    confidence: number;
  }>;
  timestamp: Date;
  status: 'analyzing' | 'complete' | 'flagged';
}

interface TrendingMisinformation {
  id: string;
  topic: string;
  volume: number;
  growth_rate: number;
  platforms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  first_detected: Date;
  related_urls: string[];
}

export default function MisinformationDetector() {
  const [activeTab, setActiveTab] = useState('detector');
  const [analysisMode, setAnalysisMode] = useState<'text' | 'url' | 'image' | 'bulk'>('text');
  const [inputContent, setInputContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const [analyses, setAnalyses] = useState<MisinformationAnalysis[]>([]);
  const [trendingMisinformation, setTrendingMisinformation] = useState<TrendingMisinformation[]>([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize sample data
    const sampleAnalyses: MisinformationAnalysis[] = [
      {
        id: 'analysis-1',
        content: 'Breaking: Scientists discover miracle cure that doctors don\'t want you to know!',
        type: 'text',
        credibility_score: 15.3,
        risk_level: 'critical',
        indicators: {
          factual_accuracy: 12.5,
          source_credibility: 8.7,
          bias_detection: 89.2,
          emotional_manipulation: 94.8,
          viral_patterns: 76.3
        },
        sources: [
          { url: 'suspicious-health-blog.com', credibility: 15.2, type: 'unknown' },
          { url: 'fake-medical-journal.net', credibility: 8.9, type: 'unknown' }
        ],
        fact_checks: [
          { claim: 'Miracle cure exists', verdict: 'false', source: 'Medical Fact Checker', confidence: 96.7 }
        ],
        timestamp: new Date(),
        status: 'complete'
      },
      {
        id: 'analysis-2',
        content: 'https://legitimate-news-site.com/verified-story',
        type: 'url',
        credibility_score: 87.6,
        risk_level: 'low',
        indicators: {
          factual_accuracy: 91.2,
          source_credibility: 89.4,
          bias_detection: 23.1,
          emotional_manipulation: 15.7,
          viral_patterns: 34.2
        },
        sources: [
          { url: 'reuters.com', credibility: 94.8, type: 'news' },
          { url: 'ap.org', credibility: 96.2, type: 'news' }
        ],
        fact_checks: [
          { claim: 'Economic data accurate', verdict: 'true', source: 'Economic Fact Check', confidence: 92.1 }
        ],
        timestamp: new Date(),
        status: 'complete'
      }
    ];

    const sampleTrending: TrendingMisinformation[] = [
      {
        id: 'trend-1',
        topic: 'Vaccine Misinformation Campaign',
        volume: 2847,
        growth_rate: 34.7,
        platforms: ['Twitter', 'Facebook', 'Telegram'],
        severity: 'critical',
        first_detected: new Date(Date.now() - 3600000),
        related_urls: ['example1.com', 'example2.com']
      },
      {
        id: 'trend-2',
        topic: 'Election Fraud Claims',
        volume: 1523,
        growth_rate: 18.2,
        platforms: ['Twitter', 'TikTok'],
        severity: 'high',
        first_detected: new Date(Date.now() - 7200000),
        related_urls: ['example3.com']
      }
    ];

    setAnalyses(sampleAnalyses);
    setTrendingMisinformation(sampleTrending);
  }, []);

  const analyzeContent = async () => {
    if (!inputContent.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progressive analysis
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Create new analysis
          const newAnalysis: MisinformationAnalysis = {
            id: `analysis-${Date.now()}`,
            content: inputContent,
            type: analysisMode === 'url' ? 'url' : 'text',
            credibility_score: Math.random() * 100,
            risk_level: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
            indicators: {
              factual_accuracy: Math.random() * 100,
              source_credibility: Math.random() * 100,
              bias_detection: Math.random() * 100,
              emotional_manipulation: Math.random() * 100,
              viral_patterns: Math.random() * 100
            },
            sources: [
              { url: 'source1.com', credibility: Math.random() * 100, type: 'news' },
              { url: 'source2.com', credibility: Math.random() * 100, type: 'academic' }
            ],
            fact_checks: [
              { 
                claim: 'Main claim verification', 
                verdict: Math.random() > 0.5 ? 'true' : 'false', 
                source: 'Fact Checker AI', 
                confidence: Math.random() * 100 
              }
            ],
            timestamp: new Date(),
            status: 'complete'
          };

          setAnalyses(prev => [newAnalysis, ...prev]);
          setInputContent('');
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'false': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'mixed': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return <Eye className="w-4 h-4 text-gray-400" />;
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
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">Misinformation Detection Center</h1>
                  <p className="text-gray-400">AI-powered fact-checking and disinformation analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-[#0ea5e9] border-[#0ea5e9]/30">
                  <Brain className="w-3 h-3 mr-1" />
                  Neural Analysis
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0ea5e9]/10 border-[#0ea5e9]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-[#0ea5e9]" />
                    <div>
                      <div className="text-white text-xl font-bold">47,382</div>
                      <div className="text-gray-400 text-sm">Claims Analyzed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-400" />
                    <div>
                      <div className="text-white text-xl font-bold">12,847</div>
                      <div className="text-gray-400 text-sm">False Claims</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-white text-xl font-bold">234</div>
                      <div className="text-gray-400 text-sm">Trending Topics</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">94.7%</div>
                      <div className="text-gray-400 text-sm">Accuracy Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="detector" className="text-white">Content Analyzer</TabsTrigger>
              <TabsTrigger value="trending" className="text-white">Trending Misinfo</TabsTrigger>
              <TabsTrigger value="monitoring" className="text-white">Real-time Monitor</TabsTrigger>
              <TabsTrigger value="reports" className="text-white">Analysis Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="detector" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Content Input */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Search className="w-5 h-5 text-[#0ea5e9]" />
                      Content Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { mode: 'text', icon: FileText, label: 'Text' },
                        { mode: 'url', icon: Link, label: 'URL' },
                        { mode: 'image', icon: Image, label: 'Image' },
                        { mode: 'bulk', icon: Database, label: 'Bulk' }
                      ].map((option) => (
                        <Button
                          key={option.mode}
                          variant={analysisMode === option.mode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAnalysisMode(option.mode as any)}
                          className="text-white"
                        >
                          <option.icon className="w-4 h-4 mr-1" />
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    {analysisMode === 'text' && (
                      <Textarea
                        placeholder="Enter text content, social media post, or claim to analyze for misinformation..."
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white min-h-32"
                      />
                    )}

                    {analysisMode === 'url' && (
                      <Input
                        placeholder="Enter URL to analyze (website, article, social media post)..."
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    )}

                    {analysisMode === 'image' && (
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <div className="text-white mb-2">Upload image to analyze</div>
                        <div className="text-gray-400 text-sm">Supports JPG, PNG, WebP</div>
                        <Button variant="outline" className="mt-4 text-white">
                          Choose File
                        </Button>
                      </div>
                    )}

                    {isAnalyzing ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white">Analyzing content...</span>
                        </div>
                        <Progress value={analysisProgress} className="h-2" />
                        <div className="text-gray-400 text-sm">
                          Running {Math.floor(analysisProgress / 20) + 1}/6 analysis modules
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={analyzeContent}
                        disabled={!inputContent.trim()}
                        className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze for Misinformation
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#0ea5e9]" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { action: 'Scan Social Media', icon: MessageSquare, desc: 'Monitor trending posts' },
                      { action: 'Verify News Article', icon: FileText, desc: 'Check article credibility' },
                      { action: 'Analyze Website', icon: Globe, desc: 'Domain reputation check' },
                      { action: 'Bulk URL Check', icon: Link, desc: 'Verify multiple links' }
                    ].map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-white border-gray-700 h-auto p-3"
                      >
                        <item.icon className="w-4 h-4 mr-3 text-[#0ea5e9]" />
                        <div className="text-left">
                          <div className="font-medium">{item.action}</div>
                          <div className="text-xs text-gray-400">{item.desc}</div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trendingMisinformation.map((trend) => (
                  <Card key={trend.id} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{trend.topic}</CardTitle>
                        <Badge className={getRiskColor(trend.severity)}>
                          {trend.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Volume</div>
                          <div className="text-white font-bold">{trend.volume.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Growth Rate</div>
                          <div className="text-white font-bold">+{trend.growth_rate}%</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-400 text-sm mb-2">Active Platforms</div>
                        <div className="flex gap-2">
                          {trend.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-[#0ea5e9] border-[#0ea5e9]/30">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        First detected {Math.floor((Date.now() - trend.first_detected.getTime()) / 60000)} minutes ago
                      </div>

                      <Button variant="outline" className="w-full text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate Topic
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Monitoring Streams */}
                {[
                  { source: 'Twitter', status: 'active', alerts: 23, color: 'blue' },
                  { source: 'Facebook', status: 'active', alerts: 18, color: 'blue' },
                  { source: 'Reddit', status: 'monitoring', alerts: 7, color: 'yellow' },
                  { source: 'Telegram', status: 'active', alerts: 34, color: 'red' },
                  { source: 'TikTok', status: 'scanning', alerts: 12, color: 'purple' },
                  { source: 'News Sites', status: 'active', alerts: 5, color: 'green' }
                ].map((stream, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          stream.color === 'blue' ? 'bg-blue-400' :
                          stream.color === 'yellow' ? 'bg-yellow-400' :
                          stream.color === 'red' ? 'bg-red-400' :
                          stream.color === 'purple' ? 'bg-purple-400' : 'bg-green-400'
                        }`}></div>
                        {stream.source}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status</span>
                        <Badge variant="outline" className="text-white">
                          {stream.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Active Alerts</span>
                        <span className="text-white font-bold">{stream.alerts}</span>
                      </div>
                      <Button variant="outline" className="w-full text-white" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Stream
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              {/* Analysis Results */}
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <Card key={analysis.id} className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
                            {analysis.type === 'text' && <FileText className="w-5 h-5 text-[#0ea5e9]" />}
                            {analysis.type === 'url' && <Link className="w-5 h-5 text-[#0ea5e9]" />}
                            {analysis.type === 'image' && <Image className="w-5 h-5 text-[#0ea5e9]" />}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {analysis.type.toUpperCase()} Analysis
                            </div>
                            <div className="text-gray-400 text-sm">
                              {analysis.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Badge className={getRiskColor(analysis.risk_level)}>
                          {analysis.risk_level.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="text-white text-sm font-medium mb-2">Content</div>
                        <div className="text-gray-300 text-sm">
                          {analysis.content.length > 200 
                            ? `${analysis.content.substring(0, 200)}...` 
                            : analysis.content
                          }
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Credibility Score</span>
                            <span className="text-white font-bold">
                              {analysis.credibility_score.toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={analysis.credibility_score} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          {analysis.fact_checks.map((check, index) => (
                            <div key={index} className="flex items-center gap-2">
                              {getVerdictIcon(check.verdict)}
                              <span className="text-white text-sm">{check.claim}</span>
                              <Badge variant="outline" className="text-xs">
                                {check.confidence.toFixed(0)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-2 text-xs">
                        {Object.entries(analysis.indicators).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-gray-400 mb-1">
                              {key.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </div>
                            <div className="text-white font-bold">{value.toFixed(0)}%</div>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full text-white" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Detailed Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}