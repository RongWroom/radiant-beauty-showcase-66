-- Consolidate duplicate Pure Clarity Collection products into variants
UPDATE products 
SET sizes = jsonb_build_object(
  'default', jsonb_build_object('size', '£215 Option', 'price', 215),
  'options', jsonb_build_array(
    jsonb_build_object('size', '£215 Option', 'price', 215),
    jsonb_build_object('size', '£220 Option', 'price', 220)
  )
)
WHERE name = 'Pure Clarity Collection' AND price = 215.00;

-- Delete the duplicate Pure Clarity Collection entry
DELETE FROM products 
WHERE name = 'Pure Clarity Collection' 
AND price = 220.00;

-- Update Pure Calm Collection to have proper variant structure
UPDATE products 
SET sizes = jsonb_build_object(
  'default', jsonb_build_object('size', 'Standard', 'price', 225),
  'options', jsonb_build_array(
    jsonb_build_object('size', 'Standard', 'price', 225),
    jsonb_build_object('size', 'Deluxe', 'price', 275)
  )
)
WHERE name = 'Pure Calm Collection';

-- Fix any remaining products with null prices in their default size
UPDATE products 
SET sizes = jsonb_set(
  sizes, 
  '{default,price}', 
  to_jsonb(price)
)
WHERE sizes->'default'->>'price' IS NULL;