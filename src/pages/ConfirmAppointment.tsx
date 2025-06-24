
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, Calendar, Clock, User, Stethoscope } from 'lucide-react';

interface ConfirmationData {
  success: boolean;
  message: string;
  appointment?: {
    id: string;
    customer: string;
    treatment: string;
    date: string;
    time: string;
    status: string;
  };
  emailSent?: boolean;
}

const ConfirmAppointment = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [error, setError] = useState<string>('');

  const token = searchParams.get('token');
  const action = searchParams.get('action');

  useEffect(() => {
    const handleConfirmation = async () => {
      if (!token || !action) {
        setError('Invalid confirmation link. Missing required parameters.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://siojarsutauhnuiwrmkd.supabase.co/functions/v1/confirm-appointment?token=${token}&action=${action}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ConfirmationData = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error confirming appointment:', err);
        setError('Failed to process appointment confirmation. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    handleConfirmation();
  }, [token, action]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-slate-blue mb-4" />
              <p className="text-brand-charcoal">Processing appointment...</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="h-6 w-6" />
                Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-charcoal mb-4">{error || 'An unexpected error occurred.'}</p>
              <Button 
                onClick={() => window.close()} 
                className="w-full bg-brand-slate-blue hover:bg-brand-slate-blue-light"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const isConfirmed = action === 'confirm';
  const statusColor = isConfirmed ? 'text-green-600' : 'text-red-600';
  const statusIcon = isConfirmed ? CheckCircle : XCircle;
  const StatusIcon = statusIcon;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray py-12">
        <Card className="w-full max-w-2xl mx-4 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className={`flex items-center justify-center gap-3 text-2xl ${statusColor}`}>
              <StatusIcon className="h-8 w-8" />
              Appointment {isConfirmed ? 'Confirmed' : 'Cancelled'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-brand-charcoal mb-2">{data.message}</p>
              {data.emailSent && (
                <p className="text-sm text-brand-gray-600">
                  The customer has been notified via email.
                </p>
              )}
            </div>

            {data.appointment && (
              <div className="bg-gradient-to-br from-brand-slate-blue/5 to-brand-silver/10 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Appointment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-brand-slate-blue" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Customer</p>
                      <p className="font-medium text-brand-charcoal">{data.appointment.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-brand-slate-blue" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Treatment</p>
                      <p className="font-medium text-brand-charcoal">{data.appointment.treatment}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-brand-slate-blue" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Date</p>
                      <p className="font-medium text-brand-charcoal">{data.appointment.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-slate-blue" />
                    <div>
                      <p className="text-sm text-brand-gray-600">Time</p>
                      <p className="font-medium text-brand-charcoal">{data.appointment.time}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-silver/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data.appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {data.appointment.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button 
                onClick={() => window.close()} 
                className="bg-brand-slate-blue hover:bg-brand-slate-blue-light px-8"
              >
                Close Window
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmAppointment;
