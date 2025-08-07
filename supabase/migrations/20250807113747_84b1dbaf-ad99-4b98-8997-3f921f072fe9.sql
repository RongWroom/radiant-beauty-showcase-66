-- Consolidate size variants for products
DO $$
DECLARE
    -- Active Serum variants
    active_15_id uuid;
    active_30_id uuid;
    active_15_price numeric;
    active_30_price numeric;
    
    -- Brightening Serum variants
    bright_15_id uuid;
    bright_30_id uuid;
    bright_15_price numeric;
    bright_30_price numeric;
    
    -- Cleansing Complex variants
    clean_60_id uuid;
    clean_180_id uuid;
    clean_60_price numeric;
    clean_180_price numeric;
    
    -- Hydra-Cool Serum variants
    hydra_15_id uuid;
    hydra_30_id uuid;
    hydra_15_price numeric;
    hydra_30_price numeric;
BEGIN
    -- Active Serum consolidation
    SELECT id, price INTO active_15_id, active_15_price FROM products WHERE name = 'Active Serum 15ml' LIMIT 1;
    SELECT id, price INTO active_30_id, active_30_price FROM products WHERE name = 'Active Serum 30ml' LIMIT 1;
    
    IF active_15_id IS NOT NULL AND active_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Active Serum',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', active_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', active_15_price),
                    jsonb_build_object('size', '30ml', 'price', active_30_price)
                )
            )
        WHERE id = active_15_id;
        
        DELETE FROM products WHERE id = active_30_id;
    END IF;
    
    -- Brightening Serum consolidation
    SELECT id, price INTO bright_15_id, bright_15_price FROM products WHERE name = 'Brightening Serum 15ml' LIMIT 1;
    SELECT id, price INTO bright_30_id, bright_30_price FROM products WHERE name = 'Brightening Serum 30ml' LIMIT 1;
    
    IF bright_15_id IS NOT NULL AND bright_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Brightening Serum',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', bright_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', bright_15_price),
                    jsonb_build_object('size', '30ml', 'price', bright_30_price)
                )
            )
        WHERE id = bright_15_id;
        
        DELETE FROM products WHERE id = bright_30_id;
    END IF;
    
    -- Cleansing Complex consolidation  
    SELECT id, price INTO clean_60_id, clean_60_price FROM products WHERE name = 'Cleansing Complex 60ml' LIMIT 1;
    SELECT id, price INTO clean_180_id, clean_180_price FROM products WHERE name = 'Cleansing Complex 180ml' LIMIT 1;
    
    IF clean_60_id IS NOT NULL AND clean_180_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Cleansing Complex',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '60ml', 'price', clean_60_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '60ml', 'price', clean_60_price),
                    jsonb_build_object('size', '180ml', 'price', clean_180_price)
                )
            )
        WHERE id = clean_60_id;
        
        DELETE FROM products WHERE id = clean_180_id;
    END IF;
    
    -- Hydra-Cool Serum consolidation
    SELECT id, price INTO hydra_15_id, hydra_15_price FROM products WHERE name = 'Hydra-Cool Serum 15ml' LIMIT 1;
    SELECT id, price INTO hydra_30_id, hydra_30_price FROM products WHERE name = 'Hydra-Cool Serum 30ml' LIMIT 1;
    
    IF hydra_15_id IS NOT NULL AND hydra_30_id IS NOT NULL THEN
        UPDATE products 
        SET name = 'Hydra-Cool Serum',
            sizes = jsonb_build_object(
                'default', jsonb_build_object('size', '15ml', 'price', hydra_15_price),
                'options', jsonb_build_array(
                    jsonb_build_object('size', '15ml', 'price', hydra_15_price),
                    jsonb_build_object('size', '30ml', 'price', hydra_30_price)
                )
            )
        WHERE id = hydra_15_id;
        
        DELETE FROM products WHERE id = hydra_30_id;
    END IF;
END $$;