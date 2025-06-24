
-- Update product image URLs to point to Supabase storage
UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/pro-heal-serum-30ml.jpg' WHERE name = 'Pro-Heal Serum Advanced+ 30ml';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/pro-heal-serum-15ml.jpg' WHERE name = 'Pro-Heal Serum Advanced+ 15ml';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/reparative-moisture-emulsion.jpg' WHERE name = 'Reparative Moisture Emulsion';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/moisturising-complex.jpg' WHERE name = 'Moisturising Complex';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/cleansing-complex.jpg' WHERE name = 'Cleansing Complex';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/genexc-serum.jpg' WHERE name = 'GeneXC Serum';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/revival-masque.jpg' WHERE name = 'Revival Masque';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/exfoliating-cleanser.jpg' WHERE name = 'Exfoliating Cleanser';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/daily-protection.jpg' WHERE name = 'Daily Protection';

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/antioxidant-infusion.jpg' WHERE name = 'Antioxidant Infusion';

-- Ensure the storage bucket is publicly accessible
UPDATE storage.buckets SET public = true WHERE id = 'site-images';

-- Create RLS policy for public read access to site-images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
