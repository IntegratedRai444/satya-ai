import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UnifiedSidebar from '@/components/UnifiedSidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  Clock,
  Brain,
  Zap,
  Target,
  Eye,
  FileText,
  Server,
  Wifi,
  Bug,
  Users,
  Layers,
  Search,
  Download,
  Scan,
  Database,
  Mail,
  Github,
  Code,
  Settings,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Trash2,
  Scale
} from 'lucide-react';

interface SecurityScanRequest {
  target_type: 'website' | 'api' | 'mobile_app' | 'repository';
  target_url: string;
  scan_depth: 'basic' | 'comprehensive' | 'deep';
  include_subdomains?: boolean;
  check_dependencies?: boolean;
  scan_social_media?: boolean;
}

interface SecurityVulnerability {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  title: string;
  description: string;
  recommendation: string;
  cve_id?: string;
  affected_component: string;
  cvss_score?: number;
  fix_complexity: 'easy' | 'medium' | 'hard';
  estimated_fix_time: string;
}

interface SecurityScanResult {
  scan_id: string;
  target: SecurityScanRequest;
  security_score: number;
  total_vulnerabilities: number;
  vulnerabilities: SecurityVulnerability[];
  ssl_analysis: {
    has_ssl: boolean;
    certificate_valid: boolean;
    cipher_strength: string;
    protocol_version: string;
    expires_in_days: number;
    issues: string[];
  };
  headers_analysis: {
    missing_headers: string[];
    weak_headers: string[];
    security_headers_score: number;
    recommendations: string[];
  };
  dependency_analysis?: {
    total_dependencies: number;
    vulnerable_dependencies: number;
    outdated_dependencies: number;
    critical_vulnerabilities: number;
    package_manager: string;
  };
  compliance_check: {
    gdpr_ready: boolean;
    privacy_policy_exists: boolean;
    cookie_consent: boolean;
    data_encryption: boolean;
    compliance_score: number;
    missing_requirements: string[];
  };
  social_media_scan?: {
    fake_profiles_found: number;
    typosquatting_domains: number;
    phishing_attempts: number;
    brand_monitoring_alerts: string[];
  };
  timestamp: Date;
  pdf_report_url?: string;
}

interface ComplianceWizardResult {
  gdpr_checklist: {
    item: string;
    status: 'compliant' | 'non_compliant' | 'partial';
    description: string;
    action_required?: string;
  }[];
  privacy_policy: {
    exists: boolean;
    last_updated?: string;
    completeness_score: number;
    missing_sections: string[];
  };
  cookie_analysis: {
    consent_mechanism: boolean;
    cookie_types_declared: string[];
    third_party_cookies: number;
    tracking_scripts: string[];
  };
  data_protection: {
    encryption_in_transit: boolean;
    encryption_at_rest: boolean;
    data_retention_policy: boolean;
    user_rights_mechanism: boolean;
  };
}

