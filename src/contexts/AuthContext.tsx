
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { securityUtils } from '@/utils/securityUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithMagicLink: (email: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
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

  const signInWithMagicLink = async (email: string, firstName?: string, lastName?: string) => {
    try {
      // Validate inputs
      if (!email) {
        return { error: { message: 'Email is required' } };
      }

      // Rate limiting check
      const rateLimitKey = `magic_link_${email}`;
      const isAllowed = await securityUtils.rateLimiter.checkRateLimit(rateLimitKey, 3, 300000); // 3 attempts per 5 minutes
      
      if (!isAllowed) {
        securityUtils.logSecurityEvent('MAGIC_LINK_RATE_LIMITED', { email: email.substring(0, 3) + '***' });
        return { error: { message: 'Too many magic link requests. Please try again later.' } };
      }

      const redirectUrl = `${window.location.origin}/`;
      console.log('Sending magic link with redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email: securityUtils.validateInput.sanitizeInput(email, 254),
        options: {
          emailRedirectTo: redirectUrl,
          data: firstName && lastName ? {
            first_name: firstName,
            last_name: lastName
          } : undefined
        }
      });

      if (error) {
        securityUtils.logSecurityEvent('MAGIC_LINK_FAILED', { 
          email: email.substring(0, 3) + '***',
          error: error.message 
        });
      } else {
        securityUtils.logSecurityEvent('MAGIC_LINK_SENT', { 
          email: email.substring(0, 3) + '***'
        });
      }
      
      console.log('Magic link response:', { data, error });
      return { error };
    } catch (err) {
      console.error('Magic link error:', err);
      securityUtils.logSecurityEvent('MAGIC_LINK_ERROR', { error: err.message });
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
    signInWithMagicLink,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
