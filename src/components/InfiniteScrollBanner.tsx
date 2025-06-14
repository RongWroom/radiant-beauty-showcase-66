
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
    <div className="bg-brand-sage overflow-hidden py-4 border-y border-brand-sage-dark/20">
      <div className="flex animate-scroll-left whitespace-nowrap" style={{ minWidth: "200%" }}>
        {duplicatedKeywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center text-white font-medium text-lg mx-8 opacity-90"
          >
            {keyword}
            <span className="mx-8 text-brand-lime">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollBanner;
