
-- Update products with corrected SEO data, descriptions, and categories

-- Update Retinol 0.3
UPDATE products SET 
  name = 'Retinol 0.3',
  description = 'A highly active, fast-acting retinol emulsion featuring botanical origin retinol encapsulated with bio-identical lipids for optimal delivery. Enhanced with antioxidants and Extremozymes® to boost skin condition and resilience whilst promoting normal skin epithelialisation.',
  price = 115,
  currency = 'GBP',
  product_benefits = ARRAY['Reduces the appearance of fine lines and wrinkles', 'diminishes uneven skin tones and textures', 'protects from environmental stress with Extremozyme® technology', 'strengthens and hydrates skin', 'increases firmness and elasticity'],
  category = 'Specialty',
  updated_at = now()
WHERE id = '122f5510-bab9-46a1-aae2-56be6ec834f6';

-- Update Moisturising Complex (first instance)
UPDATE products SET 
  name = 'Moisturising Complex',
  description = 'A versatile, rich yet easily absorbed botanical complex that creates an antioxidant-rich barrier, sealing in moisture whilst insulating skin from environmental damage. Perfect for daily hydration and protection.',
  price = 98,
  currency = 'GBP',
  product_benefits = ARRAY['Provides deep hydration and moisture retention', 'creates protective antioxidant barrier', 'soothes and calms irritated skin', 'suitable for all skin types including sensitive skin'],
  category = 'Moisturizers',
  updated_at = now()
WHERE id = '2182dbf8-461e-4b98-a389-1fe1aadb193c';

-- Update Reparative Moisture Emulsion
UPDATE products SET 
  name = 'Reparative Moisture Emulsion',
  description = 'Rich hydration formula for dry skin, crafted with pharmaceutical grade botanicals, peptides, and powerful antioxidants. Features first-generation Extremozyme® protection clinically proven to help prevent DNA damage.',
  price = 105,
  currency = 'GBP',
  product_benefits = ARRAY['Smooths and hydrates skin', 'reduces appearance of fine lines and wrinkles', 'provides deep and surface hydration', 'prevents environmental damage with Extremozyme technology', 'excellent makeup preparation base'],
  category = 'Moisturizers',
  updated_at = now()
WHERE id = '24fe9cfe-b8a1-4671-8c92-d0b6dc2887fa';

-- Update Extreme Protect SPF 40 Translucent
UPDATE products SET 
  name = 'Extreme Protect SPF 40 Translucent',
  description = 'Ultra-lightweight, translucent broad-spectrum SPF 40 sunscreen providing superior protection without leaving white residue. Formulated with antioxidants for comprehensive skin defence.',
  price = 85,
  currency = 'GBP',
  product_benefits = ARRAY['Broad-spectrum UVA/UVB protection', 'lightweight translucent formula', 'suitable for all skin types', 'antioxidant protection', 'perfect for daily wear under makeup'],
  category = 'Sun Protection',
  updated_at = now()
WHERE id = '2d649e6d-21d4-4891-a6b1-33986479e1f2';

-- Update Pure Clarity Collection
UPDATE products SET 
  name = 'Pure Clarity Collection',
  description = 'Complete acne treatment system formulated with pharmaceutical grade botanical ingredients for cleansing, clearing, hydrating and protecting acne-prone skin. Includes Cleansing Complex, Active Serum, Hydra-Cool Serum, and Eclipse SPF 50.',
  price = 215,
  currency = 'GBP',
  product_benefits = ARRAY['Comprehensive acne treatment system', 'deep cleanses and exfoliates', 'reduces inflammation', 'provides hydration and SPF 50 protection', 'suitable for acne-prone and problematic skin'],
  category = 'Collections',
  updated_at = now()
WHERE id = '2f881ff1-e131-43bc-a05c-8f4191d7c634';

-- Update Extreme Protect SPF 40 Beige
UPDATE products SET 
  name = 'Extreme Protect SPF 40 Beige',
  description = 'Tinted broad-spectrum SPF 40 sunscreen in beige tone, providing excellent protection whilst evening out skin tone. Lightweight formula with antioxidant benefits.',
  price = 85,
  currency = 'GBP',
  product_benefits = ARRAY['Broad-spectrum UVA/UVB protection', 'light beige tint for natural coverage', 'antioxidant protection', 'suitable for all skin types', 'perfect for everyday wear'],
  category = 'Sun Protection',
  updated_at = now()
WHERE id = '342a536b-4900-421a-9233-8e4030c34e01';

