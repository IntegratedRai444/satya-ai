import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, varchar, uuid, decimal, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const threats = pgTable("threats", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // CRITICAL, HIGH, MEDIUM, LOW
  source: text("source").notNull(),
  targetIP: text("target_ip"),
  location: text("location"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").notNull().default("ACTIVE"), // ACTIVE, RESOLVED, INVESTIGATING
  confidence: integer("confidence").notNull().default(0), // 0-100
  metadata: jsonb("metadata"),
  attackType: text("attack_type"), // APT, RANSOMWARE, PHISHING, etc.
  mitreAttack: text("mitre_attack").array(), // MITRE ATT&CK techniques
  aiAnalysis: jsonb("ai_analysis"),
});

export const networkNodes = pgTable("network_nodes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip").notNull(),
  nodeType: text("node_type").notNull(), // SERVER, WORKSTATION, ROUTER, SWITCH
  status: text("status").notNull().default("ONLINE"), // ONLINE, OFFLINE, COMPROMISED
  location: text("location"),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
  threatLevel: integer("threat_level").notNull().default(0), // 0-100
  vulnerabilities: jsonb("vulnerabilities"),
  systemIntegrity: integer("system_integrity").notNull().default(100), // 0-100
});

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("OPEN"), // OPEN, INVESTIGATING, RESOLVED
  assignedTo: text("assigned_to"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
  tags: text("tags").array(),
  forensicData: jsonb("forensic_data"),
  mitreMapping: text("mitre_mapping").array(),
});

export const securityMetrics = pgTable("security_metrics", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  criticalThreats: integer("critical_threats").notNull().default(0),
  highThreats: integer("high_threats").notNull().default(0),
  mediumThreats: integer("medium_threats").notNull().default(0),
  lowThreats: integer("low_threats").notNull().default(0),
  activeIncidents: integer("active_incidents").notNull().default(0),
  resolvedThreats: integer("resolved_threats").notNull().default(0),
  aiConfidence: integer("ai_confidence").notNull().default(0),
  activeNodes: integer("active_nodes").notNull().default(0),
  totalConnections: integer("total_connections").notNull().default(0),
  anomalies: integer("anomalies").notNull().default(0),
  deepfakeDetections: integer("deepfake_detections").notNull().default(0),
  phishingBlocked: integer("phishing_blocked").notNull().default(0),
  malwareQuarantined: integer("malware_quarantined").notNull().default(0),
});

// AI Detection Results
export const aiDetections = pgTable("ai_detections", {
  id: serial("id").primaryKey(),
  detectionType: text("detection_type").notNull(), // DEEPFAKE, VOICE_CLONE, FAKE_NEWS, etc.
  filePath: text("file_path"),
  fileName: text("file_name"),
  confidence: real("confidence").notNull(), // 0.0-1.0
  result: text("result").notNull(), // AUTHENTIC, FAKE, SUSPICIOUS
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata"),
  userId: text("user_id"),
});

