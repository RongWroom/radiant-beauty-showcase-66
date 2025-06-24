
-- Update treatment images with the uploaded images from /site-images/treatment
UPDATE treatments 
SET image_url = '/site-images/treatment/Cryo 1.jpeg',
    updated_at = now()
WHERE name = 'Cyrolipolysis (Fat Freeze)';

UPDATE treatments 
SET image_url = '/site-images/treatment/Hifu 1.jpeg',
    updated_at = now()
WHERE name = 'Ultra 4D HIFU';

UPDATE treatments 
SET image_url = '/site-images/treatment/Hydrafacial.jpeg',
    updated_at = now()
WHERE name = 'HydraFacial';

UPDATE treatments 
SET image_url = '/site-images/treatment/Laser.jpeg',
    updated_at = now()
WHERE name = 'Laser Hair Removal';

-- Update Skin Tightening treatment if it exists
UPDATE treatments 
SET image_url = '/site-images/treatment/STW_Aesthetic_machine.jpeg',
    updated_at = now()
WHERE name LIKE '%Skin Tightening%' OR name LIKE '%Fibroblast%';

-- If there are any other treatments without images, give them a default professional image
UPDATE treatments 
SET image_url = '/site-images/treatment/stw_clinic.jpeg',
    updated_at = now()
WHERE image_url IS NULL OR image_url = '/placeholder.svg';
