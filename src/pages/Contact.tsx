
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
        <section className="bg-brand-neutral-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-6 text-hierarchy-primary">Contact Us</h1>
              <p className="text-lg mb-8 text-hierarchy-secondary">
                Ready to start your skincare journey? Get in touch with our expert team to book your consultation or ask any questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-brand-lime p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2 text-hierarchy-primary">Location</h3>
                  <p className="text-hierarchy-secondary">
                    123 Beauty Street<br />
                    Downtown District<br />
                    City, ST 12345
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-brand-lime p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2 text-hierarchy-primary">Phone</h3>
                  <p className="text-hierarchy-secondary">
                    (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-brand-lime p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2 text-hierarchy-primary">Email</h3>
                  <p className="text-hierarchy-secondary">
                    info@stwclinic.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-brand-lime p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-brand-neutral-900" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2 text-hierarchy-primary">Hours</h3>
                  <p className="text-hierarchy-secondary">
                    Mon-Fri: 9AM-7PM<br />
                    Sat: 10AM-5PM<br />
                    Sun: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif mb-6 text-center text-hierarchy-primary">Book Your Consultation</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-hierarchy-primary mb-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-hierarchy-primary mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hierarchy-primary mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hierarchy-primary mb-1">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hierarchy-primary mb-1">Service of Interest</label>
                      <select className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage">
                        <option>Select a service</option>
                        <option>Facial Treatment</option>
                        <option>Anti-Aging Treatment</option>
                        <option>Skin Rejuvenation</option>
                        <option>Consultation Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-hierarchy-primary mb-1">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-2 border border-brand-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage"
                        placeholder="Tell us about your skincare goals or any questions you have"
                      ></textarea>
                    </div>
                    <Button className="w-full" size="lg">
                      Send Message
                    </Button>
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
