export interface ThreatLocation {
  x: number;
  y: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  region: string;
  count: number;
}

export interface NetworkNodeData {
  id: string;
  x: number;
  y: number;
  z: number;
  type: 'server' | 'workstation' | 'router' | 'switch';
  status: 'online' | 'offline' | 'compromised';
  threatLevel: number;
  name: string;
}

export const generateThreatLocations = (): ThreatLocation[] => {
  return [
    // North America
    { x: 160, y: 120, severity: 'critical', region: 'North America', count: 15 },
    { x: 140, y: 130, severity: 'high', region: 'North America', count: 8 },
    { x: 180, y: 110, severity: 'medium', region: 'North America', count: 23 },
    
    // Europe
    { x: 400, y: 100, severity: 'critical', region: 'Europe', count: 12 },
    { x: 380, y: 110, severity: 'high', region: 'Europe', count: 19 },
    { x: 420, y: 95, severity: 'low', region: 'Europe', count: 31 },
    
    // Asia
    { x: 600, y: 80, severity: 'critical', region: 'Asia', count: 22 },
    { x: 580, y: 90, severity: 'high', region: 'Asia', count: 16 },
    { x: 620, y: 85, severity: 'medium', region: 'Asia', count: 28 },
    { x: 590, y: 100, severity: 'low', region: 'Asia', count: 45 },
    
    // Africa
    { x: 390, y: 200, severity: 'medium', region: 'Africa', count: 7 },
    { x: 410, y: 190, severity: 'low', region: 'Africa', count: 12 },
    
    // South America
    { x: 220, y: 250, severity: 'high', region: 'South America', count: 9 },
    { x: 240, y: 240, severity: 'medium', region: 'South America', count: 14 },
    
    // Australia
    { x: 650, y: 280, severity: 'low', region: 'Australia', count: 5 }
  ];
};

export const generateNetworkNodes = (count: number = 50): NetworkNodeData[] => {
  const nodes: NetworkNodeData[] = [];
  const types: NetworkNodeData['type'][] = ['server', 'workstation', 'router', 'switch'];
  const statuses: NetworkNodeData['status'][] = ['online', 'offline', 'compromised'];
  
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `node-${i}`,
      x: Math.random() * 800,
      y: Math.random() * 400,
      z: Math.random() * 200,
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      threatLevel: Math.floor(Math.random() * 100),
      name: `${types[Math.floor(Math.random() * types.length)].toUpperCase()}-${String(i).padStart(3, '0')}`
    });
  }
  
  return nodes;
};

export const generateThreatAnalysis = () => {
  const threatTypes = [
    'Advanced Persistent Threat',
    'Ransomware Activity',
    'Data Exfiltration',
    'Lateral Movement',
    'Credential Harvesting',
    'Zero-day Exploit',
    'Phishing Campaign',
    'Malware Detection',
    'Suspicious Login',
    'Network Anomaly'
  ];

  const descriptions = [
    'Multi-stage attack identified',
    'Encrypted systems detected',
    'Unauthorized data access',
    'Privilege escalation attempt',
    'Password spraying detected',
    'Unknown vulnerability exploited',
    'Social engineering attempt',
    'Trojan horse identified',
    'Unusual access pattern',
    'Traffic anomaly detected'
  ];

  return {
    type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    confidence: Math.floor(Math.random() * 30) + 70,
    severity: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 4)]
  };
};

export const securityMetricsHistory = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
  criticalThreats: Math.floor(Math.random() * 30) + 20,
  highThreats: Math.floor(Math.random() * 80) + 40,
  mediumThreats: Math.floor(Math.random() * 60) + 30,
  lowThreats: Math.floor(Math.random() * 100) + 50,
  activeIncidents: Math.floor(Math.random() * 50) + 100,
  resolvedThreats: Math.floor(Math.random() * 100) + 2800,
  aiConfidence: Math.floor(Math.random() * 10) + 90,
  activeNodes: Math.floor(Math.random() * 100) + 1200,
  totalConnections: Math.floor(Math.random() * 500) + 3500,
  anomalies: Math.floor(Math.random() * 20) + 10
}));
