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
import MisinformationDetector from "@/components/MisinformationDetector";
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
import AIEmployeeDesigner from "@/components/AIEmployeeDesigner";
import ExtensiveFrontPage from "@/components/ExtensiveFrontPage";

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

export default function AuthenticatedApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'founder' | 'normal' | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLogin = (type: 'founder' | 'normal', data: UserData) => {
    setIsAuthenticated(true);
    setUserType(type);
    setUserData(data);
    
    // Store session in localStorage for persistence
    localStorage.setItem('satyaai_session', JSON.stringify({
      isAuthenticated: true,
      userType: type,
      userData: data,
      timestamp: Date.now()
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
    localStorage.removeItem('satyaai_session');
  };

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem('satyaai_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        const hoursPassed = (Date.now() - session.timestamp) / (1000 * 60 * 60);
        
        // Session expires after 24 hours
        if (hoursPassed < 24 && session.isAuthenticated) {
          setIsAuthenticated(true);
          setUserType(session.userType);
          setUserData(session.userData);
        } else {
          localStorage.removeItem('satyaai_session');
        }
      } catch {
        localStorage.removeItem('satyaai_session');
      }
    }
  }, []);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <LoginPage onLogin={handleLogin} />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

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
          <NormalUserRouter />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function NormalUserRouter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <GlobalNavigation />
      <Switch>
        <Route path="/" component={SatyaAIExactDashboard} />
        <Route path="/3d-landing" component={CyberTech3DLanding} />
        <Route path="/unified" component={UnifiedCyberPlatform} />
        <Route path="/satyaai-exact" component={SatyaAIExactDesign} />
        <Route path="/satyaai" component={SatyaAIDashboard} />
        <Route path="/satyaai-3d" component={SatyaAI3DComplete} />
        <Route path="/complete-hub" component={CompleteCyberIntelligenceHub} />
        <Route path="/complete-front" component={CompleteFrontPage} />
        <Route path="/extensive-front" component={ExtensiveFrontPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/enterprise" component={Holographic3DPortal} />
        <Route path="/enterprise-saas" component={EnterpriseSaaS} />
        <Route path="/security" component={AdvancedSecurityFeatures} />
        <Route path="/advanced-security" component={AdvancedSecurityFeatures} />
        <Route path="/behavior" component={BehaviorTrustDashboard} />
        <Route path="/news" component={RealTimeNewsDashboard} />
        <Route path="/identity-forensics" component={IdentityForensicsLab} />
        <Route path="/misinformation" component={MisinformationDetector} />
        <Route path="/cybercrime-law" component={CybercrimeLawCenter} />
        <Route path="/threat-intelligence" component={ThreatIntelligenceDashboard} />
        <Route path="/startup-audit" component={StartupSecurityAudit} />
        <Route path="/cyber-ai" component={ComprehensiveCyberAI} />
        <Route path="/suraksha" component={SuRakshaSecurityPlatform} />
        <Route path="/ai-employee-designer" component={AIEmployeeDesigner} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}