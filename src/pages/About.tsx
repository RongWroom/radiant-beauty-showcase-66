
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Shield, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="bg-section-light pt-24 md:pt-32 pb-16 md:pb-24 relative">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-4 text-brand-charcoal">
                Welcome to <br />
                <span className="text-brand-slate-blue font-semibold">STW Aesthetic Clinic</span>
              </h1>
              <div className="flex mb-6">
                <span className="block h-1 w-20 rounded-full bg-brand-silver" />
              </div>
              <p className="text-lg md:text-xl mb-8 text-brand-gray-600 max-w-xl">
                <span className="bg-brand-silver/40 px-2 py-0.5 rounded font-medium text-brand-charcoal">
                  Non-Surgical Beauty Treatments
                </span>{" "}
                in County Durham
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-brand-slate-blue hover:bg-brand-slate-blue-light text-white text-lg py-3 px-8 shadow-lg">
                  Book a Consultation
                </Button>
                <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white text-lg py-3 px-8 transition-all duration-300">
                  View Our Services
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
                <AspectRatio ratio={4 / 3}>
                  <img src="/lovable-uploads/8ba11e7a-85dd-4fad-8b15-798fdcfedda6.png" alt="STW Aesthetic Clinic Professional" className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-white pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-charcoal">Our Mission</h2>
            <div className="flex justify-center mb-8">
              <span className="block h-1 w-16 rounded-full bg-brand-silver" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-brand-gray-600 max-w-3xl mx-auto">
              At STW Aesthetic Clinic, your safety and satisfaction are our top priorities.
              Our experienced and certified technicians will guide you through every step of your treatment,
              ensuring a seamless and enjoyable experience that enhances your natural beauty.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-section-light py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-charcoal">Our Values</h2>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-16 rounded-full bg-brand-silver" />
              </div>
              <p className="text-lg text-brand-gray-600 max-w-2xl mx-auto">
                Three core principles that guide everything we do at STW Aesthetic Clinic
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-brand-silver shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-slate-blue p-6 mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Personalized Care</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Our skilled practitioners will tailor a treatment plan to address your specific beauty goals,
                    ensuring optimal results that enhance your natural beauty.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-brand-silver shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-silver p-6 mb-6 shadow-lg">
                    <Shield className="w-10 h-10 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Comfort & Relaxation</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Sit back, relax, and let our friendly team take care of you. We prioritize your comfort
                    throughout every step of your treatment journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-brand-silver shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-slate-blue p-6 mb-6 shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Natural Results</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Our treatments will enhance your natural features, giving you a refreshed and revitalised appearance
                    that radiates youthfulness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="bg-white pt-16 md:pt-20 pb-8 md:pb-12">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-charcoal">Our Commitment</h2>
            <div className="flex justify-center mb-8">
              <span className="block h-1 w-16 rounded-full bg-brand-silver" />
            </div>
            <blockquote className="text-lg md:text-xl italic leading-relaxed text-brand-gray-600 max-w-3xl mx-auto">
              "Contact us today and rediscover the confidence that comes with having beautiful, rejuvenated skin."
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-brand-slate-blue py-16 md:py-20">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              Ready to Transform Your Look?
            </h2>
            <div className="flex justify-center mb-8">
              <span className="block h-1 w-16 rounded-full bg-brand-silver" />
            </div>
            <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Experience the STW difference with our professional, personalized aesthetic treatments.
              Join hundreds of satisfied clients who have discovered their confidence with us.
            </p>
            <div className="flex justify-center">
              <Button
                variant="accent"
                className="bg-brand-silver text-brand-charcoal hover:bg-brand-silver-light font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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
