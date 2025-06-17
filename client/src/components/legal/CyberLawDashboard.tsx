import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  FileText, 
  Gavel, 
  Search, 
  Download, 
  Mail, 
  Shield, 
  Brain,
  BookOpen,
  AlertTriangle,
  Clock,
  User,
  Building,
  Eye,
  Lock
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface FIRDetails {
  incidentType: string;
  description: string;
  evidenceDescription: string;
  suspectedPerson?: string;
  financialLoss?: string;
  location: string;
  dateTime: string;
}

interface ForensicReport {
  caseId: string;
  evidenceType: string;
  findings: string;
  technicalDetails: string;
  digitalFootprint: string;
  recommendations: string;
}

export default function CyberLawDashboard() {
  const [firDetails, setFirDetails] = useState<FIRDetails>({
    incidentType: '',
    description: '',
    evidenceDescription: '',
    location: '',
    dateTime: ''
  });

  const [forensicReport, setForensicReport] = useState<ForensicReport>({
    caseId: '',
    evidenceType: '',
    findings: '',
    technicalDetails: '',
    digitalFootprint: '',
    recommendations: ''
  });

  const [legalQuery, setLegalQuery] = useState('');
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [gdprRequest, setGdprRequest] = useState({
    dataSubject: '',
    organization: '',
    requestType: 'deletion',
    description: ''
  });

  // AI-powered FIR generation
  const generateFIR = useMutation({
    mutationFn: async (details: FIRDetails) => {
      const response = await fetch('/api/legal/generate-fir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      if (!response.ok) throw new Error('FIR generation failed');
      return response.json();
    }
  });

  // Forensic report creator
  const createForensicReport = useMutation({
    mutationFn: async (report: ForensicReport) => {
      const response = await fetch('/api/legal/forensic-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      if (!response.ok) throw new Error('Report creation failed');
      return response.blob();
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forensic-report-${forensicReport.caseId}.pdf`;
      a.click();
    }
  });

  // Legal case search
  const searchCases = useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch('/api/legal/search-cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (!response.ok) throw new Error('Case search failed');
      return response.json();
    }
  });

  // GDPR request generator
  const generateGDPRRequest = useMutation({
    mutationFn: async (request: any) => {
      const response = await fetch('/api/legal/gdpr-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (!response.ok) throw new Error('GDPR request generation failed');
      return response.blob();
    },
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gdpr-request-${gdprRequest.dataSubject}.pdf`;
      a.click();
    }
  });

  // Legal chatbot query
  const queryLegalBot = useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch('/api/legal/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (!response.ok) throw new Error('Legal query failed');
      return response.json();
    }
  });

  const cyberLawSections = [
    { 
      section: 'IPC Section 419', 
      title: 'Cheating by personation',
      description: 'Applies to identity theft and impersonation cases',
      penalty: 'Up to 3 years imprisonment'
    },
    { 
      section: 'IPC Section 420', 
      title: 'Cheating and dishonestly inducing delivery of property',
      description: 'Covers online fraud and financial cybercrime',
      penalty: 'Up to 7 years imprisonment'
    },
    { 
      section: 'IT Act Section 66', 
      title: 'Computer related offences',
      description: 'General computer crimes and unauthorized access',
      penalty: 'Up to 3 years imprisonment or fine up to 5 lakhs'
    },
    { 
      section: 'IT Act Section 66C', 
      title: 'Identity theft',
      description: 'Fraudulent use of electronic signature, password or unique identification',
      penalty: 'Up to 3 years imprisonment and fine up to 1 lakh'
    },
    { 
      section: 'IT Act Section 66D', 
      title: 'Cheating by personation using computer resource',
      description: 'Cheating by personation using computer resource',
      penalty: 'Up to 3 years imprisonment and fine up to 1 lakh'
    },
    { 
      section: 'IT Act Section 67', 
      title: 'Publishing obscene information',
      description: 'Publishing or transmitting obscene material in electronic form',
      penalty: 'Up to 3 years imprisonment and fine up to 5 lakhs'
    }
  ];

  const recentCases = [
    {
      title: 'Shreya Singhal vs. Union of India',
      year: '2015',
      court: 'Supreme Court',
      relevance: 'Section 66A struck down as unconstitutional',
      citation: 'AIR 2015 SC 1523'
    },
    {
      title: 'State of Tamil Nadu vs. Suhas Katti',
      year: '2004',
      court: 'Sessions Court',
      relevance: 'First conviction under IT Act for cyberstalking',
      citation: '2004 CrLJ 4964'
    },
    {
      title: 'Avnish Bajaj vs. State',
      year: '2008',
      court: 'Delhi High Court',
      relevance: 'Intermediary liability and safe harbor provisions',
      citation: '2008 CrLJ 4480'
    }
  ];

  return (
    <div className="space-y-6 satya-bg min-h-screen p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Cyber Law & Legal Intelligence Center
        </h1>
        <p className="text-gray-400">
          AI-powered legal tools for cybercrime investigation and compliance
        </p>
      </div>

      <Tabs defaultValue="fir-generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-amber-500/30">
          <TabsTrigger value="fir-generator" className="data-[state=active]:bg-amber-600">
            <Scale className="h-4 w-4 mr-2" />
            FIR Generator
          </TabsTrigger>
          <TabsTrigger value="forensic-reports" className="data-[state=active]:bg-orange-600">
            <FileText className="h-4 w-4 mr-2" />
            Forensic Reports
          </TabsTrigger>
          <TabsTrigger value="case-law" className="data-[state=active]:bg-red-600">
            <Gavel className="h-4 w-4 mr-2" />
            Case Law
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-600">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="legal-bot" className="data-[state=active]:bg-purple-600">
            <Brain className="h-4 w-4 mr-2" />
            Legal Assistant
          </TabsTrigger>
        </TabsList>

        {/* FIR Generator */}
        <TabsContent value="fir-generator" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-400">
                <Scale className="h-5 w-5" />
                AI-Powered FIR Generator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Generate comprehensive cyber complaint with legal references
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Incident Type</label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                    value={firDetails.incidentType}
                    onChange={(e) => setFirDetails({...firDetails, incidentType: e.target.value})}
                  >
                    <option value="">Select incident type</option>
                    <option value="cyberstalking">Cyberstalking</option>
                    <option value="online-fraud">Online Fraud</option>
                    <option value="identity-theft">Identity Theft</option>
                    <option value="data-breach">Data Breach</option>
                    <option value="phishing">Phishing Attack</option>
                    <option value="ransomware">Ransomware</option>
                    <option value="cyberbullying">Cyberbullying</option>
                    <option value="fake-profile">Fake Profile</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={firDetails.dateTime}
                    onChange={(e) => setFirDetails({...firDetails, dateTime: e.target.value})}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Location</label>
                <Input
                  placeholder="Location where incident occurred"
                  value={firDetails.location}
                  onChange={(e) => setFirDetails({...firDetails, location: e.target.value})}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Incident Description</label>
                <Textarea
                  placeholder="Detailed description of the cybercrime incident..."
                  value={firDetails.description}
                  onChange={(e) => setFirDetails({...firDetails, description: e.target.value})}
                  className="min-h-[120px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Evidence Description</label>
                <Textarea
                  placeholder="Screenshots, emails, transaction details, URLs, etc."
                  value={firDetails.evidenceDescription}
                  onChange={(e) => setFirDetails({...firDetails, evidenceDescription: e.target.value})}
                  className="min-h-[80px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => generateFIR.mutate(firDetails)}
                  disabled={generateFIR.isPending || !firDetails.incidentType || !firDetails.description}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {generateFIR.isPending ? 'Generating...' : 'Generate FIR'}
                </Button>
                
                <Button variant="outline" className="border-amber-600 text-amber-400">
                  <Mail className="h-4 w-4 mr-2" />
                  Auto-Email to Cyber Cell
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal Sections Reference */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="text-amber-400">Applicable Legal Sections</CardTitle>
              <CardDescription className="text-gray-300">
                Quick reference for cyber law sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cyberLawSections.map((section) => (
                  <div key={section.section} className="p-4 bg-gray-800/50 rounded-lg border border-amber-500/20">
                    <Badge className="bg-amber-600 text-white mb-2">{section.section}</Badge>
                    <h4 className="font-semibold text-white text-sm mb-1">{section.title}</h4>
                    <p className="text-gray-400 text-xs mb-2">{section.description}</p>
                    <p className="text-amber-400 text-xs font-medium">{section.penalty}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forensic Reports */}
        <TabsContent value="forensic-reports" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <FileText className="h-5 w-5" />
                Court-Friendly Forensic Report Creator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Generate comprehensive forensic reports with timestamps and digital evidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Case ID</label>
                  <Input
                    placeholder="FIR/Case Reference Number"
                    value={forensicReport.caseId}
                    onChange={(e) => setForensicReport({...forensicReport, caseId: e.target.value})}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Evidence Type</label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                    value={forensicReport.evidenceType}
                    onChange={(e) => setForensicReport({...forensicReport, evidenceType: e.target.value})}
                  >
                    <option value="">Select evidence type</option>
                    <option value="digital-device">Digital Device</option>
                    <option value="network-logs">Network Logs</option>
                    <option value="email-headers">Email Headers</option>
                    <option value="social-media">Social Media Evidence</option>
                    <option value="financial-records">Financial Records</option>
                    <option value="mobile-data">Mobile Data</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Technical Findings</label>
                <Textarea
                  placeholder="Detailed technical analysis and findings..."
                  value={forensicReport.findings}
                  onChange={(e) => setForensicReport({...forensicReport, findings: e.target.value})}
                  className="min-h-[100px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Digital Footprint Analysis</label>
                <Textarea
                  placeholder="IP addresses, timestamps, metadata, hash values..."
                  value={forensicReport.digitalFootprint}
                  onChange={(e) => setForensicReport({...forensicReport, digitalFootprint: e.target.value})}
                  className="min-h-[100px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Recommendations</label>
                <Textarea
                  placeholder="Expert recommendations and preventive measures..."
                  value={forensicReport.recommendations}
                  onChange={(e) => setForensicReport({...forensicReport, recommendations: e.target.value})}
                  className="min-h-[80px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => createForensicReport.mutate(forensicReport)}
                  disabled={createForensicReport.isPending || !forensicReport.caseId}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {createForensicReport.isPending ? 'Generating...' : 'Generate PDF Report'}
                </Button>
                
                <Button variant="outline" className="border-orange-600 text-orange-400">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate XML Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Chain of Custody */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="text-orange-400">Digital Evidence Chain of Custody</CardTitle>
              <CardDescription className="text-gray-300">
                Maintain legal admissibility of digital evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-medium">Collection</span>
                    </div>
                    <p className="text-sm text-gray-300">Evidence collected and hashed</p>
                    <p className="text-xs text-gray-400 mt-1">SHA-256: 3f4a5b6c...</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Analysis</span>
                    </div>
                    <p className="text-sm text-gray-300">Forensic examination completed</p>
                    <p className="text-xs text-gray-400 mt-1">Integrity verified</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-purple-400" />
                      <span className="text-purple-400 font-medium">Documentation</span>
                    </div>
                    <p className="text-sm text-gray-300">Report generated for court</p>
                    <p className="text-xs text-gray-400 mt-1">Court-admissible format</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Law Search */}
        <TabsContent value="case-law" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Search className="h-5 w-5" />
                Indian Cyber Case Law Finder
              </CardTitle>
              <CardDescription className="text-gray-300">
                Search relevant precedents and legal citations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search cyber law cases, sections, or keywords..."
                  value={caseSearchQuery}
                  onChange={(e) => setCaseSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => searchCases.mutate(caseSearchQuery)}
                  disabled={searchCases.isPending || !caseSearchQuery}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-red-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{case_.title}</h4>
                      <Badge className="bg-red-600 text-white">{case_.year}</Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{case_.relevance}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{case_.court}</span>
                      <span className="text-xs text-red-400 font-mono">{case_.citation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tools */}
        <TabsContent value="compliance" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                GDPR Right to be Forgotten Request
              </CardTitle>
              <CardDescription className="text-gray-300">
                Generate compliant data deletion requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Data Subject Name</label>
                  <Input
                    placeholder="Full name of the data subject"
                    value={gdprRequest.dataSubject}
                    onChange={(e) => setGdprRequest({...gdprRequest, dataSubject: e.target.value})}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Organization</label>
                  <Input
                    placeholder="Company/organization name"
                    value={gdprRequest.organization}
                    onChange={(e) => setGdprRequest({...gdprRequest, organization: e.target.value})}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Request Type</label>
                <select 
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                  value={gdprRequest.requestType}
                  onChange={(e) => setGdprRequest({...gdprRequest, requestType: e.target.value})}
                >
                  <option value="deletion">Right to Erasure (Deletion)</option>
                  <option value="access">Right to Access</option>
                  <option value="rectification">Right to Rectification</option>
                  <option value="portability">Right to Data Portability</option>
                  <option value="restriction">Right to Restriction</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Description</label>
                <Textarea
                  placeholder="Specific details about the data to be processed..."
                  value={gdprRequest.description}
                  onChange={(e) => setGdprRequest({...gdprRequest, description: e.target.value})}
                  className="min-h-[100px] bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <Button
                onClick={() => generateGDPRRequest.mutate(gdprRequest)}
                disabled={generateGDPRRequest.isPending || !gdprRequest.dataSubject || !gdprRequest.organization}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {generateGDPRRequest.isPending ? 'Generating...' : 'Generate GDPR Request Letter'}
              </Button>
            </CardContent>
          </Card>

          {/* RTI Module */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="text-blue-400">RTI Drafting Module</CardTitle>
              <CardDescription className="text-gray-300">
                Right to Information requests for cybercrime investigations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Building className="h-8 w-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Government Agencies</h4>
                  <p className="text-sm text-gray-300">CERT-IN, MeitY, State Cyber Cells</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Response Timeline</h4>
                  <p className="text-sm text-gray-300">30 days as per RTI Act 2005</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Auto-Generated</h4>
                  <p className="text-sm text-gray-300">Legally compliant RTI applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal Assistant Bot */}
        <TabsContent value="legal-bot" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Brain className="h-5 w-5" />
                AI Legal Assistant
              </CardTitle>
              <CardDescription className="text-gray-300">
                Ask questions about cyber law and get expert guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Which section applies if someone creates a fake social media profile?"
                  value={legalQuery}
                  onChange={(e) => setLegalQuery(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => queryLegalBot.mutate(legalQuery)}
                  disabled={queryLegalBot.isPending || !legalQuery}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Ask
                </Button>
              </div>

              {/* Sample queries */}
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Sample queries:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Which section for online harassment?",
                    "GDPR compliance for Indian companies?",
                    "Jurisdiction in cross-border cybercrime?",
                    "Evidence requirements for digital proof?"
                  ].map((query) => (
                    <Badge 
                      key={query}
                      variant="outline" 
                      className="cursor-pointer border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      onClick={() => setLegalQuery(query)}
                    >
                      {query}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Legal terminology simplifier */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400 mb-2">Legal Term Simplifier</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Complex legal terminology explained in simple language for students and investigators.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-sm">
                    <span className="text-purple-400 font-medium">Mens Rea:</span>
                    <span className="text-gray-300"> Criminal intent or guilty mind</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-purple-400 font-medium">Actus Reus:</span>
                    <span className="text-gray-300"> The physical act of the crime</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-purple-400 font-medium">Prima Facie:</span>
                    <span className="text-gray-300"> Evidence sufficient to establish a fact</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-purple-400 font-medium">Locus Standi:</span>
                    <span className="text-gray-300"> Right to bring legal action</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}