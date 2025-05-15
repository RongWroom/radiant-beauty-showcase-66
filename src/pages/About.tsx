
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Circle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Image */}
        <section className="py-16 md:py-24 bg-skin-lightgreen">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <h1 className="text-3xl md:text-5xl font-serif mb-6">Welcome to STW Aesthetic Clinic</h1>
                <p className="text-lg mb-8">
                  Non-Surgical Beauty Treatments in County Durham
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-skin-green hover:bg-opacity-90">
                    Book a Consultation
                  </Button>
                  <Button variant="outline">
                    View Our Services
                  </Button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="/lovable-uploads/8ba11e7a-85dd-4fad-8b15-798fdcfedda6.png" 
                    alt="STW Aesthetic Clinic Professional" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif mb-6">Our Mission</h2>
              <p className="text-lg mb-8">
                At STW Aesthetic Clinic, your safety and satisfaction are our top priorities. 
                Our experienced and certified technicians will guide you through every step of your treatment, 
                ensuring a seamless and enjoyable experience.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-skin-gray">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-skin-green p-4 mb-4">
                    <Circle className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">Personalized Care</h3>
                  <p className="text-muted-foreground">
                    Our skilled practitioners will tailor a treatment plan to address your specific beauty goals, 
                    ensuring optimal results that enhance your natural beauty.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-skin-teal p-4 mb-4">
                    <Circle className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">Comfort & Relaxation</h3>
                  <p className="text-muted-foreground">
                    Sit back, relax, and let our friendly team take care of you. We prioritize your comfort 
                    throughout every step of your treatment journey.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-skin-yellow p-4 mb-4">
                    <Circle className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">Natural Results</h3>
                  <p className="text-muted-foreground">
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
            <div className="bg-skin-lightgreen p-8 md:p-12 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-serif mb-8">Our Commitment</h2>
              <p className="text-lg italic mb-8">
                "Contact us today and rediscover the confidence that comes with having beautiful, rejuvenated skin."
              </p>
              <Button className="bg-skin-green hover:bg-opacity-90">
                Book Your Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-skin-teal text-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">Ready to Transform Your Look?</h2>
            <p className="text-lg mb-8">
              Experience the STW difference with our professional, personalized aesthetic treatments.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-skin-teal hover:bg-gray-100">
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
