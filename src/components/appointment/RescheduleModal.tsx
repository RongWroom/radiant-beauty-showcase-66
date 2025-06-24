
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BookingCalendar from '@/components/BookingCalendar';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import type { Appointment } from '@/hooks/useAppointments';

interface RescheduleModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => Promise<void>;
  isUpdating: boolean;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onReschedule,
  isUpdating
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const { toast } = useToast();

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time must be selected to reschedule.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onReschedule(
        appointment.id,
        format(selectedDate, 'yyyy-MM-dd'),
        selectedTime
      );
      onClose();
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <div className="text-sm text-muted-foreground mt-2">
            <p><strong>Current:</strong> {format(new Date(appointment.appointment_date), 'MMM d, yyyy')} at {format(new Date(`2000-01-01T${appointment.appointment_time}`), 'h:mm a')}</p>
            <p><strong>Treatment:</strong> {appointment.treatments?.name}</p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <BookingCalendar
            onDateTimeSelect={handleDateTimeSelect}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />

          {selectedDate && selectedTime && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">New Appointment Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleReschedule}
              disabled={!selectedDate || !selectedTime || isUpdating}
            >
              {isUpdating ? 'Rescheduling...' : 'Confirm Reschedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
