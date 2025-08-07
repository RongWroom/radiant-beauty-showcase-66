// Test migration logic to verify product consolidation
const testProducts = [
  {
    id: "1",
    name: "Eclipse SPF 50+ Translucent",
    description: "Eclipse SPF test",
    price: 50,
    currency: "GBP",
    product_benefits: ["UV protection"],
    image_url: "test.jpg",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "2", 
    name: "Eclipse SPF 50+ Beige",
    description: "Eclipse SPF test",
    price: 50,
    currency: "GBP",
    product_benefits: ["UV protection"],
    image_url: "test.jpg",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "3",
    name: "Active Serum 15ml",
    description: "Active serum test",
    price: 88,
    currency: "GBP", 
    product_benefits: ["Anti-aging"],
    image_url: "test.jpg",
    featured: false,
    category: "Serum"
  },
  {
    id: "4",
    name: "Active Serum 30ml", 
    description: "Active serum test",
    price: 141,
    currency: "GBP",
    product_benefits: ["Anti-aging"],
    image_url: "test.jpg",
    featured: false,
    category: "Serum"
  }
];

const processProductVariants = (products: any[]) => {
  const productMap = new Map<string, any>();
  const variants: any[] = [];

  // Enhanced patterns for variant detection
  const sizePattern = /\s+(15ML|30ML|15ml|30ml|60ml|120ml|180ml|200ml|\d+ml|\d+g|Travel\s+Size)$/i;
  const spfTintPattern = /^(Eclipse SPF 50\+|Extreme Protect SPF 40|PerfecTint Powder SPF 40)\s+(Translucent|Beige|Bronze|Ivory|Cream|Deep)$/i;
  const travelSizePattern = /\s*\(Travel\s+Size\)$/i;

  // Group products by base name
  products.forEach(product => {
    let baseName = product.name.trim();
    let variantType = 'Standard';
    let variantValue = 'Standard';

    // Check for SPF products with tints first (highest priority)
    const spfTintMatch = product.name.match(spfTintPattern);
    if (spfTintMatch) {
      baseName = spfTintMatch[1];
      variantType = 'tint';
      variantValue = spfTintMatch[2];
    }
    // Check for size variants
    else if (product.name.match(sizePattern)) {
      const sizeMatch = product.name.match(sizePattern);
      if (sizeMatch) {
        baseName = product.name.replace(sizePattern, '').trim();
        variantType = 'size';
        variantValue = sizeMatch[1];
      }
    }
    // Handle Travel Size variants
    else if (product.name.match(travelSizePattern)) {
      baseName = product.name.replace(travelSizePattern, '').trim();
      variantType = 'size';
      variantValue = 'Travel Size';
    }

    console.log(`Processing ${product.name} -> baseName: ${baseName}, variantType: ${variantType}, variantValue: ${variantValue}`);

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

// Test the logic
console.log("Testing migration logic...");
const processed = processProductVariants(testProducts);
console.log(`Input: ${testProducts.length} products`);
console.log(`Output: ${processed.length} base products`);
processed.forEach(p => {
  console.log(`- ${p.baseName}: ${p.sizes.options.length} variants`);
  p.sizes.options.forEach(opt => console.log(`  - ${opt.size}: £${opt.price}`));
});

export {};