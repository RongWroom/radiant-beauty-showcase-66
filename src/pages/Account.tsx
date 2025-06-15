
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentCard from '@/components/AppointmentCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, Package, User, LogOut } from 'lucide-react';

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: appointments = [], isLoading: appointmentsLoading } = useAppointments();
  
  // Get active tab from location state or default to 'profile'
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const upcomingAppointments = appointments.filter(apt => 
    apt.status !== 'cancelled' && apt.status !== 'completed'
  );
  
  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile, appointments, and orders
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                {appointmentsLoading ? (
                  <p className="text-muted-foreground">Loading appointments...</p>
                ) : upcomingAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                      <Button onClick={() => navigate('/treatments')}>
                        Book an Appointment
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                )}
              </div>

              {pastAppointments.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
                  <div className="grid gap-4">
                    {pastAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Button onClick={() => navigate('/products')}>
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
