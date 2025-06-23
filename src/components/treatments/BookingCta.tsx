
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const BookingCta = () => {
  return (
    <section className="py-12 bg-brand-off-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-3 font-semibold text-brand-charcoal">Ready to Book Your Treatment?</h2>
          <p className="mb-6 text-brand-charcoal">Schedule your appointment today and take the first step towards healthier, more radiant skin.</p>
          <Link to="/contact">
            <Button variant="default">Book Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookingCta;
