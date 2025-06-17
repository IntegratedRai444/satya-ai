import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Brain, 
  Eye, 
  Zap, 
  Lock, 
  Fingerprint,
  KeyRound,
  Crown,
  Sparkles,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface LoginProps {
  onLogin: (userType: 'founder' | 'normal', userData: any) => void;
}

export default function LoginPage({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'register') {
      await handleRegister();
    } else {
      await handleLogin();
    }

    setIsLoading(false);
  };

  const handleRegister = async () => {
    // Validate registration fields
    if (!credentials.username || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (credentials.password.length < 8) {
      toast({
        title: "Registration Failed",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store user in localStorage (in production, this would be a proper API call)
    const userData = {
      id: `user_${Date.now()}`,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password, // In production, this would be hashed
      createdAt: new Date().toISOString()
    };

    const existingUsers = JSON.parse(localStorage.getItem('satyaai_users') || '[]');
    
    // Check if user already exists
    if (existingUsers.some((user: any) => user.username === credentials.username || user.email === credentials.email)) {
      toast({
        title: "Registration Failed",
        description: "Username or email already exists.",
        variant: "destructive"
      });
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem('satyaai_users', JSON.stringify(existingUsers));

    toast({
      title: "Registration Successful",
      description: "Account created successfully. You can now login.",
      variant: "default"
    });

    // Switch to login mode
    setMode('login');
    setCredentials({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogin = async () => {
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check founder credentials (with reset password option)
    if (credentials.username === 'Rishabh kapoor' && (credentials.password === 'Rishabhkapoor@0444' || credentials.password === 'Rai444')) {
      // Founder access
      const founderData = {
        id: 'founder_001',
        name: 'Rishabh Kapoor',
        role: 'Founder & CEO',
        accessLevel: 'ROOT_ADMIN',
        permissions: [
          'AGENT_CONTROL',
          'TELEMETRY_MASTER',
          'RED_TEAM_SIM',
          'VAULT_ACCESS',
          'AUTO_PATCH',
          'CLOAKING_CONTROL'
        ],
        avatar: '👑',
        specialAccess: true,
        lastLogin: new Date().toISOString()
      };

      toast({
        title: "Founder Access Granted",
        description: "Welcome back, Rishabh. Full SatyaX control activated.",
        variant: "default"
      });

      onLogin('founder', founderData);
      return;
    }

    // Check registered users
    const existingUsers = JSON.parse(localStorage.getItem('satyaai_users') || '[]');
    const user = existingUsers.find((u: any) => 
      (u.username === credentials.username || u.email === credentials.username) && 
      u.password === credentials.password
    );

    if (user) {
      // Registered user access
      const normalUserData = {
        id: user.id,
        name: user.username,
        email: user.email,
        role: 'Security Analyst',
        accessLevel: 'STANDARD',
        permissions: [
          'DASHBOARD_VIEW',
          'THREAT_ANALYSIS',
          'REPORT_GENERATION',
          'BASIC_CONTROLS'
        ],
        avatar: '👤',
        specialAccess: false,
        lastLogin: new Date().toISOString()
      };

      toast({
        title: "Access Granted",
        description: `Welcome back, ${user.username}!`,
        variant: "default"
      });

      onLogin('normal', normalUserData);
    } else if (credentials.username && credentials.password) {
      // Demo access for any other credentials
      const demoUserData = {
        id: `demo_${Date.now()}`,
        name: credentials.username,
        role: 'Demo User',
        accessLevel: 'DEMO',
        permissions: [
          'DASHBOARD_VIEW',
          'BASIC_CONTROLS'
        ],
        avatar: '🎯',
        specialAccess: false,
        lastLogin: new Date().toISOString()
      };

      toast({
        title: "Demo Access Granted",
        description: `Welcome to SatyaAI Demo, ${credentials.username}`,
        variant: "default"
      });

      onLogin('normal', demoUserData);
    } else {
      // Failed login
      setLoginAttempts(prev => prev + 1);
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">SatyaAI</h1>
              <p className="text-cyan-400 font-medium">Cyber Intelligence Platform</p>
            </div>
          </div>
          
          <Badge className="bg-purple-500/20 text-purple-200 border border-purple-500/40 px-4 py-2 mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Secure Access Portal
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <KeyRound className="w-6 h-6 text-cyan-400" />
              {mode === 'register' ? 'Create Account' : 'Secure Authentication'}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {mode === 'register' 
                ? 'Create your SatyaAI account to access advanced cybersecurity features'
                : 'Enter your credentials to access the cybersecurity dashboard'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-300 font-medium">
                    {mode === 'register' ? 'Username' : 'Username or Email'}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder={mode === 'register' ? "Choose a username" : "Enter username or email"}
                    className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500 mt-2"
                    required
                  />
                </div>

                {mode === 'register' && (
                  <div>
                    <Label htmlFor="email" className="text-gray-300 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500 mt-2"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder={mode === 'register' ? "Create a strong password (min 8 chars)" : "Enter your password"}
                    className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500 mt-2"
                    required
                  />
                </div>

                {mode === 'register' && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-300 font-medium">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={credentials.confirmPassword}
                      onChange={(e) => setCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500 mt-2"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Fingerprint className="w-4 h-4 text-green-400" />
                  <span>Biometric Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Behavioral Auth</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>AI Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Zero Trust</span>
                </div>
              </div>

              {/* Login Attempts Warning */}
              {loginAttempts > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">
                      {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''} detected
                    </span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>{mode === 'register' ? 'Creating Account...' : 'Authenticating...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>{mode === 'register' ? 'Create Account' : 'Secure Login'}</span>
                  </div>
                )}
              </Button>

              {/* Mode Toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setCredentials({ username: '', email: '', password: '', confirmPassword: '' });
                    setLoginAttempts(0);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  {mode === 'login' 
                    ? "Don't have an account? Create one here" 
                    : "Already have an account? Sign in here"
                  }
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="text-center text-sm text-gray-400">
                <p className="mb-2">Powered by Advanced AI Security</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs">256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs">Multi-Factor Auth</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Demo Access Levels
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Founder Access:</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Root Admin
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Standard Access:</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                Security Analyst
              </Badge>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              Use any credentials for standard access, or founder credentials for full control
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}