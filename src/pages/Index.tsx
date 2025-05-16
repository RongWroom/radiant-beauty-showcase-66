
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import { FeaturedSection, BannerSection } from '@/components/FeaturedSection';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <FeaturedSection />
        <BannerSection />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
