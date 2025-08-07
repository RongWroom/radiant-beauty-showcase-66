
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from 'lucide-react';

type Product = {
  price: number | null;
  currency: string | null;
  product_benefits: string[] | null;
  description: string | null;
  category: string | null;
};

type ProductDetailsGridProps = {
  product: Product;
};

const ProductDetailsGrid = ({ product }: ProductDetailsGridProps) => {
  const [expandedSections, setExpandedSections] = useState({
    benefits: true,
    ingredients: false
  });

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const parseDescription = (description: string | null) => {
    if (!description) return { main: '', howToUse: '', ingredients: '' };
    
    const sections = {
      main: '',
      howToUse: '',
      ingredients: ''
    };

    // Split by common section headers
    const parts = description.split(/(?=How to use|Ingredients|Directions|Application)/i);
    sections.main = parts[0]?.trim() || '';
    
    // Extract usage instructions
    const usagePart = parts.find(part => /^(How to use|Directions|Application)/i.test(part));
    if (usagePart) {
      sections.howToUse = usagePart.replace(/^(How to use|Directions|Application):?\s*/i, '').trim();
    }
    
    // Extract ingredients
    const ingredientsPart = parts.find(part => /^Ingredients/i.test(part));
    if (ingredientsPart) {
      sections.ingredients = ingredientsPart.replace(/^Ingredients:?\s*/i, '').trim();
    }

    return sections;
  };

  const descriptionSections = parseDescription(product.description);

  return (
    <section className="py-16 bg-gradient-to-b from-brand-off-white to-brand-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Product Information</h2>
        <div className="space-y-6">
          

          {/* Benefits */}
          {product.product_benefits && product.product_benefits.length > 0 && (
            <Card className="bg-gradient-to-br from-white to-brand-silver/5 border-brand-silver/30 shadow-lg">
              <CardContent className="p-6">
                <button
                  onClick={() => toggleSection('benefits')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-xl font-serif text-brand-charcoal">Key Benefits</h3>
                  {expandedSections.benefits ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.benefits && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.product_benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                        <div className="w-2 h-2 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-brand-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}


          {/* Ingredients */}
          {descriptionSections.ingredients && (
            <Card className="bg-gradient-to-br from-white to-brand-off-white border-brand-silver/30 shadow-lg">
              <CardContent className="p-6">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-xl font-serif text-brand-charcoal">Ingredients</h3>
                  {expandedSections.ingredients ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.ingredients && (
                  <div className="mt-4 text-sm text-brand-gray-600 leading-relaxed">
                    <p>{descriptionSections.ingredients}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Product Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif mb-4 text-white">Product Information</h3>
                <div className="space-y-4 text-white">
                  <div>
                    <p className="text-sm font-medium text-white/80">Price</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(product.price, product.currency)}</p>
                  </div>
                  {product.category && (
                    <div>
                      <p className="text-sm font-medium text-white/80">Category</p>
                      <p className="text-lg text-white">{product.category}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-brand-silver/5 border-brand-silver/30 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif mb-4 text-brand-charcoal">Care Instructions</h3>
                <div className="space-y-3 text-sm text-brand-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                    <p>Store in a cool, dry place</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                    <p>Keep away from direct sunlight</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                    <p>For external use only</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-slate-blue rounded-full"></div>
                    <p>Discontinue if irritation occurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsGrid;
