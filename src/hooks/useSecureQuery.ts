
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useSecureQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['secure', ...queryKey, user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('Authentication required');
      }
      
      // Add request logging for security monitoring
      console.log(`[SECURITY] User ${user.id} accessing ${queryKey.join('/')}`);
      
      return queryFn();
    },
    enabled: !!user,
    ...options
  });
}
