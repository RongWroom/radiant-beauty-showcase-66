
-- Create a table for treatments
CREATE TABLE public.treatments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  image_url TEXT,
  category TEXT,
  duration_minutes INTEGER,
  featured BOOLEAN DEFAULT false,
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create an index on category for faster filtering
CREATE INDEX idx_treatments_category ON public.treatments(category);

-- Create an index on featured for faster queries
CREATE INDEX idx_treatments_featured ON public.treatments(featured);

-- Add a trigger to automatically update the updated_at column
CREATE TRIGGER update_treatments_updated_at
  BEFORE UPDATE ON public.treatments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample treatments data
INSERT INTO public.treatments (name, description, price, currency, image_url, category, duration_minutes, featured, benefits) VALUES
('HydraFacial', 'A non-invasive treatment that cleanses, extracts, and hydrates your skin using patented Vortex-Fusion technology.', 120.00, 'GBP', '/placeholder.svg', 'Facial Treatments', 60, true, ARRAY['Deep cleansing', 'Hydration', 'Instant glow', 'No downtime']),
('Microneedling', 'Stimulates collagen production to improve skin texture, reduce fine lines, and minimize pores.', 150.00, 'GBP', '/placeholder.svg', 'Anti-Aging Solutions', 75, false, ARRAY['Collagen boost', 'Texture improvement', 'Pore reduction', 'Scar treatment']),
('Chemical Peel', 'Exfoliates dead skin cells to reveal brighter, smoother skin underneath.', 80.00, 'GBP', '/placeholder.svg', 'Skin Rejuvenation', 45, false, ARRAY['Skin brightening', 'Texture smoothing', 'Acne treatment', 'Anti-aging']),
('LED Light Therapy', 'Uses specific wavelengths of light to target various skin concerns and promote healing.', 65.00, 'GBP', '/placeholder.svg', 'Skin Rejuvenation', 30, false, ARRAY['Acne treatment', 'Anti-inflammatory', 'Collagen production', 'Healing acceleration']),
('Dermaplaning', 'Gently removes dead skin cells and fine facial hair for instantly smoother skin.', 90.00, 'GBP', '/placeholder.svg', 'Facial Treatments', 45, false, ARRAY['Smooth skin', 'Better product absorption', 'Instant results', 'No downtime']);
