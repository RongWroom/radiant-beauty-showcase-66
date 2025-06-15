
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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-16 md:py-24">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif mb-6 font-bold text-brand-charcoal">
                Contact Us
              </h1>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-xl md:text-2xl mb-8 font-light text-brand-gray-600 leading-relaxed">
                Ready to start your skincare journey? Get in touch with our expert team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section - 2 Column Layout with Blue Background */}
        <section className="py-20 md:py-28 bg-brand-slate-blue">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column - Get In Touch */}
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Get In Touch</h2>
                  <div className="flex justify-start mb-6">
                    <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-silver to-white"></span>
                  </div>
                  <p className="text-xl text-white/90 mb-12 leading-relaxed">
                    We're here to help you on your journey to beautiful, healthy skin. Contact us today to schedule your consultation.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                      <p className="text-white/90 leading-relaxed">
                        123 Beauty Street<br />
                        Downtown District<br />
                        City, ST 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                      <p className="text-white/90">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                      <p className="text-white/90">info@stwclinic.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Hours</h3>
                      <p className="text-white/90 leading-relaxed">
                        Monday - Friday: 9AM - 7PM<br />
                        Saturday: 10AM - 5PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <Card className="border-0 shadow-xl bg-white">
                  <CardContent className="p-10">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-charcoal mb-4">Book Your Consultation</h2>
                      <div className="flex justify-center mb-4">
                        <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
                      </div>
                      <p className="text-lg text-brand-gray-600">
                        Take the first step towards healthier, more beautiful skin
                      </p>
                    </div>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-charcoal mb-2">First Name</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base" 
                            placeholder="Enter your first name" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-charcoal mb-2">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base" 
                            placeholder="Enter your last name" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base" 
                          placeholder="Enter your email" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Phone</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base" 
                          placeholder="Enter your phone number" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Service of Interest</label>
                        <select className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base">
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
                          className="w-full px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 resize-none text-base" 
                          placeholder="Tell us about your skincare goals or any questions you have"
                        ></textarea>
                      </div>
                      <div className="text-center pt-4">
                        <Button className="bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white font-semibold px-10 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
