-- Fix the migrate_product_data function to handle JSONB array conversion properly
CREATE OR REPLACE FUNCTION public.migrate_product_data(
  product_data jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  existing_product_id uuid;
  update_count integer := 0;
  insert_count integer := 0;
  product jsonb;
  benefits_array text[];
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
      
      -- Check if product exists by name
      SELECT id INTO existing_product_id 
      FROM products 
      WHERE name = product->>'name'
      LIMIT 1;
      
      IF existing_product_id IS NOT NULL THEN
        -- Update existing product
        UPDATE products SET
          description = product->>'description',
          price = (product->>'price')::numeric,
          currency = product->>'currency',
          product_benefits = benefits_array,
          image_url = product->>'image_url',
          featured = COALESCE((product->>'featured')::boolean, false),
          category = product->>'category',
          sizes = CASE 
            WHEN product->'sizes' IS NOT NULL 
            THEN product->'sizes'
            ELSE jsonb_build_object('default', jsonb_build_object('size', 'Standard', 'price', (product->>'price')::numeric))
          END,
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
          product->>'name',
          product->>'description',
          (product->>'price')::numeric,
          product->>'currency',
          benefits_array,
          product->>'image_url',
          COALESCE((product->>'featured')::boolean, false),
          product->>'category',
          CASE 
            WHEN product->'sizes' IS NOT NULL 
            THEN product->'sizes'
            ELSE jsonb_build_object('default', jsonb_build_object('size', 'Standard', 'price', (product->>'price')::numeric))
          END,
          now(),
          now()
        );
        
        insert_count := insert_count + 1;
      END IF;
      
    EXCEPTION WHEN OTHERS THEN
      -- Log error but continue processing
      result := jsonb_set(result, '{errors}', (result->'errors') || jsonb_build_array(
        jsonb_build_object(
          'product', product->>'name',
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
$$;