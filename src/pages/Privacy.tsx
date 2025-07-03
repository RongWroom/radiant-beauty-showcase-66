
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="Privacy Policy - STW Aesthetic Clinic"
        description="Privacy Policy and Terms of Service for STW Aesthetic Clinic. Learn how we protect and handle your personal information."
        url="https://www.stwaestheticclinic.co.uk/privacy"
      />
      <Navbar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 md:py-20">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-4 font-bold text-brand-charcoal">
                Privacy Policy & Terms
              </h1>
              <div className="flex justify-center mb-6">
                <span className="block h-1 w-24 rounded-full bg-gradient-to-r from-brand-slate-blue to-brand-silver"></span>
              </div>
              <p className="text-lg text-brand-gray-600 leading-relaxed">
                Your privacy and trust are important to us. Learn how we protect your information.
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

              {/* Privacy Policy */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-brand-slate-blue/10 to-brand-silver/10 p-6 rounded-lg mb-8">
                  <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Privacy Policy</h2>
                  <p className="text-lg italic text-brand-gray-600">
                    This Privacy Policy explains how we collect, use, disclose and safeguard your personal information when you visit <strong>stwaestheticclinic.co.uk</strong>, book an appointment or purchase products or services.
                  </p>
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">1. Who We Are (Data Controller)</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      STW Aesthetic Clinic ("STW", "we", "our", "us") is the data controller responsible for your personal data under UK GDPR and the Data Protection Act 2018.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">2. Personal Data We Collect</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-brand-gray-200 rounded-lg">
                        <thead className="bg-brand-slate-blue/10">
                          <tr>
                            <th className="border border-brand-gray-200 px-4 py-3 text-left font-semibold text-brand-charcoal">Category</th>
                            <th className="border border-brand-gray-200 px-4 py-3 text-left font-semibold text-brand-charcoal">Examples</th>
                            <th className="border border-brand-gray-200 px-4 py-3 text-left font-semibold text-brand-charcoal">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Identity & Contact</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Name, telephone, email, postal address, date of birth</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Appointment booking, client records</td>
                          </tr>
                          <tr className="bg-brand-off-white/30">
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Health & Treatment Notes</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Medical history, allergies, treatment photos, consultation forms</td>
                            <td className="border border-brand-gray-200 px-4 py-3">To deliver safe aesthetic treatments and comply with insurance & medical obligations</td>
                          </tr>
                          <tr>
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Financial</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Payment card details, billing history</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Processing payments & refunds</td>
                          </tr>
                          <tr className="bg-brand-off-white/30">
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Technical</td>
                            <td className="border border-brand-gray-200 px-4 py-3">IP address, browser type, device identifiers, cookies</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Site security, analytics, cookie‑based marketing</td>
                          </tr>
                          <tr>
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Marketing Preferences</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Newsletter opt‑in status, treatment interests</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Sending updates & promotions with consent</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">3. How We Obtain Data</h3>
                    <ul className="list-disc list-inside space-y-2 text-brand-gray-600">
                      <li>Directly from you (online forms, phone, email, in‑clinic paperwork)</li>
                      <li>Automatically via cookies and similar technologies</li>
                      <li>Occasionally from third parties (e.g., referral partners, social media when you interact with our ads)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">4. Legal Bases for Processing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-brand-slate-blue/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-brand-charcoal mb-2">Contract</h4>
                        <p className="text-sm text-brand-gray-600">Scheduling & performing treatments, processing payments</p>
                      </div>
                      <div className="bg-brand-silver/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-brand-charcoal mb-2">Consent</h4>
                        <p className="text-sm text-brand-gray-600">Marketing emails, before/after photos on social media</p>
                      </div>
                      <div className="bg-brand-slate-blue/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-brand-charcoal mb-2">Legal Obligation</h4>
                        <p className="text-sm text-brand-gray-600">Tax records, insurance compliance, adverse‑event reporting</p>
                      </div>
                      <div className="bg-brand-silver/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-brand-charcoal mb-2">Legitimate Interests</h4>
                        <p className="text-sm text-brand-gray-600">Reminding you of upcoming appointments, improving website security</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">5. Your Rights</h3>
                    <div className="bg-gradient-to-r from-brand-slate-blue/10 to-brand-silver/10 p-6 rounded-lg">
                      <p className="text-brand-gray-600 mb-4">You may:</p>
                      <ol className="list-decimal list-inside space-y-2 text-brand-gray-600">
                        <li>Access your data</li>
                        <li>Request correction or deletion</li>
                        <li>Restrict or object to processing</li>
                        <li>Data portability (digital copy)</li>
                        <li>Withdraw consent at any time</li>
                        <li>Lodge a complaint with the <strong>ICO</strong> (ico.org.uk)</li>
                      </ol>
                      <p className="mt-4 text-brand-charcoal">
                        To exercise any right, email <a href="mailto:privacy@stwaestheticclinic.co.uk" className="text-brand-slate-blue hover:underline font-semibold">privacy@stwaestheticclinic.co.uk</a>
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">6. Data Retention</h3>
                    <ul className="space-y-2 text-brand-gray-600">
                      <li><strong>Treatment records:</strong> 7 years (or 7 years after a minor turns 18) in line with insurance and professional guidelines</li>
                      <li><strong>Marketing data:</strong> until you withdraw consent or 2 years after last interaction</li>
                      <li><strong>Financial records:</strong> 6 years to satisfy HMRC requirements</li>
                    </ul>
                  </section>
                </div>

                {/* Terms of Service */}
                <div className="mt-16">
                  <div className="bg-gradient-to-r from-brand-slate-blue/10 to-brand-silver/10 p-6 rounded-lg mb-8">
                    <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Terms of Service</h2>
                    <p className="text-lg italic text-brand-gray-600">
                      These Terms of Service ("Terms") govern your use of stwaestheticclinic.co.uk and any appointment, product purchase or interaction with STW Aesthetic Clinic.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-brand-charcoal mb-3">1. Acceptance of Terms</h3>
                      <p className="text-brand-gray-600">
                        By accessing our website or booking a service, you agree to be bound by these Terms and our Privacy Policy. If you disagree, please do not use our site or services.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-brand-charcoal mb-3">2. Bookings & Payments</h3>
                      <ul className="list-disc list-inside space-y-1 text-brand-gray-600">
                        <li>Appointments can be booked online, by phone or in person</li>
                        <li>A deposit may be required; full payment is due on or before the treatment date</li>
                        <li>Prices are displayed in GBP and may change without notice (unless you have a confirmed booking)</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-brand-charcoal mb-3">3. Cancellations & Late Arrivals</h3>
                      <ul className="list-disc list-inside space-y-1 text-brand-gray-600">
                        <li><strong>48‑hour notice</strong> is required to cancel or reschedule. Deposits may be forfeited for late cancellations</li>
                        <li>Arriving more than <strong>15 minutes</strong> late may result in reduced treatment time or rescheduling</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-brand-charcoal mb-3">4. Contact Us</h3>
                      <p className="text-brand-gray-600">
                        Questions about these Terms? Email <a href="mailto:info@stwaestheticclinic.co.uk" className="text-brand-slate-blue hover:underline font-semibold">info@stwaestheticclinic.co.uk</a>
                      </p>
                    </section>
                  </div>
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

export default Privacy;
