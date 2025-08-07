import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { imageUrl, fileName } = await req.json();

    if (!imageUrl || !fileName) {
      throw new Error('imageUrl and fileName are required');
    }

    console.log(`Migrating image: ${fileName} from ${imageUrl}`);

    // Download the image from external URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/webp';
    
    // Generate clean filename
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `product/${cleanFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(filePath, imageBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    const newImageUrl = urlData.publicUrl;
    
    console.log(`Image migrated successfully: ${newImageUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        originalUrl: imageUrl,
        newUrl: newImageUrl,
        fileName: cleanFileName 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error migrating image:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        originalUrl: imageUrl 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});