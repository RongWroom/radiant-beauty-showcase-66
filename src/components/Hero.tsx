
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="container-custom min-h-[80vh] flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 pt-20 md:pt-0 z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight">
            Skincare That Let's Your Inner Glow Shine Through
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg">
            At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary px-8 py-3">SHOP NOW</Button>
            <Button variant="outline" className="px-8 py-3">OUR SERVICES</Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="bg-skin-lightgreen absolute top-0 right-0 bottom-0 left-1/4 rounded-l-full -z-10"></div>
          <img 
            src="/placeholder.svg" 
            alt="Woman with glowing skin"
            className="relative z-10 ml-auto h-full object-cover"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-skin-lightgreen/20"></div>
    </section>
  );
};

export default Hero;
