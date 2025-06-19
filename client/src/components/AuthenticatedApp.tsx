import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "../lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/components/LoginPage";
import SatyaXFounderPortal from "@/components/SatyaXFounderPortal";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import Holographic3DPortal from "@/components/Holographic3DPortal";
import AdvancedSecurityFeatures from "@/components/AdvancedSecurityFeatures";
import BehaviorTrustDashboard from "@/components/BehaviorTrustDashboard";
import RealTimeNewsDashboard from "@/components/RealTimeNewsDashboard";
import CompleteFrontPage from "@/components/CompleteFrontPage";
import GlobalNavigation from "@/components/GlobalNavigation";
import IdentityForensicsLab from "@/components/IdentityForensicsLab";
import { LegitimacyThreatAnalyzer } from "@/components/LegitimacyThreatAnalyzer";
import UnifiedAnalysisPortal from "@/components/UnifiedAnalysisPortal";
import RequestAccessPortal from "@/components/RequestAccessPortal";
import StreamlinedSecurityCenter from "@/components/StreamlinedSecurityCenter";
import QuantumSecurityLab from "@/components/QuantumSecurityLab";
import AdvancedBehavioralIntelligence from "@/components/AdvancedBehavioralIntelligence";
import ZeroTrustArchitecture from "@/components/ZeroTrustArchitecture";
import AIThreatHuntingSystem from "@/components/AIThreatHuntingSystem";
import DeveloperDashboard from "@/components/DeveloperDashboard";
import CompanyDashboard from "@/components/CompanyDashboard";
import AccessControlWrapper from "@/components/AccessControlWrapper";
import CybercrimeLawCenter from "@/components/CybercrimeLawCenter";
import ThreatIntelligenceDashboard from "@/components/ThreatIntelligenceDashboard";
import StartupSecurityAudit from "@/components/StartupSecurityAudit";
import ComprehensiveCyberAI from "@/components/ComprehensiveCyberAI";
import SuRakshaSecurityPlatform from "@/components/SuRakshaSecurityPlatform";
import CompleteCyberIntelligenceHub from "@/components/CompleteCyberIntelligenceHub";
import SatyaAIDashboard from "@/components/SatyaAIDashboard";
import SatyaAI3DDashboard from "@/components/SatyaAI3DDashboard";
import SatyaAI3DComplete from "@/components/SatyaAI3DComplete";
import SatyaAIExactDesign from "@/components/SatyaAIExactDesign";
import EnterpriseSaaS from "@/components/EnterpriseSaaS";
import UnifiedCyberPlatform from "@/components/UnifiedCyberPlatform";
import CyberTech3DLanding from "@/components/CyberTech3DLanding";
import SatyaAIExactDashboard from "@/components/SatyaAIExactDashboard";
import IntelligentWorkforceCreator from "@/components/IntelligentWorkforceCreator";
import CyberNexusCommandCenter from "@/components/CyberNexusCommandCenter";
import UnifiedAnalysis from "@/pages/UnifiedAnalysis";
import AIEmployeeRequestForm from "@/components/AIEmployeeRequestForm";
import AIAccessRequestForm from "@/components/AIAccessRequestForm";
import CyberSecurityAcademy from "@/components/CyberSecurityAcademy";
import StreamlinedSecurityPortal from "@/components/StreamlinedSecurityPortal";
import SecurityLayerManager from "@/components/SecurityLayerManager";
import AccessRequestManager from "@/components/AccessRequestManager";
import FounderAccessControl from "@/components/FounderAccessControl";
import RealTimeAnalysis from "@/components/RealTimeAnalysis";
import ComprehensiveThreatIntelligence from "@/components/ComprehensiveThreatIntelligence";
import LayerAccessRequest from "@/components/LayerAccessRequest";
import FounderNotificationCenter from "@/components/FounderNotificationCenter";
import AdvancedAnalysisInterface from "@/components/AdvancedAnalysisInterface";
import { AdvancedThreatPrediction } from "@/components/AdvancedThreatPrediction";
import { RealTimeCollaboration } from "@/components/RealTimeCollaboration";
import { InteractiveThreatMap } from "@/components/InteractiveThreatMap";
import { SecurityAlertSoundscape } from "@/components/SecurityAlertSoundscape";
import { AISecurityPersonaCoach } from "@/components/AISecurityPersonaCoach";
import { EnterprisePortal3D } from "@/components/EnterprisePortal3D";
import { UltraPowerfulDetectionSystem } from "@/components/UltraPowerfulDetectionSystem";

