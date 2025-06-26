import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Appointment = {
  id: string;
  user_id: string;
  treatment_id: number;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  admin_notes: string | null;
  confirmation_token: string | null;
  confirmed_by_admin_at: string | null;
  created_at: string;
  updated_at: string;
  treatments?: {
    name: string;
    duration_minutes: number;
    price: number;
  };
};

export function useAppointments() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          treatments (
            name,
            duration_minutes,
            price
          )
        `)
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      return data as Appointment[];
    },
    enabled: !!user,
  });
}

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
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          ...appointmentData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
      sendNotification = false,
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
          ),
          profiles (
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) throw error;

      // Send notification if requested and status was updated
      if (sendNotification && updates.status && (updates.status === 'confirmed' || updates.status === 'cancelled')) {
        try {
          const customerName = data.profiles 
            ? `${data.profiles.first_name || ''} ${data.profiles.last_name || ''}`.trim()
            : 'Customer';

          await supabase.functions.invoke('send-appointment-status-notification', {
            body: {
              appointmentId: data.id,
              customerName,
              customerEmail: data.profiles?.email || '',
              treatmentName: data.treatments?.name || 'Treatment',
              appointmentDate: data.appointment_date,
              appointmentTime: data.appointment_time,
              status: updates.status,
              adminNotes: updates.admin_notes || undefined,
            },
          });
        } catch (notificationError) {
          console.error('Failed to send status notification:', notificationError);
          // Don't fail the update if notification fails
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

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
          ),
          profiles (
            first_name,
            last_name,
            email
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
          ),
          profiles (
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) throw error;

      // Send reschedule notification
      try {
        const customerName = data.profiles 
          ? `${data.profiles.first_name || ''} ${data.profiles.last_name || ''}`.trim()
          : 'Customer';

        await supabase.functions.invoke('send-reschedule-notification', {
          body: {
            appointmentId: data.id,
            customerName,
            customerEmail: data.profiles?.email || '',
            treatmentName: data.treatments?.name || 'Treatment',
            oldAppointmentDate: currentAppointment.appointment_date,
            oldAppointmentTime: currentAppointment.appointment_time,
            newAppointmentDate: appointmentDate,
            newAppointmentTime: appointmentTime,
          },
        });
      } catch (notificationError) {
        console.error('Failed to send reschedule notification:', notificationError);
        // Don't fail the reschedule if notification fails
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

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
          ),
          profiles (
            first_name,
            last_name,
            email
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
      try {
        const customerName = currentAppointment.profiles 
          ? `${currentAppointment.profiles.first_name || ''} ${currentAppointment.profiles.last_name || ''}`.trim()
          : 'Customer';

        await supabase.functions.invoke('send-cancellation-notification', {
          body: {
            appointmentId: data.id,
            customerName,
            customerEmail: currentAppointment.profiles?.email || '',
            treatmentName: currentAppointment.treatments?.name || 'Treatment',
            appointmentDate: currentAppointment.appointment_date,
            appointmentTime: currentAppointment.appointment_time,
            cancelledBy: 'customer',
            reason: reason || undefined,
          },
        });
      } catch (notificationError) {
        console.error('Failed to send cancellation notification:', notificationError);
        // Don't fail the cancellation if notification fails
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
