
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailHeader from '@/components/ProductDetailHeader';
import ProductImage from '@/components/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ProductDetailsGrid from '@/components/ProductDetailsGrid';
import RelatedProducts from '@/components/RelatedProducts';
import SEO from '@/components/SEO';
import SEOBreadcrumb from '@/components/SEOBreadcrumb';
import ProductSchema from '@/components/seo/ProductSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductDiscountPopup from '@/components/ProductDiscountPopup';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  featured: boolean | null;
  product_benefits: string[] | null;
  category: string | null;
  sizes?: {
    default: { size: string; price: number };
    options: { size: string; price: number }[];
  } | null;
};

const fetchProduct = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency, image_url, featured, product_benefits, category, sizes')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(error.message);
  }
  return data as Product | null;
};

const fetchRelatedProducts = async (currentProductId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency, image_url, featured, product_benefits, category, sizes')
    .neq('id', currentProductId)
    .limit(3);
    
  if (error) {
    console.error("Error fetching related products:", error);
    throw new Error(error.message);
  }
  return (data || []) as Product[];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useCart();
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

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

  // Show discount popup after 5 seconds if user has no items in cart and no discount applied
  useEffect(() => {
    // Check if popup has already been shown this session
    const hasShownPopup = sessionStorage.getItem('discount-popup-shown');
    if (hasShownPopup) {
      setHasShownPopup(true);
      return;
    }

    const timer = setTimeout(() => {
      if (items.length === 0 && !hasShownPopup) {
        setShowDiscountPopup(true);
        setHasShownPopup(true);
        sessionStorage.setItem('discount-popup-shown', 'true');
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, [items.length, hasShownPopup]);

  const hideDiscountPopup = () => {
    setShowDiscountPopup(false);
  };

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

  const pageItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name }
  ];

  const schemaItems = [
    { name: 'Home', url: 'https://www.stwaestheticclinic.co.uk', position: 1 },
    { name: 'Products', url: 'https://www.stwaestheticclinic.co.uk/products', position: 2 },
    { name: product.name, url: `https://www.stwaestheticclinic.co.uk/products/${product.id}`, position: 3 }
  ];

  return (
    <>
      <SEO
        title={`${product.name} | Professional Beauty Products | STW Aesthetic Clinic`}
        description={product.description || `Professional beauty product: ${product.name}. High-quality skincare products to complement your aesthetic treatments at STW Aesthetic Clinic.`}
        keywords={`${product.name}, beauty product, skincare, professional cosmetics, ${product.product_benefits?.join(', ') || 'professional skincare'}, STW Aesthetic Clinic`}
        url={`https://www.stwaestheticclinic.co.uk/products/${product.id}`}
        image={product.image_url || undefined}
      />
      <ProductSchema product={product} />
      <BreadcrumbSchema items={schemaItems} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ProductDetailHeader featured={product.featured} />
          
          {/* Product Details */}
          <section className="py-12 bg-gradient-to-br from-brand-white via-brand-off-white to-brand-light-gray">
            <div className="container-custom">
              <SEOBreadcrumb items={pageItems} />
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
      <ProductDiscountPopup 
        isOpen={showDiscountPopup} 
        onClose={hideDiscountPopup} 
      />
    </>
  );
};

export default ProductDetail;
