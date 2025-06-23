import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray/50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-brand-slate-blue rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-brand-silver rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-20 h-20 sm:w-40 sm:h-40 bg-brand-slate-blue-light rounded-full blur-2xl sm:blur-3xl"></div>
      </div>
      
      <div className="container-custom min-h-[85vh] sm:min-h-[90vh] flex flex-col lg:flex-row items-center relative z-10 py-0 my-[10px]">
        <div className="w-full lg:w-1/2 pt-20 sm:pt-24 lg:pt-0 z-10 mobile-spacing-lg text-center lg:text-left">
          <div className="mobile-spacing-md">
            <h1 className="mobile-text-2xl font-serif font-medium text-brand-charcoal px-4 sm:px-0">
              Welcome to <br />
              <span className="text-brand-slate-blue font-semibold">STW Aesthetics</span>
            </h1>
            
            {/* Decorative line */}
            <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
              <span className="block h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
            </div>
          </div>
          
          <p className="mobile-text-base text-brand-gray-600 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0 mb-8 sm:mb-10">
            At STW Aesthetic Clinic, your{" "}
            <span className="bg-gradient-to-r from-brand-silver/40 to-brand-slate-blue/20 px-2 py-1 rounded font-medium text-brand-charcoal">
              safety and satisfaction
            </span>{" "}
            are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 sm:px-0 justify-center lg:justify-start">
            <Link to="/products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white mobile-text-base font-semibold py-4 px-8 sm:px-10 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[56px] rounded-lg">OUR PRODUCTS</Button>
            </Link>
            <Link to="/treatments" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white mobile-text-base font-semibold py-4 px-8 sm:px-10 transition-all duration-300 min-h-[56px] rounded-lg">
                OUR SERVICES
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-12 sm:mt-16 lg:mt-0 relative px-4 sm:px-0">
          {/* Enhanced background styling for image */}
          <div className="absolute inset-2 sm:inset-4 bg-gradient-to-br from-brand-light-gray/70 to-brand-silver/30 rounded-2xl sm:rounded-3xl shadow-lg"></div>
          <div className="absolute inset-1 sm:inset-2 bg-gradient-to-tr from-brand-slate-blue/5 to-transparent sm:rounded-3xl rounded-lg mx-0 py-0 my-0"></div>
          <img alt="STW Aesthetic Clinic logo" src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" className="relative z-10 mx-auto h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-sm sm:max-w-md rounded-lg p-6 sm:p-10 lg:p-12 object-contain" />
        </div>
      </div>
      
      {/* Enhanced gradient overlays */}
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-brand-off-white/60 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-gradient-to-l from-brand-silver/15 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-1/6 h-1/6 bg-gradient-to-r from-brand-slate-blue/10 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
    </section>;
};
export default Hero;