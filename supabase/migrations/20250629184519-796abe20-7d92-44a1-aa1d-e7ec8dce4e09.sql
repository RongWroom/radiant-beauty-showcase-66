
-- Add category column to products table
ALTER TABLE public.products 
ADD COLUMN category text DEFAULT 'Skincare';

-- Update existing products with appropriate categories based on their names
UPDATE public.products 
SET category = CASE 
  WHEN name ILIKE '%serum%' THEN 'Serums'
  WHEN name ILIKE '%moistur%' OR name ILIKE '%emulsion%' OR name ILIKE '%complex%' THEN 'Moisturizers'
  WHEN name ILIKE '%cleans%' THEN 'Cleansers'
  ELSE 'Skincare'
END;
