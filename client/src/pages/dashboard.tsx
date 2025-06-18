import { useEffect } from "react";
import Header from "@/components/dashboard/Header";
import StatusOverview from "@/components/dashboard/StatusOverview";
import ThreatMap from "@/components/dashboard/ThreatMap";
import NetworkTopology from "@/components/dashboard/NetworkTopology";
import AIAnalysis from "@/components/dashboard/AIAnalysis";
import ThreatFeed from "@/components/dashboard/ThreatFeed";
import SecurityAnalytics from "@/components/dashboard/SecurityAnalytics";
import IncidentTimeline from "@/components/dashboard/IncidentTimeline";
import QuickActions from "@/components/dashboard/QuickActions";
import CyberIntelligenceDashboard from "@/components/ai/CyberIntelligenceDashboard";
import CyberLawDashboard from "@/components/legal/CyberLawDashboard";
import SurveillanceDashboard from "@/components/surveillance/SurveillanceDashboard";
import UserUtilitiesDashboard from "@/components/utilities/UserUtilitiesDashboard";
import BonusFeaturesDashboard from "@/components/bonus/BonusFeaturesDashboard";
import { MatrixTerminal } from "@/components/MatrixTerminal";
import NeuralNetworkDashboard from "@/components/NeuralNetworkDashboard";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Brain, Activity, Radar, Scale, Eye, GraduationCap, Zap, Terminal, HelpCircle, Target, Building } from "lucide-react";
import { Link } from "wouter";
import { HolographicDisplay } from "@/components/SciFiInterface";
import HelpSystem from "@/components/HelpSystem";
import QuantumDashboard from "@/components/QuantumDashboard";
import AutonomousSecurityCenter from "@/components/AutonomousSecurityCenter";
import DeepLearningCenter from "@/components/DeepLearningCenter";
import CyberSecurityUniverse from "@/components/CyberSecurityUniverse";
import ThreatSimulationCenter from "@/components/ThreatSimulationCenter";
import CompactCyberDashboard from "@/components/CompactCyberDashboard";
import DeepfakeDetectionCards from "@/components/DeepfakeDetectionCards";

export default function Dashboard() {
  const { startRealTimeUpdates, stopRealTimeUpdates } = useRealTimeData();

  useEffect(() => {
    startRealTimeUpdates();
    return () => stopRealTimeUpdates();
  }, [startRealTimeUpdates, stopRealTimeUpdates]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      <main className="relative z-10 p-8 space-y-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="bg-gradient-to-r from-purple-900/60 via-purple-800/40 to-pink-900/60 border border-purple-500/30 rounded-xl p-2 backdrop-blur-lg shadow-2xl">
            <TabsList className="grid w-full grid-cols-9 bg-transparent gap-2">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-emerald-700 hover:to-teal-700 
                        transition-all duration-300 border border-emerald-500/30 rounded-lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security Universe
            </TabsTrigger>
            <TabsTrigger 
              value="ai-intelligence" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-orange-700 
                        transition-all duration-300 border border-red-500/30 rounded-lg"
            >
              <Target className="h-4 w-4 mr-2" />
              Threat Simulation
            </TabsTrigger>
            <TabsTrigger 
              value="deep-learning" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 
                        transition-all duration-300 border border-purple-500/30"
            >
              <Brain className="h-4 w-4 mr-2" />
              Deep Learning
            </TabsTrigger>
            <TabsTrigger 
              value="terminal" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-green-700 hover:to-emerald-700 
                        transition-all duration-300 border border-green-500/30 rounded-lg"
            >
              <Terminal className="h-4 w-4 mr-2" />
              Terminal
            </TabsTrigger>
            <TabsTrigger 
              value="cyber-law" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-amber-700 hover:to-yellow-700 
                        transition-all duration-300 border border-amber-500/30 rounded-lg"
            >
              <Scale className="h-4 w-4 mr-2" />
              Legal
            </TabsTrigger>
            <TabsTrigger 
              value="surveillance" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-pink-700 
                        transition-all duration-300 border border-red-500/30 rounded-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              Surveillance
            </TabsTrigger>
            <TabsTrigger 
              value="utilities" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 
                        transition-all duration-300 border border-indigo-500/30 rounded-lg"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Utilities
            </TabsTrigger>
            <TabsTrigger 
              value="bonus" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-orange-700 hover:to-red-700 
                        transition-all duration-300 border border-orange-500/30 rounded-lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger 
              value="help" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-gray-600 
                        data-[state=active]:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-gray-700 
                        transition-all duration-300 border border-slate-500/30 rounded-lg"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </TabsTrigger>
          </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <DeepfakeDetectionCards />
            <CompactCyberDashboard />
          </TabsContent>

          <TabsContent value="ai-intelligence" className="space-y-6">
            <ThreatSimulationCenter />
          </TabsContent>

          <TabsContent value="deep-learning" className="space-y-6">
            <DeepLearningCenter />
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <MatrixTerminal />
          </TabsContent>

          <TabsContent value="cyber-law" className="space-y-6">
            <CyberLawDashboard />
          </TabsContent>

          <TabsContent value="surveillance" className="space-y-6">
            <SurveillanceDashboard />
          </TabsContent>

          <TabsContent value="utilities" className="space-y-6">
            <UserUtilitiesDashboard />
          </TabsContent>

          <TabsContent value="bonus" className="space-y-6">
            <BonusFeaturesDashboard />
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <HelpSystem />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
