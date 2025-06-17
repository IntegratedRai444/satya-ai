import axios from 'axios';

interface MISPEvent {
  id: string;
  info: string;
  threat_level_id: string;
  analysis: string;
  date: string;
  published: boolean;
  orgc_id: string;
  org_id: string;
  attribute_count: string;
  distribution: string;
  sharing_group_id: string;
  event_creator_email: string;
  attributes?: MISPAttribute[];
  tags?: MISPTag[];
}

interface MISPAttribute {
  id: string;
  event_id: string;
  object_id: string;
  object_relation: string;
  category: string;
  type: string;
  value: string;
  to_ids: boolean;
  uuid: string;
  timestamp: string;
  distribution: string;
  sharing_group_id: string;
  comment: string;
  deleted: boolean;
  disable_correlation: boolean;
  first_seen: string;
  last_seen: string;
}

interface MISPTag {
  id: string;
  name: string;
  colour: string;
  exportable: boolean;
  org_id: string;
  user_id: string;
  hide_tag: boolean;
  numerical_value: string;
}

interface OpenCTIIndicator {
  id: string;
  standard_id: string;
  entity_type: string;
  created_at: string;
  updated_at: string;
  created: string;
  modified: string;
  revoked: boolean;
  confidence: number;
  lang: string;
  spec_version: string;
  object_marking_refs: string[];
  pattern: string;
  pattern_type: string;
  valid_from: string;
  valid_until?: string;
  kill_chain_phases: any[];
  labels: string[];
  objectLabel: any[];
  objectMarking: any[];
  externalReferences: any[];
  x_opencti_score?: number;
  x_opencti_detection?: boolean;
  x_opencti_main_observable_type?: string;
}

interface ThreatIntelligenceQuery {
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'cve';
  value: string;
  source?: 'misp' | 'opencti' | 'both';
}

