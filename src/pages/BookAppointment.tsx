import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTreatment } from '@/hooks/useTreatments';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
const BookAppointment = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    data: treatment,
    isLoading
  } = useTreatment(Number(id));
  if (!user) {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to book an appointment.
            </p>
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-12">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>;
  }
  if (!treatment) {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Treatment Not Found</h1>
            <Button onClick={() => navigate('/treatments')}>
              Back to Treatments
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  const handleBookingSuccess = () => {
    navigate('/account', {
      state: {
        activeTab: 'appointments'
      }
    });
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(`/treatments/${id}`)} className="mb-4 text-slate-100 text-base bg-slate-800 hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Treatment
            </Button>
            <h1 className="text-3xl font-bold">Choose Your Slot</h1>
            <p className="text-muted-foreground mt-2">
              Select your preferred date and time for {treatment.name}
            </p>
          </div>

          <BookingForm treatmentId={treatment.id} onSuccess={handleBookingSuccess} />
        </div>
      </div>
      <Footer />
    </div>;
};
export default BookAppointment;