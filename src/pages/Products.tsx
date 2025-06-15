import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
};

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  return data || [];
};

const Products = () => {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : (currency === 'USD' ? '$' : '€');
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const featuredProduct = products && products.length > 0 ? products[0] : null;
  const remainingProducts = products?.filter(product => product.id !== featuredProduct?.id) || [];

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

        {/* Products Grid */}
        <section className="py-16 bg-gradient-to-b from-brand-white to-brand-off-white relative overflow-hidden">
          <div className="container-custom relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">All Products</h2>
            
            {isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Skeleton className="h-[500px] w-full rounded-lg" />
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-lg" />)}
                  </div>
                </div>
              </div>
            )}

            {isError && (
              <div className="text-center text-red-500 font-medium">Failed to load products. Please try again later.</div>
            )}

            {!isLoading && !isError && products && products.length === 0 && (
              <div className="text-center text-brand-gray-600">No products have been added yet.</div>
            )}

            {!isLoading && !isError && products && products.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured Product - Large Square on Left */}
                {featuredProduct && (
                  <div className="lg:col-span-1">
                    <Card className="card-product overflow-hidden hover:shadow-lg transition-shadow h-full border-brand-silver/30">
                      <div className="relative h-96 lg:h-full">
                        <img src={'/placeholder.svg'} alt={featuredProduct.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4">
                          <Badge className="badge-featured">
                            <Star className="w-4 h-4 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-slate-blue/90 to-transparent p-4 text-white">
                          <h3 className="font-serif font-medium text-white">{featuredProduct.name}</h3>
                          <p className="text-sm mt-1 mb-2 line-clamp-2 text-white/90">
                            {featuredProduct.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-medium text-white">{formatPrice(featuredProduct.price, featuredProduct.currency)}</span>
                            <Link to={`/products/${featuredProduct.id}`}>
                              <Button size="sm" className="bg-white text-brand-slate-blue hover:bg-brand-off-white">
                                View Product
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
                
                {/* Right Column with 2x3 Grid */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {remainingProducts.map(product => (
                      <Card key={product.id} className="card-product overflow-hidden hover:shadow-lg transition-shadow border-brand-silver/30">
                        <div className="relative h-48">
                          <img src={'/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <CardContent className="p-4 bg-white/90">
                          <h3 className="font-serif text-lg font-medium text-brand-charcoal">{product.name}</h3>
                          <p className="text-sm text-brand-gray-600 line-clamp-2 mt-1 mb-3">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-lg font-medium text-brand-slate-blue">{formatPrice(product.price, product.currency)}</span>
                            <Link to={`/products/${product.id}`}>
                              <Button size="sm">View Product</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
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
