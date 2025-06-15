
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
        {/* Hero Section - Updated to match About/Products page styling */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 md:py-20 animate-fade-in">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-2 font-semibold text-brand-charcoal">
                Contact Us
              </h1>
              {/* Decorative Line */}
              <div className="flex justify-center mb-5">
                <span className="block h-1 w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-lg mb-6 font-medium text-brand-gray-600">
                Ready to start your skincare journey? Get in touch with our expert team to 
                <span className="px-2 py-0.5 rounded bg-brand-slate-blue/10 text-brand-slate-blue font-semibold ml-1">
                  book your consultation
                </span>{" "}
                or ask any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white text-lg py-3 px-8 shadow-lg">
                  Book Now
                </Button>
                <Button variant="outline" className="border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white text-lg py-3 px-8 transition-all duration-300">
                  Call Us
                </Button>
              </div>
            </div>
          </div>
          {/* Flowing gradient overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-silver/10 to-transparent"></div>
        </section>

        {/* Contact Information - Updated styling */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-off-white/50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-brand-slate-blue/10 rounded-full mb-6">
                <Phone className="w-8 h-8 text-brand-slate-blue" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6">Get In Touch</h2>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
                We're here to help you on your journey to beautiful, healthy skin
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Location</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    123 Beauty Street<br />
                    Downtown District<br />
                    City, ST 12345
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-silver to-brand-silver-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-brand-charcoal" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Phone</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-slate-blue to-brand-slate-blue-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Email</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    info@stwclinic.com
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-brand-off-white/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-silver to-brand-silver-light rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-brand-charcoal" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Hours</h3>
                  <p className="text-brand-gray-600 leading-relaxed">
                    Mon-Fri: 9AM-7PM<br />
                    Sat: 10AM-5PM<br />
                    Sun: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Updated styling */}
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-12">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-brand-slate-blue/10 rounded-full mb-6">
                      <Mail className="w-8 h-8 text-brand-slate-blue" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-6">Book Your Consultation</h2>
                    <div className="flex justify-center mb-6">
                      <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
                    </div>
                    <p className="text-xl text-brand-gray-600">
                      Take the first step towards healthier, more beautiful skin
                    </p>
                  </div>
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-3">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-lg" 
                          placeholder="Enter your first name" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-3">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-lg" 
                          placeholder="Enter your last name" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-3">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-lg" 
                        placeholder="Enter your email" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-3">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-lg" 
                        placeholder="Enter your phone number" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-3">Service of Interest</label>
                      <select className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-lg">
                        <option>Select a service</option>
                        <option>Facial Treatment</option>
                        <option>Anti-Aging Treatment</option>
                        <option>Skin Rejuvenation</option>
                        <option>Consultation Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-charcoal mb-3">Message</label>
                      <textarea 
                        rows={5} 
                        className="w-full px-5 py-4 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 resize-none text-lg" 
                        placeholder="Tell us about your skincare goals or any questions you have"
                      ></textarea>
                    </div>
                    <div className="text-center pt-6">
                      <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white font-semibold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
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
