
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SEOBreadcrumb from '@/components/SEOBreadcrumb';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTreatment, useTreatments } from '@/hooks/useTreatments';
import { ArrowLeft, Clock, MapPin, Star, Phone, Calendar, Loader2 } from 'lucide-react';

const TreatmentDetail = () => {
  const { id } = useParams();
  const treatmentId = parseInt(id || '0');
  const { data: treatment, isLoading, isError } = useTreatment(treatmentId);
  const { data: allTreatments } = useTreatments();

  const formatPrice = (price: number, currency: string | null) => {
    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    return `${currencySymbol}${price.toFixed(0)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray">
          <Loader2 className="h-8 w-8 animate-spin text-brand-slate-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !treatment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4 text-brand-charcoal">Treatment Not Found</h1>
            <Link to="/treatments">
              <Button className="bg-brand-slate-blue hover:bg-brand-slate-blue-light">Back to Treatments</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related treatments (excluding current one)
  const relatedTreatments = allTreatments
    ?.filter(t => t.id !== treatment.id && t.category === treatment.category)
    ?.slice(0, 2) || [];

  const pageItems = [
    { label: 'Home', href: '/' },
    { label: 'Treatments', href: '/treatments' },
    { label: treatment.name }
  ];

  const schemaItems = [
    { name: 'Home', url: 'https://www.stwaestheticclinic.co.uk', position: 1 },
    { name: 'Treatments', url: 'https://www.stwaestheticclinic.co.uk/treatments', position: 2 },
    { name: treatment.name, url: `https://www.stwaestheticclinic.co.uk/treatments/${treatment.id}`, position: 3 }
  ];

  return (
    <>
      <SEO
        title={`${treatment.name} | Professional Aesthetic Treatment | STW Aesthetic Clinic`}
        description={`${treatment.description} Professional ${treatment.name} treatment at STW Aesthetic Clinic in Stanley, County Durham. Expert technicians, proven results.`}
        keywords={`${treatment.name}, ${treatment.category}, aesthetic treatment Stanley, professional treatment, non-surgical, beauty treatment County Durham, STW Aesthetic Clinic`}
        url={`https://www.stwaestheticclinic.co.uk/treatments/${treatment.id}`}
      />
      <ServiceSchema service={treatment} />
      <BreadcrumbSchema items={schemaItems} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-slate-blue/10 via-brand-silver/20 to-brand-light-gray py-12">
          <div className="container-custom">
            <SEOBreadcrumb items={pageItems} />
            <div className="flex items-center gap-4 mb-6">
              <Link to="/treatments">
                <Button variant="outline" size="sm" className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Treatments
                </Button>
              </Link>
              {treatment.featured && (
                <Badge className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white shadow-lg">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Most Popular
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-serif mb-6 text-brand-charcoal">{treatment.name}</h1>
                <p className="text-lg mb-8 text-brand-gray-600">
                  {treatment.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-brand-silver/30">
                    <Clock className="w-5 h-5 text-brand-slate-blue" />
                    <span className="text-brand-charcoal">{treatment.duration_minutes ? `${treatment.duration_minutes} minutes` : '60-90 minutes'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-brand-silver/30">
                    <MapPin className="w-5 h-5 text-brand-slate-blue" />
                    <span className="text-brand-charcoal">In-clinic treatment</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-transparent">{formatPrice(treatment.price, treatment.currency)}</span>
                  <Link to={`/treatments/${treatment.id}/book`}>
                    <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark text-white shadow-lg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Treatment
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-blue/20 to-brand-silver/30 rounded-lg transform rotate-3"></div>
                <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="relative w-full h-96 object-cover rounded-lg shadow-xl border-2 border-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Style Information Grid */}
        <section className="py-16 bg-gradient-to-b from-brand-white to-brand-off-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Treatment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large feature card */}
              <Card className="md:col-span-2 bg-gradient-to-br from-white to-brand-silver/5 border-brand-silver/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-brand-charcoal">What to Expect</h3>
                  <div className="space-y-4">
                    <p className="text-brand-gray-600">
                      Our {treatment.name.toLowerCase()} treatment is designed to deliver exceptional results 
                      through advanced techniques and premium products. During your session, our expert 
                      practitioners will customize the treatment to your specific skin needs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 p-4 rounded-lg border border-brand-silver/30">
                        <h4 className="font-medium mb-2 text-brand-charcoal">Before Treatment</h4>
                        <p className="text-sm text-brand-gray-600">Consultation and skin analysis</p>
                      </div>
                      <div className="bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 p-4 rounded-lg border border-brand-silver/30">
                        <h4 className="font-medium mb-2 text-brand-charcoal">During Treatment</h4>
                        <p className="text-sm text-brand-gray-600">Relaxing and professional care</p>
                      </div>
                      <div className="bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 p-4 rounded-lg border border-brand-silver/30">
                        <h4 className="font-medium mb-2 text-brand-charcoal">After Treatment</h4>
                        <p className="text-sm text-brand-gray-600">Aftercare guidance and tips</p>
                      </div>
                      <div className="bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/20 p-4 rounded-lg border border-brand-silver/30">
                        <h4 className="font-medium mb-2 text-brand-charcoal">Results</h4>
                        <p className="text-sm text-brand-gray-600">Visible improvements within days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits card */}
              <Card className="bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-white">Key Benefits</h3>
                  <ul className="space-y-3 text-white">
                    {treatment.benefits && treatment.benefits.length > 0 ? (
                      treatment.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-brand-silver rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-brand-silver rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Improves skin texture and tone</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-brand-silver rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Reduces signs of aging</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-brand-silver rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Enhances natural radiance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-brand-silver rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Long-lasting results</span>
                        </li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Pricing card */}
              <Card className="bg-gradient-to-br from-brand-silver/20 to-white border-brand-silver/30 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-brand-charcoal">Treatment Pricing</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-transparent">{formatPrice(treatment.price, treatment.currency)}</span>
                      <p className="text-sm text-brand-gray-600 mt-1">Single session</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm bg-brand-slate-blue/5 p-3 rounded-lg">
                        <span className="text-brand-gray-600">Consultation</span>
                        <span className="text-brand-charcoal font-medium">Included</span>
                      </div>
                      <div className="flex justify-between text-sm bg-brand-slate-blue/5 p-3 rounded-lg">
                        <span className="text-brand-gray-600">Aftercare kit</span>
                        <span className="text-brand-charcoal font-medium">Included</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact card */}
              <Card className="md:col-span-2 bg-gradient-to-br from-white to-brand-light-gray border-brand-silver/30 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-brand-charcoal">Ready to Book?</h3>
                  <p className="text-brand-gray-600 mb-6">
                    Contact us today to schedule your {treatment.name.toLowerCase()} treatment. 
                    Our expert team is here to help you achieve your skincare goals.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:01207239983">
                      <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark text-white shadow-lg">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                    <Link to={`/treatments/${treatment.id}/book`}>
                      <Button variant="outline" className="border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Online
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Treatments */}
        {relatedTreatments.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-brand-off-white to-brand-light-gray">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-brand-charcoal">Related Treatments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {relatedTreatments.map(relatedTreatment => (
                  <Card key={relatedTreatment.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-brand-silver/30 bg-gradient-to-br from-white to-brand-silver/5">
                    <div className="relative h-48">
                      <img src={relatedTreatment.image_url || '/placeholder.svg'} alt={relatedTreatment.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-blue/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-medium text-brand-charcoal">{relatedTreatment.name}</h3>
                      <p className="text-sm text-brand-gray-600 line-clamp-2 mt-1 mb-3">
                        {relatedTreatment.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-medium bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light bg-clip-text text-transparent">{formatPrice(relatedTreatment.price, relatedTreatment.currency)}</span>
                        <Link to={`/treatments/${relatedTreatment.id}`}>
                          <Button size="sm" className="bg-brand-slate-blue hover:bg-brand-slate-blue-light">Read More</Button>
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
      
      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-silver/30 shadow-2xl z-50 px-4 py-3">
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a href="tel:01207239983" className="flex-1">
            <Button className="w-full bg-white border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
          </a>
          <Link to={`/treatments/${treatment.id}/book`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white shadow-lg">
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default TreatmentDetail;
