import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Smile,
  Frown,
  Meh,
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Heart,
  Sun,
  Cloud,
  CloudRain
} from 'lucide-react';
import { useState } from 'react';

export default function SecurityMoodGenerator() {
  const [currentMood, setCurrentMood] = useState({
    level: 'Secure',
    emoji: '😊',
    color: 'green',
    description: 'All systems running smoothly with optimal security posture',
    score: 85,
    recommendations: ['Continue monitoring', 'Maintain current protocols']
  });

  const [moodHistory, setMoodHistory] = useState([
    { time: '14:30', mood: 'Secure', score: 85, icon: Smile },
    { time: '13:45', mood: 'Alert', score: 65, icon: Meh },
    { time: '13:00', mood: 'Critical', score: 35, icon: Frown },
    { time: '12:15', mood: 'Secure', score: 90, icon: Smile }
  ]);

  const securityMoods = [
    {
      name: 'Zen Security',
      emoji: '🧘',
      color: 'blue',
      score: 95,
      description: 'Perfect harmony between security and usability',
      icon: Sun,
      recommendations: ['Maintain zen state', 'Share best practices', 'Document success']
    },
    {
      name: 'Alert Mode',
      emoji: '⚡',
      color: 'yellow',
      score: 70,
      description: 'Heightened awareness with active monitoring',
      icon: Zap,
      recommendations: ['Increase monitoring', 'Review recent alerts', 'Prepare response teams']
    },
    {
      name: 'Storm Warning',
      emoji: '⛈️',
      color: 'orange',
      score: 45,
      description: 'Multiple threats detected requiring immediate attention',
      icon: CloudRain,
      recommendations: ['Activate incident response', 'Isolate affected systems', 'Contact security team']
    },
    {
      name: 'Fortress Mode',
      emoji: '🏰',
      color: 'purple',
      score: 85,
      description: 'Maximum security with all defenses active',
      icon: Shield,
      recommendations: ['Maintain high alert', 'Monitor closely', 'Prepare for escalation']
    },
    {
      name: 'Peaceful Garden',
      emoji: '🌸',
      color: 'green',
      score: 92,
      description: 'Optimal security with minimal friction',
      icon: Heart,
      recommendations: ['Enjoy the calm', 'Plan improvements', 'Review metrics']
    },
    {
      name: 'Code Red',
      emoji: '🚨',
      color: 'red',
      score: 25,
      description: 'Critical security incident requiring all hands',
      icon: AlertTriangle,
      recommendations: ['Execute emergency protocols', 'Notify leadership', 'Document everything']
    }
  ];

  const getMoodColor = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'text-green-400 border-green-400 bg-green-400/10',
      blue: 'text-blue-400 border-blue-400 bg-blue-400/10',
      yellow: 'text-yellow-400 border-yellow-400 bg-yellow-400/10',
      orange: 'text-orange-400 border-orange-400 bg-orange-400/10',
      purple: 'text-purple-400 border-purple-400 bg-purple-400/10',
      red: 'text-red-400 border-red-400 bg-red-400/10'
    };
    return colors[color] || colors.green;
  };

  const generateRandomMood = () => {
    const randomMood = securityMoods[Math.floor(Math.random() * securityMoods.length)];
    setCurrentMood({
      level: randomMood.name,
      emoji: randomMood.emoji,
      color: randomMood.color,
      description: randomMood.description,
      score: randomMood.score + Math.floor(Math.random() * 10 - 5),
      recommendations: randomMood.recommendations
    });

    // Add to history
    const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMoodHistory(prev => [
      { time: newTime, mood: randomMood.name, score: randomMood.score, icon: randomMood.icon },
      ...prev.slice(0, 3)
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Security Mood Generator
            </h1>
            <p className="text-slate-400">One-click security mood assessment and visualization</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Current Security Mood */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Current Security Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{currentMood.emoji}</div>
                <h2 className="text-3xl font-bold mb-2">{currentMood.level}</h2>
                <Badge variant="outline" className={getMoodColor(currentMood.color)}>
                  Security Score: {currentMood.score}%
                </Badge>
                <p className="text-slate-400 mt-4">{currentMood.description}</p>
              </div>

              <div className="text-center mb-6">
                <Button 
                  onClick={generateRandomMood}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Generate New Mood
                </Button>
              </div>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg">Mood Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentMood.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Available Moods */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Available Security Moods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityMoods.map((mood, index) => (
                  <Card 
                    key={index} 
                    className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-all"
                    onClick={() => setCurrentMood({
                      level: mood.name,
                      emoji: mood.emoji,
                      color: mood.color,
                      description: mood.description,
                      score: mood.score,
                      recommendations: mood.recommendations
                    })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">{mood.emoji}</div>
                        <div>
                          <h3 className="font-semibold">{mood.name}</h3>
                          <Badge variant="outline" className={`text-xs ${getMoodColor(mood.color)}`}>
                            {mood.score}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">{mood.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood History & Analytics */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Mood History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <entry.icon className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="font-medium">{entry.mood}</p>
                        <p className="text-xs text-slate-400">{entry.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {entry.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Mood Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <Smile className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-green-400">78%</p>
                    <p className="text-xs text-slate-400">Positive Moods</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-blue-400">12</p>
                    <p className="text-xs text-slate-400">Mood Changes</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Average Score</span>
                    <span className="text-blue-400">76%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Best Mood</span>
                    <span className="text-green-400">Zen Security</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Trend</span>
                    <span className="text-green-400">Improving</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Mood Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-pink-600 hover:bg-pink-700 justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Share Mood
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Set Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}