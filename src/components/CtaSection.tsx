
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-brand-slate-blue py-16 sm:py-20">
      <div className="container-custom text-center mobile-spacing-lg">
        <h2 className="font-serif mobile-text-2xl font-semibold text-white">
          Ready to Transform Your Skin?
        </h2>
        <p className="mobile-text-base text-white/90 max-w-2xl mx-auto">
          Book your consultation today and discover personalized treatments designed to help you achieve your best skin yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link to="/contact" className="w-full sm:w-auto">
            <Button 
              variant="accent"
              className="w-full sm:w-auto mobile-text-base px-8 py-4 font-semibold min-h-[56px] rounded-lg"
            >
              Book Consultation
            </Button>
          </Link>
          <Link to="/treatments" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto bg-white text-brand-slate-blue mobile-text-base px-8 py-4 font-semibold min-h-[56px] rounded-lg"
              variant="secondary"
            >
              View Treatments
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
