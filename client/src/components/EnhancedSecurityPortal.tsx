import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Shield, 
  Scan, 
  Bug, 
  Key, 
  Network, 
  Database, 
  Lock, 
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Globe,
  FileText,
  Download,
  Upload,
  Settings,
  Terminal,
  Code,
  Eye,
  Search,
  Zap,
  Target,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  BarChart3,
  Wifi,
  Server,
  Monitor
} from 'lucide-react';

interface SecurityTool {
  id: string;
  name: string;
  description: string;
  category: 'scanner' | 'analyzer' | 'generator' | 'monitor';
  icon: any;
  color: string;
  active: boolean;
}

interface VulnerabilityResult {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  cve?: string;
  cvss?: number;
  remediation: string;
}

interface SecurityMetrics {
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  networkSecurity: number;
  systemIntegrity: number;
  accessControl: number;
  dataProtection: number;
}

export default function EnhancedSecurityPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scanTarget, setScanTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<VulnerabilityResult[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    vulnerabilities: { critical: 2, high: 8, medium: 15, low: 23 },
    networkSecurity: 94,
    systemIntegrity: 87,
    accessControl: 96,
    dataProtection: 91
  });
  
  const { toast } = useToast();

  const securityTools: SecurityTool[] = [
    {
      id: 'vulnerability-scanner',
      name: 'Vulnerability Scanner',
      description: 'Advanced vulnerability detection and assessment',
      category: 'scanner',
      icon: Bug,
      color: 'red',
      active: true
    },
    {
      id: 'network-monitor',
      name: 'Network Monitor',
      description: 'Real-time network traffic analysis',
      category: 'monitor',
      icon: Network,
      color: 'blue',
      active: true
    },
    {
      id: 'port-scanner',
      name: 'Port Scanner',
      description: 'Discover open ports and services',
      category: 'scanner',
      icon: Search,
      color: 'purple',
      active: false
    },
    {
      id: 'ssl-analyzer',
      name: 'SSL/TLS Analyzer',
      description: 'Certificate and encryption analysis',
      category: 'analyzer',
      icon: Lock,
      color: 'green',
      active: false
    },
    {
      id: 'password-generator',
      name: 'Secure Password Generator',
      description: 'Generate cryptographically strong passwords',
      category: 'generator',
      icon: Key,
      color: 'yellow',
      active: true
    },
    {
      id: 'hash-analyzer',
      name: 'Hash Analyzer',
      description: 'Analyze and crack password hashes',
      category: 'analyzer',
      icon: Code,
      color: 'cyan',
      active: false
    }
  ];

  const runVulnerabilityScan = useMutation({
    mutationFn: async (target: string) => {
      setIsScanning(true);
      // Simulate scan delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults: VulnerabilityResult[] = [
        {
          id: 'vuln-1',
          severity: 'critical',
          title: 'SQL Injection Vulnerability',
          description: 'Potential SQL injection in login form parameter',
          location: '/login.php?user=',
          cve: 'CVE-2023-1234',
          cvss: 9.8,
          remediation: 'Implement parameterized queries and input validation'
        },
        {
          id: 'vuln-2',
          severity: 'high',
          title: 'Cross-Site Scripting (XSS)',
          description: 'Reflected XSS vulnerability in search parameter',
          location: '/search?q=',
          cvss: 7.4,
          remediation: 'Sanitize user input and implement Content Security Policy'
        },
        {
          id: 'vuln-3',
          severity: 'medium',
          title: 'Missing Security Headers',
          description: 'X-Frame-Options header not present',
          location: 'Global headers',
          cvss: 4.3,
          remediation: 'Add X-Frame-Options: DENY header'
        }
      ];
      
      return mockResults;
    },
    onSuccess: (results) => {
      setScanResults(results);
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: `Found ${results.length} vulnerabilities`,
      });
    },
    onError: () => {
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Unable to complete vulnerability scan",
        variant: "destructive",
      });
    },
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-blue-400 bg-blue-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const totalVulns = securityMetrics.vulnerabilities.critical + 
                   securityMetrics.vulnerabilities.high + 
                   securityMetrics.vulnerabilities.medium + 
                   securityMetrics.vulnerabilities.low;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Enhanced Security Portal
          </h1>
          <p className="text-blue-200 text-lg">
            Comprehensive security testing and monitoring tools for proactive defense
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="scanner" className="data-[state=active]:bg-blue-600">
              <Bug className="h-4 w-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-blue-600">
              <Monitor className="h-4 w-4 mr-2" />
              Monitor
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="academy" className="data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Academy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Network Security</p>
                      <p className="text-2xl font-bold text-white">{securityMetrics.networkSecurity}%</p>
                    </div>
                    <Network className="h-8 w-8 text-blue-400" />
                  </div>
                  <Progress value={securityMetrics.networkSecurity} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">System Integrity</p>
                      <p className="text-2xl font-bold text-white">{securityMetrics.systemIntegrity}%</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-400" />
                  </div>
                  <Progress value={securityMetrics.systemIntegrity} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Access Control</p>
                      <p className="text-2xl font-bold text-white">{securityMetrics.accessControl}%</p>
                    </div>
                    <Key className="h-8 w-8 text-purple-400" />
                  </div>
                  <Progress value={securityMetrics.accessControl} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Data Protection</p>
                      <p className="text-2xl font-bold text-white">{securityMetrics.dataProtection}%</p>
                    </div>
                    <Database className="h-8 w-8 text-cyan-400" />
                  </div>
                  <Progress value={securityMetrics.dataProtection} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Vulnerability Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Vulnerability Summary</CardTitle>
                  <CardDescription className="text-slate-300">
                    Current security vulnerabilities by severity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-white">Critical</span>
                      </div>
                      <Badge className="bg-red-600">{securityMetrics.vulnerabilities.critical}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-white">High</span>
                      </div>
                      <Badge className="bg-orange-600">{securityMetrics.vulnerabilities.high}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-white">Medium</span>
                      </div>
                      <Badge className="bg-yellow-600">{securityMetrics.vulnerabilities.medium}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-400" />
                        <span className="text-white">Low</span>
                      </div>
                      <Badge className="bg-blue-600">{securityMetrics.vulnerabilities.low}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Security Tools</CardTitle>
                  <CardDescription className="text-slate-300">
                    Currently running security monitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {securityTools.filter(tool => tool.active).map(tool => {
                      const IconComponent = tool.icon;
                      return (
                        <div key={tool.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <IconComponent className={`h-5 w-5 text-${tool.color}-400`} />
                            <span className="text-white font-medium">{tool.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bug className="h-5 w-5 text-red-400" />
                  Vulnerability Scanner
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Scan targets for security vulnerabilities and misconfigurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="scanTarget" className="text-white">Target URL or IP</Label>
                    <Input
                      id="scanTarget"
                      value={scanTarget}
                      onChange={(e) => setScanTarget(e.target.value)}
                      placeholder="https://example.com or 192.168.1.1"
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={() => runVulnerabilityScan.mutate(scanTarget)}
                      disabled={isScanning || !scanTarget}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isScanning ? (
                        <>
                          <Activity className="h-4 w-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Scan className="h-4 w-4 mr-2" />
                          Start Scan
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {scanResults.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Scan Results</CardTitle>
                  <CardDescription className="text-slate-300">
                    Found {scanResults.length} vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scanResults.map((vuln) => (
                      <div key={vuln.id} className="border border-slate-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold">{vuln.title}</h4>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{vuln.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                          <span>Location: {vuln.location}</span>
                          {vuln.cvss && <span>CVSS: {vuln.cvss}</span>}
                          {vuln.cve && <span>CVE: {vuln.cve}</span>}
                        </div>
                        <div className="bg-slate-900 rounded p-3">
                          <p className="text-sm text-slate-300">
                            <strong className="text-green-400">Remediation:</strong> {vuln.remediation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card key={tool.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <IconComponent className={`h-8 w-8 text-${tool.color}-400`} />
                        <Badge variant={tool.active ? "default" : "secondary"}>
                          {tool.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <CardTitle className="text-white">{tool.name}</CardTitle>
                      <CardDescription className="text-slate-300">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        variant={tool.active ? "default" : "outline"}
                      >
                        {tool.active ? 'Configure' : 'Activate'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="academy" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <Target className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Cybersecurity Academy
                </h2>
                <p className="text-slate-300 mb-6">
                  Master cybersecurity, blockchain, AI, and ethical hacking with structured daily learning paths.
                  Complete courses in 30 days with daily achievements and progress tracking.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">6 Course Categories</h3>
                    <ul className="text-slate-400 text-sm space-y-1">
                      <li>• Cybersecurity Fundamentals</li>
                      <li>• Blockchain & Web3 Security</li>
                      <li>• AI & ML Security</li>
                      <li>• Cybersecurity Law & Compliance</li>
                      <li>• Ethical Hacking & Penetration Testing</li>
                      <li>• Secure Web3 Development</li>
                    </ul>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">Learning Features</h3>
                    <ul className="text-slate-400 text-sm space-y-1">
                      <li>• Daily structured modules</li>
                      <li>• Hands-on labs and exercises</li>
                      <li>• Achievement system</li>
                      <li>• Community leaderboards</li>
                      <li>• Certificate upon completion</li>
                      <li>• Study groups and collaboration</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = '/cybersecurity-academy'}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Access Academy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}