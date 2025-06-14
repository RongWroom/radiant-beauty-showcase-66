
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { treatments } from '../utils/data';
import { Droplet, Syringe, Calendar, Star } from 'lucide-react';

const Treatments = () => {
  // Find the featured treatment
  const featuredTreatment = treatments.find(treatment => treatment.featured) || treatments[0];
  // Get the remaining treatments (excluding the featured one)
  const remainingTreatments = treatments.filter(treatment => treatment.id !== featuredTreatment.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-white py-12 md:py-20 animate-fade-in">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-2 font-semibold text-brand-charcoal">
                Our Skincare Treatments
              </h1>
              {/* Decorative Silver Line */}
              <div className="flex justify-center mb-5">
                <span className="block h-1 w-24 rounded-full bg-brand-silver"></span>
              </div>
              <p className="text-lg mb-6 font-medium text-brand-charcoal">
                Discover our range of <span className="px-2 py-0.5 rounded bg-brand-silver/60 text-brand-charcoal font-semibold">professional</span> treatments tailored to your unique skin needs.
                Each treatment is performed by our expert estheticians using premium products.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="default">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Categories */}
        <section className="py-9 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-7 text-brand-charcoal font-bold">Treatment Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-slate-blue text-white">
                  <div className="rounded-full bg-brand-silver p-4 mb-4">
                    <Droplet className="w-8 h-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Facial Treatments</h3>
                  <p className="mb-4 text-brand-light-gray">
                    Revitalize and nourish your skin with our specialized facial treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-white border-white hover:bg-white hover:text-brand-slate-blue">Explore Facials</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-slate-blue text-white">
                  <div className="rounded-full bg-brand-silver p-4 mb-4">
                    <Syringe className="w-8 h-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Anti-Aging Solutions</h3>
                  <p className="mb-4 text-brand-light-gray">
                    Turn back the clock with our effective anti-aging treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-white border-white hover:bg-white hover:text-brand-slate-blue">Explore Anti-Aging</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-slate-blue text-white">
                  <div className="rounded-full bg-brand-silver p-4 mb-4">
                    <Droplet className="w-8 h-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Skin Rejuvenation</h3>
                  <p className="mb-4 text-brand-light-gray">
                    Refresh and renew your skin with our rejuvenating treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-white border-white hover:bg-white hover:text-brand-slate-blue">Explore Rejuvenation</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* All Treatments Grid - Updated Layout */}
        <section className="py-14 bg-brand-light-gray">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-7 text-brand-charcoal font-bold text-center">All Treatments</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Featured Treatment - Large Square on Left */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-96 lg:h-full">
                    <img src={featuredTreatment.image} alt={featuredTreatment.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="font-medium px-3 py-1 bg-brand-silver text-brand-charcoal">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 p-4 text-white bg-brand-slate-blue">
                      <h3 className="font-serif text-xl font-medium text-white">{featuredTreatment.name}</h3>
                      <p className="text-sm mt-1 mb-2 line-clamp-2">
                        {featuredTreatment.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium text-brand-light-gray">{featuredTreatment.price}</span>
                        <Link to={`/treatments/${featuredTreatment.id}`}>
                          <Button size="sm" variant="secondary" className="bg-brand-silver text-brand-charcoal hover:bg-brand-silver-light">Read More</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Right Column with 2x2 Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {remainingTreatments.map(treatment => (
                    <Card key={treatment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif text-lg font-medium">{treatment.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
                          {treatment.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg font-medium">{treatment.price}</span>
                          <Link to={`/treatments/${treatment.id}`}>
                            <Button size="sm" variant="default">Read More</Button>
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

        {/* Booking Section */}
        <section className="py-12 bg-brand-off-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif mb-3 font-semibold text-brand-charcoal">Ready to Book Your Treatment?</h2>
              <p className="mb-6 text-brand-charcoal">Schedule your appointment today and take the first step towards healthier, more radiant skin.</p>
              <Button variant="default">Book Now</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Treatments;
