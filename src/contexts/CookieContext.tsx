import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export interface CookieConsent {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

interface CookieContextType {
  consent: CookieConsent | null;
  hasConsented: boolean;
  updateConsent: (newConsent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  isAllowed: (category: CookieCategory) => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const STORAGE_KEY = 'cookie-consent';
const CONSENT_EXPIRY_DAYS = 365; // 12 months

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};

interface CookieProviderProps {
  children: ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as CookieConsent;
        
        // Check if consent has expired (12 months)
        const expiryTime = parsed.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        const isExpired = Date.now() > expiryTime;
        
        if (!isExpired) {
          setConsent(parsed);
          setHasConsented(true);
        } else {
          // Clear expired consent
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: Date.now(),
    };
    
    setConsent(consentWithTimestamp);
    setHasConsented(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentWithTimestamp));
  };

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    saveConsent({
      essential: true, // Always true
      analytics: newConsent.analytics ?? false,
      marketing: newConsent.marketing ?? false,
      timestamp: Date.now(),
    });
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const rejectAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const isAllowed = (category: CookieCategory): boolean => {
    if (category === 'essential') return true;
    if (!consent) return false;
    return consent[category];
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        hasConsented,
        updateConsent,
        acceptAll,
        rejectAll,
        isAllowed,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
