import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Globe, 
  Clock, 
  TrendingUp, 
  Activity, 
  RefreshCw,
  ExternalLink,
  Target,
  Zap,
  Info,
  AlertCircle
} from 'lucide-react';

interface ThreatNews {
  title: string;
  description: string;
  content: string;
  pubDate: string;
  link: string;
  source_name: string;
  category: string[];
  country: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  affected_sectors: string[];
  attack_vectors: string[];
  iocs: string[];
}

interface ThreatIntelligenceData {
  status: string;
  totalResults: number;
  results: ThreatNews[];
}

export default function LiveThreatIntelligenceTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const { toast } = useToast();

  const { data: cyberNews, isLoading: cyberLoading, refetch: refetchCyber } = useQuery({
    queryKey: ['/api/threat-intelligence/cybersecurity'],
    refetchInterval: refreshInterval,
  });

  const { data: aiNews, isLoading: aiLoading, refetch: refetchAI } = useQuery({
    queryKey: ['/api/threat-intelligence/ai-security'],
    refetchInterval: refreshInterval,
  });

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['/api/threat-intelligence/summary'],
    refetchInterval: 60000, // 1 minute
  });

  const allNews = [
    ...(cyberNews?.results || []),
    ...(aiNews?.results || [])
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const filteredNews = selectedCategory === 'all' 
    ? allNews 
    : allNews.filter(news => 
        news.threat_level === selectedCategory || 
        news.attack_vectors.some(vector => vector.toLowerCase().includes(selectedCategory))
      );

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      default: return <Shield className="h-4 w-4 text-green-500" />;
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const handleRefresh = () => {
    refetchCyber();
    refetchAI();
    toast({
      title: "Refreshing Intelligence",
      description: "Fetching latest threat intelligence data...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Dashboard */}
      {summary && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Global Threat Intelligence Summary</CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time cybersecurity intelligence powered by live news feeds
                </CardDescription>
              </div>
              <Button
                onClick={handleRefresh}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={cyberLoading || aiLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${(cyberLoading || aiLoading) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{summary.totalThreats}</div>
                <div className="text-slate-400 text-sm">Total Threats</div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{summary.criticalThreats}</div>
                <div className="text-slate-400 text-sm">Critical Alerts</div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{summary.recentAttacks}</div>
                <div className="text-slate-400 text-sm">Recent Attacks</div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{summary.affectedCountries.length}</div>
                <div className="text-slate-400 text-sm">Countries Affected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Controls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Filter Threat Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['all', 'critical', 'high', 'medium', 'malware', 'phishing', 'ransomware'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600"}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threat Timeline */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Live Threat Intelligence Timeline</CardTitle>
          <CardDescription className="text-slate-300">
            Real-time cybersecurity events from global intelligence sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(cyberLoading || aiLoading) ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
              <span className="ml-2 text-slate-400">Loading threat intelligence...</span>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredNews.slice(0, 20).map((news, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 ${getThreatColor(news.threat_level)}`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getThreatIcon(news.threat_level)}
                        <h4 className="text-white font-semibold text-sm line-clamp-2">{news.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-slate-400 text-xs whitespace-nowrap">
                          {formatTimeAgo(news.pubDate)}
                        </span>
                        <Badge className={`${
                          news.threat_level === 'critical' ? 'bg-red-600' :
                          news.threat_level === 'high' ? 'bg-orange-600' :
                          news.threat_level === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                        } text-xs`}>
                          {news.threat_level}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{news.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {news.source_name}
                        </span>
                        {news.affected_sectors.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {news.affected_sectors.slice(0, 2).join(', ')}
                            {news.affected_sectors.length > 2 && '...'}
                          </span>
                        )}
                        {news.attack_vectors.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {news.attack_vectors.slice(0, 2).join(', ')}
                            {news.attack_vectors.length > 2 && '...'}
                          </span>
                        )}
                      </div>
                      
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Read More
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {news.iocs.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <span className="text-xs text-slate-400">IOCs: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {news.iocs.slice(0, 3).map((ioc, iocIndex) => (
                            <Badge key={iocIndex} variant="outline" className="text-xs border-slate-600">
                              {ioc.length > 20 ? `${ioc.substring(0, 20)}...` : ioc}
                            </Badge>
                          ))}
                          {news.iocs.length > 3 && (
                            <Badge variant="outline" className="text-xs border-slate-600">
                              +{news.iocs.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredNews.length === 0 && (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No threat intelligence available for the selected filter.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Threat Vectors */}
      {summary && summary.topThreatVectors.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Top Threat Vectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {summary.topThreatVectors.map((vector, index) => (
                <div key={index} className="bg-slate-900 rounded-lg p-3 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-red-400" />
                  <span className="text-slate-300 text-sm">{vector}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}