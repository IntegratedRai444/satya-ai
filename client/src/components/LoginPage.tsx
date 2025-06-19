import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
// Removed react-query dependency to avoid QueryClient requirement
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  Mail,
  Key,
  Building2,
  Settings,
  Zap,
  Brain,
  Globe,
  Target
} from 'lucide-react';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

// Authorized users database
const AUTHORIZED_USERS = [
  {
    id: 'dev-001',
    email: 'rishabhkapoor@atomicmail.io',
    password: 'Rai444',
    accessLevel: 'developer' as const,
    permissions: [
      'Full System Access',
      'Developer Tools', 
      'Admin Panel',
      'All Features',
      'Code Access',
      'API Management',
      'System Configuration',
      'User Management'
    ],
    status: 'active' as const
  },
  {
    id: 'comp-001', 
    email: 'rishabhkap0444@gmail.com',
    password: 'Rishabhkapoor@0444',
    accessLevel: 'company' as const,
    permissions: [
      'Company Dashboard',
      'Team Reports', 
      'Analytics',
      'User Management',
      'Compliance Reports',
      'Security Overview',
      'Team Management'
    ],
    status: 'active' as const
  }
];

interface LoginPageProps {
  onLogin: (user: AuthenticatedUser) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuthentication = async (loginData: LoginCredentials) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Authenticate against authorized users
      const user = AUTHORIZED_USERS.find(
        u => u.email === loginData.email && u.password === loginData.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials. Please check your email and password.');
      }
      
      if (user.status !== 'active') {
        throw new Error('Account is not active. Please contact administrator.');
      }

      const authenticatedUser = {
        id: user.id,
        email: user.email,
        accessLevel: user.accessLevel,
        permissions: user.permissions,
        status: user.status
      };

      toast({
        title: "Login Successful",
        description: `Welcome! You have ${user.accessLevel} access level.`
      });
      
      onLogin(authenticatedUser);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    handleAuthentication(credentials);
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'developer': return <Settings className="w-4 h-4 text-green-400" />;
      case 'company': return <Building2 className="w-4 h-4 text-cyan-400" />;
      default: return <User className="w-4 h-4 text-blue-400" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'developer': return 'text-green-400 border-green-400';
      case 'company': return 'text-cyan-400 border-cyan-400';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SatyaAI
              </h1>
              <p className="text-slate-400 text-sm">Cyber Intelligence Platform</p>
            </div>
          </div>
          <p className="text-slate-300">
            Secure access to advanced cybersecurity intelligence and analysis tools
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Lock className="w-5 h-5 text-blue-400" />
              Secure Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-slate-800 border-slate-700 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure Login
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Authorized Access Levels */}
        <Card className="mt-6 bg-slate-900/80 backdrop-blur-sm border-slate-800">
          <CardHeader>
            <CardTitle className="text-center text-sm text-slate-400">
              Authorized Access Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {AUTHORIZED_USERS.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getAccessLevelIcon(user.accessLevel)}
                    <div>
                      <p className="text-sm font-medium text-slate-300">{user.accessLevel.toUpperCase()}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getAccessLevelColor(user.accessLevel)}>
                    {user.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">AI-Powered Analysis</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <Target className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Threat Intelligence</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Real-time Detection</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Global Security</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Powered by SatyaAI • Advanced Cybersecurity Intelligence Platform
          </p>
        </div>
      </div>
    </div>
  );
}