import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'editor' | 'viewer'>;
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const { t } = useLanguage();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("Protected Route - User:", user);
    console.log("Protected Route - UserRole:", userRole);
    console.log("Protected Route - Loading:", loading);
    console.log("Protected Route - Allowed Roles:", allowedRoles);
  }, [user, userRole, loading, allowedRoles]);
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("No user found, redirecting to login");
        setShouldRedirect('/emp_portal');
      } else if (allowedRoles && allowedRoles.length > 0) {
        if (userRole === null) {
          console.log("User role not loaded yet, waiting...");
          setShouldRedirect(null);
        } else if (!allowedRoles.includes(userRole)) {
          console.log("User role not allowed, redirecting to home");
          toast({
            title: t('accessDenied'),
            description: t('adminOnlyAccess'),
            variant: 'destructive',
          });
          setShouldRedirect('/');
        } else {
          console.log("User has required role, allowing access");
          setShouldRedirect(null);
        }
      } else {
        console.log("No role restrictions, allowing access");
        setShouldRedirect(null);
      }
    }
  }, [user, userRole, loading, allowedRoles, t]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          {t('loading')}
        </div>
      </div>
    );
  }
  
  // Show loading when user exists but role is not loaded yet
  if (user && userRole === null) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          {t('loading')}
        </div>
      </div>
    );
  }
  
  if (shouldRedirect) {
    console.log("Redirecting to:", shouldRedirect);
    return <Navigate to={shouldRedirect} replace />;
  }

  return <>{children}</>;
};
