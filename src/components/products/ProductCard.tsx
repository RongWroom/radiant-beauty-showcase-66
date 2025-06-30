
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import { Product } from '@/hooks/usePaginatedProducts';

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

const ProductCard = ({ product, isFeatured = false }: ProductCardProps) => {
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const handleImageError = (imageUrl: string | null, productName: string) => {
    console.error(`Image failed to load for ${productName}:`, imageUrl);
  };

  const handleImageLoad = (imageUrl: string | null, productName: string) => {
    console.log(`Image loaded successfully for ${productName}:`, imageUrl);
  };

  if (isFeatured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full border-brand-silver/30">
        <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[450px] xl:h-full">
          <img 
            src={product.image_url || '/placeholder.svg'} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={() => handleImageError(product.image_url, product.name)}
            onLoad={() => handleImageLoad(product.image_url, product.name)}
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge className="font-medium px-2 sm:px-3 py-1 bg-brand-silver text-brand-charcoal text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Featured Product
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-slate-blue/90 to-transparent p-4 md:p-6 text-white">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-white mb-2">{product.name}</h3>
            <p className="text-sm md:text-base mt-1 mb-3 md:mb-4 line-clamp-2 text-white/90">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium text-white text-base md:text-lg">{formatPrice(product.price, product.currency)}</span>
              <Link to={`/products/${product.id}`}>
                <Button size="sm" className="bg-white text-brand-slate-blue hover:bg-brand-off-white text-sm md:text-base min-h-[40px] px-4 md:px-6">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full border-brand-silver/30">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img 
          src={product.image_url || '/placeholder.svg'} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={() => handleImageError(product.image_url, product.name)}
          onLoad={() => handleImageLoad(product.image_url, product.name)}
        />
      </div>
      <CardContent className="p-4 md:p-6 bg-white/90">
        <h3 className="font-serif text-base sm:text-lg md:text-xl font-medium text-brand-charcoal mb-2">{product.name}</h3>
        <p className="text-sm md:text-base text-brand-gray-600 line-clamp-2 mt-1 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg md:text-xl font-medium text-brand-slate-blue">{formatPrice(product.price, product.currency)}</span>
          <Link to={`/products/${product.id}`}>
            <Button size="sm" className="text-sm md:text-base min-h-[40px] px-4 md:px-6">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
