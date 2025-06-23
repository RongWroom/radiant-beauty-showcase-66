
import React from 'react';
import TreatmentCard from './TreatmentCard';
import { Treatment } from '@/hooks/useTreatments';

interface TreatmentsGridProps {
  treatments: Treatment[];
}

const TreatmentsGrid = ({ treatments }: TreatmentsGridProps) => {
  // Find the featured treatment
  const featuredTreatment = treatments.find(treatment => treatment.featured) || treatments[0];
  // Get the remaining treatments (excluding the featured one)
  const remainingTreatments = treatments.filter(treatment => treatment.id !== featuredTreatment?.id);

  if (!featuredTreatment) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12 md:py-14 bg-brand-light-gray">
      <div className="container-custom">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-6 sm:mb-7 text-brand-charcoal font-bold text-center">All Treatments</h2>
        
        {/* Mobile-first layout */}
        <div className="space-y-6">
          {/* Featured Treatment - Full width on mobile, left column on desktop */}
          <div className="lg:hidden">
            <TreatmentCard treatment={featuredTreatment} isFeatured={true} />
          </div>
          
          {/* Desktop layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Featured Treatment - Large Square on Left */}
            <div className="lg:col-span-1">
              <TreatmentCard treatment={featuredTreatment} isFeatured={true} />
            </div>
            
            {/* Right Column with 2x2 Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {remainingTreatments.map(treatment => (
                  <TreatmentCard key={treatment.id} treatment={treatment} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile grid for remaining treatments */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {remainingTreatments.map(treatment => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsGrid;
