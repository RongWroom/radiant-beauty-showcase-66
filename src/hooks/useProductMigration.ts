import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ProductToMigrate {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  product_benefits: string[];
  image_url: string;
  featured: boolean;
  category: string;
}

interface ProductVariant {
  name: string;
  baseProduct: string;
  size: string;
  price: number;
  image_url: string;
}

export function useProductMigration() {
  const [isLoading, setIsLoading] = useState(false);

  const migrateProductImage = async (imageUrl: string, productName: string) => {
    try {
      const fileName = `${productName.replace(/[^a-zA-Z0-9]/g, '_')}.webp`;
      
      const { data, error } = await supabase.functions.invoke('migrate-product-images', {
        body: { imageUrl, fileName }
      });

      if (error) throw error;
      
      return data.success ? data.newUrl : imageUrl;
    } catch (error) {
      console.error('Image migration failed:', error);
      return imageUrl; // Fallback to original URL
    }
  };

  const processProductVariants = (products: ProductToMigrate[]) => {
    const productMap = new Map<string, any>();
    const variants: any[] = [];

    // Enhanced patterns for variant detection
    const sizePattern = /\s+(15ml|30ml|60ml|120ml|180ml|200ml|\d+ml|\d+g|Travel\s+Size)$/i;
    const colorPattern = /\s+(Translucent|Beige|Bronze|Ivory|Cream|Deep)$/i;
    const spfPattern = /\s+SPF\s+(\d+\+?)(?:\s+(Translucent|Beige|Bronze))?$/i;

    // Group products by base name
    products.forEach(product => {
      let baseName = product.name.trim();
      let variantType = 'Standard';
      let variantValue = 'Standard';

      // Check for size variants first
      const sizeMatch = product.name.match(sizePattern);
      if (sizeMatch) {
        baseName = product.name.replace(sizePattern, '').trim();
        variantType = 'size';
        variantValue = sizeMatch[1];
      } 
      // Check for color/shade variants
      else if (product.name.match(colorPattern)) {
        const colorMatch = product.name.match(colorPattern);
        if (colorMatch) {
          baseName = product.name.replace(colorPattern, '').trim();
          variantType = 'shade';
          variantValue = colorMatch[1];
        }
      }
      // Handle SPF products with tints
      else if (product.name.match(spfPattern)) {
        const spfMatch = product.name.match(spfPattern);
        if (spfMatch && spfMatch[2]) {
          baseName = product.name.replace(/\s+(Translucent|Beige|Bronze)$/i, '').trim();
          variantType = 'tint';
          variantValue = spfMatch[2];
        }
      }
      // Handle Travel Size variants
      else if (product.name.includes('Travel Size')) {
        baseName = product.name.replace(/\s*\(Travel\s+Size\)$/i, '').trim();
        variantType = 'size';
        variantValue = 'Travel Size';
      }

      if (productMap.has(baseName)) {
        // Add as variant
        variants.push({
          name: product.name,
          baseProduct: baseName,
          variantType,
          variantValue,
          price: product.price,
          image_url: product.image_url
        });
      } else {
        // Set as base product
        productMap.set(baseName, {
          ...product,
          baseName,
          originalName: product.name,
          variantType,
          variantValue,
          sizes: {
            default: { size: variantValue, price: product.price },
            options: [{ size: variantValue, price: product.price }]
          }
        });
      }
    });

    // Add variants to their base products
    variants.forEach(variant => {
      const baseProduct = productMap.get(variant.baseProduct);
      if (baseProduct) {
        // Check if this variant already exists
        const existingVariant = baseProduct.sizes.options.find(
          opt => opt.size === variant.variantValue
        );
        if (!existingVariant) {
          baseProduct.sizes.options.push({
            size: variant.variantValue,
            price: variant.price
          });
        }
      }
    });

    return Array.from(productMap.values());
  };

  const migrateProducts = async (products: ProductToMigrate[]) => {
    setIsLoading(true);
    
    try {
      const processedProducts = processProductVariants(products);
      let updated = 0;
      let inserted = 0;

      for (const product of processedProducts) {
        // Migrate image
        const newImageUrl = await migrateProductImage(product.image_url, product.baseName);
        
        // Check if product exists by name (using base name)
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
          // Update existing product
          const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', existingProduct.id);
          
          if (error) throw error;
          updated++;
        } else {
          // Insert new product
          const { error } = await supabase
            .from('products')
            .insert([{ id: product.id, ...productData }]);
          
          if (error) throw error;
          inserted++;
        }
      }

      toast({
        title: "Migration Complete",
        description: `Updated ${updated} products, inserted ${inserted} new products`,
      });

      return { updated, inserted };

    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "Migration Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    migrateProducts,
    isLoading
  };
}