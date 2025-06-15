
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
  const { data, error } = await supabase
    .from('public.products')
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
        .from('public.products')
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
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => fetchRelatedProducts(id!),
    enabled: !!id,
  });

  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null) return 'N/A';
    const currencySymbol = currency === 'GBP' ? '£' : (currency === 'USD' ? '$' : '€');
    return `${currencySymbol}${price.toFixed(2)}`;
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb & Back Button */}
        <section className="bg-gray-50 py-4">
          <div className="container-custom">
            <div className="flex items-center gap-4">
              <Link to="/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
              {product.featured && (
                <Badge className="bg-skin-green text-black">
                  <Star className="w-4 h-4 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image_url || '/placeholder.svg'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.name}</h1>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="text-3xl font-bold text-skin-teal mb-6">{formatPrice(product.price, product.currency)}</div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="font-medium">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-skin-teal hover:bg-skin-teal/90">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={isWishlisted ? "text-red-500 border-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-skin-teal" />
                    <p className="text-sm text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-skin-teal" />
                    <p className="text-sm text-gray-600">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 mx-auto mb-2 text-skin-teal" />
                    <p className="text-sm text-gray-600">30-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Style Information Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Benefits - Large Card */}
              <Card className="md:col-span-2 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-6">Key Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.product_benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-skin-teal rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category & Size Info */}
              <Card className="bg-skin-green">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-black">Product Info</h3>
                  <div className="space-y-4 text-black">
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-2xl font-bold">{formatPrice(product.price, product.currency)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4">How to Use</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Apply to clean, dry skin</p>
                    <p>Use morning and/or evening</p>
                    <p>Follow with moisturizer and SPF</p>
                    <p>Patch test recommended</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              <Card className="md:col-span-2 bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4">Key Ingredients</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Vitamin C</h4>
                      <p className="text-xs text-gray-600">Antioxidant protection</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Vitamin E</h4>
                      <p className="text-xs text-gray-600">Skin conditioning</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Olive Leaf Extract</h4>
                      <p className="text-xs text-gray-600">Healing properties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={relatedProduct.image_url || '/placeholder.svg'} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-medium">{relatedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
                        {relatedProduct.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-medium">{formatPrice(relatedProduct.price, relatedProduct.currency)}</span>
                        <Link to={`/products/${relatedProduct.id}`}>
                          <Button size="sm">View Product</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
