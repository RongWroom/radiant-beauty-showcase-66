
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray/50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-brand-slate-blue rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-brand-silver rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-20 h-20 sm:w-40 sm:h-40 bg-brand-slate-blue-light rounded-full blur-2xl sm:blur-3xl"></div>
      </div>
      
      <div className="container-custom min-h-[80vh] sm:min-h-[85vh] flex flex-col lg:flex-row items-center relative z-10">
        <div className="w-full lg:w-1/2 pt-16 sm:pt-20 lg:pt-0 z-10 space-y-6 sm:space-y-8 text-center lg:text-left">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-tight text-brand-charcoal px-4 sm:px-0">
              Welcome to <br />
              <span className="text-brand-slate-blue font-semibold">STW Aesthetics</span>
            </h1>
            
            {/* Decorative line like in about page */}
            <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
              <span className="block h-0.5 sm:h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-brand-gray-600 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
            At STW Aesthetic Clinic, your{" "}
            <span className="bg-gradient-to-r from-brand-silver/40 to-brand-slate-blue/20 px-2 py-0.5 rounded font-medium text-brand-charcoal">
              safety and satisfaction
            </span>{" "}
            are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 px-4 sm:px-0 justify-center lg:justify-start">
            <Link to="/products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]">
                SHOP NOW
              </Button>
            </Link>
            <Link to="/treatments" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 transition-all duration-300 min-h-[48px]">
                OUR SERVICES
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 relative px-4 sm:px-0">
          {/* Enhanced background styling for image */}
          <div className="absolute inset-2 sm:inset-4 bg-gradient-to-br from-brand-light-gray/70 to-brand-silver/30 rounded-2xl sm:rounded-3xl shadow-lg"></div>
          <div className="absolute inset-1 sm:inset-2 bg-gradient-to-tr from-brand-slate-blue/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
          <img 
            alt="STW Aesthetic Clinic logo" 
            src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" 
            className="relative z-10 mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-sm sm:max-w-md rounded-lg object-contain p-4 sm:p-6 lg:p-8" 
          />
        </div>
      </div>
      
      {/* Enhanced gradient overlays */}
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-brand-off-white/60 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-gradient-to-l from-brand-silver/15 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-1/6 h-1/6 bg-gradient-to-r from-brand-slate-blue/10 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
    </section>
  );
};

export default Hero;
