
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentCard from '@/components/AppointmentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerAppointments = () => {
  const { user } = useAuth();
  const { data: appointments, isLoading, error } = useAppointments();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your appointments</h1>
            <Button asChild>
              <Link to="/auth">Go to Login</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const upcomingAppointments = appointments?.filter(
    (apt) => apt.status === 'pending' || apt.status === 'confirmed'
  ) || [];

  const pastAppointments = appointments?.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled' || apt.status === 'no_show'
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/account">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Account
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="h-8 w-8" />
                My Appointments
              </h1>
              <p className="text-muted-foreground">View and manage your appointments</p>
            </div>
          </div>

          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">Failed to load appointments. Please try again.</p>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {upcomingAppointments.length} appointment{upcomingAppointments.length !== 1 ? 's' : ''}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No upcoming appointments</p>
                      <p className="mb-4">Book a treatment to get started</p>
                      <Button asChild>
                        <Link to="/treatments">Browse Treatments</Link>
                      </Button>
                    </div>
                  ) : (
                    upcomingAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Past Appointments */}
              {pastAppointments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Past Appointments</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {pastAppointments.length} appointment{pastAppointments.length !== 1 ? 's' : ''}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerAppointments;
