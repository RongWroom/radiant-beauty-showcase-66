
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { AppointmentData } from '@/types/appointment';
import { isValidProfilesData } from '@/types/appointment';

export const useAppointmentManagement = (token: string | undefined) => {
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const fetchAppointment = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
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
        .eq('confirmation_token', token)
        .single();

      if (error) {
        console.error('Error fetching appointment:', error);
        toast({
          title: "Appointment not found",
          description: "The appointment link may be expired or invalid.",
          variant: "destructive"
        });
        return;
      }

      // Handle the case where profiles might be an error object or null
      const appointmentData: AppointmentData = {
        id: data.id,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        status: data.status,
        notes: data.notes,
        admin_notes: data.admin_notes,
        treatments: data.treatments,
        profiles: data.profiles && isValidProfilesData(data.profiles) 
          ? data.profiles 
          : null
      };

      setAppointment(appointmentData);
      setAdminNotes(data.admin_notes || '');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load appointment details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (newStatus: string) => {
    if (!appointment) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          status: newStatus,
          confirmed_by_admin_at: newStatus === 'confirmed' ? new Date().toISOString() : null,
          admin_notes: adminNotes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointment.id);

      if (error) throw error;

      setAppointment(prev => prev ? { 
        ...prev, 
        status: newStatus, 
        admin_notes: adminNotes.trim() || null 
      } : null);
      
      toast({
        title: "Success",
        description: `Appointment ${newStatus} successfully.`,
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to update appointment.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    if (!appointment) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          admin_notes: adminNotes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointment.id);

      if (error) throw error;

      setAppointment(prev => prev ? { 
        ...prev, 
        admin_notes: adminNotes.trim() || null 
      } : null);
      
      toast({
        title: "Notes saved",
        description: "Admin notes have been updated.",
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointment();
    }
  }, [token]);

  return {
    appointment,
    loading,
    adminNotes,
    setAdminNotes,
    updating,
    updateAppointmentStatus,
    saveNotes
  };
};
