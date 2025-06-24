
-- First, let's see which products still don't have image URLs
SELECT id, name, image_url FROM products WHERE image_url IS NULL OR image_url = '';

-- Update any remaining products that might have slightly different names
-- These are case-sensitive exact matches for common variations
UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/pro-heal-serum-30ml.jpg' WHERE name ILIKE '%Pro-Heal%30ml%' AND image_url IS NULL;

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/pro-heal-serum-15ml.jpg' WHERE name ILIKE '%Pro-Heal%15ml%' AND image_url IS NULL;

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/reparative-moisture-emulsion.jpg' WHERE name ILIKE '%Reparative%Moisture%' AND image_url IS NULL;

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/moisturising-complex.jpg' WHERE name ILIKE '%Moisturis%Complex%' AND image_url IS NULL;

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/cleansing-complex.jpg' WHERE name ILIKE '%Cleansing%Complex%' AND image_url IS NULL;

UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/genexc-serum.jpg' WHERE name ILIKE '%GeneXC%' AND image_url IS NULL;

-- For any products that still don't match, use a generic approach
UPDATE products SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/Products/default-product.jpg' WHERE image_url IS NULL;

-- Verify all products now have image URLs
SELECT name, image_url FROM products ORDER BY name;
