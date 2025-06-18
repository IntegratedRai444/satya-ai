import { SecurityLayer, SecurityLayerConfig, UserSecurityAccess, AccessRequest, SECURITY_LAYERS, getSecurityLayerConfig, hasFeatureAccess, canAccessLayer, getRemainingDailyAnalysis } from '@shared/securityLayers';

interface UserAnalyticsData {
  userId: string;
  analysisCount: number;
  lastAnalysis: Date;
  totalAnalysisThisMonth: number;
  securityScore: number;
  threatsDetected: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityLayerMetrics {
  layer: SecurityLayer;
  activeUsers: number;
  dailyAnalysis: number;
  monthlyRevenue: number;
  averageSecurityScore: number;
  totalThreatsDetected: number;
}

export class SecurityLayerService {
  private userAccess: Map<string, UserSecurityAccess> = new Map();
  private userAnalytics: Map<string, UserAnalyticsData> = new Map();
  private dailyUsage: Map<string, number> = new Map();
  private accessRequests: Map<string, AccessRequest> = new Map();

  constructor() {
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers() {
    // Initialize with some sample users for demonstration
    const sampleUsers = [
      { id: 'user1', layer: 'layer1' as SecurityLayer, name: 'John Doe' },
      { id: 'user2', layer: 'layer2' as SecurityLayer, name: 'Jane Smith' },
      { id: 'user3', layer: 'layer3' as SecurityLayer, name: 'Mike Johnson' },
      { id: 'founder', layer: 'layer4' as SecurityLayer, name: 'System Founder' }
    ];

    sampleUsers.forEach(user => {
      this.userAccess.set(user.id, {
        userId: user.id,
        layer: user.layer,
        grantedAt: new Date(),
        isActive: true,
        permissions: SECURITY_LAYERS[user.layer].features,
        restrictions: SECURITY_LAYERS[user.layer].restrictions
      });

      this.userAnalytics.set(user.id, {
        userId: user.id,
        analysisCount: Math.floor(Math.random() * 50),
        lastAnalysis: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        totalAnalysisThisMonth: Math.floor(Math.random() * 200),
        securityScore: Math.floor(Math.random() * 30) + 70,
        threatsDetected: Math.floor(Math.random() * 20),
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
      });
    });
  }

  async getUserSecurityLayer(userId: string): Promise<UserSecurityAccess | null> {
    return this.userAccess.get(userId) || null;
  }

  async updateUserSecurityLayer(
    userId: string, 
    newLayer: SecurityLayer, 
    grantedBy?: string
  ): Promise<boolean> {
    const config = getSecurityLayerConfig(newLayer);
    
    this.userAccess.set(userId, {
      userId,
      layer: newLayer,
      grantedAt: new Date(),
      grantedBy,
      isActive: true,
      permissions: config.features,
      restrictions: config.restrictions
    });

    return true;
  }

  async checkFeatureAccess(userId: string, feature: string): Promise<boolean> {
    const userAccess = await this.getUserSecurityLayer(userId);
    if (!userAccess || !userAccess.isActive) return false;
    
    return hasFeatureAccess(userAccess.layer, feature);
  }

  async checkDailyLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
    const userAccess = await this.getUserSecurityLayer(userId);
    if (!userAccess) return { allowed: false, remaining: 0 };

    const today = new Date().toDateString();
    const usageKey = `${userId}-${today}`;
    const usedToday = this.dailyUsage.get(usageKey) || 0;
    
    const remaining = getRemainingDailyAnalysis(userAccess.layer, usedToday);
    
    return {
      allowed: remaining > 0 || remaining === -1,
      remaining: remaining === -1 ? -1 : remaining
    };
  }

  async incrementDailyUsage(userId: string): Promise<void> {
    const today = new Date().toDateString();
    const usageKey = `${userId}-${today}`;
    const current = this.dailyUsage.get(usageKey) || 0;
    this.dailyUsage.set(usageKey, current + 1);
  }

