
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailHeader from '@/components/ProductDetailHeader';
import ProductImage from '@/components/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ProductDetailsGrid from '@/components/ProductDetailsGrid';
import RelatedProducts from '@/components/RelatedProducts';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  featured: boolean | null;
  product_benefits: string[] | null;
};

const fetchProduct = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency, image_url, featured, product_benefits')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(error.message);
  }
  return data;
};

const fetchRelatedProducts = async (currentProductId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency, image_url, featured, product_benefits')
    .neq('id', currentProductId)
    .limit(3);
    
  if (error) {
    console.error("Error fetching related products:", error);
    throw new Error(error.message);
  }
  return data || [];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => fetchRelatedProducts(id!),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-12">
          <Skeleton className="h-10 w-48 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductDetailHeader featured={product.featured} />
        
        {/* Product Details */}
        <section className="py-12 bg-gradient-to-br from-brand-white via-brand-off-white to-brand-light-gray">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductImage imageUrl={product.image_url} name={product.name} />
              <ProductInfo product={product} productId={id!} />
            </div>
          </div>
        </section>

        <ProductDetailsGrid product={product} />
        <RelatedProducts products={relatedProducts || []} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
