interface RealNewsItem {
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

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: Array<{
    article_id: string;
    title: string;
    link: string;
    keywords?: string[];
    creator?: string[];
    video_url?: string;
    description: string;
    content: string;
    pubDate: string;
    image_url?: string;
    source_id: string;
    source_priority: number;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    ai_tag: string;
    sentiment: string;
    sentiment_stats: string;
    ai_region: string;
  }>;
  nextPage?: string;
}

class RealNewsService {
  private apiKey = 'pub_0066b030cd044bf0a5d52cecca8a37e6';
  private baseUrl = 'https://newsdata.io/api/1/news';

  private generateNewsId(): string {
    return `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private classifySeverity(title: string, content: string): 'low' | 'medium' | 'high' | 'critical' {
    const text = (title + ' ' + content).toLowerCase();
    
    if (text.includes('zero-day') || text.includes('critical vulnerability') || text.includes('major breach') || text.includes('ransomware attack')) {
      return 'critical';
    } else if (text.includes('vulnerability') || text.includes('malware') || text.includes('cyber attack') || text.includes('data breach')) {
      return 'high';
    } else if (text.includes('security update') || text.includes('patch') || text.includes('phishing') || text.includes('ai threat')) {
      return 'medium';
    }
    return 'low';
  }

  private determineCategory(article: any): 'cyber' | 'ai' | 'tech' {
    const text = (article.title + ' ' + article.description + ' ' + (article.keywords?.join(' ') || '')).toLowerCase();
    
    if (text.includes('artificial intelligence') || text.includes('machine learning') || text.includes('deepfake') || text.includes('ai ') || text.includes('neural network')) {
      return 'ai';
    } else if (text.includes('cyber') || text.includes('security') || text.includes('hack') || text.includes('breach') || text.includes('malware') || text.includes('vulnerability')) {
      return 'cyber';
    }
    return 'tech';
  }

  async fetchLatestCyberNews(): Promise<RealNewsItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}?apikey=${this.apiKey}&q=cybersecurity&language=en`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('News API Error:', response.status, errorText);
        throw new Error(`News API responded with status ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();
      
      if (!data.results || !Array.isArray(data.results)) {
        console.warn('No results from news API');
        return [];
      }

      return data.results
        .filter(article => article.title && article.description)
        .map(article => ({
          id: article.article_id || this.generateNewsId(),
          title: article.title,
          source: article.source_id || 'Unknown',
          category: this.determineCategory(article),
          publishedAt: article.pubDate || new Date().toISOString(),
          url: article.link || '#',
          severity: this.classifySeverity(article.title, article.description),
          summary: article.description || 'No summary available',
          content: article.content || article.description || 'Full content not available',
          imageUrl: article.image_url
        }))
        .slice(0, 12);

    } catch (error) {
      console.error('Error fetching real cyber news:', error);
      throw error;
    }
  }

  async fetchLatestAINews(): Promise<RealNewsItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}?apikey=${this.apiKey}&q=artificial intelligence&language=en`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI News API Error:', response.status, errorText);
        throw new Error(`News API responded with status ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();
      
      if (!data.results || !Array.isArray(data.results)) {
        console.warn('No AI news results from API');
        return [];
      }

      return data.results
        .filter(article => article.title && article.description)
        .map(article => ({
          id: article.article_id || this.generateNewsId(),
          title: article.title,
          source: article.source_id || 'Unknown',
          category: this.determineCategory(article),
          publishedAt: article.pubDate || new Date().toISOString(),
          url: article.link || '#',
          severity: this.classifySeverity(article.title, article.description),
          summary: article.description || 'No summary available',
          content: article.content || article.description || 'Full content not available',
          imageUrl: article.image_url
        }))
        .slice(0, 12);

    } catch (error) {
      console.error('Error fetching real AI news:', error);
      throw error;
    }
  }

  async searchNews(searchQuery: string, category?: 'cyber' | 'ai'): Promise<RealNewsItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}?apikey=${this.apiKey}&q=${encodeURIComponent(searchQuery)}&language=en`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Search News API Error:', response.status, errorText);
        throw new Error(`News API responded with status ${response.status}: ${errorText}`);
      }

      const data: NewsDataResponse = await response.json();
      
      if (!data.results || !Array.isArray(data.results)) {
        return [];
      }

      return data.results
        .filter(article => article.title && article.description)
        .map(article => ({
          id: article.article_id || this.generateNewsId(),
          title: article.title,
          source: article.source_id || 'Unknown',
          category: this.determineCategory(article),
          publishedAt: article.pubDate || new Date().toISOString(),
          url: article.link || '#',
          severity: this.classifySeverity(article.title, article.description),
          summary: article.description || 'No summary available',
          content: article.content || article.description || 'Full content not available',
          imageUrl: article.image_url
        }))
        .slice(0, 15);

    } catch (error) {
      console.error('Error searching real news:', error);
      throw error;
    }
  }

  async getTrendingTopics(category?: 'cyber' | 'ai'): Promise<string[]> {
    try {
      const news = category === 'ai' 
        ? await this.fetchLatestAINews() 
        : await this.fetchLatestCyberNews();
      
      const topics = new Set<string>();
      
      news.forEach(article => {
        const text = article.title.toLowerCase();
        
        // Extract trending topics based on frequency
        if (text.includes('ransomware')) topics.add('Ransomware Attacks');
        if (text.includes('deepfake')) topics.add('Deepfake Detection');
        if (text.includes('zero-day')) topics.add('Zero-Day Exploits');
        if (text.includes('ai security')) topics.add('AI Security');
        if (text.includes('data breach')) topics.add('Data Breaches');
        if (text.includes('phishing')) topics.add('Phishing Campaigns');
        if (text.includes('malware')) topics.add('Malware Analysis');
        if (text.includes('vulnerability')) topics.add('Security Vulnerabilities');
      });

      return Array.from(topics).slice(0, 8);
    } catch (error) {
      console.error('Error getting trending topics:', error);
      return ['Cybersecurity', 'AI Threats', 'Data Protection', 'Threat Intelligence'];
    }
  }
}

export const realNewsService = new RealNewsService();
export type { RealNewsItem };