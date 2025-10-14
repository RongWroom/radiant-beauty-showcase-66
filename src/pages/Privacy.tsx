
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import CookiePreferences from '@/components/CookiePreferences';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO 
        title="Privacy Policy - STW Aesthetic Clinic"
        description="Privacy Policy for STW Aesthetic Clinic. Learn how we protect and handle your personal information."
        url="https://www.stwaestheticclinic.co.uk/privacy"
      />
      <Navbar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-off-white via-brand-white to-brand-light-gray py-12 md:py-20">
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-serif mb-4 font-bold text-brand-charcoal">
                Privacy Policy
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
                            <td className="border border-brand-gray-200 px-4 py-3">Payment card details (processed by PCI‑compliant provider), billing history</td>
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
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-brand-gray-200 rounded-lg">
                        <thead className="bg-brand-slate-blue/10">
                          <tr>
                            <th className="border border-brand-gray-200 px-4 py-3 text-left font-semibold text-brand-charcoal">Legal Basis</th>
                            <th className="border border-brand-gray-200 px-4 py-3 text-left font-semibold text-brand-charcoal">Typical Use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Contract</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Scheduling & performing treatments, processing payments</td>
                          </tr>
                          <tr className="bg-brand-off-white/30">
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Consent</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Marketing emails, before/after photos on social media</td>
                          </tr>
                          <tr>
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Legal Obligation</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Tax records, insurance compliance, adverse‑event reporting</td>
                          </tr>
                          <tr className="bg-brand-off-white/30">
                            <td className="border border-brand-gray-200 px-4 py-3 font-medium">Legitimate Interests</td>
                            <td className="border border-brand-gray-200 px-4 py-3">Reminding you of upcoming appointments, improving website security</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">5. How We Use Your Data</h3>
                    <ul className="list-disc list-inside space-y-2 text-brand-gray-600">
                      <li>Provide, customise and improve our treatments and services</li>
                      <li>Manage appointments, payments, and client accounts</li>
                      <li>Respond to enquiries and customer support requests</li>
                      <li>Send appointment reminders, after‑care instructions and limited promotional messages</li>
                      <li>Monitor website performance and protect against fraud or misuse</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">6. Sharing Your Data</h3>
                    <p className="text-brand-gray-600 mb-4">We only share your data when necessary and with safeguards:</p>
                    <ul className="list-disc list-inside space-y-2 text-brand-gray-600">
                      <li><strong>Service providers</strong> – secure payment processors, email/SMS reminder platforms, website hosting and IT support</li>
                      <li><strong>Professional advisers & insurers</strong> – where required for legal advice, defence of claims or insurance cover</li>
                      <li><strong>Regulators & authorities</strong> – HMRC, the Information Commissioner's Office (ICO) or healthcare regulators if legally obliged</li>
                      <li><strong>No third‑party sales</strong> – we never sell your personal information</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">7. International Transfers</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Where service providers are located outside the UK, we rely on UK adequacy regulations or standard contractual clauses to protect your data.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">8. Data Retention</h3>
                    <ul className="space-y-2 text-brand-gray-600">
                      <li><strong>Treatment records:</strong> 7 years (or 7 years after a minor turns 18) in line with insurance and professional guidelines</li>
                      <li><strong>Marketing data:</strong> until you withdraw consent or 2 years after last interaction</li>
                      <li><strong>Financial records:</strong> 6 years to satisfy HMRC requirements</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">9. Your Rights</h3>
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

                  <section id="cookies">
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">10. Cookies & Similar Technologies</h3>
                    <p className="text-brand-gray-600 leading-relaxed mb-6">
                      We use essential cookies for site functionality, analytics cookies (e.g., Google Analytics) and marketing cookies (e.g., Facebook Pixel). You can manage non‑essential cookies via our cookie banner or the preferences panel below.
                    </p>
                    <CookiePreferences />
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">11. Children</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      Our services are not directed at individuals under 18. We only process a minor's data with parental/guardian consent.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">12. Security</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      We implement SSL/TLS encryption, role‑based access controls, secure cloud storage and regular staff training. However, no transmission is 100% secure.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-4">13. Changes to This Policy</h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      We may update this Privacy Policy periodically. Significant changes will be posted on our website and, where appropriate, notified to you by email.
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

export default Privacy;
