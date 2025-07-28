import { useEffect, useRef } from 'react';
import { securityUtils } from '@/utils/securityUtils';
import { useAuth } from '@/contexts/AuthContext';

export function useSecurityMonitoring() {
  const { user } = useAuth();
  const failedLoginAttempts = useRef(0);
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    // Monitor for suspicious activity patterns
    const monitorActivity = () => {
      lastActivity.current = Date.now();
    };

    // Track user interactions
    const events = ['click', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, monitorActivity, { passive: true });
    });

    // Session timeout monitoring
    const sessionInterval = setInterval(async () => {
      if (user) {
        const isSessionValid = await securityUtils.sessionSecurity.checkSessionTimeout();
        if (!isSessionValid) {
          // Try to refresh session
          const refreshed = await securityUtils.sessionSecurity.refreshSession();
          if (!refreshed) {
            securityUtils.logSecurityEvent('SESSION_EXPIRED_AUTO_LOGOUT');
          }
        }
      }
    }, 60000); // Check every minute

    // Inactivity monitoring
    const inactivityInterval = setInterval(() => {
      if (user && Date.now() - lastActivity.current > 30 * 60 * 1000) { // 30 minutes
        securityUtils.logSecurityEvent('USER_INACTIVE', {
          inactiveMinutes: Math.floor((Date.now() - lastActivity.current) / 60000)
        });
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, monitorActivity);
      });
      clearInterval(sessionInterval);
      clearInterval(inactivityInterval);
    };
  }, [user]);

  // Track failed login attempts
  const trackFailedLogin = (email?: string) => {
    failedLoginAttempts.current++;
    securityUtils.logSecurityEvent('FAILED_LOGIN_ATTEMPT', {
      email: email ? email.substring(0, 3) + '***' : 'unknown', // Partial email for privacy
      attemptCount: failedLoginAttempts.current,
      userAgent: navigator.userAgent
    });

    // Alert on multiple failed attempts
    if (failedLoginAttempts.current >= 3) {
      securityUtils.logSecurityEvent('MULTIPLE_FAILED_LOGINS', {
        totalAttempts: failedLoginAttempts.current
      });
    }
  };

  // Reset failed attempts on successful login
  const resetFailedAttempts = () => {
    if (failedLoginAttempts.current > 0) {
      securityUtils.logSecurityEvent('LOGIN_SUCCESS_AFTER_FAILURES', {
        previousFailedAttempts: failedLoginAttempts.current
      });
    }
    failedLoginAttempts.current = 0;
  };

  return {
    trackFailedLogin,
    resetFailedAttempts,
    getFailedAttempts: () => failedLoginAttempts.current
  };
}