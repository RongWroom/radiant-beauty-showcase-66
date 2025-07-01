
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { securityUtils } from "@/utils/securityUtils";

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (appointmentData: {
      treatment_id: number;
      appointment_date: string;
      appointment_time: string;
      notes?: string;
    }) => {
      if (!user) {
        await securityUtils.logSecurityEvent('UNAUTHORIZED_APPOINTMENT_ATTEMPT');
        throw new Error("User not authenticated");
      }

      // Rate limiting
      const rateLimitKey = `appointment_${user.id}`;
      if (!securityUtils.rateLimiter.checkRateLimit(rateLimitKey, 3, 300000)) { // 3 attempts per 5 minutes
        throw new Error("Too many appointment requests. Please try again later.");
      }

      // Sanitize input
      const sanitizedData = {
        ...appointmentData,
        notes: appointmentData.notes ? securityUtils.sanitizeInput(appointmentData.notes) : undefined
      };

      await securityUtils.logSecurityEvent('APPOINTMENT_CREATE_ATTEMPT', {
        treatment_id: appointmentData.treatment_id,
        appointment_date: appointmentData.appointment_date
      });

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          ...sanitizedData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        await securityUtils.logSecurityEvent('APPOINTMENT_CREATE_FAILED', { error: error.message });
        throw error;
      }

      await securityUtils.logSecurityEvent('APPOINTMENT_CREATED', { appointment_id: data.id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
