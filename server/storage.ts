import { 
  threats, 
  networkNodes, 
  incidents, 
  securityMetrics,
  aiDetections,
  urlScans,
  vulnerabilityPredictions,
  darkWebMentions,
  breachAlerts,
  cameraFeeds,
  type Threat, 
  type NetworkNode, 
  type Incident, 
  type SecurityMetrics,
  type AiDetection,
  type UrlScan,
  type VulnerabilityPrediction,
  type DarkWebMention,
  type BreachAlert,
  type CameraFeed,
  type InsertThreat, 
  type InsertNetworkNode, 
  type InsertIncident, 
  type InsertSecurityMetrics,
  type InsertAiDetection,
  type InsertUrlScan,
  type InsertVulnerabilityPrediction,
  type InsertDarkWebMention,
  type InsertBreachAlert,
  type InsertCameraFeed
} from "@shared/schema";

// AI Employee interface
export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  capabilities: string[];
  personality: {
    tone: string;
    formality: number;
    creativity: number;
    empathy: number;
    assertiveness: number;
  };
  skills: {
    category: string;
    level: number;
    specializations: string[];
  }[];
  deployment: {
    status: 'active' | 'inactive' | 'training';
    environment: string;
    apiEndpoint?: string;
    metrics: {
      tasksCompleted: number;
      accuracy: number;
      responseTime: number;
      userSatisfaction: number;
    };
  };
  configuration: {
    modelType: string;
    temperature: number;
    maxTokens: number;
    context: string;
    instructions: string;
    safety: {
      contentFilter: boolean;
      biasDetection: boolean;
      ethicalGuidelines: boolean;
    };
  };
  schedule: {
    timezone: string;
    workingHours: { start: string; end: string; };
    availability: string[];
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface IStorage {
  // AI Employee operations
  getAIEmployees(userId?: string): Promise<AIEmployee[]>;
  getAIEmployeeById(id: string): Promise<AIEmployee | undefined>;
  createAIEmployee(employee: Omit<AIEmployee, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIEmployee>;
  updateAIEmployee(id: string, employee: Partial<AIEmployee>): Promise<AIEmployee | undefined>;
  deleteAIEmployee(id: string): Promise<boolean>;

  // Threats
  getAllThreats(): Promise<Threat[]>;
  getThreatById(id: number): Promise<Threat | undefined>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  updateThreatStatus(id: number, status: string): Promise<Threat | undefined>;
  
  // Network Nodes
  getAllNetworkNodes(): Promise<NetworkNode[]>;
  getNetworkNodeById(id: number): Promise<NetworkNode | undefined>;
  createNetworkNode(node: InsertNetworkNode): Promise<NetworkNode>;
  updateNodeStatus(id: number, status: string, threatLevel?: number): Promise<NetworkNode | undefined>;
  
  // Incidents
  getAllIncidents(): Promise<Incident[]>;
  getIncidentById(id: number): Promise<Incident | undefined>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  updateIncidentStatus(id: number, status: string): Promise<Incident | undefined>;
  
  // Security Metrics
  getLatestSecurityMetrics(): Promise<SecurityMetrics | undefined>;
  createSecurityMetrics(metrics: InsertSecurityMetrics): Promise<SecurityMetrics>;
  getSecurityMetricsHistory(hours: number): Promise<SecurityMetrics[]>;
  
  // AI Detections
  getAllAiDetections(): Promise<AiDetection[]>;
  getAiDetectionById(id: number): Promise<AiDetection | undefined>;
  createAiDetection(detection: InsertAiDetection): Promise<AiDetection>;
  getAiDetectionsByType(type: string): Promise<AiDetection[]>;
  
  // URL Scans
  getAllUrlScans(): Promise<UrlScan[]>;
  getUrlScanById(id: number): Promise<UrlScan | undefined>;
  createUrlScan(scan: InsertUrlScan): Promise<UrlScan>;
  getUrlScanByUrl(url: string): Promise<UrlScan | undefined>;
  
  // Vulnerability Predictions
  getAllVulnerabilityPredictions(): Promise<VulnerabilityPrediction[]>;
  getVulnerabilityPredictionById(id: number): Promise<VulnerabilityPrediction | undefined>;
  createVulnerabilityPrediction(prediction: InsertVulnerabilityPrediction): Promise<VulnerabilityPrediction>;
  
  // Dark Web Mentions
  getAllDarkWebMentions(): Promise<DarkWebMention[]>;
  getDarkWebMentionById(id: number): Promise<DarkWebMention | undefined>;
  createDarkWebMention(mention: InsertDarkWebMention): Promise<DarkWebMention>;
  getDarkWebMentionsByEntity(entityValue: string): Promise<DarkWebMention[]>;
  
  // Breach Alerts
  getAllBreachAlerts(): Promise<BreachAlert[]>;
  getBreachAlertById(id: number): Promise<BreachAlert | undefined>;
  createBreachAlert(alert: InsertBreachAlert): Promise<BreachAlert>;
  getBreachAlertsByEmail(email: string): Promise<BreachAlert[]>;
  
  // Camera Feeds
  getAllCameraFeeds(): Promise<CameraFeed[]>;
  getCameraFeedById(id: number): Promise<CameraFeed | undefined>;
  createCameraFeed(feed: InsertCameraFeed): Promise<CameraFeed>;
  updateCameraFeedStatus(id: number, status: string): Promise<CameraFeed | undefined>;
}

export class MemStorage implements IStorage {
  private aiEmployees: Map<string, AIEmployee>;
  private threats: Map<number, Threat>;
  private networkNodes: Map<number, NetworkNode>;
  private incidents: Map<number, Incident>;
  private securityMetrics: Map<number, SecurityMetrics>;
  private aiDetections: Map<number, AiDetection>;
  private urlScans: Map<number, UrlScan>;
  private vulnerabilityPredictions: Map<number, VulnerabilityPrediction>;
  private darkWebMentions: Map<number, DarkWebMention>;
  private breachAlerts: Map<number, BreachAlert>;
  private cameraFeeds: Map<number, CameraFeed>;
  private currentThreatId: number;
  private currentNodeId: number;
  private currentIncidentId: number;
  private currentMetricsId: number;
  private currentAiDetectionId: number;
  private currentUrlScanId: number;
  private currentVulnPredictionId: number;
  private currentDarkWebMentionId: number;
  private currentBreachAlertId: number;
  private currentCameraFeedId: number;

  constructor() {
    this.aiEmployees = new Map();
    this.threats = new Map();
    this.networkNodes = new Map();
    this.incidents = new Map();
    this.securityMetrics = new Map();
    this.aiDetections = new Map();
    this.urlScans = new Map();
    this.vulnerabilityPredictions = new Map();
    this.darkWebMentions = new Map();
    this.breachAlerts = new Map();
    this.cameraFeeds = new Map();
    this.currentThreatId = 1;
    this.currentNodeId = 1;
    this.currentIncidentId = 1;
    this.currentMetricsId = 1;
    this.currentAiDetectionId = 1;
    this.currentUrlScanId = 1;
    this.currentVulnPredictionId = 1;
    this.currentDarkWebMentionId = 1;
    this.currentBreachAlertId = 1;
    this.currentCameraFeedId = 1;
    
    this.seedData();
  }

  // AI Employee methods
  async getAIEmployees(userId?: string): Promise<AIEmployee[]> {
    const employees = Array.from(this.aiEmployees.values());
    return userId ? employees.filter(emp => emp.userId === userId) : employees;
  }

  async getAIEmployeeById(id: string): Promise<AIEmployee | undefined> {
    return this.aiEmployees.get(id);
  }

  async createAIEmployee(employeeData: Omit<AIEmployee, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIEmployee> {
    const employee: AIEmployee = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...employeeData
    };

    this.aiEmployees.set(employee.id, employee);
    return employee;
  }

  async updateAIEmployee(id: string, updates: Partial<AIEmployee>): Promise<AIEmployee | undefined> {
    const existing = this.aiEmployees.get(id);
    if (!existing) return undefined;

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.aiEmployees.set(id, updated);
    return updated;
  }

  async deleteAIEmployee(id: string): Promise<boolean> {
    return this.aiEmployees.delete(id);
  }

  private seedData() {
    // Seed sample AI employees
    const sampleEmployees: AIEmployee[] = [
      {
        id: 'emp_001',
        name: 'Sarah SecurityBot',
        role: 'Cybersecurity Analyst',
        description: 'Advanced AI security analyst specializing in threat detection and incident response',
        avatar: '🛡️',
        capabilities: ['Threat Detection', 'Risk Assessment', 'Incident Response', 'Vulnerability Analysis'],
        personality: {
          tone: 'professional',
          formality: 75,
          creativity: 40,
          empathy: 60,
          assertiveness: 80
        },
        skills: [
          { category: 'Security Analysis', level: 95, specializations: ['Malware Detection', 'Network Security', 'SIEM'] },
          { category: 'Risk Assessment', level: 88, specializations: ['Compliance', 'Audit', 'Policy'] }
        ],
        deployment: {
          status: 'active',
          environment: 'production',
          metrics: {
            tasksCompleted: 247,
            accuracy: 94.2,
            responseTime: 145,
            userSatisfaction: 92
          }
        },
        configuration: {
          modelType: 'claude-sonnet-4',
          temperature: 0.3,
          maxTokens: 4000,
          context: 'You are a cybersecurity expert with deep knowledge of threat landscapes and security protocols.',
          instructions: 'Always prioritize security best practices and provide actionable recommendations.',
          safety: {
            contentFilter: true,
            biasDetection: true,
            ethicalGuidelines: true
          }
        },
        schedule: {
          timezone: 'UTC',
          workingHours: { start: '00:00', end: '23:59' },
          availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'demo_user'
      },
      {
        id: 'emp_002',
        name: 'Alex DataMind',
        role: 'Data Scientist',
        description: 'AI-powered data analysis and machine learning specialist',
        avatar: '📊',
        capabilities: ['Data Analysis', 'Machine Learning', 'Statistical Modeling', 'Visualization'],
        personality: {
          tone: 'friendly',
          formality: 50,
          creativity: 85,
          empathy: 70,
          assertiveness: 65
        },
        skills: [
          { category: 'Data Analysis', level: 92, specializations: ['Python', 'R', 'SQL'] },
          { category: 'Machine Learning', level: 90, specializations: ['Deep Learning', 'NLP', 'Computer Vision'] }
        ],
        deployment: {
          status: 'active',
          environment: 'production',
          metrics: {
            tasksCompleted: 189,
            accuracy: 96.8,
            responseTime: 230,
            userSatisfaction: 89
          }
        },
        configuration: {
          modelType: 'claude-3-7-sonnet',
          temperature: 0.6,
          maxTokens: 6000,
          context: 'You are a data science expert with expertise in statistical analysis and machine learning.',
          instructions: 'Provide clear explanations of complex data concepts and actionable insights.',
          safety: {
            contentFilter: true,
            biasDetection: true,
            ethicalGuidelines: true
          }
        },
        schedule: {
          timezone: 'UTC',
          workingHours: { start: '09:00', end: '17:00' },
          availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'demo_user'
      }
    ];

    sampleEmployees.forEach(emp => this.aiEmployees.set(emp.id, emp));

    // Seed initial threats with AI analysis
    const initialThreats: InsertThreat[] = [
      {
        title: "Advanced Persistent Threat Detected",
        description: "Multi-stage attack with lateral movement patterns",
        severity: "CRITICAL",
        source: "10.0.0.45",
        targetIP: "10.0.0.45",
        location: "Finance Dept",
        status: "ACTIVE",
        confidence: 97,
        metadata: { type: "ransomware", family: "WannaCry-variant" },
        attackType: "APT",
        mitreAttack: ["T1566.001", "T1055", "T1082"],
        aiAnalysis: {
          behaviorScore: 0.95,
          techniques: ["Spear phishing", "Process injection", "System discovery"],
          recommendation: "Immediate isolation and forensic analysis"
        }
      },
      {
        title: "Deepfake Audio Attack",
        description: "AI-generated voice impersonation targeting CEO",
        severity: "HIGH",
        source: "external",
        targetIP: null,
        location: "Executive Office",
        status: "INVESTIGATING",
        confidence: 92,
        metadata: { type: "social_engineering", vector: "voice_cloning" },
        attackType: "SOCIAL_ENGINEERING",
        mitreAttack: ["T1598.003"],
        aiAnalysis: {
          audioAnalysis: { authenticity: 0.08, confidence: 0.92 },
          voicePrint: "executive_voice_signature_compromised"
        }
      }
    ];

    initialThreats.forEach(threat => this.createThreat(threat));

    // Seed initial network nodes with vulnerabilities
    const initialNodes: InsertNetworkNode[] = [
      {
        name: "DC-SERVER-01",
        ip: "10.0.0.1",
        nodeType: "SERVER",
        status: "ONLINE",
        location: "Data Center",
        threatLevel: 15,
        vulnerabilities: {
          cveList: ["CVE-2024-1234", "CVE-2024-5678"],
          patchLevel: "95%",
          lastScan: new Date()
        },
        systemIntegrity: 98
      },
      {
        name: "FIN-WS-07",
        ip: "10.0.0.45",
        nodeType: "WORKSTATION",
        status: "COMPROMISED",
        location: "Finance Dept",
        threatLevel: 98,
        vulnerabilities: {
          cveList: ["CVE-2024-0001"],
          exploited: true,
          impact: "HIGH"
        },
        systemIntegrity: 45
      }
    ];

    initialNodes.forEach(node => this.createNetworkNode(node));

    // Seed AI detections
    const aiDetections: InsertAiDetection[] = [
      {
        detectionType: "DEEPFAKE",
        fileName: "ceo_announcement.mp4",
        confidence: 0.94,
        result: "FAKE",
        metadata: {
          facialAnalysis: { landmarks: "inconsistent", lighting: "artificial" },
          audioAnalysis: { voiceprint: "no_match", artifacts: "detected" }
        }
      },
      {
        detectionType: "VOICE_CLONE",
        fileName: "board_call_recording.wav",
        confidence: 0.89,
        result: "SUSPICIOUS",
        metadata: {
          spectralAnalysis: "anomalous_frequencies",
          prosodyScore: 0.72
        }
      }
    ];

    aiDetections.forEach(detection => this.createAiDetection(detection));

    // Seed enhanced security metrics
    this.createSecurityMetrics({
      criticalThreats: 47,
      highThreats: 156,
      mediumThreats: 89,
      lowThreats: 234,
      activeIncidents: 156,
      resolvedThreats: 2847,
      aiConfidence: 97,
      activeNodes: 1247,
      totalConnections: 3891,
      anomalies: 23,
      deepfakeDetections: 12,
      phishingBlocked: 456,
      malwareQuarantined: 78
    });

    // Seed camera feeds
    const cameraFeeds: InsertCameraFeed[] = [
      {
        feedName: "Executive Floor Entrance",
        location: "Floor 12 - Main Entrance",
        status: "ACTIVE",
        detectionTypes: ["DEEPFAKE", "FACE_RECOGNITION"],
        alertCount: 3
      },
      {
        feedName: "Data Center Access",
        location: "Basement - Server Room",
        status: "ACTIVE", 
        detectionTypes: ["SUSPICIOUS_ACTIVITY", "FACE_RECOGNITION"],
        alertCount: 1
      }
    ];

    cameraFeeds.forEach(feed => this.createCameraFeed(feed));
  }

  // Threats
  async getAllThreats(): Promise<Threat[]> {
    return Array.from(this.threats.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getThreatById(id: number): Promise<Threat | undefined> {
    return this.threats.get(id);
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const id = this.currentThreatId++;
    const threat: Threat = {
      id,
      title: insertThreat.title,
      description: insertThreat.description,
      severity: insertThreat.severity,
      source: insertThreat.source,
      targetIP: insertThreat.targetIP || null,
      location: insertThreat.location || null,
      timestamp: new Date(),
      status: insertThreat.status || "ACTIVE",
      confidence: insertThreat.confidence || 0,
      metadata: insertThreat.metadata || null,
      attackType: insertThreat.attackType || null,
      mitreAttack: insertThreat.mitreAttack || null,
      aiAnalysis: insertThreat.aiAnalysis || null,
    };
    this.threats.set(id, threat);
    return threat;
  }

  async updateThreatStatus(id: number, status: string): Promise<Threat | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      threat.status = status;
      this.threats.set(id, threat);
      return threat;
    }
    return undefined;
  }

  // Network Nodes
  async getAllNetworkNodes(): Promise<NetworkNode[]> {
    return Array.from(this.networkNodes.values());
  }

  async getNetworkNodeById(id: number): Promise<NetworkNode | undefined> {
    return this.networkNodes.get(id);
  }

  async createNetworkNode(insertNode: InsertNetworkNode): Promise<NetworkNode> {
    const id = this.currentNodeId++;
    const node: NetworkNode = {
      id,
      name: insertNode.name,
      ip: insertNode.ip,
      nodeType: insertNode.nodeType,
      status: insertNode.status || "ONLINE",
      location: insertNode.location || null,
      lastSeen: new Date(),
      threatLevel: insertNode.threatLevel || 0,
      vulnerabilities: insertNode.vulnerabilities || null,
      systemIntegrity: insertNode.systemIntegrity || 100,
    };
    this.networkNodes.set(id, node);
    return node;
  }

  async updateNodeStatus(id: number, status: string, threatLevel?: number): Promise<NetworkNode | undefined> {
    const node = this.networkNodes.get(id);
    if (node) {
      node.status = status;
      if (threatLevel !== undefined) {
        node.threatLevel = threatLevel;
      }
      node.lastSeen = new Date();
      this.networkNodes.set(id, node);
      return node;
    }
    return undefined;
  }

  // Incidents
  async getAllIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getIncidentById(id: number): Promise<Incident | undefined> {
    return this.incidents.get(id);
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = this.currentIncidentId++;
    const incident: Incident = {
      id,
      title: insertIncident.title,
      description: insertIncident.description,
      severity: insertIncident.severity,
      status: insertIncident.status || "OPEN",
      assignedTo: insertIncident.assignedTo || null,
      timestamp: new Date(),
      resolvedAt: insertIncident.resolvedAt || null,
      tags: insertIncident.tags || null,
      forensicData: insertIncident.forensicData || null,
      mitreMapping: insertIncident.mitreMapping || null,
    };
    this.incidents.set(id, incident);
    return incident;
  }

  async updateIncidentStatus(id: number, status: string): Promise<Incident | undefined> {
    const incident = this.incidents.get(id);
    if (incident) {
      incident.status = status;
      if (status === "RESOLVED") {
        incident.resolvedAt = new Date();
      }
      this.incidents.set(id, incident);
      return incident;
    }
    return undefined;
  }

  // Security Metrics
  async getLatestSecurityMetrics(): Promise<SecurityMetrics | undefined> {
    const metrics = Array.from(this.securityMetrics.values());
    return metrics.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  }

  async createSecurityMetrics(insertMetrics: InsertSecurityMetrics): Promise<SecurityMetrics> {
    const id = this.currentMetricsId++;
    const metrics: SecurityMetrics = {
      id,
      timestamp: new Date(),
      criticalThreats: insertMetrics.criticalThreats || 0,
      highThreats: insertMetrics.highThreats || 0,
      mediumThreats: insertMetrics.mediumThreats || 0,
      lowThreats: insertMetrics.lowThreats || 0,
      activeIncidents: insertMetrics.activeIncidents || 0,
      resolvedThreats: insertMetrics.resolvedThreats || 0,
      aiConfidence: insertMetrics.aiConfidence || 0,
      activeNodes: insertMetrics.activeNodes || 0,
      totalConnections: insertMetrics.totalConnections || 0,
      anomalies: insertMetrics.anomalies || 0,
      deepfakeDetections: insertMetrics.deepfakeDetections || 0,
      phishingBlocked: insertMetrics.phishingBlocked || 0,
      malwareQuarantined: insertMetrics.malwareQuarantined || 0,
    };
    this.securityMetrics.set(id, metrics);
    return metrics;
  }

  async getSecurityMetricsHistory(hours: number): Promise<SecurityMetrics[]> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return Array.from(this.securityMetrics.values())
      .filter(m => new Date(m.timestamp) >= cutoff)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  // AI Detections
  async getAllAiDetections(): Promise<AiDetection[]> {
    return Array.from(this.aiDetections.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getAiDetectionById(id: number): Promise<AiDetection | undefined> {
    return this.aiDetections.get(id);
  }

  async createAiDetection(insertDetection: InsertAiDetection): Promise<AiDetection> {
    const id = this.currentAiDetectionId++;
    const detection: AiDetection = {
      id,
      detectionType: insertDetection.detectionType,
      filePath: insertDetection.filePath || null,
      fileName: insertDetection.fileName || null,
      confidence: insertDetection.confidence,
      result: insertDetection.result,
      timestamp: new Date(),
      metadata: insertDetection.metadata || null,
      userId: insertDetection.userId || null,
    };
    this.aiDetections.set(id, detection);
    return detection;
  }

  async getAiDetectionsByType(type: string): Promise<AiDetection[]> {
    return Array.from(this.aiDetections.values())
      .filter(d => d.detectionType === type)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // URL Scans
  async getAllUrlScans(): Promise<UrlScan[]> {
    return Array.from(this.urlScans.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getUrlScanById(id: number): Promise<UrlScan | undefined> {
    return this.urlScans.get(id);
  }

  async createUrlScan(insertScan: InsertUrlScan): Promise<UrlScan> {
    const id = this.currentUrlScanId++;
    const scan: UrlScan = {
      id,
      url: insertScan.url,
      scanType: insertScan.scanType,
      threat: insertScan.threat || false,
      riskScore: insertScan.riskScore || 0,
      scanResults: insertScan.scanResults || null,
      timestamp: new Date(),
    };
    this.urlScans.set(id, scan);
    return scan;
  }

  async getUrlScanByUrl(url: string): Promise<UrlScan | undefined> {
    return Array.from(this.urlScans.values()).find(s => s.url === url);
  }

  // Vulnerability Predictions
  async getAllVulnerabilityPredictions(): Promise<VulnerabilityPrediction[]> {
    return Array.from(this.vulnerabilityPredictions.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getVulnerabilityPredictionById(id: number): Promise<VulnerabilityPrediction | undefined> {
    return this.vulnerabilityPredictions.get(id);
  }

  async createVulnerabilityPrediction(insertPrediction: InsertVulnerabilityPrediction): Promise<VulnerabilityPrediction> {
    const id = this.currentVulnPredictionId++;
    const prediction: VulnerabilityPrediction = {
      id,
      cveId: insertPrediction.cveId || null,
      software: insertPrediction.software,
      version: insertPrediction.version || null,
      riskScore: insertPrediction.riskScore,
      exploitProbability: insertPrediction.exploitProbability,
      prediction: insertPrediction.prediction || null,
      timestamp: new Date(),
    };
    this.vulnerabilityPredictions.set(id, prediction);
    return prediction;
  }

  // Dark Web Mentions
  async getAllDarkWebMentions(): Promise<DarkWebMention[]> {
    return Array.from(this.darkWebMentions.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getDarkWebMentionById(id: number): Promise<DarkWebMention | undefined> {
    return this.darkWebMentions.get(id);
  }

  async createDarkWebMention(insertMention: InsertDarkWebMention): Promise<DarkWebMention> {
    const id = this.currentDarkWebMentionId++;
    const mention: DarkWebMention = {
      id,
      entityType: insertMention.entityType,
      entityValue: insertMention.entityValue,
      source: insertMention.source || null,
      context: insertMention.context || null,
      threatLevel: insertMention.threatLevel || null,
      timestamp: new Date(),
      verified: insertMention.verified || false,
    };
    this.darkWebMentions.set(id, mention);
    return mention;
  }

  async getDarkWebMentionsByEntity(entityValue: string): Promise<DarkWebMention[]> {
    return Array.from(this.darkWebMentions.values())
      .filter(m => m.entityValue === entityValue)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Breach Alerts
  async getAllBreachAlerts(): Promise<BreachAlert[]> {
    return Array.from(this.breachAlerts.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getBreachAlertById(id: number): Promise<BreachAlert | undefined> {
    return this.breachAlerts.get(id);
  }

  async createBreachAlert(insertAlert: InsertBreachAlert): Promise<BreachAlert> {
    const id = this.currentBreachAlertId++;
    const alert: BreachAlert = {
      id,
      email: insertAlert.email,
      breachName: insertAlert.breachName,
      breachDate: insertAlert.breachDate || null,
      dataTypes: insertAlert.dataTypes || null,
      riskLevel: insertAlert.riskLevel || null,
      timestamp: new Date(),
      acknowledged: insertAlert.acknowledged || false,
    };
    this.breachAlerts.set(id, alert);
    return alert;
  }

  async getBreachAlertsByEmail(email: string): Promise<BreachAlert[]> {
    return Array.from(this.breachAlerts.values())
      .filter(a => a.email === email)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Camera Feeds
  async getAllCameraFeeds(): Promise<CameraFeed[]> {
    return Array.from(this.cameraFeeds.values());
  }

  async getCameraFeedById(id: number): Promise<CameraFeed | undefined> {
    return this.cameraFeeds.get(id);
  }

  async createCameraFeed(insertFeed: InsertCameraFeed): Promise<CameraFeed> {
    const id = this.currentCameraFeedId++;
    const feed: CameraFeed = {
      id,
      feedName: insertFeed.feedName,
      location: insertFeed.location,
      status: insertFeed.status || "ACTIVE",
      detectionTypes: insertFeed.detectionTypes || null,
      lastAnalysis: new Date(),
      alertCount: insertFeed.alertCount || 0,
    };
    this.cameraFeeds.set(id, feed);
    return feed;
  }

  async updateCameraFeedStatus(id: number, status: string): Promise<CameraFeed | undefined> {
    const feed = this.cameraFeeds.get(id);
    if (feed) {
      feed.status = status;
      feed.lastAnalysis = new Date();
      this.cameraFeeds.set(id, feed);
      return feed;
    }
    return undefined;
  }
}

// Import additional entities for Supabase integration
import {
  users,
  aiAgents,
  analysisResults,
  accessRequests,
  auditLogs,
  type User,
  type UpsertUser,
  type AIAgent,
  type InsertAIAgent,
  type AnalysisResult,
  type InsertAnalysisResult,
  type AccessRequest,
  type InsertAccessRequest,
  type AuditLog,
  type InsertAuditLog,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Enhanced storage interface for Supabase
export interface IStorageExtended extends IStorage {
  // User management operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  
  // AI Agent operations
  createAIAgent(agent: InsertAIAgent): Promise<AIAgent>;
  getAIAgent(id: string): Promise<AIAgent | undefined>;
  listAIAgents(companyId?: string): Promise<AIAgent[]>;
  updateAIAgent(id: string, updates: Partial<AIAgent>): Promise<AIAgent>;
  deleteAIAgent(id: string): Promise<void>;
  
  // Analysis operations
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(caseId: string): Promise<AnalysisResult | undefined>;
  listAnalysisResults(userId?: string): Promise<AnalysisResult[]>;
  
  // Access management
  createAccessRequest(request: InsertAccessRequest): Promise<AccessRequest>;
  getAccessRequest(id: string): Promise<AccessRequest | undefined>;
  listAccessRequests(userId?: string): Promise<AccessRequest[]>;
  updateAccessRequest(id: string, updates: Partial<AccessRequest>): Promise<AccessRequest>;
  
  // Audit logging
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;
  getAuditLogs(userId?: string, companyId?: string): Promise<AuditLog[]>;
}

// Database storage implementation with Supabase
export class DatabaseStorage extends MemStorage implements IStorageExtended {
  // User management operations
  async getUser(id: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(userData)
        .onConflictDoUpdate({
          target: users.id,
          set: {
            ...userData,
            updatedAt: new Date(),
          },
        })
        .returning();
      return user;
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  // AI Agent operations
  async createAIAgent(agentData: InsertAIAgent): Promise<AIAgent> {
    try {
      const [agent] = await db.insert(aiAgents).values(agentData).returning();
      return agent;
    } catch (error) {
      console.error('Error creating AI agent:', error);
      throw error;
    }
  }

  async getAIAgent(id: string): Promise<AIAgent | undefined> {
    try {
      const [agent] = await db.select().from(aiAgents).where(eq(aiAgents.id, id));
      return agent;
    } catch (error) {
      console.error('Error getting AI agent:', error);
      return undefined;
    }
  }

  async listAIAgents(companyId?: string): Promise<AIAgent[]> {
    try {
      const query = db.select().from(aiAgents);
      if (companyId) {
        return await query.where(eq(aiAgents.companyId, companyId)).orderBy(desc(aiAgents.createdAt));
      }
      return await query.orderBy(desc(aiAgents.createdAt));
    } catch (error) {
      console.error('Error listing AI agents:', error);
      return [];
    }
  }

  async updateAIAgent(id: string, updates: Partial<AIAgent>): Promise<AIAgent> {
    try {
      const [agent] = await db
        .update(aiAgents)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(aiAgents.id, id))
        .returning();
      return agent;
    } catch (error) {
      console.error('Error updating AI agent:', error);
      throw error;
    }
  }

  async deleteAIAgent(id: string): Promise<void> {
    try {
      await db.delete(aiAgents).where(eq(aiAgents.id, id));
    } catch (error) {
      console.error('Error deleting AI agent:', error);
      throw error;
    }
  }

  // Analysis operations
  async createAnalysisResult(resultData: InsertAnalysisResult): Promise<AnalysisResult> {
    try {
      const [result] = await db.insert(analysisResults).values(resultData).returning();
      return result;
    } catch (error) {
      console.error('Error creating analysis result:', error);
      throw error;
    }
  }

  async getAnalysisResult(caseId: string): Promise<AnalysisResult | undefined> {
    try {
      const [result] = await db.select().from(analysisResults).where(eq(analysisResults.caseId, caseId));
      return result;
    } catch (error) {
      console.error('Error getting analysis result:', error);
      return undefined;
    }
  }

  async listAnalysisResults(userId?: string): Promise<AnalysisResult[]> {
    try {
      const query = db.select().from(analysisResults);
      if (userId) {
        return await query.where(eq(analysisResults.userId, userId)).orderBy(desc(analysisResults.createdAt));
      }
      return await query.orderBy(desc(analysisResults.createdAt));
    } catch (error) {
      console.error('Error listing analysis results:', error);
      return [];
    }
  }

  // Access management
  async createAccessRequest(requestData: InsertAccessRequest): Promise<AccessRequest> {
    try {
      const [request] = await db.insert(accessRequests).values(requestData).returning();
      return request;
    } catch (error) {
      console.error('Error creating access request:', error);
      throw error;
    }
  }

  async getAccessRequest(id: string): Promise<AccessRequest | undefined> {
    try {
      const [request] = await db.select().from(accessRequests).where(eq(accessRequests.id, id));
      return request;
    } catch (error) {
      console.error('Error getting access request:', error);
      return undefined;
    }
  }

  async listAccessRequests(userId?: string): Promise<AccessRequest[]> {
    try {
      const query = db.select().from(accessRequests);
      if (userId) {
        return await query.where(eq(accessRequests.userId, userId)).orderBy(desc(accessRequests.createdAt));
      }
      return await query.orderBy(desc(accessRequests.createdAt));
    } catch (error) {
      console.error('Error listing access requests:', error);
      return [];
    }
  }

  async updateAccessRequest(id: string, updates: Partial<AccessRequest>): Promise<AccessRequest> {
    try {
      const [request] = await db
        .update(accessRequests)
        .set(updates)
        .where(eq(accessRequests.id, id))
        .returning();
      return request;
    } catch (error) {
      console.error('Error updating access request:', error);
      throw error;
    }
  }

  // Audit logging
  async createAuditLog(logData: InsertAuditLog): Promise<AuditLog> {
    try {
      const [log] = await db.insert(auditLogs).values(logData).returning();
      return log;
    } catch (error) {
      console.error('Error creating audit log:', error);
      throw error;
    }
  }

  async getAuditLogs(userId?: string, companyId?: string): Promise<AuditLog[]> {
    try {
      let query = db.select().from(auditLogs);
      
      if (userId && companyId) {
        query = query.where(eq(auditLogs.userId, userId));
      } else if (userId) {
        query = query.where(eq(auditLogs.userId, userId));
      } else if (companyId) {
        query = query.where(eq(auditLogs.companyId, companyId));
      }
      
      return await query.orderBy(desc(auditLogs.timestamp));
    } catch (error) {
      console.error('Error getting audit logs:', error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();
