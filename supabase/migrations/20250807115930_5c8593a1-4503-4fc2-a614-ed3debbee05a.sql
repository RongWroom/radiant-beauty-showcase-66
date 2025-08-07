-- Comprehensive product variant consolidation
DO $$
DECLARE
    -- GeneXC variants
    genexc_15_id uuid;
    genexc_30_id uuid;
    genexc_15_price numeric;
    genexc_30_price numeric;
    
    -- Poly-Vitamin Serum variants  
    poly_15_id uuid;
    poly_30_id uuid;
    poly_15_price numeric;
    poly_30_price numeric;
    
    -- Lip Duo duplicates (same name, same price)
    lip_duo_1 uuid;
    lip_duo_2 uuid;
    
    -- Moisturising vs Moisturizing Complex (spelling variants)
    moist_1_id uuid;
    moist_2_id uuid;
    
    -- Pro-Heal Serum Advance+ variants
    proheal_15_id uuid;
    proheal_30_id uuid;
    proheal_15_price numeric;
    proheal_30_price numeric;
    
    -- Pure Calm Collection variants
    pure_calm_163_id uuid;
    pure_calm_260_id uuid;
    
    -- Reparative Moisture Emulsion variants
    rep_moist_50_id uuid;
    rep_moist_60_id uuid;
    rep_moist_50_price numeric;
    rep_moist_60_price numeric;
    
    -- Sheald Recovery Balm variants
    sheald_15_id uuid;
    sheald_60_id uuid;
    sheald_15_price numeric;
    sheald_60_price numeric;
    
    -- Super Serum Advance+ variants
    super_15_id uuid;
    super_30_id uuid;
    super_15_price numeric;
    super_30_price numeric;
    
    -- White Lightening variants
    white_15_id uuid;
    white_30_id uuid;
    white_15_price numeric;
    white_30_price numeric;
    
    -- Youth variations
    youth_comp_id uuid;
    youth_eye_comp_id uuid;
