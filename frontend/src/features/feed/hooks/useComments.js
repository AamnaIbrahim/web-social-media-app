import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComments, addComment } from '@/api/postApi';
import { useAuth } from '@/hooks/useAuth';

export function useComments(postId) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}

export function useAddComment(postId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => addComment({ postId, userId: user.id, text }),
    onSuccess: (newComment) => {
      queryClient.setQueryData(['comments', postId], (old) => [...(old ?? []), newComment]);

      queryClient.setQueryData(['post', postId], (old) =>
        old ? { ...old, commentCount: old.commentCount + 1 } : old
      );
      queryClient.setQueryData(['posts'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((p) =>
              p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p
            ),
          })),
        };
      });
    },
  });
}