import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Treatment = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string | null;
  image_url: string | null;
  duration_minutes: number | null;
  category: string | null;
  benefits: string[] | null;
  featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type UsePaginatedTreatmentsResult = {
  treatments: Treatment[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const usePaginatedTreatments = (
  page: number,
  pageSize: number,
  categoryFilter?: string
): UsePaginatedTreatmentsResult => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['treatments', 'paginated', page, pageSize, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('treatments')
        .select('*', { count: 'exact' });

      // Apply category filter if provided and not 'all'
      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      // Apply pagination
      query = query
        .range(from, to)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      const { data: treatments, error, count } = await query;

      if (error) {
        console.error('Error fetching treatments:', error);
        throw error;
      }

      return {
        treatments: treatments || [],
        total: count || 0,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    treatments: data?.treatments || [],
    total: data?.total || 0,
    isLoading,
    isError,
    refetch,
  };
};

export const useInvalidateTreatmentsCache = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['treatments'] });
  };
};
