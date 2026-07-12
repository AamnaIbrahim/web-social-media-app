import { useQuery } from '@tanstack/react-query';
import { fetchUserPosts, fetchSavedPosts } from '@/api/userApi';

export function useUserPosts(userId) {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });
}

export function useSavedPosts(enabled = true) {
  return useQuery({
    queryKey: ['savedPosts'],
    queryFn: fetchSavedPosts,
    enabled,
  });
}