import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown,
  UserPlus,
  UserMinus,
  Users,
  Shield,
  Clock,
  Key,
  Eye,
  EyeOff,
  Calendar,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Star,
  Ban,
  Unlock,
  Lock,
  Activity,
  FileText,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

interface TemporaryUser {
  id: string;
  username: string;
  tempPassword: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  role: 'viewer' | 'analyst' | 'admin' | 'executive';
  accessLevel: 'basic' | 'advanced' | 'full';
  permissions: {
    viewDashboard: boolean;
    viewCompanies: boolean;
    viewAgents: boolean;
    manageJobs: boolean;
    viewAnalytics: boolean;
    accessVault: boolean;
    useVoiceAI: boolean;
    downloadReports: boolean;
  };
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  lastLogin?: string;
  loginAttempts: number;
  sessionHistory: {
    loginTime: string;
    logoutTime?: string;
    ipAddress: string;
    userAgent: string;
    duration?: string;
  }[];
  notes?: string;
}

interface FounderUserManagementProps {
  currentUser: {
    name: string;
    username: string;
    isFounder: boolean;
  };
}

const ROLE_PERMISSIONS = {
  viewer: {
    viewDashboard: true,
    viewCompanies: false,
    viewAgents: false,
    manageJobs: false,
    viewAnalytics: false,
    accessVault: false,
    useVoiceAI: false,
    downloadReports: false
  },
  analyst: {
    viewDashboard: true,
    viewCompanies: true,
    viewAgents: true,
    manageJobs: false,
    viewAnalytics: true,
    accessVault: false,
    useVoiceAI: false,
    downloadReports: true
  },
  admin: {
    viewDashboard: true,
    viewCompanies: true,
    viewAgents: true,
    manageJobs: true,
    viewAnalytics: true,
    accessVault: false,
    useVoiceAI: true,
    downloadReports: true
  },
  executive: {
    viewDashboard: true,
    viewCompanies: true,
    viewAgents: true,
    manageJobs: true,
    viewAnalytics: true,
    accessVault: true,
    useVoiceAI: true,
    downloadReports: true
  }
};

