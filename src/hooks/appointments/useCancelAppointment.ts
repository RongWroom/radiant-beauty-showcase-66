
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { sendNotification } from "./notificationService";

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      reason,
    }: {
      id: string;
      reason?: string;
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

      // Update the appointment status
      const { data, error } = await supabase
        .from("appointments")
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
          admin_notes: reason || null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Send cancellation notification
      await sendNotification('cancellation', {
        appointmentId: data.id,
        userId: currentAppointment.user_id,
        treatmentName: currentAppointment.treatments?.name || 'Treatment',
        appointmentDate: currentAppointment.appointment_date,
        appointmentTime: currentAppointment.appointment_time,
        cancelledBy: 'customer',
        reason: reason || undefined,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
