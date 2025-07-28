import React, { ReactNode } from 'react';
import { securityUtils } from '@/utils/securityUtils';

interface SecureFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  rateLimitKey?: string;
  maxAttempts?: number;
  windowMs?: number;
  className?: string;
}

export const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  rateLimitKey,
  maxAttempts = 5,
  windowMs = 60000,
  className = ''
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check if key provided
    if (rateLimitKey) {
      const isAllowed = await securityUtils.rateLimiter.checkRateLimit(
        rateLimitKey,
        maxAttempts,
        windowMs
      );
      
      if (!isAllowed) {
        securityUtils.logSecurityEvent('FORM_RATE_LIMITED', { 
          form: rateLimitKey,
          userAgent: navigator.userAgent 
        });
        throw new Error('Too many attempts. Please try again later.');
      }
    }
    
    // Log form submission
    securityUtils.logSecurityEvent('FORM_SUBMISSION', {
      form: rateLimitKey || 'unknown',
      timestamp: new Date().toISOString()
    });
    
    onSubmit(e);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
      autoComplete="off"
      noValidate
    >
      {children}
    </form>
  );
};