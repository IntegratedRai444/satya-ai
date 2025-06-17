import { useState, useEffect } from 'react';
import LiveThreatIntelligenceTimeline from './LiveThreatIntelligenceTimeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
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
  Puzzle
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

export default function SecurityMascotCompanion() {
  const [activeTab, setActiveTab] = useState('companion');
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
        description: "Don't worry, learning from mistakes makes you stronger!",
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
            Interactive Security Learning Center
          </h1>
          <p className="text-blue-200 text-lg">
            Your AI companion for mastering cybersecurity through gamified learning
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="companion" className="data-[state=active]:bg-blue-600">
              <Bot className="h-4 w-4 mr-2" />
              Companion
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="skill-tree" className="data-[state=active]:bg-blue-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Skill Tree
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-600">
              <Clock className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="storytelling" className="data-[state=active]:bg-blue-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Stories
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="skill-tree" className="space-y-6">
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

          <TabsContent value="timeline" className="space-y-6">
            <LiveThreatIntelligenceTimeline />
          </TabsContent>

          <TabsContent value="storytelling" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cyber Threat Stories</CardTitle>
                <CardDescription className="text-slate-300">
                  Learn cybersecurity through engaging real-world scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'The Social Engineering Heist',
                      category: 'Social Engineering',
                      difficulty: 'Beginner',
                      duration: '5 min read',
                      description: 'Follow Sarah as she uncovers a sophisticated social engineering attack targeting her company...',
                      characters: ['Sarah (Security Analyst)', 'Alex (Attacker)', 'Mike (CEO)'],
                      learningPoints: ['Trust verification', 'Authority impersonation', 'Urgency tactics']
                    },
                    {
                      title: 'The Ransomware Nightmare',
                      category: 'Malware',
                      difficulty: 'Intermediate',
                      duration: '8 min read',
                      description: 'Experience the chaos of a ransomware attack from the incident response team\'s perspective...',
                      characters: ['Tom (IT Director)', 'Lisa (CISO)', 'Emergency Response Team'],
                      learningPoints: ['Incident response', 'Business continuity', 'Recovery planning']
                    },
                    {
                      title: 'The Zero-Day Discovery',
                      category: 'Vulnerability Research',
                      difficulty: 'Advanced',
                      duration: '12 min read',
                      description: 'Join a security researcher as they discover and responsibly disclose a critical zero-day vulnerability...',
                      characters: ['Dr. Chen (Researcher)', 'Vendor Security Team', 'Bug Bounty Coordinator'],
                      learningPoints: ['Responsible disclosure', 'Patch management', 'Coordinated response']
                    }
                  ].map((story, index) => (
                    <Card key={index} className="bg-slate-900 border-slate-600 hover:border-blue-500 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white text-lg">{story.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-blue-600">{story.category}</Badge>
                              <Badge variant="outline" className="border-slate-500">
                                {story.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-slate-400 text-sm">{story.duration}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-300 text-sm">{story.description}</p>
                        
                        <div>
                          <h5 className="text-white text-sm font-semibold mb-2">Characters:</h5>
                          <div className="flex flex-wrap gap-1">
                            {story.characters.map((character, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-slate-600">
                                {character}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-white text-sm font-semibold mb-2">You'll Learn:</h5>
                          <ul className="text-slate-400 text-sm space-y-1">
                            {story.learningPoints.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-400" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Reading
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}