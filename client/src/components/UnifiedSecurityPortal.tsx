import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import LiveThreatIntelligenceTimeline from './LiveThreatIntelligenceTimeline';
import { SecurityLayer } from '@shared/securityLayers';
import { 
  Bot, 
  Shield, 
  Star, 
  Trophy, 
  Target, 
  Brain, 
  Eye, 
  Zap,
  Heart,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  Award,
  GamepadIcon,
  Clock,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info,
  Gift,
  Sparkles,
  Users,
  Globe,
  Lock,
  Unlock,
  Search,
  Settings,
  BookOpen,
  GraduationCap,
  Puzzle,
  Upload,
  FileText,
  Database,
  Network,
  Cpu,
  HardDrive,
  Router,
  Fingerprint,
  KeyRound,
  Scan,
  Activity,
  Download,
  Crosshair,
  Radar,
  Code,
  Video,
  Music,
  Filter,
  PieChart,
  LineChart,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface MascotPersonality {
  name: string;
  mood: 'happy' | 'excited' | 'focused' | 'concerned' | 'proud';
  level: number;
  experience: number;
  maxExperience: number;
  skills: string[];
  achievements: Achievement[];
  currentTips: SecurityTip[];
}

interface SecurityTip {
  id: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  interactive: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'detection' | 'prevention' | 'collaboration';
  points: number;
  unlocked: boolean;
  date?: string;
  icon: string;
}

interface ThreatChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'malware' | 'phishing' | 'social-engineering' | 'network-security';
  scenario: string;
  options: ChallengeOption[];
  correctAnswer: string;
  explanation: string;
  points: number;
  timeLimit: number;
  completed: boolean;
}

interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface SkillTreeNode {
  id: string;
  title: string;
  description: string;
  category: 'fundamentals' | 'advanced' | 'specialist' | 'expert';
  prerequisites: string[];
  unlocked: boolean;
  completed: boolean;
  skills: string[];
  position: { x: number; y: number };
}

