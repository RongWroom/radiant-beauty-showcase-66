
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, FileText, Edit, X } from 'lucide-react';
import { format } from 'date-fns';
import { useUpdateAppointment, useRescheduleAppointment } from '@/hooks/useAppointments';
import { useToast } from '@/hooks/use-toast';
import RescheduleModal from './appointment/RescheduleModal';
import type { Appointment } from '@/hooks/useAppointments';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const updateAppointment = useUpdateAppointment();
  const rescheduleAppointment = useRescheduleAppointment();
  const { toast } = useToast();

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleCancelAppointment = async () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateAppointment.mutateAsync({
          id: appointment.id,
          updates: { status: 'cancelled' }
        });
        toast({
          title: "Appointment cancelled",
          description: "Your appointment has been cancelled successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to cancel appointment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleReschedule = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      await rescheduleAppointment.mutateAsync({
        id: appointmentId,
        appointmentDate: newDate,
        appointmentTime: newTime,
      });
      toast({
        title: "Appointment rescheduled",
        description: `Your appointment has been rescheduled to ${format(new Date(newDate), 'MMM d, yyyy')} at ${format(new Date(`2000-01-01T${newTime}`), 'h:mm a')}.`,
      });
    } catch (error: any) {
      if (error?.message?.includes('duplicate key value violates unique constraint') || 
          error?.code === '23505' || 
          error?.status === 409) {
        toast({
          title: "Time slot unavailable",
          description: "This time slot has already been booked. Please select a different time.",
          variant: "destructive"
        });
        throw error; // Re-throw to keep modal open
      } else {
        toast({
          title: "Error",
          description: "Failed to reschedule appointment. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    }
  };

  const canRescheduleOrCancel = appointment.status === 'pending' || appointment.status === 'confirmed';

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
              {appointment.treatments?.name || 'Treatment'}
            </CardTitle>
            <Badge className={getStatusColor(appointment.status)}>
              {getStatusText(appointment.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {format(new Date(appointment.appointment_date), 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {format(new Date(`2000-01-01T${appointment.appointment_time}`), 'h:mm a')}
              </span>
            </div>
          </div>

          {appointment.treatments?.duration_minutes && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Duration: {appointment.treatments.duration_minutes} minutes
              </span>
            </div>
          )}

          {appointment.treatments?.price && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                Price: £{appointment.treatments.price}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              STW Aesthetic Clinic, Stanley
            </span>
          </div>

          {appointment.notes && (
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-sm font-medium">Notes:</span>
                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
              </div>
            </div>
          )}

          {canRescheduleOrCancel && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRescheduleModal(true)}
                disabled={updateAppointment.isPending || rescheduleAppointment.isPending}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelAppointment}
                disabled={updateAppointment.isPending || rescheduleAppointment.isPending}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RescheduleModal
        appointment={appointment}
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onReschedule={handleReschedule}
        isUpdating={rescheduleAppointment.isPending}
      />
    </>
  );
};

export default AppointmentCard;
