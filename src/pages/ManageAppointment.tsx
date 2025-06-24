
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { CalendarDays, Clock, User, FileText, CheckCircle, XCircle } from 'lucide-react';

interface AppointmentData {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  admin_notes: string | null;
  treatments: {
    name: string;
    duration_minutes: number;
    price: number;
  } | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

const ManageAppointment = () => {
  const { token } = useParams<{ token: string }>();
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      fetchAppointment();
    }
  }, [token]);

  const fetchAppointment = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          treatments (
            name,
            duration_minutes,
            price
          ),
          profiles (
            first_name,
            last_name,
            email
          )
        `)
        .eq('confirmation_token', token)
        .single();

      if (error) {
        console.error('Error fetching appointment:', error);
        toast({
          title: "Appointment not found",
          description: "The appointment link may be expired or invalid.",
          variant: "destructive"
        });
        return;
      }

      setAppointment(data as AppointmentData);
      setAdminNotes(data.admin_notes || '');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load appointment details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (newStatus: string) => {
    if (!appointment) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          status: newStatus,
          confirmed_by_admin_at: newStatus === 'confirmed' ? new Date().toISOString() : null,
          admin_notes: adminNotes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointment.id);

      if (error) throw error;

      setAppointment(prev => prev ? { 
        ...prev, 
        status: newStatus, 
        admin_notes: adminNotes.trim() || null 
      } : null);
      
      toast({
        title: "Success",
        description: `Appointment ${newStatus} successfully.`,
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to update appointment.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    if (!appointment) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          admin_notes: adminNotes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointment.id);

      if (error) throw error;

      setAppointment(prev => prev ? { 
        ...prev, 
        admin_notes: adminNotes.trim() || null 
      } : null);
      
      toast({
        title: "Notes saved",
        description: "Admin notes have been updated.",
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Appointment Not Found</h2>
            <p className="text-muted-foreground">
              The appointment link may be expired or invalid.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const customerName = appointment.profiles 
    ? `${appointment.profiles.first_name || ''} ${appointment.profiles.last_name || ''}`.trim() || 'Unknown Customer'
    : 'Unknown Customer';
  
  const customerEmail = appointment.profiles?.email || 'No email available';
  const treatmentName = appointment.treatments?.name || 'Unknown Treatment';
  const treatmentDuration = appointment.treatments?.duration_minutes || 0;
  const treatmentPrice = appointment.treatments?.price || 0;
  
  const formattedDate = format(new Date(appointment.appointment_date), 'EEEE, MMMM d, yyyy');
  const formattedTime = format(new Date(`2000-01-01T${appointment.appointment_time}`), 'h:mm a');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Appointment Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Details
                </h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p><strong>Name:</strong> {customerName}</p>
                  <p><strong>Email:</strong> {customerEmail}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Appointment Details</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p><strong>Treatment:</strong> {treatmentName}</p>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formattedTime}</span>
                  </div>
                  <p><strong>Duration:</strong> {treatmentDuration} minutes</p>
                  <p><strong>Price:</strong> £{treatmentPrice}</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(appointment.status)}
                    <span className={`font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Notes */}
            {appointment.notes && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Customer Notes</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p>{appointment.notes}</p>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div className="mt-6">
              <Label htmlFor="admin-notes" className="text-lg font-semibold">
                Admin Notes
              </Label>
              <Textarea
                id="admin-notes"
                placeholder="Add internal notes about this appointment..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="mt-2"
                rows={4}
              />
              <Button 
                onClick={saveNotes} 
                variant="outline" 
                className="mt-2"
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">Actions</h3>
              <div className="flex flex-wrap gap-3">
                {appointment.status !== 'confirmed' && (
                  <Button 
                    onClick={() => updateAppointmentStatus('confirmed')}
                    disabled={updating}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {updating ? 'Updating...' : 'Confirm Appointment'}
                  </Button>
                )}
                
                {appointment.status !== 'cancelled' && (
                  <Button 
                    onClick={() => updateAppointmentStatus('cancelled')}
                    disabled={updating}
                    variant="destructive"
                  >
                    {updating ? 'Updating...' : 'Cancel Appointment'}
                  </Button>
                )}
                
                {appointment.status === 'confirmed' && (
                  <Button 
                    onClick={() => updateAppointmentStatus('completed')}
                    disabled={updating}
                    variant="outline"
                  >
                    {updating ? 'Updating...' : 'Mark as Completed'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>STW Aesthetic Clinic - Appointment Management System</p>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointment;
