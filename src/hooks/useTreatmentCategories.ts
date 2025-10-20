import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTreatmentCategories = () => {
  return useQuery({
    queryKey: ['treatment-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treatments')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching treatment categories:', error);
        throw error;
      }

      // Extract unique categories
      const categories = [...new Set(data.map(item => item.category).filter(Boolean))];
      return categories as string[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
