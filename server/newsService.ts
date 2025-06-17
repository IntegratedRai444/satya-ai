interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: 'cyber' | 'ai';
  publishedAt: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  content: string;
}

interface NewsResponse {
  articles: NewsItem[];
  totalResults: number;
  status: string;
}

class NewsService {
  private apiKey = 'pub_0066b030cd044bf0a5d52cecca8a37e6';
  private baseUrl = 'https://newsdata.io/api/1/news';

  private generateNewsId(): string {
    return `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private categorizeNews(text: string): 'cyber' | 'ai' {
    const lowerText = text.toLowerCase();
    
    const cyberKeywords = [
      'cybersecurity', 'cyber attack', 'data breach', 'hacking', 'malware', 
      'ransomware', 'phishing', 'vulnerability', 'security', 'breach',
      'firewall', 'encryption', 'authentication', 'threat', 'exploit'
    ];
    
    const aiKeywords = [
      'artificial intelligence', 'machine learning', 'neural network', 
      'deep learning', 'chatgpt', 'openai', 'llm', 'generative ai',
      'algorithm', 'automation', 'robot', 'ai model', 'training data'
    ];
    
    const cyberScore = cyberKeywords.reduce((score, keyword) => 
      score + (lowerText.includes(keyword) ? 1 : 0), 0);
    const aiScore = aiKeywords.reduce((score, keyword) => 
      score + (lowerText.includes(keyword) ? 1 : 0), 0);
    
    return cyberScore >= aiScore ? 'cyber' : 'ai';
  }

  private classifySeverity(title: string, content: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalKeywords = ['zero-day', 'critical vulnerability', 'data breach', 'ransomware', 'nation-state'];
    const highKeywords = ['vulnerability', 'exploit', 'malware', 'phishing', 'attack'];
    const mediumKeywords = ['security update', 'patch', 'warning', 'advisory'];
    
    const text = (title + ' ' + content).toLowerCase();
    
    if (criticalKeywords.some(keyword => text.includes(keyword))) return 'critical';
    if (highKeywords.some(keyword => text.includes(keyword))) return 'high';
    if (mediumKeywords.some(keyword => text.includes(keyword))) return 'medium';
    return 'low';
  }

  private generateRealisticNews(): NewsItem[] {
    const cyberNews = [
      {
        title: 'New APT Group Targets Healthcare Infrastructure with Advanced Malware',
        content: 'Security researchers have identified a sophisticated threat actor using novel techniques to infiltrate hospital networks, deploying custom malware designed to evade detection while maintaining persistent access to critical medical systems.',
        source: 'The Hacker News',
        category: 'cyber' as const
      },
      {
        title: 'Critical Zero-Day Vulnerability Discovered in Popular Enterprise Software',
        content: 'A remote code execution vulnerability with CVSS score 9.8 has been found in widely-deployed enterprise applications, affecting millions of installations worldwide. Immediate patching is recommended.',
        source: 'Dark Reading',
        category: 'cyber' as const
      },
      {
        title: 'Ransomware Group Disrupted in International Law Enforcement Operation',
        content: 'Coordinated efforts by multiple agencies have successfully dismantled infrastructure used by the notorious ransomware group responsible for attacking critical infrastructure across several countries.',
        source: 'CyberScoop',
        category: 'cyber' as const
      },
      {
        title: 'Supply Chain Attack Compromises Open Source Package Repository',
        content: 'Malicious actors have infiltrated a popular package repository, injecting backdoors into legitimate software libraries used by thousands of development projects worldwide.',
        source: 'BleepingComputer',
        category: 'cyber' as const
      },
      {
        title: 'Advanced Phishing Campaign Uses AI-Generated Content to Bypass Filters',
        content: 'Cybercriminals are leveraging artificial intelligence to create highly convincing phishing emails that successfully evade traditional security measures and fool even security-aware users.',
        source: 'SecurityWeek',
        category: 'cyber' as const
      }
    ];

    const aiNews = [
      {
        title: 'Breakthrough AI Model Achieves 99.9% Accuracy in Malware Detection',
        content: 'Researchers have developed a new neural network architecture that demonstrates unprecedented performance in identifying malicious software, including previously unknown variants and zero-day threats.',
        source: 'MIT Technology Review',
        category: 'ai' as const
      },
      {
        title: 'Large Language Model Security Framework Released for Enterprise Deployment',
        content: 'New comprehensive guidelines provide organizations with best practices for securely implementing large language models while mitigating risks associated with prompt injection and data leakage.',
        source: 'AI Ethics Institute',
        category: 'ai' as const
      },
      {
        title: 'AI-Powered Deepfake Detection System Deployed Across Social Platforms',
        content: 'Major social media companies have implemented advanced machine learning algorithms capable of identifying synthetic media content with 98% accuracy, helping combat misinformation campaigns.',
        source: 'VentureBeat AI',
        category: 'ai' as const
      },
      {
        title: 'Quantum-Enhanced Machine Learning Accelerates Cryptographic Analysis',
        content: 'New hybrid quantum-classical algorithms demonstrate significant improvements in analyzing encrypted communications, potentially impacting current cryptographic security standards.',
        source: 'NVIDIA AI News',
        category: 'ai' as const
      },
      {
        title: 'Federated Learning Protocol Enhances Privacy in Distributed AI Training',
        content: 'Novel approach allows multiple organizations to collaboratively train machine learning models without sharing sensitive data, addressing privacy concerns in AI development.',
        source: 'Google AI Blog',
        category: 'ai' as const
      }
    ];

    const allNews = [...cyberNews, ...aiNews];
    
    return allNews.map(item => ({
      id: this.generateNewsId(),
      title: item.title,
      source: item.source,
      category: item.category,
      publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      url: `https://${item.source.toLowerCase().replace(/\s+/g, '')}.com/article/${this.generateNewsId()}`,
      severity: this.classifySeverity(item.title, item.content),
      summary: item.content.substring(0, 200) + '...',
      content: item.content
    }));
  }

  async getLatestNews(category?: 'cyber' | 'ai', limit: number = 20): Promise<NewsResponse> {
    try {
      console.log(`Fetching ${category || 'all'} news from newsdata.io...`);
      
      let query = '';
      if (category === 'cyber') {
        query = 'cybersecurity OR cyber attack OR data breach OR hacking OR malware OR ransomware OR phishing OR security vulnerability';
      } else if (category === 'ai') {
        query = 'artificial intelligence OR machine learning OR AI OR neural network OR deep learning OR ChatGPT OR OpenAI OR LLM OR generative AI';
      } else {
        query = 'cybersecurity OR artificial intelligence OR AI OR cyber attack OR machine learning';
      }

      const url = `${this.baseUrl}?apikey=${this.apiKey}&q=${encodeURIComponent(query)}&language=en&size=${limit}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`News API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(`News API error: ${data.status}`);
      }

      const articles: NewsItem[] = data.results.map((article: any) => ({
        id: this.generateNewsId(),
        title: article.title,
        source: article.source_id || 'Unknown Source',
        category: this.categorizeNews(article.title + ' ' + (article.description || '')) as 'cyber' | 'ai',
        publishedAt: article.pubDate || new Date().toISOString(),
        url: article.link || '#',
        severity: this.classifySeverity(article.title, article.description || ''),
        summary: (article.description || '').substring(0, 200) + '...',
        content: article.description || article.title
      }));

      // Filter by category if specified and not already filtered by query
      const filteredArticles = category ? 
        articles.filter(article => article.category === category) : 
        articles;

      console.log(`Successfully fetched ${filteredArticles.length} articles for category: ${category || 'all'}`);

      return {
        articles: filteredArticles,
        totalResults: filteredArticles.length,
        status: 'ok'
      };
    } catch (error) {
      console.error('Error fetching news from newsdata.io:', error);
      // Fallback to prevent complete failure
      return {
        articles: [],
        totalResults: 0,
        status: 'error'
      };
    }
  }

  async searchNews(query: string, category?: 'cyber' | 'ai'): Promise<NewsResponse> {
    try {
      console.log(`Searching for "${query}" in ${category || 'all'} news...`);
      
      let searchQuery = query;
      if (category === 'cyber') {
        searchQuery += ' AND (cybersecurity OR cyber OR security OR breach OR hacking)';
      } else if (category === 'ai') {
        searchQuery += ' AND (AI OR artificial intelligence OR machine learning OR neural)';
      }

      const url = `${this.baseUrl}?apikey=${this.apiKey}&q=${encodeURIComponent(searchQuery)}&language=en&size=20`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`News API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(`News API error: ${data.status}`);
      }

      const articles: NewsItem[] = data.results.map((article: any) => ({
        id: this.generateNewsId(),
        title: article.title,
        source: article.source_id || 'Unknown Source',
        category: this.categorizeNews(article.title + ' ' + (article.description || '')) as 'cyber' | 'ai',
        publishedAt: article.pubDate || new Date().toISOString(),
        url: article.link || '#',
        severity: this.classifySeverity(article.title, article.description || ''),
        summary: (article.description || '').substring(0, 200) + '...',
        content: article.description || article.title
      }));

      // Filter by category if specified
      const filteredArticles = category ? 
        articles.filter(article => article.category === category) : 
        articles;

      console.log(`Found ${filteredArticles.length} articles matching "${query}"`);

      return {
        articles: filteredArticles,
        totalResults: filteredArticles.length,
        status: 'ok'
      };
    } catch (error) {
      console.error('Error searching news:', error);
      return {
        articles: [],
        totalResults: 0,
        status: 'error'
      };
    }
  }

  async getTrendingTopics(category?: 'cyber' | 'ai'): Promise<string[]> {
    try {
      const response = await this.getLatestNews(category, 15);
      const articles = response.articles;
      
      const topics: string[] = [];
      articles.forEach(article => {
        const title = article.title.toLowerCase();
        
        if (category === 'cyber' || !category) {
          if (title.includes('breach') || title.includes('hack')) topics.push('Data Breaches');
          if (title.includes('ransomware')) topics.push('Ransomware Attacks');
          if (title.includes('phishing')) topics.push('Phishing Campaigns');
          if (title.includes('vulnerability') || title.includes('exploit')) topics.push('Security Vulnerabilities');
          if (title.includes('malware')) topics.push('Malware Threats');
          if (title.includes('zero-day')) topics.push('Zero-Day Exploits');
        }
        
        if (category === 'ai' || !category) {
          if (title.includes('chatgpt') || title.includes('gpt') || title.includes('openai')) topics.push('ChatGPT & OpenAI');
          if (title.includes('machine learning') || title.includes('ml')) topics.push('Machine Learning');
          if (title.includes('neural') || title.includes('deep learning')) topics.push('Neural Networks');
          if (title.includes('automation') || title.includes('robot')) topics.push('AI Automation');
          if (title.includes('deepfake') || title.includes('synthetic')) topics.push('Deepfake Technology');
          if (title.includes('ethics') || title.includes('bias')) topics.push('AI Ethics');
        }
      });
      
      const uniqueTopics = Array.from(new Set(topics));
      return uniqueTopics.length > 0 ? uniqueTopics.slice(0, 5) : 
        (category === 'cyber' ? ['Cybersecurity Threats'] : ['AI Developments']);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      return category === 'cyber' ? 
        ['Data Breaches', 'Ransomware', 'Phishing'] : 
        ['ChatGPT', 'Machine Learning', 'AI Ethics'];
    }
  }
}

export const newsService = new NewsService();
export type { NewsItem, NewsResponse };