import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Globe, 
  Target, 
  AlertTriangle, 
  Filter, 
  Layers,
  ZoomIn,
  ZoomOut,
  MapPin,
  Activity,
  Eye,
  Shield
} from 'lucide-react';

interface ThreatLocation {
  id: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  threatType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  attackCount: number;
  timestamp: string;
  source: string;
  target: string;
}

interface MapFilters {
  severity: string[];
  threatType: string[];
  timeRange: number; // hours
  minAttackCount: number;
}

export function InteractiveThreatMap() {
  const [threats, setThreats] = useState<ThreatLocation[]>([]);
  const [filters, setFilters] = useState<MapFilters>({
    severity: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
    threatType: [],
    timeRange: 24,
    minAttackCount: 1
  });
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);
  const [mapStyle, setMapStyle] = useState('dark');
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    // Initialize threat data with global locations
    const threatData: ThreatLocation[] = [
      {
        id: 'threat_001',
        lat: 40.7128,
        lng: -74.0060,
        city: 'New York',
        country: 'United States',
        threatType: 'APT Campaign',
        severity: 'CRITICAL',
        attackCount: 247,
        timestamp: '2025-01-17T14:30:00Z',
        source: '185.220.101.42',
        target: 'Financial Services'
      },
      {
        id: 'threat_002',
        lat: 51.5074,
        lng: -0.1278,
        city: 'London',
        country: 'United Kingdom',
        threatType: 'Ransomware',
        severity: 'HIGH',
        attackCount: 156,
        timestamp: '2025-01-17T13:45:00Z',
        source: '91.240.118.172',
        target: 'Healthcare Systems'
      },
      {
        id: 'threat_003',
        lat: 35.6762,
        lng: 139.6503,
        city: 'Tokyo',
        country: 'Japan',
        threatType: 'DDoS Attack',
        severity: 'HIGH',
        attackCount: 423,
        timestamp: '2025-01-17T12:20:00Z',
        source: '103.8.238.188',
        target: 'E-commerce Platform'
      },
      {
        id: 'threat_004',
        lat: 52.5200,
        lng: 13.4050,
        city: 'Berlin',
        country: 'Germany',
        threatType: 'Phishing Campaign',
        severity: 'MEDIUM',
        attackCount: 89,
        timestamp: '2025-01-17T11:15:00Z',
        source: '46.161.14.101',
        target: 'Government Agencies'
      },
      {
        id: 'threat_005',
        lat: -33.8688,
        lng: 151.2093,
        city: 'Sydney',
        country: 'Australia',
        threatType: 'Data Breach',
        severity: 'CRITICAL',
        attackCount: 67,
        timestamp: '2025-01-17T10:30:00Z',
        source: '27.122.14.87',
        target: 'Telecommunications'
      },
      {
        id: 'threat_006',
        lat: 55.7558,
        lng: 37.6173,
        city: 'Moscow',
        country: 'Russia',
        threatType: 'State-Sponsored',
        severity: 'CRITICAL',
        attackCount: 312,
        timestamp: '2025-01-17T09:45:00Z',
        source: '5.188.206.14',
        target: 'Critical Infrastructure'
      },
      {
        id: 'threat_007',
        lat: 31.2304,
        lng: 121.4737,
        city: 'Shanghai',
        country: 'China',
        threatType: 'Supply Chain Attack',
        severity: 'HIGH',
        attackCount: 198,
        timestamp: '2025-01-17T08:20:00Z',
        source: '114.80.167.225',
        target: 'Manufacturing'
      },
      {
        id: 'threat_008',
        lat: 19.0760,
        lng: 72.8777,
        city: 'Mumbai',
        country: 'India',
        threatType: 'Malware Campaign',
        severity: 'MEDIUM',
        attackCount: 134,
        timestamp: '2025-01-17T07:10:00Z',
        source: '103.21.58.66',
        target: 'Financial Sector'
      },
      {
        id: 'threat_009',
        lat: -23.5505,
        lng: -46.6333,
        city: 'São Paulo',
        country: 'Brazil',
        threatType: 'Banking Trojan',
        severity: 'HIGH',
        attackCount: 276,
        timestamp: '2025-01-17T06:55:00Z',
        source: '179.191.81.202',
        target: 'Banking Systems'
      },
      {
        id: 'threat_010',
        lat: 30.0444,
        lng: 31.2357,
        city: 'Cairo',
        country: 'Egypt',
        threatType: 'Credential Theft',
        severity: 'MEDIUM',
        attackCount: 92,
        timestamp: '2025-01-17T05:40:00Z',
        source: '41.234.56.78',
        target: 'Government Services'
      }
    ];

    setThreats(threatData);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#DC2626'; // red-600
      case 'HIGH': return '#EA580C'; // orange-600
      case 'MEDIUM': return '#D97706'; // amber-600
      case 'LOW': return '#16A34A'; // green-600
      default: return '#6B7280'; // gray-500
    }
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 16;
      case 'HIGH': return 12;
      case 'MEDIUM': return 8;
      case 'LOW': return 6;
      default: return 4;
    }
  };

  const filteredThreats = threats.filter(threat => {
    if (!filters.severity.includes(threat.severity)) return false;
    if (filters.threatType.length > 0 && !filters.threatType.includes(threat.threatType)) return false;
    if (threat.attackCount < filters.minAttackCount) return false;
    
    const threatTime = new Date(threat.timestamp);
    const cutoffTime = new Date(Date.now() - filters.timeRange * 60 * 60 * 1000);
    if (threatTime < cutoffTime) return false;
    
    return true;
  });

  const threatTypes = Array.from(new Set(threats.map(t => t.threatType)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Globe className="h-10 w-10 text-cyan-400" />
            Interactive Threat Map
          </h1>
          <p className="text-slate-300 text-lg">
            Real-time geolocation visualization of global cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="h-5 w-5 text-cyan-400" />
                  Map Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Severity Filter */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Severity Levels</label>
                  <div className="space-y-2">
                    {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(severity => (
                      <label key={severity} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.severity.includes(severity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                severity: [...prev.severity, severity]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                severity: prev.severity.filter(s => s !== severity)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getSeverityColor(severity) }}
                          />
                          <span className="text-slate-300 text-sm">{severity}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Threat Type Filter */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Threat Types</label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select threat types" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {threatTypes.map(type => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Range */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Time Range: {filters.timeRange} hours
                  </label>
                  <Slider
                    value={[filters.timeRange]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, timeRange: value[0] }))}
                    max={168}
                    min={1}
                    step={1}
                    className="text-cyan-400"
                  />
                </div>

                {/* Attack Count Filter */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Min Attack Count: {filters.minAttackCount}
                  </label>
                  <Slider
                    value={[filters.minAttackCount]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minAttackCount: value[0] }))}
                    max={500}
                    min={1}
                    step={1}
                    className="text-cyan-400"
                  />
                </div>

                {/* Map Style */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Map Style</label>
                  <Select value={mapStyle} onValueChange={setMapStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="dark" className="text-white hover:bg-slate-600">Dark</SelectItem>
                      <SelectItem value="satellite" className="text-white hover:bg-slate-600">Satellite</SelectItem>
                      <SelectItem value="terrain" className="text-white hover:bg-slate-600">Terrain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Zoom Controls */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setZoom(Math.min(zoom + 1, 10))}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white flex-1"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setZoom(Math.max(zoom - 1, 1))}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white flex-1"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Threat Statistics */}
            <Card className="bg-slate-800 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-400" />
                  Live Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{filteredThreats.length}</div>
                  <div className="text-slate-400 text-sm">Active Threats</div>
                </div>
                
                <div className="space-y-2">
                  {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(severity => {
                    const count = filteredThreats.filter(t => t.severity === severity).length;
                    return (
                      <div key={severity} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getSeverityColor(severity) }}
                          />
                          <span className="text-slate-300 text-sm">{severity}</span>
                        </div>
                        <span className="text-white font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Visualization */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                    Global Threat Visualization
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-white">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Layers className="h-4 w-4 mr-1" />
                      Layers
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-slate-300">
                  Real-time cyber threat activity across the globe
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* SVG World Map Visualization */}
                <div className="relative h-96 bg-slate-900 rounded-lg overflow-hidden">
                  <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full"
                    style={{ background: mapStyle === 'dark' ? '#0f172a' : '#1e293b' }}
                  >
                    {/* World Map Outline (simplified) */}
                    <g stroke="#334155" strokeWidth="1" fill="#1e293b">
                      {/* Continents - simplified shapes */}
                      <path d="M150,100 L250,80 L300,120 L280,180 L200,200 L120,160 Z" />
                      <path d="M350,90 L500,85 L520,150 L480,200 L400,180 L340,140 Z" />
                      <path d="M520,120 L650,100 L680,160 L620,220 L560,200 Z" />
                      <path d="M700,110 L800,90 L850,140 L820,200 L750,180 Z" />
                      <path d="M100,250 L200,240 L250,300 L200,350 L120,330 Z" />
                      <path d="M600,280 L750,270 L780,340 L720,380 L650,360 Z" />
                    </g>

                    {/* Threat Markers */}
                    {filteredThreats.map((threat) => {
                      const x = ((threat.lng + 180) / 360) * 1000;
                      const y = ((90 - threat.lat) / 180) * 500;
                      const size = getSeveritySize(threat.severity);
                      const color = getSeverityColor(threat.severity);

                      return (
                        <g key={threat.id}>
                          {/* Pulsing ring animation */}
                          <circle
                            cx={x}
                            cy={y}
                            r={size + 4}
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            opacity="0.6"
                          >
                            <animate
                              attributeName="r"
                              values={`${size + 4};${size + 12};${size + 4}`}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.6;0.2;0.6"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          
                          {/* Main threat marker */}
                          <circle
                            cx={x}
                            cy={y}
                            r={size}
                            fill={color}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="cursor-pointer"
                            onClick={() => setSelectedThreat(threat)}
                          />
                          
                          {/* Attack count indicator */}
                          <text
                            x={x}
                            y={y + 3}
                            textAnchor="middle"
                            fontSize="8"
                            fill="white"
                            fontWeight="bold"
                          >
                            {threat.attackCount > 99 ? '99+' : threat.attackCount}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Threat Details Tooltip */}
                  {selectedThreat && (
                    <div className="absolute top-4 right-4 bg-slate-800 border border-slate-600 rounded-lg p-4 max-w-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{selectedThreat.threatType}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedThreat(null)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          ×
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Location:</span>
                          <span className="text-white">{selectedThreat.city}, {selectedThreat.country}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Severity:</span>
                          <Badge className={`${getSeverityColor(selectedThreat.severity)} text-white`}>
                            {selectedThreat.severity}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Attacks:</span>
                          <span className="text-white">{selectedThreat.attackCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Target:</span>
                          <span className="text-white">{selectedThreat.target}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Source IP:</span>
                          <span className="text-white font-mono text-xs">{selectedThreat.source}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-1">
                          <Shield className="h-3 w-3 mr-1" />
                          Block
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}