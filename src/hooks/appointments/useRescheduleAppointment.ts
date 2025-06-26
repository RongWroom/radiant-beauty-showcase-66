
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { sendNotification } from "./notificationService";

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      appointmentDate,
      appointmentTime,
    }: {
      id: string;
      appointmentDate: string;
      appointmentTime: string;
    }) => {
      // First get the current appointment data
      const { data: currentAppointment, error: fetchError } = await supabase
        .from("appointments")
        .select(`
          *,
          treatments (
            name,
            duration_minutes,
            price
          )
        `)
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Update the appointment
      const { data, error } = await supabase
        .from("appointments")
        .update({
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          treatments (
            name,
            duration_minutes,
            price
          )
        `)
        .single();

      if (error) throw error;

      // Send reschedule notification
      await sendNotification('reschedule', {
        appointmentId: data.id,
        userId: data.user_id,
        treatmentName: data.treatments?.name || 'Treatment',
        oldAppointmentDate: currentAppointment.appointment_date,
        oldAppointmentTime: currentAppointment.appointment_time,
        newAppointmentDate: appointmentDate,
        newAppointmentTime: appointmentTime,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
