import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  User,
  Shield,
  Smartphone,
  Wifi,
  Mail,
  Lock,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Home,
  Car,
  CreditCard,
  Globe
} from 'lucide-react';
import { useState } from 'react';

export default function PersonalSecurityAssessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const securitySections = [
    {
      title: 'Password Security',
      icon: Lock,
      questions: [
        {
          id: 'password_unique',
          question: 'Do you use unique passwords for each account?',
          weight: 20
        },
        {
          id: 'password_length',
          question: 'Are your passwords at least 12 characters long?',
          weight: 15
        },
        {
          id: 'password_manager',
          question: 'Do you use a password manager?',
          weight: 25
        },
        {
          id: 'two_factor',
          question: 'Do you have two-factor authentication enabled on important accounts?',
          weight: 30
        },
        {
          id: 'password_sharing',
          question: 'Do you avoid sharing passwords with others?',
          weight: 10
        }
      ]
    },
    {
      title: 'Device Security',
      icon: Smartphone,
      questions: [
        {
          id: 'device_lock',
          question: 'Do you use screen locks on all your devices?',
          weight: 25
        },
        {
          id: 'software_updates',
          question: 'Do you install security updates promptly?',
          weight: 30
        },
        {
          id: 'antivirus',
          question: 'Do you use antivirus software on your devices?',
          weight: 20
        },
        {
          id: 'app_permissions',
          question: 'Do you review app permissions before installation?',
          weight: 15
        },
        {
          id: 'device_backup',
          question: 'Do you regularly backup your important data?',
          weight: 10
        }
      ]
    },
    {
      title: 'Network Security',
      icon: Wifi,
      questions: [
        {
          id: 'public_wifi',
          question: 'Do you avoid sensitive activities on public WiFi?',
          weight: 25
        },
        {
          id: 'home_network',
          question: 'Have you changed default router passwords?',
          weight: 20
        },
        {
          id: 'vpn_usage',
          question: 'Do you use a VPN when on public networks?',
          weight: 30
        },
        {
          id: 'network_monitoring',
          question: 'Do you monitor devices connected to your home network?',
          weight: 15
        },
        {
          id: 'guest_network',
          question: 'Do you use a separate guest network for visitors?',
          weight: 10
        }
      ]
    },
    {
      title: 'Email & Communication',
      icon: Mail,
      questions: [
        {
          id: 'phishing_awareness',
          question: 'Can you identify phishing emails?',
          weight: 30
        },
        {
          id: 'link_verification',
          question: 'Do you verify links before clicking them?',
          weight: 25
        },
        {
          id: 'attachment_caution',
          question: 'Are you cautious with email attachments?',
          weight: 20
        },
        {
          id: 'secure_messaging',
          question: 'Do you use encrypted messaging for sensitive communications?',
          weight: 15
        },
        {
          id: 'email_encryption',
          question: 'Do you know how to send encrypted emails?',
          weight: 10
        }
      ]
    },
    {
      title: 'Physical Security',
      icon: Home,
      questions: [
        {
          id: 'device_visibility',
          question: 'Do you keep devices out of sight when not in use?',
          weight: 20
        },
        {
          id: 'shoulder_surfing',
          question: 'Are you aware of shoulder surfing risks?',
          weight: 25
        },
        {
          id: 'device_disposal',
          question: 'Do you properly wipe data before disposing of devices?',
          weight: 30
        },
        {
          id: 'workspace_security',
          question: 'Do you secure your workspace when away?',
          weight: 15
        },
        {
          id: 'visitor_access',
          question: 'Do you control visitor access to your devices?',
          weight: 10
        }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateSectionScore = (sectionIndex: number) => {
    const section = securitySections[sectionIndex];
    let totalWeight = 0;
    let achievedWeight = 0;

    section.questions.forEach(question => {
      totalWeight += question.weight;
      if (answers[question.id]) {
        achievedWeight += question.weight;
      }
    });

    return totalWeight > 0 ? Math.round((achievedWeight / totalWeight) * 100) : 0;
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    securitySections.forEach((_, index) => {
      totalScore += calculateSectionScore(index);
    });
    return Math.round(totalScore / securitySections.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecommendations = () => {
    const recommendations = [];
    const overallScore = calculateOverallScore();

    if (overallScore < 50) {
      recommendations.push('Critical: Immediate security improvements needed across all areas');
    } else if (overallScore < 70) {
      recommendations.push('Important: Several security gaps require attention');
    } else if (overallScore < 90) {
      recommendations.push('Good: Minor improvements will enhance your security posture');
    } else {
      recommendations.push('Excellent: You have strong security practices in place');
    }

    securitySections.forEach((section, index) => {
      const sectionScore = calculateSectionScore(index);
      if (sectionScore < 70) {
        recommendations.push(`Focus on improving ${section.title.toLowerCase()}`);
      }
    });

    return recommendations;
  };

  const nextSection = () => {
    if (currentSection < securitySections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setAssessmentComplete(true);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (assessmentComplete) {
    const overallScore = calculateOverallScore();
    const recommendations = getRecommendations();

    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Personal Security Assessment Complete</h1>
            <p className="text-slate-400">Your comprehensive security evaluation results</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-center">Overall Security Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(overallScore)} mb-4`}>
                  {overallScore}%
                </div>
                <Progress value={overallScore} className="h-4 mb-4" />
                <Badge variant="outline" className={getScoreColor(overallScore)}>
                  {overallScore >= 80 ? 'EXCELLENT' : overallScore >= 60 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle>Section Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySections.map((section, index) => {
                  const score = calculateSectionScore(index);
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-blue-400" />
                        <span className="text-sm">{section.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                        <div className="w-16 h-2 bg-slate-700 rounded-full">
                          <div 
                            className={`h-full rounded-full ${score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => {
                setCurrentSection(0);
                setAnswers({});
                setAssessmentComplete(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 mr-4"
            >
              Retake Assessment
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Download Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = securitySections[currentSection];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Personal Security Assessment
              </h1>
              <p className="text-slate-400">Evaluate your personal cybersecurity practices</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Section {currentSection + 1} of {securitySections.length}
            </Badge>
            <Progress value={((currentSection + 1) / securitySections.length) * 100} className="flex-1 mx-4 h-2" />
            <span className="text-sm text-slate-400">
              {Math.round(((currentSection + 1) / securitySections.length) * 100)}% Complete
            </span>
          </div>
        </div>

        <Card className="bg-slate-900 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <currentSectionData.icon className="w-6 h-6 text-blue-400" />
              {currentSectionData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentSectionData.questions.map((question, index) => (
              <div key={question.id} className="p-4 bg-slate-800 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      id={question.id}
                      checked={answers[question.id] || false}
                      onCheckedChange={(checked) => handleAnswer(question.id, Boolean(checked))}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor={question.id} className="text-slate-200 cursor-pointer">
                      {question.question}
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                        Weight: {question.weight}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            onClick={prevSection} 
            disabled={currentSection === 0}
            className="bg-slate-700 hover:bg-slate-600"
          >
            Previous
          </Button>
          <Button 
            onClick={nextSection}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentSection === securitySections.length - 1 ? 'Complete Assessment' : 'Next Section'}
          </Button>
        </div>
      </div>
    </div>
  );
}