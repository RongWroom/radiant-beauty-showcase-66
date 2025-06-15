
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Shield, Sparkles, Target, Award, Users, CheckCircle, Star } from 'lucide-react';

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

        {/* Mission Statement - Full Width */}
        <section className="bg-gradient-to-r from-brand-slate-blue via-brand-slate-blue-light to-brand-slate-blue py-16 md:py-20">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                At STW Aesthetic Clinic, your safety and satisfaction are our top priorities.
                Our experienced and certified technicians will guide you through every step of your treatment,
                ensuring a seamless and enjoyable experience that enhances your natural beauty.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <blockquote className="text-2xl font-serif italic text-white">
                  "Enhancing natural beauty through expert care and personalized treatments"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-off-white/50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-brand-slate-blue/10 rounded-full mb-6">
                <Award className="w-8 h-8 text-brand-slate-blue" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide everything we do at STW Aesthetic Clinic
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">
                    Personalized Care
                  </h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Our skilled practitioners will tailor a treatment plan to address your specific beauty goals and individual needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-silver to-brand-silver-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-brand-charcoal" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">
                    Safety First
                  </h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    We use only the highest quality products and follow strict safety protocols to ensure your wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50 md:col-span-2 lg:col-span-1">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">
                    Natural Results
                  </h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Our treatments enhance your natural features, giving you a refreshed and revitalized appearance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-brand-light-gray via-brand-off-white to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center justify-center p-3 bg-brand-slate-blue/10 rounded-full mb-6">
                  <Users className="w-8 h-8 text-brand-slate-blue" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-6">
                  Why Choose STW Aesthetic Clinic?
                </h2>
                <p className="text-lg text-brand-gray-600 mb-8 leading-relaxed">
                  With years of experience and hundreds of satisfied clients, we've built our reputation 
                  on delivering exceptional results in a comfortable, professional environment.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-slate-blue rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-charcoal mb-1">Expert Practitioners</h4>
                      <p className="text-brand-gray-600">Fully qualified and experienced aesthetic professionals</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-slate-blue rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-charcoal mb-1">Premium Products</h4>
                      <p className="text-brand-gray-600">We use only the finest, clinically-proven treatments</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-slate-blue rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-charcoal mb-1">Aftercare Support</h4>
                      <p className="text-brand-gray-600">Comprehensive follow-up care and guidance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-blue/10 to-brand-silver/10 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <Star className="w-8 h-8 text-yellow-500 fill-current" />
                      <Star className="w-8 h-8 text-yellow-500 fill-current" />
                      <Star className="w-8 h-8 text-yellow-500 fill-current" />
                      <Star className="w-8 h-8 text-yellow-500 fill-current" />
                      <Star className="w-8 h-8 text-yellow-500 fill-current" />
                    </div>
                    <blockquote className="text-lg italic text-brand-gray-600 mb-6">
                      "The team at STW made me feel so comfortable and the results exceeded my expectations. 
                      I finally have the confidence I've been looking for!"
                    </blockquote>
                    <div className="font-semibold text-brand-charcoal">Sarah M.</div>
                    <div className="text-brand-gray-600 text-sm">Verified Client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-brand-slate-blue via-brand-slate-blue-light to-brand-slate-blue">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80 font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">5+</div>
                <div className="text-white/80 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
                <div className="text-white/80 font-medium">Treatment Types</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-white/80 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-off-white/30 to-white">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6">
                Ready to Transform Your Look?
              </h2>
              <p className="text-xl text-brand-gray-600 mb-10 leading-relaxed">
                Join hundreds of satisfied clients who have discovered their confidence with STW Aesthetic Clinic.
                Book your consultation today and take the first step towards your beauty goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-lg py-4 px-10 shadow-lg hover:shadow-xl transition-all duration-300">
                  Book Your Consultation
                </Button>
                <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white text-lg py-4 px-10 transition-all duration-300">
                  Call Us Today
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
