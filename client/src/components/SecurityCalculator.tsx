import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Calculator,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Target,
  Eye,
  Lock,
  Smartphone,
  Wifi,
  Home,
  Building2
} from 'lucide-react';
import { useState } from 'react';

export default function SecurityCalculator() {
  const [userType, setUserType] = useState('');
  const [deviceCount, setDeviceCount] = useState([5]);
  const [networkType, setNetworkType] = useState('');
  const [budgetRange, setBudgetRange] = useState([500]);
  const [riskTolerance, setRiskTolerance] = useState('');
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const securityMetrics = {
    passwordStrength: 85,
    deviceSecurity: 78,
    networkSafety: 92,
    dataProtection: 67,
    threatAwareness: 89,
    incidentResponse: 73
  };

  const riskFactors = [
    { name: 'Phishing Attacks', probability: 35, impact: 'High', mitigation: 'Email filters, Training' },
    { name: 'Malware Infection', probability: 28, impact: 'Medium', mitigation: 'Antivirus, Updates' },
    { name: 'Data Breach', probability: 15, impact: 'Critical', mitigation: 'Encryption, Access control' },
    { name: 'Identity Theft', probability: 22, impact: 'High', mitigation: 'Monitoring, Strong auth' },
    { name: 'Ransomware', probability: 12, impact: 'Critical', mitigation: 'Backups, Segmentation' }
  ];

  const availableSecurityTools = [
    { name: 'Password Manager', cost: 36, effectiveness: 90, category: 'Authentication' },
    { name: 'VPN Service', cost: 60, effectiveness: 75, category: 'Network' },
    { name: 'Antivirus Premium', cost: 45, effectiveness: 80, category: 'Endpoint' },
    { name: 'Backup Solution', cost: 120, effectiveness: 95, category: 'Data Protection' },
    { name: 'Security Monitoring', cost: 200, effectiveness: 85, category: 'Detection' },
    { name: 'Email Security', cost: 84, effectiveness: 88, category: 'Communication' }
  ];

  const calculateSecurityScore = () => {
    let baseScore = 50;
    let adjustments = 0;

    // User type adjustments
    if (userType === 'individual') adjustments += 10;
    else if (userType === 'small-business') adjustments += 5;
    else if (userType === 'enterprise') adjustments -= 5;

    // Device count impact
    const devices = deviceCount[0];
    if (devices <= 3) adjustments += 15;
    else if (devices <= 10) adjustments += 5;
    else if (devices > 20) adjustments -= 10;

    // Network type impact
    if (networkType === 'home-secure') adjustments += 10;
    else if (networkType === 'office') adjustments += 5;
    else if (networkType === 'public') adjustments -= 15;

    // Budget impact
    const budget = budgetRange[0];
    if (budget >= 1000) adjustments += 20;
    else if (budget >= 500) adjustments += 10;
    else if (budget < 100) adjustments -= 10;

    // Risk tolerance impact
    if (riskTolerance === 'low') adjustments += 15;
    else if (riskTolerance === 'medium') adjustments += 5;
    else if (riskTolerance === 'high') adjustments -= 10;

    const finalScore = Math.max(0, Math.min(100, baseScore + adjustments));

    const recommendations = generateRecommendations(finalScore, budget);
    const riskLevel = finalScore >= 80 ? 'Low' : finalScore >= 60 ? 'Medium' : 'High';

    setCalculationResult({
      score: finalScore,
      riskLevel,
      recommendations,
      estimatedCost: calculateEstimatedCost(finalScore),
      timeline: calculateTimeline(finalScore)
    });
  };

  const generateRecommendations = (score, budget) => {
    const recommendations = [];

    if (score < 60) {
      recommendations.push('Immediate: Enable two-factor authentication on all accounts');
      recommendations.push('Critical: Install reputable antivirus software');
      recommendations.push('Essential: Use a password manager for unique passwords');
    }

    if (score < 80) {
      recommendations.push('Important: Set up automated backups');
      recommendations.push('Recommended: Use VPN for public network access');
      recommendations.push('Suggested: Enable automatic security updates');
    }

    if (budget >= 500) {
      recommendations.push('Advanced: Consider security monitoring service');
      recommendations.push('Professional: Implement email security solution');
    }

    if (budget >= 1000) {
      recommendations.push('Enterprise: Deploy endpoint detection and response');
      recommendations.push('Comprehensive: Add security awareness training');
    }

    return recommendations;
  };

  const calculateEstimatedCost = (score) => {
    const baseCost = 200;
    const scoreFactor = (100 - score) / 100;
    return Math.round(baseCost + (scoreFactor * 800));
  };

  const calculateTimeline = (score) => {
    if (score >= 80) return '2-4 weeks';
    if (score >= 60) return '4-8 weeks';
    return '8-12 weeks';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Security Risk Calculator
            </h1>
            <p className="text-slate-400">Calculate your security score and risk assessment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calculator Input */}
        <div className="xl:col-span-2">
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Security Assessment Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">User Type</label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual User</SelectItem>
                      <SelectItem value="small-business">Small Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Network</label>
                  <Select value={networkType} onValueChange={setNetworkType}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Select network type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home-secure">Secure Home Network</SelectItem>
                      <SelectItem value="home-basic">Basic Home Network</SelectItem>
                      <SelectItem value="office">Office Network</SelectItem>
                      <SelectItem value="public">Public Networks</SelectItem>
                      <SelectItem value="mixed">Mixed Usage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Risk Tolerance</label>
                  <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Maximum Security</SelectItem>
                      <SelectItem value="medium">Medium - Balanced Approach</SelectItem>
                      <SelectItem value="high">High - Minimal Restrictions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Number of Devices: {deviceCount[0]}
                  </label>
                  <Slider
                    value={deviceCount}
                    onValueChange={setDeviceCount}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1</span>
                    <span>50+</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Security Budget (Annual): ${budgetRange[0]}
                  </label>
                  <Slider
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={2000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$0</span>
                    <span>$2000+</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculateSecurityScore}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!userType || !networkType || !riskTolerance}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Security Score
              </Button>
            </CardContent>
          </Card>

          {/* Current Security Metrics */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Current Security Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(securityMetrics).map(([key, value]) => (
                  <div key={key} className="p-3 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`font-semibold ${getScoreColor(value)}`}>{value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full">
                      <div 
                        className={`h-full rounded-full ${value >= 80 ? 'bg-green-400' : value >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results and Recommendations */}
        <div className="space-y-6">
          {calculationResult && (
            <>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(calculationResult.score)} mb-2`}>
                    {calculationResult.score}%
                  </div>
                  <Badge variant="outline" className={getRiskColor(calculationResult.riskLevel)}>
                    {calculationResult.riskLevel} Risk
                  </Badge>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Cost:</span>
                      <span className="text-green-400">${calculationResult.estimatedCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Implementation:</span>
                      <span className="text-blue-400">{calculationResult.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculationResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 bg-slate-800 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-3 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">{risk.name}</span>
                      <Badge variant="outline" className={
                        risk.impact === 'Critical' ? 'text-red-400 border-red-400' :
                        risk.impact === 'High' ? 'text-orange-400 border-orange-400' :
                        'text-yellow-400 border-yellow-400'
                      }>
                        {risk.impact}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400 mb-1">
                      Probability: {risk.probability}%
                    </div>
                    <div className="text-xs text-slate-500">
                      Mitigation: {risk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Security Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {availableSecurityTools.map((tool, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-800 rounded text-sm">
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-slate-400">{tool.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400">${tool.cost}/year</div>
                      <div className="text-xs text-blue-400">{tool.effectiveness}% effective</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}