export default function UnifiedSecurityPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analysisType, setAnalysisType] = useState('image');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Mascot State
  const [mascot, setMascot] = useState<MascotPersonality>({
    name: 'CyberGuard',
    mood: 'happy',
    level: 5,
    experience: 750,
    maxExperience: 1000,
    skills: ['Threat Detection', 'Risk Assessment', 'Incident Response'],
    achievements: [],
    currentTips: []
  });
  
  // Challenge State
  const [currentChallenge, setCurrentChallenge] = useState<ThreatChallenge | null>(null);
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [userProgress, setUserProgress] = useState({
    totalPoints: 2850,
    level: 12,
    challengesCompleted: 45,
    streakDays: 7,
    skillsUnlocked: 23
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Security analysis mutation
  const analysisMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/advanced-analysis', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Security analysis has been completed successfully.",
      });
    },
    onError: (error) => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysisResult(null);
    }
  };

  const handleAnalysis = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysisType', analysisType);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    analysisMutation.mutate(formData);
  };

  // Security tips and challenges data
  const securityTips: SecurityTip[] = [
    {
      id: 'tip-1',
      category: 'beginner',
      title: 'Strong Password Creation',
      description: 'Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols.',
      priority: 'high',
      interactive: true
    },
    {
      id: 'tip-2',
      category: 'intermediate',
      title: 'Phishing Email Recognition',
      description: 'Always verify sender authenticity and check for suspicious links before clicking.',
      priority: 'high',
      interactive: true
    },
    {
      id: 'tip-3',
      category: 'advanced',
      title: 'Network Segmentation',
      description: 'Isolate critical systems using VLANs and firewalls to limit attack spread.',
      priority: 'medium',
      interactive: false
    }
  ];

  const threatChallenges: ThreatChallenge[] = [
    {
      id: 'challenge-1',
      title: 'Suspicious Email Analysis',
      description: 'Analyze this email and determine if it\'s a phishing attempt',
      difficulty: 'easy',
      category: 'phishing',
      scenario: 'You receive an email claiming to be from your bank asking you to verify your account by clicking a link. The sender is "security@bankofamerica.support.net"',
      options: [
        { id: 'a', text: 'Click the link immediately to secure your account', isCorrect: false },
        { id: 'b', text: 'Forward the email to colleagues for their opinion', isCorrect: false },
        { id: 'c', text: 'Delete the email and contact your bank directly', isCorrect: true },
        { id: 'd', text: 'Reply asking for more verification', isCorrect: false }
      ],
      correctAnswer: 'c',
      explanation: 'This is a phishing attempt. The domain "bankofamerica.support.net" is suspicious. Always contact your bank directly through official channels.',
      points: 100,
      timeLimit: 60,
      completed: false
    },
    {
      id: 'challenge-2',
      title: 'Malware Behavior Identification',
      description: 'Identify the type of malware based on system symptoms',
      difficulty: 'medium',
      category: 'malware',
      scenario: 'A computer is running slowly, files are being encrypted with strange extensions, and a ransom note appears on the desktop.',
      options: [
        { id: 'a', text: 'Virus', isCorrect: false },
        { id: 'b', text: 'Ransomware', isCorrect: true },
        { id: 'c', text: 'Spyware', isCorrect: false },
        { id: 'd', text: 'Adware', isCorrect: false }
      ],
      correctAnswer: 'b',
      explanation: 'File encryption with ransom demands is characteristic of ransomware attacks.',
      points: 150,
      timeLimit: 45,
      completed: false
    }
  ];

  const skillTree: SkillTreeNode[] = [
    {
      id: 'fundamentals-1',
      title: 'Security Basics',
      description: 'Understanding core cybersecurity principles',
      category: 'fundamentals',
      prerequisites: [],
      unlocked: true,
      completed: true,
      skills: ['Password Security', 'Basic Threats', 'Digital Hygiene'],
      position: { x: 0, y: 0 }
    },
    {
      id: 'fundamentals-2',
      title: 'Network Security',
      description: 'Securing network infrastructure and communications',
      category: 'fundamentals',
      prerequisites: ['fundamentals-1'],
      unlocked: true,
      completed: false,
      skills: ['Firewall Configuration', 'VPN Setup', 'Network Monitoring'],
      position: { x: 1, y: 0 }
    },
    {
      id: 'advanced-1',
      title: 'Threat Hunting',
      description: 'Proactive threat detection and analysis',
      category: 'advanced',
      prerequisites: ['fundamentals-2'],
      unlocked: false,
      completed: false,
      skills: ['IOC Analysis', 'Behavioral Detection', 'Threat Intelligence'],
      position: { x: 2, y: 0 }
    },
    {
      id: 'specialist-1',
      title: 'Incident Response',
      description: 'Managing security incidents and breaches',
      category: 'specialist',
      prerequisites: ['advanced-1'],
      unlocked: false,
      completed: false,
      skills: ['Containment', 'Forensics', 'Recovery Planning'],
      position: { x: 1, y: 1 }
    }
  ];

  const startChallenge = (challenge: ThreatChallenge) => {
    setCurrentChallenge(challenge);
    setChallengeTimeLeft(challenge.timeLimit);
    setSelectedAnswer('');
    setShowExplanation(false);
  };

  const submitAnswer = () => {
    if (!currentChallenge || !selectedAnswer) return;

    const isCorrect = selectedAnswer === currentChallenge.correctAnswer;
    setShowExplanation(true);

    if (isCorrect) {
      setUserProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + currentChallenge.points,
        challengesCompleted: prev.challengesCompleted + 1
      }));
      
      setMascot(prev => ({
        ...prev,
        mood: 'proud',
        experience: Math.min(prev.experience + 50, prev.maxExperience)
      }));

      toast({
        title: "Correct Answer!",
        description: `You earned ${currentChallenge.points} points!`,
      });
    } else {
      setMascot(prev => ({ ...prev, mood: 'concerned' }));
      toast({
        title: "Incorrect Answer",
        description: "Learning from mistakes makes you stronger!",
        variant: "destructive",
      });
    }
  };

  const getMascotExpression = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤖';
      case 'focused': return '🔍';
      case 'concerned': return '😟';
      case 'proud': return '🏆';
      default: return '🤖';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  useEffect(() => {
    if (challengeTimeLeft > 0 && currentChallenge && !showExplanation) {
      const timer = setTimeout(() => setChallengeTimeLeft(challengeTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (challengeTimeLeft === 0 && currentChallenge && !showExplanation) {
      toast({
        title: "Time's Up!",
        description: "Challenge expired. Try again to improve your reaction time!",
        variant: "destructive",
      });
      setShowExplanation(true);
    }
  }, [challengeTimeLeft, currentChallenge, showExplanation, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            SatyaAI Unified Security Portal
          </h1>
          <p className="text-blue-200 text-lg">
            Comprehensive cybersecurity platform with AI analysis, gamified learning, and real-time threat intelligence
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">
              <Scan className="h-4 w-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="companion" className="data-[state=active]:bg-blue-600">
              <Bot className="h-4 w-4 mr-2" />
              AI Companion
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-blue-600">
              <GraduationCap className="h-4 w-4 mr-2" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-blue-600">
              <Globe className="h-4 w-4 mr-2" />
              Threat Intel
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Security Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">94%</div>
                  <div className="text-slate-400 text-sm">Excellent protection</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Threats Blocked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">1,247</div>
                  <div className="text-slate-400 text-sm">This month</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">Level {userProgress.level}</div>
                  <div className="text-slate-400 text-sm">{userProgress.totalPoints.toLocaleString()} points</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Active Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">{userProgress.streakDays} days</div>
                  <div className="text-slate-400 text-sm">Keep it up!</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('analysis')}
                    className="bg-blue-600 hover:bg-blue-700 h-20 flex flex-col gap-2"
                  >
                    <Scan className="h-6 w-6" />
                    Start AI Analysis
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('challenges')}
                    className="bg-green-600 hover:bg-green-700 h-20 flex flex-col gap-2"
                  >
                    <Target className="h-6 w-6" />
                    Take Challenge
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('intelligence')}
                    className="bg-purple-600 hover:bg-purple-700 h-20 flex flex-col gap-2"
                  >
                    <Globe className="h-6 w-6" />
                    View Threat Intel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mascot Widget */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Security Companion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{getMascotExpression(mascot.mood)}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{mascot.name}</h4>
                    <p className="text-slate-400 text-sm">Level {mascot.level} Security Companion</p>
                    <div className="mt-2">
                      <Progress value={(mascot.experience / mascot.maxExperience) * 100} className="h-2" />
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('companion')}
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Interact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Security Analysis</CardTitle>
                <CardDescription className="text-slate-300">
                  Upload files for comprehensive security analysis using advanced AI models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="analysis-type" className="text-white">Analysis Type</Label>
                      <select
                        id="analysis-type"
                        value={analysisType}
                        onChange={(e) => setAnalysisType(e.target.value)}
                        className="w-full mt-1 bg-slate-700 border-slate-600 text-white rounded-md p-2"
                      >
                        <option value="image">Image Analysis</option>
                        <option value="video">Video Analysis</option>
                        <option value="document">Document Analysis</option>
                        <option value="deepfake">Deepfake Detection</option>
                        <option value="behavioral">Behavioral Analysis</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="file-upload" className="text-white">Upload File</Label>
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="mt-1 bg-slate-700 border-slate-600 text-white"
                        accept="image/*,video/*,.pdf,.doc,.docx"
                      />
                    </div>

                    {file && (
                      <div className="bg-slate-900 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Selected File</h4>
                        <p className="text-slate-300 text-sm">{file.name}</p>
                        <p className="text-slate-400 text-xs">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-slate-400 text-sm">Analyzing... {uploadProgress}%</p>
                      </div>
                    )}

                    <Button
                      onClick={handleAnalysis}
                      disabled={!file || isAnalyzing}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Scan className="h-4 w-4 mr-2" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Analysis Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { icon: Eye, title: "Deepfake Detection", desc: "Advanced AI model detection" },
                        { icon: Shield, title: "Threat Analysis", desc: "Malware and virus scanning" },
                        { icon: Brain, title: "Behavioral Analysis", desc: "Pattern recognition" },
                        { icon: Fingerprint, title: "Digital Forensics", desc: "Metadata analysis" },
                        { icon: Network, title: "Network Security", desc: "Communication analysis" },
                        { icon: Lock, title: "Encryption Status", desc: "Security validation" }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 bg-slate-900 rounded-lg p-3">
                          <feature.icon className="h-5 w-5 text-blue-400" />
                          <div>
                            <h5 className="text-white text-sm font-medium">{feature.title}</h5>
                            <p className="text-slate-400 text-xs">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {analysisResult && (
                  <div className="border-t border-slate-600 pt-6">
                    <h4 className="text-white font-semibold mb-4">Analysis Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-slate-900 border-slate-600">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Security Assessment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Authenticity Score</span>
                            <span className={`font-bold ${getRiskColor(analysisResult.confidence_percentage || 0)}`}>
                              {analysisResult.confidence_percentage || 0}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Risk Level</span>
                            <Badge className={getRiskBadgeColor(analysisResult.risk_level)}>
                              {analysisResult.risk_level || 'Unknown'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Forensic Score</span>
                            <span className="text-white font-bold">
                              {analysisResult.forensic_score || 0}/100
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-900 border-slate-600">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Key Findings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {(analysisResult.key_findings || []).slice(0, 5).map((finding: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {analysisResult.recommendation && (
                      <Card className="bg-slate-900 border-slate-600 mt-6">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300">{analysisResult.recommendation}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Companion Tab */}
          <TabsContent value="companion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{getMascotExpression(mascot.mood)}</div>
                    <div>
                      <CardTitle className="text-white">{mascot.name}</CardTitle>
                      <CardDescription className="text-slate-300">
                        Level {mascot.level} Security Companion
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-600">
                          {mascot.mood.charAt(0).toUpperCase() + mascot.mood.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Experience</span>
                      <span className="text-white">{mascot.experience}/{mascot.maxExperience} XP</span>
                    </div>
                    <Progress value={(mascot.experience / mascot.maxExperience) * 100} className="h-3" />
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">💬 Security Tip of the Day</h4>
                    <p className="text-slate-300 text-sm">
                      "Always use multi-factor authentication! It's like having multiple locks on your digital door. 
                      Even if someone has your password, they still can't get in without the second key!"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">🎯 Current Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {mascot.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-blue-500 text-blue-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Progress Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Points</span>
                      <span className="text-green-400 font-bold">{userProgress.totalPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Level</span>
                      <span className="text-blue-400 font-bold">{userProgress.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Challenges Completed</span>
                      <span className="text-purple-400 font-bold">{userProgress.challengesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Learning Streak</span>
                      <span className="text-orange-400 font-bold">{userProgress.streakDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Skills Unlocked</span>
                      <span className="text-cyan-400 font-bold">{userProgress.skillsUnlocked}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Interactive Security Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {securityTips.map((tip) => (
                    <div key={tip.id} className="border border-slate-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`${tip.priority === 'high' ? 'bg-red-600' : tip.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>
                          {tip.priority}
                        </Badge>
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
                      <p className="text-slate-300 text-sm mb-3">{tip.description}</p>
                      {tip.interactive && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Try Interactive Demo
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {!currentChallenge ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {threatChallenges.map((challenge) => (
                  <Card key={challenge.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white">{challenge.title}</CardTitle>
                          <CardDescription className="text-slate-300">
                            {challenge.description}
                          </CardDescription>
                        </div>
                        <Badge className={`${
                          challenge.difficulty === 'easy' ? 'bg-green-600' :
                          challenge.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
                        }`}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>Category: {challenge.category}</span>
                          <span>Points: {challenge.points}</span>
                          <span>Time: {challenge.timeLimit}s</span>
                        </div>
                        <Button 
                          onClick={() => startChallenge(challenge)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Challenge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{currentChallenge.title}</CardTitle>
                      <CardDescription className="text-slate-300">
                        {currentChallenge.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{challengeTimeLeft}s</div>
                      <div className="text-slate-400 text-sm">Time remaining</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Scenario:</h4>
                    <p className="text-slate-300">{currentChallenge.scenario}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">What should you do?</h4>
                    {currentChallenge.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id={option.id}
                          name="challenge-option"
                          value={option.id}
                          checked={selectedAnswer === option.id}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="text-blue-600"
                          disabled={showExplanation}
                        />
                        <label 
                          htmlFor={option.id} 
                          className={`text-slate-300 cursor-pointer ${
                            showExplanation && option.isCorrect ? 'text-green-400 font-semibold' : ''
                          } ${
                            showExplanation && selectedAnswer === option.id && !option.isCorrect ? 'text-red-400' : ''
                          }`}
                        >
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2">Explanation:</h4>
                      <p className="text-slate-300">{currentChallenge.explanation}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {!showExplanation ? (
                      <Button 
                        onClick={submitAnswer}
                        disabled={!selectedAnswer || challengeTimeLeft === 0}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setCurrentChallenge(null)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Back to Challenges
                      </Button>
                    )}
                    <Button 
                      onClick={() => setCurrentChallenge(null)}
                      variant="outline"
                      className="border-slate-600"
                    >
                      Exit Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cybersecurity Skill Tree</CardTitle>
                <CardDescription className="text-slate-300">
                  Progress through different skill levels to become a cybersecurity expert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-slate-900 rounded-lg p-6 overflow-hidden">
                  {skillTree.map((node, index) => (
                    <div
                      key={node.id}
                      className={`absolute transform transition-all duration-300 hover:scale-105 ${
                        node.unlocked ? 'opacity-100' : 'opacity-50'
                      }`}
                      style={{
                        left: `${node.position.x * 30 + 10}%`,
                        top: `${node.position.y * 40 + 20}%`
                      }}
                    >
                      <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                        node.completed 
                          ? 'bg-green-600 border-green-400' 
                          : node.unlocked 
                            ? 'bg-blue-600 border-blue-400' 
                            : 'bg-gray-600 border-gray-500'
                      }`}>
                        {node.completed ? (
                          <CheckCircle className="h-8 w-8 text-white" />
                        ) : node.unlocked ? (
                          <Unlock className="h-8 w-8 text-white" />
                        ) : (
                          <Lock className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-white text-xs font-semibold">{node.title}</div>
                        <div className="text-slate-400 text-xs">{node.category}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1="25%"
                      y1="35%"
                      x2="55%"
                      y2="35%"
                      stroke="rgb(59 130 246 / 0.5)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="55%"
                      y1="35%"
                      x2="85%"
                      y2="35%"
                      stroke="rgb(59 130 246 / 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="85%"
                      y1="35%"
                      x2="55%"
                      y2="65%"
                      stroke="rgb(59 130 246 / 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillTree.map((node) => (
                <Card key={node.id} className={`bg-slate-800 border-slate-700 ${!node.unlocked && 'opacity-50'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${
                        node.category === 'fundamentals' ? 'bg-green-600' :
                        node.category === 'advanced' ? 'bg-blue-600' :
                        node.category === 'specialist' ? 'bg-purple-600' : 'bg-orange-600'
                      }`}>
                        {node.category}
                      </Badge>
                      {node.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    <CardTitle className="text-white text-sm">{node.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      {node.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {node.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Threat Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <LiveThreatIntelligenceTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}