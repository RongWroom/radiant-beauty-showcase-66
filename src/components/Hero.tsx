
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="container-custom min-h-[85vh] flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 pt-24 md:pt-0 z-10 space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-hierarchy-primary">
            Skincare That Lets Your Inner Glow Shine Through
          </h1>
          <p className="text-hierarchy-secondary text-lg md:text-xl leading-relaxed max-w-lg">
            At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button className="btn-primary text-lg py-4 px-10 shadow-lg">SHOP NOW</Button>
            <Button className="btn-secondary text-lg py-4 px-10">OUR SERVICES</Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-16 md:mt-0 relative">
          <div className="absolute top-8 right-8 bottom-8 left-1/4 bg-brand-cream rounded-2xl opacity-60"></div>
          <img 
            src="/placeholder.svg" 
            alt="Woman with glowing skin"
            className="relative z-10 ml-auto h-[500px] md:h-[600px] w-full max-w-md object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-brand-neutral-100/30"></div>
    </section>
  );
};

export default Hero;
