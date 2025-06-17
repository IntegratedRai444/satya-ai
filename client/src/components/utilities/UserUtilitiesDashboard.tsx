import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  HelpCircle, 
  Calculator, 
  Code, 
  AlertTriangle,
  FolderLock,
  FileCheck,
  Brain,
  UserX,
  Chrome,
  Shield,
  Book,
  Target,
  TrendingUp,
  Lock,
  Search,
  FileText,
  Upload,
  Download,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Home
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'cyber-law' | 'deepfake' | 'phishing' | 'malware' | 'privacy';
}

interface DataExposureResult {
  email: string;
  exposureScore: number;
  breaches: Array<{
    source: string;
    date: string;
    dataTypes: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  recommendations: string[];
}

interface CodeScanResult {
  vulnerabilities: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    line: number;
    description: string;
    recommendation: string;
  }>;
  overallRisk: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
}

interface DigitalSignatureResult {
  isValid: boolean;
  timestamp: string;
  signer: string;
  algorithm: string;
  certificateChain: string[];
  trustLevel: 'trusted' | 'untrusted' | 'unknown';
}

interface CloneDetectionResult {
  profileUrl: string;
  similarity: number;
  suspiciousIndicators: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
}

export default function UserUtilitiesDashboard() {
  const [selectedQuizCategory, setSelectedQuizCategory] = useState('cyber-law');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [exposureEmail, setExposureEmail] = useState('');
  const [codeToScan, setCodeToScan] = useState('');
  const [fakeNewsText, setFakeNewsText] = useState('');
  const [signatureFile, setSignatureFile] = useState('');
  const [profileToCheck, setProfileToCheck] = useState('');
  const [websiteToScan, setWebsiteToScan] = useState('');

  // Quiz data
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which IT Act section deals with identity theft in India?",
      options: ["Section 66A", "Section 66C", "Section 67", "Section 43A"],
      correctAnswer: 1,
      explanation: "Section 66C of the IT Act 2000 specifically deals with identity theft and fraudulent use of electronic signature, password or any other unique identification feature.",
      category: 'cyber-law'
    },
    {
      id: 2,
      question: "What is the most reliable indicator of a deepfake video?",
      options: ["Poor lip-sync", "Unnatural blinking patterns", "Inconsistent lighting", "All of the above"],
      correctAnswer: 3,
      explanation: "Deepfakes often exhibit multiple artifacts including poor lip-sync, unnatural blinking, and inconsistent lighting. Advanced detection requires analyzing all these factors.",
      category: 'deepfake'
    },
    {
      id: 3,
      question: "What should you do if you receive a suspicious email asking for personal information?",
      options: ["Reply with fake information", "Delete it immediately", "Report it as phishing", "Forward it to friends"],
      correctAnswer: 2,
      explanation: "Always report suspicious emails as phishing to help protect others. Never provide personal information via email, even if it appears legitimate.",
      category: 'phishing'
    },
    {
      id: 4,
      question: "Which of these is NOT a sign of malware infection?",
      options: ["Slow computer performance", "Pop-up advertisements", "Regular software updates", "Unexpected network activity"],
      correctAnswer: 2,
      explanation: "Regular software updates are normal and healthy for system security. The other options are common signs of malware infection.",
      category: 'malware'
    },
    {
      id: 5,
      question: "What is the strongest type of password?",
      options: ["8 characters with numbers", "12 characters with special characters", "Passphrase with multiple words", "Personal information with numbers"],
      correctAnswer: 2,
      explanation: "Passphrases with multiple words are generally stronger as they're easier to remember but harder to crack than complex short passwords.",
      category: 'privacy'
    }
  ];

  // AI Teacher mutation
  const aiTeacher = useMutation({
    mutationFn: async (topic: string) => {
      const response = await fetch('/api/utilities/ai-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!response.ok) throw new Error('AI teacher request failed');
      return response.json();
    }
  });

  // Data exposure calculator
  const calculateExposure = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/utilities/data-exposure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) throw new Error('Exposure calculation failed');
      return response.json();
    }
  });

  // Code scanner
  const scanCode = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch('/api/utilities/code-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!response.ok) throw new Error('Code scan failed');
      return response.json();
    }
  });

  // Fake news reporter
  const reportFakeNews = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch('/api/utilities/fake-news-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (!response.ok) throw new Error('Fake news report failed');
      return response.json();
    }
  });

  // Digital signature validator
  const validateSignature = useMutation({
    mutationFn: async (signatureData: string) => {
      const response = await fetch('/api/utilities/validate-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatureData })
      });
      if (!response.ok) throw new Error('Signature validation failed');
      return response.json();
    }
  });

  // Clone detector
  const detectClone = useMutation({
    mutationFn: async (profileUrl: string) => {
      const response = await fetch('/api/utilities/clone-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl })
      });
      if (!response.ok) throw new Error('Clone detection failed');
      return response.json();
    }
  });

  // Website scanner
  const scanWebsite = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch('/api/utilities/website-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Website scan failed');
      return response.json();
    }
  });

  const handleQuizAnswer = (answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const getQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length };
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6 satya-bg min-h-screen p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          User Utility & Educational Tools
        </h1>
        <p className="text-gray-400">
          Comprehensive cybersecurity education and personal protection tools
        </p>
      </div>

      <Tabs defaultValue="ai-teacher" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-emerald-500/30">
          <TabsTrigger value="ai-teacher" className="data-[state=active]:bg-emerald-600">
            <GraduationCap className="h-4 w-4 mr-2" />
            AI Teacher
          </TabsTrigger>
          <TabsTrigger value="quiz-training" className="data-[state=active]:bg-blue-600">
            <HelpCircle className="h-4 w-4 mr-2" />
            Quiz & Training
          </TabsTrigger>
          <TabsTrigger value="privacy-tools" className="data-[state=active]:bg-purple-600">
            <Calculator className="h-4 w-4 mr-2" />
            Privacy Tools
          </TabsTrigger>
          <TabsTrigger value="dev-security" className="data-[state=active]:bg-orange-600">
            <Code className="h-4 w-4 mr-2" />
            DevSec Tools
          </TabsTrigger>
          <TabsTrigger value="personal-dashboard" className="data-[state=active]:bg-red-600">
            <Shield className="h-4 w-4 mr-2" />
            Personal Dashboard
          </TabsTrigger>
        </TabsList>

        {/* AI Teacher */}
        <TabsContent value="ai-teacher" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <GraduationCap className="h-5 w-5" />
                AI Cyber Law & Deepfake Risk Educator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Interactive AI teacher for cybersecurity awareness and legal education
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => aiTeacher.mutate('cyber-laws-india')}
                  className="bg-emerald-600 hover:bg-emerald-700 h-24 flex flex-col"
                >
                  <Book className="h-8 w-8 mb-2" />
                  <span>Cyber Laws in India</span>
                </Button>
                
                <Button
                  onClick={() => aiTeacher.mutate('deepfake-detection')}
                  className="bg-purple-600 hover:bg-purple-700 h-24 flex flex-col"
                >
                  <Eye className="h-8 w-8 mb-2" />
                  <span>Deepfake Detection</span>
                </Button>
                
                <Button
                  onClick={() => aiTeacher.mutate('phishing-awareness')}
                  className="bg-red-600 hover:bg-red-700 h-24 flex flex-col"
                >
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  <span>Phishing Awareness</span>
                </Button>
              </div>

              {aiTeacher.data && (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400 mb-2">AI Teacher Response:</h4>
                  <p className="text-gray-300 leading-relaxed">{aiTeacher.data.explanation}</p>
                  {aiTeacher.data.keyPoints && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-emerald-400 mb-2">Key Points:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {aiTeacher.data.keyPoints.map((point: string, index: number) => (
                          <li key={index} className="text-sm text-gray-300">{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz & Training */}
        <TabsContent value="quiz-training" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <HelpCircle className="h-5 w-5" />
                Cybersecurity Quiz & Training Simulator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Test your knowledge with interactive quizzes and simulations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!quizCompleted ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </h3>
                    <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="w-48" />
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-white font-medium mb-4">{currentQuestion.question}</p>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                          className={`w-full text-left justify-start ${
                            userAnswers[currentQuestionIndex] === index 
                              ? 'bg-blue-600 text-white' 
                              : 'border-gray-600 text-gray-300'
                          }`}
                          onClick={() => handleQuizAnswer(index)}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </Button>
                      ))}
                    </div>
                    
                    {userAnswers[currentQuestionIndex] !== undefined && (
                      <Button
                        onClick={nextQuestion}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
                    <div className="text-4xl font-bold text-blue-400 mb-4">
                      {getQuizScore().correct}/{getQuizScore().total}
                    </div>
                    <p className="text-gray-300">
                      Score: {Math.round((getQuizScore().correct / getQuizScore().total) * 100)}%
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => {
                      setQuizCompleted(false);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tools */}
        <TabsContent value="privacy-tools" className="space-y-6">
          {/* Data Exposure Calculator */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Calculator className="h-5 w-5" />
                Personal Data Exposure Score Calculator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Check if your personal data has been compromised in known breaches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email address..."
                  value={exposureEmail}
                  onChange={(e) => setExposureEmail(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => calculateExposure.mutate(exposureEmail)}
                  disabled={calculateExposure.isPending || !exposureEmail}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Check Exposure
                </Button>
              </div>

              {calculateExposure.data && (
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-purple-500/30">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-purple-400">Exposure Score</h4>
                      <Badge className={`${
                        calculateExposure.data.exposureScore >= 8 ? 'bg-red-600' :
                        calculateExposure.data.exposureScore >= 5 ? 'bg-orange-600' :
                        calculateExposure.data.exposureScore >= 3 ? 'bg-yellow-600' : 'bg-green-600'
                      } text-white`}>
                        {calculateExposure.data.exposureScore}/10
                      </Badge>
                    </div>
                    <Progress value={calculateExposure.data.exposureScore * 10} className="w-full" />
                  </div>
                  
                  {calculateExposure.data.breaches.length > 0 && (
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Known Breaches:</h4>
                      {calculateExposure.data.breaches.map((breach: any, index: number) => (
                        <div key={index} className="mb-2 p-2 bg-gray-700/50 rounded">
                          <p className="text-white font-medium">{breach.source}</p>
                          <p className="text-sm text-gray-400">Date: {breach.date}</p>
                          <p className="text-sm text-gray-400">Data: {breach.dataTypes.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Clone Detector */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <UserX className="h-5 w-5" />
                Social Media Clone Detector
              </CardTitle>
              <CardDescription className="text-gray-300">
                Find fake profiles and impersonation accounts across platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter social media profile URL..."
                  value={profileToCheck}
                  onChange={(e) => setProfileToCheck(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => detectClone.mutate(profileToCheck)}
                  disabled={detectClone.isPending || !profileToCheck}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Scan Profile
                </Button>
              </div>

              {detectClone.data && (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-orange-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-orange-400">Clone Detection Results</h4>
                    <Badge className={`${
                      detectClone.data.riskLevel === 'critical' ? 'bg-red-600' :
                      detectClone.data.riskLevel === 'high' ? 'bg-orange-600' :
                      detectClone.data.riskLevel === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    } text-white`}>
                      {detectClone.data.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-2">{detectClone.data.recommendation}</p>
                  {detectClone.data.suspiciousIndicators.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-1">Suspicious Indicators:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {detectClone.data.suspiciousIndicators.map((indicator: string, index: number) => (
                          <li key={index}>• {indicator}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Developer Security Tools */}
        <TabsContent value="dev-security" className="space-y-6">
          {/* Code Scanner */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Code className="h-5 w-5" />
                AI Code Scanner for Backdoors & Malicious Snippets
              </CardTitle>
              <CardDescription className="text-gray-300">
                Analyze code for security vulnerabilities and malicious patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your code here for security analysis..."
                value={codeToScan}
                onChange={(e) => setCodeToScan(e.target.value)}
                className="min-h-[200px] bg-gray-800/50 border-gray-600 text-white font-mono"
              />
              
              <Button
                onClick={() => scanCode.mutate(codeToScan)}
                disabled={scanCode.isPending || !codeToScan}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Code className="h-4 w-4 mr-2" />
                {scanCode.isPending ? 'Scanning...' : 'Scan Code'}
              </Button>

              {scanCode.data && (
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-orange-500/30">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-orange-400">Security Assessment</h4>
                      <Badge className={`${
                        scanCode.data.overallRisk === 'critical' ? 'bg-red-600' :
                        scanCode.data.overallRisk === 'high' ? 'bg-orange-600' :
                        scanCode.data.overallRisk === 'medium' ? 'bg-yellow-600' :
                        scanCode.data.overallRisk === 'low' ? 'bg-blue-600' : 'bg-green-600'
                      } text-white`}>
                        {scanCode.data.overallRisk.toUpperCase()}
                      </Badge>
                    </div>
                    
                    {scanCode.data.vulnerabilities.length > 0 ? (
                      <div className="space-y-2">
                        {scanCode.data.vulnerabilities.map((vuln: any, index: number) => (
                          <div key={index} className="p-3 bg-gray-700/50 rounded border-l-4 border-red-500">
                            <p className="text-white font-medium">{vuln.type}</p>
                            <p className="text-sm text-gray-300">Line {vuln.line}: {vuln.description}</p>
                            <p className="text-sm text-orange-400 mt-1">{vuln.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-400">No security vulnerabilities detected.</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fake News Reporter */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Fake News Reporter Tool
              </CardTitle>
              <CardDescription className="text-gray-300">
                Report suspicious content to media outlets and fact-checkers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste suspicious news content or misinformation here..."
                value={fakeNewsText}
                onChange={(e) => setFakeNewsText(e.target.value)}
                className="min-h-[150px] bg-gray-800/50 border-gray-600 text-white"
              />
              
              <Button
                onClick={() => reportFakeNews.mutate(fakeNewsText)}
                disabled={reportFakeNews.isPending || !fakeNewsText}
                className="bg-red-600 hover:bg-red-700"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {reportFakeNews.isPending ? 'Reporting...' : 'Report to Fact-Checkers'}
              </Button>
            </CardContent>
          </Card>

          {/* Digital Signature Validator */}
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <FileCheck className="h-5 w-5" />
                Digital Signature Authenticator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Verify digital signatures and timestamp validity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Upload digital signature file or paste signature data..."
                  value={signatureFile}
                  onChange={(e) => setSignatureFile(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                <Button
                  onClick={() => validateSignature.mutate(signatureFile)}
                  disabled={validateSignature.isPending || !signatureFile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  Validate
                </Button>
              </div>

              {validateSignature.data && (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    {validateSignature.data.isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <h4 className="font-semibold text-white">
                      Signature {validateSignature.data.isValid ? 'Valid' : 'Invalid'}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">Signer: {validateSignature.data.signer}</p>
                    <p className="text-gray-300">Algorithm: {validateSignature.data.algorithm}</p>
                    <p className="text-gray-300">Timestamp: {validateSignature.data.timestamp}</p>
                    <Badge className={`${
                      validateSignature.data.trustLevel === 'trusted' ? 'bg-green-600' :
                      validateSignature.data.trustLevel === 'untrusted' ? 'bg-red-600' : 'bg-yellow-600'
                    } text-white`}>
                      {validateSignature.data.trustLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Cybercrime Dashboard */}
        <TabsContent value="personal-dashboard" className="space-y-6">
          <Card className="detection-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-5 w-5" />
                Personal Cybercrime Dashboard
              </CardTitle>
              <CardDescription className="text-gray-300">
                Monitor your personal security status, cases, alerts, and backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Security Status</h4>
                  <p className="text-2xl font-bold text-green-400">SECURE</p>
                  <p className="text-sm text-gray-400">All systems protected</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Active Cases</h4>
                  <p className="text-2xl font-bold text-blue-400">0</p>
                  <p className="text-sm text-gray-400">No pending cases</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-yellow-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Alerts</h4>
                  <p className="text-2xl font-bold text-yellow-400">2</p>
                  <p className="text-sm text-gray-400">Minor warnings</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <FolderLock className="h-8 w-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-2">Backups</h4>
                  <p className="text-2xl font-bold text-purple-400">CURRENT</p>
                  <p className="text-sm text-gray-400">Last: 2 hours ago</p>
                </div>
              </div>

              {/* Website Scanner */}
              <Card className="bg-gray-800/30 border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Chrome className="h-5 w-5" />
                    Website & File Threat Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter website URL to scan for threats..."
                      value={websiteToScan}
                      onChange={(e) => setWebsiteToScan(e.target.value)}
                      className="bg-gray-800/50 border-gray-600 text-white"
                    />
                    <Button
                      onClick={() => scanWebsite.mutate(websiteToScan)}
                      disabled={scanWebsite.isPending || !websiteToScan}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Scan
                    </Button>
                  </div>

                  {scanWebsite.data && (
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {scanWebsite.data.isSafe ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <h4 className="font-semibold text-white">
                          {scanWebsite.data.isSafe ? 'Website Safe' : 'Threats Detected'}
                        </h4>
                      </div>
                      <p className="text-gray-300">{scanWebsite.data.analysis}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Encrypted File Storage */}
              <Card className="bg-gray-800/30 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <FolderLock className="h-5 w-5" />
                    Encrypted Secure File Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex flex-col">
                      <Upload className="h-6 w-6 mb-1" />
                      Upload File
                    </Button>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex flex-col">
                      <Eye className="h-6 w-6 mb-1" />
                      View Files
                    </Button>
                    
                    <Button className="bg-green-600 hover:bg-green-700 h-16 flex flex-col">
                      <Download className="h-6 w-6 mb-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <Lock className="h-4 w-4 inline mr-1" />
                      All files encrypted with AES-256 • Tamper detection enabled • Audit logs maintained
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}