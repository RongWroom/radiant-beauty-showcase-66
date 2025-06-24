
export interface AppointmentData {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  admin_notes: string | null;
  treatments: {
    name: string;
    duration_minutes: number;
    price: number;
  } | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

// Type guard to check if profiles data is valid
export const isValidProfilesData = (profiles: any): profiles is { first_name: string | null; last_name: string | null; email: string | null } => {
  return profiles && 
         typeof profiles === 'object' && 
         !('error' in profiles) &&
         ('first_name' in profiles || 'last_name' in profiles || 'email' in profiles);
};
