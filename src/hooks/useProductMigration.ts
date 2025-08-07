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

    console.log(`🔄 Processing ${products.length} products for variant consolidation...`);

    // Enhanced patterns for variant detection
    const sizePattern = /\s+(15ML|30ML|15ml|30ml|60ml|120ml|180ml|200ml|\d+ml|\d+g|Travel\s+Size)$/i;
    const spfTintPattern = /^(Eclipse SPF 50\+|Extreme Protect SPF 40|PerfecTint Powder SPF 40)\s+(Translucent|Beige|Bronze|Ivory|Cream|Deep)$/i;
    const travelSizePattern = /\s*\(Travel\s+Size\)$/i;

    // Group products by base name
    products.forEach((product, index) => {
      let baseName = product.name.trim();
      let variantType = 'size';
      let variantValue = 'Standard';

      console.log(`📦 Processing product ${index + 1}/${products.length}: "${product.name}"`);

      // Check for SPF products with tints first (highest priority)
      const spfTintMatch = product.name.match(spfTintPattern);
      if (spfTintMatch) {
        baseName = spfTintMatch[1];
        variantType = 'tint';
        variantValue = spfTintMatch[2];
        console.log(`  🎨 SPF Tint variant detected: ${baseName} - ${variantValue}`);
      }
      // Check for size variants
      else if (product.name.match(sizePattern)) {
        const sizeMatch = product.name.match(sizePattern);
        if (sizeMatch) {
          baseName = product.name.replace(sizePattern, '').trim();
          variantType = 'size';
          variantValue = sizeMatch[1];
          console.log(`  📏 Size variant detected: ${baseName} - ${variantValue}`);
        }
      }
      // Handle Travel Size variants
      else if (product.name.match(travelSizePattern)) {
        baseName = product.name.replace(travelSizePattern, '').trim();
        variantType = 'size';
        variantValue = 'Travel Size';
        console.log(`  ✈️ Travel size variant detected: ${baseName}`);
      }
      else {
        console.log(`  ⭐ Standard product: ${baseName}`);
      }

      if (productMap.has(baseName)) {
        // Add as variant
        console.log(`  ➕ Adding as variant to existing base product: ${baseName}`);
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
        console.log(`  🎯 Creating new base product: ${baseName}`);
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

    console.log(`🔄 Found ${variants.length} variants to consolidate into ${productMap.size} base products`);

    // Add variants to their base products
    variants.forEach((variant, index) => {
      const baseProduct = productMap.get(variant.baseProduct);
      if (baseProduct) {
        console.log(`  📋 Adding variant ${index + 1}/${variants.length}: ${variant.variantValue} to ${variant.baseProduct}`);
        // Check if this variant already exists
        const existingVariant = baseProduct.sizes.options.find(
          opt => opt.size === variant.variantValue
        );
        if (!existingVariant) {
          baseProduct.sizes.options.push({
            size: variant.variantValue,
            price: variant.price
          });
          console.log(`    ✅ Added new size option: ${variant.variantValue} - £${variant.price}`);
        } else {
          console.log(`    ⚠️ Size option already exists: ${variant.variantValue}`);
        }
      } else {
        console.log(`    ❌ Base product not found for variant: ${variant.baseProduct}`);
      }
    });

    const finalProducts = Array.from(productMap.values());
    console.log(`✅ Final result: ${finalProducts.length} consolidated products`);
    
    // Log summary of each final product
    finalProducts.forEach((product, index) => {
      const optionsCount = product.sizes?.options?.length || 0;
      console.log(`  ${index + 1}. "${product.baseName}" - ${optionsCount} size options`);
    });

    return finalProducts;
  };

  const migrateProducts = async (products: ProductToMigrate[]) => {
    setIsLoading(true);
    
    try {
      console.log("🚀 Starting product migration process...");
      console.log(`📊 Input: ${products.length} products to process`);
      
      console.log("Step 1: Processing product variants...");
      const processedProducts = processProductVariants(products);
      console.log(`✅ Processed ${processedProducts.length} base products from ${products.length} original products`);

      console.log("Step 2: Migrating images...");
      for (const [index, product] of processedProducts.entries()) {
        console.log(`🖼️ Processing image ${index + 1}/${processedProducts.length}: ${product.baseName}`);
        
        // Migrate image
        const newImageUrl = await migrateProductImage(product.image_url, product.baseName);
        product.image_url = newImageUrl;
        console.log(`  ✅ Image migrated: ${newImageUrl}`);
      }

      console.log("Step 3: Saving to database...");
      console.log(`📤 Sending ${processedProducts.length} products to database...`);
      
      // Use the secure database function to migrate all products at once
      const { data, error } = await supabase.rpc('migrate_product_data', {
        product_data: processedProducts
      });

      if (error) throw error;

      console.log("Step 4: Analyzing results...");
      const result = data as { updated: number; inserted: number; errors: any[]; debug_info?: any[] };
      const { updated, inserted, errors, debug_info } = result;
      
      console.log(`📈 Migration Results:`);
      console.log(`  - Updated: ${updated} products`);
      console.log(`  - Inserted: ${inserted} products`);
      console.log(`  - Errors: ${errors?.length || 0} products`);
      
      if (debug_info && debug_info.length > 0) {
        console.log(`🔍 Debug info for first few products:`);
        debug_info.slice(0, 5).forEach((info, i) => {
          console.log(`  ${i + 1}. ${info.processing_product} (${info.sizes_options_count} variants)`);
        });
      }
      
      if (errors && errors.length > 0) {
        console.error('❌ Some products had errors:', errors);
      }

      toast({
        title: "Migration Complete",
        description: `Successfully processed ${inserted} products with variant consolidation`,
      });

      return { updated, inserted, processedCount: processedProducts.length };

    } catch (error) {
      console.error('💥 Migration error:', error);
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