import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Star,
  Gamepad2,
  Trophy,
  Zap,
  BookOpen,
  PlayCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  points: number;
  completed: boolean;
  category: string;
  skills: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

interface PersonaCoach {
  name: string;
  specialization: string;
  avatar: string;
  personality: string;
  currentMessage: string;
  motivation: string[];
}

export function AISecurityPersonaCoach() {
  const [currentXP, setCurrentXP] = useState(2847);
  const [level, setLevel] = useState(12);
  const [streak, setStreak] = useState(15);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [coach, setCoach] = useState<PersonaCoach | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [modules, setModules] = useState<LearningModule[]>([]);

  useEffect(() => {
    // Initialize learning modules
    const learningModules: LearningModule[] = [
      {
        id: 'phishing_defense',
        title: 'Advanced Phishing Defense',
        description: 'Master the art of identifying and preventing sophisticated phishing attacks',
        difficulty: 'intermediate',
        duration: '45 min',
        points: 150,
        completed: false,
        category: 'Email Security',
        skills: ['Pattern Recognition', 'Social Engineering', 'Email Analysis']
      },
      {
        id: 'incident_response',
        title: 'Incident Response Mastery',
        description: 'Learn to handle security incidents with precision and speed',
        difficulty: 'advanced',
        duration: '60 min',
        points: 200,
        completed: true,
        category: 'Crisis Management',
        skills: ['Crisis Management', 'Forensics', 'Communication']
      },
      {
        id: 'threat_hunting',
        title: 'Proactive Threat Hunting',
        description: 'Become a cyber detective and hunt threats before they strike',
        difficulty: 'advanced',
        duration: '90 min',
        points: 250,
        completed: false,
        category: 'Advanced Analysis',
        skills: ['SIEM Analysis', 'Log Investigation', 'Behavioral Analysis']
      },
      {
        id: 'security_awareness',
        title: 'Security Awareness Champion',
        description: 'Build skills to educate and protect your organization',
        difficulty: 'beginner',
        duration: '30 min',
        points: 100,
        completed: true,
        category: 'Leadership',
        skills: ['Communication', 'Training', 'Risk Assessment']
      }
    ];

    // Initialize achievements
    const userAchievements: Achievement[] = [
      {
        id: 'first_detection',
        title: 'First Blood',
        description: 'Detected your first security threat',
        icon: <Target className="h-6 w-6 text-red-400" />,
        unlocked: true,
        unlockedAt: '2025-01-10',
        progress: 1,
        maxProgress: 1
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 30-day learning streak',
        icon: <Zap className="h-6 w-6 text-yellow-400" />,
        unlocked: false,
        progress: 15,
        maxProgress: 30
      },
      {
        id: 'module_complete',
        title: 'Knowledge Seeker',
        description: 'Complete 10 learning modules',
        icon: <BookOpen className="h-6 w-6 text-blue-400" />,
        unlocked: false,
        progress: 7,
        maxProgress: 10
      },
      {
        id: 'security_guru',
        title: 'Security Guru',
        description: 'Reach level 25 in the security academy',
        icon: <Trophy className="h-6 w-6 text-gold-400" />,
        unlocked: false,
        progress: 12,
        maxProgress: 25
      }
    ];

    // Initialize AI coach
    const securityCoach: PersonaCoach = {
      name: 'Alex CyberMentor',
      specialization: 'Cybersecurity Excellence Coach',
      avatar: '/api/placeholder/60/60',
      personality: 'Encouraging, knowledgeable, and adaptive',
      currentMessage: `Great job maintaining your ${streak}-day streak! I've noticed you're excelling in threat detection. Ready to tackle advanced threat hunting?`,
      motivation: [
        'Your analytical skills are improving rapidly!',
        'That incident response was textbook perfect!',
        'Keep pushing boundaries - you\'re destined for greatness!',
        'Your security instincts are getting sharper every day!'
      ]
    };

    setModules(learningModules);
    setAchievements(userAchievements);
    setCoach(securityCoach);

    // Simulate dynamic XP changes
    const xpInterval = setInterval(() => {
      setCurrentXP(prev => prev + Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(xpInterval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const xpToNextLevel = 3000;
  const xpProgress = (currentXP % 1000) / 10;

  const startModule = (module: LearningModule) => {
    setSelectedModule(module);
    // Simulate module completion after 3 seconds
    setTimeout(() => {
      setCurrentXP(prev => prev + module.points);
      setModules(prev => prev.map(m => 
        m.id === module.id ? { ...m, completed: true } : m
      ));
      setSelectedModule(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="h-10 w-10 text-purple-400" />
            AI-Powered Security Persona Coach
          </h1>
          <p className="text-slate-300 text-lg">
            Playful learning with personalized cybersecurity coaching
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Coach Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  Your AI Coach
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 mx-auto border-4 border-purple-400">
                    <AvatarImage src={coach?.avatar} />
                    <AvatarFallback className="bg-purple-600 text-white text-lg">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-lg">{coach?.name}</h3>
                  <p className="text-slate-400 text-sm">{coach?.specialization}</p>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm italic">
                    "{coach?.currentMessage}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-medium">Today's Motivation</h4>
                  <div className="text-xs text-slate-400">
                    {coach?.motivation[Math.floor(Math.random() * (coach?.motivation.length || 1))]}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player Stats */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-green-400" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">Level {level}</div>
                  <div className="text-slate-400">Security Analyst</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">XP Progress</span>
                    <span className="text-white">{currentXP.toLocaleString()}</span>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                  <div className="text-xs text-slate-400 mt-1">
                    {xpToNextLevel - (currentXP % 1000)} XP to next level
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{streak}</div>
                    <div className="text-xs text-slate-400">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {modules.filter(m => m.completed).length}
                    </div>
                    <div className="text-xs text-slate-400">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Modules */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Learning Modules
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Interactive cybersecurity training with gamified progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((module) => (
                    <Card key={module.id} className="bg-slate-700 border-slate-600">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            {module.completed && (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            )}
                            <Badge className={`${getDifficultyColor(module.difficulty)} text-white`}>
                              {module.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-slate-300 text-sm">
                          {module.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white">{module.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Reward:</span>
                          <span className="text-yellow-400 font-medium">+{module.points} XP</span>
                        </div>
                        
                        <div>
                          <span className="text-slate-400 text-sm">Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {module.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="border-slate-500 text-slate-300 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => startModule(module)}
                          disabled={module.completed || selectedModule?.id === module.id}
                          className={`w-full ${
                            module.completed 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          } text-white`}
                        >
                          {selectedModule?.id === module.id ? (
                            <>
                              <Brain className="h-4 w-4 mr-2 animate-pulse" />
                              Learning...
                            </>
                          ) : module.completed ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Module
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Unlock rewards as you master cybersecurity skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked 
                          ? 'bg-slate-700 border-yellow-500/30' 
                          : 'bg-slate-700/50 border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked ? 'bg-yellow-600/20' : 'bg-slate-600/20'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            achievement.unlocked ? 'text-yellow-400' : 'text-slate-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-slate-400 text-sm">{achievement.description}</p>
                          
                          {!achievement.unlocked && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-white">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress 
                                value={(achievement.progress / achievement.maxProgress) * 100} 
                                className="h-1"
                              />
                            </div>
                          )}
                          
                          {achievement.unlocked && achievement.unlockedAt && (
                            <div className="text-xs text-green-400 mt-1">
                              Unlocked {achievement.unlockedAt}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}