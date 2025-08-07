-- Consolidate SPF products into variants
-- Eclipse SPF 50+ variants
DO $$
DECLARE
    base_product_id uuid;
    translucent_id uuid;
    beige_id uuid;
    translucent_price numeric;
    beige_price numeric;
BEGIN
    -- Get IDs and prices for Eclipse SPF 50+ products
    SELECT id, price INTO translucent_id, translucent_price FROM products WHERE name = 'Eclipse SPF 50+ Translucent' LIMIT 1;
    SELECT id, price INTO beige_id, beige_price FROM products WHERE name = 'Eclipse SPF 50+ Beige' LIMIT 1;
    
    -- Use translucent as base product, update its name and sizes
    UPDATE products 
    SET name = 'Eclipse SPF 50+',
        sizes = jsonb_build_object(
            'default', jsonb_build_object('size', 'Translucent', 'price', translucent_price),
            'options', jsonb_build_array(
                jsonb_build_object('size', 'Translucent', 'price', translucent_price),
                jsonb_build_object('size', 'Beige', 'price', beige_price)
            )
        )
    WHERE id = translucent_id;
    
    -- Delete the separate beige product
    DELETE FROM products WHERE id = beige_id;
    
    -- Extreme Protect SPF 40 variants (handling duplicates)
    DECLARE
        extreme_translucent_id uuid;
        extreme_beige_id uuid;
        extreme_bronze_id uuid;
        extreme_translucent_price numeric;
        extreme_beige_price numeric;
        extreme_bronze_price numeric;
    BEGIN
        -- Get first instance of each variant
        SELECT id, price INTO extreme_translucent_id, extreme_translucent_price FROM products WHERE name = 'Extreme Protect SPF 40 Translucent' LIMIT 1;
        SELECT id, price INTO extreme_beige_id, extreme_beige_price FROM products WHERE name = 'Extreme Protect SPF 40 Beige' LIMIT 1;
        SELECT id, price INTO extreme_bronze_id, extreme_bronze_price FROM products WHERE name = 'Extreme Protect SPF 40 Bronze' LIMIT 1;
        
        -- Update translucent as base product
        UPDATE products 
        SET name = 'Extreme Protect SPF 40',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', 'Translucent', 'price', extreme_translucent_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', 'Translucent', 'price', extreme_translucent_price),
                    jsonb_build_object('size', 'Beige', 'price', extreme_beige_price),
                    jsonb_build_object('size', 'Bronze', 'price', extreme_bronze_price)
                )
            )
        WHERE id = extreme_translucent_id;
        
        -- Delete duplicates and other variants
        DELETE FROM products WHERE name IN ('Extreme Protect SPF 40 Beige', 'Extreme Protect SPF 40 Bronze', 'Extreme Protect SPF 40 Translucent') AND id != extreme_translucent_id;
    END;
    
    -- PerfecTint Powder SPF 40 variants
    DECLARE
        perfectint_ivory_id uuid;
        perfectint_cream_id uuid;
        perfectint_beige_id uuid;
        perfectint_bronze_id uuid;
        perfectint_deep_id uuid;
        perfectint_ivory_price numeric;
        perfectint_cream_price numeric;
        perfectint_beige_price numeric;
        perfectint_bronze_price numeric;
        perfectint_deep_price numeric;
    BEGIN
        -- Get all PerfecTint variants
        SELECT id, price INTO perfectint_ivory_id, perfectint_ivory_price FROM products WHERE name = 'PerfecTint Powder SPF 40 Ivory' LIMIT 1;
        SELECT id, price INTO perfectint_cream_id, perfectint_cream_price FROM products WHERE name = 'PerfecTint Powder SPF 40 Cream' LIMIT 1;
        SELECT id, price INTO perfectint_beige_id, perfectint_beige_price FROM products WHERE name = 'PerfecTint Powder SPF 40 Beige' LIMIT 1;
        SELECT id, price INTO perfectint_bronze_id, perfectint_bronze_price FROM products WHERE name = 'PerfecTint Powder SPF 40 Bronze' LIMIT 1;
        SELECT id, price INTO perfectint_deep_id, perfectint_deep_price FROM products WHERE name = 'PerfecTint Powder SPF 40 Deep' LIMIT 1;
        
        -- Update ivory as base product
        UPDATE products 
        SET name = 'PerfecTint Powder SPF 40',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', 'Ivory', 'price', perfectint_ivory_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', 'Ivory', 'price', perfectint_ivory_price),
                    jsonb_build_object('size', 'Cream', 'price', perfectint_cream_price),
                    jsonb_build_object('size', 'Beige', 'price', perfectint_beige_price),
                    jsonb_build_object('size', 'Bronze', 'price', perfectint_bronze_price),
                    jsonb_build_object('size', 'Deep', 'price', perfectint_deep_price)
                )
            )
        WHERE id = perfectint_ivory_id;
        
        -- Delete other variants
        DELETE FROM products WHERE name IN ('PerfecTint Powder SPF 40 Cream', 'PerfecTint Powder SPF 40 Beige', 'PerfecTint Powder SPF 40 Bronze', 'PerfecTint Powder SPF 40 Deep');
    END;
END $$;