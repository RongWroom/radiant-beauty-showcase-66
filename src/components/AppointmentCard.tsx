
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpdateAppointment } from '@/hooks/useAppointments';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CalendarDays, Clock, FileText, X } from 'lucide-react';
import type { Appointment } from '@/hooks/useAppointments';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const updateAppointment = useUpdateAppointment();
  const { toast } = useToast();

  const handleCancelAppointment = async () => {
    try {
      await updateAppointment.mutateAsync({
        id: appointment.id,
        updates: { status: 'cancelled' }
      });

      toast({
        title: "Appointment cancelled",
        description: "Your appointment has been successfully cancelled."
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast({
        title: "Cancellation failed",
        description: "There was an error cancelling your appointment.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isPastAppointment = () => {
    const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
    return appointmentDateTime < new Date();
  };

  const canCancel = appointment.status === 'pending' || appointment.status === 'confirmed';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{appointment.treatments?.name}</CardTitle>
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(appointment.appointment_date), 'EEEE, MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(`2000-01-01T${appointment.appointment_time}`), 'h:mm a')}</span>
          </div>
        </div>

        {appointment.treatments && (
          <div className="text-sm text-muted-foreground">
            <p>Duration: {appointment.treatments.duration_minutes} minutes</p>
            <p>Price: £{appointment.treatments.price}</p>
          </div>
        )}

        {appointment.notes && (
          <div className="flex gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-muted-foreground">{appointment.notes}</span>
          </div>
        )}

        {canCancel && !isPastAppointment() && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelAppointment}
              disabled={updateAppointment.isPending}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-2" />
              {updateAppointment.isPending ? 'Cancelling...' : 'Cancel Appointment'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
