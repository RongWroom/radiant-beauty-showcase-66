
-- Clear existing treatments data
DELETE FROM public.treatments;

-- Insert new treatments with proper data
INSERT INTO public.treatments (name, description, price, currency, image_url, category, duration_minutes, featured, benefits) VALUES
(
  'Cryolipolysis (Fat Freeze)', 
  'An exciting treatment for both men and women to help with problem areas. Cryolipolysis offers a viable alternative to Liposuction. It triggers a process that causes natural fat cell destruction. It is safe and non-invasive and has no downtime.',
  150.00, 
  'GBP', 
  '/placeholder.svg', 
  'Body Contouring', 
  120, 
  true, 
  ARRAY['Reduced Body Fat', 'Contours Body Shape', 'Non-invasive', 'No downtime', 'Safe alternative to liposuction']
),
(
  'Ultra 4D HIFU', 
  'A non-surgical one-off treatment which achieves lighter, firmer, tighter skin. This new technology for face lifting and body contouring has become one of the most sought after treatments, offering superior results whilst remaining non-invasive.',
  180.00, 
  'GBP', 
  '/placeholder.svg', 
  'Anti-Aging Solutions', 
  30, 
  true, 
  ARRAY['Non-invasive', 'Non-surgical', 'Completely safe', 'No damage to the body', 'Immediate and progressive results', 'No recovery time required', 'Long-lasting effects', 'Tightens loose or sagging skin', 'Anti-aging', 'Improved complexion', 'Fat reduction']
),
(
  'Fibroblast Plasma Skin Tightening', 
  'An absolutely revolutionary procedure that requires zero surgery. A non-surgical, non-invasive treatment designed to tighten and lift the skin, shrinking excess skin, crow''s feet, eye bags, lines, and wrinkles.',
  180.00, 
  'GBP', 
  '/placeholder.svg', 
  'Skin Tightening', 
  90, 
  false, 
  ARRAY['Eyelid lifting/tightening (hooded eyes)', 'Lower eyelid lifting/tightening', 'Wrinkle/Line reduction', 'Neck tightening', 'Reduction of upper or lower lip lines', 'Stretch marks and scars', 'Skin tag removal', 'Mole removal']
),
(
  'Post Treatment Follow-up', 
  'A follow up appointment to record your progress and ensure optimal results from your treatment.',
  0.00, 
  'GBP', 
  '/placeholder.svg', 
  'Follow-up Care', 
  30, 
  false, 
  ARRAY['Progress monitoring', 'Result assessment', 'Aftercare guidance', 'Complimentary service']
),
(
  'HydraFacial', 
  'HydraFacial has many benefits including a more hydrated, bright, plump, and clear complexion. It can also improve signs of aging. The treatment reduces fine lines and wrinkles, increases firmness, and evens skin tone & texture.',
  85.00, 
  'GBP', 
  '/placeholder.svg', 
  'Facial Treatments', 
  60, 
  true, 
  ARRAY['Cleansing & Exfoliating', 'Acid Peel', 'Painless automated extractions', 'Hydration with antioxidants', 'Hyaluronic acid infusion', 'Reduces fine lines and wrinkles', 'Increases firmness', 'Evens skin tone & texture', 'Reduces brown spots and enlarged pores']
),
(
  'Super Hair Removal (SHR)', 
  'One of the most recent advancements in IPL/Laser using OPT (Optimal Pulse Technology). Superior ability to deliver low energy with maximum efficiency, allowing for lighter fine hair and tanned skin to be treated safely.',
  20.00, 
  'GBP', 
  '/placeholder.svg', 
  'Hair Removal', 
  60, 
  false, 
  ARRAY['Permanently destroys hair follicles', 'Painless treatment', 'Can target fair and fine hair', 'Safely treats tanned skin', 'Low energy repetitive pulse laser', 'Concurrent contact cooling']
);
