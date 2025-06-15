
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Treatment = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string | null;
  image_url: string | null;
  category: string | null;
  duration_minutes: number | null;
  featured: boolean | null;
  benefits: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export function useTreatments() {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("treatments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Treatment[];
    },
  });
}

export function useTreatment(id: number) {
  return useQuery({
    queryKey: ["treatment", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("treatments")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Treatment | null;
    },
  });
}
