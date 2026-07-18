import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences } from '@/api/settingsApi';
import { useAuth } from '@/hooks/useAuth';

export function usePreferences() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['preferences', user?.id],
    queryFn: fetchPreferences,
    enabled: !!user?.id,
  });
}

export function useUpdatePreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePreferences,
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ['preferences', user.id] });
      const previous = queryClient.getQueryData(['preferences', user.id]);
      queryClient.setQueryData(['preferences', user.id], (old) => ({ ...old, ...updates }));
      return { previous };
    },
    onError: (err, updates, context) => {
      queryClient.setQueryData(['preferences', user.id], context.previous);
    },
  });
}