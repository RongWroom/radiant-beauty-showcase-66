
import React from 'react';
import { Button } from '@/components/ui/button';

const ValuesBanner = () => {
  return (
    <section className="relative bg-skin-teal text-white">
      <div className="container-custom py-24">
        <div className="md:max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">
            Fostering Water Sustainability While Celebrating Global Beauty
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Our commitment to sustainability goes beyond skin-deep. We source ingredients responsibly,
            use eco-friendly packaging, and donate a portion of every purchase to water conservation efforts.
          </p>
          <Button className="bg-white text-skin-teal hover:bg-skin-yellow hover:text-black transition-colors">
            LEARN MORE
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-skin-teal/0 to-skin-teal md:hidden"></div>
      <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/3">
        <img 
          src="/placeholder.svg" 
          alt="Beautiful woman with flower" 
          className="h-full w-full object-cover object-center opacity-50"
        />
      </div>
    </section>
  );
};

export default ValuesBanner;
