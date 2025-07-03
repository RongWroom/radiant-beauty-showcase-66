
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfiniteScrollBanner from '@/components/InfiniteScrollBanner';
import { FeaturedSection, BannerSection } from '@/components/FeaturedSection';
import CustomerReviews from '@/components/CustomerReviews';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO 
        title="STW Aesthetic Clinic - Advanced Non-Surgical Treatments | UK"
        description="Transform your skin with professional aesthetic treatments: Cryolipolysis fat freezing, Ultra 4D HIFU, HydraFacial & laser hair removal. Expert technicians, proven results. Book consultation today."
        keywords="aesthetic treatments, cryolipolysis, HIFU, hydrafacial, laser hair removal, fibroblast skin tightening, professional beauty clinic, non-surgical treatments, advanced skincare, STW Aesthetic Clinic"
        url="https://www.stwaestheticclinic.co.uk"
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <InfiniteScrollBanner />
          <FeaturedSection />
          <BannerSection />
          <CtaSection />
          <CustomerReviews />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
