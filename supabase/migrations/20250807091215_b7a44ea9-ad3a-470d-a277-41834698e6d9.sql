-- Fix the migrate_product_data function to handle variant consolidation properly
CREATE OR REPLACE FUNCTION public.migrate_product_data(product_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result jsonb;
  existing_product_id uuid;
  update_count integer := 0;
  insert_count integer := 0;
  product jsonb;
  benefits_array text[];
  sizes_json jsonb;
BEGIN
  -- Initialize result
  result := jsonb_build_object('updated', 0, 'inserted', 0, 'errors', '[]'::jsonb);
  
  -- Loop through each product in the input array
  FOR product IN SELECT * FROM jsonb_array_elements(product_data)
  LOOP
    BEGIN
      -- Convert JSONB array to text array for product_benefits
      benefits_array := NULL;
      IF product->'product_benefits' IS NOT NULL AND jsonb_typeof(product->'product_benefits') = 'array' THEN
        SELECT array_agg(value)
        INTO benefits_array
        FROM jsonb_array_elements_text(product->'product_benefits') AS value;
      END IF;
      
      -- Process sizes properly
      sizes_json := product->'sizes';
      IF sizes_json IS NULL OR jsonb_typeof(sizes_json) = 'null' THEN
        sizes_json := jsonb_build_object(
          'default', jsonb_build_object('size', 'Standard', 'price', (product->>'price')::numeric),
          'options', jsonb_build_array(jsonb_build_object('size', 'Standard', 'price', (product->>'price')::numeric))
        );
      END IF;
      
      -- Check if product exists by base name or original name
      SELECT id INTO existing_product_id 
      FROM products 
      WHERE name = COALESCE(product->>'baseName', product->>'name')
      LIMIT 1;
      
      IF existing_product_id IS NOT NULL THEN
        -- Update existing product with consolidated data
        UPDATE products SET
          name = COALESCE(product->>'baseName', product->>'name'),
          description = product->>'description',
          price = (product->>'price')::numeric,
          currency = product->>'currency',
          product_benefits = benefits_array,
          image_url = product->>'image_url',
          featured = COALESCE((product->>'featured')::boolean, false),
          category = product->>'category',
          sizes = sizes_json,
          updated_at = now()
        WHERE id = existing_product_id;
        
        update_count := update_count + 1;
      ELSE
        -- Insert new product
        INSERT INTO products (
          id,
          name,
          description,
          price,
          currency,
          product_benefits,
          image_url,
          featured,
          category,
          sizes,
          created_at,
          updated_at
        ) VALUES (
          COALESCE((product->>'id')::uuid, gen_random_uuid()),
          COALESCE(product->>'baseName', product->>'name'),
          product->>'description',
          (product->>'price')::numeric,
          product->>'currency',
          benefits_array,
          product->>'image_url',
          COALESCE((product->>'featured')::boolean, false),
          product->>'category',
          sizes_json,
          now(),
          now()
        );
        
        insert_count := insert_count + 1;
      END IF;
      
    EXCEPTION WHEN OTHERS THEN
      -- Log error but continue processing
      result := jsonb_set(result, '{errors}', (result->'errors') || jsonb_build_array(
        jsonb_build_object(
          'product', COALESCE(product->>'baseName', product->>'name'),
          'error', SQLERRM,
          'sqlstate', SQLSTATE
        )
      ));
    END;
  END LOOP;
  
  -- Update result counts
  result := jsonb_set(result, '{updated}', to_jsonb(update_count));
  result := jsonb_set(result, '{inserted}', to_jsonb(insert_count));
  
  RETURN result;
END;
$function$;