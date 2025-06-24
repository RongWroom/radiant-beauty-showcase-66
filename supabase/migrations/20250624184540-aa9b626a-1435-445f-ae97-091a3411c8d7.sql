
UPDATE treatments 
SET image_url = 'https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/treatment/Cryo%201.jpeg',
    updated_at = now()
WHERE name = 'Cryolipolysis (Fat Freeze)' OR name = 'Cyrolipolysis (Fat Freeze)';
