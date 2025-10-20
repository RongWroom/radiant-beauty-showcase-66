import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SEOBreadcrumb from '@/components/SEOBreadcrumb';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePaginatedProducts, useInvalidateProductsCache } from "@/hooks/usePaginatedProducts";
import { useProductCategories } from "@/hooks/useProductCategories";
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
  } = usePaginatedProducts(page, PAGE_SIZE, selectedCategory);
  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useProductCategories();
  const invalidateCache = useInvalidateProductsCache();
  const pageCount = Math.ceil(total / PAGE_SIZE);

  // Create the full categories list with 'all' option
  const allCategories = ['all', ...categories];

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

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
  return <>
      <SEO title="Premium Beauty Products | STW Aesthetic Clinic" description="Shop our curated collection of professional-grade beauty products designed to enhance your skincare routine. High-quality products from trusted brands to complement our aesthetic treatments." keywords="beauty products, skincare, professional skincare, beauty shop, aesthetic products, premium cosmetics" url="https://www.stwaestheticclinic.co.uk/products" />
      <LocalBusinessSchema />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 sm:py-16 md:py-20 animate-fade-in">
            <div className="container-custom relative z-10">
              
              <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 font-semibold text-brand-charcoal">
                  Our Products
                </h1>
              {/* Decorative Line */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <span className="block h-0.5 sm:h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-medium text-brand-gray-600 leading-relaxed">
                Discover our range of <span className="px-2 py-0.5 rounded bg-brand-slate-blue/10 text-brand-slate-blue font-semibold">premium</span> skincare products, scientifically formulated 
                to deliver exceptional results for all skin types.
              </p>
            </div>
          </div>
          {/* Flowing gradient overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-silver/10 to-transparent"></div>
        </section>

        {/* Products Section */}
    <section className="py-12 sm:py-16 md:py-20 bg-brand-light-gray">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal font-bold">All Products</h2>
                
          {/* Category Filter */}
          <div className="w-full sm:w-auto sm:min-w-[220px]">
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={categoriesLoading}>
              <SelectTrigger className="border-2 border-brand-gray-200 hover:border-brand-silver focus:ring-2 focus:ring-brand-slate-blue min-h-[48px]">
                <SelectValue placeholder={categoriesLoading ? "Loading..." : "All Categories"} />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map(category => <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* SEO Paragraph */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 px-4 sm:px-0">
          <p className="text-base sm:text-lg text-brand-gray-600 leading-relaxed">
            Professional skincare products designed to complement your aesthetic treatments. From gentle cleansers to advanced serums, our curated collection delivers clinical-grade results for optimal skin health.
          </p>
        </div>
            
        {isLoading && <div className="space-y-8 sm:space-y-10 px-4 sm:px-0">
            <div className="xl:hidden">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
            <div className="hidden xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="xl:col-span-1">
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[300px] w-full rounded-lg" />)}
                </div>
              </div>
            </div>
            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[300px] w-full rounded-lg" />)}
            </div>
          </div>}

        {isError && <div className="text-center px-4">
            <div className="text-red-500 font-medium mb-4">Failed to load products. Please try again later.</div>
            <Button onClick={refetch} variant="outline" className="min-h-[48px]">
              Retry
            </Button>
          </div>}

        {!isLoading && !isError && products.length === 0 && <div className="text-center text-brand-gray-600 px-4">
            {selectedCategory === 'all' ? 'No products have been added yet.' : `No products found in the ${selectedCategory} category.`}
          </div>}

        {!isLoading && !isError && products.length > 0 && <>
            <ProductsGrid products={products} />

            {/* Pagination Controls */}
            {pageCount > 1 && <div className="flex justify-center items-center flex-wrap mt-12 gap-2 px-4 sm:px-0">
                <Button size="sm" variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1} className="min-h-[48px]">
                  Prev
                </Button>
                {[...Array(pageCount)].map((_, i) => <Button key={i} size="sm" variant={page === i + 1 ? "default" : "ghost"} onClick={() => setPage(i + 1)} aria-current={page === i + 1} className="min-h-[48px]">
                    {i + 1}
                  </Button>)}
                <Button size="sm" variant="secondary" onClick={() => setPage(page + 1)} disabled={page === pageCount} className="min-h-[48px]">
                  Next
                </Button>
              </div>}
          </>}
      </div>
    </section>
      </main>
      <Footer />
    </div>
    </>;
};
export default Products;