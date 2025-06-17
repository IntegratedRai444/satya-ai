import { useState, useEffect } from 'react';
import { SciFiCard, HolographicDisplay, StatusIndicator, NeuralNetworkVisualization } from '@/components/SciFiInterface';
import { Shield, Activity, Brain, Zap, Eye, AlertTriangle } from 'lucide-react';

interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  networkActivity: number;
  securityLevel: 'SECURE' | 'WARNING' | 'CRITICAL';
  activeThreats: number;
  systemUptime: string;
}

export function CyberHUD() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpuUsage: 45,
    memoryUsage: 67,
    networkActivity: 89,
    securityLevel: 'SECURE',
    activeThreats: 3,
    systemUptime: '15:42:33'
  });

  const [timeStamp, setTimeStamp] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStamp(new Date());
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkActivity: Math.max(10, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 15)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 w-80">
      {/* System Status HUD */}
      <HolographicDisplay className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              SYSTEM STATUS
            </h3>
            <div className="text-xs font-mono text-cyan-400">
              {timeStamp.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <StatusIndicator
              status={systemStatus.cpuUsage > 80 ? 'critical' : systemStatus.cpuUsage > 60 ? 'warning' : 'online'}
              label="CPU"
              value={`${Math.round(systemStatus.cpuUsage)}%`}
              icon={Activity}
            />
            
            <StatusIndicator
              status={systemStatus.memoryUsage > 85 ? 'critical' : systemStatus.memoryUsage > 70 ? 'warning' : 'online'}
              label="MEMORY"
              value={`${Math.round(systemStatus.memoryUsage)}%`}
              icon={Brain}
            />
            
            <StatusIndicator
              status="online"
              label="NETWORK"
              value={`${Math.round(systemStatus.networkActivity)}%`}
              icon={Zap}
            />
            
            <StatusIndicator
              status={systemStatus.activeThreats > 5 ? 'critical' : systemStatus.activeThreats > 2 ? 'warning' : 'online'}
              label="THREATS"
              value={systemStatus.activeThreats.toString()}
              icon={AlertTriangle}
            />
          </div>
          
          <div className="border-t border-cyan-400/30 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Security Level:</span>
              <span className={`font-mono ${
                systemStatus.securityLevel === 'CRITICAL' ? 'text-red-400' :
                systemStatus.securityLevel === 'WARNING' ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {systemStatus.securityLevel}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-cyan-400 font-mono">{systemStatus.systemUptime}</span>
            </div>
          </div>
        </div>
      </HolographicDisplay>

      {/* Neural Network Activity */}
      <SciFiCard variant="primary" className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" style={{
              filter: 'drop-shadow(0 0 8px #a855f7)'
            }} />
            <h4 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              NEURAL ACTIVITY
            </h4>
          </div>
          <NeuralNetworkVisualization className="h-24" />
        </div>
      </SciFiCard>

      {/* Security Shield */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
        <SciFiCard variant="success" className="relative p-4 rounded-full">
          <div className="flex items-center justify-center">
            <Shield className="w-8 h-8 text-green-400" style={{
              filter: 'drop-shadow(0 0 12px #22c55e)',
              animation: 'neural-network-pulse 3s ease-in-out infinite'
            }} />
          </div>
        </SciFiCard>
      </div>
    </div>
  );
}

export default CyberHUD;