BEGIN
    -- GeneXC consolidation (15ml and 30ml)
    SELECT id, price INTO genexc_15_id, genexc_15_price FROM products WHERE name = 'GeneXC 15ML' LIMIT 1;
    SELECT id, price INTO genexc_30_id, genexc_30_price FROM products WHERE name = 'GeneXC 30ML' LIMIT 1;
    
    IF genexc_15_id IS NOT NULL AND genexc_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'GeneXC',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', genexc_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', genexc_15_price),
                    jsonb_build_object('size', '30ml', 'price', genexc_30_price)
                )
            )
        WHERE id = genexc_15_id;
        
        DELETE FROM products WHERE id = genexc_30_id;
    END IF;
    
    -- Poly-Vitamin Serum consolidation (15ml and 30ml)
    SELECT id, price INTO poly_15_id, poly_15_price FROM products WHERE name = 'Poly-Vitamin Serum 15ml' LIMIT 1;
    SELECT id, price INTO poly_30_id, poly_30_price FROM products WHERE name = 'Poly-Vitamin Serum 30ml' LIMIT 1;
    
    IF poly_15_id IS NOT NULL AND poly_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Poly-Vitamin Serum',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', poly_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', poly_15_price),
                    jsonb_build_object('size', '30ml', 'price', poly_30_price)
                )
            )
        WHERE id = poly_15_id;
        
        DELETE FROM products WHERE id = poly_30_id;
    END IF;
    
    -- Remove duplicate Lip Duo (same name, same price)
    SELECT id INTO lip_duo_1 FROM products WHERE name = 'Lip Duo' ORDER BY created_at ASC LIMIT 1;
    SELECT id INTO lip_duo_2 FROM products WHERE name = 'Lip Duo' AND id != lip_duo_1 LIMIT 1;
    
    IF lip_duo_2 IS NOT NULL THEN
        DELETE FROM products WHERE id = lip_duo_2;
    END IF;
    
    -- Consolidate Moisturising vs Moisturizing Complex (spelling variants)
    SELECT id INTO moist_1_id FROM products WHERE name = 'Moisturising Complex' LIMIT 1;
    SELECT id INTO moist_2_id FROM products WHERE name = 'Moisturizing Complex' LIMIT 1;
    
    IF moist_1_id IS NOT NULL AND moist_2_id IS NOT NULL THEN
        UPDATE products SET name = 'Moisturizing Complex' WHERE id = moist_1_id;
        DELETE FROM products WHERE id = moist_2_id;
    END IF;
    
    -- Pro-Heal Serum Advance+ consolidation
    SELECT id, price INTO proheal_15_id, proheal_15_price FROM products WHERE name = 'Pro-Heal Serum Advance+ 15ml' LIMIT 1;
    SELECT id, price INTO proheal_30_id, proheal_30_price FROM products WHERE name = 'Pro-Heal Serum Advance+ 30ml' LIMIT 1;
    
    IF proheal_15_id IS NOT NULL AND proheal_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Pro-Heal Serum Advance+',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', proheal_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', proheal_15_price),
                    jsonb_build_object('size', '30ml', 'price', proheal_30_price)
                )
            )
        WHERE id = proheal_15_id;
        
        DELETE FROM products WHERE id = proheal_30_id;
    END IF;
    
    -- Pure Calm Collection consolidation (different prices)
    SELECT id INTO pure_calm_163_id FROM products WHERE name = 'Pure Calm Collection' AND price = 163.00 LIMIT 1;
    SELECT id INTO pure_calm_260_id FROM products WHERE name = 'Pure Calm Collection' AND price = 260.00 LIMIT 1;
    
    IF pure_calm_163_id IS NOT NULL AND pure_calm_260_id IS NOT NULL THEN
        UPDATE products 
        SET sizes = jsonb_build_object(
                'default', jsonb_build_object('size', 'Basic', 'price', 163.00),
                'options', jsonb_build_array(
                    jsonb_build_object('size', 'Basic', 'price', 163.00),
                    jsonb_build_object('size', 'Complete', 'price', 260.00)
                )
            )
        WHERE id = pure_calm_163_id;
        
        DELETE FROM products WHERE id = pure_calm_260_id;
    END IF;
    
    -- Reparative Moisture Emulsion consolidation
    SELECT id, price INTO rep_moist_50_id, rep_moist_50_price FROM products WHERE name = 'Reparative Moisture Emulsion 50g' LIMIT 1;
    SELECT id, price INTO rep_moist_60_id, rep_moist_60_price FROM products WHERE name = 'Reparative Moisture Emulsion 60g' LIMIT 1;
    
    IF rep_moist_50_id IS NOT NULL AND rep_moist_60_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Reparative Moisture Emulsion',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '50g', 'price', rep_moist_50_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '50g', 'price', rep_moist_50_price),
                    jsonb_build_object('size', '60g', 'price', rep_moist_60_price)
                )
            )
        WHERE id = rep_moist_50_id;
        
        DELETE FROM products WHERE id = rep_moist_60_id;
    END IF;
    
    -- Sheald Recovery Balm consolidation
    SELECT id, price INTO sheald_15_id, sheald_15_price FROM products WHERE name = 'Sheald Recovery Balm 15g' LIMIT 1;
    SELECT id, price INTO sheald_60_id, sheald_60_price FROM products WHERE name = 'Sheald Recovery Balm 60g' LIMIT 1;
    
    IF sheald_15_id IS NOT NULL AND sheald_60_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Sheald Recovery Balm',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15g', 'price', sheald_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15g', 'price', sheald_15_price),
                    jsonb_build_object('size', '60g', 'price', sheald_60_price)
                )
            )
        WHERE id = sheald_15_id;
        
        DELETE FROM products WHERE id = sheald_60_id;
    END IF;
    
    -- Super Serum Advance+ consolidation
    SELECT id, price INTO super_15_id, super_15_price FROM products WHERE name = 'Super Serum Advance+ 15ml' LIMIT 1;
    SELECT id, price INTO super_30_id, super_30_price FROM products WHERE name = 'Super Serum Advance+ 30ml' LIMIT 1;
    
    IF super_15_id IS NOT NULL AND super_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Super Serum Advance+',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', super_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', super_15_price),
                    jsonb_build_object('size', '30ml', 'price', super_30_price)
                )
            )
        WHERE id = super_15_id;
        
        DELETE FROM products WHERE id = super_30_id;
    END IF;
    
    -- White Lightening consolidation
    SELECT id, price INTO white_15_id, white_15_price FROM products WHERE name = 'White Lightening 15g' LIMIT 1;
    SELECT id, price INTO white_30_id, white_30_price FROM products WHERE name = 'White Lightening 30g' LIMIT 1;
    
    IF white_15_id IS NOT NULL AND white_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'White Lightening',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15g', 'price', white_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15g', 'price', white_15_price),
                    jsonb_build_object('size', '30g', 'price', white_30_price)
                )
            )
        WHERE id = white_15_id;
        
        DELETE FROM products WHERE id = white_30_id;
    END IF;
    
    -- Youth variations consolidation
    SELECT id INTO youth_comp_id FROM products WHERE name = 'Youth Complex' LIMIT 1;
    SELECT id INTO youth_eye_comp_id FROM products WHERE name = 'Youth Eye Complex' LIMIT 1;
    
    -- Keep both as they are different products (general vs eye-specific)
END $$;