-- Update Eclipse SPF 50
UPDATE products SET 
  name = 'Eclipse SPF 50',
  description = 'Ultra-sheer, broad-spectrum SPF 50+ specifically formulated for extended outdoor activities. This antioxidant-rich matte formula provides superior protection whilst remaining comfortable during active pursuits.',
  price = 50,
  currency = 'GBP',
  product_benefits = ARRAY['Ultra-high SPF 50+ protection', 'matte finish for extended wear', 'antioxidant-rich formula', 'ideal for outdoor activities', 'water-resistant protection'],
  category = 'Sun Protection',
  updated_at = now()
WHERE id = '36dacd97-941f-47af-9fb9-c207ba853b79';

-- Update Lip Duo
UPDATE products SET 
  name = 'Lip Duo',
  description = 'Complete lip care system featuring gentle lip polish with powerful Vitamin C and E antioxidants, and nourishing lip treatment for smooth, protected, and beautifully conditioned lips.',
  price = 90,
  currency = 'GBP',
  product_benefits = ARRAY['Gentle exfoliation with antioxidant protection', 'deeply nourishes and hydrates lips', 'smooths and refines lip texture', 'provides protective barrier', 'enhances lip appearance'],
  category = 'Specialty',
  updated_at = now()
WHERE id = '4dca19ba-b0c2-43ed-9f0e-7d7dfebd0364';

-- Update Moisturising Complex (second instance)
UPDATE products SET 
  name = 'Moisturising Complex',
  description = 'A versatile, rich yet easily absorbed botanical complex that creates an antioxidant-rich barrier, sealing in moisture whilst insulating skin from environmental damage. Perfect for daily hydration and protection.',
  price = 98,
  currency = 'GBP',
  product_benefits = ARRAY['Provides deep hydration and moisture retention', 'creates protective antioxidant barrier', 'soothes and calms irritated skin', 'suitable for all skin types including sensitive skin'],
  category = 'Moisturizers',
  updated_at = now()
WHERE id = '510cc108-1a17-4197-857c-c7ff252c3e74';

-- Update Brightening Complex
UPDATE products SET 
  name = 'Brightening Complex',
  description = 'An innovative blend of proprietary lightening ingredients and pharmaceutical grade botanicals designed to safely brighten skin tone whilst providing hydration and antioxidant protection.',
  price = 95,
  currency = 'GBP',
  product_benefits = ARRAY['Safe and effective skin brightening', 'reduces appearance of dark spots and hyperpigmentation', 'provides antioxidant protection', 'hydrates and nourishes skin', 'evens skin tone'],
  category = 'Specialty',
  updated_at = now()
WHERE id = '5555d5a7-aa40-4991-a30c-7ea05a068288';

-- Update Pure Renewal Collection
UPDATE products SET 
  name = 'Pure Renewal Collection',
  description = 'Comprehensive anti-ageing system designed to address fine lines and wrinkles whilst providing nourishment and protection. Complete regime for mature skin requiring renewal and revitalisation.',
  price = 285,
  currency = 'GBP',
  product_benefits = ARRAY['Addresses signs of ageing and fine lines', 'provides deep nourishment and hydration', 'protects from environmental damage', 'complete anti-ageing skincare regime', 'suitable for mature skin'],
  category = 'Collections',
  updated_at = now()
WHERE id = '6471a990-e18b-4a18-b685-654eea30553c';

-- Update Active Serum
UPDATE products SET 
  name = 'Active Serum',
  description = 'Our most popular fast-acting, results-orientated formula offering multiple benefits for problematic skin. Combines powerful botanicals with advanced technology for comprehensive skin improvement.',
  price = 141,
  currency = 'GBP',
  product_benefits = ARRAY['Fast-acting results for problematic skin', 'reduces blemishes and breakouts', 'improves skin texture and tone', 'provides antioxidant protection', 'suitable for acne-prone skin'],
  category = 'Serums',
  updated_at = now()
WHERE id = '68c4dc93-e136-4550-af70-bbd4b1c614e7';

-- Update Youth Eye Complex
UPDATE products SET 
  name = 'Youth Eye Complex',
  description = 'Breakthrough best-selling eye formula utilising clinically proven intelligent technology to smooth, hydrate, and reduce the appearance of puffiness and dark circles around the delicate eye area.',
  price = 115,
  currency = 'GBP',
  product_benefits = ARRAY['Smooths and hydrates delicate eye area', 'reduces appearance of puffiness and dark circles', 'targets fine lines around eyes', 'clinically proven technology', 'suitable for all skin types'],
  category = 'Eye Care',
  updated_at = now()
WHERE id = '693ea5f7-42bc-4dd0-bc33-0bc20e221d14';

