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
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-skin-lightgreen py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-6">Our Skincare Treatments</h1>
              <p className="text-lg mb-8">
                Discover our range of professional treatments tailored to your unique skin needs.
                Each treatment is performed by our expert estheticians using premium products.
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="hover:bg-opacity-90 bg-skin-teal">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Categories */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Treatment Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-[brand-sage-dark] bg-brand-lime">
                  <div className="rounded-full bg-skin-green p-4 mb-4">
                    <Droplet className="w-8 h-8 text-black bg-transparent" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Facial Treatments</h3>
                  <p className="mb-4 text-[brand-neutral-200] text-white">
                    Revitalize and nourish your skin with our specialized facial treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-black rounded-bl-sm ">Explore Facials</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-lime">
                  <div className="rounded-full bg-skin-yellow p-4 mb-4">
                    <Syringe className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Anti-Aging Solutions</h3>
                  <p className="mb-4 text-white">
                    Turn back the clock with our effective anti-aging treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-black">Explore Anti-Aging</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center bg-brand-lime">
                  <div className="rounded-full bg-skin-teal p-4 mb-4">
                    <Droplet className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Skin Rejuvenation</h3>
                  <p className="mb-4 text-white">
                    Refresh and renew your skin with our rejuvenating treatments
                  </p>
                  <Button variant="outline" className="mt-auto text-black">Explore Rejuvenation</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* All Treatments Grid - Updated Layout */}
        <section className="py-16 bg-skin-gray">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">All Treatments</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Featured Treatment - Large Square on Left */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-96 lg:h-full">
                    <img src={featuredTreatment.image} alt={featuredTreatment.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-skin-green text-black font-medium px-3 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
                      <h3 className="font-serif text-xl font-medium text-white">{featuredTreatment.name}</h3>
                      <p className="text-sm mt-1 mb-2 line-clamp-2">
                        {featuredTreatment.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium text-[brand-neutral-50] text-white">{featuredTreatment.price}</span>
                        <Link to={`/treatments/${featuredTreatment.id}`}>
                          <Button size="sm" className="bg-skin-teal bg-[brand-sage-light] bg-brand-sage">Read More</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Right Column with 2x2 Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {remainingTreatments.map(treatment => <Card key={treatment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                            <Button size="sm" className="bg-skin-teal text-[brand-neutral-600] bg-[brand-sage-dark] bg-brand-sage text-white">Read More</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16 bg-skin-lightgreen">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif mb-4">Ready to Book Your Treatment?</h2>
              <p className="mb-8">Schedule your appointment today and take the first step towards healthier, more radiant skin.</p>
              <Button className="hover:bg-opacity-90 bg-skin-teal">Book Now</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Treatments;