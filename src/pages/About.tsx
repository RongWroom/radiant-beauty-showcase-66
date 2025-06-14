import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Shield, Sparkles } from 'lucide-react';
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Image */}
        <section className="py-16 md:py-24 bg-brand-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <h1 className="text-3xl md:text-5xl font-serif mb-6 text-hierarchy-primary">Welcome to 
STW Aesthetic Clinic</h1>
                <p className="text-lg mb-8 text-hierarchy-secondary">
                  Non-Surgical Beauty Treatments in County Durham
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-brand-sage hover:bg-brand-sage-dark text-white">
                    Book a Consultation
                  </Button>
                  <Button variant="outline">
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

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-hierarchy-primary">Our Mission</h2>
              <p className="text-lg mb-8 text-hierarchy-secondary">
                At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. 
                Our experienced and certified technicians will guide you through every step of your treatment, 
                ensuring a seamless and enjoyable experience.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-brand-neutral-100">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-12 text-center text-hierarchy-primary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-sage p-4 mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-hierarchy-primary">Personalized Care</h3>
                  <p className="text-hierarchy-secondary">
                    Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, 
                    ensuring optimal results that enhance your natural beauty.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-lime p-4 mb-4">
                    <Shield className="w-8 h-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-hierarchy-primary">Comfort & Relaxation</h3>
                  <p className="text-hierarchy-secondary">
                    Sit back, relax, and let our friendly team take care of you. We prioritize your comfort 
                    throughout every step of your treatment journey.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-cream p-4 mb-4">
                    <Sparkles className="w-8 h-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-xl mb-3 text-hierarchy-primary">Natural Results</h3>
                  <p className="text-hierarchy-secondary">
                    Our treatments will enhance your natural features, giving you a refreshed and revitalised appearance 
                    that radiates youthfulness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="bg-brand-cream p-8 md:p-12 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-hierarchy-primary">Our Commitment</h2>
              <p className="text-lg italic mb-8 text-hierarchy-secondary">
                "Contact us today and rediscover the confidence that comes with having beautiful, rejuvenated skin."
              </p>
              <Button className="bg-brand-sage hover:bg-brand-sage-dark text-white">
                Book Your Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-brand-sage text-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">Ready to Transform Your Look?</h2>
            <p className="text-lg mb-8 text-white/90">
              Experience the STW difference with our professional, personalized aesthetic treatments.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="accent" className="bg-brand-lime text-brand-neutral-900 hover:bg-brand-lime/90">
                Contact Us Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;