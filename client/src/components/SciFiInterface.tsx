import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  Zap, 
  Eye, 
  Brain,
  Shield,
  Radar,
  Network,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface SciFiInterfaceProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export function SciFiCard({ children, className = '', variant = 'primary' }: SciFiInterfaceProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'border-red-900/60';
      case 'success':
        return 'border-green-900/60';
      case 'secondary':
        return 'border-purple-900/60';
      default:
        return 'border-gray-700/60';
    }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-lg
      bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95
      backdrop-filter backdrop-blur-sm
      border ${getVariantStyles()}
      shadow-lg
      hover:shadow-xl
      transition-all duration-300 ease-out
      ${className}
    `}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function HolographicDisplay({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95
      border border-gray-600/40
      rounded-lg
      backdrop-filter backdrop-blur-sm
      shadow-lg
      ${className}
    `}>
      {/* Content */}
      <div className="relative z-10 p-4">
        {children}
      </div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gray-500/40" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gray-500/40" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gray-500/40" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gray-500/40" />
    </div>
  );
}

export function DataStream({ data, className = '' }: { data: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, 100);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className={`font-mono text-xs text-green-400 space-y-1 ${className}`}>
      {data.map((line, index) => (
        <div 
          key={index}
          className={`
            transition-all duration-300
            ${index === currentIndex ? 'text-cyan-400 font-bold animate-pulse' : 'text-green-400/70'}
            ${index > currentIndex ? 'opacity-50' : 'opacity-100'}
          `}
        >
          <span className="text-cyan-400">[{Date.now().toString().slice(-6)}]</span> {line}
        </div>
      ))}
    </div>
  );
}

export function StatusIndicator({ 
  status, 
  label, 
  value,
  icon: Icon = Activity 
}: { 
  status: 'online' | 'warning' | 'critical' | 'offline';
  label: string;
  value?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'offline': return 'text-gray-500';
      default: return 'text-blue-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'offline': return <XCircle className="w-4 h-4" />;
      default: return <Icon className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 rounded border border-gray-600/40 bg-gray-800/60">
      <div className={getStatusColor()}>
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-300">{label}</div>
        {value && <div className={`text-lg font-mono ${getStatusColor()}`}>{value}</div>}
      </div>
    </div>
  );
}

export function NeuralNetworkVisualization({ className = '' }: { className?: string }) {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => 
        Math.floor(Math.random() * 12)
      ));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-64 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Network connections */}
        {Array.from({ length: 20 }, (_, i) => (
          <line
            key={i}
            x1={Math.random() * 400}
            y1={Math.random() * 200}
            x2={Math.random() * 400}
            y2={Math.random() * 200}
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="1"
            className="animate-pulse"
          />
        ))}
        
        {/* Neural nodes */}
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            cx={50 + (i % 4) * 100}
            cy={50 + Math.floor(i / 4) * 50}
            r={activeNodes.includes(i) ? "8" : "4"}
            fill={activeNodes.includes(i) ? "#00ffff" : "#00ff00"}
            className={activeNodes.includes(i) ? "animate-pulse" : ""}
            style={{
              filter: activeNodes.includes(i) ? 
                'drop-shadow(0 0 10px #00ffff)' : 
                'drop-shadow(0 0 5px #00ff00)'
            }}
          />
        ))}
        
        {/* Data flow particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <circle
            key={`particle-${i}`}
            cx={Math.random() * 400}
            cy={Math.random() * 200}
            r="2"
            fill="#ffffff"
            className="animate-ping"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export function CyberButton({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '' 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  className?: string;
}) {
  const getVariantStyles = () => {
    if (disabled) return 'border-gray-600 text-gray-500 bg-gray-900/50';
    
    switch (variant) {
      case 'danger':
        return 'border-red-700 text-red-300 bg-red-900/40 hover:bg-red-800/60';
      case 'success':
        return 'border-green-700 text-green-300 bg-green-900/40 hover:bg-green-800/60';
      case 'secondary':
        return 'border-purple-700 text-purple-300 bg-purple-900/40 hover:bg-purple-800/60';
      default:
        return 'border-blue-700 text-blue-300 bg-blue-900/40 hover:bg-blue-800/60';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 text-sm font-medium
        border rounded
        transition-all duration-200
        ${getVariantStyles()}
        ${className}
      `}
    >
      {children}
    </button>
  );
}