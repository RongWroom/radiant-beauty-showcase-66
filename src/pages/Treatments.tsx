
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTreatments } from '@/hooks/useTreatments';
import { Droplet, Syringe, Calendar, Star, Loader2 } from 'lucide-react';

const Treatments = () => {
  const { data: treatments, isLoading, isError } = useTreatments();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !treatments) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Error loading treatments</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find the featured treatment
  const featuredTreatment = treatments.find(treatment => treatment.featured) || treatments[0];
  // Get the remaining treatments (excluding the featured one)
  const remainingTreatments = treatments.filter(treatment => treatment.id !== featuredTreatment?.id);

  const formatPrice = (price: number, currency: string | null) => {
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(0)}`;
  };

  // Color schemes for different treatment categories
  const getCategoryColors = (category: string | null) => {
    switch (category) {
      case 'Facial Treatments':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
          border: 'border-purple-200',
          badge: 'bg-purple-100 text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'Anti-Aging Solutions':
        return {
          bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
          border: 'border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800',
          button: 'bg-emerald-600 hover:bg-emerald-700'
        };
      case 'Skin Rejuvenation':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light py-12 md:py-20 animate-fade-in">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-2 font-semibold text-white">
                Our Skincare Treatments
              </h1>
              {/* Decorative Silver Line */}
              <div className="flex justify-center mb-5">
                <span className="block h-1 w-24 rounded-full bg-white/30"></span>
              </div>
              <p className="text-lg mb-6 font-medium text-white/90">
                Discover our range of <span className="px-2 py-0.5 rounded bg-white/20 text-white font-semibold">professional</span> treatments tailored to your unique skin needs.
                Each treatment is performed by our expert estheticians using premium products.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" className="bg-white text-brand-slate-blue hover:bg-white/90">
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
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <div className="rounded-full bg-white/20 p-4 mb-4">
                    <Droplet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Facial Treatments</h3>
                  <p className="mb-4 text-white/90">
                    Revitalize and nourish your skin with our specialized facial treatments
                  </p>
                  <Button variant="outline" className="mt-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-purple-600">Explore Facials</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <div className="rounded-full bg-white/20 p-4 mb-4">
                    <Syringe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Anti-Aging Solutions</h3>
                  <p className="mb-4 text-white/90">
                    Turn back the clock with our effective anti-aging treatments
                  </p>
                  <Button variant="outline" className="mt-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-emerald-600">Explore Anti-Aging</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  <div className="rounded-full bg-white/20 p-4 mb-4">
                    <Droplet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 text-white">Skin Rejuvenation</h3>
                  <p className="mb-4 text-white/90">
                    Refresh and renew your skin with our rejuvenating treatments
                  </p>
                  <Button variant="outline" className="mt-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-blue-600">Explore Rejuvenation</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* All Treatments Grid - Updated Layout */}
        {featuredTreatment && (
          <section className="py-14 bg-gradient-to-b from-brand-off-white to-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-7 text-brand-charcoal font-bold text-center">All Treatments</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured Treatment - Large Square on Left */}
                <div className="lg:col-span-1">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full border-2 border-gradient-to-r from-purple-200 to-pink-200">
                    <div className="relative h-96 lg:h-full">
                      <img src={featuredTreatment.image_url || '/placeholder.svg'} alt={featuredTreatment.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge className="font-medium px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white">
                        <h3 className="font-serif text-xl font-medium text-white">{featuredTreatment.name}</h3>
                        <p className="text-sm mt-1 mb-2 line-clamp-2 text-white/90">
                          {featuredTreatment.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-medium text-white text-lg">{formatPrice(featuredTreatment.price, featuredTreatment.currency)}</span>
                          <Link to={`/treatments/${featuredTreatment.id}`}>
                            <Button size="sm" className="bg-white text-brand-charcoal hover:bg-white/90">Read More</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Right Column with 2x2 Grid */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {remainingTreatments.map(treatment => {
                      const colors = getCategoryColors(treatment.category);
                      return (
                        <Card key={treatment.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${colors.bg} ${colors.border} border-2`}>
                          <div className="relative h-48">
                            <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-full object-cover" />
                            {treatment.category && (
                              <div className="absolute top-3 left-3">
                                <Badge className={`text-xs px-2 py-1 ${colors.badge} border-0`}>
                                  {treatment.category}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-serif text-lg font-medium text-brand-charcoal">{treatment.name}</h3>
                            <p className="text-sm text-brand-gray-600 line-clamp-2 mt-1 mb-3">
                              {treatment.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-lg font-medium text-brand-charcoal">{formatPrice(treatment.price, treatment.currency)}</span>
                              <Link to={`/treatments/${treatment.id}`}>
                                <Button size="sm" className={`${colors.button} text-white`}>Read More</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Booking Section */}
        <section className="py-12 bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif mb-3 font-semibold text-white">Ready to Book Your Treatment?</h2>
              <p className="mb-6 text-white/90">Schedule your appointment today and take the first step towards healthier, more radiant skin.</p>
              <Button className="bg-white text-brand-slate-blue hover:bg-white/90 font-medium">Book Now</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Treatments;
