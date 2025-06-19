import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import AuthenticatedApp from "@/components/AuthenticatedApp";
import LoginPage from "@/components/LoginPage";

const queryClient = new QueryClient();

interface AuthenticatedUser {
  id: string;
  email: string;
  accessLevel: 'developer' | 'company' | 'basic';
  permissions: string[];
  status: 'active';
}

function App() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('satyaai_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('satyaai_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (authenticatedUser: AuthenticatedUser) => {
    setUser(authenticatedUser);
    localStorage.setItem('satyaai_user', JSON.stringify(authenticatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('satyaai_user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading SatyaAI Platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <LoginPage onLogin={handleLogin} />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return <AuthenticatedApp user={user} onLogout={handleLogout} />;
}

export default App;
