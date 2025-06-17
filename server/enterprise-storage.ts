import { enterpriseDb } from "./enterprise-db";
import { 
  companies, 
  companyUsers, 
  securityAssessments, 
  securityIncidents, 
  threatMonitoring, 
  complianceTracking, 
  dataProtection, 
  securityMetrics,
  type Company,
  type InsertCompany,
  type CompanyUser,
  type InsertCompanyUser,
  type SecurityAssessment,
  type InsertSecurityAssessment,
  type SecurityIncident,
  type InsertSecurityIncident,
  type ThreatMonitoring,
  type InsertThreatMonitoring,
  type ComplianceTracking,
  type InsertComplianceTracking,
  type DataProtection,
  type InsertDataProtection,
  type SecurityMetrics,
  type InsertSecurityMetrics
} from "@shared/enterprise-schema";
import { eq, desc, count, avg, sql } from "drizzle-orm";

export interface IEnterpriseStorage {
  // Company operations
  getAllCompanies(): Promise<Company[]>;
  getCompanyById(id: string): Promise<Company | undefined>;
  getCompanyByDomain(domain: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, updates: Partial<Company>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<boolean>;

  // Company users
  getCompanyUsers(companyId: string): Promise<CompanyUser[]>;
  createCompanyUser(user: InsertCompanyUser): Promise<CompanyUser>;
  getUserByEmail(email: string): Promise<CompanyUser | undefined>;

  // Security assessments
  getCompanyAssessments(companyId: string): Promise<SecurityAssessment[]>;
  createAssessment(assessment: InsertSecurityAssessment): Promise<SecurityAssessment>;
  updateAssessmentStatus(id: string, status: string): Promise<SecurityAssessment | undefined>;

  // Security incidents
  getCompanyIncidents(companyId: string): Promise<SecurityIncident[]>;
  createIncident(incident: InsertSecurityIncident): Promise<SecurityIncident>;
  updateIncidentStatus(id: string, status: string): Promise<SecurityIncident | undefined>;

  // Threat monitoring
  getCompanyThreats(companyId: string): Promise<ThreatMonitoring[]>;
  createThreatEntry(threat: InsertThreatMonitoring): Promise<ThreatMonitoring>;

  // Compliance tracking
  getCompanyCompliance(companyId: string): Promise<ComplianceTracking[]>;
  createComplianceEntry(compliance: InsertComplianceTracking): Promise<ComplianceTracking>;

  // Data protection
  getCompanyDataProtection(companyId: string): Promise<DataProtection[]>;
  createDataProtectionEntry(dataProtection: InsertDataProtection): Promise<DataProtection>;

  // Security metrics
  getCompanyMetrics(companyId: string, metricType?: string): Promise<SecurityMetrics[]>;
  createMetric(metric: InsertSecurityMetrics): Promise<SecurityMetrics>;

  // Analytics
  getCompanySecurityScore(companyId: string): Promise<number>;
  getOverallStats(): Promise<any>;
}

export class EnterpriseStorage implements IEnterpriseStorage {
  async getAllCompanies(): Promise<Company[]> {
    return await enterpriseDb.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompanyById(id: string): Promise<Company | undefined> {
    const [company] = await enterpriseDb.select().from(companies).where(eq(companies.id, id));
    return company;
  }

  async getCompanyByDomain(domain: string): Promise<Company | undefined> {
    const [company] = await enterpriseDb.select().from(companies).where(eq(companies.domain, domain));
    return company;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await enterpriseDb
      .insert(companies)
      .values(insertCompany)
      .returning();
    return company;
  }

  async updateCompany(id: string, updates: Partial<Company>): Promise<Company | undefined> {
    const [company] = await enterpriseDb
      .update(companies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return company;
  }

  async deleteCompany(id: string): Promise<boolean> {
    const result = await enterpriseDb
      .delete(companies)
      .where(eq(companies.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getCompanyUsers(companyId: string): Promise<CompanyUser[]> {
    return await enterpriseDb
      .select()
      .from(companyUsers)
      .where(eq(companyUsers.companyId, companyId))
      .orderBy(desc(companyUsers.createdAt));
  }

  async createCompanyUser(insertUser: InsertCompanyUser): Promise<CompanyUser> {
    const [user] = await enterpriseDb
      .insert(companyUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<CompanyUser | undefined> {
    const [user] = await enterpriseDb
      .select()
      .from(companyUsers)
      .where(eq(companyUsers.email, email));
    return user;
  }

  async getCompanyAssessments(companyId: string): Promise<SecurityAssessment[]> {
    return await enterpriseDb
      .select()
      .from(securityAssessments)
      .where(eq(securityAssessments.companyId, companyId))
      .orderBy(desc(securityAssessments.createdAt));
  }

  async createAssessment(insertAssessment: InsertSecurityAssessment): Promise<SecurityAssessment> {
    const [assessment] = await enterpriseDb
      .insert(securityAssessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }

  async updateAssessmentStatus(id: string, status: string): Promise<SecurityAssessment | undefined> {
    const [assessment] = await enterpriseDb
      .update(securityAssessments)
      .set({ status, updatedAt: new Date() })
      .where(eq(securityAssessments.id, id))
      .returning();
    return assessment;
  }

  async getCompanyIncidents(companyId: string): Promise<SecurityIncident[]> {
    return await enterpriseDb
      .select()
      .from(securityIncidents)
      .where(eq(securityIncidents.companyId, companyId))
      .orderBy(desc(securityIncidents.detectedAt));
  }

  async createIncident(insertIncident: InsertSecurityIncident): Promise<SecurityIncident> {
    const [incident] = await enterpriseDb
      .insert(securityIncidents)
      .values(insertIncident)
      .returning();
    return incident;
  }

  async updateIncidentStatus(id: string, status: string): Promise<SecurityIncident | undefined> {
    const [incident] = await enterpriseDb
      .update(securityIncidents)
      .set({ status, updatedAt: new Date() })
      .where(eq(securityIncidents.id, id))
      .returning();
    return incident;
  }

  async getCompanyThreats(companyId: string): Promise<ThreatMonitoring[]> {
    return await enterpriseDb
      .select()
      .from(threatMonitoring)
      .where(eq(threatMonitoring.companyId, companyId))
      .orderBy(desc(threatMonitoring.firstSeen));
  }

  async createThreatEntry(insertThreat: InsertThreatMonitoring): Promise<ThreatMonitoring> {
    const [threat] = await enterpriseDb
      .insert(threatMonitoring)
      .values(insertThreat)
      .returning();
    return threat;
  }

  async getCompanyCompliance(companyId: string): Promise<ComplianceTracking[]> {
    return await enterpriseDb
      .select()
      .from(complianceTracking)
      .where(eq(complianceTracking.companyId, companyId))
      .orderBy(desc(complianceTracking.createdAt));
  }

  async createComplianceEntry(insertCompliance: InsertComplianceTracking): Promise<ComplianceTracking> {
    const [compliance] = await enterpriseDb
      .insert(complianceTracking)
      .values(insertCompliance)
      .returning();
    return compliance;
  }

  async getCompanyDataProtection(companyId: string): Promise<DataProtection[]> {
    return await enterpriseDb
      .select()
      .from(dataProtection)
      .where(eq(dataProtection.companyId, companyId))
      .orderBy(desc(dataProtection.createdAt));
  }

  async createDataProtectionEntry(insertDataProtection: InsertDataProtection): Promise<DataProtection> {
    const [dataProtectionEntry] = await enterpriseDb
      .insert(dataProtection)
      .values(insertDataProtection)
      .returning();
    return dataProtectionEntry;
  }

  async getCompanyMetrics(companyId: string, metricType?: string): Promise<SecurityMetrics[]> {
    if (metricType) {
      return await enterpriseDb
        .select()
        .from(securityMetrics)
        .where(sql`${securityMetrics.companyId} = ${companyId} AND ${securityMetrics.metricType} = ${metricType}`)
        .orderBy(desc(securityMetrics.timestamp));
    }

    return await enterpriseDb
      .select()
      .from(securityMetrics)
      .where(eq(securityMetrics.companyId, companyId))
      .orderBy(desc(securityMetrics.timestamp));
  }

  async createMetric(insertMetric: InsertSecurityMetrics): Promise<SecurityMetrics> {
    const [metric] = await enterpriseDb
      .insert(securityMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  async getCompanySecurityScore(companyId: string): Promise<number> {
    const [result] = await enterpriseDb
      .select({ score: companies.securityScore })
      .from(companies)
      .where(eq(companies.id, companyId));
    
    return result?.score ? parseFloat(result.score) : 0;
  }

  async getOverallStats(): Promise<any> {
    const [companyCount] = await enterpriseDb
      .select({ count: count() })
      .from(companies);

    const [avgSecurityScore] = await enterpriseDb
      .select({ avg: avg(companies.securityScore) })
      .from(companies);

    const [incidentCount] = await enterpriseDb
      .select({ count: count() })
      .from(securityIncidents)
      .where(eq(securityIncidents.status, 'open'));

    const [threatCount] = await enterpriseDb
      .select({ count: count() })
      .from(threatMonitoring)
      .where(eq(threatMonitoring.status, 'active'));

    return {
      totalCompanies: companyCount.count,
      averageSecurityScore: avgSecurityScore.avg ? parseFloat(avgSecurityScore.avg) : 0,
      activeIncidents: incidentCount.count,
      activeThreats: threatCount.count
    };
  }
}

export const enterpriseStorage = new EnterpriseStorage();