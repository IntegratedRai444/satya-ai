import { enterpriseStorage } from "./enterprise-storage";

export async function seedEnterpriseData() {
  try {
    // Create sample companies
    const companies = [
      {
        name: "TechCorp Industries",
        domain: "techcorp.com",
        industry: "Technology",
        size: "medium",
        plan: "enterprise",
        contactEmail: "security@techcorp.com",
        phone: "+1-555-0123",
        address: "123 Tech Plaza, Silicon Valley, CA 94105",
        website: "https://techcorp.com",
        foundedYear: 2015,
        employees: 250,
        revenue: "50000000.00",
        securityScore: "92.5",
        riskLevel: "low"
      },
      {
        name: "FinanceFlow LLC",
        domain: "financeflow.com",
        industry: "Finance",
        size: "large",
        plan: "sovereign",
        contactEmail: "ciso@financeflow.com",
        phone: "+1-555-0456",
        address: "456 Wall Street, New York, NY 10005",
        website: "https://financeflow.com",
        foundedYear: 2010,
        employees: 850,
        revenue: "150000000.00",
        securityScore: "96.8",
        riskLevel: "low"
      },
      {
        name: "HealthTech Startup",
        domain: "healthtech.io",
        industry: "Healthcare",
        size: "startup",
        plan: "professional",
        contactEmail: "security@healthtech.io",
        phone: "+1-555-0789",
        address: "789 Innovation Drive, Austin, TX 78701",
        website: "https://healthtech.io",
        foundedYear: 2020,
        employees: 45,
        revenue: "5000000.00",
        securityScore: "78.3",
        riskLevel: "medium"
      },
      {
        name: "RetailMax Corporation",
        domain: "retailmax.com",
        industry: "Retail",
        size: "large",
        plan: "enterprise",
        contactEmail: "it-security@retailmax.com",
        phone: "+1-555-0321",
        address: "321 Commerce Blvd, Chicago, IL 60601",
        website: "https://retailmax.com",
        foundedYear: 2005,
        employees: 1200,
        revenue: "250000000.00",
        securityScore: "85.7",
        riskLevel: "medium"
      },
      {
        name: "CloudFirst Solutions",
        domain: "cloudfirst.io",
        industry: "Cloud Services",
        size: "medium",
        plan: "professional",
        contactEmail: "security@cloudfirst.io",
        phone: "+1-555-0654",
        address: "654 Cloud Avenue, Seattle, WA 98101",
        website: "https://cloudfirst.io",
        foundedYear: 2018,
        employees: 180,
        revenue: "25000000.00",
        securityScore: "89.4",
        riskLevel: "low"
      }
    ];

    const createdCompanies = [];
    for (const companyData of companies) {
      try {
        const existingCompany = await enterpriseStorage.getCompanyByDomain(companyData.domain);
        if (!existingCompany) {
          const company = await enterpriseStorage.createCompany(companyData);
          createdCompanies.push(company);
          console.log(`Created company: ${company.name}`);
        }
      } catch (error) {
        console.log(`Company ${companyData.name} might already exist, skipping...`);
      }
    }

    // Create sample incidents for the companies
    if (createdCompanies.length > 0) {
      const sampleIncidents = [
        {
          companyId: createdCompanies[0].id,
          title: "Suspicious Login Activity Detected",
          description: "Multiple failed login attempts from unusual geographic locations",
          incidentType: "unauthorized_access",
          severity: "medium",
          status: "investigating",
          affectedSystems: ["user_portal", "admin_dashboard"],
          impactLevel: "moderate",
          detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          reportedBy: "Automated Security System",
          assignedTo: "Security Team Alpha"
        },
        {
          companyId: createdCompanies[1].id,
          title: "Phishing Email Campaign Intercepted",
          description: "Large-scale phishing campaign targeting employee credentials",
          incidentType: "phishing",
          severity: "high",
          status: "contained",
          affectedSystems: ["email_system"],
          impactLevel: "significant",
          detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          reportedBy: "Email Security Gateway",
          assignedTo: "Incident Response Team"
        },
        {
          companyId: createdCompanies[2].id,
          title: "Ransomware Attempt Blocked",
          description: "Attempted ransomware deployment blocked by endpoint protection",
          incidentType: "malware",
          severity: "critical",
          status: "resolved",
          affectedSystems: ["endpoint_01", "file_server"],
          impactLevel: "minimal",
          detectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
          reportedBy: "Endpoint Detection and Response",
          assignedTo: "Malware Analysis Team"
        }
      ];

      for (const incident of sampleIncidents) {
        try {
          await enterpriseStorage.createIncident(incident);
          console.log(`Created incident: ${incident.title}`);
        } catch (error) {
          console.log(`Error creating incident: ${error}`);
        }
      }

      // Create sample threat monitoring entries
      const sampleThreats = [
        {
          companyId: createdCompanies[0].id,
          threatType: "Advanced Persistent Threat",
          threatSource: "State-sponsored actor",
          severity: "high",
          status: "active",
          confidence: "0.87",
          indicators: ["suspicious_network_traffic", "unusual_file_access"],
          mitreAttackIds: ["T1071", "T1005"],
          affectedAssets: ["web_server", "database"],
          detectionMethod: "Behavioral Analysis",
          firstSeen: new Date(Date.now() - 48 * 60 * 60 * 1000),
          lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          companyId: createdCompanies[1].id,
          threatType: "Cryptocurrency Mining",
          threatSource: "Opportunistic attacker",
          severity: "medium",
          status: "active",
          confidence: "0.92",
          indicators: ["high_cpu_usage", "suspicious_network_connections"],
          mitreAttackIds: ["T1496"],
          affectedAssets: ["workstation_pool"],
          detectionMethod: "Resource Monitoring",
          firstSeen: new Date(Date.now() - 12 * 60 * 60 * 1000),
          lastSeen: new Date(Date.now() - 30 * 60 * 1000)
        }
      ];

      for (const threat of sampleThreats) {
        try {
          await enterpriseStorage.createThreatEntry(threat);
          console.log(`Created threat entry: ${threat.threatType}`);
        } catch (error) {
          console.log(`Error creating threat: ${error}`);
        }
      }

      // Create sample compliance tracking
      const sampleCompliance = [
        {
          companyId: createdCompanies[1].id, // FinanceFlow (financial services)
          framework: "sox",
          status: "compliant",
          overallScore: "94.2",
          controlsTotal: 150,
          controlsImplemented: 142,
          controlsPartial: 6,
          controlsFailed: 2,
          lastAudit: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
          nextAudit: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          auditor: "External Security Auditors LLC"
        },
        {
          companyId: createdCompanies[2].id, // HealthTech (healthcare)
          framework: "hipaa",
          status: "in_progress",
          overallScore: "78.5",
          controlsTotal: 180,
          controlsImplemented: 120,
          controlsPartial: 35,
          controlsFailed: 25,
          lastAudit: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          auditor: "Healthcare Compliance Specialists"
        }
      ];

      for (const compliance of sampleCompliance) {
        try {
          await enterpriseStorage.createComplianceEntry(compliance);
          console.log(`Created compliance entry: ${compliance.framework.toUpperCase()}`);
        } catch (error) {
          console.log(`Error creating compliance entry: ${error}`);
        }
      }
    }

    console.log("Enterprise seed data creation completed");
    return { success: true, companiesCreated: createdCompanies.length };
  } catch (error) {
    console.error("Error seeding enterprise data:", error);
    return { success: false, error: error.message };
  }
}