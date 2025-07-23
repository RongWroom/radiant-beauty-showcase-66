
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      console.log('Fetching product categories from database...');
      
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .not("category", "is", null);

      if (error) {
        console.error('Error fetching product categories:', error);
        throw error;
      }

      // Get unique categories and filter out null values
      const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
      console.log('Unique categories found:', uniqueCategories);
      
      return uniqueCategories.sort();
    },
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
  });
}
