import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productsToMigrate = [
  {
    id: "122f5510-bab9-46a1-aae2-56be6ec834f6",
    name: "Retinol 0.3",
    description: "A highly active, fast-acting retinol emulsion featuring botanical origin retinol encapsulated with bio-identical lipids for optimal delivery. Enhanced with antioxidants and Extremozymes® to boost skin condition and resilience whilst promoting normal skin epithelialisation.",
    price: 115.0,
    currency: "GBP",
    product_benefits: ["Reduces the appearance of fine lines and wrinkles","diminishes uneven skin tones and textures","protects from environmental stress with Extremozyme® technology","strengthens and hydrates skin","increases firmness and elasticity"],
    image_url: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/Retinol 0.3.webp",
    featured: true,
    category: "Specialty"
  },
  {
    id: "2182dbf8-461e-4b98-a389-1fe1aadb193c",
    name: "Moisturising Complex",
    description: "A versatile, rich yet easily absorbed botanical complex that creates an antioxidant-rich barrier, sealing in moisture whilst insulating skin from environmental damage. Perfect for daily hydration and protection.",
    price: 98.0,
    currency: "GBP",
    product_benefits: ["Provides deep hydration and moisture retention","creates protective antioxidant barrier","soothes and calms irritated skin","suitable for all skin types including sensitive skin"],
    image_url: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/moisturising_complex_250x.webp",
    featured: false,
    category: "Moisturizers"
  },
  {
    id: "24fe9cfe-b8a1-4671-8c92-d0b6dc2887fa",
    name: "Reparative Moisture Emulsion",
    description: "Rich hydration formula for dry skin, crafted with pharmaceutical grade botanicals, peptides, and powerful antioxidants. Features first-generation Extremozyme® protection clinically proven to help prevent DNA damage.",
    price: 105.0,
    currency: "GBP",
    product_benefits: ["Smooths and hydrates skin","reduces appearance of fine lines and wrinkles","provides deep and surface hydration","prevents environmental damage with Extremozyme technology","excellent makeup preparation base"],
    image_url: "https://siojarsutauhnuiwrmkd.supabase.co/storage/v1/object/public/site-images/product/reparative_moisture_emulsion.webp",
    featured: false,
    category: "Moisturizers"
  },
  {
    id: "b5f6c88c-1372-4696-87b4-1609b795ca19",
    name: "Active Serum 15ml",
    description: "Our most popular product, this fast-acting, long-term, results-oriented formula decreases the appearance of fine lines and wrinkles, visibly evens skin tone, and is excellent for blemish-prone skin. Potent activity will be noted upon application, as evidenced by a cooling tingling sensation. Excellent for all skin types and all ages, this powerful botanical serum leaves the skin moist and smooth.",
    price: 88.0,
    currency: "GBP",
    product_benefits: ["Reduces the appearance of fine lines and wrinkles", "Diminishes the appearance of uneven skin tone and blemishes", "Smooths and softens", "Gives the appearance of smaller pores", "Provides both rapid and long-term results"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/as_30ml-960x1200-7887af8.jpg?v=1678281637",
    featured: false,
    category: "Serum"
  },
  {
    id: "8474ad93-2381-4c3d-a61f-78e5ca8a25d1",
    name: "Active Serum 30ml",
    description: "Our most popular product, this fast-acting, long-term, results-oriented formula decreases the appearance of fine lines and wrinkles, visibly evens skin tone, and is excellent for blemish-prone skin. Potent activity will be noted upon application, as evidenced by a cooling tingling sensation. Excellent for all skin types and all ages, this powerful botanical serum leaves the skin moist and smooth.",
    price: 141.0,
    currency: "GBP",
    product_benefits: ["Reduces the appearance of fine lines and wrinkles", "Diminishes the appearance of uneven skin tone and blemishes", "Smooths and softens", "Gives the appearance of smaller pores", "Provides both rapid and long-term results"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/as_30ml-960x1200-7887af8.jpg?v=1678281637",
    featured: false,
    category: "Serum"
  },
  {
    id: "c2376b2a-8272-47d0-8b77-960b06204f35",
    name: "Cleansing Complex 180ml",
    description: "This clear, lightweight cleansing gel is powerful, yet gentle enough for sensitive skin. Cleansing Complex incorporates a balance of bionutrients, antioxidants, and mild resurfacing ingredients that thoroughly cleanse the surface and pores of the skin without stripping essential natural oils, leaving skin soft and smooth.",
    price: 48.0,
    currency: "GBP",
    product_benefits: ["Deep-cleanses skin and pores without drying", "Excellent for blemish-prone skin", "Gives the appearance of smaller pores", "Smooths and softens", "Excellent for shaving"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/cleansing_complex_f4c63cf3-d779-43e6-b91a-3b589d2e88bd.jpg?v=1620222179",
    featured: false,
    category: "Cleanse"
  },
  {
    id: "05c8d747-393f-4919-94ff-d4653eeee7da",
    name: "Cleansing Complex 60ml",
    description: "This clear, lightweight cleansing gel is powerful, yet gentle enough for sensitive skin. Cleansing Complex incorporates a balance of bionutrients, antioxidants, and mild resurfacing ingredients that thoroughly cleanse the surface and pores of the skin without stripping essential natural oils, leaving skin soft and smooth.",
    price: 25.0,
    currency: "GBP",
    product_benefits: ["Deep-cleanses skin and pores without drying", "Excellent for blemish-prone skin", "Gives the appearance of smaller pores", "Smooths and softens", "Excellent for shaving"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/cleansing_complex_f4c63cf3-d779-43e6-b91a-3b589d2e88bd.jpg?v=1620222179",
    featured: false,
    category: "Cleanse"
  }
];

export default function MigrateProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const migrateProductImage = async (imageUrl: string, productName: string) => {
    if (imageUrl.includes('siojarsutauhnuiwrmkd.supabase.co')) {
      return imageUrl; // Already migrated
    }
    
    try {
      const fileName = `${productName.replace(/[^a-zA-Z0-9]/g, '_')}.webp`;
      
      const { data, error } = await supabase.functions.invoke('migrate-product-images', {
        body: { imageUrl, fileName }
      });

      if (error) throw error;
      
      return data.success ? data.newUrl : imageUrl;
    } catch (error) {
      console.error('Image migration failed:', error);
      return imageUrl;
    }
  };

  const processProductVariants = (products: typeof productsToMigrate) => {
    const productMap = new Map<string, any>();
    const variants: any[] = [];

    products.forEach(product => {
      const baseName = product.name
        .replace(/\s+(15ml|30ml|60ml|120ml|180ml|\d+ml|\d+g)$/i, '')
        .trim();
      
      const sizeMatch = product.name.match(/(\d+(?:ml|g))$/i);
      const size = sizeMatch ? sizeMatch[1] : 'Standard';

      if (productMap.has(baseName)) {
        variants.push({
          name: product.name,
          baseProduct: baseName,
          size,
          price: product.price,
          image_url: product.image_url
        });
      } else {
        productMap.set(baseName, {
          ...product,
          baseName,
          originalName: product.name,
          size,
          sizes: {
            default: { size, price: product.price },
            options: [{ size, price: product.price }]
          }
        });
      }
    });

    variants.forEach(variant => {
      const baseProduct = productMap.get(variant.baseProduct);
      if (baseProduct) {
        baseProduct.sizes.options.push({
          size: variant.size,
          price: variant.price
        });
      }
    });

    return Array.from(productMap.values());
  };

  const handleMigration = async () => {
    setIsLoading(true);
    
    try {
      setProgress("Processing product variants...");
      const processedProducts = processProductVariants(productsToMigrate);
      
      let updated = 0;
      let inserted = 0;

      for (const [index, product] of processedProducts.entries()) {
        setProgress(`Processing ${index + 1}/${processedProducts.length}: ${product.baseName}`);
        
        // Migrate image
        const newImageUrl = await migrateProductImage(product.image_url, product.baseName);
        
        // Check if product exists by name
        const { data: existingProduct } = await supabase
          .from('products')
          .select('id')
          .eq('name', product.baseName)
          .maybeSingle();

        const productData = {
          name: product.baseName,
          description: product.description,
          price: product.price,
          currency: product.currency,
          product_benefits: product.product_benefits,
          image_url: newImageUrl,
          featured: product.featured,
          category: product.category,
          sizes: product.sizes
        };

        if (existingProduct) {
          const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', existingProduct.id);
          
          if (error) throw error;
          updated++;
        } else {
          const { error } = await supabase
            .from('products')
            .insert([{ id: product.id, ...productData }]);
          
          if (error) throw error;
          inserted++;
        }
      }

      setProgress(`Complete! Updated ${updated} products, inserted ${inserted} new products`);
      
      toast({
        title: "Migration Complete",
        description: `Updated ${updated} products, inserted ${inserted} new products`,
      });

    } catch (error) {
      console.error('Migration error:', error);
      setProgress(`Error: ${error.message}`);
      toast({
        title: "Migration Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Product Migration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleMigration}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Migrating..." : "Start Product Migration"}
          </Button>
          
          {progress && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{progress}</p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This will:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Download and migrate product images to Supabase storage</li>
              <li>Combine size variants (e.g., 15ml + 30ml → single product with size options)</li>
              <li>Update existing products and insert new ones</li>
              <li>Add size selector functionality to the frontend</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}