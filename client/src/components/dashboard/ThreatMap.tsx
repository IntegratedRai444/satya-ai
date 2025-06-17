import { useState } from "react";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ThreatMap() {
  const [timeRange, setTimeRange] = useState("Live");

  // Mock threat locations for visualization
  const threatLocations = [
    { x: 160, y: 120, severity: "critical", region: "North America" },
    { x: 140, y: 130, severity: "high", region: "North America" },
    { x: 400, y: 100, severity: "critical", region: "Europe" },
    { x: 380, y: 110, severity: "medium", region: "Europe" },
    { x: 600, y: 80, severity: "critical", region: "Asia" },
    { x: 580, y: 90, severity: "high", region: "Asia" },
    { x: 590, y: 100, severity: "low", region: "Asia" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-amber-500";
      case "medium": return "bg-blue-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-cyan-400 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Global Threat Intelligence</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {["Live", "24h", "7d"].map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm ${
                  timeRange === range
                    ? "bg-cyan-400/20 text-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-slate-900/50 rounded-lg overflow-hidden">
          {/* Simplified world map visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Global Network Background */}
            <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
              {/* Continents outline */}
              <path 
                d="M150,100 Q200,80 250,100 L300,120 L350,100 Q400,90 450,110 L500,100 Q550,90 600,120 L650,110" 
                stroke="#00f5ff" 
                strokeWidth="1" 
                fill="none"
              />
              <path 
                d="M100,200 Q150,180 200,200 L250,220 L300,200 Q350,190 400,210 L450,200 Q500,190 550,220 L600,210" 
                stroke="#00f5ff" 
                strokeWidth="1" 
                fill="none"
              />
              <path 
                d="M200,300 Q250,280 300,300 L350,320 L400,300 Q450,290 500,310 L550,300" 
                stroke="#00f5ff" 
                strokeWidth="1" 
                fill="none"
              />
            </svg>
            
            {/* Threat indicators */}
            <div className="absolute inset-0">
              {threatLocations.map((threat, index) => (
                <div
                  key={index}
                  className={`absolute w-4 h-4 ${getSeverityColor(threat.severity)} rounded-full animate-pulse opacity-80 network-node`}
                  style={{ 
                    left: threat.x, 
                    top: threat.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  title={`${threat.region} - ${threat.severity.toUpperCase()}`}
                />
              ))}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="160" y1="120" x2="400" y2="100" stroke="#00f5ff" strokeWidth="1" opacity="0.3"/>
                <line x1="400" y1="100" x2="600" y2="80" stroke="#00f5ff" strokeWidth="1" opacity="0.3"/>
                <line x1="160" y1="120" x2="600" y2="80" stroke="#00f5ff" strokeWidth="1" opacity="0.2"/>
              </svg>
            </div>
          </div>
          
          {/* Live data overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                {[
                  { color: "bg-red-500", label: "Critical", textColor: "text-red-400" },
                  { color: "bg-amber-500", label: "High", textColor: "text-amber-400" },
                  { color: "bg-blue-500", label: "Medium", textColor: "text-blue-400" },
                  { color: "bg-green-500", label: "Low", textColor: "text-green-400" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-1">
                    <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                    <span className={item.textColor}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 font-mono">
                Last updated: <span className="text-cyan-400">2s ago</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
