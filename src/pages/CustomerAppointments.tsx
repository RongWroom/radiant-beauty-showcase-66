
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { useCancelAppointment } from '@/hooks/appointments/useCancelAppointment';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, XCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const CustomerAppointments = () => {
  const { user } = useAuth();
  const { data: appointments, loading, error } = useAppointments();
  const cancelAppointment = useCancelAppointment();
  const { toast } = useToast();

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await cancelAppointment.mutateAsync({
        id: appointmentId,
        reason: 'Cancelled by customer'
      });
      
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your appointments</h1>
            <Button onClick={() => window.location.href = '/auth'}>
              Go to Login
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'no_show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/account">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Account
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">My Appointments</h1>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading your appointments...</p>
            </div>
          ) : error ? (
            <Card className="text-center py-8">
              <CardContent>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error Loading Appointments</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn't load your appointments. Please try again.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : !appointments || appointments.length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Appointments Found</h2>
                <p className="text-muted-foreground mb-4">
                  You haven't booked any appointments yet.
                </p>
                <Link to="/treatments">
                  <Button>
                    Book an Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {appointment.treatments?.name || 'Treatment'}
                      </CardTitle>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {new Date(appointment.appointment_date).toLocaleDateString('en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.appointment_time}</span>
                          {appointment.treatments?.duration_minutes && (
                            <span className="text-sm text-gray-500">
                              ({appointment.treatments.duration_minutes} minutes)
                            </span>
                          )}
                        </div>
                        {appointment.treatments?.price && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              £{appointment.treatments.price}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Booking Date:</span>
                          <span className="text-sm">
                            {new Date(appointment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {appointment.confirmed_by_admin_at && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Confirmed:</span>
                            <span className="text-sm">
                              {new Date(appointment.confirmed_by_admin_at).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="border-t pt-3">
                        <h4 className="font-medium mb-2">Your Notes:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                          {appointment.notes}
                        </p>
                      </div>
                    )}

                    {appointment.admin_notes && (
                      <div className="border-t pt-3">
                        <h4 className="font-medium mb-2">Clinic Notes:</h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                          {appointment.admin_notes}
                        </p>
                      </div>
                    )}

                    {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                      <div className="border-t pt-3 flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={cancelAppointment.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          {cancelAppointment.isPending ? 'Cancelling...' : 'Cancel Appointment'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerAppointments;
