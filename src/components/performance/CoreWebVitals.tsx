import { useEffect } from 'react';

const CoreWebVitals = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/hero-blossom.jpg',
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Lazy load non-critical resources
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Load after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', lazyLoadImages);
    } else {
      lazyLoadImages();
    }

    // Preload important pages
    const preloadPages = ['/treatments', '/products', '/contact'];
    preloadPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });

    // Performance monitoring
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }, []);

  return null;
};

export default CoreWebVitals;