
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfiniteScrollBanner from '@/components/InfiniteScrollBanner';
import { FeaturedSection, BannerSection } from '@/components/FeaturedSection';
import CustomerReviews from '@/components/CustomerReviews';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InfiniteScrollBanner />
        <FeaturedSection />
        <BannerSection />
        <CustomerReviews />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
