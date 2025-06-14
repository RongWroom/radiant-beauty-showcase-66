
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { FeaturedSection, BannerSection } from '@/components/FeaturedSection';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedSection />
        <BannerSection />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
