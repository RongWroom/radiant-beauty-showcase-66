
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray/50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-slate-blue rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-brand-silver rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-brand-slate-blue-light rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom min-h-[85vh] flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 pt-24 md:pt-0 z-10 space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-brand-charcoal">
              Welcome to <br />
              <span className="text-brand-slate-blue font-semibold">STW Aesthetics</span>
            </h1>
            
            {/* Decorative line like in about page */}
            <div className="flex mb-6">
              <span className="block h-1 w-20 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl leading-relaxed text-brand-gray-600 max-w-lg">
            At STW Aesthetic Clinic, your{" "}
            <span className="bg-gradient-to-r from-brand-silver/40 to-brand-slate-blue/20 px-2 py-0.5 rounded font-medium text-brand-charcoal">
              safety and satisfaction
            </span>{" "}
            are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link to="/products">
              <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-lg py-4 px-10 shadow-lg hover:shadow-xl transition-all duration-300">
                SHOP NOW
              </Button>
            </Link>
            <Link to="/treatments">
              <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white text-lg py-4 px-10 transition-all duration-300">
                OUR SERVICES
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-16 md:mt-0 relative">
          {/* Enhanced background styling for image */}
          <div className="absolute inset-4 bg-gradient-to-br from-brand-light-gray/70 to-brand-silver/30 rounded-3xl shadow-lg"></div>
          <div className="absolute inset-2 bg-gradient-to-tr from-brand-slate-blue/5 to-transparent rounded-3xl"></div>
          <img 
            alt="STW Aesthetic Clinic logo" 
            src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" 
            className="relative z-10 mx-auto h-[500px] md:h-[600px] w-full max-w-md rounded-lg object-contain p-8" 
          />
        </div>
      </div>
      
      {/* Enhanced gradient overlays */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brand-off-white/60 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-gradient-to-l from-brand-silver/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-1/6 h-1/6 bg-gradient-to-r from-brand-slate-blue/10 to-transparent rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;
