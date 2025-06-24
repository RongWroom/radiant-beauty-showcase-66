
-- Update remaining products with their correct image URLs

-- Active Peel System
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/active peel system.webp'
WHERE name ILIKE '%active%peel%system%';

-- Active serum 30ml
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/active_serum_5b08f585-34d7-4377-a24e-b5c294257721_720x.webp'
WHERE name ILIKE '%active%serum%30ml%';

-- Active serum 15ml (same image as 30ml)
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/active_serum_5b08f585-34d7-4377-a24e-b5c294257721_720x.webp'
WHERE name ILIKE '%active%serum%15ml%';

-- Brightening Complex
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/BrighteningComplex_720x.webp'
WHERE name ILIKE '%brightening%complex%';

-- C Eye Advance +
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/c_eye_serum_advance_a95623e1-eb90-4f75-abf3-0540620b969c_1024x1024.webp'
WHERE name ILIKE '%c%eye%advance%';

-- Cream Cleanser
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/cream_cleanser_6ea2eb49-89c6-4b99-b2c0-0e3cd0961760_720x.webp'
WHERE name ILIKE '%cream%cleanser%';

-- Verify all updates
SELECT name, image_url 
FROM products 
WHERE name ILIKE '%active%peel%system%'
   OR name ILIKE '%active%serum%'
   OR name ILIKE '%brightening%complex%'
   OR name ILIKE '%c%eye%advance%'
   OR name ILIKE '%cream%cleanser%'
ORDER BY name;
