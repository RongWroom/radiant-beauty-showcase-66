import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
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
  const {
    data,
    error
  } = await supabase.from('products').select('id, name, description, price, currency, image_url, featured, product_benefits').eq('id', id).maybeSingle();
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(error.message);
  }
  return data;
};
const fetchRelatedProducts = async (currentProductId: string): Promise<Product[]> => {
  const {
    data,
    error
  } = await supabase.from('products').select('id, name, description, price, currency, image_url, featured, product_benefits').neq('id', currentProductId).limit(3);
  if (error) {
    console.error("Error fetching related products:", error);
    throw new Error(error.message);
  }
  return data || [];
};
const ProductDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id
  });
  const {
    data: relatedProducts
  } = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => fetchRelatedProducts(id!),
    enabled: !!id
  });
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(2)}`;
  };
  if (isLoading) {
    return <div className="min-h-screen flex flex-col">
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
      </div>;
  }
  if (isError || !product) {
    return <div className="min-h-screen flex flex-col">
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
      </div>;
  }
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb & Back Button */}
        <section className="bg-gradient-to-r from-brand-slate-blue/5 to-brand-silver/10 py-6">
          <div className="container-custom">
            <div className="flex items-center gap-4">
              <Link to="/products">
                <Button variant="outline" size="sm" className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
              {product.featured && <Badge className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white shadow-lg">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Featured
                </Badge>}
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12 bg-gradient-to-br from-brand-white via-brand-off-white to-brand-light-gray">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-brand-silver/10 to-brand-slate-blue/5 rounded-xl overflow-hidden shadow-lg border border-brand-silver/30">
                  <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-brand-silver/20">
                  <h1 className="text-3xl md:text-4xl font-serif mb-2 text-brand-charcoal">{product.name}</h1>
                  <p className="text-brand-gray-600 mb-4">{product.description}</p>
                  <div className="text-3xl font-bold bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-white mb-6">
                    {formatPrice(product.price, product.currency)}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-brand-silver/20">
                  <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="font-medium text-brand-charcoal">Quantity:</label>
                    <div className="flex items-center border border-brand-silver rounded-lg overflow-hidden">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors">
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-brand-silver bg-white font-medium">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-brand-slate-blue/10 text-brand-slate-blue transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark shadow-lg">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" onClick={() => setIsWishlisted(!isWishlisted)} className={`border-2 transition-all ${isWishlisted ? "text-red-500 border-red-400 bg-red-50" : "border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white"}`}>
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
                    <p className="text-sm text-brand-gray-600 font-medium">Free Shipping</p>
                  </div>
                  <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
                    <p className="text-sm text-brand-gray-600 font-medium">Secure Payment</p>
                  </div>
                  <div className="text-center bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-brand-silver/20">
                    <RotateCcw className="w-6 h-6 mx-auto mb-2 text-brand-slate-blue" />
                    <p className="text-sm text-brand-gray-600 font-medium">30-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Style Information Grid */}
        <section className="py-16 bg-gradient-to-b from-brand-off-white to-brand-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Benefits - Large Card */}
              <Card className="md:col-span-2 bg-gradient-to-br from-white to-brand-silver/5 border-brand-silver/30 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-6 text-brand-charcoal">Key Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.product_benefits?.map((benefit, index) => <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-brand-slate-blue/5 to-brand-silver/10 rounded-lg border border-brand-silver/20">
                        <div className="w-2 h-2 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-brand-gray-600">{benefit}</span>
                      </div>)}
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

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && <section className="py-16 bg-gradient-to-t from-brand-off-white to-brand-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(relatedProduct => <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-brand-silver/30 bg-gradient-to-br from-white to-brand-silver/5">
                    <div className="relative h-48">
                      <img src={relatedProduct.image_url || '/placeholder.svg'} alt={relatedProduct.name} className="w-full h-full object-cover" />
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
                  </Card>)}
              </div>
            </div>
          </section>}
      </main>
      <Footer />
    </div>;
};
export default ProductDetail;