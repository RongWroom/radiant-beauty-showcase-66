
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  featured: boolean | null;
  category: string | null;
};

type UsePaginatedProductsResult = {
  products: Product[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<any>;
};

export function usePaginatedProducts(page: number, pageSize: number): UsePaginatedProductsResult {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: async () => {
      console.log('Fetching products from database...');
      
      // Get total count
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Get products WITH LIMIT/OFFSET for pagination
      const { data: products, error } = await supabase
        .from("products")
        .select("id, name, description, price, currency, image_url, featured, category")
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products fetched:', products?.length);
      console.log('Sample product with image:', products?.[0]);
      
      return {
        products: products || [],
        total: count || 0,
      };
    },
    // Reduce cache time to ensure fresh data
    staleTime: 30000, // 30 seconds
    gcTime: 60000, // 1 minute
  });

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    refetch,
  };
}

// Export a function to invalidate all product caches
export function useInvalidateProductsCache() {
  const queryClient = useQueryClient();
  
  return () => {
    console.log('Invalidating products cache...');
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["product"] });
    queryClient.invalidateQueries({ queryKey: ["relatedProducts"] });
  };
}