-- Update Hydra Intensive Cooling Mask
UPDATE products SET 
  name = 'Hydra Intensive Cooling Mask',
  description = 'Reinvigorating treatment mask featuring natural botanical antioxidants including resveratrol, Centella Asiatica, and green tea for refreshing, soothing, and hydrating benefits.',
  price = 95,
  currency = 'GBP',
  product_benefits = ARRAY['Instantly refreshes and revitalises skin', 'provides intensive hydration', 'soothes and calms irritated skin', 'delivers powerful antioxidant benefits', 'suitable for all skin types'],
  category = 'Specialty',
  updated_at = now()
WHERE id = '767fe09c-5ab1-4db9-a4d0-3fe1d3e59b63';

-- Update Extreme Protect SPF 40 Bronze
UPDATE products SET 
  name = 'Extreme Protect SPF 40 Bronze',
  description = 'Tinted broad-spectrum SPF 40 sunscreen in bronze tone, providing excellent protection whilst adding a subtle warm glow. Lightweight formula with antioxidant benefits.',
  price = 85,
  currency = 'GBP',
  product_benefits = ARRAY['Broad-spectrum UVA/UVB protection', 'bronze tint for natural warmth', 'antioxidant protection', 'suitable for all skin types', 'perfect for a subtle glow'],
  category = 'Sun Protection',
  updated_at = now()
WHERE id = '7bfe6419-ba90-4ea8-aaf6-5926677c02a7';

-- Update C Eye Advance+
UPDATE products SET 
  name = 'C Eye Advance+',
  description = 'Cutting-edge eye formulation effectively combining 7.5% concentrated Vitamin C with advanced peptides for revitalising, hydrating, and anti-ageing benefits around the delicate eye area.',
  price = 68,
  currency = 'GBP',
  product_benefits = ARRAY['High-concentration Vitamin C for eye area', 'reduces signs of ageing around eyes', 'brightens and revitalises delicate skin', 'provides antioxidant protection', 'improves skin firmness'],
  category = 'Eye Care',
  updated_at = now()
WHERE id = '8726ec81-0576-4624-a406-78b04fde3db5';

-- Update Liperfection Trio
UPDATE products SET 
  name = 'Liperfection Trio',
  description = 'Complete lip perfection system featuring everything needed to perfect and protect lips. Includes gentle lip polish, nourishing treatment, and SPF 35 protection for comprehensive lip care.',
  price = 95,
  currency = 'GBP',
  product_benefits = ARRAY['Complete lip care system', 'gentle exfoliation and renewal', 'deep hydration and nourishment', 'SPF 35 lip protection', 'smooths and refines lip texture'],
  category = 'Specialty',
  updated_at = now()
WHERE id = '92bc3fc2-c01e-4f0f-be35-fe50160dbd2e';

-- Update Pro-Heal Serum Advanced+
UPDATE products SET 
  name = 'Pro-Heal Serum Advanced+',
  description = 'Advanced Vitamin C serum featuring scientifically advanced time-release technology combined with superior botanical ingredients for potent antioxidant protection and skin healing benefits.',
  price = 157,
  currency = 'GBP',
  product_benefits = ARRAY['Potent antioxidant protection with time-release Vitamin C', 'soothes and calms irritated skin', 'improves appearance of blemishes and breakouts', 'enhances skin healing', 'suitable for sensitive skin'],
  category = 'Serums',
  updated_at = now()
WHERE id = '9422510b-c17f-4d02-b7b9-74bb2cbbc5cb';

-- Update Youth Intensive Crème
UPDATE products SET 
  name = 'Youth Intensive Crème',
  description = 'Clinically proven rich and luxurious crème combining the purest and most effective botanically-derived ingredients for intensive anti-ageing and skin renewal benefits.',
  price = 383,
  currency = 'GBP',
  product_benefits = ARRAY['Intensive anti-ageing treatment', 'deeply nourishes and regenerates skin', 'improves skin elasticity and firmness', 'reduces appearance of fine lines and wrinkles', 'luxurious botanical formula'],
  category = 'Moisturizers',
  updated_at = now()
WHERE id = '975bf7a0-182b-4800-b07b-f7565597be06';

-- Update Pure Calm Collection
UPDATE products SET 
  name = 'Pure Calm Collection',
  description = 'Complete skincare system for inflamed and sensitive skin, formulated with pharmaceutical grade botanical ingredients for cleansing, antioxidant protection, hydration, and SPF 50 protection.',
  price = 210,
  currency = 'GBP',
  product_benefits = ARRAY['Specifically designed for sensitive and inflamed skin', 'gentle cleansing and soothing benefits', 'provides antioxidant protection', 'includes hydration and SPF 50 protection', 'complete sensitive skin regime'],
  category = 'Collections',
  updated_at = now()
WHERE id = '9bc3098f-2aa5-4b50-96e3-9991a7aea176';
