import React from 'react';
import { Link } from 'react-router-dom';
import { treatments } from '../utils/data';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Grid3X3, PackageCheck } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [...new Set(treatments.map(item => item.category))].slice(0, 3);

// Get a few more treatments for the bento box
const bentoTreatments = treatments.slice(3, 6);

const ProductShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-white to-brand-off-white section">
      <div className="container-custom relative z-10">
        <div className="text-center mobile-spacing-lg">
          <h2 className="mobile-text-2xl font-serif font-semibold text-brand-charcoal">Featured Treatments</h2>
          <p className="text-brand-gray-600 max-w-2xl mx-auto mobile-text-base">
            Experience our most popular treatments designed to rejuvenate and transform your skin
          </p>
          <div className="mt-8">
            <Link to="/treatments">
              <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white transition-all duration-300 py-4 px-8 min-h-[56px] rounded-lg font-semibold">
                View All Treatments
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Box Section */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mobile-text-xl font-serif font-semibold text-center text-brand-charcoal mb-8 sm:mb-12">
            Explore Our Special Treatments
          </h3>
          
          {/* Desktop Layout - Keep existing grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature Card */}
            <Card className="md:col-span-2 bg-gradient-to-br from-brand-silver/20 to-brand-slate-blue/10 card-clean border-brand-silver/40 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="rounded-full bg-brand-slate-blue p-4 shadow-lg">
                    <PackageCheck className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h4 className="mobile-text-lg font-semibold mb-3 text-brand-charcoal">Personalized Solutions</h4>
                    <p className="text-brand-gray-600 mb-6 mobile-text-sm">
                      Our treatments are tailored to your unique skin needs and goals. 
                      Experience personalized care that delivers real results.
                    </p>
                    <Link to="/treatments" className="inline-flex items-center mobile-text-sm font-semibold text-brand-slate-blue hover:text-brand-slate-blue-light transition-colors hover:underline">
                      Learn more about our approach
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Treatment Card */}
            <Card className="card-product overflow-hidden border-brand-silver/40 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 sm:h-56">
                <img src="https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Cryo%202.jpeg" alt="Featured treatment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-brand-slate-blue text-white font-semibold px-4 py-2 rounded-full shadow-lg text-sm">
                    Most Popular
                  </span>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6 bg-white">
                <h4 className="font-semibold text-brand-charcoal mobile-text-base">{bentoTreatments[0]?.name || "Chemical Peel"}</h4>
                <p className="mobile-text-sm text-brand-gray-600 line-clamp-2 mt-2">
                  {bentoTreatments[0]?.description || "Reveal fresh, new skin with our clinical-grade chemical peels"}
                </p>
              </CardContent>
            </Card>
            
            {/* Quick Links Card */}
            <Card className="bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 card-clean border-brand-silver/40 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <h4 className="font-semibold mb-6 text-brand-charcoal mobile-text-base">Quick Navigation</h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/treatments" className="flex items-center mobile-text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                      <Package className="mr-3 h-5 w-5" />
                      <span>Facial Treatments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/treatments" className="flex items-center mobile-text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                      <Grid3X3 className="mr-3 h-5 w-5" />
                      <span>Anti-Aging Solutions</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/treatments" className="flex items-center mobile-text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                      <Package className="mr-3 h-5 w-5" />
                      <span>Skin Rejuvenation</span>
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Treatment Cards */}
            {bentoTreatments.slice(1).map((treatment, index) => (
              <Card key={index} className="card-product overflow-hidden border-brand-silver/40 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 sm:h-56">
                  <img src={treatment.image || "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/stw_greeting.jpeg"} alt={treatment.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4 sm:p-6 bg-white">
                  <h4 className="font-semibold text-brand-charcoal mobile-text-base">{treatment.name}</h4>
                  <p className="mobile-text-sm text-brand-gray-600 line-clamp-2 mt-2">
                    {treatment.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="mobile-text-sm font-semibold text-brand-charcoal">{treatment.price}</span>
                    <Link to="/treatments" className="text-brand-slate-blue mobile-text-sm hover:text-brand-slate-blue-light hover:underline transition-colors font-medium">View details</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile and Tablet Layout - Horizontal Scroll */}
          <div className="lg:hidden">
            {/* Feature Card - Full width on mobile/tablet */}
            <Card className="mb-8 bg-gradient-to-br from-brand-silver/20 to-brand-slate-blue/10 card-clean border-brand-silver/40 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="rounded-full bg-brand-slate-blue p-4 shadow-lg">
                    <PackageCheck className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 text-brand-charcoal">Personalized Solutions</h4>
                    <p className="text-brand-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      Our treatments are tailored to your unique skin needs and goals. 
                      Experience personalized care that delivers real results.
                    </p>
                    <Link to="/treatments" className="inline-flex items-center text-sm sm:text-base font-semibold text-brand-slate-blue hover:text-brand-slate-blue-light transition-colors hover:underline">
                      Learn more about our approach
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horizontal Scroll for Treatment Cards */}
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 md:space-x-6 p-1">
                {/* Featured Treatment Card */}
                <Card className="w-[280px] md:w-[320px] flex-shrink-0 card-product overflow-hidden border-brand-silver/40 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full">
                    <img 
                      src="https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Cryo%202.jpeg" 
                      alt="Featured treatment" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="bg-brand-slate-blue text-white font-semibold px-3 py-1.5 rounded-full shadow-lg text-xs sm:text-sm">
                        Most Popular
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-white flex flex-col h-[140px]">
                    <h4 className="font-semibold text-brand-charcoal text-sm sm:text-base mb-2">{bentoTreatments[0]?.name || "Chemical Peel"}</h4>
                    <p className="text-xs sm:text-sm text-brand-gray-600 line-clamp-2 flex-grow">
                      {bentoTreatments[0]?.description || "Reveal fresh, new skin with our clinical-grade chemical peels"}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-charcoal">{bentoTreatments[0]?.price || "£120"}</span>
                      <Link to="/treatments" className="text-brand-slate-blue text-xs sm:text-sm hover:text-brand-slate-blue-light hover:underline transition-colors font-medium">View details</Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links Card */}
                <Card className="w-[280px] md:w-[320px] flex-shrink-0 bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 card-clean border-brand-silver/40 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h4 className="font-semibold mb-4 text-brand-charcoal text-sm sm:text-base">Quick Navigation</h4>
                    <ul className="space-y-3 flex-grow">
                      <li>
                        <Link to="/treatments" className="flex items-center text-xs sm:text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                          <Package className="mr-2 h-4 w-4" />
                          <span>Facial Treatments</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/treatments" className="flex items-center text-xs sm:text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                          <Grid3X3 className="mr-2 h-4 w-4" />
                          <span>Anti-Aging Solutions</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/treatments" className="flex items-center text-xs sm:text-sm text-brand-gray-600 hover:text-brand-slate-blue transition-colors">
                          <Package className="mr-2 h-4 w-4" />
                          <span>Skin Rejuvenation</span>
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Additional Treatment Cards */}
                {bentoTreatments.slice(1).map((treatment, index) => (
                  <Card key={index} className="w-[280px] md:w-[320px] flex-shrink-0 card-product overflow-hidden border-brand-silver/40 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[16/9] w-full">
                      <img 
                        src={treatment.image || "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/stw_greeting.jpeg"} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4 bg-white flex flex-col h-[140px]">
                      <h4 className="font-semibold text-brand-charcoal text-sm sm:text-base mb-2">{treatment.name}</h4>
                      <p className="text-xs sm:text-sm text-brand-gray-600 line-clamp-2 flex-grow">
                        {treatment.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-brand-charcoal">{treatment.price}</span>
                        <Link to="/treatments" className="text-brand-slate-blue text-xs sm:text-sm hover:text-brand-slate-blue-light hover:underline transition-colors font-medium">View details</Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
      
      {/* Enhanced flowing gradient background */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-brand-slate-blue/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-brand-silver/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-gradient-to-b from-brand-slate-blue/5 to-transparent rounded-full blur-xl"></div>
    </section>
  );
};

export default ProductShowcase;
