
-- Update all product image URLs to use the correct folder path ('product' instead of 'products')
UPDATE products 
SET image_url = REPLACE(image_url, '/site-images/products/', '/site-images/product/')
WHERE image_url LIKE '%/site-images/products/%';

-- Also update any URLs that might still have the old 'Products' path
UPDATE products 
SET image_url = REPLACE(image_url, '/site-images/Products/', '/site-images/product/')
WHERE image_url LIKE '%/site-images/Products/%';

-- Verify the updated URLs
SELECT name, image_url FROM products ORDER BY name;