  async getLayerDashboard(layer: SecurityLayer): Promise<{
    config: SecurityLayerConfig;
    users: UserAnalyticsData[];
    metrics: SecurityLayerMetrics;
  }> {
    const config = getSecurityLayerConfig(layer);
    
    // Get users in this layer
    const layerUsers = Array.from(this.userAccess.values())
      .filter(access => access.layer === layer && access.isActive)
      .map(access => this.userAnalytics.get(access.userId))
      .filter(Boolean) as UserAnalyticsData[];

    // Calculate metrics
    const metrics: SecurityLayerMetrics = {
      layer,
      activeUsers: layerUsers.length,
      dailyAnalysis: layerUsers.reduce((sum, user) => sum + user.analysisCount, 0),
      monthlyRevenue: layerUsers.length * (config.pricing.monthlyPrice || 0),
      averageSecurityScore: layerUsers.length > 0 
        ? layerUsers.reduce((sum, user) => sum + user.securityScore, 0) / layerUsers.length 
        : 0,
      totalThreatsDetected: layerUsers.reduce((sum, user) => sum + user.threatsDetected, 0)
    };

    return { config, users: layerUsers, metrics };
  }

  async getAllLayersOverview(): Promise<{
    totalUsers: number;
    totalRevenue: number;
    layerDistribution: Record<SecurityLayer, number>;
    securityMetrics: {
      averageSecurityScore: number;
      totalThreatsDetected: number;
      totalAnalysisThisMonth: number;
    };
  }> {
    const allUsers = Array.from(this.userAnalytics.values());
    const layerDistribution: Record<SecurityLayer, number> = {
      layer1: 0,
      layer2: 0,
      layer3: 0,
      layer4: 0
    };

    // Count users by layer
    Array.from(this.userAccess.values()).forEach(access => {
      if (access.isActive) {
        layerDistribution[access.layer]++;
      }
    });

    // Calculate total revenue
    let totalRevenue = 0;
    Object.entries(layerDistribution).forEach(([layer, count]) => {
      const config = getSecurityLayerConfig(layer as SecurityLayer);
      totalRevenue += count * (config.pricing.monthlyPrice || 0);
    });

    const securityMetrics = {
      averageSecurityScore: allUsers.length > 0 
        ? allUsers.reduce((sum, user) => sum + user.securityScore, 0) / allUsers.length 
        : 0,
      totalThreatsDetected: allUsers.reduce((sum, user) => sum + user.threatsDetected, 0),
      totalAnalysisThisMonth: allUsers.reduce((sum, user) => sum + user.totalAnalysisThisMonth, 0)
    };

    return {
      totalUsers: allUsers.length,
      totalRevenue,
      layerDistribution,
      securityMetrics
    };
  }

  async authenticateFounderAccess(password: string): Promise<boolean> {
    const validPasswords = ['Rishabhkapoor@0444', 'Rai444'];
    return validPasswords.includes(password);
  }

  async getAvailableUpgrades(userId: string): Promise<{
    currentLayer: SecurityLayer;
    availableUpgrades: Array<{
      layer: SecurityLayer;
      config: SecurityLayerConfig;
      newFeatures: string[];
      pricingDifference: number;
    }>;
  }> {
    const userAccess = await this.getUserSecurityLayer(userId);
    if (!userAccess) throw new Error('User not found');

    const currentConfig = getSecurityLayerConfig(userAccess.layer);
    const availableUpgrades = [];

    // Check each higher layer
    Object.values(SECURITY_LAYERS).forEach(config => {
      if (config.accessLevel > currentConfig.accessLevel) {
        const newFeatures = config.features.filter(
          feature => !currentConfig.features.includes(feature)
        );
        
        const pricingDifference = (config.pricing.monthlyPrice || 0) - (currentConfig.pricing.monthlyPrice || 0);

        availableUpgrades.push({
          layer: config.id,
          config,
          newFeatures,
          pricingDifference
        });
      }
    });

    return {
      currentLayer: userAccess.layer,
      availableUpgrades
    };
  }

