
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CalendarDays, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import type { AppointmentData } from '@/types/appointment';

interface AppointmentDetailsCardProps {
  appointment: AppointmentData;
}

const AppointmentDetailsCard: React.FC<AppointmentDetailsCardProps> = ({ appointment }) => {
  const customerName = appointment.profiles?.first_name && appointment.profiles?.last_name
    ? `${appointment.profiles.first_name} ${appointment.profiles.last_name}`.trim()
    : appointment.profiles?.first_name || appointment.profiles?.last_name || 'Unknown Customer';
  
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
  );
};

export default AppointmentDetailsCard;
