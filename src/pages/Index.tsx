
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-white via-brand-off-white to-brand-light-gray">
      <Navbar />
      <main className="flex-grow relative">
        {/* Background flowing gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-brand-slate-blue/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-brand-silver/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-gradient-to-l from-brand-slate-blue/3 to-transparent rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10">
          <Hero />
          <InfiniteScrollBanner />
          <FeaturedSection />
          <BannerSection />
          <CustomerReviews />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
