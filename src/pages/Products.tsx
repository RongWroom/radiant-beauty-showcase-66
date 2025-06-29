import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePaginatedProducts, useInvalidateProductsCache } from "@/hooks/usePaginatedProducts";
import { useToast } from "@/components/ui/use-toast";
const PAGE_SIZE = 5; // Reduced from 6 to 5 to show 4 in right column + 1 featured

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
  const {
    toast
  } = useToast();
  const pageCount = Math.ceil(total / PAGE_SIZE);

  // Complete list of categories
  const allCategories = ['Cleansers', 'Serums', 'Moisturizers', 'Sun Protection', 'Eye Care', 'Collections', 'Specialty', 'Skincare'];
  const categories = ['all', ...allCategories];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

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

  // On each page, feature the first product with 'featured', if none, pick first.
  const featuredProduct = filteredProducts.find(p => p.featured) || filteredProducts[0] || null;
  const remainingProducts = filteredProducts.filter(p => p.id !== featuredProduct?.id).slice(0, 4); // Limit to 4 products

  const handleImageError = (imageUrl: string | null, productName: string) => {
    console.error(`Image failed to load for ${productName}:`, imageUrl);
    console.log('Attempting to access URL:', imageUrl);
  };
  const handleImageLoad = (imageUrl: string | null, productName: string) => {
    console.log(`Image loaded successfully for ${productName}:`, imageUrl);
  };
  return <div className="min-h-screen flex flex-col">
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

        {/* Products Grid */}
        <section className="py-16 bg-gradient-to-b from-brand-white to-brand-off-white relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal">All Products</h2>
              
              {/* Category Filter */}
              <div className="w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-brand-silver/30">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Skeleton className="h-[500px] w-full rounded-lg" />
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[240px] w-full rounded-lg" />)}
                  </div>
                </div>
              </div>}

            {isError && <div className="text-center">
                <div className="text-red-500 font-medium mb-4">Failed to load products. Please try again later.</div>
                <Button onClick={refetch} variant="outline">
                  Retry
                </Button>
              </div>}

            {!isLoading && !isError && filteredProducts.length === 0 && <div className="text-center text-brand-gray-600">
                {selectedCategory === 'all' ? 'No products have been added yet.' : `No products found in the ${selectedCategory} category.`}
              </div>}

            {!isLoading && !isError && filteredProducts.length > 0 && <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Featured Product - Takes up left column, same height as 2 normal cards */}
                  {featuredProduct && <div className="lg:col-span-1">
                      <Card className="card-product overflow-hidden hover:shadow-lg transition-shadow h-[700px] border-brand-silver/30 my-0">
                        <div className="relative h-64 sm:h-80 md:h-[350px]">
                          <img src={featuredProduct.image_url || '/placeholder.svg'} alt={featuredProduct.name} className="w-full h-full object-cover" onError={() => handleImageError(featuredProduct.image_url, featuredProduct.name)} onLoad={() => handleImageLoad(featuredProduct.image_url, featuredProduct.name)} />
                          <div className="absolute top-4 left-4">
                            <Badge className="badge-featured">
                              <Star className="w-4 h-4 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6 bg-white/90 h-[200px] flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif font-medium text-brand-charcoal text-lg md:text-xl">{featuredProduct.name}</h3>
                            <p className="text-sm md:text-base mt-1 mb-2 line-clamp-3 text-brand-gray-600">
                              {featuredProduct.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-lg md:text-xl font-medium text-brand-slate-blue">{formatPrice(featuredProduct.price, featuredProduct.currency)}</span>
                            <Link to={`/products/${featuredProduct.id}`}>
                              <Button size="sm" className="text-sm md:text-base min-h-[40px] px-4 md:px-6">View Product</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>}
                  
                  {/* Right Column with 2x2 Grid (4 products) - Each card matches treatment card size */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {remainingProducts.map(product => <Card key={product.id} className="card-product overflow-hidden hover:shadow-lg transition-shadow h-[335px] border-brand-silver/30">
                          <div className="relative h-48 sm:h-56 md:h-32">
                            <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" onError={() => handleImageError(product.image_url, product.name)} onLoad={() => handleImageLoad(product.image_url, product.name)} />
                          </div>
                          <CardContent className="p-4 md:p-4 bg-white/90 h-[112px] flex flex-col justify-between">
                            <div>
                              <h3 className="font-serif text-sm md:text-base font-medium text-brand-charcoal">{product.name}</h3>
                              <p className="text-xs md:text-sm text-brand-gray-600 line-clamp-2 mt-1">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm md:text-base font-medium text-brand-slate-blue">{formatPrice(product.price, product.currency)}</span>
                              <Link to={`/products/${product.id}`}>
                                <Button size="sm" className="text-xs md:text-sm px-3 py-1 md:px-4 min-h-[32px] md:min-h-[36px]">View</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>
                </div>

                {/* Pagination Controls */}
                {pageCount > 1 && <div className="flex justify-center mt-12 space-x-1">
                    <Button size="sm" variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                      Prev
                    </Button>
                    {[...Array(pageCount)].map((_, i) => <Button key={i} size="sm" variant={page === i + 1 ? "default" : "ghost"} onClick={() => setPage(i + 1)} aria-current={page === i + 1}>
                        {i + 1}
                      </Button>)}
                    <Button size="sm" variant="secondary" onClick={() => setPage(page + 1)} disabled={page === pageCount}>
                      Next
                    </Button>
                  </div>}
              </>}
          </div>
          {/* Flowing gradient background */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-slate-blue/5 to-transparent rounded-full blur-3xl"></div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Products;