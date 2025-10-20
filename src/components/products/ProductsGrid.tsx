
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
    <div className="space-y-8 sm:space-y-10">
      {/* Featured Product - Full width on mobile/tablet with proper spacing */}
      <div className="xl:hidden px-4 sm:px-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {remainingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile and tablet grid for remaining products with proper spacing */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-0">
        {remainingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
