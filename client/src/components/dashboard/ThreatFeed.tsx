import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThreatFeed() {
  const { data: threats, isLoading } = useQuery({
    queryKey: ["/api/threats"],
    refetchInterval: 3000,
  });

  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "threat-critical";
      case "high": return "threat-high";
      case "medium": return "threat-medium";
      case "low": return "threat-low";
      default: return "threat-low";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "text-red-400";
      case "high": return "text-amber-400";
      case "medium": return "text-blue-400";
      case "low": return "text-green-400";
      default: return "text-green-400";
    }
  };

  const getBadgeColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500/20 text-red-400";
      case "high": return "bg-amber-500/20 text-amber-400";
      case "medium": return "bg-blue-500/20 text-blue-400";
      case "low": return "bg-green-500/20 text-green-400";
      default: return "bg-green-500/20 text-green-400";
    }
  };

  const formatTime = (timestamp: string | Date) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });
  };

  if (isLoading) {
    return (
      <Card className="hologram-effect">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-cyan-400">Live Threat Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-800/50 rounded-lg p-3 h-20"></div>
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
          <CardTitle className="text-lg font-semibold text-cyan-400">Live Threat Feed</CardTitle>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {threats?.slice(0, 6).map((threat) => (
            <div key={threat.id} className={`${getSeverityClass(threat.severity)} border rounded-lg p-3 animate-fade-in`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono ${getSeverityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {formatTime(threat.timestamp)}
                </span>
              </div>
              <p className="text-sm text-white mb-1">{threat.title}</p>
              <p className="text-xs text-slate-400">{threat.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(threat.severity)}`}>
                  {threat.targetIP || threat.source}
                </span>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                  {threat.location || "Unknown"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
