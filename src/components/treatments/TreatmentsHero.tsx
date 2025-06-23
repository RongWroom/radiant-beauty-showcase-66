import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';
const TreatmentsHero = () => {
  return <section className="bg-brand-white py-12 md:py-20 animate-fade-in">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif mb-2 font-semibold text-brand-charcoal">Our Beauty Treatments</h1>
          {/* Decorative Silver Line */}
          <div className="flex justify-center mb-5">
            <span className="block h-1 w-24 rounded-full bg-brand-silver"></span>
          </div>
          <p className="text-lg mb-6 font-medium text-brand-charcoal">
            Discover our range of <span className="px-2 py-0.5 rounded bg-brand-silver/60 text-brand-charcoal font-semibold">professional</span> treatments tailored to your unique skin needs.
            Each treatment is performed by our expert aestheticians using premium products.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact">
              <Button variant="default">
                <Calendar className="mr-2 h-4 w-4" />
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default TreatmentsHero;