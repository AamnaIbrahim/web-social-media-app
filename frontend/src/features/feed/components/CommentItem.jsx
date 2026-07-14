import { memo } from 'react';
import Avatar from '@/components/ui/Avatar';
import { formatTimeAgo } from '@/utils/formatDate';

function CommentItem({ comment }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Avatar src={comment.user?.avatarUrl} name={comment.user?.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold text-text-primary">{comment.user?.name}</span>{' '}
          <span className="text-text-primary">{comment.text}</span>
        </p>
        <p className="text-xs text-text-tertiary mt-0.5">{formatTimeAgo(comment.createdAt)}</p>
      </div>
    </div>
  );
}

export default memo(CommentItem);