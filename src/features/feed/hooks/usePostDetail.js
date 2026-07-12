import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/api/postApi';

export function usePostDetail(postId) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId,
  });
}