  async validateApiAccess(userId: string, requestType: 'hourly' | 'daily'): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: Date;
  }> {
    const userAccess = await this.getUserSecurityLayer(userId);
    if (!userAccess) return { allowed: false, remaining: 0, resetTime: new Date() };

    const config = getSecurityLayerConfig(userAccess.layer);
    const limits = config.apiLimits;
    
    // For demo purposes, return mock data
    // In production, this would check actual API usage from database
    const remaining = requestType === 'hourly' ? limits.requestsPerHour : limits.requestsPerDay;
    const resetTime = requestType === 'hourly' 
      ? new Date(Date.now() + 60 * 60 * 1000) // Next hour
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // Next day

    return {
      allowed: remaining > 0 || remaining === -1,
      remaining: remaining === -1 ? -1 : remaining,
      resetTime
    };
  }

  // Access Request Management Methods
  async createAccessRequest(
    userId: string,
    userName: string,
    requestedLayer: SecurityLayer,
    reason: string,
    businessJustification?: string
  ): Promise<AccessRequest> {
    const userAccess = await this.getUserSecurityLayer(userId);
    if (!userAccess) throw new Error('User not found');

    // Only allow requests for Layer 2 (Corporate) or Layer 3 (Developer)
    if (!['layer2', 'layer3'].includes(requestedLayer)) {
      throw new Error('Access requests are only allowed for Layer 2 (Corporate) or Layer 3 (Developer)');
    }

    // Prevent requesting same or lower layer
    const currentConfig = getSecurityLayerConfig(userAccess.layer);
    const requestedConfig = getSecurityLayerConfig(requestedLayer);
    
    if (requestedConfig.accessLevel <= currentConfig.accessLevel) {
      throw new Error('Cannot request access to same or lower security layer');
    }

    const requestId = `req_${Date.now()}_${userId}`;
    const accessRequest: AccessRequest = {
      id: requestId,
      userId,
      userName,
      currentLayer: userAccess.layer,
      requestedLayer,
      reason,
      businessJustification,
      requestedAt: new Date(),
      status: 'pending'
    };

    this.accessRequests.set(requestId, accessRequest);
    return accessRequest;
  }

  async getPendingAccessRequests(): Promise<AccessRequest[]> {
    return Array.from(this.accessRequests.values())
      .filter(request => request.status === 'pending')
      .sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());
  }

  async getAllAccessRequests(): Promise<AccessRequest[]> {
    return Array.from(this.accessRequests.values())
      .sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());
  }

  async getAccessRequest(requestId: string): Promise<AccessRequest | null> {
    return this.accessRequests.get(requestId) || null;
  }

  async getUserAccessRequests(userId: string): Promise<AccessRequest[]> {
    return Array.from(this.accessRequests.values())
      .filter(request => request.userId === userId)
      .sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());
  }

  async reviewAccessRequest(
    requestId: string,
    reviewerId: string,
    approved: boolean,
    reviewNotes?: string
  ): Promise<boolean> {
    const request = this.accessRequests.get(requestId);
    if (!request) throw new Error('Access request not found');

    if (request.status !== 'pending') {
      throw new Error('Access request has already been reviewed');
    }

    // Update request status
    request.status = approved ? 'approved' : 'rejected';
    request.reviewedBy = reviewerId;
    request.reviewedAt = new Date();
    request.reviewNotes = reviewNotes;

    // If approved, update user's security layer
    if (approved) {
      await this.updateUserSecurityLayer(request.userId, request.requestedLayer, reviewerId);
    }

    this.accessRequests.set(requestId, request);
    return true;
  }

  async getAccessRequestStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    byLayer: Record<SecurityLayer, number>;
  }> {
    const requests = Array.from(this.accessRequests.values());
    
    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      byLayer: {
        layer1: 0,
        layer2: requests.filter(r => r.requestedLayer === 'layer2').length,
        layer3: requests.filter(r => r.requestedLayer === 'layer3').length,
        layer4: 0
      } as Record<SecurityLayer, number>
    };

    return stats;
  }
}

export const securityLayerService = new SecurityLayerService();