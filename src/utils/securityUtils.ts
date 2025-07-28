
import { supabase } from '@/integrations/supabase/client';

export const securityUtils = {
  // Enhanced security event logging with IP and User Agent
  logSecurityEvent: async (action: string, details?: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get additional security context
      const securityContext = {
        user_id: user?.id,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        details
      };
      
      console.log(`[SECURITY EVENT] ${action}`, securityContext);
      
      // Call the database logging function for persistent security logs
      try {
        await supabase.rpc('log_security_event', {
          action_type: action,
          details: details || {},
          user_agent: navigator.userAgent
        });
      } catch (dbError) {
        console.warn('Failed to log to database:', dbError);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  },

  // Validate user permissions
  validatePermissions: async (requiredRole: 'admin' | 'customer' = 'customer') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Authentication required');
      }

      if (requiredRole === 'admin') {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (roleData?.role !== 'admin') {
          throw new Error('Admin privileges required');
        }
      }

      return true;
    } catch (error) {
      await securityUtils.logSecurityEvent('PERMISSION_DENIED', { 
        requiredRole, 
        error: error.message 
      });
      throw error;
    }
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  },

  // Enhanced rate limiting with server-side validation
  rateLimiter: {
    attempts: new Map<string, { count: number; lastAttempt: number }>(),
    
    checkRateLimit: async (key: string, maxAttempts: number = 5, windowMs: number = 60000): Promise<boolean> => {
      const now = Date.now();
      const attempts = securityUtils.rateLimiter.attempts.get(key);
      
      // Client-side check first (faster)
      if (!attempts || now - attempts.lastAttempt > windowMs) {
        securityUtils.rateLimiter.attempts.set(key, { count: 1, lastAttempt: now });
      } else if (attempts.count >= maxAttempts) {
        securityUtils.logSecurityEvent('RATE_LIMIT_EXCEEDED', { key, attempts: attempts.count });
        return false;
      } else {
        attempts.count++;
        attempts.lastAttempt = now;
      }
      
      // Server-side validation for critical operations
      try {
        const { data: isAllowed } = await supabase.rpc('check_rate_limit', {
          identifier: key,
          max_attempts: maxAttempts,
          window_minutes: Math.ceil(windowMs / 60000)
        });
        
        if (!isAllowed) {
          securityUtils.logSecurityEvent('SERVER_RATE_LIMIT_EXCEEDED', { key });
          return false;
        }
      } catch (error) {
        console.warn('Server-side rate limit check failed, using client-side only:', error);
      }
      
      return true;
    }
  },

  // Enhanced input validation with length limits
  validateInput: {
    sanitizeInput: (input: string, maxLength: number = 10000): string => {
      if (input.length > maxLength) {
        securityUtils.logSecurityEvent('INPUT_LENGTH_EXCEEDED', { 
          inputLength: input.length, 
          maxLength 
        });
        throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
      }
      
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/data:/gi, '')
        .trim();
    },

    validateEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email.length <= 254;
    },

    validatePhoneNumber: (phone: string): boolean => {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
      return phoneRegex.test(phone.replace(/\s/g, ''));
    }
  },

  // Session security
  sessionSecurity: {
    checkSessionTimeout: async (): Promise<boolean> => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return false;
        
        const now = Math.floor(Date.now() / 1000);
        const sessionExpiry = session.expires_at || 0;
        
        // Check if session expires in next 5 minutes
        if (sessionExpiry - now < 300) {
          securityUtils.logSecurityEvent('SESSION_NEAR_EXPIRY');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('Session timeout check failed:', error);
        return false;
      }
    },

    refreshSession: async (): Promise<boolean> => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw error;
        
        securityUtils.logSecurityEvent('SESSION_REFRESHED');
        return true;
      } catch (error) {
        console.error('Session refresh failed:', error);
        securityUtils.logSecurityEvent('SESSION_REFRESH_FAILED', { error: error.message });
        return false;
      }
    }
  }
};
