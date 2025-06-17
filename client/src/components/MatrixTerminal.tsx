import { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Cpu, HardDrive, Network, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TerminalLog {
  id: number;
  timestamp: string;
  level: string;
  source: string;
  message: string;
}

interface SystemMetrics {
  timestamp: string;
  cpu: { usage: number; cores: number; frequency: string };
  memory: { used: number; total: string; available: string };
  network: { inbound: number; outbound: number; latency: number };
  storage: { used: number; total: string; iops: number };
}

export function MatrixTerminal() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: string }>>([]);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial logs
    fetchLogs();
    fetchMetrics();
    
    // Set up polling for real-time updates
    const logsInterval = setInterval(fetchLogs, 3000);
    const metricsInterval = setInterval(fetchMetrics, 5000);
    
    return () => {
      clearInterval(logsInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs/live');
      if (response.ok) {
        const newLogs = await response.json();
        setLogs(newLogs);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/system/performance');
      if (response.ok) {
        const newMetrics = await response.json();
        setMetrics(newMetrics);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const executeCommand = async (cmd: string) => {
    try {
      const response = await fetch('/api/terminal/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      
      if (response.ok) {
        const result = await response.json();
        const newEntry = {
          command: cmd,
          output: result.output,
          timestamp: new Date().toISOString()
        };
        setHistory(prev => [...prev, newEntry].slice(-50)); // Keep last 50 commands
      }
    } catch (error) {
      const errorEntry = {
        command: cmd,
        output: `Error: Failed to execute command - ${error}`,
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [...prev, errorEntry].slice(-50));
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
      setCommand('');
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-400';
      case 'WARN': return 'text-yellow-400';
      case 'THREAT': return 'text-red-500 animate-pulse';
      case 'SCAN': return 'text-cyan-400';
      case 'DEBUG': return 'text-gray-400';
      default: return 'text-green-400';
    }
  };

  const getSourceBadgeVariant = (source: string) => {
    switch (source) {
      case 'AI-ANALYZER': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'THREAT-SCANNER': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'SURVEILLANCE': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'LEGAL-AI': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'NETWORK-MON': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Main Terminal */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="h-96 hacker-terminal">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <CardTitle className="text-green-400 font-mono">
                SENTINEL-OPS Terminal v2.1.7
              </CardTitle>
              <div className="ml-auto flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-xs text-green-400 font-mono">
                  {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-full overflow-hidden flex flex-col">
            <div 
              ref={terminalRef}
              className="flex-1 overflow-y-auto space-y-1 text-sm font-mono"
            >
              {history.map((entry, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">cyber@sentinel-ops:~$</span>
                    <span className="text-white">{entry.command}</span>
                    <span className="text-gray-500 text-xs ml-auto">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="text-cyan-400 whitespace-pre-wrap ml-4 text-xs leading-relaxed">
                    {entry.output}
                  </pre>
                </div>
              ))}
              <div className="data-stream-line"></div>
            </div>
            
            <form onSubmit={handleCommandSubmit} className="mt-4 border-t border-green-400/20 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono">cyber@sentinel-ops:~$</span>
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white font-mono focus:ring-0 focus:outline-none"
                  placeholder="Enter command..."
                  autoComplete="off"
                />
                <span className="text-green-400 animate-pulse">█</span>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* System Performance */}
        {metrics && (
          <Card className="hologram-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Activity className="w-5 h-5" />
                System Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">CPU</span>
                  </div>
                  <div className="text-2xl font-mono text-yellow-400">{metrics.cpu.usage}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.cpu.usage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">{metrics.cpu.cores} cores @ {metrics.cpu.frequency}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <div className="text-2xl font-mono text-green-400">{metrics.memory.used}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.memory.used}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">{metrics.memory.available} / {metrics.memory.total}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">Network</span>
                  </div>
                  <div className="text-xl font-mono text-blue-400">
                    ↓{metrics.network.inbound} ↑{metrics.network.outbound}
                  </div>
                  <div className="text-xs text-gray-400">Mbps</div>
                  <div className="text-xs text-gray-400">Latency: {metrics.network.latency}ms</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  <div className="text-2xl font-mono text-purple-400">{metrics.storage.used}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.storage.used}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">{metrics.storage.total} • {metrics.storage.iops} IOPS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Live System Logs */}
      <div className="space-y-4">
        <Card className="h-[32rem] detection-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="w-5 h-5" />
              Live System Logs
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-hidden">
            <div className="h-full overflow-y-auto space-y-2 text-sm font-mono">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1 border-l-2 border-green-400/20 pl-3 hover:border-green-400/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Badge className={getSourceBadgeVariant(log.source)}>
                      {log.source}
                    </Badge>
                    <span className={`text-xs font-bold ${getLogLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-gray-300 text-xs leading-relaxed">
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="data-stream-container mt-2">
              <div className="data-stream-line"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}