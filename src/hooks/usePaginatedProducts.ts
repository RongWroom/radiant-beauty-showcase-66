
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

export function usePaginatedProducts(page: number, pageSize: number, categoryFilter?: string): UsePaginatedProductsResult {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", page, pageSize, categoryFilter],
    queryFn: async () => {
      console.log('Fetching products from database...');
      
      // Build the query with optional category filter
      let countQuery = supabase.from("products").select("*", { count: "exact", head: true });
      let productsQuery = supabase
        .from("products")
        .select("id, name, description, price, currency, image_url, featured, category")
        .order("created_at", { ascending: false });

      // Apply category filter if provided
      if (categoryFilter && categoryFilter !== 'all') {
        countQuery = countQuery.eq("category", categoryFilter);
        productsQuery = productsQuery.eq("category", categoryFilter);
      }

      // Get total count with filter applied
      const { count } = await countQuery;

      // Get products with pagination and filter applied
      const { data: products, error } = await productsQuery
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
