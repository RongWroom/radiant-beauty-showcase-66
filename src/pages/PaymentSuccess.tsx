
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-brand-white via-brand-off-white to-brand-light-gray">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-brand-silver/30">
              <CardContent className="p-12">
                <div className="mb-8">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h1 className="text-3xl md:text-4xl font-serif mb-4 text-brand-charcoal">
                    Payment Successful!
                  </h1>
                  <p className="text-lg text-brand-gray-600 mb-6">
                    Thank you for your purchase. Your order has been processed successfully.
                  </p>
                  {sessionId && (
                    <div className="bg-brand-slate-blue/10 p-4 rounded-lg mb-6">
                      <p className="text-sm text-brand-gray-600">
                        Order Reference: <span className="font-mono text-brand-slate-blue">{sessionId}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Link to="/products">
                    <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light hover:from-brand-slate-blue-light hover:to-brand-slate-blue-dark">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-silver/30">
                  <p className="text-sm text-brand-gray-600">
                    You will receive an email confirmation shortly with your order details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
