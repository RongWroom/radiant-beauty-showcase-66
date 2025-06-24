
-- Add confirmation tracking to appointments table
ALTER TABLE appointments 
ADD COLUMN confirmed_by_admin_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN admin_notes TEXT,
ADD COLUMN confirmation_token UUID DEFAULT gen_random_uuid();

-- Create index for faster token lookups
CREATE INDEX idx_appointments_confirmation_token ON appointments(confirmation_token);

-- Add trigger to generate new confirmation token when needed
CREATE OR REPLACE FUNCTION generate_confirmation_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.confirmation_token IS NULL THEN
    NEW.confirmation_token = gen_random_uuid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_confirmation_token
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION generate_confirmation_token();
