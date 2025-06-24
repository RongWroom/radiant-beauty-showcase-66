
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, XCircle } from 'lucide-react';
import { useAppointmentManagement } from '@/hooks/useAppointmentManagement';
import AppointmentDetailsCard from '@/components/appointment/AppointmentDetailsCard';
import AdminNotesSection from '@/components/appointment/AdminNotesSection';
import AppointmentActions from '@/components/appointment/AppointmentActions';

const ManageAppointment = () => {
  const { token } = useParams<{ token: string }>();
  const {
    appointment,
    loading,
    adminNotes,
    setAdminNotes,
    updating,
    updateAppointmentStatus,
    saveNotes
  } = useAppointmentManagement(token);

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
            <AppointmentDetailsCard appointment={appointment} />

            {/* Customer Notes */}
            {appointment.notes && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Customer Notes</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p>{appointment.notes}</p>
                </div>
              </div>
            )}

            <AdminNotesSection
              adminNotes={adminNotes}
              setAdminNotes={setAdminNotes}
              onSaveNotes={saveNotes}
              updating={updating}
            />

            <AppointmentActions
              appointment={appointment}
              onUpdateStatus={updateAppointmentStatus}
              updating={updating}
            />
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
