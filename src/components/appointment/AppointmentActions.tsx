
import React from 'react';
import { Button } from '@/components/ui/button';
import type { AppointmentData } from '@/types/appointment';

interface AppointmentActionsProps {
  appointment: AppointmentData;
  onUpdateStatus: (status: string) => void;
  updating: boolean;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointment,
  onUpdateStatus,
  updating
}) => {
  return (
    <div className="mt-6 pt-6 border-t">
      <h3 className="font-semibold text-lg mb-4">Actions</h3>
      <div className="flex flex-wrap gap-3">
        {appointment.status !== 'confirmed' && (
          <Button 
            onClick={() => onUpdateStatus('confirmed')}
            disabled={updating}
            className="bg-green-600 hover:bg-green-700"
          >
            {updating ? 'Updating...' : 'Confirm Appointment'}
          </Button>
        )}
        
        {appointment.status !== 'cancelled' && (
          <Button 
            onClick={() => onUpdateStatus('cancelled')}
            disabled={updating}
            variant="destructive"
          >
            {updating ? 'Updating...' : 'Cancel Appointment'}
          </Button>
        )}
        
        {appointment.status === 'confirmed' && (
          <Button 
            onClick={() => onUpdateStatus('completed')}
            disabled={updating}
            variant="outline"
          >
            {updating ? 'Updating...' : 'Mark as Completed'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentActions;
