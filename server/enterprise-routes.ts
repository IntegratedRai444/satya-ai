import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { enterpriseStorage } from "./enterprise-storage";
import { 
  insertCompanySchema, 
  insertCompanyUserSchema, 
  insertSecurityAssessmentSchema,
  insertSecurityIncidentSchema,
  insertThreatMonitoringSchema,
  insertComplianceTrackingSchema,
  insertDataProtectionSchema,
  insertSecurityMetricsSchema
} from "@shared/enterprise-schema";
import { seedEnterpriseData } from "./enterprise-seed";
import WebSocket from "ws";

export async function registerEnterpriseRoutes(app: Express): Promise<Server> {
  // Companies endpoints
  app.get("/api/enterprise/companies", async (req, res) => {
    try {
      const companies = await enterpriseStorage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/enterprise/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const company = await enterpriseStorage.getCompanyById(id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.post("/api/enterprise/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await enterpriseStorage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: "Invalid company data" });
    }
  });

  app.put("/api/enterprise/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const company = await enterpriseStorage.updateCompany(id, req.body);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to update company" });
    }
  });

  // Company users endpoints
  app.get("/api/enterprise/companies/:companyId/users", async (req, res) => {
    try {
      const { companyId } = req.params;
      const users = await enterpriseStorage.getCompanyUsers(companyId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/users", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertCompanyUserSchema.parse({ ...req.body, companyId });
      const user = await enterpriseStorage.createCompanyUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Security assessments endpoints
  app.get("/api/enterprise/companies/:companyId/assessments", async (req, res) => {
    try {
      const { companyId } = req.params;
      const assessments = await enterpriseStorage.getCompanyAssessments(companyId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/assessments", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertSecurityAssessmentSchema.parse({ ...req.body, companyId });
      const assessment = await enterpriseStorage.createAssessment(validatedData);
      res.status(201).json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  app.put("/api/enterprise/assessments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const assessment = await enterpriseStorage.updateAssessmentStatus(id, status);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assessment status" });
    }
  });

  // Security incidents endpoints
  app.get("/api/enterprise/companies/:companyId/incidents", async (req, res) => {
    try {
      const { companyId } = req.params;
      const incidents = await enterpriseStorage.getCompanyIncidents(companyId);
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch incidents" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/incidents", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertSecurityIncidentSchema.parse({ 
        ...req.body, 
        companyId,
        detectedAt: new Date()
      });
      const incident = await enterpriseStorage.createIncident(validatedData);
      res.status(201).json(incident);
    } catch (error) {
      res.status(400).json({ error: "Invalid incident data" });
    }
  });

  app.put("/api/enterprise/incidents/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const incident = await enterpriseStorage.updateIncidentStatus(id, status);
      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }
      res.json(incident);
    } catch (error) {
      res.status(500).json({ error: "Failed to update incident status" });
    }
  });

  // Threat monitoring endpoints
  app.get("/api/enterprise/companies/:companyId/threats", async (req, res) => {
    try {
      const { companyId } = req.params;
      const threats = await enterpriseStorage.getCompanyThreats(companyId);
      res.json(threats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch threats" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/threats", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertThreatMonitoringSchema.parse({ 
        ...req.body, 
        companyId,
        firstSeen: new Date(),
        lastSeen: new Date()
      });
      const threat = await enterpriseStorage.createThreatEntry(validatedData);
      res.status(201).json(threat);
    } catch (error) {
      res.status(400).json({ error: "Invalid threat data" });
    }
  });

  // Compliance tracking endpoints
  app.get("/api/enterprise/companies/:companyId/compliance", async (req, res) => {
    try {
      const { companyId } = req.params;
      const compliance = await enterpriseStorage.getCompanyCompliance(companyId);
      res.json(compliance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch compliance data" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/compliance", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertComplianceTrackingSchema.parse({ ...req.body, companyId });
      const compliance = await enterpriseStorage.createComplianceEntry(validatedData);
      res.status(201).json(compliance);
    } catch (error) {
      res.status(400).json({ error: "Invalid compliance data" });
    }
  });

  // Data protection endpoints
  app.get("/api/enterprise/companies/:companyId/data-protection", async (req, res) => {
    try {
      const { companyId } = req.params;
      const dataProtection = await enterpriseStorage.getCompanyDataProtection(companyId);
      res.json(dataProtection);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data protection info" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/data-protection", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertDataProtectionSchema.parse({ ...req.body, companyId });
      const dataProtection = await enterpriseStorage.createDataProtectionEntry(validatedData);
      res.status(201).json(dataProtection);
    } catch (error) {
      res.status(400).json({ error: "Invalid data protection data" });
    }
  });

  // Security metrics endpoints
  app.get("/api/enterprise/companies/:companyId/metrics", async (req, res) => {
    try {
      const { companyId } = req.params;
      const { type } = req.query;
      const metrics = await enterpriseStorage.getCompanyMetrics(companyId, type as string);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  app.post("/api/enterprise/companies/:companyId/metrics", async (req, res) => {
    try {
      const { companyId } = req.params;
      const validatedData = insertSecurityMetricsSchema.parse({ 
        ...req.body, 
        companyId,
        timestamp: new Date()
      });
      const metric = await enterpriseStorage.createMetric(validatedData);
      res.status(201).json(metric);
    } catch (error) {
      res.status(400).json({ error: "Invalid metric data" });
    }
  });

  // Analytics endpoints
  app.get("/api/enterprise/analytics/overview", async (req, res) => {
    try {
      const stats = await enterpriseStorage.getOverallStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Seed data endpoint
  app.post("/api/enterprise/seed", async (req, res) => {
    try {
      const result = await seedEnterpriseData();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to seed data" });
    }
  });

  app.get("/api/enterprise/companies/:companyId/security-score", async (req, res) => {
    try {
      const { companyId } = req.params;
      const score = await enterpriseStorage.getCompanySecurityScore(companyId);
      res.json({ securityScore: score });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch security score" });
    }
  });

  // Real-time dashboard data
  app.get("/api/enterprise/dashboard/:companyId", async (req, res) => {
    try {
      const { companyId } = req.params;
      
      const [company, incidents, threats, assessments, compliance, metrics] = await Promise.all([
        enterpriseStorage.getCompanyById(companyId),
        enterpriseStorage.getCompanyIncidents(companyId),
        enterpriseStorage.getCompanyThreats(companyId),
        enterpriseStorage.getCompanyAssessments(companyId),
        enterpriseStorage.getCompanyCompliance(companyId),
        enterpriseStorage.getCompanyMetrics(companyId)
      ]);

      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      const dashboardData = {
        company,
        summary: {
          activeIncidents: incidents.filter(i => i.status === 'open').length,
          activeThreats: threats.filter(t => t.status === 'active').length,
          completedAssessments: assessments.filter(a => a.status === 'completed').length,
          complianceFrameworks: compliance.length,
          securityScore: parseFloat(company.securityScore || '0')
        },
        recentIncidents: incidents.slice(0, 5),
        activeThreats: threats.filter(t => t.status === 'active').slice(0, 10),
        latestAssessments: assessments.slice(0, 3),
        complianceStatus: compliance,
        securityTrends: metrics.slice(0, 20)
      };

      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  // WebSocket for real-time updates
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/enterprise-ws' });

  interface ExtendedWebSocket extends WebSocket {
    companyId?: string;
  }

  wss.on('connection', (ws: ExtendedWebSocket) => {
    console.log('Enterprise client connected');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        // Handle client messages (subscribe to company updates, etc.)
        if (data.type === 'subscribe' && data.companyId) {
          ws.companyId = data.companyId;
        }
      } catch (error) {
        console.error('Invalid message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Enterprise client disconnected');
    });
  });

  // Broadcast updates to subscribed clients
  setInterval(async () => {
    if (wss.clients.size > 0) {
      const stats = await enterpriseStorage.getOverallStats();
      const message = JSON.stringify({
        type: 'stats_update',
        data: stats,
        timestamp: new Date().toISOString()
      });

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }, 5000);

  return httpServer;
}