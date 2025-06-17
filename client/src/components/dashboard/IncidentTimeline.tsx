import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function IncidentTimeline() {
  const { data: incidents, isLoading } = useQuery({
    queryKey: ["/api/incidents"],
    refetchInterval: 5000,
  });

  // Mock incidents for demonstration
  const mockIncidents = [
    {
      id: 1,
      title: "Malware Detection",
      description: "Advanced malware sample identified on endpoint PC-FINANCE-07",
      severity: "CRITICAL",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "Auto-Quarantined"
    },
    {
      id: 2,
      title: "Phishing Attempt",
      description: "Suspicious email with malicious attachment blocked by email security",
      severity: "HIGH",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "Blocked"
    },
    {
      id: 3,
      title: "Security Update",
      description: "Critical security patches deployed to 45 endpoints successfully",
      severity: "RESOLVED",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      status: "Automated"
    },
    {
      id: 4,
      title: "Network Anomaly",
      description: "Unusual network traffic pattern detected on VLAN 100",
      severity: "MEDIUM",
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      status: "Investigating"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500";
      case "high": return "bg-amber-500";
      case "medium": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "text-red-400";
      case "high": return "text-amber-400";
      case "medium": return "text-blue-400";
      case "resolved": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getBadgeColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500/20 text-red-400";
      case "high": return "bg-amber-500/20 text-amber-400";
      case "medium": return "bg-blue-500/20 text-blue-400";
      case "resolved": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { hour12: false });
  };

  const displayIncidents = incidents?.length ? incidents.slice(0, 4) : mockIncidents;

  if (isLoading) {
    return (
      <Card className="hologram-effect">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-cyan-400">Incident Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-800/50 rounded-lg p-3 h-24"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-cyan-400 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Incident Timeline</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {displayIncidents.map((incident, index) => (
            <div key={incident.id} className="flex items-start space-x-4 animate-fade-in">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 ${getSeverityColor(incident.severity)} rounded-full ${
                  incident.severity.toLowerCase() !== 'resolved' ? 'animate-pulse' : ''
                }`}></div>
                {index < displayIncidents.length - 1 && (
                  <div className="w-px h-8 bg-slate-700 mt-2"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{incident.title}</h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {formatTime(incident.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{incident.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {incident.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