// URL Scans
export const urlScans = pgTable("url_scans", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  scanType: text("scan_type").notNull(), // PHISHING, MALWARE, REPUTATION
  threat: boolean("threat").notNull().default(false),
  riskScore: integer("risk_score").notNull().default(0), // 0-100
  scanResults: jsonb("scan_results"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Vulnerability Predictions
export const vulnerabilityPredictions = pgTable("vulnerability_predictions", {
  id: serial("id").primaryKey(),
  cveId: text("cve_id"),
  software: text("software").notNull(),
  version: text("version"),
  riskScore: real("risk_score").notNull(), // 0.0-10.0 CVSS style
  exploitProbability: real("exploit_probability").notNull(), // 0.0-1.0
  prediction: jsonb("prediction"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Dark Web Mentions
export const darkWebMentions = pgTable("dark_web_mentions", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), // EMAIL, DOMAIN, CREDENTIAL, DATA
  entityValue: text("entity_value").notNull(),
  source: text("source"), // Dark web source
  context: text("context"),
  threatLevel: text("threat_level"), // HIGH, MEDIUM, LOW
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  verified: boolean("verified").notNull().default(false),
});

// Breach Alerts
export const breachAlerts = pgTable("breach_alerts", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  breachName: text("breach_name").notNull(),
  breachDate: timestamp("breach_date"),
  dataTypes: text("data_types").array(),
  riskLevel: text("risk_level"), // CRITICAL, HIGH, MEDIUM, LOW
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  acknowledged: boolean("acknowledged").notNull().default(false),
});

// Live Camera Feeds
export const cameraFeeds = pgTable("camera_feeds", {
  id: serial("id").primaryKey(),
  feedName: text("feed_name").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull().default("ACTIVE"), // ACTIVE, INACTIVE, ERROR
  detectionTypes: text("detection_types").array(), // DEEPFAKE, SUSPICIOUS_ACTIVITY, FACE_RECOGNITION
  lastAnalysis: timestamp("last_analysis").defaultNow(),
  alertCount: integer("alert_count").notNull().default(0),
});

// Insert schemas
export const insertThreatSchema = createInsertSchema(threats).omit({
  id: true,
  timestamp: true,
});

export const insertNetworkNodeSchema = createInsertSchema(networkNodes).omit({
  id: true,
  lastSeen: true,
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  timestamp: true,
});

export const insertSecurityMetricsSchema = createInsertSchema(securityMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertAiDetectionSchema = createInsertSchema(aiDetections).omit({
  id: true,
  timestamp: true,
});

export const insertUrlScanSchema = createInsertSchema(urlScans).omit({
  id: true,
  timestamp: true,
});

export const insertVulnerabilityPredictionSchema = createInsertSchema(vulnerabilityPredictions).omit({
  id: true,
  timestamp: true,
});

export const insertDarkWebMentionSchema = createInsertSchema(darkWebMentions).omit({
  id: true,
  timestamp: true,
});

export const insertBreachAlertSchema = createInsertSchema(breachAlerts).omit({
  id: true,
  timestamp: true,
});

export const insertCameraFeedSchema = createInsertSchema(cameraFeeds).omit({
  id: true,
  lastAnalysis: true,
});

// Types
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type Threat = typeof threats.$inferSelect;

export type InsertNetworkNode = z.infer<typeof insertNetworkNodeSchema>;
export type NetworkNode = typeof networkNodes.$inferSelect;

export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

export type InsertSecurityMetrics = z.infer<typeof insertSecurityMetricsSchema>;
export type SecurityMetrics = typeof securityMetrics.$inferSelect;

export type InsertAiDetection = z.infer<typeof insertAiDetectionSchema>;
export type AiDetection = typeof aiDetections.$inferSelect;

export type InsertUrlScan = z.infer<typeof insertUrlScanSchema>;
export type UrlScan = typeof urlScans.$inferSelect;

export type InsertVulnerabilityPrediction = z.infer<typeof insertVulnerabilityPredictionSchema>;
export type VulnerabilityPrediction = typeof vulnerabilityPredictions.$inferSelect;

export type InsertDarkWebMention = z.infer<typeof insertDarkWebMentionSchema>;
export type DarkWebMention = typeof darkWebMentions.$inferSelect;

export type InsertBreachAlert = z.infer<typeof insertBreachAlertSchema>;
export type BreachAlert = typeof breachAlerts.$inferSelect;

export type InsertCameraFeed = z.infer<typeof insertCameraFeedSchema>;
export type CameraFeed = typeof cameraFeeds.$inferSelect;

// Companies table for enterprise portal
export const companies = pgTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").unique().notNull(),
  industry: text("industry").notNull(),
  size: text("size").notNull(),
  plan: text("plan").notNull().default("basic"),
  status: text("status").notNull().default("active"),
  contactEmail: text("contact_email").notNull(),
  phone: text("phone"),
  address: text("address"),
  website: text("website"),
  employees: integer("employees"),
  securityScore: real("security_score").default(0),
  riskLevel: text("risk_level").default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security assessments
export const securityAssessments = pgTable("security_assessments", {
  id: text("id").primaryKey(),
  companyId: text("company_id").references(() => companies.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("pending"),
  severity: text("severity").notNull().default("medium"),
  description: text("description"),
  findings: jsonb("findings").default("[]"),
  recommendations: jsonb("recommendations").default("[]"),
  score: real("score"),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security incidents
export const securityIncidents = pgTable("security_incidents", {
  id: text("id").primaryKey(),
  companyId: text("company_id").references(() => companies.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("open"),
  type: text("type").notNull(),
  source: text("source"),
  affectedAssets: jsonb("affected_assets").default("[]"),
  timeline: jsonb("timeline").default("[]"),
  response: text("response"),
  resolution: text("resolution"),
  assignedTo: text("assigned_to"),
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time metrics
export const enterpriseMetrics = pgTable("enterprise_metrics", {
  id: text("id").primaryKey(),
  companyId: text("company_id").references(() => companies.id),
  metricType: text("metric_type").notNull(),
  value: real("value").notNull(),
  unit: text("unit"),
  period: text("period").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata").default("{}"),
});

// Enterprise schema inserts
export const insertCompanySchema = createInsertSchema(companies).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityAssessmentSchema = createInsertSchema(securityAssessments).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityIncidentSchema = createInsertSchema(securityIncidents).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertEnterpriseMetricsSchema = createInsertSchema(enterpriseMetrics).omit({
  timestamp: true,
});

// Enterprise types
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type SecurityAssessment = typeof securityAssessments.$inferSelect;
export type InsertSecurityAssessment = z.infer<typeof insertSecurityAssessmentSchema>;
export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = z.infer<typeof insertSecurityIncidentSchema>;
export type EnterpriseMetrics = typeof enterpriseMetrics.$inferSelect;
export type InsertEnterpriseMetrics = z.infer<typeof insertEnterpriseMetricsSchema>;

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Enhanced user management system
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  username: varchar("username").unique(),
  role: varchar("role").default("user"), // user, admin, founder
  accessLevel: integer("access_level").default(1), // 1-5 security layers
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  permissions: jsonb("permissions"),
  companyId: varchar("company_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Agent management and tracking
export const aiAgents = pgTable("ai_agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // security_analyst, ai_engineer, etc
  role: varchar("role").notNull(),
  specialization: varchar("specialization"),
  status: varchar("status").default("active"), // active, inactive, deployed
  version: varchar("version").default("1.0.0"),
  capabilities: jsonb("capabilities"),
  profile: jsonb("profile"),
  deployment: jsonb("deployment"),
  performance: jsonb("performance"),
  learning: jsonb("learning"),
  createdBy: varchar("created_by"),
  companyId: varchar("company_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security analysis results and reports
export const analysisResults = pgTable("analysis_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: varchar("case_id").unique().notNull(),
  userId: varchar("user_id"),
  fileName: varchar("file_name"),
  fileType: varchar("file_type"),
  fileSize: integer("file_size"),
  analysisType: varchar("analysis_type"), // image, video, audio
  isAuthentic: boolean("is_authentic"),
  authenticity: varchar("authenticity"),
  confidence: integer("confidence"),
  confidencePercentage: integer("confidence_percentage"),
  processingTime: varchar("processing_time"),
  keyFindings: jsonb("key_findings"),
  detailedAnalysis: jsonb("detailed_analysis"),
  advancedMetrics: jsonb("advanced_metrics"),
  threatIntelligence: jsonb("threat_intelligence"),
  forensicScore: integer("forensic_score"),
  riskLevel: varchar("risk_level"),
  recommendation: text("recommendation"),
  blockchainVerification: jsonb("blockchain_verification"),
  complianceStatus: jsonb("compliance_status"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Access requests and permissions
export const accessRequests = pgTable("access_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(),
  requestedLayer: integer("requested_layer"),
  currentLayer: integer("current_layer"),
  requestType: varchar("request_type"), // layer_access, feature_access
  justification: text("justification"),
  status: varchar("status").default("pending"), // pending, approved, denied
  reviewedBy: varchar("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Audit logs for compliance
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id"),
  action: varchar("action").notNull(),
  resource: varchar("resource"),
  resourceId: varchar("resource_id"),
  details: jsonb("details"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  companyId: varchar("company_id"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Additional Zod schemas for new tables
export const insertUserSchema = createInsertSchema(users);
export const insertAIAgentSchema = createInsertSchema(aiAgents);
export const insertAnalysisResultSchema = createInsertSchema(analysisResults);
export const insertAccessRequestSchema = createInsertSchema(accessRequests);
export const insertAuditLogSchema = createInsertSchema(auditLogs);

// Additional type exports
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type AIAgent = typeof aiAgents.$inferSelect;
export type InsertAIAgent = z.infer<typeof insertAIAgentSchema>;

export type AnalysisResult = typeof analysisResults.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;

export type AccessRequest = typeof accessRequests.$inferSelect;
export type InsertAccessRequest = z.infer<typeof insertAccessRequestSchema>;

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
