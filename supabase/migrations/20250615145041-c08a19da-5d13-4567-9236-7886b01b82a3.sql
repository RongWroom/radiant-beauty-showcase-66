
-- Add image_url and featured columns to the products table
ALTER TABLE products 
ADD COLUMN image_url TEXT,
ADD COLUMN featured BOOLEAN DEFAULT FALSE;
