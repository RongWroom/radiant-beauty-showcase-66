
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { sendNotification } from "./notificationService";
import type { Appointment } from "./useAppointments";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
      sendNotification: shouldSendNotification = false,
    }: {
      id: string;
      updates: Partial<Appointment>;
      sendNotification?: boolean;
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update(updates)
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

      // Send notification if requested and status was updated
      if (shouldSendNotification && updates.status && (updates.status === 'confirmed' || updates.status === 'cancelled')) {
        await sendNotification('appointment-status', {
          appointmentId: data.id,
          userId: data.user_id,
          treatmentName: data.treatments?.name || 'Treatment',
          appointmentDate: data.appointment_date,
          appointmentTime: data.appointment_time,
          status: updates.status,
          adminNotes: updates.admin_notes || undefined,
        });
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
