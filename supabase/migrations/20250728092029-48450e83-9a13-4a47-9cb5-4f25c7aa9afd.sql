-- Fix all database functions to have secure search_path
-- This prevents SQL injection through search path manipulation

-- Fix the audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (
      table_name,
      action,
      record_id,
      old_values,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      OLD.id,
      row_to_json(OLD),
      auth.uid()
    );
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (
      table_name,
      action,
      record_id,
      old_values,
      new_values,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      NEW.id,
      row_to_json(OLD),
      row_to_json(NEW),
      auth.uid()
    );
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_logs (
      table_name,
      action,
      record_id,
      new_values,
      user_id
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      NEW.id,
      row_to_json(NEW),
      auth.uid()
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix the has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Fix the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role)
$$;

-- Create enhanced security logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  action_type text,
  details jsonb DEFAULT NULL,
  ip_address inet DEFAULT NULL,
  user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    table_name,
    action,
    user_id,
    new_values,
    ip_address,
    user_agent
  ) VALUES (
    'security_events',
    action_type,
    auth.uid(),
    jsonb_build_object(
      'action_type', action_type,
      'details', details,
      'timestamp', now()
    ),
    ip_address,
    user_agent
  );
END;
$$;

-- Create function to check rate limits (server-side)
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  identifier text,
  max_attempts integer DEFAULT 5,
  window_minutes integer DEFAULT 5
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  attempt_count integer;
BEGIN
  -- Count attempts in the time window
  SELECT COUNT(*)
  INTO attempt_count
  FROM public.audit_logs
  WHERE new_values->>'action_type' = 'rate_limit_check'
    AND new_values->>'identifier' = identifier
    AND created_at > now() - (window_minutes || ' minutes')::interval;
  
  -- Log this attempt
  PERFORM public.log_security_event(
    'rate_limit_check',
    jsonb_build_object('identifier', identifier, 'attempt_count', attempt_count + 1)
  );
  
  -- Return whether under the limit
  RETURN (attempt_count < max_attempts);
END;
$$;

-- Add RLS policy for audit_logs if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'audit_logs' 
    AND policyname = 'Service role can insert audit logs'
  ) THEN
    CREATE POLICY "Service role can insert audit logs"
    ON public.audit_logs
    FOR INSERT
    TO service_role
    WITH CHECK (true);
  END IF;
END
$$;