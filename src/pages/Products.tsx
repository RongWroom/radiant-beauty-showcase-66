
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from '../utils/products';
import { Star, ShoppingCart } from 'lucide-react';

const Products = () => {
  const featuredProduct = products.find(product => product.featured) || products[0];
  const remainingProducts = products.filter(product => product.id !== featuredProduct.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-soft-blush py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-6 text-hierarchy-primary">Our Products</h1>
              <p className="text-lg mb-8 text-hierarchy-secondary">
                Discover our range of premium skincare products, scientifically formulated 
                to deliver exceptional results for all skin types.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-hierarchy-primary">All Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Featured Product - Large Square on Left */}
              <div className="lg:col-span-1">
                <Card className="card-product overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-96 lg:h-full">
                    <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="badge-featured">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
                      <h3 className="font-serif font-medium text-white">{featuredProduct.name}</h3>
                      <p className="text-sm mt-1 mb-2 line-clamp-2">
                        {featuredProduct.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-medium">{featuredProduct.price}</span>
                        <Link to={`/products/${featuredProduct.id}`}>
                          <Button size="sm" className="bg-brand-rose-gold text-brand-charcoal hover:bg-brand-rose-gold-light">
                            View Product
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Right Column with 2x3 Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {remainingProducts.map(product => (
                    <Card key={product.id} className="card-product overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif text-lg font-medium text-hierarchy-primary">{product.name}</h3>
                        <p className="text-sm text-hierarchy-secondary line-clamp-2 mt-1 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg font-medium text-hierarchy-accent">{product.price}</span>
                          <Link to={`/products/${product.id}`}>
                            <Button size="sm">View Product</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
