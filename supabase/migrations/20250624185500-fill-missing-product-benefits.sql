
-- Fill in missing product benefits for products that don't have them
UPDATE products 
SET product_benefits = ARRAY[
  'Smooths and hydrates the skin',
  'Helps reduce the appearance of fine lines and wrinkles',
  'Provides both deep and surface hydration',
  'Helps prevent environmental damage with Extremozyme technology',
  'Excellent moisturizing prep for makeup',
  'Great for all skin types including oily and sensitive skin'
]
WHERE name ILIKE '%Reparative Moisture Emulsion%' 
AND (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);

UPDATE products 
SET product_benefits = ARRAY[
  'Provides antioxidant-rich protective barrier',
  'Provides both deep and surface hydration',
  'Reduces the appearance of fine lines and wrinkles',
  'Smooths and softens skin texture',
  'Helps protect against environmental damage',
  'Suitable for all skin types'
]
WHERE name ILIKE '%Moisturising Complex%' 
AND (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);

UPDATE products 
SET product_benefits = ARRAY[
  'Anti-acneic and deep cleansing properties',
  'Gentle enough for hypersensitive skin',
  'Thoroughly cleanses without stripping natural oils',
  'Contains bionutrients and antioxidants',
  'Helps remove impurities and makeup',
  'Maintains skin''s natural pH balance'
]
WHERE name ILIKE '%Cleansing Complex%' 
AND (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);

UPDATE products 
SET product_benefits = ARRAY[
  'Protects and revitalises skin foundation',
  'Stimulates genes associated with aging',
  'Enhances hydration and skin barrier function',
  'Provides multi-level antioxidant protection',
  'Helps improve skin texture and tone',
  'Contains proprietary Extremozymes technology'
]
WHERE name ILIKE '%GeneXC Serum%' 
AND (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);

UPDATE products 
SET product_benefits = ARRAY[
  'Provides potent antioxidant protection',
  'Soothes and calms irritated skin',
  'Helps improve the appearance of blemish-prone skin',
  'Helps reduce the appearance of fine lines and wrinkles',
  'Helps revitalise the appearance of aging and sensitive skin',
  'Features time-release Vitamin C technology'
]
WHERE name ILIKE '%Pro-Heal Serum Advanced+%' 
AND (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);

-- Update any other products that might be missing benefits with generic skincare benefits
UPDATE products 
SET product_benefits = ARRAY[
  'Improves overall skin health and appearance',
  'Provides essential nutrients for skin vitality',
  'Helps maintain healthy skin barrier function',
  'Suitable for daily skincare routine',
  'Formulated with high-quality ingredients'
]
WHERE (product_benefits IS NULL OR array_length(product_benefits, 1) IS NULL);
