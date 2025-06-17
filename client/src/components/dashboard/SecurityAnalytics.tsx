import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function SecurityAnalytics() {
  const [timeRange, setTimeRange] = useState("24h");
  
  const { data: metricsHistory } = useQuery({
    queryKey: ["/api/metrics/history", { hours: timeRange === "24h" ? 24 : timeRange === "7d" ? 168 : 720 }],
    refetchInterval: 10000,
  });

  // Generate mock chart data for visualization
  const generateChartData = () => {
    const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"];
    return hours.map((hour, index) => ({
      time: hour,
      critical: Math.floor(Math.random() * 50) + 10,
      high: Math.floor(Math.random() * 80) + 20,
      medium: Math.floor(Math.random() * 60) + 15,
      low: Math.floor(Math.random() * 40) + 10,
      height: Math.random() * 80 + 20
    }));
  };

  const chartData = generateChartData();

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-cyan-400 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Security Analytics</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {["24h", "7d", "30d"].map((range) => (
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
        <div className="h-64 bg-slate-900/50 rounded-lg p-4">
          <div className="h-full flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className={`w-8 rounded-t transition-all duration-500 ${
                    index === chartData.length - 1 
                      ? 'bg-gradient-to-t from-red-500 to-red-400 animate-pulse' 
                      : index % 2 === 0 
                        ? 'bg-gradient-to-t from-cyan-500 to-cyan-400'
                        : 'bg-gradient-to-t from-amber-500 to-amber-400'
                  }`}
                  style={{ height: `${data.height}%` }}
                />
                <span className={`text-xs ${
                  index === chartData.length - 1 ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  {data.time}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chart Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          {[
            { color: "bg-red-500", label: "Critical" },
            { color: "bg-amber-500", label: "High" },
            { color: "bg-blue-500", label: "Medium" },
            { color: "bg-green-500", label: "Low" }
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${item.color} rounded`}></div>
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
