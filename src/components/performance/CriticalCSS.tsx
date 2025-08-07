import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalStyles = `
      /* Critical styles for hero section */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
      }
      
      .hero-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom right, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6));
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Preload font display swap */
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDYbtXK-F2qC0s.woff2') format('woff2');
      }
    `;

    // Create and inject critical styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = criticalStyles;
    styleSheet.id = 'critical-css';
    
    // Only add if not already present
    if (!document.getElementById('critical-css')) {
      document.head.insertBefore(styleSheet, document.head.firstChild);
    }

    // Preload non-critical CSS
    const preloadCSS = () => {
      const nonCriticalStyles = [
        '/src/styles/components.css',
        '/src/styles/utilities.css'
      ];

      nonCriticalStyles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });
    };

    // Load non-critical CSS after initial render
    setTimeout(preloadCSS, 100);

    return () => {
      const criticalStyle = document.getElementById('critical-css');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSS;