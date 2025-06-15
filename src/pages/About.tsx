
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Shield, Sparkles, Target, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-off-white via-white to-brand-light-gray pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-brand-slate-blue rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-brand-silver rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-brand-slate-blue-light rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-4 text-brand-charcoal">
                Welcome to <br />
                <span className="text-brand-slate-blue font-semibold">STW Aesthetic Clinic</span>
              </h1>
              <div className="flex mb-6">
                <span className="block h-1 w-20 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
              </div>
              <p className="text-lg md:text-xl mb-8 text-brand-gray-600 max-w-xl">
                <span className="bg-gradient-to-r from-brand-silver/40 to-brand-slate-blue/20 px-2 py-0.5 rounded font-medium text-brand-charcoal">
                  Non-Surgical Beauty Treatments
                </span>{" "}
                in County Durham
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-lg py-3 px-8 shadow-lg">
                  Book a Consultation
                </Button>
                <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-gradient-to-r hover:from-brand-slate-blue hover:to-brand-slate-blue-light hover:text-white text-lg py-3 px-8 transition-all duration-300">
                  View Our Services
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white ring-1 ring-brand-silver/20">
                <AspectRatio ratio={4 / 3}>
                  <img src="/lovable-uploads/8ba11e7a-85dd-4fad-8b15-798fdcfedda6.png" alt="STW Aesthetic Clinic Professional" className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Branch Layout - Mission & Values */}
        <section className="bg-gradient-to-b from-white via-brand-off-white/30 to-white py-20 md:py-32 relative overflow-hidden">
          {/* Enhanced background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-brand-slate-blue/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-l from-brand-silver/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-brand-slate-blue/8 to-brand-silver/8 rounded-full blur-2xl"></div>
          </div>
          
          <div className="container-custom relative">
            
            {/* Enhanced Central Vertical Line with gradient */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-silver via-brand-slate-blue to-brand-silver transform -translate-x-px hidden lg:block shadow-sm"></div>
            
            {/* Enhanced Decorative Elements on the Line */}
            <div className="absolute left-1/2 top-1/4 w-4 h-4 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full transform -translate-x-1/2 hidden lg:block shadow-lg ring-2 ring-white"></div>
            <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-gradient-to-br from-brand-silver to-brand-silver-light rounded-full transform -translate-x-1/2 hidden lg:block shadow-lg ring-2 ring-white"></div>
            <div className="absolute left-1/2 top-3/4 w-4 h-4 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full transform -translate-x-1/2 hidden lg:block shadow-lg ring-2 ring-white"></div>

            <div className="space-y-24 md:space-y-32">
              
              {/* Mission - Left Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="lg:pr-16 order-1 relative">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-brand-slate-blue/5 to-transparent rounded-3xl blur-xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className="rounded-full bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light p-4 mr-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal">Our Mission</h2>
                    </div>
                    <div className="flex mb-6">
                      <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver" />
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-brand-gray-600 mb-8">
                      At STW Aesthetic Clinic, your safety and satisfaction are our top priorities.
                      Our experienced and certified technicians will guide you through every step of your treatment,
                      ensuring a seamless and enjoyable experience that enhances your natural beauty.
                    </p>
                    <Card className="border border-brand-silver/50 bg-gradient-to-br from-white via-brand-off-white/50 to-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <blockquote className="text-brand-slate-blue font-medium italic">
                          "Enhancing natural beauty through expert care and personalized treatments"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="order-2 lg:pl-16">
                  {/* Decorative element for balance */}
                  <div className="hidden lg:block opacity-20">
                    <div className="w-32 h-32 bg-gradient-to-br from-brand-silver to-brand-slate-blue rounded-full blur-2xl"></div>
                  </div>
                </div>
              </div>

              {/* Values - Right Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="order-2 lg:order-1 lg:pr-16">
                  {/* Decorative element for balance */}
                  <div className="hidden lg:block opacity-20">
                    <div className="w-40 h-40 bg-gradient-to-br from-brand-slate-blue to-brand-silver rounded-full blur-3xl ml-auto"></div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 lg:pl-16 relative">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-8 bg-gradient-to-l from-brand-silver/8 to-transparent rounded-3xl blur-xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className="rounded-full bg-gradient-to-br from-brand-silver to-brand-silver-light p-4 mr-4 shadow-lg">
                        <Award className="w-8 h-8 text-brand-charcoal" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal">Our Values</h2>
                    </div>
                    <div className="flex mb-8">
                      <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-silver to-brand-slate-blue" />
                    </div>
                    
                    <div className="space-y-6">
                      <Card className="border border-brand-silver/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-brand-off-white/30 hover:-translate-y-1">
                        <CardContent className="p-6 flex items-start">
                          <div className="rounded-full bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light p-3 mr-4 flex-shrink-0 shadow-md">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl mb-2 text-brand-charcoal font-semibold">Personalized Care</h3>
                            <p className="text-brand-gray-600 leading-relaxed">
                              Our skilled practitioners will tailor a treatment plan to address your specific beauty goals.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-brand-silver/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-brand-off-white/30 hover:-translate-y-1">
                        <CardContent className="p-6 flex items-start">
                          <div className="rounded-full bg-gradient-to-br from-brand-silver to-brand-silver-light p-3 mr-4 flex-shrink-0 shadow-md">
                            <Shield className="w-6 h-6 text-brand-charcoal" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl mb-2 text-brand-charcoal font-semibold">Comfort & Relaxation</h3>
                            <p className="text-brand-gray-600 leading-relaxed">
                              Sit back, relax, and let our friendly team take care of you throughout your treatment journey.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-brand-silver/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-brand-off-white/30 hover:-translate-y-1">
                        <CardContent className="p-6 flex items-start">
                          <div className="rounded-full bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light p-3 mr-4 flex-shrink-0 shadow-md">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-serif text-xl mb-2 text-brand-charcoal font-semibold">Natural Results</h3>
                            <p className="text-brand-gray-600 leading-relaxed">
                              Our treatments enhance your natural features, giving you a refreshed and revitalised appearance.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Commitment - Left Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="lg:pr-16 order-1 relative">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-brand-slate-blue/5 to-transparent rounded-3xl blur-xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className="rounded-full bg-gradient-to-br from-brand-silver to-brand-silver-light p-4 mr-4 shadow-lg">
                        <Users className="w-8 h-8 text-brand-charcoal" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal">Our Commitment</h2>
                    </div>
                    <div className="flex mb-6">
                      <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-silver to-brand-slate-blue" />
                    </div>
                    <blockquote className="text-lg md:text-xl italic leading-relaxed text-brand-gray-600 mb-8">
                      "Contact us today and rediscover the confidence that comes with having beautiful, rejuvenated skin."
                    </blockquote>
                    <div className="bg-gradient-to-r from-brand-slate-blue/10 via-brand-silver/20 to-brand-slate-blue/10 p-6 rounded-xl shadow-inner">
                      <p className="text-brand-charcoal font-medium">
                        Join hundreds of satisfied clients who have discovered their confidence with STW Aesthetic Clinic.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order-2 lg:pl-16">
                  {/* Decorative element for balance */}
                  <div className="hidden lg:block opacity-20">
                    <div className="w-36 h-36 bg-gradient-to-br from-brand-slate-blue to-brand-silver rounded-full blur-2xl"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="bg-gradient-to-r from-brand-slate-blue via-brand-slate-blue-light to-brand-slate-blue py-16 md:py-20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-silver rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-xl"></div>
          </div>
          
          <div className="container-custom text-center max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              Ready to Transform Your Look?
            </h2>
            <div className="flex justify-center mb-8">
              <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-white to-brand-silver" />
            </div>
            <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Experience the STW difference with our professional, personalized aesthetic treatments.
              Join hundreds of satisfied clients who have discovered their confidence with us.
            </p>
            <div className="flex justify-center">
              <Button
                variant="accent"
                className="bg-gradient-to-r from-white to-brand-silver text-brand-charcoal hover:from-brand-silver hover:to-white font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
