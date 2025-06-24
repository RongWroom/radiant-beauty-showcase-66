
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray/30">
      {/* Enhanced organic background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-brand-slate-blue rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-brand-silver rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-20 h-20 sm:w-40 sm:h-40 bg-brand-slate-blue-light rounded-full blur-2xl sm:blur-3xl"></div>
      </div>
      
      {/* Flowing organic beauty background - pink blossom petals */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/lovable-uploads/72ed3b10-bdb8-421e-95eb-1645b48a2b97.png" 
          alt="" 
          className="w-full h-full object-cover mix-blend-soft-light"
        />
      </div>
      
      {/* Subtle gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
      
      <div className="container-custom min-h-[85vh] sm:min-h-[90vh] flex flex-col lg:flex-row items-center relative z-10 py-0 my-[10px]">
        <div className="w-full lg:w-1/2 pt-20 sm:pt-24 lg:pt-0 z-10 mobile-spacing-lg text-center lg:text-left">
          <div className="mobile-spacing-md">
            <h1 className="mobile-text-2xl font-serif font-medium text-brand-charcoal px-4 sm:px-0">
              Professional Aesthetic Treatments at <br />
              <span className="text-brand-slate-blue font-semibold">STW Aesthetics</span>
            </h1>
            
            {/* Decorative line */}
            <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
              <span className="block h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
            </div>
          </div>
          
          <p className="mobile-text-base text-brand-gray-600 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0 mb-8 sm:mb-10">
            Transform your skin with our{" "}
            <span className="bg-gradient-to-r from-brand-silver/40 to-brand-slate-blue/20 px-2 py-1 rounded font-medium text-brand-charcoal">
              advanced aesthetic treatments
            </span>{" "}
            including Cryolipolysis, Ultra 4D HIFU, and HydraFacial. Our certified technicians deliver exceptional results with the latest technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 sm:px-0 justify-center lg:justify-start">
            <Link to="/treatments" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white mobile-text-base font-semibold py-4 px-8 sm:px-10 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[56px] rounded-lg">
                BOOK TREATMENT
              </Button>
            </Link>
            <Link to="/products" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white mobile-text-base font-semibold py-4 px-8 sm:px-10 transition-all duration-300 min-h-[56px] rounded-lg">
                AFTERCARE PRODUCTS
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-12 sm:mt-16 lg:mt-0 relative px-4 sm:px-0">
          {/* Natural, organic logo presentation */}
          <div className="relative z-10">
            <img 
              alt="STW Aesthetic Clinic professional treatments" 
              src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png" 
              className="mx-auto h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-sm sm:max-w-md object-contain drop-shadow-lg" 
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced organic gradient overlays */}
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-brand-off-white/80 to-transparent"></div>
    </section>
  );
};

export default Hero;
