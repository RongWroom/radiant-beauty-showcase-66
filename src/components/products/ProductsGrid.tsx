
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/hooks/usePaginatedProducts';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  // Find the featured product
  const featuredProduct = products.find(product => product.featured) || products[0];
  // Get the remaining products (excluding the featured one)
  const remainingProducts = products.filter(product => product.id !== featuredProduct?.id);

  if (!featuredProduct) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="space-y-8 sm:space-y-10">
        {/* Mobile-first layout with better tablet handling */}
        
        {/* Featured Product - Full width on mobile/tablet, left column on desktop */}
        <div className="xl:hidden">
          <ProductCard product={featuredProduct} isFeatured={true} />
        </div>
        
        {/* Desktop layout */}
        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Featured Product - Large Square on Left */}
          <div className="xl:col-span-1">
            <ProductCard product={featuredProduct} isFeatured={true} />
          </div>
          
          {/* Right Column with 2x2 Grid */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {remainingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile and tablet grid for remaining products */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          {remainingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