export default function FounderUserManagement({ currentUser }: FounderUserManagementProps) {
  const [temporaryUsers, setTemporaryUsers] = useState<TemporaryUser[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TemporaryUser | null>(null);
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // New user form state
  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: 'viewer' as 'viewer' | 'analyst' | 'admin' | 'executive',
    accessLevel: 'basic' as 'basic' | 'advanced' | 'full',
    expirationDays: 7,
    notes: '',
    customPermissions: ROLE_PERMISSIONS.viewer
  });

  useEffect(() => {
    loadTemporaryUsers();
  }, []);

  const loadTemporaryUsers = () => {
    // Mock data for demonstration
    const mockUsers: TemporaryUser[] = [
      {
        id: 'temp-001',
        username: 'john.analyst',
        tempPassword: 'TempPass123!',
        fullName: 'John Anderson',
        email: 'john@company.com',
        phone: '+1-555-0123',
        company: 'TechCorp Solutions',
        role: 'analyst',
        accessLevel: 'advanced',
        permissions: ROLE_PERMISSIONS.analyst,
        createdBy: 'Rishabh Kapoor',
        createdAt: '2024-06-15T10:30:00Z',
        expiresAt: '2024-06-22T10:30:00Z',
        isActive: true,
        lastLogin: '2024-06-17T09:15:00Z',
        loginAttempts: 0,
        sessionHistory: [
          {
            loginTime: '2024-06-17T09:15:00Z',
            logoutTime: '2024-06-17T12:30:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome/91.0',
            duration: '3h 15m'
          }
        ],
        notes: 'Senior analyst from TechCorp, needs access for quarterly review'
      },
      {
        id: 'temp-002',
        username: 'sarah.exec',
        tempPassword: 'SecureTemp456!',
        fullName: 'Sarah Williams',
        email: 'sarah@financesecure.com',
        phone: '+1-555-0456',
        company: 'FinanceSecure Bank',
        role: 'executive',
        accessLevel: 'full',
        permissions: ROLE_PERMISSIONS.executive,
        createdBy: 'Rishabh Kapoor',
        createdAt: '2024-06-14T14:20:00Z',
        expiresAt: '2024-06-28T14:20:00Z',
        isActive: true,
        lastLogin: '2024-06-16T16:45:00Z',
        loginAttempts: 0,
        sessionHistory: [
          {
            loginTime: '2024-06-16T16:45:00Z',
            logoutTime: '2024-06-16T18:20:00Z',
            ipAddress: '192.168.1.105',
            userAgent: 'Firefox/89.0',
            duration: '1h 35m'
          }
        ],
        notes: 'C-level executive, requires full access for strategic planning'
      },
      {
        id: 'temp-003',
        username: 'mike.viewer',
        tempPassword: 'ViewOnly789!',
        fullName: 'Mike Chen',
        email: 'mike@healthguard.com',
        company: 'HealthGuard Medical',
        role: 'viewer',
        accessLevel: 'basic',
        permissions: ROLE_PERMISSIONS.viewer,
        createdBy: 'Rishabh Kapoor',
        createdAt: '2024-06-16T11:00:00Z',
        expiresAt: '2024-06-20T11:00:00Z',
        isActive: false,
        loginAttempts: 3,
        sessionHistory: [],
        notes: 'Compliance officer, basic access only'
      }
    ];
    setTemporaryUsers(mockUsers);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const createTemporaryUser = () => {
    if (!newUser.username || !newUser.fullName || !newUser.email) {
      toast({
        title: "Validation Error",
        description: "Username, full name, and email are required",
        variant: "destructive"
      });
      return;
    }

    const tempPassword = generatePassword();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + newUser.expirationDays);

    const tempUser: TemporaryUser = {
      id: `temp-${Date.now()}`,
      username: newUser.username,
      tempPassword,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      company: newUser.company,
      role: newUser.role,
      accessLevel: newUser.accessLevel,
      permissions: newUser.customPermissions,
      createdBy: currentUser.name,
      createdAt: new Date().toISOString(),
      expiresAt: expirationDate.toISOString(),
      isActive: true,
      loginAttempts: 0,
      sessionHistory: [],
      notes: newUser.notes
    };

    setTemporaryUsers(prev => [...prev, tempUser]);
    setShowCreateForm(false);
    setNewUser({
      username: '',
      fullName: '',
      email: '',
      phone: '',
      company: '',
      role: 'viewer',
      accessLevel: 'basic',
      expirationDays: 7,
      notes: '',
      customPermissions: ROLE_PERMISSIONS.viewer
    });

    toast({
      title: "User Created Successfully",
      description: `Temporary access granted to ${tempUser.fullName}`,
      variant: "default"
    });
  };

  const deactivateUser = (userId: string) => {
    setTemporaryUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: false } : user
    ));
    
    toast({
      title: "User Deactivated",
      description: "User access has been revoked immediately",
      variant: "default"
    });
  };

  const reactivateUser = (userId: string) => {
    setTemporaryUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: true, loginAttempts: 0 } : user
    ));
    
    toast({
      title: "User Reactivated",
      description: "User access has been restored",
      variant: "default"
    });
  };

  const extendAccess = (userId: string, days: number) => {
    setTemporaryUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const newExpiration = new Date(user.expiresAt);
        newExpiration.setDate(newExpiration.getDate() + days);
        return { ...user, expiresAt: newExpiration.toISOString() };
      }
      return user;
    }));
    
    toast({
      title: "Access Extended",
      description: `User access extended by ${days} days`,
      variant: "default"
    });
  };

  const deleteUser = (userId: string) => {
    setTemporaryUsers(prev => prev.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: "User account has been permanently removed",
      variant: "default"
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'viewer': return 'bg-blue-500 text-white';
      case 'analyst': return 'bg-green-500 text-white';
      case 'admin': return 'bg-orange-500 text-white';
      case 'executive': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-gray-600 text-white';
      case 'advanced': return 'bg-yellow-600 text-white';
      case 'full': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (isActive: boolean, expiresAt: string) => {
    if (!isActive) return 'bg-red-500 text-white';
    const now = new Date();
    const expiration = new Date(expiresAt);
    const hoursUntilExpiration = (expiration.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiration < 0) return 'bg-red-500 text-white';
    if (hoursUntilExpiration < 24) return 'bg-yellow-500 text-white';
    return 'bg-green-500 text-white';
  };

  const getTimeUntilExpiration = (expiresAt: string) => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    const diff = expiration.getTime() - now.getTime();
    
    if (diff < 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const filteredUsers = temporaryUsers.filter(user => {
    const roleMatch = filterRole === 'ALL' || user.role === filterRole;
    const statusMatch = filterStatus === 'ALL' || 
      (filterStatus === 'ACTIVE' && user.isActive) ||
      (filterStatus === 'INACTIVE' && !user.isActive) ||
      (filterStatus === 'EXPIRED' && new Date(user.expiresAt) < new Date());
    const searchMatch = searchTerm === '' || 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return roleMatch && statusMatch && searchMatch;
  });

  // Founder verification with password prompt
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [founderPassword, setFounderPassword] = useState('');
  const [isFounderVerified, setIsFounderVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const verifyFounderAccess = () => {
    if (founderPassword === 'Rishabhkapoor@0444' || founderPassword === 'Rai444') {
      setIsFounderVerified(true);
      setShowPasswordPrompt(false);
      setPasswordError('');
      toast({
        title: "Access Granted",
        description: "Founder authentication successful",
        variant: "default"
      });
    } else {
      setPasswordError('Invalid founder password. Use main password or reset password.');
    }
  };

  // Only allow access if current user is founder (Rishabh Kapoor)
  if (!currentUser.isFounder || currentUser.username !== 'rishabhkapoor') {
    return (
      <Card className="bg-gray-900/80 border-red-700">
        <CardContent className="p-12 text-center">
          <Ban className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-red-400">
            Only Rishabh Kapoor (Founder) has access to user management
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Founder User Management
              </CardTitle>
              <CardDescription>
                Manage temporary access to SatyaX founder portal - Only accessible by Rishabh Kapoor
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-600 text-white">
                Active Users: {temporaryUsers.filter(u => u.isActive).length}
              </Badge>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-600 hover:bg-green-700"
                disabled={!isFounderVerified}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-yellow-400" />
              <Label className="text-yellow-400 font-semibold">Access Control Panel</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="accessPassword" className="text-gray-300 text-sm">Enter Password to Grant/Remove User Access</Label>
                <Input
                  id="accessPassword"
                  type="password"
                  value={founderPassword}
                  onChange={(e) => {
                    setFounderPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && verifyFounderAccess()}
                  placeholder="Enter founder password"
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                )}
                <div className="text-sm text-gray-400 mt-2">
                  <p>• Enter your founder password to access user controls</p>
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={verifyFounderAccess}
                  className={`w-full ${isFounderVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                >
                  {isFounderVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Access Granted
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Verify Access
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create User Form */}
      {showCreateForm && (
        <Card className="bg-gray-900/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Create Temporary User</CardTitle>
            <CardDescription>Grant temporary access to SatyaX founder portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-300">Username *</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="john.analyst"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="John Anderson"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1-555-0123"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-300">Company</Label>
                  <Input
                    id="company"
                    value={newUser.company}
                    onChange={(e) => setNewUser(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Company Name"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Role</Label>
                  <Select value={newUser.role} onValueChange={(value: 'viewer' | 'analyst' | 'admin' | 'executive') => {
                    setNewUser(prev => ({ 
                      ...prev, 
                      role: value,
                      customPermissions: ROLE_PERMISSIONS[value]
                    }));
                  }}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="viewer">Viewer - Basic access</SelectItem>
                      <SelectItem value="analyst">Analyst - Data analysis</SelectItem>
                      <SelectItem value="admin">Admin - Management access</SelectItem>
                      <SelectItem value="executive">Executive - Full access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Access Level</Label>
                  <Select value={newUser.accessLevel} onValueChange={(value: any) => setNewUser(prev => ({ ...prev, accessLevel: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="basic">Basic - Limited features</SelectItem>
                      <SelectItem value="advanced">Advanced - Most features</SelectItem>
                      <SelectItem value="full">Full - All features</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Expiration (Days)</Label>
                  <Input
                    type="number"
                    value={newUser.expirationDays}
                    onChange={(e) => setNewUser(prev => ({ ...prev, expirationDays: parseInt(e.target.value) }))}
                    min="1"
                    max="90"
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-300">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newUser.notes}
                    onChange={(e) => setNewUser(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Purpose of access, special requirements..."
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Permissions Preview */}
            <div>
              <Label className="text-gray-300 mb-3 block">Permissions Preview</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(newUser.customPermissions).map(([permission, enabled]) => (
                  <div key={permission} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                    <span className="text-gray-300 text-sm">{permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <Badge className={enabled ? 'bg-green-500' : 'bg-red-500'}>
                      {enabled ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={createTemporaryUser}
                className="bg-green-600 hover:bg-green-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-gray-900/80 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="bg-gray-800 border-gray-700 text-white w-64"
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="EXPIRED">Expired</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-400">
              {filteredUsers.length} of {temporaryUsers.length} users
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map(user => (
          <Card key={user.id} className="bg-gray-900/80 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{user.fullName}</h4>
                  <p className="text-gray-400">@{user.username}</p>
                  {user.company && (
                    <p className="text-gray-500 text-sm">{user.company}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.toUpperCase()}
                  </Badge>
                  <Badge className={getAccessLevelColor(user.accessLevel)}>
                    {user.accessLevel.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(user.isActive, user.expiresAt)}>
                    {!user.isActive ? 'INACTIVE' : new Date(user.expiresAt) < new Date() ? 'EXPIRED' : 'ACTIVE'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{user.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expires:</span>
                  <span className={new Date(user.expiresAt) < new Date() ? 'text-red-400' : 'text-white'}>
                    {getTimeUntilExpiration(user.expiresAt)}
                  </span>
                </div>
                {user.lastLogin && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Login:</span>
                    <span className="text-white">{new Date(user.lastLogin).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Sessions:</span>
                  <span className="text-cyan-400">{user.sessionHistory.length}</span>
                </div>
              </div>

              {user.notes && (
                <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700">
                  <Label className="text-gray-400 text-sm">Notes:</Label>
                  <p className="text-gray-300 text-sm mt-1">{user.notes}</p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {user.isActive ? (
                  <Button
                    onClick={() => deactivateUser(user.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={!isFounderVerified}
                    title={!isFounderVerified ? "Enter password to access user controls" : ""}
                  >
                    <UserMinus className="w-3 h-3 mr-1" />
                    Revoke Access
                  </Button>
                ) : (
                  <Button
                    onClick={() => reactivateUser(user.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!isFounderVerified}
                    title={!isFounderVerified ? "Enter password to access user controls" : ""}
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Grant Access
                  </Button>
                )}
                
                <Button
                  onClick={() => extendAccess(user.id, 7)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!isFounderVerified}
                  title={!isFounderVerified ? "Enter password to access user controls" : ""}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  +7 Days
                </Button>
                
                <Button
                  onClick={() => setSelectedUser(user)}
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </Button>
                
                <Button
                  onClick={() => deleteUser(user.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  disabled={!isFounderVerified}
                  title={!isFounderVerified ? "Enter password to access user controls" : ""}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="bg-gray-900/80 border-gray-700">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
            <p className="text-gray-400">
              {temporaryUsers.length === 0 
                ? "No temporary users have been created yet."
                : "No users match the current filters."
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-gray-900 border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">User Details: {selectedUser.fullName}</CardTitle>
                <Button
                  onClick={() => setSelectedUser(null)}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300 font-semibold">Account Information</Label>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Username:</span>
                      <span className="text-white">{selectedUser.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temp Password:</span>
                      <span className="text-cyan-400 font-mono">{selectedUser.tempPassword}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Login Attempts:</span>
                      <span className={selectedUser.loginAttempts > 2 ? 'text-red-400' : 'text-white'}>
                        {selectedUser.loginAttempts}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 font-semibold">Permissions</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(selectedUser.permissions).map(([permission, enabled]) => (
                      <div key={permission} className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">
                          {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <Badge className={enabled ? 'bg-green-500' : 'bg-red-500'}>
                          {enabled ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedUser.sessionHistory.length > 0 && (
                <div>
                  <Label className="text-gray-300 font-semibold">Session History</Label>
                  <div className="mt-2 space-y-2">
                    {selectedUser.sessionHistory.map((session, index) => (
                      <div key={index} className="bg-gray-800/50 p-3 rounded border border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Login:</span>
                            <span className="text-white ml-2">{new Date(session.loginTime).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Duration:</span>
                            <span className="text-white ml-2">{session.duration || 'Active'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">IP:</span>
                            <span className="text-white ml-2">{session.ipAddress}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Browser:</span>
                            <span className="text-white ml-2">{session.userAgent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}