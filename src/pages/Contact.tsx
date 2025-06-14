
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section - Updated to match About page styling */}
        <section className="py-16 md:py-24 bg-brand-warm-ivory animate-fade-in">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-3 font-bold text-hierarchy-primary">
                Contact Us
              </h1>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-24 rounded-full bg-brand-rose-gold"></span>
              </div>
              <p className="text-lg mb-8 text-hierarchy-secondary">
                Ready to start your skincare journey? Get in touch with our expert team to 
                <span className="bg-brand-rose-gold/30 px-2 py-0.5 rounded font-medium text-brand-charcoal ml-1">
                  book your consultation
                </span>{" "}
                or ask any questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information - Consistent spacing and styling */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-charcoal font-bold">Get In Touch</h2>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
              </div>
              <p className="text-lg text-brand-warm-gray-600 max-w-2xl mx-auto">
                We're here to help you on your journey to beautiful, healthy skin
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="rounded-full bg-brand-plum p-6 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-4 text-brand-charcoal font-semibold">Location</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    123 Beauty Street<br />
                    Downtown District<br />
                    City, ST 12345
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="rounded-full bg-brand-rose-gold p-6 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Phone className="h-8 w-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-4 text-brand-charcoal font-semibold">Phone</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="rounded-full bg-brand-plum p-6 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl mb-4 text-brand-charcoal font-semibold">Email</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    info@stwclinic.com
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="rounded-full bg-brand-rose-gold p-6 w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Clock className="h-8 w-8 text-brand-charcoal" />
                  </div>
                  <h3 className="font-serif text-xl mb-4 text-brand-charcoal font-semibold">Hours</h3>
                  <p className="text-brand-warm-gray-600 leading-relaxed">
                    Mon-Fri: 9AM-7PM<br />
                    Sat: 10AM-5PM<br />
                    Sun: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Updated styling */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4 text-brand-charcoal font-bold">Book Your Consultation</h2>
                    <div className="flex justify-center mb-4">
                      <span className="block h-1 w-16 rounded-full bg-brand-rose-gold"></span>
                    </div>
                    <p className="text-brand-warm-gray-600">
                      Take the first step towards healthier, more beautiful skin
                    </p>
                  </div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">Service of Interest</label>
                      <select className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200">
                        <option>Select a service</option>
                        <option>Facial Treatment</option>
                        <option>Anti-Aging Treatment</option>
                        <option>Skin Rejuvenation</option>
                        <option>Consultation Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-2">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border border-brand-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Tell us about your skincare goals or any questions you have"
                      ></textarea>
                    </div>
                    <div className="text-center pt-4">
                      <Button 
                        className="bg-brand-plum hover:bg-brand-plum-light text-white font-semibold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
