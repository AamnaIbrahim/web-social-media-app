import { useQuery } from '@tanstack/react-query';
import { fetchUserPosts } from '@/api/userApi';
import { fetchSavedPosts } from '@/api/postApi';
import { useAuth } from '@/hooks/useAuth';

export function useUserPosts(username) {
  return useQuery({
    queryKey: ['userPosts', username],
    queryFn: () => fetchUserPosts(username),
    enabled: !!username,
  });
}

export function useSavedPosts(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['savedPosts', user?.id],
    queryFn: fetchSavedPosts,
    enabled: enabled && !!user?.id,
  });
}