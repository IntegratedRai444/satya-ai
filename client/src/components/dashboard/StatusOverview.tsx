import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StatusOverview() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/metrics/latest"],
    refetchInterval: 2000,
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glow-border bg-slate-800/50 backdrop-blur-sm p-6 scan-line animate-pulse">
            <div className="h-20"></div>
          </Card>
        ))}
      </section>
    );
  }

  const statusCards = [
    {
      title: "Critical Threats",
      value: metrics?.criticalThreats || 0,
      change: "+23%",
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-500/20",
      textColor: "text-red-400",
      changeColor: "bg-red-500/20 text-red-400"
    },
    {
      title: "Active Incidents",
      value: metrics?.activeIncidents || 0,
      change: "+8%",
      icon: ShieldAlert,
      color: "amber",
      bgColor: "bg-amber-500/20",
      textColor: "text-amber-400",
      changeColor: "bg-amber-500/20 text-amber-400"
    },
    {
      title: "Resolved",
      value: metrics?.resolvedThreats || 0,
      change: "+156",
      icon: ShieldCheck,
      color: "green",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
      changeColor: "bg-green-500/20 text-green-400"
    },
    {
      title: "AI Confidence",
      value: `${metrics?.aiConfidence || 0}%`,
      change: "Optimal",
      icon: Activity,
      color: "cyan",
      bgColor: "bg-cyan-500/20",
      textColor: "text-cyan-400",
      changeColor: "bg-cyan-500/20 text-cyan-400",
      pulseRing: true
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusCards.map((card, index) => (
        <Card key={index} className="glow-border bg-slate-800/50 backdrop-blur-sm p-6 scan-line">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center ${card.pulseRing ? 'pulse-ring' : ''}`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm px-2 py-1 rounded ${card.changeColor}`}>
                {card.change}
              </span>
            </div>
          </div>
          <div className="data-stream"></div>
        </Card>
      ))}
    </section>
  );
}
