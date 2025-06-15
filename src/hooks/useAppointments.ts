
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
    }: {
      id: string;
      updates: Partial<Appointment>;
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", id)
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
