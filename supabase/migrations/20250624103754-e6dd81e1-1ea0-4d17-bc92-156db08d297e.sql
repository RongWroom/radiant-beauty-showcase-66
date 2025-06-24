
-- Update product image URLs to match actual uploaded filenames

-- Individual Products
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/isclinical-cleansing-complex-1024x701.jpg'
WHERE name ILIKE '%cleansing%complex%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/moisturising_complex_250x.webp'
WHERE name ILIKE '%moisturis%complex%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/pro-heal_serum 15ml.webp'
WHERE name ILIKE '%pro-heal%serum%15ml%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/reparative_moisture_emulsion.webp'
WHERE name ILIKE '%reparative%moisture%emulsion%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/isclinical-hydra-cool-serum-C-1024x701.jpg'
WHERE name ILIKE '%hydra%cool%serum%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/ISCLINICAL_EclipseSPF50_SKU1024_720x.webp'
WHERE name ILIKE '%eclipse%spf%50%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/isclinical-EP-SPF-30-F-1024x701.jpg'
WHERE name ILIKE '%extreme%protect%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/isclinical-youth-eye-complex-1024x701.jpg'
WHERE name ILIKE '%youth%eye%complex%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/iS-Clinical-Youth-Intensive-Creme.jpg'
WHERE name ILIKE '%youth%intensive%creme%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/poly_vitamin_serum_2108c3dd-46aa-430f-a0fd-dc2d90d6d4ac_720x.webp'
WHERE name ILIKE '%poly%vitamin%serum%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/super_serum_advance_3b122670-f642-4d21-85b2-653458e0e419_720x.webp'
WHERE name ILIKE '%super%serum%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/Hydra-Intensive_Cooling_Masque_720x.webp'
WHERE name ILIKE '%hydra%intensive%cooling%mask%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/tri-active_exfoliating_masque_ed5342c3-1a42-4417-84a7-7dc547ca2473_720x.webp'
WHERE name ILIKE '%tri%active%masque%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/Retinol 0.3.webp'
WHERE name ILIKE '%retinol%0.3%';

-- Collection Products
UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/LipDuo_720x.webp'
WHERE name ILIKE '%lip%duo%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/lip_trio_720x.webp'
WHERE name ILIKE '%liperfection%trio%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/PureCalmCollection_720x.webp'
WHERE name ILIKE '%pure%calm%collection%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/PureClarityCollection_720x.webp'
WHERE name ILIKE '%pure%clarity%collection%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/PureRenewal_720x.webp'
WHERE name ILIKE '%pure%renewal%collection%';

UPDATE products 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/youthful_hydration_collection_1024x1024.webp'
WHERE name ILIKE '%youthful%hydration%collection%';

-- Verify the updates
SELECT name, image_url FROM products WHERE image_url IS NOT NULL ORDER BY name;
