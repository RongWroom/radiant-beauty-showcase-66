
-- Update Pro-Heal Serum Advanced+ 30ml to use the same image as 15ml
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/pro-heal_serum 15ml.webp'
WHERE name ILIKE '%pro-heal%serum%30ml%';

-- Check for other size variants that could share images
-- This will help us identify products with similar names but different sizes
SELECT name, image_url 
FROM products 
WHERE name ILIKE '%pro-heal%serum%' 
   OR name ILIKE '%active%serum%'
   OR name ILIKE '%youth%eye%'
ORDER BY name;
