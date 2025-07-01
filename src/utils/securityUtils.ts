
import { supabase } from '@/integrations/supabase/client';

export const securityUtils = {
  // Log security events
  logSecurityEvent: async (action: string, details?: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log(`[SECURITY EVENT] ${action}`, {
        user_id: user?.id,
        timestamp: new Date().toISOString(),
        details
      });
      
      // In a production environment, you might want to send this to a logging service
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

  // Rate limiting helper (basic client-side implementation)
  rateLimiter: {
    attempts: new Map<string, { count: number; lastAttempt: number }>(),
    
    checkRateLimit: (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
      const now = Date.now();
      const attempts = securityUtils.rateLimiter.attempts.get(key);
      
      if (!attempts || now - attempts.lastAttempt > windowMs) {
        securityUtils.rateLimiter.attempts.set(key, { count: 1, lastAttempt: now });
        return true;
      }
      
      if (attempts.count >= maxAttempts) {
        securityUtils.logSecurityEvent('RATE_LIMIT_EXCEEDED', { key, attempts: attempts.count });
        return false;
      }
      
      attempts.count++;
      attempts.lastAttempt = now;
      return true;
    }
  }
};
