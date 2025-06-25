
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TreatmentsHero from '@/components/treatments/TreatmentsHero';
import TreatmentCategories from '@/components/treatments/TreatmentCategories';
import TreatmentsGrid from '@/components/treatments/TreatmentsGrid';
import BookingCta from '@/components/treatments/BookingCta';
import { useTreatments } from '@/hooks/useTreatments';
import { Loader2 } from 'lucide-react';

const Treatments = () => {
  const { data: treatments, isLoading, isError } = useTreatments();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !treatments) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Error loading treatments</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <TreatmentsHero />
        <TreatmentsGrid treatments={treatments} />
        <TreatmentCategories />
        <BookingCta />
      </main>
      <Footer />
    </div>
  );
};

export default Treatments;
