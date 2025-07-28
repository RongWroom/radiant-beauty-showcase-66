import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactFaq from '@/components/contact/ContactFaq';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

    } catch (error: any) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section - Mobile Optimized */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 font-bold text-brand-charcoal">
                Contact Us
              </h1>
              <div className="flex justify-center mb-4 sm:mb-6">
                <span className="block h-0.5 sm:h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-light text-brand-gray-600 leading-relaxed">
                Ready to start your skincare journey? Get in touch with our expert team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile Optimized 2 Column Layout */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-brand-slate-blue">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              
              {/* Left Column - Get In Touch - Mobile Optimized */}
              <div className="order-2 lg:order-1">
                <div className="mb-8 sm:mb-12 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">Get In Touch</h2>
                  <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                    <span className="block h-0.5 sm:h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-brand-silver to-white"></span>
                  </div>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
                    We're here to help you on your journey to beautiful, healthy skin. Contact us today to schedule your consultation.
                  </p>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-3 sm:space-x-4 px-4 sm:px-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Location</h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        The Treatment Rooms<br />
                        110 Front Street<br />
                        Stanley, United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 px-4 sm:px-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Phone</h3>
                      <p className="text-sm sm:text-base text-white/90">01207 239983</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 px-4 sm:px-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Email</h3>
                      <p className="text-sm sm:text-base text-white/90">sharon@stwaestheticclinic.co.uk</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 px-4 sm:px-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-brand-silver mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Hours</h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                        Tuesday - Thursday: 10AM - 6PM<br />
                        Saturday: Closed<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form - Mobile Optimized */}
              <div className="order-1 lg:order-2">
                <Card className="border-0 shadow-xl bg-white mx-4 sm:mx-0">
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-brand-charcoal mb-3 sm:mb-4">Book Your Consultation</h2>
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <span className="block h-0.5 sm:h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
                      </div>
                      <p className="text-base sm:text-lg text-brand-gray-600">
                        Take the first step towards healthier, more beautiful skin
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-charcoal mb-2">First Name *</label>
                          <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base min-h-[48px]" 
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-charcoal mb-2">Last Name *</label>
                          <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base min-h-[48px]" 
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Email *</label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base min-h-[48px]" 
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Phone *</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base min-h-[48px]" 
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Service of Interest *</label>
                        <select 
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 text-base min-h-[48px]"
                          required
                        >
                          <option value="">Select a service</option>
                          <option value="Facial Treatments">Facial Treatments</option>
                          <option value="Laser Hair Removal">Laser Hair Removal</option>
                          <option value="Body Sculpting">Body Sculpting</option>
                          <option value="Free Consultation">Free Consultation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">Message *</label>
                        <textarea 
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 border-2 border-brand-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-slate-blue focus:border-transparent transition-all duration-200 resize-none text-base min-h-[120px]" 
                          placeholder="Tell us about your skincare goals or any questions you have"
                          required
                        ></textarea>
                      </div>
                      <div className="text-center pt-2 sm:pt-4">
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue text-white font-semibold px-8 sm:px-10 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]" 
                          size="lg"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </div>
                    </form>
                    
                    {/* Privacy Notice */}
                    <div className="text-center mt-6 pt-4 border-t border-brand-gray-200">
                      <p className="text-xs text-brand-gray-500">
                        By submitting this form, you agree to our{' '}
                        <Link to="/privacy" className="text-brand-slate-blue hover:underline">
                          Privacy Policy
                        </Link>
                        {' '}and{' '}
                        <Link to="/terms" className="text-brand-slate-blue hover:underline">
                          Terms of Service
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ContactFaq />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
