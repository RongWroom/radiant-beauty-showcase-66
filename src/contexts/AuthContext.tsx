
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { securityUtils } from '@/utils/securityUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      console.log('Signing up with redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      console.log('Sign up response:', { data, error });
      return { error };
    } catch (err) {
      console.error('Sign up error:', err);
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Validate inputs
      if (!email || !password) {
        return { error: { message: 'Email and password are required' } };
      }

      // Rate limiting check
      const rateLimitKey = `login_${email}`;
      const isAllowed = await securityUtils.rateLimiter.checkRateLimit(rateLimitKey, 5, 300000); // 5 attempts per 5 minutes
      
      if (!isAllowed) {
        securityUtils.logSecurityEvent('LOGIN_RATE_LIMITED', { email: email.substring(0, 3) + '***' });
        return { error: { message: 'Too many login attempts. Please try again later.' } };
      }

      console.log('Attempting to sign in:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: securityUtils.validateInput.sanitizeInput(email, 254),
        password,
      });

      if (error) {
        securityUtils.logSecurityEvent('LOGIN_FAILED', { 
          email: email.substring(0, 3) + '***',
          error: error.message 
        });
      } else {
        securityUtils.logSecurityEvent('LOGIN_SUCCESS', { 
          email: email.substring(0, 3) + '***'
        });
      }
      
      console.log('Sign in response:', { data, error });
      return { error };
    } catch (err) {
      console.error('Sign in error:', err);
      securityUtils.logSecurityEvent('LOGIN_ERROR', { error: err.message });
      return { error: err };
    }
  };

  const signOut = async () => {
    console.log('Signing out');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
