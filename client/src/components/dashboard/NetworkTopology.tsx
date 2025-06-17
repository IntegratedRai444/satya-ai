import { useRef, useEffect } from "react";
import { Network, Expand, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function NetworkTopology() {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const { data: nodes } = useQuery({
    queryKey: ["/api/network/nodes"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    // Simple 3D-like network visualization using Canvas
    const container = canvasRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.className = 'w-full h-full';
    
    container.innerHTML = '';
    container.appendChild(canvas);

    // Network nodes data
    const networkNodes = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 2,
      color: i < 5 ? '#ef4444' : i < 15 ? '#f59e0b' : '#00f5ff',
      opacity: 0.8
    }));

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      networkNodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw connections to nearby nodes
        networkNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 100) {
              ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <Card className="hologram-effect">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-cyan-400 flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Network Topology</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-700/50">
              <Expand className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-700/50">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-slate-900/50 rounded-lg overflow-hidden">
          <div ref={canvasRef} className="w-full h-full"></div>
          
          {/* Network Stats Overlay */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded px-3 py-2">
              <div className="text-xs text-slate-400">Active Nodes</div>
              <div className="text-lg font-bold text-cyan-400">
                {nodes?.length || 1247}
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm rounded px-3 py-2">
              <div className="text-xs text-slate-400">Connections</div>
              <div className="text-lg font-bold text-green-400">3,891</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm rounded px-3 py-2">
              <div className="text-xs text-slate-400">Anomalies</div>
              <div className="text-lg font-bold text-red-400">23</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
