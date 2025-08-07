import { useEffect } from 'react';

const CoreWebVitals = () => {
  useEffect(() => {
    // Preload critical images with priority hints
    const criticalImages = [
      '/images/hero-blossom.jpg',
      'https://images.pexels.com/photos/4022219/pexels-photo-4022219.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ];

    criticalImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.decoding = 'async';
      img.fetchPriority = index === 0 ? 'high' : 'auto';
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

    // Intelligent resource prefetching
    const preloadPages = ['/treatments', '/products', '/contact'];
    const prefetchResources = () => {
      preloadPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });

      // Preload critical API endpoints
      const apiEndpoints = [
        '/api/treatments',
        '/api/products'
      ];
      
      apiEndpoints.forEach(endpoint => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = endpoint;
        document.head.appendChild(link);
      });
    };

    // Defer prefetching until after critical resources load
    const rafId = requestAnimationFrame(() => {
      setTimeout(prefetchResources, 2000);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };

    // Performance monitoring  
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      }).catch(() => {
        // Fail silently if web-vitals is not available
      });
    }
  }, []);

  return null;
};

export default CoreWebVitals;