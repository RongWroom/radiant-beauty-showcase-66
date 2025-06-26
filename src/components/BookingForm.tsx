import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateAppointment } from '@/hooks/useAppointments';
import { useTreatment } from '@/hooks/useTreatments';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { CalendarDays, Clock, FileText } from 'lucide-react';
import BookingCalendar from './BookingCalendar';

interface BookingFormProps {
  treatmentId: number;
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ treatmentId, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [notes, setNotes] = useState('');
  
  const { data: treatment } = useTreatment(treatmentId);
  const { user } = useAuth();
  const createAppointment = useCreateAppointment();
  const { toast } = useToast();

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const sendBookingNotification = async (appointmentId: string, confirmationToken: string) => {
    if (!user || !treatment || !selectedDate || !selectedTime) return;

    try {
      console.log('Sending booking notification...');
      
      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();

      const customerName = profile 
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
        : user.email || 'Unknown Customer';

      const { error } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          customerName,
          customerEmail: user.email,
          treatmentName: treatment.name,
          appointmentDate: format(selectedDate, 'yyyy-MM-dd'),
          appointmentTime: selectedTime,
          notes: notes.trim() || undefined,
          treatmentPrice: treatment.price,
          treatmentDuration: treatment.duration_minutes,
          treatmentCategory: treatment.category,
          confirmationToken,
          appointmentId,
        },
      });

      if (error) {
        console.error('Error sending notification email:', error);
        // Don't throw here - we don't want booking to fail if email fails
      } else {
        console.log('Booking notification sent successfully');
      }
    } catch (error) {
      console.error('Error sending booking notification:', error);
      // Don't throw here - we don't want booking to fail if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time must be selected to book an appointment.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create the appointment first
      const appointmentData = await createAppointment.mutateAsync({
        treatment_id: treatmentId,
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
        notes: notes.trim() || undefined,
      });

      // Send notification email with appointment ID and confirmation token
      sendBookingNotification(appointmentData.id, appointmentData.confirmation_token);

      toast({
        title: "Appointment booked successfully!",
        description: `Your ${treatment?.name} appointment is scheduled for ${format(selectedDate, 'MMM d, yyyy')} at ${format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}.`
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      
      // Handle specific error cases
      if (error?.message?.includes('duplicate key value violates unique constraint') || 
          error?.code === '23505' || 
          error?.status === 409) {
        toast({
          title: "Time slot unavailable",
          description: "This time slot has already been booked. Please select a different time.",
          variant: "destructive"
        });
        // Reset the selected time to force user to pick a new slot
        setSelectedTime(undefined);
      } else {
        toast({
          title: "Booking failed",
          description: "There was an error booking your appointment. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  if (!treatment) {
    return <div>Loading treatment details...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
          <div className="text-sm text-muted-foreground">
            <p><strong>Treatment:</strong> {treatment.name}</p>
            <p><strong>Duration:</strong> {treatment.duration_minutes} minutes</p>
            <p><strong>Price:</strong> £{treatment.price}</p>
          </div>
        </CardHeader>
      </Card>

      <BookingCalendar
        onDateTimeSelect={handleDateTimeSelect}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {selectedDate && selectedTime && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements or information for your appointment..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Important: Consent Form Required</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Before your appointment, you'll need to complete a consent form specific to your treatment. 
                  This will be included in your booking confirmation email.
                </p>
                <p className="text-xs text-blue-600">
                  The consent form ensures we have all necessary medical information to provide you with safe, effective treatment.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={createAppointment.isPending}
              >
                {createAppointment.isPending ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingForm;
