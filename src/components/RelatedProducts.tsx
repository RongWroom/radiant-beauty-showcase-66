
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
};

type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-t from-brand-off-white to-brand-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(relatedProduct => (
            <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-brand-silver/30 bg-gradient-to-br from-white to-brand-silver/5">
              <div className="relative h-48">
                <img 
                  src={relatedProduct.image_url || '/placeholder.svg'} 
                  alt={relatedProduct.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-blue/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-medium text-brand-charcoal">{relatedProduct.name}</h3>
                <p className="text-sm text-brand-gray-600 line-clamp-2 mt-1 mb-3">
                  {relatedProduct.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-transparent">
                    {formatPrice(relatedProduct.price, relatedProduct.currency)}
                  </span>
                  <Link to={`/products/${relatedProduct.id}`}>
                    <Button size="sm" className="bg-brand-slate-blue hover:bg-brand-slate-blue-light">View Product</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
