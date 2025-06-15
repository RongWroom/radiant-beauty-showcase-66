
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-brand-light-gray/80 via-white to-white">
      <div className="container-custom min-h-[85vh] flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 pt-24 md:pt-0 z-10 space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-brand-charcoal">
            Skincare That Lets Your Inner Glow Shine Through
          </h1>
          <p className="text-brand-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
            At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. Our experienced and certified technicians will guide you through every step of your treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link to="/products">
              <Button className="bg-brand-slate-blue hover:bg-brand-slate-blue-light text-white text-lg py-4 px-10 shadow-lg hover:shadow-xl transition-all duration-300">
                SHOP NOW
              </Button>
            </Link>
            <Link to="/treatments">
              <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white text-lg py-4 px-10 transition-all duration-300">
                OUR SERVICES
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-16 md:mt-0 relative">
          {/* Subtle soft grey block behind logo */}
          <div className="absolute inset-4 bg-gradient-to-br from-brand-light-gray/70 to-brand-silver/30 rounded-3xl shadow-sm"></div>
          <img
            alt="STW Aesthetic Clinic logo"
            src="/lovable-uploads/247e14b1-74cd-4e99-9bea-37c3775cb36d.png"
            className="relative z-10 mx-auto h-[500px] md:h-[600px] w-full max-w-md rounded-lg object-contain p-8"
          />
        </div>
      </div>
      {/* Minimal, modern gradient overlays for depth */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brand-off-white/40 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-gradient-to-l from-brand-silver/10 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
