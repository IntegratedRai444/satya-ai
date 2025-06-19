import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, AlertTriangle } from 'lucide-react';

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

interface AccessControlWrapperProps {
  user: AuthenticatedUser;
  requiredLevel: 'developer' | 'company' | 'basic';
  requiredPermissions?: string[];
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

export default function AccessControlWrapper({
  user,
  requiredLevel,
  requiredPermissions = [],
  children,
  fallbackComponent
}: AccessControlWrapperProps) {
  const accessLevels = {
    basic: 1,
    company: 2,
    developer: 3
  };

  const userLevel = accessLevels[user.accessLevel];
  const requiredLevelValue = accessLevels[requiredLevel];

  // Check if user has sufficient access level
  const hasRequiredLevel = userLevel >= requiredLevelValue;

  // Check if user has required permissions
  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );

  const hasAccess = hasRequiredLevel && hasRequiredPermissions;

  if (hasAccess) {
    return <>{children}</>;
  }

  // Show fallback component if provided, otherwise show access denied
  if (fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  return (
    <Card className="bg-slate-900 border-red-500/30">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-red-600/20 rounded-full">
            <Lock className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400">Access Restricted</h3>
            <p className="text-slate-400">Insufficient permissions to view this content</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <span className="text-sm text-slate-400">Your Access Level</span>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {user.accessLevel.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <span className="text-sm text-slate-400">Required Level</span>
            <Badge variant="outline" className="text-red-400 border-red-400">
              {requiredLevel.toUpperCase()}
            </Badge>
          </div>

          {requiredPermissions.length > 0 && (
            <div className="p-3 bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-400 mb-2">Required Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {requiredPermissions.map((permission, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Access Upgrade Required</span>
          </div>
          <p className="text-xs text-slate-400">
            Contact your administrator or request access through the Request Access Portal to gain the necessary permissions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Higher-order component for easy wrapping
export function withAccessControl<T extends object>(
  Component: React.ComponentType<T>,
  requiredLevel: 'developer' | 'company' | 'basic',
  requiredPermissions?: string[]
) {
  return function AccessControlledComponent(props: T & { user: AuthenticatedUser }) {
    const { user, ...otherProps } = props;
    
    return (
      <AccessControlWrapper
        user={user}
        requiredLevel={requiredLevel}
        requiredPermissions={requiredPermissions}
      >
        <Component {...(otherProps as T)} />
      </AccessControlWrapper>
    );
  };
}