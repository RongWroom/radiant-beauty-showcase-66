
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import { FeaturedSection, BannerSection, ProductGrid } from '@/components/FeaturedSection';
import ValuesBanner from '@/components/ValuesBanner';
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
        <ProductGrid />
        <ValuesBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
