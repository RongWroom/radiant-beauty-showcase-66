import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import TreatmentsHero from '@/components/treatments/TreatmentsHero';
import TreatmentsGrid from '@/components/treatments/TreatmentsGrid';
import TreatmentCategories from '@/components/treatments/TreatmentCategories';
import BookingCta from '@/components/treatments/BookingCta';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePaginatedTreatments, useInvalidateTreatmentsCache } from '@/hooks/usePaginatedTreatments';
import { useTreatmentCategories } from '@/hooks/useTreatmentCategories';

const PAGE_SIZE = 5;

const Treatments = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    treatments,
    total,
    isLoading,
    isError,
    refetch
  } = usePaginatedTreatments(page, PAGE_SIZE, selectedCategory);
  
  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useTreatmentCategories();
  
  const invalidateCache = useInvalidateTreatmentsCache();
  const pageCount = Math.ceil(total / PAGE_SIZE);

  // Create the full categories list with 'all' option
  const allCategories = ['all', ...categories];

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // Force refresh cache on mount
  React.useEffect(() => {
    invalidateCache();
  }, [invalidateCache]);

  return (
    <>
      <SEO
        title="Professional Aesthetic Treatments | STW Aesthetic Clinic"
        description="Discover our range of professional aesthetic treatments including anti-aging, skin rejuvenation, and body contouring. Expert practitioners using advanced technology for exceptional results."
        keywords="aesthetic treatments, anti-aging, skin rejuvenation, body contouring, professional skincare treatments, aesthetic clinic"
        url="https://www.stwaestheticclinic.co.uk/treatments"
      />
      <LocalBusinessSchema />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <TreatmentsHero />
          
          {/* Category Filter Section */}
          <section className="py-6 bg-brand-off-white">
            <div className="container-custom">
              <div className="flex justify-center px-4">
                <div className="w-full sm:w-auto sm:min-w-[280px]">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={categoriesLoading}>
                    <SelectTrigger className="border-2 border-brand-gray-200 hover:border-brand-silver focus:ring-2 focus:ring-brand-slate-blue min-h-[48px] bg-white">
                      <SelectValue placeholder={categoriesLoading ? "Loading..." : "All Categories"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-brand-silver shadow-lg z-50">
                      {allCategories.map(category => (
                        <SelectItem key={category} value={category} className="hover:bg-brand-slate-blue/10">
                          {category === 'all' ? 'All Treatments' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Loading State */}
          {isLoading && (
            <section className="py-10 sm:py-12 md:py-14 bg-brand-light-gray">
              <div className="container-custom">
                <div className="space-y-8 sm:space-y-10 px-4">
                  <div className="xl:hidden">
                    <Skeleton className="h-[500px] w-full rounded-lg" />
                  </div>
                  <div className="hidden xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="xl:col-span-1">
                      <Skeleton className="h-[500px] w-full rounded-lg" />
                    </div>
                    <div className="xl:col-span-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {[...Array(4)].map((_, i) => (
                          <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Error State */}
          {isError && (
            <section className="py-12 bg-brand-light-gray">
              <div className="container-custom">
                <div className="text-center px-4">
                  <p className="text-red-500 mb-4 font-medium">Failed to load treatments. Please try again.</p>
                  <Button onClick={() => refetch()} className="min-h-[48px]">Retry</Button>
                </div>
              </div>
            </section>
          )}

          {/* Empty State */}
          {!isLoading && !isError && treatments.length === 0 && (
            <section className="py-12 bg-brand-light-gray">
              <div className="container-custom">
                <div className="text-center text-brand-gray-600 px-4">
                  {selectedCategory === 'all' 
                    ? 'No treatments have been added yet.' 
                    : `No treatments found in the ${selectedCategory} category.`}
                </div>
              </div>
            </section>
          )}

          {/* Treatments Grid */}
          {!isLoading && !isError && treatments.length > 0 && (
            <>
              <TreatmentsGrid treatments={treatments} />

              {/* Pagination Controls */}
              {pageCount > 1 && (
                <section className="py-8 bg-brand-light-gray">
                  <div className="container-custom">
                    <div className="flex justify-center items-center flex-wrap gap-2 px-4">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => setPage(page - 1)} 
                        disabled={page === 1}
                        className="min-h-[48px]"
                      >
                        Prev
                      </Button>
                      {[...Array(pageCount)].map((_, i) => (
                        <Button 
                          key={i} 
                          size="sm" 
                          variant={page === i + 1 ? "default" : "ghost"} 
                          onClick={() => setPage(i + 1)} 
                          aria-current={page === i + 1}
                          className="min-h-[48px]"
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => setPage(page + 1)} 
                        disabled={page === pageCount}
                        className="min-h-[48px]"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          <TreatmentCategories />
          <BookingCta />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Treatments;
