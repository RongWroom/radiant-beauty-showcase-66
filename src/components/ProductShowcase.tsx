
import React from 'react';
import { Link } from 'react-router-dom';
import { treatments } from '../utils/data';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Grid3X3, PackageCheck } from 'lucide-react';

const categories = [...new Set(treatments.map(item => item.category))].slice(0, 3);

// Get a few more treatments for the bento box
const bentoTreatments = treatments.slice(3, 6);

const ProductShowcase = () => {
  return <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Treatments</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our most popular treatments designed to rejuvenate and transform your skin
          </p>
          <div className="mt-4">
            <Link to="/treatments">
              <Button variant="outline" className="mt-2">
                View All Treatments
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Box Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-serif mb-8 text-center">
            Explore Our Special Treatments
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card */}
            <Card className="md:col-span-2 bg-skin-lightgreen hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="rounded-full bg-skin-green p-4">
                    <PackageCheck className="w-12 h-12 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Personalized Solutions</h4>
                    <p className="text-muted-foreground mb-4">
                      Our treatments are tailored to your unique skin needs and goals. 
                      Experience personalized care that delivers real results.
                    </p>
                    <Link to="/treatments" className="inline-flex items-center text-sm font-medium hover:underline">
                      Learn more about our approach
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Treatment Card */}
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img src="/placeholder.svg" alt="Featured treatment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-skin-green px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium">{bentoTreatments[0]?.name || "Chemical Peel"}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {bentoTreatments[0]?.description || "Reveal fresh, new skin with our clinical-grade chemical peels"}
                </p>
              </CardContent>
            </Card>
            
            {/* Quick Links Card */}
            <Card className="bg-skin-yellow">
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Quick Navigation</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/treatments" className="flex items-center text-sm hover:underline">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Facial Treatments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/treatments" className="flex items-center text-sm hover:underline">
                      <Grid3X3 className="mr-2 h-4 w-4" />
                      <span>Anti-Aging Solutions</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/treatments" className="flex items-center text-sm hover:underline">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Skin Rejuvenation</span>
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Treatment Cards */}
            {bentoTreatments.slice(1).map((treatment, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <img src={treatment.image || "/placeholder.svg"} alt={treatment.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium">{treatment.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {treatment.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{treatment.price}</span>
                    <Link to="/treatments" className="text-skin-green text-sm hover:underline">View details</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>;
};

export default ProductShowcase;
