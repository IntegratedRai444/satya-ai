import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Globe, 
  Target, 
  Brain, 
  TrendingUp,
  AlertTriangle,
  Users,
  Zap,
  Eye,
  Clock,
  ExternalLink,
  Newspaper,
  Rss
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: 'cyber' | 'ai';
  time: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
}

interface CompactMetrics {
  threats_blocked: number;
  active_clients: number;
  security_score: number;
  incidents: number;
  ai_detections: number;
  global_coverage: number;
}

export function CompactCyberDashboard() {
  const [metrics, setMetrics] = useState<CompactMetrics>({
    threats_blocked: 85234567,
    active_clients: 16847,
    security_score: 98.7,
    incidents: 23,
    ai_detections: 1247896,
    global_coverage: 99.2
  });

  const [newsFeeds, setNewsFeeds] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [selectedNewsFilter, setSelectedNewsFilter] = useState<'all' | 'cyber' | 'ai'>('all');

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        const response = await fetch('/api/news?limit=10');
        const data = await response.json();
        
        // Transform API response to match component interface
        const transformedNews = data.articles.map((article: any) => ({
          id: article.id,
          title: article.title,
          source: article.source,
          category: article.category,
          time: new Date(article.publishedAt).toLocaleString(),
          url: article.url,
          severity: article.severity,
          summary: article.summary
        }));
        
        setNewsFeeds(transformedNews);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        // Fallback to basic news items if API fails
        setNewsFeeds([
          {
            id: 'news_001',
            title: 'Major Ransomware Group Disrupted by International Task Force',
            source: 'CyberSecurityNews',
            category: 'cyber',
            time: '2 hours ago',
            url: '#',
            severity: 'high',
            summary: 'Coordinated effort dismantles infrastructure used by notorious ransomware operators.'
          }
        ]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        threats_blocked: prev.threats_blocked + Math.floor(Math.random() * 50),
        incidents: Math.max(0, prev.incidents + Math.floor((Math.random() - 0.5) * 3)),
        ai_detections: prev.ai_detections + Math.floor(Math.random() * 15),
        security_score: Math.max(95, Math.min(100, prev.security_score + (Math.random() - 0.5) * 0.2))
      }));

      // Refresh news from API periodically
      if (Math.random() > 0.95) {
        fetch('/api/news?limit=10')
          .then(response => response.json())
          .then(data => {
            const transformedNews = data.articles.map((article: any) => ({
              id: article.id,
              title: article.title,
              source: article.source,
              category: article.category,
              time: new Date(article.publishedAt).toLocaleString(),
              url: article.url,
              severity: article.severity,
              summary: article.summary
            }));
            setNewsFeeds(transformedNews);
          })
          .catch(error => console.error('Failed to refresh news:', error));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cyber': return 'bg-red-600';
      case 'ai': return 'bg-purple-600';
      default: return 'bg-blue-600';
    }
  };

  const filteredNews = newsFeeds.filter(news => 
    selectedNewsFilter === 'all' || news.category === selectedNewsFilter
  );

  return (
    <div className="space-y-6">
      {/* Compact Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{(metrics.threats_blocked / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-blue-200">Threats Blocked</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-green-500/30">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{(metrics.active_clients / 1000).toFixed(1)}K</div>
            <div className="text-xs text-green-200">Active Clients</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{metrics.security_score.toFixed(1)}%</div>
            <div className="text-xs text-purple-200">Security Score</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/60 to-red-800/40 border-red-500/30">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{metrics.incidents}</div>
            <div className="text-xs text-red-200">Active Incidents</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/60 to-cyan-800/40 border-cyan-500/30">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{(metrics.ai_detections / 1000).toFixed(0)}K</div>
            <div className="text-xs text-cyan-200">AI Detections</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/60 to-yellow-800/40 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{metrics.global_coverage.toFixed(1)}%</div>
            <div className="text-xs text-yellow-200">Global Coverage</div>
          </CardContent>
        </Card>
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/60 to-teal-800/40 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Global SOC</div>
                <div className="text-emerald-200 text-sm">24/7 Monitoring</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-200">Status:</span>
              <Badge className="bg-green-600 text-white">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/60 to-pink-800/40 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">AI Intelligence</div>
                <div className="text-purple-200 text-sm">Neural Networks</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-200">Models:</span>
              <Badge className="bg-purple-600 text-white">6 Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/60 to-orange-800/40 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Threat Simulation</div>
                <div className="text-red-200 text-sm">Live Campaigns</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-200">Running:</span>
              <Badge className="bg-red-600 text-white">6 Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily News Feed */}
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-blue-400" />
              Cyber & AI Daily News
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={selectedNewsFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedNewsFilter('all')}
                className="text-xs"
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={selectedNewsFilter === 'cyber' ? 'default' : 'outline'}
                onClick={() => setSelectedNewsFilter('cyber')}
                className="text-xs bg-red-600 hover:bg-red-700"
              >
                Cyber
              </Button>
              <Button 
                size="sm" 
                variant={selectedNewsFilter === 'ai' ? 'default' : 'outline'}
                onClick={() => setSelectedNewsFilter('ai')}
                className="text-xs bg-purple-600 hover:bg-purple-700"
              >
                AI
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {loadingNews && (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading latest cyber & AI news...</div>
            </div>
          )}
          {!loadingNews && filteredNews.map(news => (
            <div key={news.id} className="p-3 rounded-lg bg-gray-800/60 border border-gray-600/30 hover:bg-gray-700/60 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${getCategoryColor(news.category)} text-white text-xs`}>
                      {news.category.toUpperCase()}
                    </Badge>
                    <Badge className={`${getSeverityColor(news.severity)} text-white text-xs`}>
                      {news.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-white font-semibold text-sm leading-tight mb-1">
                    {news.title}
                  </h4>
                  <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{news.source}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="ml-2 p-1 h-8 w-8">
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-12">
          <Shield className="w-4 h-4 mr-2" />
          Deploy Shield
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12">
          <Brain className="w-4 h-4 mr-2" />
          AI Analysis
        </Button>
        <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-12">
          <Target className="w-4 h-4 mr-2" />
          Run Simulation
        </Button>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12">
          <Rss className="w-4 h-4 mr-2" />
          Live Feed
        </Button>
      </div>
    </div>
  );
}

export default CompactCyberDashboard;