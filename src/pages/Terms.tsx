
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="Terms of Service - STW Aesthetic Clinic"
        description="Terms of Service for STW Aesthetic Clinic. Learn about our terms and conditions for using our services."
        url="https://www.stwaestheticclinic.co.uk/terms"
      />
      <Navbar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 md:py-20">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-4 font-bold text-brand-charcoal">
                Terms of Service
              </h1>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-lg text-brand-gray-600 leading-relaxed">
                Our terms and conditions for using our services and website.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              
              {/* Clinic Info Header */}
              <Card className="mb-12 border-0 bg-gradient-to-br from-brand-off-white to-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">STW Aesthetic Clinic</h2>
                  <div className="text-brand-gray-600 space-y-2">
                    <p><strong>The Treatment Rooms, 110 Front Street, Stanley, County Durham, DH9 0TY, United Kingdom</strong></p>
                    <p>Tel: +44 (0)1207 239 983 | Email: <a href="mailto:sharon@stwaestheticclinic.co.uk" className="text-brand-slate-blue hover:underline">sharon@stwaestheticclinic.co.uk</a></p>
                    <p className="text-sm">Last updated: <strong>3 July 2025</strong></p>
                  </div>
                </CardContent>
              </Card>

              {/* Terms of Service */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-brand-slate-blue/10 to-brand-silver/10 p-6 rounded-lg mb-8">
                  <p className="text-lg italic text-brand-gray-600">
                    These Terms of Service ("Terms") govern your use of <strong>stwaestheticclinic.co.uk</strong> and any appointment, product purchase or interaction with STW Aesthetic Clinic.
                  </p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">1. Acceptance of Terms</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      By accessing our website or booking a service, you agree to be bound by these Terms and our Privacy Policy. If you disagree, please do not use our site or services.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">2. Services & Medical Disclaimer</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      STW provides non‑surgical aesthetic treatments delivered by qualified practitioners. Information on this site is <strong>educational</strong> and <strong>not medical advice</strong>. Always consult a healthcare professional regarding any medical condition or treatment.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">3. Eligibility</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      You must be <strong>18 years or older</strong> (or have written parental consent) to book treatments.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">4. Bookings & Payments</h3>
                    <ul className="list-disc list-inside space-y-2 text-brand-gray-600">
                      <li>Appointments can be booked online, by phone or in person</li>
                      <li>A deposit may be required; full payment is due on or before the treatment date</li>
                      <li>Prices are displayed in GBP and may change without notice (unless you have a confirmed booking)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">5. Cancellations & Late Arrivals</h3>
                    <ul className="list-disc list-inside space-y-2 text-brand-gray-600">
                      <li><strong>48‑hour notice</strong> is required to cancel or reschedule. Deposits may be forfeited for late cancellations</li>
                      <li>Arriving more than <strong>15 minutes</strong> late may result in reduced treatment time or rescheduling</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">6. After‑Care & Results</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Treatment results vary. You agree to follow all pre‑ and post‑treatment instructions provided. Failure to do so may affect outcomes and void any complimentary retouch policy.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">7. Refunds</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Due to the personalised nature of aesthetic treatments, refunds are not offered for completed services. Retail products may be returned within <strong>14 days</strong> if unopened and in resaleable condition.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">8. Gift Vouchers & Promotions</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Vouchers are valid for <strong>12 months</strong> from issue and non‑transferable. Promotional offers cannot be combined unless stated.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">9. User Content & Reviews</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      If you submit testimonials or before/after photos, you grant STW a non‑exclusive, royalty‑free licence to display such content for marketing purposes (unless you withdraw consent).
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">10. Intellectual Property</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      All website content (text, graphics, logos, images) is owned by or licensed to STW. You may not reproduce or distribute it without written permission.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">11. Prohibited Conduct</h3>
                    <p className="text-brand-gray-600 mb-4">You agree not to:</p>
                    <ol className="list-decimal list-inside space-y-2 text-brand-gray-600">
                      <li>Use the site for unlawful purposes</li>
                      <li>Transmit malicious code</li>
                      <li>Harvest personal data of other users</li>
                      <li>Post defamatory or offensive content</li>
                    </ol>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">12. Limitation of Liability</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      To the fullest extent permitted by law, STW is not liable for indirect, incidental or consequential losses. Our total liability for any claim shall not exceed the amount you paid for the relevant service.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">13. Indemnity</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      You agree to indemnify and hold STW harmless from any claim arising out of your breach of these Terms or misuse of our services.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">14. Governing Law & Jurisdiction</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      These Terms are governed by the laws of <strong>England and Wales</strong>. Disputes shall be subject to the exclusive jurisdiction of the English courts.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">15. Changes to Terms</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      We may revise these Terms at any time. Continued use of our site or services constitutes acceptance of the updated Terms.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">16. Contact Us</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Questions about these Terms? Email <a href="mailto:sharon@stwaestheticclinic.co.uk" className="text-brand-slate-blue hover:underline font-semibold">info@stwaestheticclinic.co.uk</a> or write to the address at the top of this document.
                    </p>
                  </section>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-sm text-brand-gray-500">© 2025 STW Aesthetic Clinic. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Terms;
