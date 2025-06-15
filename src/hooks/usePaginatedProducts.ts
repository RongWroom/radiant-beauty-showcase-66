
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  featured: boolean | null;
};

type UsePaginatedProductsResult = {
  products: Product[];
  total: number;
  isLoading: boolean;
  isError: boolean;
};

export function usePaginatedProducts(page: number, pageSize: number): UsePaginatedProductsResult {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: async () => {
      // Get total count
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Get products WITH LIMIT/OFFSET for pagination
      const { data: products, error } = await supabase
        .from("products")
        .select("id, name, description, price, currency, image_url, featured")
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      return {
        products: products || [],
        total: count || 0,
      };
    },
    keepPreviousData: true,
  });

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
  };
}
