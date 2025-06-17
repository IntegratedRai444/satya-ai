import { ShieldOff, AlertTriangle, Search, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} Action Triggered`,
      description: `${action} protocol has been initiated.`,
    });
  };

  const actions = [
    {
      icon: ShieldOff,
      label: "Quarantine",
      color: "red",
      bgColor: "bg-red-500/20 hover:bg-red-500/30 border-red-500/30",
      textColor: "text-red-400"
    },
    {
      icon: AlertTriangle,
      label: "Alert",
      color: "amber",
      bgColor: "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      icon: Search,
      label: "Investigate",
      color: "blue",
      bgColor: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      icon: CheckCircle,
      label: "Resolve",
      color: "green",
      bgColor: "bg-green-500/20 hover:bg-green-500/30 border-green-500/30",
      textColor: "text-green-400"
    }
  ];

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-cyan-400">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              onClick={() => handleAction(action.label)}
              className={`${action.bgColor} border ${action.textColor} p-3 text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 h-auto`}
            >
              <action.icon className="w-5 h-5" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
