import { Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";

export default function AIAnalysis() {
  const { data: metrics } = useQuery({
    queryKey: ["/api/metrics/latest"],
    refetchInterval: 3000,
  });

  const threatLevel = metrics?.criticalThreats || 0;
  const confidence = metrics?.aiConfidence || 0;
  
  const getThreatLevelText = (level: number) => {
    if (level > 40) return "CRITICAL";
    if (level > 20) return "HIGH";
    if (level > 10) return "MEDIUM";
    return "LOW";
  };

  const getThreatLevelColor = (level: number) => {
    if (level > 40) return "text-red-400";
    if (level > 20) return "text-amber-400";
    if (level > 10) return "text-blue-400";
    return "text-green-400";
  };

  const analysisItems = [
    {
      indicator: "red",
      title: "Advanced Persistent Threat detected",
      description: "Multi-stage attack identified",
      pulse: true
    },
    {
      indicator: "amber",
      title: "Lateral movement pattern",
      description: "Credential harvesting suspected",
      pulse: true
    },
    {
      indicator: "blue",
      title: "Data exfiltration attempt",
      description: "Encrypted channel identified",
      pulse: true
    }
  ];

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-cyan-400">AI Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Threat Level</span>
            <span className={`text-sm font-bold ${getThreatLevelColor(threatLevel)}`}>
              {getThreatLevelText(threatLevel)}
            </span>
          </div>
          <Progress 
            value={Math.min(threatLevel * 2, 100)} 
            className="w-full h-2 bg-slate-700"
          />
          <div className="text-xs text-slate-400 mt-1">
            Confidence: {confidence}%
          </div>
        </div>
        
        <div className="space-y-3">
          {analysisItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 bg-${item.indicator}-500 rounded-full mt-2 ${item.pulse ? 'animate-pulse' : ''}`}></div>
              <div>
                <p className="text-sm text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200">
          View Full Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
