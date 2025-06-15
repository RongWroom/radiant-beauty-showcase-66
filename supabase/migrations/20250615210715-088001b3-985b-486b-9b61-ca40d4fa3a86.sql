
-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  treatment_id INTEGER REFERENCES public.treatments(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(appointment_date, appointment_time) -- Prevent double booking for same time slot
);

-- Create time slots table for managing available booking times
CREATE TABLE public.time_slots (
  id SERIAL PRIMARY KEY,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday, NULL=applies to all days
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business hours configuration table
CREATE TABLE public.business_hours (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_open BOOLEAN NOT NULL DEFAULT true,
  break_start_time TIME,
  break_end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;

-- Appointments policies - users can only access their own appointments
CREATE POLICY "Users can view their own appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
  ON public.appointments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appointments" 
  ON public.appointments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Time slots policies - read access for all authenticated users
CREATE POLICY "Authenticated users can view time slots" 
  ON public.time_slots 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Business hours policies - read access for all authenticated users
CREATE POLICY "Authenticated users can view business hours" 
  ON public.business_hours 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Add triggers to update updated_at column
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert default time slots (every 30 minutes from 9 AM to 6 PM)
INSERT INTO public.time_slots (start_time, end_time) VALUES
('09:00:00', '09:30:00'),
('09:30:00', '10:00:00'),
('10:00:00', '10:30:00'),
('10:30:00', '11:00:00'),
('11:00:00', '11:30:00'),
('11:30:00', '12:00:00'),
('12:00:00', '12:30:00'),
('12:30:00', '13:00:00'),
('13:00:00', '13:30:00'),
('13:30:00', '14:00:00'),
('14:00:00', '14:30:00'),
('14:30:00', '15:00:00'),
('15:00:00', '15:30:00'),
('15:30:00', '16:00:00'),
('16:00:00', '16:30:00'),
('16:30:00', '17:00:00'),
('17:00:00', '17:30:00'),
('17:30:00', '18:00:00');

-- Insert default business hours (Monday to Friday 9 AM - 6 PM, Saturday 9 AM - 4 PM, Sunday closed)
INSERT INTO public.business_hours (day_of_week, open_time, close_time, is_open, break_start_time, break_end_time) VALUES
(1, '09:00:00', '18:00:00', true, '12:00:00', '13:00:00'), -- Monday
(2, '09:00:00', '18:00:00', true, '12:00:00', '13:00:00'), -- Tuesday  
(3, '09:00:00', '18:00:00', true, '12:00:00', '13:00:00'), -- Wednesday
(4, '09:00:00', '18:00:00', true, '12:00:00', '13:00:00'), -- Thursday
(5, '09:00:00', '18:00:00', true, '12:00:00', '13:00:00'), -- Friday
(6, '09:00:00', '16:00:00', true, NULL, NULL), -- Saturday
(0, '09:00:00', '18:00:00', false, NULL, NULL); -- Sunday (closed)