interface UserData {
  id: string;
  name: string;
  role: string;
  accessLevel: string;
  permissions: string[];
  avatar: string;
  specialAccess: boolean;
  lastLogin: string;
}

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

interface AuthenticatedAppProps {
  user: AuthenticatedUser;
  onLogout: () => void;
}

export default function AuthenticatedApp({ user, onLogout }: AuthenticatedAppProps) {
  const [isAuthenticated] = useState(true);
  const [userType] = useState<'founder' | 'normal'>('normal');
  const userData = {
    email: user.email,
    accessLevel: user.accessLevel,
    permissions: user.permissions,
    specialAccess: user.accessLevel === 'developer',
    lastLogin: new Date().toISOString()
  };

  const handleLogout = () => {
    onLogout();
  };

  // Show founder portal for special access
  if (userType === 'founder' && userData?.specialAccess) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <SatyaXFounderPortal userData={userData} onLogout={handleLogout} />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show normal dashboard for regular users
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <NormalUserRouter user={user} onLogout={handleLogout} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function NormalUserRouter({ user, onLogout }: { user: AuthenticatedUser; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <GlobalNavigation user={user} onLogout={onLogout} />
      <Switch>
        <Route path="/" component={() => {
          // Dynamic dashboard based on user access level
          if (user.accessLevel === 'developer') {
            return <DeveloperDashboard user={user} />;
          } else if (user.accessLevel === 'company') {
            return <CompanyDashboard user={user} />;
          } else {
            return <SatyaAIExactDashboard />;
          }
        }} />
        
        {/* DEVELOPER ACCESS ONLY - Advanced Technical Tools */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/unified-analysis" component={UnifiedAnalysisPortal} />
            <Route path="/request-access" component={RequestAccessPortal} />
            <Route path="/identity-forensics" component={IdentityForensicsLab} />
            <Route path="/security-features" component={StreamlinedSecurityCenter} />
            <Route path="/enterprise" component={Holographic3DPortal} />
            <Route path="/enterprise-saas" component={EnterpriseSaaS} />
            <Route path="/advanced-security" component={AdvancedSecurityFeatures} />
            <Route path="/unified" component={UnifiedCyberPlatform} />
            <Route path="/complete-hub" component={CompleteCyberIntelligenceHub} />
            <Route path="/cybernexus" component={CyberNexusCommandCenter} />
          </>
        )}
        
        {/* COMPANY ACCESS ONLY - Business Management Tools */}
        {user.accessLevel === 'company' && (
          <>
            <Route path="/team-management" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Team Management Portal - Business Feature</div>} />
            <Route path="/compliance-center" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Compliance Center - Business Feature</div>} />
            <Route path="/business-reports" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Business Reports - Executive Dashboard</div>} />
            <Route path="/employee-training" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Employee Training Portal - HR Management</div>} />
            <Route path="/business-insights" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Business Insights - Market Intelligence</div>} />
            <Route path="/risk-assessment" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Risk Assessment - Business Risk Management</div>} />
            <Route path="/vendor-security" component={() => <div className="p-8 text-white bg-slate-900 min-h-screen">Vendor Security Management - Third-party Risk</div>} />
          </>
        )}
        
        {/* BASIC ACCESS ONLY - Limited Analysis Tools */}
        {user.accessLevel === 'basic' && (
          <>
            <Route path="/analysis" component={UnifiedAnalysis} />
            <Route path="/ai-employee-request" component={AIEmployeeRequestForm} />
            <Route path="/3d-landing" component={CyberTech3DLanding} />
            <Route path="/satyaai-exact" component={SatyaAIExactDesign} />
            <Route path="/satyaai" component={SatyaAIDashboard} />
            <Route path="/satyaai-3d" component={SatyaAI3DComplete} />
            <Route path="/complete-front" component={CompleteFrontPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/security" component={AdvancedSecurityFeatures} />
            <Route path="/behavior" component={BehaviorTrustDashboard} />
            <Route path="/news" component={RealTimeNewsDashboard} />
          </>
        )}
        {/* DEVELOPER-ONLY Advanced Features */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/quantum-security" component={QuantumSecurityLab} />
            <Route path="/behavioral-intelligence" component={AdvancedBehavioralIntelligence} />
            <Route path="/zero-trust" component={ZeroTrustArchitecture} />
            <Route path="/ai-threat-hunting" component={AIThreatHuntingSystem} />
          </>
        )}
        {/* DEVELOPER-ONLY Additional Tools */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/legitimacy-analyzer" component={LegitimacyThreatAnalyzer} />
            <Route path="/cybercrime-law" component={CybercrimeLawCenter} />
            <Route path="/cyber-ai" component={ComprehensiveCyberAI} />
            <Route path="/suraksha" component={SuRakshaSecurityPlatform} />
            <Route path="/intelligent-workforce" component={IntelligentWorkforceCreator} />
            <Route path="/unified-security" component={StreamlinedSecurityPortal} />
            <Route path="/security-layers" component={SecurityLayerManager} />
            <Route path="/access-requests" component={AccessRequestManager} />
          </>
        )}

        {/* COMPANY-ONLY Additional Features */}
        {user.accessLevel === 'company' && (
          <>
            <Route path="/threat-intelligence" component={ThreatIntelligenceDashboard} />
            <Route path="/startup-audit" component={StartupSecurityAudit} />
            <Route path="/ai-access-request" component={AIAccessRequestForm} />
            <Route path="/cybersecurity-academy" component={CyberSecurityAcademy} />
          </>
        )}
        {/* DEVELOPER-ONLY Founder and System Features */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/founder-control" component={FounderAccessControl} />
            <Route path="/real-time-analysis" component={RealTimeAnalysis} />
            <Route path="/comprehensive-threat-intelligence" component={ComprehensiveThreatIntelligence} />
            <Route path="/layer-access-request" component={LayerAccessRequest} />
          </>
        )}
        {/* DEVELOPER-ONLY Final System Features */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/founder-notifications" component={FounderNotificationCenter} />
            <Route path="/advanced-analysis" component={AdvancedAnalysisInterface} />
            <Route path="/threat-prediction" component={AdvancedThreatPrediction} />
          </>
        )}

        {/* COMPANY-ONLY Collaboration Features */}
        {user.accessLevel === 'company' && (
          <>
            <Route path="/collaboration" component={RealTimeCollaboration} />
          </>
        )}
        {/* DEVELOPER-ONLY Advanced Interactive Features */}
        {user.accessLevel === 'developer' && (
          <>
            <Route path="/threat-map" component={InteractiveThreatMap} />
            <Route path="/soundscape" component={SecurityAlertSoundscape} />
          </>
        )}

        {/* COMPANY-ONLY Business Features */}
        {user.accessLevel === 'company' && (
          <>
            <Route path="/ai-coach" component={AISecurityPersonaCoach} />
            <Route path="/enterprise-portal" component={EnterprisePortal3D} />
          </>
        )}
        {/* DEVELOPER-ONLY Ultra Detection System */}
        {user.accessLevel === 'developer' && (
          <Route path="/ultra-detection" component={UltraPowerfulDetectionSystem} />
        )}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}