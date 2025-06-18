import { z } from 'zod';

export const SecurityLayerSchema = z.enum(['layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'temp_founder']);
export type SecurityLayer = z.infer<typeof SecurityLayerSchema>;

export interface SecurityLayerConfig {
  id: SecurityLayer;
  name: string;
  description: string;
  userType: string;
  accessLevel: number;
  maxAnalysisPerDay: number;
  features: string[];
  restrictions: string[];
  pricing: {
    tier: 'free' | 'basic' | 'professional' | 'enterprise';
    monthlyPrice?: number;
    yearlyPrice?: number;
  };
  apiLimits: {
    requestsPerHour: number;
    requestsPerDay: number;
    fileUploadSizeMB: number;
  };
  dataRetention: {
    analysisDays: number;
    reportDays: number;
    logDays: number;
  };
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
}

export const SECURITY_LAYERS: Record<SecurityLayer, SecurityLayerConfig> = {
  layer1: {
    id: 'layer1',
    name: 'Community Guardian',
    description: 'Essential security tools for everyday users',
    userType: 'Individual Users',
    accessLevel: 1,
    maxAnalysisPerDay: 10,
    features: [
      'Basic file scanning',
      'Simple threat detection',
      'Educational security tips',
      'Basic phishing detection',
      'Password strength checker',
      'Safe browsing alerts',
      'Basic malware detection',
      'Security awareness training'
    ],
    restrictions: [
      'Limited to 10 scans per day',
      'Basic analysis only',
      'No advanced features',
      'Community support only',
      'No API access',
      'Limited file types',
      'Basic reporting'
    ],
    pricing: {
      tier: 'free'
    },
    apiLimits: {
      requestsPerHour: 5,
      requestsPerDay: 10,
      fileUploadSizeMB: 10
    },
    dataRetention: {
      analysisDays: 7,
      reportDays: 3,
      logDays: 1
    },
    supportLevel: 'community'
  },
  layer2: {
    id: 'layer2',
    name: 'Corporate Shield',
    description: 'Advanced security analytics for businesses',
    userType: 'Companies & Organizations',
    accessLevel: 2,
    maxAnalysisPerDay: 100,
    features: [
      'Advanced threat analysis',
      'Data visualization dashboards',
      'Behavioral pattern analysis',
      'Network security monitoring',
      'Incident response tools',
      'Compliance reporting',
      'Team collaboration features',
      'Custom security policies',
      'Automated threat detection',
      'Risk assessment reports',
      'Multi-user management',
      'Integration APIs',
      'Real-time monitoring',
      'Advanced forensics'
    ],
    restrictions: [
      'Limited to 100 scans per day',
      'No developer tools access',
      'Standard API rate limits',
      'Email support only'
    ],
    pricing: {
      tier: 'professional',
      monthlyPrice: 99,
      yearlyPrice: 999
    },
    apiLimits: {
      requestsPerHour: 50,
      requestsPerDay: 100,
      fileUploadSizeMB: 100
    },
    dataRetention: {
      analysisDays: 30,
      reportDays: 90,
      logDays: 30
    },
    supportLevel: 'email'
  },
  layer3: {
    id: 'layer3',
    name: 'Developer Arsenal',
    description: 'Advanced development tools with API access and integration capabilities',
    userType: 'Developers & Technical Teams',
    accessLevel: 3,
    maxAnalysisPerDay: 500,
    features: [
      'Full REST API access with authentication tokens',
      'Custom integration development tools',
      'Webhook and real-time notification systems',
      'Advanced scripting and automation capabilities',
      'Custom dashboard and widget development',
      'Third-party security tool integrations',
      'Development sandbox environment',
      'Technical documentation and SDKs',
      'Priority developer support',
      'Source code analysis tools',
      'Custom rule engines',
      'Advanced debugging tools',
      'Plugin development framework'
    ],
    restrictions: [
      'Limited to 500 scans per day',
      'No enterprise collaboration features',
      'Developer support only'
    ],
    pricing: {
      tier: 'professional',
      monthlyPrice: 299,
      yearlyPrice: 2999
    },
    apiLimits: {
      requestsPerHour: 150,
      requestsPerDay: 500,
      fileUploadSizeMB: 250
    },
    dataRetention: {
      analysisDays: 60,
      reportDays: 180,
      logDays: 60
    },
    supportLevel: 'priority'
  },
  layer4: {
    id: 'layer4',
    name: 'Enterprise Command',
    description: 'Comprehensive threat intelligence with team collaboration features',
    userType: 'Enterprise Organizations',
    accessLevel: 4,
    maxAnalysisPerDay: 1000,
    features: [
      'All Developer features included',
      'Full MISP & OpenCTI integration',
      'Machine learning threat predictions',
      'Real-time team collaboration tools',
      'Advanced export capabilities (PDF, DOCX, JSON, STIX)',
      'Custom threat intelligence dashboards',
      'Interactive security awareness games',
      'Personalized security recommendations',
      'One-click security health reports',
      'Advanced analytics and reporting',
      'Multi-tenant management',
      'Custom workflows and automation',
      'Enterprise SSO integration',
      'Advanced compliance tools'
    ],
    restrictions: [
      'Limited to 1000 scans per day',
      'No founder-level administration',
      'Enterprise support only'
    ],
    pricing: {
      tier: 'enterprise',
      monthlyPrice: 999,
      yearlyPrice: 9999
    },
    apiLimits: {
      requestsPerHour: 300,
      requestsPerDay: 1000,
      fileUploadSizeMB: 500
    },
    dataRetention: {
      analysisDays: 90,
      reportDays: 365,
      logDays: 90
    },
    supportLevel: 'priority'
  },
  layer5: {
    id: 'layer5',
    name: 'Founder Nexus',
    description: 'Ultimate system control with founder-level privileges',
    userType: 'Founders & System Administrators',
    accessLevel: 5,
    maxAnalysisPerDay: -1, // Unlimited
    features: [
      'Unlimited system access',
      'Complete system administration',
      'Advanced AI model control',
      'Quantum processing access',
      'Neural network configuration',
      'System architecture control',
      'Global threat intelligence',
      'Advanced forensic capabilities',
      'System performance tuning',
      'Database administration',
      'Security policy enforcement',
      'Global monitoring dashboard',
      'Advanced user management',
      'System backup and recovery',
      'Advanced threat hunting',
      'Custom AI model deployment',
      'Infrastructure management',
      'Security architecture design',
      'Advanced compliance tools',
      'Executive reporting',
      'Strategic threat analysis',
      'Advanced incident response',
      'System optimization tools',
      'Advanced authentication',
      'Multi-tenant management'
    ],
    restrictions: [
      'Requires founder authentication',
      'Restricted access controls'
    ],
    pricing: {
      tier: 'enterprise'
    },
    apiLimits: {
      requestsPerHour: -1, // Unlimited
      requestsPerDay: -1,  // Unlimited
      fileUploadSizeMB: 1000
    },
    dataRetention: {
      analysisDays: 365,
      reportDays: 1095, // 3 years
      logDays: 365
    },
    supportLevel: 'dedicated'
  },
  temp_founder: {
    id: 'temp_founder',
    name: 'Temporary Founder Access',
    description: 'Limited-time founder privileges granted by main founder',
    userType: 'Temporary Administrators',
    accessLevel: 3.5, // Between Layer 3 and Layer 4
    maxAnalysisPerDay: 500,
    features: [
      'Security layer management',
      'User access control',
      'Advanced monitoring',
      'System configuration',
      'Security policy management',
      'Audit trail access',
      'Incident response tools',
      'Advanced reporting',
      'Team management',
      'Limited AI model access',
      'Advanced threat analysis',
      'Compliance monitoring',
      'Emergency response tools'
    ],
    restrictions: [
      'Cannot grant permanent founder access',
      'Cannot modify core system architecture',
      'Limited to 30-day access periods',
      'Cannot access founder financial data',
      'Requires renewal by main founder'
    ],
    pricing: {
      tier: 'enterprise',
      monthlyPrice: 0 // Granted by main founder only
    },
    apiLimits: {
      requestsPerHour: 300,
      requestsPerDay: 2000,
      fileUploadSizeMB: 1000
    },
    dataRetention: {
      analysisDays: 365,
      reportDays: 365,
      logDays: 180
    },
    supportLevel: 'dedicated'
  }
};

export interface UserSecurityAccess {
  userId: string;
  layer: SecurityLayer;
  grantedAt: Date;
  grantedBy?: string;
  expiresAt?: Date;
  isActive: boolean;
  permissions: string[];
  restrictions: string[];
}

export interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  currentLayer: SecurityLayer;
  requestedLayer: SecurityLayer;
  reason: string;
  businessJustification?: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
}

export const getSecurityLayerConfig = (layer: SecurityLayer): SecurityLayerConfig => {
  return SECURITY_LAYERS[layer];
};

export const hasFeatureAccess = (userLayer: SecurityLayer, requiredFeature: string): boolean => {
  const config = getSecurityLayerConfig(userLayer);
  return config.features.includes(requiredFeature);
};

export const canAccessLayer = (userLayer: SecurityLayer, targetLayer: SecurityLayer): boolean => {
  const userConfig = getSecurityLayerConfig(userLayer);
  const targetConfig = getSecurityLayerConfig(targetLayer);
  return userConfig.accessLevel >= targetConfig.accessLevel;
};

export const getRemainingDailyAnalysis = (
  userLayer: SecurityLayer,
  usedToday: number
): number => {
  const config = getSecurityLayerConfig(userLayer);
  if (config.maxAnalysisPerDay === -1) return -1; // Unlimited
  return Math.max(0, config.maxAnalysisPerDay - usedToday);
};

export const getUpgradeRecommendation = (
  currentLayer: SecurityLayer,
  requestedFeatures: string[]
): SecurityLayer | null => {
  const currentConfig = getSecurityLayerConfig(currentLayer);
  
  for (const feature of requestedFeatures) {
    if (!currentConfig.features.includes(feature)) {
      // Find the lowest layer that has this feature
      for (const [layerId, config] of Object.entries(SECURITY_LAYERS)) {
        if (config.features.includes(feature) && config.accessLevel > currentConfig.accessLevel) {
          return layerId as SecurityLayer;
        }
      }
    }
  }
  
  return null;
};