
import React from 'react';
import { Button } from '@/components/ui/button';

const ValuesBanner = () => {
  return (
    <section className="relative bg-brand-plum text-white overflow-hidden">
      <div className="container-custom py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-white">
              Fostering Water Sustainability While Celebrating Global Beauty
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Our commitment to sustainability goes beyond skin-deep. We source ingredients responsibly,
              use eco-friendly packaging, and donate a portion of every purchase to water conservation efforts.
            </p>
            <Button className="bg-brand-rose-gold text-brand-charcoal hover:bg-brand-rose-gold-light transition-all duration-300 shadow-lg px-10 py-4 text-lg font-medium">
              LEARN MORE
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-rose-gold/10 rounded-3xl"></div>
            <img 
              src="/placeholder.svg" 
              alt="Beautiful woman with flower" 
              className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg opacity-80"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-brand-rose-gold/10 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ValuesBanner;
