import { useComments, useAddComment } from '../hooks/useComments';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import ListSkeleton from '@/components/ui/ListSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { MessageCircle } from 'lucide-react';

export default function CommentSection({ postId }) {
  const { data: comments, isLoading } = useComments(postId);
  const addCommentMutation = useAddComment(postId);

  return (
    <div>
      <CommentForm
        onSubmit={(text) => addCommentMutation.mutate(text)}
        isSubmitting={addCommentMutation.isPending}
      />

      {isLoading ? (
        <ListSkeleton count={3} lines={2} />
      ) : comments.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="No comments yet"
          description="Be the first to say something."
        />
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}