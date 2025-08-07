import { Button } from "@/components/ui/button";
import { useProductMigration } from "@/hooks/useProductMigration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newProductsData = [
  // Batch 1 Products
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
    id: "b5f6c88c-1372-4696-87b4-1609b795ca19",
    name: "Active Serum 15ml",
    description: "Our most popular product, this fast-acting, long-term, results-oriented formula decreases the appearance of fine lines and wrinkles, visibly evens skin tone, and is excellent for blemish-prone skin. Touted by physicians as \"remarkable\" and \"phenomenal,\" Active Serum usually produces results within a couple of days. Potent activity will be noted upon application, as evidenced by a cooling tingling sensation. Excellent for all skin types and all ages, this powerful botanical serum leaves the skin moist and smooth.",
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
    description: "Our most popular product, this fast-acting, long-term, results-oriented formula decreases the appearance of fine lines and wrinkles, visibly evens skin tone, and is excellent for blemish-prone skin. Touted by physicians as \"remarkable\" and \"phenomenal,\" Active Serum usually produces results within a couple of days. Potent activity will be noted upon application, as evidenced by a cooling tingling sensation. Excellent for all skin types and all ages, this powerful botanical serum leaves the skin moist and smooth.",
    price: 141.0,
    currency: "GBP",
    product_benefits: ["Reduces the appearance of fine lines and wrinkles", "Diminishes the appearance of uneven skin tone and blemishes", "Smooths and softens", "Gives the appearance of smaller pores", "Provides both rapid and long-term results"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/as_30ml-960x1200-7887af8.jpg?v=1678281637",
    featured: false,
    category: "Serum"
  },
  
  // Batch 2 Products
  {
    id: "92fa832d-13a7-450e-ac2f-6b073daf9f0e",
    name: "Cleansing Complex Polish",
    description: "Cleansing Complex Polish (120g) thoroughly cleanses the surface and pores of the skin without drying or stripping essential natural oils. This light, foamy gel contains eco-friendly microparticles of Cellulose and Jojoba combined with powerful botanical extracts to provide both physical and biochemical exfoliation. A complete facial experience in a single product, this multi-purpose cleansing scrub instantly smooths, polishes, and softens the skin. Cleansing Complex Polish is excellent for all skin types and ages.",
    price: 48.0,
    currency: "GBP",
    product_benefits: ["Deep-cleanses skin and pores without drying", "Excellent for oily and blemish-prone skin", "Gives the appearance of smaller pores", "Smooths and softens", "Safe and effective physical exfoliation"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/cleansingcomplexpolish.jpg?v=1658746359",
    featured: false,
    category: "Cleanse"
  },
  {
    id: "254edaaf-8dd5-4cff-8275-1b0cc4ce12e2",
    name: "Copper Firming Mist",
    description: "This refreshing treatment mist provides potent antioxidant protection and defends against the visual signs of aging while instantly hydrating, smoothing, and firming the look and feel of skin. Copper Firming Mist (75ml) helps support the skin's natural balance by featuring a combination of Copper and botanically sourced PCA.",
    price: 40.0,
    currency: "GBP",
    product_benefits: ["Increases the appearance of skin firmness and elasticity", "Provides refreshing hydration", "Helps support the protective barrier of the skin", "Provides antioxidant protection", "Sets makeup for all-day wear", "Refreshing, natural orange blossom essence"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/copper_firming_mist_4fa13017-36ce-41f3-9995-4dd8d8d86885.jpg?v=1620291188",
    featured: false,
    category: "Specialty"
  },
  {
    id: "b9cf6ab6-3af2-43d2-b933-59bd1d876eb4",
    name: "Cream Cleanser",
    description: "This lightweight, moisturizing cream cleanser is powerful yet gentle enough to be used on dry, sensitive skin. Cream Cleanser (120ml) combines bionutrients, antioxidants, and restorative ingredients that work to thoroughly cleanse the surface and pores of the skin while soothing the look and feel of dry areas. Skin is left feeling refreshed, hydrated, and clean. Cream Cleanser is effective for even the most compromised skin conditions.",
    price: 48.0,
    currency: "GBP",
    product_benefits: ["Deep-cleanses skin and pores without drying", "Can be easily removed with or without water", "Excellent for eye makeup removal", "Leaves silky smooth, moisturized finish"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/cream_cleanser_6ea2eb49-89c6-4b99-b2c0-0e3cd0961760.jpg?v=1620291165",
    featured: false,
    category: "Moisturizers"
  },
  {
    id: "7f43da14-ac48-4d3b-8cd9-a7fd2dc9503a",
    name: "Eclipse SPF 50+ Translucent",
    description: "Formulated specifically for daily use and extended outdoor activities, Eclipse SPF 50+ (100g) is a unique fusion of scientifically advanced physical sunscreens - transparent Titanium Dioxide and micronized Zinc Oxide - coupled with pure Vitamin E. This antioxidant-rich blend provides superior water-resistant broad-spectrum UVA/UVB protection. Eclipse SPF 50+ is an ultra sheer, lightweight formula that absorbs quickly for a non-greasy matte finish.",
    price: 50.0,
    currency: "GBP",
    product_benefits: ["Provides all-physical broad-spectrum UVA/UVB protection", "Ultra-sheer, fast absorbing with a weightless finish", "Water-resistant formula", "PerfecTint technology enhances natural skin tone"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/ISCLINICAL_EclipseSPF50_SKU1024.jpg?v=1620408501",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "f05259d8-ab46-4675-a374-d343930a5751",
    name: "Eclipse SPF 50+ Beige",
    description: "Formulated specifically for daily use and extended outdoor activities, Eclipse SPF 50+ (100g) is a unique fusion of scientifically advanced physical sunscreens - transparent Titanium Dioxide and micronized Zinc Oxide - coupled with pure Vitamin E. This antioxidant-rich blend provides superior water-resistant broad-spectrum UVA/UVB protection. Eclipse SPF 50+ is an ultra sheer, lightweight formula that absorbs quickly for a non-greasy matte finish.",
    price: 50.0,
    currency: "GBP",
    product_benefits: ["Provides all-physical broad-spectrum UVA/UVB protection", "Ultra-sheer, fast absorbing with a weightless finish", "Water-resistant formula", "PerfecTint technology enhances natural skin tone"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/ISCLINICAL_EclipseSPF50_SKU1024.jpg?v=1620408501",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "fccb2640-b25a-4eaf-ba14-3bab25768c6c",
    name: "Extreme Protect SPF 40 Translucent",
    description: "Extreme Protect SPF 40 (100g) is a multilevel environmentally protective treatment formula featuring our proprietary Extremozyme® technology combined with scientifically advanced all-physical sunscreen actives; transparent micronized Zinc Oxide and transparent micronized Titanium Dioxide. This antioxidant-rich state-of-the-art broad-spectrum UVA/UVB sunscreen helps support optimal skin health as it moisturizes and protects.",
    price: 85.0,
    currency: "GBP",
    product_benefits: ["Contains all-physical transparent sunscreen actives", "Provides multilevel broad spectrum UVA/UVB protection", "Protects against environmental damage with Extremozyme technology", "Water-resistant formula", "Reduces erythema (sunburn)", "Hydrates, smooths and softens", "Provides an antioxidant-rich protective barrier", "Lowers risk of photoaging and skin cancer", "Available in: Translucent, PerfecTint Beige, and PerfecTint Bronze"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/ExtremeProtectSPF40Clear.jpg?v=1620560260",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "7c6dc206-2b35-4884-b896-2afa627b0f78",
    name: "Extreme Protect SPF 40 Beige",
    description: "Extreme Protect SPF 40 (100g) is a multilevel environmentally protective treatment formula featuring our proprietary Extremozyme® technology combined with scientifically advanced all-physical sunscreen actives; transparent micronized Zinc Oxide and transparent micronized Titanium Dioxide. This antioxidant-rich state-of-the-art broad-spectrum UVA/UVB sunscreen helps support optimal skin health as it moisturizes and protects.",
    price: 85.0,
    currency: "GBP",
    product_benefits: ["Contains all-physical transparent sunscreen actives", "Provides multilevel broad spectrum UVA/UVB protection", "Protects against environmental damage with Extremozyme technology", "Water-resistant formula", "Reduces erythema (sunburn)", "Hydrates, smooths and softens", "Provides an antioxidant-rich protective barrier", "Lowers risk of photoaging and skin cancer", "Available in: Translucent, PerfecTint Beige, and PerfecTint Bronze"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/ExtremeProtectSPF40Clear.jpg?v=1620560260",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "3bdb3770-0c99-4df6-acc5-a6aebe97a227",
    name: "Extreme Protect SPF 40 Bronze",
    description: "Extreme Protect SPF 40 (100g) is a multilevel environmentally protective treatment formula featuring our proprietary Extremozyme® technology combined with scientifically advanced all-physical sunscreen actives; transparent micronized Zinc Oxide and transparent micronized Titanium Dioxide. This antioxidant-rich state-of-the-art broad-spectrum UVA/UVB sunscreen helps support optimal skin health as it moisturizes and protects.",
    price: 85.0,
    currency: "GBP",
    product_benefits: ["Contains all-physical transparent sunscreen actives", "Provides multilevel broad spectrum UVA/UVB protection", "Protects against environmental damage with Extremozyme technology", "Water-resistant formula", "Reduces erythema (sunburn)", "Hydrates, smooths and softens", "Provides an antioxidant-rich protective barrier", "Lowers risk of photoaging and skin cancer", "Available in: Translucent, PerfecTint Beige, and PerfecTint Bronze"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/ExtremeProtectSPF40Clear.jpg?v=1620560260",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "ff1d3fd0-39fc-493c-a68a-adda52102dc3",
    name: "Extreme Protect SPF 30",
    description: "Extreme Protect SPF 30 (100g) provides extraordinary protection by combining broad spectrum UVA/UVB protection and powerful antioxidants to mitigate oxidative solar damage. Featuring microfine Zinc Oxide and microencapsulated organic active sunscreens, Extreme Protect SPF 30 offers advanced sun protection.",
    price: 80.0,
    currency: "GBP",
    product_benefits: ["Provides unprecedented multilevel broad spectrum UVA/UVB protection", "Protects against environmental damage with Extremozyme technology", "Reduces the appearance of erythema (sunburn)", "Hydrates, smooths and softens", "Diminishes the appearance of fine lines & wrinkles", "Provides an antioxidant-rich protective barrier"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/files/Untitled_design_53.png?v=1727881606",
    featured: false,
    category: "Sun Protection"
  },
  {
    id: "f0485a63-bb80-4f12-8850-0e133269a31e",
    name: "GeneXC 15ML",
    description: "GeneXC Serum is a revolutionary formula featuring our proprietary combination of Extremozymes, which are clinically proven to help protect, revitalize, and enhance the foundation of healthy skin while supporting multilevel protection and long-term visible improvements. GeneXC Serum contains 20% of our exclusive Vitamin C (L-Ascorbic Acid); which is formulated with a powerful combination of botanically sourced enzymes, antioxidants, and fruit acids sourced from both land and sea. These cutting-edge ingredients work synergistically to provide the most scientifically advanced, clinically proven benefits; improving the appearance of fine lines and wrinkles and evening the appearance of skin tone, resulting in a more youthful, glowing appearance.",
    price: 105.0,
    currency: "GBP",
    product_benefits: ["Helps prevent the signs of aging", "Enhanced the appearance of skin elasticity and firmness", "Superior antioxidant protection", "Helps improve overall health and integrity of the skin", "Skin hydration", "Brightening"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/genexc_30555f82-7708-424b-9a76-c7410228a585.jpg?v=1620291166",
    featured: false,
    category: "Specialty"
  },
  {
    id: "93aeed4e-1850-4392-9287-2bb40b90138f",
    name: "GeneXC 30ML",
    description: "GeneXC Serum is a revolutionary formula featuring our proprietary combination of Extremozymes, which are clinically proven to help protect, revitalize, and enhance the foundation of healthy skin while supporting multilevel protection and long-term visible improvements. GeneXC Serum contains 20% of our exclusive Vitamin C (L-Ascorbic Acid); which is formulated with a powerful combination of botanically sourced enzymes, antioxidants, and fruit acids sourced from both land and sea. These cutting-edge ingredients work synergistically to provide the most scientifically advanced, clinically proven benefits; improving the appearance of fine lines and wrinkles and evening the appearance of skin tone, resulting in a more youthful, glowing appearance.",
    price: 169.0,
    currency: "GBP",
    product_benefits: ["Helps prevent the signs of aging", "Enhanced the appearance of skin elasticity and firmness", "Superior antioxidant protection", "Helps improve overall health and integrity of the skin", "Skin hydration", "Brightening"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/genexc_30555f82-7708-424b-9a76-c7410228a585.jpg?v=1620291166",
    featured: false,
    category: "Specialty"
  },
  {
    id: "bf6cab00-9101-4876-8455-1406ec526b50",
    name: "Hydra-Cool Serum 15ml",
    description: "Hydra-Cool Serum is formulated to rejuvenate, hydrate, and visibly soothe the skin. This refreshing, powerful serum combines superior antioxidants with essential botanicals and bionutrients. Hydra-Cool Serum is designed for all skin types and for all ages, and is gentle enough for even the most sensitive skin.",
    price: 64.0,
    currency: "GBP",
    product_benefits: ["Provides intensive hydration", "Cools, calms, and soothes dry, irritated skin", "Provides antioxidant protection", "Great for blemish-prone or sunburned skin", "Excellent for use after shaving, for men", "Excellent for travel (helps replenish the dehydrating effects of air travel)", "Can combine with any \"active\" treatment product to accommodate acclimation", "Helps revitalize the appearance of aging and compromised skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/hydra_cool_serum_6f59800e-41cb-41fc-a668-f648a3c2348d.jpg?v=1620291165",
    featured: false,
    category: "Serum"
  },
  {
    id: "7935825b-7c96-40ee-99fc-063b23281109",
    name: "Hydra-Cool Serum 30ml",
    description: "Hydra-Cool Serum is formulated to rejuvenate, hydrate, and visibly soothe the skin. This refreshing, powerful serum combines superior antioxidants with essential botanicals and bionutrients. Hydra-Cool Serum is designed for all skin types and for all ages, and is gentle enough for even the most sensitive skin.",
    price: 99.0,
    currency: "GBP",
    product_benefits: ["Provides intensive hydration", "Cools, calms, and soothes dry, irritated skin", "Provides antioxidant protection", "Great for blemish-prone or sunburned skin", "Excellent for use after shaving, for men", "Excellent for travel (helps replenish the dehydrating effects of air travel)", "Can combine with any \"active\" treatment product to accommodate acclimation", "Helps revitalize the appearance of aging and compromised skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/hydra_cool_serum_6f59800e-41cb-41fc-a668-f648a3c2348d.jpg?v=1620291165",
    featured: false,
    category: "Serum"
  },

  // Batch 3 Products
  {
    id: "060a4cbb-c61d-42f6-a5b7-35e5241fcaf4",
    name: "Poly-Vitamin Serum 15ml",
    description: "Poly-Vitamin Serum is an intensive, revitalizing formula for all skin types. This formula ensures the delivery of a powerful combination of essential vitamins, bionutrients, and age-defying antioxidants. This combination deeply hydrates, generating significant improvements in the appearance of texture, tone, and overall integrity of the skin.",
    price: 72.0,
    currency: "GBP",
    product_benefits: ["Gives the look of healthier, more vibrant skin", "Improves the appearance of skin's tone and elasticity", "Helps revitalize the appearance of aging and compromised skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/poly_vitamin_serum_2108c3dd-46aa-430f-a0fd-dc2d90d6d4ac.jpg?v=1620222180",
    featured: false,
    category: "Serum"
  },
  {
    id: "8f5d57a7-73c7-4533-b264-7dffae5ad9d6",
    name: "Poly-Vitamin Serum 30ml",
    description: "Poly-Vitamin Serum is an intensive, revitalizing formula for all skin types. This formula ensures the delivery of a powerful combination of essential vitamins, bionutrients, and age-defying antioxidants. This combination deeply hydrates, generating significant improvements in the appearance of texture, tone, and overall integrity of the skin.",
    price: 115.0,
    currency: "GBP",
    product_benefits: ["Gives the look of healthier, more vibrant skin", "Improves the appearance of skin's tone and elasticity", "Helps revitalize the appearance of aging and compromised skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/poly_vitamin_serum_2108c3dd-46aa-430f-a0fd-dc2d90d6d4ac.jpg?v=1620222180",
    featured: false,
    category: "Serum"
  },
  {
    id: "f7364126-3a4e-4579-bed6-ff458246df06",
    name: "Pro-Heal Serum Advance+ 15ml",
    description: "Pro-Heal Serum Advance+ features our scientifically advanced L-Ascorbic Acid (Vitamin C), combined with a superior form of Olive Leaf Extract and pure Vitamins E and A. This powerful formulation significantly increases antioxidant protection while helping improve the appearance of compromised, blemish-prone, and aging skin.",
    price: 95.0,
    currency: "GBP",
    product_benefits: ["Provides potent antioxidant protection", "Soothes and calms skin", "Helps improve the appearance of blemish-prone skin", "Helps reduce the appearance of fine lines and wrinkles", "Helps revitalize the appearance of aging and sensitive skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/pro-heal_serum_advance_df8e1bd4-1ea3-4fb4-9f99-11b33bc0f5bb.jpg?v=1620291168",
    featured: false,
    category: "Serum"
  },
  {
    id: "16110803-1ade-4523-9c5a-da3759fcaaeb",
    name: "Pro-Heal Serum Advance+ 30ml",
    description: "Pro-Heal Serum Advance+ features our scientifically advanced L-Ascorbic Acid (Vitamin C), combined with a superior form of Olive Leaf Extract and pure Vitamins E and A. This powerful formulation significantly increases antioxidant protection while helping improve the appearance of compromised, blemish-prone, and aging skin.",
    price: 157.0,
    currency: "GBP",
    product_benefits: ["Provides potent antioxidant protection", "Soothes and calms skin", "Helps improve the appearance of blemish-prone skin", "Helps reduce the appearance of fine lines and wrinkles", "Helps revitalize the appearance of aging and sensitive skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/pro-heal_serum_advance_df8e1bd4-1ea3-4fb4-9f99-11b33bc0f5bb.jpg?v=1620291168",
    featured: false,
    category: "Serum"
  },
  {
    id: "36694c06-2ad0-4600-9321-16db89b55d39",
    name: "Super Serum Advance+ 15ml",
    description: "Super Serum Advance+ is a scientifically advanced, clinically proven formula that, for the first time, combines a 15% concentration of our next generation L-Ascorbic Acid (Vitamin C) with bioidentical Tripeptide-1 (Copper Tripeptide-1). Super Serum Advance+ also contains powerful botanical antioxidants and safe skin brighteners.",
    price: 95.0,
    currency: "GBP",
    product_benefits: ["Helps reduce the appearance of fine lines and wrinkles", "Helps improve the look of hypertrophic (raised) scar tissue and fine stretch marks", "Safely brightens and helps visibly diminish uneven skin tone", "Provides support against environmental stressors", "Provides extremely powerful antioxidant protection"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/super_serum_advance_3b122670-f642-4d21-85b2-653458e0e419.jpg?v=1620222180",
    featured: false,
    category: "Serum"
  },
  {
    id: "1e1c9b73-ccef-4e59-9867-912dc2a1ff60",
    name: "Super Serum Advance+ 30ml",
    description: "Super Serum Advance+ is a scientifically advanced, clinically proven formula that, for the first time, combines a 15% concentration of our next generation L-Ascorbic Acid (Vitamin C) with bioidentical Tripeptide-1 (Copper Tripeptide-1). Super Serum Advance+ also contains powerful botanical antioxidants and safe skin brighteners.",
    price: 157.0,
    currency: "GBP",
    product_benefits: ["Helps reduce the appearance of fine lines and wrinkles", "Helps improve the look of hypertrophic (raised) scar tissue and fine stretch marks", "Safely brightens and helps visibly diminish uneven skin tone", "Provides support against environmental stressors", "Provides extremely powerful antioxidant protection"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/super_serum_advance_3b122670-f642-4d21-85b2-653458e0e419.jpg?v=1620222180",
    featured: false,
    category: "Serum"
  },
  {
    id: "32865fa9-8805-4747-94fd-350761cdff25",
    name: "Youth Body Serum 15ml",
    description: "This refreshing lightweight serum mist gently absorbs into the skin providing powerful hydration and antioxidant protection against environmental stressors. The purest form of Hyaluronic Acid, potent extracts of Watermelon, Blue Microalgae, Licorice Root, and Holy Herb are combined with essential Vitamin B5 and our proprietary Extremozymes to create a unique and effective formula designed specifically for the body. Much more than a moisturizer, this nourishing treatment leaves skin feeling fresh, soft, and more hydrated. Perfect for post-sun exposure.",
    price: 28.0,
    currency: "GBP",
    product_benefits: ["Hydrates, smooths, and softens", "Provides potent antioxidant protection", "Protects against environmental damage with Extremozyme technology", "Visibly improves the signs of aging", "Supports the foundation of healthy skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/YouthBodySerum.jpg?v=1620562997",
    featured: false,
    category: "Serum"
  },
  {
    id: "d596e073-4c96-400c-ad4f-2f660596d32f",
    name: "Youth Body Serum 200ml",
    description: "This refreshing lightweight serum mist gently absorbs into the skin providing powerful hydration and antioxidant protection against environmental stressors. The purest form of Hyaluronic Acid, potent extracts of Watermelon, Blue Microalgae, Licorice Root, and Holy Herb are combined with essential Vitamin B5 and our proprietary Extremozymes to create a unique and effective formula designed specifically for the body. Much more than a moisturizer, this nourishing treatment leaves skin feeling fresh, soft, and more hydrated. Perfect for post-sun exposure.",
    price: 120.0,
    currency: "GBP",
    product_benefits: ["Hydrates, smooths, and softens", "Provides potent antioxidant protection", "Protects against environmental damage with Extremozyme technology", "Visibly improves the signs of aging", "Supports the foundation of healthy skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/YouthBodySerum.jpg?v=1620562997",
    featured: false,
    category: "Serum"
  },
  {
    id: "b347fe59-fed2-40a9-b868-459eedbad747",
    name: "Youth Intensive Creme 50g",
    description: "Youth Intensive Crème is an extraordinarily rich and luxurious age-defying formula that helps to reduce the appearance of fine lines and wrinkles as it provides powerful hydration. This transformative crème scientifically combines the purest and most effective botanically-derived moisturizers, antioxidants, resurfacing acids, and peptides. Clinically proven, Youth Intensive Crème smooths the skin, revealing a firmer and more radiant, youthful complexion.",
    price: 234.0,
    currency: "GBP",
    product_benefits: ["Provides powerful, 24-hour hydration", "Helps plump and smooth the appearance", "of fine lines and wrinkles", "Stimulates the production of collagen to", "dramatically decrease the appearance of", "lines and wrinkles over time", "Rich, protective crème formula", "Gently exfoliates for increased vitality", "Delivers essential nutrients to the skin", "Provides potent antioxidant protection", "Improves the appearance of skin strength and elasticity"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/is_clinical_youth_intensive_creme_high_res.png?v=1620222182",
    featured: false,
    category: "Specialty"
  },
  {
    id: "57c27ac5-cd44-4981-b7b9-f0492e19d5c0",
    name: "Youth Intensive Creme 100g",
    description: "Youth Intensive Crème is an extraordinarily rich and luxurious age-defying formula that helps to reduce the appearance of fine lines and wrinkles as it provides powerful hydration. This transformative crème scientifically combines the purest and most effective botanically-derived moisturizers, antioxidants, resurfacing acids, and peptides. Clinically proven, Youth Intensive Crème smooths the skin, revealing a firmer and more radiant, youthful complexion.",
    price: 383.0,
    currency: "GBP",
    product_benefits: ["Provides powerful, 24-hour hydration", "Helps plump and smooth the appearance", "of fine lines and wrinkles", "Stimulates the production of collagen to", "dramatically decrease the appearance of", "lines and wrinkles over time", "Rich, protective crème formula", "Gently exfoliates for increased vitality", "Delivers essential nutrients to the skin", "Provides potent antioxidant protection", "Improves the appearance of skin strength and elasticity"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/is_clinical_youth_intensive_creme_high_res.png?v=1620222182",
    featured: false,
    category: "Specialty"
  },
  {
    id: "458b7041-539c-49e8-ae12-4cdafac57fb7",
    name: "SHEALD Recovery Balm",
    description: "SHEALD Recovery Balm (60g) is a moisture-rich formula that dramatically replenishes hydration to dry, sensitive, or compromised skin. This fortifying remedy works overtime to help support the skin's function while soothing, curative botanicals relieve discomfort of dry, distressed, and post-procedure skin. Clinically proven to provide environmental protection.",
    price: 79.0,
    currency: "GBP",
    product_benefits: ["Provides antioxidant-rich protective barrier", "Softens and hydrates dry, sensitive skin", "Helps with tightness and distressed skin", "Excellent protective moisturizer for harsh cold and/or dry climates"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/sheald_recovery_balm_0ef65d5c-3a23-4125-8e45-7a9be0359d81.jpg?v=1620222179",
    featured: false,
    category: "Specialty"
  },
  {
    id: "7075d473-fbb6-4099-99b6-37e5259a5263",
    name: "SHEALD Recovery Balm (Travel Size)",
    description: "SHEALD Recovery Balm (Travel Size, 15g) is a moisture-rich formula that dramatically replenishes hydration to dry, sensitive, or compromised skin. This fortifying remedy works overtime to help support the skin's function while soothing, curative botanicals relieve discomfort of dry, distressed, and post-procedure skin. Clinically proven to provide environmental protection.",
    price: 30.0,
    currency: "GBP",
    product_benefits: ["Provides antioxidant-rich protective barrier", "Softens and hydrates dry, sensitive skin", "Helps with tightness and distressed skin", "Excellent protective moisturizer for harsh cold and/or dry climates"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/sheald_recovery_balm_-_pocket_size.jpg?v=1620298518",
    featured: false,
    category: "Specialty"
  },

  // Add individual products that don't have variants
  {
    id: "cd965101-b8bc-4f11-921a-8d22627be33a",
    name: "Hydra-Intensive Cooling Mask",
    description: "Hydra-Intensive Cooling Masque (120ml) is a rich, luxurious cooling treatment designed to reinvigorate, refresh, and provide soothing hydration. This professional strength formula features natural botanical antioxidants Centella Asiatica, Resveratrol, Green Tea, Aloe Vera, and Rosemary Extracts, which are perfectly balanced with botanically sourced Hyaluronic Acid – one of nature's most powerful hydrators. Skin will appear luminous, fresh, and hydrated. For skin that is irritated and sensitive (even after sunburn), this lightweight gel masque helps nurture and quench dry skin with a cool burst of refreshment.",
    price: 95.0,
    currency: "GBP",
    product_benefits: ["Delivers powerful hydration", "Provides a cool, refreshing sensation", "Contains soothing botanical antioxidants", "May rinse off or leave on as a treatment", "Excellent post-sun exposure to relieve sunburned skin"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/files/hicm-960x1200-7887af8.jpg?v=1733399060",
    featured: false,
    category: "Specialty"
  },
  {
    id: "92268581-55a0-47c1-b021-a3cb09250342",
    name: "Moisturizing Complex",
    description: "Intensively hydrating, antioxidant-rich Moisturizing Complex (50g) is formulated with powerful botanicals, natural vitamins, potent antioxidants, and essential bionutrients, which work synergistically to help support a moisturizing, protective barrier against environmental stressors. Designed for use in the morning or evening, for all skin types and all ages, this formula is an effective and truly versatile moisturizer.",
    price: 98.0,
    currency: "GBP",
    product_benefits: ["Provides antioxidant-rich protective barrier", "Provides both deep and surface hydration", "Reduces the appearance of fine lines and wrinkles", "Smooths and softens"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/moisturising_complex.jpg?v=1562345426",
    featured: false,
    category: "Moisturizers"
  },
  {
    id: "aa10d936-aa05-4f02-8e1b-5eaefd996169",
    name: "Youth Complex",
    description: "Youth Complex (30g) is the first cosmeceutical formulation to offer immediate, intermediate, and long-term visible improvements to aging skin. This breakthrough formula is a unique blend of potent antioxidants, innovative natural hydrators, and our exclusive bio-complex that addresses targeted aging phenomena with clinical precision. Youth Complex provides rapid initial hydration for visible plumping of fine lines and wrinkles, promotes controlled exfoliation, and is clinically proven to support the foundation of healthy skin.",
    price: 158.0,
    currency: "GBP",
    product_benefits: ["Reduces the appearance of fine lines and wrinkles", "Smooths and softens wrinkles", "Firms and tightens", "Provides immediate, intermediate, and long-term improvements", "Provides antioxidant protection"],
    image_url: "https://cdn.shopify.com/s/files/1/0248/4584/4555/products/youth_complex.jpg?v=1620222179",
    featured: false,
    category: "Specialty"
  }
];

export default function ProductMigration() {
  const { migrateProducts, isLoading } = useProductMigration();

  const handleMigration = async () => {
    try {
      await migrateProducts(newProductsData);
    } catch (error) {
      console.error('Migration failed:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Product Migration</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleMigration}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Migrating..." : "Migrate Products"}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          This will migrate product images and update the database with size variants.
        </p>
      </CardContent>
    </Card>
  );
}