import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Users, 
  Shield, 
  Brain, 
  Code, 
  Lock, 
  Gavel,
  Coins,
  CheckCircle,
  Play,
  Star,
  Award,
  Calendar,
  TrendingUp,
  Zap,
  Globe,
  Database,
  Network,
  Eye,
  AlertTriangle,
  FileText,
  Video,
  Headphones,
  Download
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'cybersecurity' | 'blockchain' | 'web3' | 'ai' | 'law' | 'ethical-hacking';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // days
  modules: number;
  description: string;
  skills: string[];
  icon: any;
  color: string;
  progress: number;
  completed: boolean;
  dailyModules: Module[];
}

interface Module {
  id: string;
  day: number;
  title: string;
  type: 'video' | 'reading' | 'lab' | 'quiz';
  duration: string;
  content: string;
  completed: boolean;
  resources: Resource[];
}

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'tool';
  url: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  date?: string;
  points: number;
}

export default function CyberSecurityAcademy() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState({
    totalPoints: 2850,
    coursesCompleted: 3,
    currentStreak: 15,
    totalStudyTime: 45 // hours
  });
  const { toast } = useToast();

  const courses: Course[] = [
    {
      id: 'cyber-fundamentals',
      title: 'Cybersecurity Fundamentals',
      category: 'cybersecurity',
      level: 'beginner',
      duration: 30,
      modules: 30,
      description: 'Master the core principles of cybersecurity including threat landscapes, risk management, and defense strategies.',
      skills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Security Frameworks'],
      icon: Shield,
      color: 'blue',
      progress: 67,
      completed: false,
      dailyModules: [
        {
          id: 'day1',
          day: 1,
          title: 'Introduction to Cybersecurity',
          type: 'video',
          duration: '45 min',
          content: 'Understanding the cybersecurity landscape and threat actors',
          completed: true,
          resources: [
            { id: 'r1', title: 'NIST Cybersecurity Framework', type: 'pdf', url: '#' },
            { id: 'r2', title: 'Threat Intelligence Report', type: 'pdf', url: '#' }
          ]
        },
        {
          id: 'day2',
          day: 2,
          title: 'Network Security Basics',
          type: 'lab',
          duration: '60 min',
          content: 'Hands-on network analysis and security monitoring',
          completed: true,
          resources: []
        }
      ]
    },
    {
      id: 'blockchain-security',
      title: 'Blockchain & Web3 Security',
      category: 'blockchain',
      level: 'intermediate',
      duration: 25,
      modules: 25,
      description: 'Learn blockchain security, smart contract auditing, and Web3 threat mitigation strategies.',
      skills: ['Smart Contract Security', 'DeFi Protocols', 'Crypto Auditing', 'Web3 Pentesting'],
      icon: Coins,
      color: 'yellow',
      progress: 24,
      completed: false,
      dailyModules: []
    },
    {
      id: 'ai-security',
      title: 'AI & ML Security',
      category: 'ai',
      level: 'advanced',
      duration: 28,
      modules: 28,
      description: 'Advanced AI security including adversarial attacks, model poisoning, and AI ethics.',
      skills: ['Adversarial ML', 'Model Security', 'AI Ethics', 'Bias Detection'],
      icon: Brain,
      color: 'purple',
      progress: 0,
      completed: false,
      dailyModules: []
    },
    {
      id: 'cyber-law',
      title: 'Cybersecurity Law & Compliance',
      category: 'law',
      level: 'intermediate',
      duration: 20,
      modules: 20,
      description: 'Navigate cybersecurity regulations, privacy laws, and compliance frameworks.',
      skills: ['GDPR Compliance', 'Legal Frameworks', 'Privacy Law', 'Incident Reporting'],
      icon: Gavel,
      color: 'red',
      progress: 100,
      completed: true,
      dailyModules: []
    },
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking & Penetration Testing',
      category: 'ethical-hacking',
      level: 'advanced',
      duration: 35,
      modules: 35,
      description: 'Master ethical hacking techniques, penetration testing methodologies, and vulnerability assessment.',
      skills: ['Penetration Testing', 'Vulnerability Assessment', 'Social Engineering', 'Red Team Operations'],
      icon: Target,
      color: 'green',
      progress: 43,
      completed: false,
      dailyModules: []
    },
    {
      id: 'web3-development',
      title: 'Secure Web3 Development',
      category: 'web3',
      level: 'intermediate',
      duration: 30,
      modules: 30,
      description: 'Build secure decentralized applications with best practices and security patterns.',
      skills: ['Smart Contracts', 'DApp Security', 'Consensus Mechanisms', 'Zero-Knowledge Proofs'],
      icon: Globe,
      color: 'cyan',
      progress: 15,
      completed: false,
      dailyModules: []
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course module',
      icon: Trophy,
      unlocked: true,
      date: '2024-12-01',
      points: 100
    },
    {
      id: 'week-streak',
      title: 'Weekly Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Zap,
      unlocked: true,
      date: '2024-12-08',
      points: 250
    },
    {
      id: 'security-master',
      title: 'Security Master',
      description: 'Complete 3 cybersecurity courses',
      icon: Shield,
      unlocked: false,
      points: 500
    },
    {
      id: 'ethical-hacker',
      title: 'Ethical Hacker',
      description: 'Complete the Ethical Hacking course',
      icon: Target,
      unlocked: false,
      points: 750
    }
  ];

  const todayModule = selectedCourse?.dailyModules.find(m => m.day === Math.floor(selectedCourse.progress / 100 * selectedCourse.modules) + 1);

  const completeModule = (moduleId: string) => {
    toast({
      title: "Module Completed!",
      description: "Great progress! You've earned 50 points and maintained your streak.",
    });
    
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 50,
      currentStreak: prev.currentStreak + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            SatyaAI Cybersecurity Academy
          </h1>
          <p className="text-blue-200 text-lg">
            Master cybersecurity, blockchain, AI, and ethical hacking with daily structured learning
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger 
              value="daily" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Daily Learning
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Total Points</h3>
                  <p className="text-2xl font-bold text-yellow-400">{userProgress.totalPoints}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Courses Completed</h3>
                  <p className="text-2xl font-bold text-green-400">{userProgress.coursesCompleted}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Current Streak</h3>
                  <p className="text-2xl font-bold text-orange-400">{userProgress.currentStreak} days</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Study Time</h3>
                  <p className="text-2xl font-bold text-blue-400">{userProgress.totalStudyTime}h</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Course Progress */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Today's Learning Goal</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete your daily module to maintain your streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-blue-400" />
                      <div>
                        <h3 className="text-white font-semibold">Cybersecurity Fundamentals</h3>
                        <p className="text-slate-400">Day 20: Advanced Threat Detection</p>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                  <Progress value={67} className="h-2" />
                  <p className="text-slate-400 text-sm">67% complete • 10 days remaining</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <Card key={course.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer" onClick={() => setSelectedCourse(course)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <IconComponent className={`h-8 w-8 text-${course.color}-400`} />
                        <Badge variant={course.completed ? "default" : "secondary"}>
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-white">{course.title}</CardTitle>
                      <CardDescription className="text-slate-300">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{course.duration} days</span>
                          <span className="text-slate-400">{course.modules} modules</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{course.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          variant={course.progress > 0 ? "default" : "outline"}
                        >
                          {course.progress > 0 ? 'Continue' : 'Start Course'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            {selectedCourse ? (
              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <selectedCourse.icon className={`h-8 w-8 text-${selectedCourse.color}-400`} />
                      <div>
                        <CardTitle className="text-white">{selectedCourse.title}</CardTitle>
                        <CardDescription className="text-slate-300">
                          Daily structured learning path
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={selectedCourse.progress} className="h-2 mb-2" />
                    <p className="text-slate-400 text-sm">
                      Day {Math.floor(selectedCourse.progress / 100 * selectedCourse.modules)} of {selectedCourse.modules}
                    </p>
                  </CardContent>
                </Card>

                {todayModule && (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-400" />
                        Today's Module - Day {todayModule.day}
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        {todayModule.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {todayModule.type === 'video' && <Video className="h-4 w-4 text-blue-400" />}
                          {todayModule.type === 'reading' && <FileText className="h-4 w-4 text-green-400" />}
                          {todayModule.type === 'lab' && <Code className="h-4 w-4 text-purple-400" />}
                          {todayModule.type === 'quiz' && <Brain className="h-4 w-4 text-yellow-400" />}
                          <span className="text-white capitalize">{todayModule.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-400">{todayModule.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-300">{todayModule.content}</p>
                      
                      {todayModule.resources.length > 0 && (
                        <div>
                          <h4 className="text-white font-semibold mb-2">Resources</h4>
                          <div className="space-y-2">
                            {todayModule.resources.map((resource) => (
                              <div key={resource.id} className="flex items-center gap-2">
                                <Download className="h-4 w-4 text-blue-400" />
                                <span className="text-blue-400 hover:underline cursor-pointer">
                                  {resource.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => completeModule(todayModule.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={todayModule.completed}
                      >
                        {todayModule.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Module
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Select a Course</h3>
                  <p className="text-slate-400 mb-4">
                    Choose a course from the Courses tab to start your daily learning journey
                  </p>
                  <Button onClick={() => setActiveTab('courses')} className="bg-blue-600 hover:bg-blue-700">
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <Card 
                    key={achievement.id} 
                    className={`border-slate-700 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-900/20 to-slate-800 border-yellow-500/50' 
                        : 'bg-slate-800'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <IconComponent 
                        className={`h-12 w-12 mx-auto mb-3 ${
                          achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'
                        }`} 
                      />
                      <h3 className={`font-semibold mb-2 ${
                        achievement.unlocked ? 'text-white' : 'text-slate-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-3 ${
                        achievement.unlocked ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {achievement.description}
                      </p>
                      <Badge 
                        variant={achievement.unlocked ? "default" : "secondary"}
                        className={achievement.unlocked ? 'bg-yellow-600' : ''}
                      >
                        {achievement.points} points
                      </Badge>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-slate-400 mt-2">
                          Unlocked on {achievement.date}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Leaderboard</CardTitle>
                  <CardDescription className="text-slate-300">
                    Top learners this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Alex Chen', points: 4250, rank: 1 },
                      { name: 'Sarah Kumar', points: 3890, rank: 2 },
                      { name: 'You', points: userProgress.totalPoints, rank: 3 },
                      { name: 'Mike Rodriguez', points: 2720, rank: 4 },
                      { name: 'Emma Davis', points: 2450, rank: 5 }
                    ].map((user) => (
                      <div key={user.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank === 1 ? 'bg-yellow-600 text-white' :
                            user.rank === 2 ? 'bg-slate-400 text-white' :
                            user.rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {user.rank}
                          </div>
                          <span className={user.name === 'You' ? 'text-blue-400 font-semibold' : 'text-white'}>
                            {user.name}
                          </span>
                        </div>
                        <span className="text-slate-400">{user.points} pts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Study Groups</CardTitle>
                  <CardDescription className="text-slate-300">
                    Join collaborative learning sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Ethical Hacking Study Group', members: 28, topic: 'OWASP Top 10' },
                      { name: 'Blockchain Security Circle', members: 15, topic: 'Smart Contract Auditing' },
                      { name: 'AI Security Research', members: 22, topic: 'Adversarial ML' }
                    ].map((group) => (
                      <div key={group.name} className="border border-slate-600 rounded-lg p-4">
                        <h4 className="text-white font-semibold">{group.name}</h4>
                        <p className="text-slate-400 text-sm mb-2">Current topic: {group.topic}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">{group.members} members</span>
                          <Button size="sm" variant="outline" className="border-slate-600">
                            Join Group
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}