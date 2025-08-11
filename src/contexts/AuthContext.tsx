import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: 'admin' | 'editor' | 'viewer' | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'editor' | 'viewer' | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If session changes, fetch user role immediately
        if (session?.user) {
          // Add a small delay to ensure profile is created
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 1000);
        } else {
          setUserRole(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Add a small delay to ensure profile is created
        setTimeout(() => {
          fetchUserRole(session.user.id);
        }, 1000);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [t]);

  async function fetchUserRole(userId: string) {
    try {
      console.log("Fetching user role for userId:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Supabase error fetching user role:', error);
        throw error;
      }
      
      console.log("Profile data received:", data);
      
      if (data) {
        setUserRole(data.role as 'admin' | 'editor' | 'viewer');
        console.log("User role set to:", data.role);
      } else {
        console.log("No profile data found for user:", userId);
        // Try to create a profile for this user
        await createProfileForUser(userId);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    }
  }

  async function createProfileForUser(userId: string) {
    try {
      console.log("Creating profile for user:", userId);
      
      // Get user info from auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Error getting user info:', userError);
        return;
      }
      
      // Create profile with default role
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Unknown User',
          role: 'admin', // Default to admin for now
        });
        
      if (insertError) {
        console.error('Error creating profile:', insertError);
        return;
      }
      
      console.log("Profile created successfully");
      setUserRole('admin');
      
    } catch (error) {
      console.error('Error creating profile for user:', error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        description: t('loginSuccessful'),
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: t('error'),
        description: error.message || t('loginFailed'),
        variant: 'destructive',
      });
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      // For this application, we don't allow self sign-up
      // Only admins can create users, so we show a message here
      toast({
        title: t('error'),
        description: t('signupNotAllowed'),
        variant: 'destructive',
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: t('error'),
        description: error.message || t('signupFailed'),
        variant: 'destructive',
      });
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      navigate('/emp-portal');
      toast({
        description: t('logoutSuccessful'),
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: t('error'),
        description: error.message || t('logoutFailed'),
        variant: 'destructive',
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        userRole,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
