import axios from 'axios';

export interface ThreatIntelligenceNews {
  title: string;
  description: string;
  content: string;
  pubDate: string;
  link: string;
  source_id: string;
  source_name: string;
  category: string[];
  country: string[];
  language: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  affected_sectors: string[];
  attack_vectors: string[];
  iocs: string[];
}

export interface ThreatIntelligenceResponse {
  status: string;
  totalResults: number;
  results: ThreatIntelligenceNews[];
  nextPage?: string;
}

export class ThreatIntelligenceService {
  private readonly apiKey = 'pub_0066b030cd044bf0a5d52cecca8a37e6';
  private readonly baseUrl = 'https://newsdata.io/api/1/news';

  async getCyberSecurityNews(params?: {
    country?: string;
    language?: string;
    category?: string;
    page?: string;
  }): Promise<ThreatIntelligenceResponse> {
    try {
      const searchTerms = [
        'cybersecurity',
        'cyber attack',
        'data breach',
        'ransomware',
        'malware',
        'phishing',
        'zero-day',
        'vulnerability',
        'security threat',
        'artificial intelligence security',
        'AI security',
        'machine learning security'
      ].join(' OR ');

      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          q: searchTerms,
          country: params?.country || 'us,gb,ca,au',
          language: params?.language || 'en',
          category: 'technology,business',
          size: 50,
          page: params?.page,
          ...params
        }
      });

      const processedResults = response.data.results?.map((article: any) => ({
        ...article,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        threat_level: this.assessThreatLevel(article.title + ' ' + article.description),
        affected_sectors: this.extractAffectedSectors(article.title + ' ' + article.description),
        attack_vectors: this.extractAttackVectors(article.title + ' ' + article.description),
        iocs: this.extractIOCs(article.title + ' ' + article.description)
      })) || [];

      return {
        status: response.data.status,
        totalResults: response.data.totalResults,
        results: processedResults,
        nextPage: response.data.nextPage
      };
    } catch (error) {
      console.error('Error fetching cyber security news:', error);
      throw new Error('Failed to fetch threat intelligence data');
    }
  }

  async getAISecurityNews(): Promise<ThreatIntelligenceResponse> {
    try {
      const aiSearchTerms = [
        'artificial intelligence security',
        'AI security vulnerability',
        'machine learning attack',
        'AI model poisoning',
        'deepfake detection',
        'AI bias security',
        'adversarial AI',
        'AI privacy breach',
        'neural network security',
        'automated security'
      ].join(' OR ');

      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          q: aiSearchTerms,
          country: 'us,gb,ca,au,in',
          language: 'en',
          category: 'technology,science',
          size: 30
        }
      });

      const processedResults = response.data.results?.map((article: any) => ({
        ...article,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        threat_level: this.assessThreatLevel(article.title + ' ' + article.description),
        affected_sectors: this.extractAffectedSectors(article.title + ' ' + article.description),
        attack_vectors: this.extractAttackVectors(article.title + ' ' + article.description),
        iocs: this.extractIOCs(article.title + ' ' + article.description)
      })) || [];

      return {
        status: response.data.status,
        totalResults: response.data.totalResults,
        results: processedResults
      };
    } catch (error) {
      console.error('Error fetching AI security news:', error);
      throw new Error('Failed to fetch AI security intelligence data');
    }
  }

  async getThreatsByCategory(category: 'malware' | 'phishing' | 'ransomware' | 'data-breach' | 'vulnerability'): Promise<ThreatIntelligenceResponse> {
    const categoryTerms = {
      malware: 'malware OR trojan OR virus OR spyware OR adware',
      phishing: 'phishing OR social engineering OR email scam OR credential theft',
      ransomware: 'ransomware OR crypto-locker OR file encryption attack',
      'data-breach': 'data breach OR data leak OR information disclosure OR privacy violation',
      vulnerability: 'vulnerability OR exploit OR zero-day OR CVE OR security flaw'
    };

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          q: categoryTerms[category],
          country: 'us,gb,ca,au',
          language: 'en',
          category: 'technology,business',
          size: 20
        }
      });

      const processedResults = response.data.results?.map((article: any) => ({
        ...article,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        threat_level: this.assessThreatLevel(article.title + ' ' + article.description),
        affected_sectors: this.extractAffectedSectors(article.title + ' ' + article.description),
        attack_vectors: this.extractAttackVectors(article.title + ' ' + article.description),
        iocs: this.extractIOCs(article.title + ' ' + article.description)
      })) || [];

      return {
        status: response.data.status,
        totalResults: response.data.totalResults,
        results: processedResults
      };
    } catch (error) {
      console.error(`Error fetching ${category} threats:`, error);
      throw new Error(`Failed to fetch ${category} threat intelligence`);
    }
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const negativeWords = [
      'attack', 'breach', 'hack', 'threat', 'vulnerability', 'exploit', 'malware', 
      'ransomware', 'phishing', 'scam', 'fraud', 'stolen', 'compromised', 'infected',
      'dangerous', 'critical', 'severe', 'devastating', 'alarming'
    ];
    
    const positiveWords = [
      'secure', 'protected', 'defend', 'prevention', 'solution', 'fixed', 'patched',
      'improved', 'enhanced', 'successful', 'achievement', 'innovation', 'breakthrough'
    ];

    const lowerText = text.toLowerCase();
    const negativeScore = negativeWords.filter(word => lowerText.includes(word)).length;
    const positiveScore = positiveWords.filter(word => lowerText.includes(word)).length;

    if (negativeScore > positiveScore) return 'negative';
    if (positiveScore > negativeScore) return 'positive';
    return 'neutral';
  }

  private assessThreatLevel(text: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalWords = ['critical', 'zero-day', 'widespread', 'massive', 'global', 'emergency'];
    const highWords = ['severe', 'major', 'significant', 'urgent', 'dangerous', 'compromised'];
    const mediumWords = ['moderate', 'notable', 'concerning', 'suspicious', 'potential'];

    const lowerText = text.toLowerCase();
    
    if (criticalWords.some(word => lowerText.includes(word))) return 'critical';
    if (highWords.some(word => lowerText.includes(word))) return 'high';
    if (mediumWords.some(word => lowerText.includes(word))) return 'medium';
    return 'low';
  }

  private extractAffectedSectors(text: string): string[] {
    const sectors = [
      'healthcare', 'finance', 'banking', 'government', 'education', 'retail',
      'manufacturing', 'energy', 'telecommunications', 'transportation',
      'technology', 'defense', 'media', 'hospitality', 'real estate'
    ];

    const lowerText = text.toLowerCase();
    return sectors.filter(sector => lowerText.includes(sector));
  }

  private extractAttackVectors(text: string): string[] {
    const vectors = [
      'email', 'phishing', 'malware', 'ransomware', 'social engineering',
      'sql injection', 'cross-site scripting', 'ddos', 'man-in-the-middle',
      'brute force', 'credential stuffing', 'supply chain', 'zero-day',
      'privilege escalation', 'lateral movement'
    ];

    const lowerText = text.toLowerCase();
    return vectors.filter(vector => lowerText.includes(vector.toLowerCase()));
  }

  private extractIOCs(text: string): string[] {
    const iocs: string[] = [];
    
    // Extract IP addresses
    const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
    const ips = text.match(ipRegex) || [];
    iocs.push(...ips);

    // Extract domains
    const domainRegex = /\b[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}\b/g;
    const domains = text.match(domainRegex) || [];
    iocs.push(...domains.filter(domain => domain.includes('.')));

    // Extract file hashes (MD5, SHA1, SHA256)
    const hashRegex = /\b[a-fA-F0-9]{32,64}\b/g;
    const hashes = text.match(hashRegex) || [];
    iocs.push(...hashes);

    return Array.from(new Set(iocs)); // Remove duplicates
  }

  async getThreatIntelligenceSummary(): Promise<{
    totalThreats: number;
    criticalThreats: number;
    recentAttacks: number;
    affectedCountries: string[];
    topThreatVectors: string[];
    emergingThreats: string[];
  }> {
    try {
      const [cyberNews, aiNews] = await Promise.all([
        this.getCyberSecurityNews(),
        this.getAISecurityNews()
      ]);

      const allResults = [...cyberNews.results, ...aiNews.results];
      
      return {
        totalThreats: allResults.length,
        criticalThreats: allResults.filter(r => r.threat_level === 'critical').length,
        recentAttacks: allResults.filter(r => {
          const pubDate = new Date(r.pubDate);
          const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return pubDate > oneDayAgo;
        }).length,
        affectedCountries: Array.from(new Set(allResults.flatMap(r => r.country))),
        topThreatVectors: this.getTopItems(allResults.flatMap(r => r.attack_vectors), 5),
        emergingThreats: this.getTopItems(allResults.filter(r => r.threat_level === 'high' || r.threat_level === 'critical').map(r => r.title), 5)
      };
    } catch (error) {
      console.error('Error generating threat intelligence summary:', error);
      throw new Error('Failed to generate threat intelligence summary');
    }
  }

  private getTopItems(items: string[], count: number): string[] {
    const frequency: { [key: string]: number } = {};
    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, count)
      .map(([item]) => item);
  }
}

export const threatIntelligenceService = new ThreatIntelligenceService();