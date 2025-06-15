
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";

export type TimeSlot = {
  id: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  day_of_week: number | null;
  created_at: string;
};

export type BusinessHours = {
  id: number;
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_open: boolean;
  break_start_time: string | null;
  break_end_time: string | null;
  created_at: string;
};

export function useTimeSlots() {
  return useQuery({
    queryKey: ["time_slots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .eq("is_available", true)
        .order("start_time", { ascending: true });

      if (error) throw error;
      return data as TimeSlot[];
    },
  });
}

export function useBusinessHours() {
  return useQuery({
    queryKey: ["business_hours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_hours")
        .select("*")
        .order("day_of_week", { ascending: true });

      if (error) throw error;
      return data as BusinessHours[];
    },
  });
}

export function useAvailableSlots(selectedDate: Date | undefined) {
  const { data: timeSlots } = useTimeSlots();
  const { data: businessHours } = useBusinessHours();

  return useQuery({
    queryKey: ["available_slots", selectedDate?.toISOString()],
    queryFn: async () => {
      if (!selectedDate || !timeSlots || !businessHours) return [];

      const dayOfWeek = selectedDate.getDay();
      const businessDay = businessHours.find(bh => bh.day_of_week === dayOfWeek);
      
      if (!businessDay || !businessDay.is_open) return [];

      // Get existing appointments for the selected date
      const { data: existingAppointments, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", format(selectedDate, "yyyy-MM-dd"))
        .neq("status", "cancelled");

      if (error) throw error;

      const bookedTimes = existingAppointments.map(apt => apt.appointment_time);

      // Filter time slots based on business hours and existing bookings
      const availableSlots = timeSlots.filter(slot => {
        const slotTime = parse(slot.start_time, "HH:mm:ss", new Date());
        const openTime = parse(businessDay.open_time, "HH:mm:ss", new Date());
        const closeTime = parse(businessDay.close_time, "HH:mm:ss", new Date());
        
        // Check if slot is within business hours
        const isWithinHours = slotTime >= openTime && slotTime < closeTime;
        
        // Check if slot is not during break time
        let isNotBreakTime = true;
        if (businessDay.break_start_time && businessDay.break_end_time) {
          const breakStart = parse(businessDay.break_start_time, "HH:mm:ss", new Date());
          const breakEnd = parse(businessDay.break_end_time, "HH:mm:ss", new Date());
          isNotBreakTime = !(slotTime >= breakStart && slotTime < breakEnd);
        }
        
        // Check if slot is not already booked
        const isNotBooked = !bookedTimes.includes(slot.start_time);
        
        return isWithinHours && isNotBreakTime && isNotBooked;
      });

      return availableSlots;
    },
    enabled: !!selectedDate && !!timeSlots && !!businessHours,
  });
}
