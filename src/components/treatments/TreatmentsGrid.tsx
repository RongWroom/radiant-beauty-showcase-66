
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
    <section className="py-14 bg-brand-light-gray">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif mb-7 text-brand-charcoal font-bold text-center">All Treatments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default TreatmentsGrid;
