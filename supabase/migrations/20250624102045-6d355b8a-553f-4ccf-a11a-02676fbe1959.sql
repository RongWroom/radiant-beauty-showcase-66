
-- First, let's check what exact image URLs we have in the database
SELECT name, image_url FROM products WHERE image_url IS NOT NULL ORDER BY name;

-- Update the moisturising complex URL (notice the spelling)
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/moisturising-complex.jpg'
WHERE name ILIKE '%moisturis%complex%';

-- Update cleansing complex to use simpler filename
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/cleansing-complex.jpg'
WHERE name ILIKE '%cleansing%complex%';

-- Update GeneXC serum
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/genexc-serum.jpg'
WHERE name ILIKE '%genexc%';

-- Ensure the storage bucket is publicly accessible
UPDATE storage.buckets SET public = true WHERE id = 'site-images';

-- Drop existing policy if it exists and create a new one for public read access
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
