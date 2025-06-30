
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePaginatedProducts, useInvalidateProductsCache } from "@/hooks/usePaginatedProducts";
import ProductsGrid from '@/components/products/ProductsGrid';

const PAGE_SIZE = 5;

const Products = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    products,
    total,
    isLoading,
    isError,
    refetch
  } = usePaginatedProducts(page, PAGE_SIZE);
  
  const invalidateCache = useInvalidateProductsCache();
  const pageCount = Math.ceil(total / PAGE_SIZE);

  // Updated categories to match the database
  const allCategories = [
    'Cleansers', 
    'Serums', 
    'Moisturizers', 
    'Sun Protection', 
    'Eye Care', 
    'Collections', 
    'Specialty'
  ];
  const categories = ['all', ...allCategories];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  // Force refresh cache on mount to get updated image URLs
  React.useEffect(() => {
    invalidateCache();
    console.log('Cache invalidated on mount to fetch updated image URLs');
  }, [invalidateCache]);

  // Debug: Log product data when it changes
  React.useEffect(() => {
    if (products.length > 0) {
      console.log('Products loaded:', products.length);
      console.log('Sample product image URLs:', products.slice(0, 3).map(p => ({
        name: p.name,
        image_url: p.image_url
      })));
    }
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 md:py-20 animate-fade-in">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-2 font-semibold text-brand-charcoal">
                Our Products
              </h1>
              {/* Decorative Line */}
              <div className="flex justify-center mb-5">
                <span className="block h-1 w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-lg mb-6 font-medium text-brand-gray-600">
                Discover our range of <span className="px-2 py-0.5 rounded bg-brand-slate-blue/10 text-brand-slate-blue font-semibold">premium</span> skincare products, scientifically formulated 
                to deliver exceptional results for all skin types.
              </p>
            </div>
          </div>
          {/* Flowing gradient overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-silver/10 to-transparent"></div>
        </section>

        {/* Products Section */}
        <section className="py-10 sm:py-12 md:py-14 bg-brand-light-gray">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 sm:mb-5 text-brand-charcoal font-bold">All Products</h2>
              
              {/* Category Filter */}
              <div className="w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-brand-silver/30">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SEO Paragraph */}
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-base text-brand-gray-600 leading-relaxed">
                Professional skincare products designed to complement your aesthetic treatments. From gentle cleansers to advanced serums, our curated collection delivers clinical-grade results for optimal skin health.
              </p>
            </div>
            
            {isLoading && (
              <div className="space-y-6">
                <div className="xl:hidden">
                  <Skeleton className="h-[500px] w-full rounded-lg" />
                </div>
                <div className="hidden xl:grid xl:grid-cols-3 xl:gap-6">
                  <div className="xl:col-span-1">
                    <Skeleton className="h-[500px] w-full rounded-lg" />
                  </div>
                  <div className="xl:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {isError && (
              <div className="text-center">
                <div className="text-red-500 font-medium mb-4">Failed to load products. Please try again later.</div>
                <Button onClick={refetch} variant="outline">
                  Retry
                </Button>
              </div>
            )}

            {!isLoading && !isError && filteredProducts.length === 0 && (
              <div className="text-center text-brand-gray-600">
                {selectedCategory === 'all' ? 'No products have been added yet.' : `No products found in the ${selectedCategory} category.`}
              </div>
            )}

            {!isLoading && !isError && filteredProducts.length > 0 && (
              <>
                <ProductsGrid products={filteredProducts} />

                {/* Pagination Controls */}
                {pageCount > 1 && (
                  <div className="flex justify-center mt-12 space-x-1">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => setPage(page - 1)} 
                      disabled={page === 1}
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
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => setPage(page + 1)} 
                      disabled={page === pageCount}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Flowing gradient background */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-slate-blue/5 to-transparent rounded-full blur-3xl"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
