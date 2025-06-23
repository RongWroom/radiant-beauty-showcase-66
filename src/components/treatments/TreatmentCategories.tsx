
import React, { useState, useEffect } from 'react';
import { Droplet, Syringe, Scissors } from 'lucide-react';

const TreatmentCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const categories = [
    {
      icon: Droplet,
      title: "Facial Treatments",
      description: "Advanced facial care including HydraFacial treatments that cleanse, exfoliate, and hydrate your skin. Experience comprehensive facial treatments with cutting-edge technology for immediate and lasting results.",
      background: "bg-gradient-to-br from-brand-slate-blue via-brand-slate-blue-light to-brand-slate-blue-dark"
    },
    {
      icon: Syringe,
      title: "Anti-Ageing & Skin Tightening",
      description: "Revolutionary non-surgical treatments including Ultra 4D HIFU and Fibroblast Plasma Skin Tightening. Advanced procedures targeting fine lines, wrinkles, and sagging skin for a more youthful appearance.",
      background: "bg-gradient-to-br from-brand-slate-blue-dark via-brand-slate-blue to-brand-slate-blue-light"
    },
    {
      icon: Scissors,
      title: "Body Contouring & Hair Removal",
      description: "Innovative treatments including Cryolipolysis (Fat Freeze) for body contouring and Super Hair Removal using the latest OPT technology. Safe, effective solutions for body transformation.",
      background: "bg-gradient-to-br from-brand-slate-blue-light via-brand-slate-blue-dark to-brand-slate-blue"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % categories.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background transitions */}
      {categories.map((category, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          } ${category.background}`} 
        />
      ))}
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Category indicators */}
          <div className="flex justify-center space-x-3 mb-8">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-silver scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>

          {/* Current category content */}
          <div className="transition-all duration-1000 transform">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index} 
                  className={`transition-all duration-1000 ${
                    index === currentIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8 absolute inset-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-brand-silver/20 backdrop-blur-sm p-6 mb-6 border border-white/20">
                      <IconComponent className="w-12 h-12 text-brand-silver" />
                    </div>
                    <h3 className="font-serif text-2xl mb-6 text-white md:text-2xl">
                      {category.title}
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center space-x-4 mt-12">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + categories.length) % categories.length)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label="Previous category"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % categories.length)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label="Next category"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
