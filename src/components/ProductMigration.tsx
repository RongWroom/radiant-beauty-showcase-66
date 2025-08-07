import { Button } from "@/components/ui/button";
import { useProductMigration } from "@/hooks/useProductMigration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newProductsData = [
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
  }
  // Add more products as needed - this is just a sample
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