interface ThreatIntelligenceResult {
  query: ThreatIntelligenceQuery;
  sources: {
    misp?: {
      events: MISPEvent[];
      total_count: number;
      threat_level: 'low' | 'medium' | 'high' | 'critical';
    };
    opencti?: {
      indicators: OpenCTIIndicator[];
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

class ThreatIntelligenceService {
  private mispUrl: string;
  private mispApiKey: string;
  private openctiUrl: string;
  private openctiApiKey: string;

  constructor() {
    this.mispUrl = process.env.MISP_URL || '';
    this.mispApiKey = process.env.MISP_API_KEY || '';
    this.openctiUrl = process.env.OPENCTI_URL || '';
    this.openctiApiKey = process.env.OPENCTI_API_KEY || '';
  }

  async queryThreatIntelligence(query: ThreatIntelligenceQuery): Promise<ThreatIntelligenceResult> {
    const result: ThreatIntelligenceResult = {
      query,
      sources: {},
      analysis: {
        overall_threat_level: 'low',
        confidence: 0,
        indicators_found: 0,
        threat_types: [],
        recommendations: []
      },
      timestamp: new Date()
    };

    try {
      // Query MISP if available and requested
      if ((query.source === 'misp' || query.source === 'both' || !query.source) && this.mispUrl && this.mispApiKey) {
        result.sources.misp = await this.queryMISP(query);
      }

      // Query OpenCTI if available and requested
      if ((query.source === 'opencti' || query.source === 'both' || !query.source) && this.openctiUrl && this.openctiApiKey) {
        result.sources.opencti = await this.queryOpenCTI(query);
      }

      // Analyze and correlate results
      result.analysis = this.analyzeResults(result.sources);

    } catch (error) {
      console.error('Threat intelligence query failed:', error);
      throw new Error(`Threat intelligence query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  private async queryMISP(query: ThreatIntelligenceQuery): Promise<any> {
    try {
      const headers = {
        'Authorization': this.mispApiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      // Search for events containing the indicator
      const searchBody = {
        returnFormat: 'json',
        limit: 100,
        page: 1,
        value: query.value,
        type: this.mapQueryTypeToMISP(query.type),
        enforceWarninglist: false,
        deleted: false,
        includeEventUuid: true,
        includeEventTags: true
      };

      const response = await axios.post(
        `${this.mispUrl}/events/restSearch`,
        searchBody,
        { headers, timeout: 30000 }
      );

      const events = response.data.response || [];
      const threatLevel = this.calculateMISPThreatLevel(events);

      return {
        events: events.slice(0, 50), // Limit to 50 most relevant events
        total_count: events.length,
        threat_level: threatLevel
      };

    } catch (error) {
      console.error('MISP query failed:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('MISP authentication failed - check API key');
        } else if (error.response?.status === 403) {
          throw new Error('MISP access forbidden - insufficient permissions');
        } else if (error.code === 'ECONNREFUSED') {
          throw new Error('MISP server unreachable - check URL and network');
        }
      }
      throw new Error(`MISP query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async queryOpenCTI(query: ThreatIntelligenceQuery): Promise<any> {
    try {
      const headers = {
        'Authorization': `Bearer ${this.openctiApiKey}`,
        'Content-Type': 'application/json'
      };

      // GraphQL query for OpenCTI
      const graphqlQuery = `
        query GetIndicators($search: String, $first: Int) {
          indicators(
            search: $search
            first: $first
            orderBy: created_at
            orderMode: desc
          ) {
            edges {
              node {
                id
                standard_id
                entity_type
                created_at
                updated_at
                confidence
                pattern
                pattern_type
                valid_from
                valid_until
                labels
                x_opencti_score
                x_opencti_detection
                x_opencti_main_observable_type
                objectMarking {
                  edges {
                    node {
                      definition
                    }
                  }
                }
                objectLabel {
                  edges {
                    node {
                      value
                      color
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        search: query.value,
        first: 100
      };

      const response = await axios.post(
        `${this.openctiUrl}/graphql`,
        {
          query: graphqlQuery,
          variables
        },
        { headers, timeout: 30000 }
      );

      const indicators = response.data.data?.indicators?.edges?.map((edge: any) => edge.node) || [];
      const confidenceScore = this.calculateOpenCTIConfidence(indicators);

      return {
        indicators: indicators.slice(0, 50), // Limit to 50 most relevant indicators
        total_count: indicators.length,
        confidence_score: confidenceScore
      };

    } catch (error) {
      console.error('OpenCTI query failed:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('OpenCTI authentication failed - check API key');
        } else if (error.response?.status === 403) {
          throw new Error('OpenCTI access forbidden - insufficient permissions');
        } else if (error.code === 'ECONNREFUSED') {
          throw new Error('OpenCTI server unreachable - check URL and network');
        }
      }
      throw new Error(`OpenCTI query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private mapQueryTypeToMISP(type: string): string {
    const typeMap: { [key: string]: string } = {
      'ip': 'ip-dst',
      'domain': 'domain',
      'hash': 'md5|sha1|sha256',
      'url': 'url',
      'email': 'email-src',
      'cve': 'vulnerability'
    };
    return typeMap[type] || type;
  }

  private calculateMISPThreatLevel(events: MISPEvent[]): 'low' | 'medium' | 'high' | 'critical' {
    if (!events.length) return 'low';

    const threatLevels = events.map(event => parseInt(event.threat_level_id));
    const avgThreatLevel = threatLevels.reduce((sum, level) => sum + level, 0) / threatLevels.length;

    if (avgThreatLevel >= 1 && avgThreatLevel < 2) return 'critical';
    if (avgThreatLevel >= 2 && avgThreatLevel < 3) return 'high';
    if (avgThreatLevel >= 3 && avgThreatLevel < 4) return 'medium';
    return 'low';
  }

  private calculateOpenCTIConfidence(indicators: OpenCTIIndicator[]): number {
    if (!indicators.length) return 0;

    const confidenceScores = indicators
      .map(indicator => indicator.confidence || 0)
      .filter(score => score > 0);

    if (!confidenceScores.length) return 0;

    return confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length;
  }

  private analyzeResults(sources: ThreatIntelligenceResult['sources']): ThreatIntelligenceResult['analysis'] {
    let overallThreatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let confidence = 0;
    let indicatorsFound = 0;
    const threatTypes: string[] = [];
    const recommendations: string[] = [];
    let lastSeen: string | undefined;

    // Analyze MISP results
    if (sources.misp) {
      indicatorsFound += sources.misp.total_count;
      
      if (sources.misp.threat_level === 'critical') overallThreatLevel = 'critical';
      else if (sources.misp.threat_level === 'high' && overallThreatLevel !== 'critical') overallThreatLevel = 'high';
      else if (sources.misp.threat_level === 'medium' && !['critical', 'high'].includes(overallThreatLevel)) overallThreatLevel = 'medium';

      // Extract threat types from MISP events
      sources.misp.events.forEach(event => {
        if (event.attributes) {
          event.attributes.forEach(attr => {
            if (attr.category && !threatTypes.includes(attr.category)) {
              threatTypes.push(attr.category);
            }
          });
        }
        if (event.tags) {
          event.tags.forEach(tag => {
            if (!threatTypes.includes(tag.name)) {
              threatTypes.push(tag.name);
            }
          });
        }
      });

      confidence += 40; // MISP contributes 40% to confidence
    }

    // Analyze OpenCTI results
    if (sources.opencti) {
      indicatorsFound += sources.opencti.total_count;
      
      const openctiConfidence = sources.opencti.confidence_score;
      if (openctiConfidence >= 80) {
        if (overallThreatLevel === 'low') overallThreatLevel = 'high';
        else if (overallThreatLevel === 'medium') overallThreatLevel = 'high';
      } else if (openctiConfidence >= 60) {
        if (overallThreatLevel === 'low') overallThreatLevel = 'medium';
      }

      // Extract threat types from OpenCTI indicators
      sources.opencti.indicators.forEach(indicator => {
        if (indicator.labels) {
          indicator.labels.forEach(label => {
            if (!threatTypes.includes(label)) {
              threatTypes.push(label);
            }
          });
        }
        if (indicator.pattern_type && !threatTypes.includes(indicator.pattern_type)) {
          threatTypes.push(indicator.pattern_type);
        }
      });

      confidence += sources.opencti.confidence_score * 0.6; // OpenCTI contributes up to 60% to confidence
    }

    // Generate recommendations based on findings
    if (indicatorsFound > 0) {
      recommendations.push('Block or monitor this indicator in security controls');
      
      if (overallThreatLevel === 'critical' || overallThreatLevel === 'high') {
        recommendations.push('Immediate investigation required');
        recommendations.push('Check for compromise indicators in your environment');
        recommendations.push('Review related network traffic and logs');
      }
      
      if (threatTypes.includes('malware') || threatTypes.includes('trojan')) {
        recommendations.push('Scan systems for malware presence');
        recommendations.push('Update antivirus signatures');
      }
      
      if (threatTypes.includes('phishing') || threatTypes.includes('social-engineering')) {
        recommendations.push('Alert users about potential phishing campaigns');
        recommendations.push('Review email security controls');
      }
    } else {
      recommendations.push('No known threats associated with this indicator');
      recommendations.push('Continue monitoring for future intelligence');
    }

    return {
      overall_threat_level: overallThreatLevel,
      confidence: Math.min(confidence, 100),
      indicators_found: indicatorsFound,
      last_seen: lastSeen,
      threat_types: [...new Set(threatTypes)], // Remove duplicates
      recommendations
    };
  }

  async getRecentThreats(hours: number = 24): Promise<any> {
    const sinceDate = new Date(Date.now() - hours * 60 * 60 * 1000);
    const results: any = { misp: [], opencti: [], analysis: {} };

    try {
      // Get recent MISP events
      if (this.mispUrl && this.mispApiKey) {
        results.misp = await this.getRecentMISPEvents(sinceDate);
      }

      // Get recent OpenCTI indicators
      if (this.openctiUrl && this.openctiApiKey) {
        results.opencti = await this.getRecentOpenCTIIndicators(sinceDate);
      }

      // Analyze trends
      results.analysis = this.analyzeTrends(results.misp, results.opencti);

    } catch (error) {
      console.error('Failed to get recent threats:', error);
    }

    return results;
  }

  private async getRecentMISPEvents(since: Date): Promise<MISPEvent[]> {
    try {
      const headers = {
        'Authorization': this.mispApiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const searchBody = {
        returnFormat: 'json',
        limit: 100,
        page: 1,
        from: since.toISOString().split('T')[0],
        includeEventTags: true,
        enforceWarninglist: false
      };

      const response = await axios.post(
        `${this.mispUrl}/events/restSearch`,
        searchBody,
        { headers, timeout: 30000 }
      );

      return response.data.response || [];
    } catch (error) {
      console.error('Failed to get recent MISP events:', error);
      return [];
    }
  }

  private async getRecentOpenCTIIndicators(since: Date): Promise<OpenCTIIndicator[]> {
    try {
      const headers = {
        'Authorization': `Bearer ${this.openctiApiKey}`,
        'Content-Type': 'application/json'
      };

      const graphqlQuery = `
        query GetRecentIndicators($fromDate: DateTime, $first: Int) {
          indicators(
            filters: [{ key: "created_at", values: [$fromDate], operator: gt }]
            first: $first
            orderBy: created_at
            orderMode: desc
          ) {
            edges {
              node {
                id
                standard_id
                entity_type
                created_at
                confidence
                pattern
                pattern_type
                labels
                x_opencti_score
              }
            }
          }
        }
      `;

      const variables = {
        fromDate: since.toISOString(),
        first: 100
      };

      const response = await axios.post(
        `${this.openctiUrl}/graphql`,
        { query: graphqlQuery, variables },
        { headers, timeout: 30000 }
      );

      return response.data.data?.indicators?.edges?.map((edge: any) => edge.node) || [];
    } catch (error) {
      console.error('Failed to get recent OpenCTI indicators:', error);
      return [];
    }
  }

  private analyzeTrends(mispEvents: MISPEvent[], openctiIndicators: OpenCTIIndicator[]): any {
    const trends = {
      total_events: mispEvents.length + openctiIndicators.length,
      threat_categories: {} as { [key: string]: number },
      avg_confidence: 0,
      high_confidence_count: 0,
      trending_malware: [] as string[],
      geographic_distribution: {} as { [key: string]: number }
    };

    // Analyze MISP events
    mispEvents.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => {
          trends.threat_categories[tag.name] = (trends.threat_categories[tag.name] || 0) + 1;
        });
      }
    });

    // Analyze OpenCTI indicators
    let totalConfidence = 0;
    let confidenceCount = 0;

    openctiIndicators.forEach(indicator => {
      if (indicator.labels) {
        indicator.labels.forEach(label => {
          trends.threat_categories[label] = (trends.threat_categories[label] || 0) + 1;
        });
      }

      if (indicator.confidence) {
        totalConfidence += indicator.confidence;
        confidenceCount++;
        if (indicator.confidence >= 80) {
          trends.high_confidence_count++;
        }
      }
    });

    trends.avg_confidence = confidenceCount > 0 ? totalConfidence / confidenceCount : 0;

    return trends;
  }

  async testConnections(): Promise<{ misp: boolean; opencti: boolean; errors: string[] }> {
    const result = { misp: false, opencti: false, errors: [] as string[] };

    // Test MISP connection
    if (this.mispUrl && this.mispApiKey) {
      try {
        const headers = {
          'Authorization': this.mispApiKey,
          'Accept': 'application/json'
        };

        await axios.get(`${this.mispUrl}/servers/getPyMISPVersion.json`, {
          headers,
          timeout: 10000
        });

        result.misp = true;
      } catch (error) {
        result.errors.push(`MISP connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      result.errors.push('MISP credentials not configured');
    }

    // Test OpenCTI connection
    if (this.openctiUrl && this.openctiApiKey) {
      try {
        const headers = {
          'Authorization': `Bearer ${this.openctiApiKey}`,
          'Content-Type': 'application/json'
        };

        const query = `query { me { id name } }`;

        await axios.post(
          `${this.openctiUrl}/graphql`,
          { query },
          { headers, timeout: 10000 }
        );

        result.opencti = true;
      } catch (error) {
        result.errors.push(`OpenCTI connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      result.errors.push('OpenCTI credentials not configured');
    }

    return result;
  }
}

export const threatIntelligenceService = new ThreatIntelligenceService();
export type { ThreatIntelligenceQuery, ThreatIntelligenceResult, MISPEvent, OpenCTIIndicator };