export default function StartupSecurityAudit() {
  const [activeTab, setActiveTab] = useState('scan');
  const [scanTarget, setScanTarget] = useState('');
  const [scanType, setScanType] = useState<SecurityScanRequest['target_type']>('website');
  const [scanDepth, setScanDepth] = useState<SecurityScanRequest['scan_depth']>('comprehensive');
  const [includeSubdomains, setIncludeSubdomains] = useState(true);
  const [checkDependencies, setCheckDependencies] = useState(true);
  const [scanSocialMedia, setScanSocialMedia] = useState(true);
  const [scanHistory, setScanHistory] = useState<SecurityScanResult[]>([]);
  const [selectedScan, setSelectedScan] = useState<SecurityScanResult | null>(null);

  const queryClient = useQueryClient();

  // Security scan mutation
  const securityScanMutation = useMutation({
    mutationFn: async (scanRequest: SecurityScanRequest): Promise<SecurityScanResult> => {
      const response = await fetch('/api/security/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scanRequest)
      });
      if (!response.ok) throw new Error(`Security scan failed: ${response.statusText}`);
      return await response.json();
    },
    onSuccess: (data) => {
      setScanHistory(prev => [data, ...prev.slice(0, 19)]); // Keep last 20 scans
      setSelectedScan(data);
      queryClient.invalidateQueries({ queryKey: ['/api/security/scans'] });
    }
  });

  // Compliance wizard mutation
  const complianceWizardMutation = useMutation({
    mutationFn: async (domain: string): Promise<ComplianceWizardResult> => {
      const response = await fetch('/api/security/compliance-wizard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      if (!response.ok) throw new Error(`Compliance check failed: ${response.statusText}`);
      return await response.json();
    }
  });

  // Policy generator mutation
  const policyGeneratorMutation = useMutation({
    mutationFn: async (companyInfo: { 
      name: string; 
      type: string; 
      jurisdiction: string; 
      data_types: string[] 
    }) => {
      const response = await fetch('/api/security/generate-policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyInfo)
      });
      if (!response.ok) throw new Error(`Policy generation failed: ${response.statusText}`);
      return await response.json();
    }
  });

  const handleSecurityScan = () => {
    if (!scanTarget.trim()) return;

    const scanRequest: SecurityScanRequest = {
      target_type: scanType,
      target_url: scanTarget.trim(),
      scan_depth: scanDepth,
      include_subdomains: includeSubdomains,
      check_dependencies: checkDependencies,
      scan_social_media: scanSocialMedia
    };

    securityScanMutation.mutate(scanRequest);
  };

  const handleComplianceCheck = () => {
    if (!scanTarget.trim()) return;
    const domain = scanTarget.replace(/^https?:\/\//, '').split('/')[0];
    complianceWizardMutation.mutate(domain);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'info': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'api': return <Server className="w-4 h-4" />;
      case 'mobile_app': return <Activity className="w-4 h-4" />;
      case 'repository': return <Github className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#2a3441] to-[#1f2937]">
      <UnifiedSidebar />
      <div className="ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-[#1f2937] to-[#2a3441] rounded-xl p-8 border border-[#0ea5e9]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">Startup Security Audit AI</h1>
                  <p className="text-gray-400">Comprehensive Security Assessment & Compliance Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-[#0ea5e9] border-[#0ea5e9]/30">
                  HyperSatya X Powered
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0ea5e9]/10 border-[#0ea5e9]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Scan className="w-8 h-8 text-[#0ea5e9]" />
                    <div>
                      <div className="text-white text-xl font-bold">{scanHistory.length}</div>
                      <div className="text-gray-400 text-sm">Security Scans</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {selectedScan ? selectedScan.security_score : '--'}
                      </div>
                      <div className="text-gray-400 text-sm">Security Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {selectedScan ? selectedScan.total_vulnerabilities : '--'}
                      </div>
                      <div className="text-gray-400 text-sm">Vulnerabilities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Scale className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white text-xl font-bold">
                        {selectedScan ? selectedScan.compliance_check.compliance_score : '--'}%
                      </div>
                      <div className="text-gray-400 text-sm">GDPR Compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
              <TabsTrigger value="scan" className="text-white">Security Scan</TabsTrigger>
              <TabsTrigger value="results" className="text-white">Scan Results</TabsTrigger>
              <TabsTrigger value="compliance" className="text-white">GDPR Wizard</TabsTrigger>
              <TabsTrigger value="policies" className="text-white">Policy Generator</TabsTrigger>
              <TabsTrigger value="monitoring" className="text-white">Brand Monitor</TabsTrigger>
              <TabsTrigger value="history" className="text-white">Scan History</TabsTrigger>
            </TabsList>

            <TabsContent value="scan" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scan Configuration */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Scan className="w-5 h-5 text-[#0ea5e9]" />
                      Security Audit Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Target Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'website', label: 'Website', icon: Globe },
                          { value: 'api', label: 'API', icon: Server },
                          { value: 'mobile_app', label: 'Mobile App', icon: Activity },
                          { value: 'repository', label: 'Repository', icon: Github }
                        ].map((type) => (
                          <Button
                            key={type.value}
                            variant={scanType === type.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setScanType(type.value as any)}
                            className="text-white justify-start"
                          >
                            <type.icon className="w-4 h-4 mr-2" />
                            {type.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Target URL/Domain</label>
                      <Input
                        placeholder="https://your-startup.com or github.com/user/repo"
                        value={scanTarget}
                        onChange={(e) => setScanTarget(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Scan Depth</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'basic', label: 'Basic', time: '~5 min' },
                          { value: 'comprehensive', label: 'Comprehensive', time: '~15 min' },
                          { value: 'deep', label: 'Deep Scan', time: '~30 min' }
                        ].map((depth) => (
                          <Button
                            key={depth.value}
                            variant={scanDepth === depth.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setScanDepth(depth.value as any)}
                            className="text-white flex-col h-auto py-3"
                          >
                            <span>{depth.label}</span>
                            <span className="text-xs opacity-70">{depth.time}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-white text-sm font-medium">Scan Options</label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white text-sm">Include Subdomains</div>
                            <div className="text-gray-400 text-xs">Scan all subdomains for vulnerabilities</div>
                          </div>
                          <Button
                            variant={includeSubdomains ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIncludeSubdomains(!includeSubdomains)}
                          >
                            {includeSubdomains ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white text-sm">Check Dependencies</div>
                            <div className="text-gray-400 text-xs">Analyze package.json/requirements.txt</div>
                          </div>
                          <Button
                            variant={checkDependencies ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCheckDependencies(!checkDependencies)}
                          >
                            {checkDependencies ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white text-sm">Social Media Scan</div>
                            <div className="text-gray-400 text-xs">Check for fake profiles & phishing</div>
                          </div>
                          <Button
                            variant={scanSocialMedia ? "default" : "outline"}
                            size="sm"
                            onClick={() => setScanSocialMedia(!scanSocialMedia)}
                          >
                            {scanSocialMedia ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSecurityScan}
                      disabled={!scanTarget.trim() || securityScanMutation.isPending}
                      className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80"
                      size="lg"
                    >
                      {securityScanMutation.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Running Security Audit...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Start Security Audit
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Scan Features */}
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#0ea5e9]" />
                      What We Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-white text-sm font-medium">SSL/TLS Security</div>
                            <div className="text-gray-400 text-xs">Certificate validity, cipher strength, protocol version</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="text-white text-sm font-medium">Security Headers</div>
                            <div className="text-gray-400 text-xs">HSTS, CSP, X-Frame-Options, CORS configuration</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Bug className="w-5 h-5 text-red-400" />
                          <div>
                            <div className="text-white text-sm font-medium">Vulnerability Scan</div>
                            <div className="text-gray-400 text-xs">Open ports, outdated libraries, CVE database matching</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-purple-400" />
                          <div>
                            <div className="text-white text-sm font-medium">Dependencies Analysis</div>
                            <div className="text-gray-400 text-xs">Package vulnerabilities, outdated versions</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-yellow-400" />
                          <div>
                            <div className="text-white text-sm font-medium">Social Engineering</div>
                            <div className="text-gray-400 text-xs">Fake profiles, typosquatting, phishing attempts</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Scale className="w-5 h-5 text-orange-400" />
                          <div>
                            <div className="text-white text-sm font-medium">GDPR Compliance</div>
                            <div className="text-gray-400 text-xs">Privacy policy, cookie consent, data encryption</div>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-[#0ea5e9]/10 border-[#0ea5e9]/30">
                        <Info className="h-4 w-4 text-[#0ea5e9]" />
                        <AlertDescription className="text-gray-300">
                          All scans generate downloadable PDF reports with fix suggestions and compliance checklists.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {selectedScan ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Security Score Overview */}
                  <div className="lg:col-span-3">
                    <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-[#0ea5e9]" />
                            Security Assessment Results
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="text-white">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                            <Badge className={getSeverityColor(selectedScan.security_score >= 80 ? 'low' : selectedScan.security_score >= 60 ? 'medium' : 'high')}>
                              Score: {selectedScan.security_score}/100
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                          <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(selectedScan.security_score)}`}>
                              {selectedScan.security_score}
                            </div>
                            <div className="text-gray-400 text-sm">Security Score</div>
                            <Progress 
                              value={selectedScan.security_score} 
                              className="mt-2 h-2" 
                            />
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-400">
                              {selectedScan.total_vulnerabilities}
                            </div>
                            <div className="text-gray-400 text-sm">Vulnerabilities</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedScan.vulnerabilities.filter(v => v.severity === 'critical').length} Critical
                            </div>
                          </div>

                          <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(selectedScan.ssl_analysis.has_ssl ? 100 : 0)}`}>
                              {selectedScan.ssl_analysis.has_ssl ? '✓' : '✗'}
                            </div>
                            <div className="text-gray-400 text-sm">SSL Certificate</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Expires in {selectedScan.ssl_analysis.expires_in_days} days
                            </div>
                          </div>

                          <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(selectedScan.compliance_check.compliance_score)}`}>
                              {selectedScan.compliance_check.compliance_score}%
                            </div>
                            <div className="text-gray-400 text-sm">GDPR Compliance</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedScan.compliance_check.gdpr_ready ? 'Ready' : 'Issues Found'}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(selectedScan.target.target_type)}
                            <span className="text-white font-medium">{selectedScan.target.target_url}</span>
                            <Badge variant="outline" className="text-gray-400">
                              {selectedScan.target.scan_depth}
                            </Badge>
                          </div>
                          <div className="text-gray-400 text-sm">
                            Scanned: {new Date(selectedScan.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Vulnerabilities List */}
                  <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Bug className="w-5 h-5 text-red-400" />
                          Vulnerabilities Found
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96">
                          <div className="space-y-4">
                            {selectedScan.vulnerabilities.map((vuln, index) => (
                              <div key={index} className="bg-gray-800/30 rounded-lg p-4 border-l-4 border-l-red-400">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge className={getSeverityColor(vuln.severity)}>
                                      {vuln.severity.toUpperCase()}
                                    </Badge>
                                    {vuln.cvss_score && (
                                      <Badge variant="outline" className="text-gray-400">
                                        CVSS: {vuln.cvss_score}
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge variant="outline" className="text-blue-400">
                                    {vuln.fix_complexity} fix
                                  </Badge>
                                </div>

                                <div className="space-y-2">
                                  <div className="text-white font-medium">{vuln.title}</div>
                                  <div className="text-gray-400 text-sm">{vuln.description}</div>
                                  <div className="text-gray-500 text-xs">
                                    Component: {vuln.affected_component} • 
                                    Fix time: {vuln.estimated_fix_time}
                                  </div>
                                  
                                  <Alert className="bg-blue-500/10 border-blue-500/30">
                                    <AlertCircle className="h-4 w-4 text-blue-400" />
                                    <AlertDescription className="text-gray-300 text-sm">
                                      <strong>Fix:</strong> {vuln.recommendation}
                                    </AlertDescription>
                                  </Alert>
                                </div>
                              </div>
                            ))}

                            {selectedScan.vulnerabilities.length === 0 && (
                              <div className="text-center text-gray-400 py-8">
                                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                                No vulnerabilities found. Great security posture!
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Security Analysis Summary */}
                  <div>
                    <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20 mb-6">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Lock className="w-5 h-5 text-green-400" />
                          SSL Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">SSL Certificate</span>
                          <Badge className={selectedScan.ssl_analysis.has_ssl ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {selectedScan.ssl_analysis.has_ssl ? 'Valid' : 'Missing'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Protocol</span>
                          <span className="text-white text-sm">{selectedScan.ssl_analysis.protocol_version}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Cipher Strength</span>
                          <span className="text-white text-sm">{selectedScan.ssl_analysis.cipher_strength}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Expires</span>
                          <span className="text-white text-sm">{selectedScan.ssl_analysis.expires_in_days} days</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-400" />
                          Security Headers
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Headers Score</span>
                          <Badge className={getSeverityColor(selectedScan.headers_analysis.security_headers_score >= 80 ? 'low' : 'medium')}>
                            {selectedScan.headers_analysis.security_headers_score}/100
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-white text-sm font-medium">Missing Headers:</div>
                          {selectedScan.headers_analysis.missing_headers.map((header, index) => (
                            <Badge key={index} variant="outline" className="text-red-400 border-red-400/30 mr-1 mb-1">
                              {header}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="text-white text-sm font-medium">Recommendations:</div>
                          <div className="text-gray-400 text-xs space-y-1">
                            {selectedScan.headers_analysis.recommendations.slice(0, 3).map((rec, index) => (
                              <div key={index}>• {rec}</div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                  <CardContent className="p-12 text-center">
                    <Scan className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">No Scan Results</div>
                    <div className="text-gray-400 mb-6">Run a security audit to see detailed results here</div>
                    <Button onClick={() => setActiveTab('scan')} className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/80">
                      Start Security Scan
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-purple-400" />
                    GDPR Compliance Wizard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-white text-sm font-medium">Domain to Check</label>
                        <Input
                          placeholder="your-startup.com"
                          value={scanTarget}
                          onChange={(e) => setScanTarget(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white"
                        />
                      </div>

                      <Button 
                        onClick={handleComplianceCheck}
                        disabled={!scanTarget.trim() || complianceWizardMutation.isPending}
                        className="w-full bg-purple-600 hover:bg-purple-600/80"
                      >
                        {complianceWizardMutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Checking GDPR Compliance...
                          </>
                        ) : (
                          <>
                            <Scale className="w-4 h-4 mr-2" />
                            Run GDPR Compliance Check
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <div className="text-white text-sm font-medium mb-3">GDPR Compliance Checklist</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">Privacy Policy exists</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">Cookie consent mechanism</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">Data encryption in transit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">User rights mechanism</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">Data retention policy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {complianceWizardMutation.data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gray-800/30 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">GDPR Checklist Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-64">
                            <div className="space-y-3">
                              {complianceWizardMutation.data.gdpr_checklist.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg">
                                  {item.status === 'compliant' ? (
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                                  ) : item.status === 'partial' ? (
                                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                                  )}
                                  <div className="flex-1">
                                    <div className="text-white text-sm font-medium">{item.item}</div>
                                    <div className="text-gray-400 text-xs">{item.description}</div>
                                    {item.action_required && (
                                      <div className="text-blue-400 text-xs mt-1">Action: {item.action_required}</div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/30 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Privacy & Data Protection</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Privacy Policy</span>
                              <Badge className={complianceWizardMutation.data.privacy_policy.exists ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {complianceWizardMutation.data.privacy_policy.exists ? 'Exists' : 'Missing'}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Cookie Consent</span>
                              <Badge className={complianceWizardMutation.data.cookie_analysis.consent_mechanism ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {complianceWizardMutation.data.cookie_analysis.consent_mechanism ? 'Implemented' : 'Missing'}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Data Encryption</span>
                              <Badge className={complianceWizardMutation.data.data_protection.encryption_in_transit ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {complianceWizardMutation.data.data_protection.encryption_in_transit ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="text-white text-sm font-medium">Third-party Cookies</div>
                              <div className="text-gray-400 text-sm">
                                Found {complianceWizardMutation.data.cookie_analysis.third_party_cookies} third-party cookies
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-white text-sm font-medium">Missing Sections</div>
                              <div className="flex flex-wrap gap-1">
                                {complianceWizardMutation.data.privacy_policy.missing_sections.map((section, index) => (
                                  <Badge key={index} variant="outline" className="text-red-400 border-red-400/30 text-xs">
                                    {section}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-400" />
                    Auto-Generate Legal Policies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Policy Generator</div>
                    <div className="text-gray-400 mb-6">Generate GDPR-compliant privacy policies, terms & conditions, and security SOPs</div>
                    <Button variant="outline" className="text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Company Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-yellow-400" />
                    Brand & Phishing Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-400 py-8">
                    <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-white text-xl font-medium mb-2">Brand Monitoring</div>
                    <div className="text-gray-400 mb-6">Monitor for fake social profiles, typosquatting domains, and phishing attempts</div>
                    <Button variant="outline" className="text-white">
                      <Search className="w-4 h-4 mr-2" />
                      Start Brand Monitoring
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1f2937] to-[#2a3441] border-[#0ea5e9]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0ea5e9]" />
                    Scan History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {scanHistory.map((scan, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800/30 rounded-lg p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                          onClick={() => setSelectedScan(scan)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(scan.target.target_type)}
                              <span className="text-white font-medium">{scan.target.target_url}</span>
                            </div>
                            <Badge className={getSeverityColor(scan.security_score >= 80 ? 'low' : scan.security_score >= 60 ? 'medium' : 'high')}>
                              {scan.security_score}/100
                            </Badge>
                          </div>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Vulnerabilities</div>
                              <div className="text-white">{scan.total_vulnerabilities}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">SSL Status</div>
                              <div className="text-white">{scan.ssl_analysis.has_ssl ? 'Valid' : 'Invalid'}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">GDPR</div>
                              <div className="text-white">{scan.compliance_check.compliance_score}%</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Scanned</div>
                              <div className="text-white">{new Date(scan.timestamp).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {scanHistory.length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          No scans performed yet. Start by running a security audit above.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}