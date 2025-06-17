import { db } from './db';
import { companies, securityAssessments, securityIncidents, enterpriseMetrics } from '@shared/schema';

async function seedEnterpriseData() {
  try {
    console.log('Seeding enterprise data...');

    // Insert sample companies
    const companyData = [
      {
        id: 'techcorp-2024',
        name: 'TechCorp Industries',
        domain: 'techcorp.com',
        industry: 'Technology',
        size: 'Enterprise',
        plan: 'quantum_shield',
        contactEmail: 'security@techcorp.com',
        phone: '+1-555-0123',
        website: 'https://techcorp.com',
        employees: 2500,
        securityScore: 97.8,
        riskLevel: 'low'
      },
      {
        id: 'financeflow-corp',
        name: 'FinanceFlow Corporation',
        domain: 'financeflow.com',
        industry: 'Financial Services',
        size: 'Large Enterprise',
        plan: 'sovereign_protection',
        contactEmail: 'ciso@financeflow.com',
        phone: '+1-555-0456',
        website: 'https://financeflow.com',
        employees: 8500,
        securityScore: 99.2,
        riskLevel: 'very_low'
      },
      {
        id: 'healthtech-innovations',
        name: 'HealthTech Innovations',
        domain: 'healthtech.io',
        industry: 'Healthcare',
        size: 'Medium',
        plan: 'medical_secure',
        contactEmail: 'compliance@healthtech.io',
        phone: '+1-555-0789',
        website: 'https://healthtech.io',
        employees: 750,
        securityScore: 94.6,
        riskLevel: 'low'
      },
      {
        id: 'cloudfirst-solutions',
        name: 'CloudFirst Solutions',
        domain: 'cloudfirst.io',
        industry: 'Cloud Infrastructure',
        size: 'Medium',
        plan: 'quantum_core',
        contactEmail: 'security@cloudfirst.io',
        phone: '+1-555-0321',
        website: 'https://cloudfirst.io',
        employees: 450,
        securityScore: 96.4,
        riskLevel: 'very_low'
      }
    ];

    await db.insert(companies).values(companyData).onConflictDoNothing();

    // Insert security assessments
    const assessmentData = [
      {
        id: 'assessment-1',
        companyId: 'techcorp-2024',
        name: 'Q4 2024 Security Assessment',
        type: 'comprehensive',
        status: 'completed',
        severity: 'medium',
        description: 'Quarterly comprehensive security assessment covering all infrastructure',
        score: 94.5,
        completedAt: new Date()
      },
      {
        id: 'assessment-2',
        companyId: 'financeflow-corp',
        name: 'Annual Compliance Audit',
        type: 'compliance',
        status: 'in_progress',
        severity: 'high',
        description: 'Annual SOX and PCI-DSS compliance assessment',
        score: 98.2
      },
      {
        id: 'assessment-3',
        companyId: 'healthtech-innovations',
        name: 'HIPAA Compliance Review',
        type: 'compliance',
        status: 'completed',
        severity: 'high',
        description: 'HIPAA compliance assessment for patient data protection',
        score: 96.1,
        completedAt: new Date()
      }
    ];

    await db.insert(securityAssessments).values(assessmentData).onConflictDoNothing();

    // Insert security incidents
    const incidentData = [
      {
        id: 'incident-1',
        companyId: 'techcorp-2024',
        title: 'Suspicious Login Attempts',
        description: 'Multiple failed login attempts detected from unusual geographic locations',
        severity: 'medium',
        status: 'investigating',
        type: 'authentication',
        source: 'internal_monitoring'
      },
      {
        id: 'incident-2',
        companyId: 'financeflow-corp',
        title: 'Phishing Email Campaign',
        description: 'Targeted phishing emails sent to finance department employees',
        severity: 'high',
        status: 'resolved',
        type: 'phishing',
        source: 'email_security',
        resolvedAt: new Date()
      },
      {
        id: 'incident-3',
        companyId: 'healthtech-innovations',
        title: 'Unauthorized Data Access Attempt',
        description: 'Attempt to access patient records database without proper authorization',
        severity: 'critical',
        status: 'open',
        type: 'data_breach',
        source: 'database_monitoring'
      }
    ];

    await db.insert(securityIncidents).values(incidentData).onConflictDoNothing();

    // Insert real-time metrics
    const metricsData = [
      {
        id: 'metric-1',
        companyId: 'techcorp-2024',
        metricType: 'threats_blocked',
        value: 1247,
        unit: 'count',
        period: 'daily'
      },
      {
        id: 'metric-2',
        companyId: 'financeflow-corp',
        metricType: 'security_score',
        value: 99.2,
        unit: 'percentage',
        period: 'current'
      },
      {
        id: 'metric-3',
        companyId: 'healthtech-innovations',
        metricType: 'compliance_score',
        value: 96.1,
        unit: 'percentage',
        period: 'current'
      },
      {
        id: 'metric-4',
        companyId: 'cloudfirst-solutions',
        metricType: 'active_scans',
        value: 847,
        unit: 'count',
        period: 'hourly'
      }
    ];

    await db.insert(enterpriseMetrics).values(metricsData).onConflictDoNothing();

    console.log('Enterprise data seeded successfully!');
  } catch (error) {
    console.error('Error seeding enterprise data:', error);
  }
}

// Run seeding
seedEnterpriseData().then(() => {
  console.log('Seeding complete');
  process.exit(0);
});

export { seedEnterpriseData };