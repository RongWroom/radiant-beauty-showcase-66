
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  price: number | null;
  currency: string | null;
  product_benefits: string[] | null;
};

type ProductDetailsGridProps = {
  product: Product;
};

const ProductDetailsGrid = ({ product }: ProductDetailsGridProps) => {
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-brand-off-white to-brand-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Benefits - Large Card */}
          <Card className="md:col-span-2 bg-gradient-to-br from-white to-brand-silver/5 border-brand-silver/30 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif mb-6 text-brand-charcoal">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.product_benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                    <div className="w-2 h-2 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-brand-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category & Size Info */}
          <Card className="bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif mb-4 text-white">Product Info</h3>
              <div className="space-y-4 text-white">
                <div>
                  <p className="text-sm font-medium text-white/80">Price</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(product.price, product.currency)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="bg-gradient-to-br from-brand-silver/10 to-white border-brand-silver/30 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif mb-4 text-brand-charcoal">How to Use</h3>
              <div className="space-y-3 text-sm text-brand-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                  <p>Apply to clean, dry skin</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                  <p>Use morning and/or evening</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                  <p>Follow with moisturizer and SPF</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                  <p>Patch test recommended</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="md:col-span-2 bg-gradient-to-br from-white to-brand-off-white border-brand-silver/30 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif mb-4 text-brand-charcoal">Key Ingredients</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                  <h4 className="font-medium mb-2 text-brand-charcoal">Vitamin C</h4>
                  <p className="text-xs text-brand-gray-600">Antioxidant protection</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                  <h4 className="font-medium mb-2 text-brand-charcoal">Vitamin E</h4>
                  <p className="text-xs text-brand-gray-600">Skin conditioning</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                  <h4 className="font-medium mb-2 text-brand-charcoal">Olive Leaf Extract</h4>
                  <p className="text-xs text-brand-gray-600">Healing properties</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsGrid;
