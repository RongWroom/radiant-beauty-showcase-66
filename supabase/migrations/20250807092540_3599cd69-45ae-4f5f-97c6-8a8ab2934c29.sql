-- Clear existing products and create improved migration function
-- First, let's truncate the products table to start fresh
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- Create an improved migration function with better name matching and logging
CREATE OR REPLACE FUNCTION public.migrate_product_data(product_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result jsonb;
  insert_count integer := 0;
  product jsonb;
  benefits_array text[];
  sizes_json jsonb;
  base_name text;
  final_price numeric;
BEGIN
  -- Initialize result
  result := jsonb_build_object('updated', 0, 'inserted', 0, 'errors', '[]'::jsonb, 'debug_info', '[]'::jsonb);
  
  -- Since we truncated, we'll insert all products fresh
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
      
      -- Use baseName if available, otherwise use name
      base_name := COALESCE(product->>'baseName', product->>'name');
      
      -- Get the price - use the default price from sizes if available
      final_price := (product->>'price')::numeric;
      IF product->'sizes'->'default'->'price' IS NOT NULL THEN
        final_price := (product->'sizes'->'default'->>'price')::numeric;
      END IF;
      
      -- Process sizes properly - ensure we have valid sizes structure
      sizes_json := product->'sizes';
      IF sizes_json IS NULL OR jsonb_typeof(sizes_json) = 'null' THEN
        sizes_json := jsonb_build_object(
          'default', jsonb_build_object('size', 'Standard', 'price', final_price),
          'options', jsonb_build_array(jsonb_build_object('size', 'Standard', 'price', final_price))
        );
      END IF;
      
      -- Add debug info for tracking
      result := jsonb_set(result, '{debug_info}', (result->'debug_info') || jsonb_build_array(
        jsonb_build_object(
          'processing_product', base_name,
          'original_name', product->>'name',
          'price', final_price,
          'has_sizes', (sizes_json IS NOT NULL),
          'sizes_options_count', jsonb_array_length(sizes_json->'options')
        )
      ));
      
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
        base_name,
        product->>'description',
        final_price,
        COALESCE(product->>'currency', 'GBP'),
        benefits_array,
        product->>'image_url',
        COALESCE((product->>'featured')::boolean, false),
        COALESCE(product->>'category', 'Skincare'),
        sizes_json,
        now(),
        now()
      );
      
      insert_count := insert_count + 1;
      
    EXCEPTION WHEN OTHERS THEN
      -- Log error but continue processing
      result := jsonb_set(result, '{errors}', (result->'errors') || jsonb_build_array(
        jsonb_build_object(
          'product', base_name,
          'error', SQLERRM,
          'sqlstate', SQLSTATE
        )
      ));
    END;
  END LOOP;
  
  -- Update result counts
  result := jsonb_set(result, '{updated}', to_jsonb(0)); -- No updates since we truncated
  result := jsonb_set(result, '{inserted}', to_jsonb(insert_count));
  
  RETURN result;
END;
$function$;