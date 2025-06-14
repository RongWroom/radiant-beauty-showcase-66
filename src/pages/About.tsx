import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Shield, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Image - Updated for fresh look */}
        <section className="py-16 md:py-24 bg-brand-warm-ivory animate-fade-in">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <h1 className="text-3xl md:text-5xl font-serif mb-3 font-bold text-hierarchy-primary">
                  Welcome to
                  <br />
                  STW Aesthetic Clinic
                </h1>
                {/* Decorative Rose Gold Line */}
                <div className="flex mb-6">
                  <span className="block h-1 w-24 rounded-full bg-brand-rose-gold"></span>
                </div>
                <p className="text-lg mb-8 text-hierarchy-secondary">
                  <span className="bg-brand-rose-gold/30 px-2 py-0.5 rounded font-medium text-brand-charcoal">
                    Non-Surgical Beauty Treatments
                  </span>{" "}
                  in County Durham
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-brand-plum hover:bg-brand-plum-light text-white">
                    Book a Consultation
                  </Button>
                  <Button variant="outline" className="border-brand-plum text-brand-plum hover:bg-brand-plum hover:text-white">
                    View Our Services
                  </Button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <AspectRatio ratio={4 / 3}>
                  <img src="/lovable-uploads/8ba11e7a-85dd-4fad-8b15-798fdcfedda6.png" alt="STW Aesthetic Clinic Professional" className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission - Enhanced with better contrast */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-charcoal font-bold">Our Mission</h2>
              <div className="flex justify-center mb-8">
                <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
              </div>
              <p className="text-xl leading-relaxed text-brand-warm-gray-600 max-w-3xl mx-auto">
                At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. 
                Our experienced and certified technicians will guide you through every step of your treatment, 
                ensuring a seamless and enjoyable experience that enhances your natural beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section - Changed background to yellow */}
        <section className="py-20 bg-brand-warm-ivory">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-charcoal font-bold">Our Values</h2>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
              </div>
              <p className="text-lg text-brand-warm-gray-600 max-w-2xl mx-auto">
                Three core principles that guide everything we do at STW Aesthetic Clinic
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-plum p-6 mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Personalized Care</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, 
                    ensuring optimal results that enhance your natural beauty.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-rose-gold p-6 mb-6 shadow-lg">
                    <Shield className="w-10 h-10 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Comfort & Relaxation</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    Sit back, relax, and let our friendly team take care of you. We prioritize your comfort 
                    throughout every step of your treatment journey.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-plum p-6 mb-6 shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-charcoal font-semibold">Natural Results</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    Our treatments will enhance your natural features, giving you a refreshed and revitalised appearance 
                    that radiates youthfulness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Commitment - Simple text section without box */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-brand-charcoal font-bold">Our Commitment</h2>
              <div className="flex justify-center mb-8">
                <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
              </div>
              <blockquote className="text-xl md:text-2xl italic mb-10 text-brand-warm-gray-600 leading-relaxed">
                "Contact us today and rediscover the confidence that comes with having beautiful, rejuvenated skin."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Call to Action - Final section with strong contrast */}
        <section className="py-20 bg-brand-plum">
          <div className="container-custom text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white font-bold">
              Ready to Transform Your Look?
            </h2>
            <div className="flex justify-center mb-8">
              <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
            </div>
            <p className="text-xl mb-10 text-white/90 font-medium leading-relaxed max-w-3xl mx-auto">
              Experience the STW difference with our professional, personalized aesthetic treatments. 
              Join hundreds of satisfied clients who have discovered their confidence with us.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="accent"
                className="bg-brand-rose-gold text-brand-charcoal hover:bg-brand-rose-gold-light font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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
