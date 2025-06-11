
import React from 'react';
import { Button } from '@/components/ui/button';

const ValuesBanner = () => {
  return (
    <section className="relative bg-brand-sage text-white">
      <div className="container-custom py-24">
        <div className="md:max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">
            Fostering Water Sustainability While Celebrating Global Beauty
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Our commitment to sustainability goes beyond skin-deep. We source ingredients responsibly,
            use eco-friendly packaging, and donate a portion of every purchase to water conservation efforts.
          </p>
          <Button className="bg-white text-brand-sage hover:bg-brand-lime hover:text-brand-neutral-900 transition-all duration-300 shadow-lg">
            LEARN MORE
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-lime/20 to-transparent md:hidden"></div>
      <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/3">
        <img 
          src="/placeholder.svg" 
          alt="Beautiful woman with flower" 
          className="h-full w-full object-cover object-center opacity-30"
        />
      </div>
    </section>
  );
};

export default ValuesBanner;
