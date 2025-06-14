
import React from 'react';

const InfiniteScrollBanner = () => {
  const keywords = [
    "Professional Skincare",
    "Aesthetic Treatments",
    "Glowing Skin",
    "Anti-Aging",
    "Facial Rejuvenation",
    "Hydration Therapy",
    "Skin Analysis",
    "Certified Technicians",
    "Premium Products",
    "Personalized Care",
    "Natural Glow",
    "Advanced Technology"
  ];

  // Duplicate several times to ensure a seamless infinite scroll
  const duplicatedKeywords = [...keywords, ...keywords, ...keywords];

  return (
    <div className="bg-gradient-to-r from-brand-slate-blue via-brand-slate-blue-light to-brand-slate-blue overflow-hidden py-4 border-y border-brand-slate-blue/20 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-slate-blue/95 to-transparent"></div>
      <div className="flex animate-scroll-left whitespace-nowrap relative z-10" style={{ minWidth: "200%" }}>
        {duplicatedKeywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center text-white font-medium text-lg mx-8 opacity-95 hover:opacity-100 transition-opacity"
          >
            {keyword}
            <span className="mx-8 text-brand-silver/80">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollBanner;
