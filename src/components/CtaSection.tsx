
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-brand-plum py-20">
      <div className="container-custom text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-6">
          Ready to Transform Your Skin?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Book your consultation today and discover personalized treatments designed to help you achieve your best skin yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button 
              className="bg-brand-rose-gold text-brand-charcoal hover:bg-brand-rose-gold-light text-lg px-8 py-4"
            >
              Book Consultation
            </Button>
          </Link>
          <Link to="/treatments">
            <Button 
              className="bg-white text-brand-plum hover:bg-brand-champagne text-lg px-8 py-4"
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
