import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  Bot, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Search,
  TrendingUp,
  Globe,
  Zap,
  Eye
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  category: 'cyber' | 'ai' | 'tech';
  publishedAt: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  content: string;
  imageUrl?: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
  source: string;
}

export default function RealTimeNewsDashboard() {
  const [activeTab, setActiveTab] = useState<'cyber' | 'ai'>('cyber');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);

  // Fetch latest cyber news
  const { data: cyberNews, isLoading: cyberLoading, refetch: refetchCyber } = useQuery({
    queryKey: ['/api/real-news/latest', 'cyber'],
    queryFn: async () => {
      const response = await fetch('/api/real-news/latest?category=cyber');
      if (!response.ok) throw new Error('Failed to fetch cyber news');
      return response.json() as Promise<NewsResponse>;
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch latest AI news
  const { data: aiNews, isLoading: aiLoading, refetch: refetchAI } = useQuery({
    queryKey: ['/api/real-news/latest', 'ai'],
    queryFn: async () => {
      const response = await fetch('/api/real-news/latest?category=ai');
      if (!response.ok) throw new Error('Failed to fetch AI news');
      return response.json() as Promise<NewsResponse>;
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch trending topics
  const { data: trendingTopics } = useQuery({
    queryKey: ['/api/real-news/trending', activeTab],
    queryFn: async () => {
      const response = await fetch(`/api/real-news/trending?category=${activeTab}`);
      if (!response.ok) throw new Error('Failed to fetch trending topics');
      return response.json();
    },
    refetchInterval: 60000 // Refresh every minute
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(`/api/real-news/search?q=${encodeURIComponent(searchQuery)}&category=${activeTab}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json() as NewsResponse;
      setSearchResults(data.articles);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const NewsCard = ({ article }: { article: NewsArticle }) => (
    <Card className="bg-[#2a3441]/80 border-[#0ea5e9]/20 hover:border-[#0ea5e9]/40 transition-all duration-300 hover:bg-[#2a3441]/90">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-white text-sm font-medium line-clamp-2 leading-5">
            {article.title}
          </CardTitle>
          <Badge className={`${getSeverityColor(article.severity)} text-xs shrink-0`}>
            {article.severity.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="text-[#0ea5e9]">{article.source}</span>
          <span>•</span>
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(article.publishedAt)}</span>
          <span>•</span>
          {article.category === 'cyber' ? (
            <Shield className="w-3 h-3 text-[#0ea5e9]" />
          ) : (
            <Bot className="w-3 h-3 text-[#0ea5e9]" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-300 text-xs line-clamp-3 mb-3 leading-4">
          {article.summary}
        </p>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#0ea5e9] hover:text-white hover:bg-[#0ea5e9]/20 h-7 px-2 text-xs"
            onClick={() => window.open(article.url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Read Full Article
          </Button>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>Live</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const currentNews = activeTab === 'cyber' ? cyberNews : aiNews;
  const isLoading = activeTab === 'cyber' ? cyberLoading : aiLoading;
  const displayNews = searchResults.length > 0 ? searchResults : currentNews?.articles || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      <UnifiedSidebar />
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
        {/* SatyaAI Header Section */}
        <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">SatyaAI</h1>
                <p className="text-gray-400 text-sm">Synthetic Authentication Technology for Your Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#0ea5e9]/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
              <span className="text-[#0ea5e9] text-xs font-medium">New AI Models Released</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-white text-3xl font-bold mb-2">
              Detect <span className="text-[#0ea5e9]">deepfakes</span> with the power of SatyaAI
            </h2>
            <p className="text-gray-300 max-w-2xl">
              Our advanced detection system helps you authenticate media with unprecedented accuracy, 
              exposing manipulated content across images, videos, and audio.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <button className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Analyze Media
            </button>
            <button className="border border-gray-600 text-gray-300 hover:text-white px-6 py-2 rounded-lg font-medium">
              How it Works
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Upload your files or use your webcam for real-time analysis and get detailed authenticity reports instantly.
            </div>
            <div className="bg-[#2a3441] rounded-lg p-4 border border-[#0ea5e9]/20">
              <div className="text-right">
                <div className="text-[#0ea5e9] text-xs">AUTHENTICITY SCORE</div>
                <div className="text-white text-2xl font-bold">79%</div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
                  <span className="text-gray-300">Secure Processing</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Verified Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deepfake Detection Tools Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Deepfake Detection Tools</h2>
              <p className="text-gray-400">Choose your media type for comprehensive analysis</p>
            </div>
            <div className="text-gray-400 text-sm">
              Using <span className="text-[#0ea5e9]">Neural Vision v4.2</span> models
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Image Analysis */}
            <div className="bg-[#2a3441] border border-[#0ea5e9]/20 rounded-lg p-6 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0ea5e9]/30 transition-all">
                  <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Image Analysis</h3>
                <p className="text-gray-400 text-sm mb-4">Detect manipulated photos & generated images</p>
                <div className="text-center">
                  <div className="text-[#0ea5e9] text-xs mb-1">Accuracy</div>
                  <div className="text-white text-lg font-bold">98.2%</div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-gray-400">
                  <div>✓ Photoshop Detection</div>
                  <div>✓ GAN Detection</div>
                  <div>✓ Metadata Analysis</div>
                </div>
              </div>
            </div>

            {/* Video Verification */}
            <div className="bg-[#2a3441] border border-[#0ea5e9]/20 rounded-lg p-6 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0ea5e9]/30 transition-all">
                  <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Video Verification</h3>
                <p className="text-gray-400 text-sm mb-4">Identify deepfake videos & facial manipulations</p>
                <div className="text-center">
                  <div className="text-[#0ea5e9] text-xs mb-1">Accuracy</div>
                  <div className="text-white text-lg font-bold">96.8%</div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-gray-400">
                  <div>✓ Facial Inconsistencies</div>
                  <div>✓ Temporal Analysis</div>
                  <div>✓ Lip Sync Verification</div>
                </div>
              </div>
            </div>

            {/* Audio Detection */}
            <div className="bg-[#2a3441] border border-[#0ea5e9]/20 rounded-lg p-6 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0ea5e9]/30 transition-all">
                  <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Audio Detection</h3>
                <p className="text-gray-400 text-sm mb-4">Uncover voice cloning & synthetic speech</p>
                <div className="text-center">
                  <div className="text-[#0ea5e9] text-xs mb-1">Accuracy</div>
                  <div className="text-white text-lg font-bold">95.3%</div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-gray-400">
                  <div>✓ Voice Cloning Detection</div>
                  <div>✓ Natural Patterns Analysis</div>
                  <div>✓ Neural Voice Filter</div>
                </div>
              </div>
            </div>

            {/* Live Webcam */}
            <div className="bg-[#2a3441] border border-[#0ea5e9]/20 rounded-lg p-6 hover:border-[#0ea5e9]/40 transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0ea5e9]/30 transition-all">
                  <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Live Webcam</h3>
                <p className="text-gray-400 text-sm mb-4">Real-time deepfake analysis & verification</p>
                <div className="text-center">
                  <div className="text-[#0ea5e9] text-xs mb-1">Accuracy</div>
                  <div className="text-white text-lg font-bold">92.7%</div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-gray-400">
                  <div>✓ Live Deepfake Alert</div>
                  <div>✓ Facial Authentication</div>
                  <div>✓ Low-Light Analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time News Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#0ea5e9]/20 rounded-lg">
              <Globe className="w-6 h-6 text-[#0ea5e9]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Real-Time Threat Intelligence</h1>
              <p className="text-gray-400 text-sm">Live cyber security and AI threat news from authentic sources</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
              <Zap className="w-4 h-4 text-[#0ea5e9]" />
              <span>Live Updates • newsdata.io</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search threat intelligence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-[#2a3441]/60 border-[#0ea5e9]/20 text-white placeholder-gray-400 focus:border-[#0ea5e9]/40"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] border border-[#0ea5e9]/30"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Trending Topics */}
          {trendingTopics?.topics && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#0ea5e9]" />
                <span className="text-sm font-medium text-white">Trending Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.topics.map((topic: string, index: number) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30 hover:bg-[#0ea5e9]/20 cursor-pointer text-xs"
                    onClick={() => {
                      setSearchQuery(topic);
                      handleSearch();
                    }}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* News Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'cyber' | 'ai')}>
          <TabsList className="grid w-full grid-cols-2 bg-[#2a3441]/60 border border-[#0ea5e9]/20">
            <TabsTrigger 
              value="cyber" 
              className="data-[state=active]:bg-[#0ea5e9]/20 data-[state=active]:text-[#0ea5e9] text-gray-400"
            >
              <Shield className="w-4 h-4 mr-2" />
              Cyber Security ({cyberNews?.totalResults || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-[#0ea5e9]/20 data-[state=active]:text-[#0ea5e9] text-gray-400"
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Threats ({aiNews?.totalResults || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cyber" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-[#1e2a3a]/60 border-[#00bfff]/20 animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-600/50 rounded mb-2"></div>
                      <div className="h-3 bg-gray-600/30 rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-3 bg-gray-600/30 rounded mb-2"></div>
                      <div className="h-3 bg-gray-600/30 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-[#1e2a3a]/60 border-[#00bfff]/20 animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-600/50 rounded mb-2"></div>
                      <div className="h-3 bg-gray-600/30 rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-3 bg-gray-600/30 rounded mb-2"></div>
                      <div className="h-3 bg-gray-600/30 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Status Bar */}
        <div className="mt-8 p-4 bg-[#2a3441]/40 border border-[#0ea5e9]/20 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-400">
              <span>Data Source: NewsData.io API</span>
              <span>•</span>
              <span>Auto-refresh: 30s</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></div>
              <span className="text-[#0ea5e9] text-xs">Live Feed Active</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}