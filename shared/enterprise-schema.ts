import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, serial, uuid, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Companies table
export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }).unique().notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  size: varchar("size", { length: 50 }).notNull(), // startup, small, medium, large, enterprise
  plan: varchar("plan", { length: 50 }).notNull().default("basic"), // basic, professional, enterprise, sovereign
  status: varchar("status", { length: 50 }).notNull().default("active"),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  website: varchar("website", { length: 255 }),
  logo: varchar("logo", { length: 500 }),
  foundedYear: integer("founded_year"),
  employees: integer("employees"),
  revenue: decimal("revenue", { precision: 15, scale: 2 }),
  securityScore: decimal("security_score", { precision: 5, scale: 2 }).default("0"),
  riskLevel: varchar("risk_level", { length: 20 }).default("medium"), // low, medium, high, critical
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Users table for company representatives
export const companyUsers = pgTable("company_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // admin, security_officer, manager, user
  department: varchar("department", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  avatar: varchar("avatar", { length: 500 }),
  lastLogin: timestamp("last_login"),
  isActive: boolean("is_active").default(true),
  permissions: jsonb("permissions").default("{}"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security assessments
export const securityAssessments = pgTable("security_assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  assessmentType: varchar("assessment_type", { length: 50 }).notNull(), // vulnerability, penetration, compliance, risk
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, in_progress, completed, failed
  severity: varchar("severity", { length: 20 }).notNull(), // low, medium, high, critical
  score: decimal("score", { precision: 5, scale: 2 }),
  findings: jsonb("findings").default("[]"),
  recommendations: jsonb("recommendations").default("[]"),
  remediations: jsonb("remediations").default("[]"),
  assessor: varchar("assessor", { length: 255 }),
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security incidents
export const securityIncidents = pgTable("security_incidents", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  incidentType: varchar("incident_type", { length: 50 }).notNull(), // malware, phishing, data_breach, unauthorized_access
  severity: varchar("severity", { length: 20 }).notNull(), // low, medium, high, critical
  status: varchar("status", { length: 50 }).notNull().default("open"), // open, investigating, contained, resolved, closed
  affectedSystems: jsonb("affected_systems").default("[]"),
  impactLevel: varchar("impact_level", { length: 20 }).notNull(), // minimal, moderate, significant, severe
  detectedAt: timestamp("detected_at").notNull(),
  reportedBy: varchar("reported_by", { length: 255 }),
  assignedTo: varchar("assigned_to", { length: 255 }),
  responseTime: integer("response_time"), // minutes
  resolutionTime: integer("resolution_time"), // minutes
  evidence: jsonb("evidence").default("[]"),
  timeline: jsonb("timeline").default("[]"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Threat monitoring
export const threatMonitoring = pgTable("threat_monitoring", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  threatType: varchar("threat_type", { length: 50 }).notNull(),
  threatSource: varchar("threat_source", { length: 100 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  confidence: decimal("confidence", { precision: 5, scale: 2 }),
  indicators: jsonb("indicators").default("[]"),
  mitreAttackIds: jsonb("mitre_attack_ids").default("[]"),
  affectedAssets: jsonb("affected_assets").default("[]"),
  detectionMethod: varchar("detection_method", { length: 100 }),
  firstSeen: timestamp("first_seen").notNull(),
  lastSeen: timestamp("last_seen").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Compliance tracking
export const complianceTracking = pgTable("compliance_tracking", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  framework: varchar("framework", { length: 50 }).notNull(), // gdpr, hipaa, sox, pci_dss, iso27001
  status: varchar("status", { length: 50 }).notNull().default("in_progress"),
  overallScore: decimal("overall_score", { precision: 5, scale: 2 }),
  controlsTotal: integer("controls_total"),
  controlsImplemented: integer("controls_implemented"),
  controlsPartial: integer("controls_partial"),
  controlsFailed: integer("controls_failed"),
  lastAudit: timestamp("last_audit"),
  nextAudit: timestamp("next_audit"),
  auditor: varchar("auditor", { length: 255 }),
  certificateExpiry: timestamp("certificate_expiry"),
  requirements: jsonb("requirements").default("[]"),
  evidence: jsonb("evidence").default("[]"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Data protection tracking
export const dataProtection = pgTable("data_protection", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  dataType: varchar("data_type", { length: 100 }).notNull(), // personal, financial, health, intellectual_property
  dataClassification: varchar("data_classification", { length: 50 }).notNull(), // public, internal, confidential, restricted
  location: varchar("location", { length: 255 }).notNull(),
  storageType: varchar("storage_type", { length: 50 }).notNull(), // cloud, on_premise, hybrid
  encryptionStatus: varchar("encryption_status", { length: 50 }).notNull(), // encrypted, unencrypted, partial
  accessControls: jsonb("access_controls").default("[]"),
  backupStatus: varchar("backup_status", { length: 50 }).notNull(),
  retentionPeriod: integer("retention_period"), // days
  complianceRequirements: jsonb("compliance_requirements").default("[]"),
  riskScore: decimal("risk_score", { precision: 5, scale: 2 }),
  lastAudit: timestamp("last_audit"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security metrics
export const securityMetrics = pgTable("security_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  metricType: varchar("metric_type", { length: 50 }).notNull(),
  value: decimal("value", { precision: 15, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 20 }),
  period: varchar("period", { length: 20 }).notNull(), // daily, weekly, monthly, quarterly
  timestamp: timestamp("timestamp").notNull(),
  metadata: jsonb("metadata").default("{}"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(companyUsers),
  assessments: many(securityAssessments),
  incidents: many(securityIncidents),
  threats: many(threatMonitoring),
  compliance: many(complianceTracking),
  dataProtection: many(dataProtection),
  metrics: many(securityMetrics),
}));

export const companyUsersRelations = relations(companyUsers, ({ one }) => ({
  company: one(companies, {
    fields: [companyUsers.companyId],
    references: [companies.id],
  }),
}));

export const securityAssessmentsRelations = relations(securityAssessments, ({ one }) => ({
  company: one(companies, {
    fields: [securityAssessments.companyId],
    references: [companies.id],
  }),
}));

export const securityIncidentsRelations = relations(securityIncidents, ({ one }) => ({
  company: one(companies, {
    fields: [securityIncidents.companyId],
    references: [companies.id],
  }),
}));

export const threatMonitoringRelations = relations(threatMonitoring, ({ one }) => ({
  company: one(companies, {
    fields: [threatMonitoring.companyId],
    references: [companies.id],
  }),
}));

export const complianceTrackingRelations = relations(complianceTracking, ({ one }) => ({
  company: one(companies, {
    fields: [complianceTracking.companyId],
    references: [companies.id],
  }),
}));

export const dataProtectionRelations = relations(dataProtection, ({ one }) => ({
  company: one(companies, {
    fields: [dataProtection.companyId],
    references: [companies.id],
  }),
}));

export const securityMetricsRelations = relations(securityMetrics, ({ one }) => ({
  company: one(companies, {
    fields: [securityMetrics.companyId],
    references: [companies.id],
  }),
}));

// Zod schemas
export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanyUserSchema = createInsertSchema(companyUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityAssessmentSchema = createInsertSchema(securityAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityIncidentSchema = createInsertSchema(securityIncidents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertThreatMonitoringSchema = createInsertSchema(threatMonitoring).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertComplianceTrackingSchema = createInsertSchema(complianceTracking).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDataProtectionSchema = createInsertSchema(dataProtection).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityMetricsSchema = createInsertSchema(securityMetrics).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type CompanyUser = typeof companyUsers.$inferSelect;
export type InsertCompanyUser = z.infer<typeof insertCompanyUserSchema>;
export type SecurityAssessment = typeof securityAssessments.$inferSelect;
export type InsertSecurityAssessment = z.infer<typeof insertSecurityAssessmentSchema>;
export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = z.infer<typeof insertSecurityIncidentSchema>;
export type ThreatMonitoring = typeof threatMonitoring.$inferSelect;
export type InsertThreatMonitoring = z.infer<typeof insertThreatMonitoringSchema>;
export type ComplianceTracking = typeof complianceTracking.$inferSelect;
export type InsertComplianceTracking = z.infer<typeof insertComplianceTrackingSchema>;
export type DataProtection = typeof dataProtection.$inferSelect;
export type InsertDataProtection = z.infer<typeof insertDataProtectionSchema>;
export type SecurityMetrics = typeof securityMetrics.$inferSelect;
export type InsertSecurityMetrics = z.infer<typeof insertSecurityMetricsSchema>;