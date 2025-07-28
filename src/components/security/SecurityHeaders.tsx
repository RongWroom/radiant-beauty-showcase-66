import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Set Content Security Policy via meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: blob: https: http:;
      connect-src 'self' https://*.supabase.co https://api.stripe.com https://checkout.stripe.com;
      frame-src 'self' https://js.stripe.com https://checkout.stripe.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim();
    
    // Remove existing CSP meta tag if present
    const existingCsp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCsp) {
      existingCsp.remove();
    }
    
    document.head.appendChild(cspMeta);

    // Set other security headers via meta tags where possible
    const securityHeaders = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
    ];

    securityHeaders.forEach(header => {
      const existingMeta = document.querySelector(`meta[name="${header.name}"]`);
      if (existingMeta) {
        existingMeta.remove();
      }
      
      const meta = document.createElement('meta');
      meta.name = header.name;
      meta.content = header.content;
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup on unmount
      document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.remove();
      securityHeaders.forEach(header => {
        document.querySelector(`meta[name="${header.name}"]`)?.remove();
      });
    };
  }, []);

  return null;
};