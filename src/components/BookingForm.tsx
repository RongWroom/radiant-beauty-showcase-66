
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateAppointment } from '@/hooks/useAppointments';
import { useTreatment } from '@/hooks/useTreatments';
import { useToast } from '@/hooks/use-toast';
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
  const createAppointment = useCreateAppointment();
  const { toast } = useToast();

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
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
      await createAppointment.mutateAsync({
        treatment_id: treatmentId,
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
        notes: notes.trim() || undefined,
      });

      toast({
        title: "Appointment booked successfully!",
        description: `Your ${treatment?.name} appointment is scheduled for ${format(selectedDate, 'MMM d, yyyy')} at ${format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}.`
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
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
