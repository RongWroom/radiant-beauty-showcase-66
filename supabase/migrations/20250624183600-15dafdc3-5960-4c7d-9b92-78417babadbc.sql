
-- Update treatment images with the correct Supabase storage URLs
UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Cryo%201.jpeg',
    updated_at = now()
WHERE name = 'Cyrolipolysis (Fat Freeze)';

UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Hifu%201.jpeg',
    updated_at = now()
WHERE name = 'Ultra 4D HIFU';

UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Hydrafacial.jpeg',
    updated_at = now()
WHERE name = 'HydraFacial';

UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Laser.jpeg',
    updated_at = now()
WHERE name = 'Laser Hair Removal';

UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/STW_Aesthetic_machine.jpeg',
    updated_at = now()
WHERE name LIKE '%Skin Tightening%' OR name LIKE '%Fibroblast%';

-- Update any remaining treatments without proper images with unused professional images
UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/stw_clinic.jpeg',
    updated_at = now()
WHERE image_url IS NULL OR image_url = '/placeholder.svg' OR image_url LIKE '/site-images/%';
