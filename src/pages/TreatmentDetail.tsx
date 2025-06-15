
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !treatment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Treatment Not Found</h1>
            <Link to="/treatments">
              <Button>Back to Treatments</Button>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-skin-lightgreen py-12">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/treatments">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Treatments
                </Button>
              </Link>
              {treatment.featured && (
                <Badge className="bg-skin-green text-black">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-serif mb-6">{treatment.name}</h1>
                <p className="text-lg mb-8 text-gray-600">
                  {treatment.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-skin-teal" />
                    <span>{treatment.duration_minutes ? `${treatment.duration_minutes} minutes` : '60-90 minutes'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-skin-teal" />
                    <span>In-clinic treatment</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-skin-teal">{formatPrice(treatment.price, treatment.currency)}</span>
                  <Button className="hover:bg-opacity-90 bg-skin-teal">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Treatment
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src={treatment.image_url || '/placeholder.svg'} alt={treatment.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Style Information Grid */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Treatment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large feature card */}
              <Card className="md:col-span-2 bg-gray-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif mb-4 text-gray-900">What to Expect</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Our {treatment.name.toLowerCase()} treatment is designed to deliver exceptional results 
                      through advanced techniques and premium products. During your session, our expert 
                      practitioners will customize the treatment to your specific skin needs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2 text-gray-900">Before Treatment</h4>
                        <p className="text-sm text-gray-600">Consultation and skin analysis</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2 text-gray-900">During Treatment</h4>
                        <p className="text-sm text-gray-600">Relaxing and professional care</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2 text-gray-900">After Treatment</h4>
                        <p className="text-sm text-gray-600">Aftercare guidance and tips</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2 text-gray-900">Results</h4>
                        <p className="text-sm text-gray-600">Visible improvements within days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits card */}
              <Card className="bg-skin-green">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-black">Key Benefits</h3>
                  <ul className="space-y-3 text-black">
                    {treatment.benefits && treatment.benefits.length > 0 ? (
                      treatment.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Improves skin texture and tone</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Reduces signs of aging</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Enhances natural radiance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">Long-lasting results</span>
                        </li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Pricing card */}
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-gray-900">Treatment Pricing</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-skin-teal">{formatPrice(treatment.price, treatment.currency)}</span>
                      <p className="text-sm text-gray-600 mt-1">Single session</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Consultation</span>
                        <span className="text-gray-900">Included</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Aftercare kit</span>
                        <span className="text-gray-900">Included</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact card */}
              <Card className="md:col-span-2 bg-white border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-4 text-gray-900">Ready to Book?</h3>
                  <p className="text-gray-700 mb-6">
                    Contact us today to schedule your {treatment.name.toLowerCase()} treatment. 
                    Our expert team is here to help you achieve your skincare goals.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-skin-green hover:bg-opacity-90 text-black">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Online
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Treatments */}
        {relatedTreatments.length > 0 && (
          <section className="py-16 bg-skin-gray">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Related Treatments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {relatedTreatments.map(relatedTreatment => (
                  <Card key={relatedTreatment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img src={relatedTreatment.image_url || '/placeholder.svg'} alt={relatedTreatment.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-medium">{relatedTreatment.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
                        {relatedTreatment.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-medium">{formatPrice(relatedTreatment.price, relatedTreatment.currency)}</span>
                        <Link to={`/treatments/${relatedTreatment.id}`}>
                          <Button size="sm">Read More</Button>
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

export default TreatmentDetail;
