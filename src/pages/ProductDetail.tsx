
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from '../utils/products';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
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

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

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
                    src={product.image} 
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
                  <div className="text-3xl font-bold text-skin-teal mb-6">{product.price}</div>
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
                    {product.benefits.map((benefit, index) => (
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
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-lg">{product.category}</p>
                    </div>
                    {product.size && (
                      <div>
                        <p className="text-sm font-medium">Size</p>
                        <p className="text-lg">{product.size}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-2xl font-bold">{product.price}</p>
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
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={relatedProduct.image} 
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
                        <span className="text-lg font-medium">{relatedProduct.price}</span>
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
