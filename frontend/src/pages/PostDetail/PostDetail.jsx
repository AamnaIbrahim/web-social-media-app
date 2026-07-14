import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePostDetail } from '@/features/feed/hooks/usePostDetail';
import { useLikePost, useSavePost } from '@/features/feed/hooks/usePostActions';
import CommentSection from '@/features/feed/components/CommentSection';
import Avatar from '@/components/ui/Avatar';
import PostActions from '@/components/ui/PostActions';
import ErrorState from '@/components/ui/ErrorState';
import { SkeletonAvatar, SkeletonText, Skeleton } from '@/components/ui/Skeleton';
import { showToast } from '@/components/ui/toast';
import { formatTimeAgo } from '@/utils/formatDate';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError, refetch } = usePostDetail(postId);
  const likeMutation = useLikePost();
  const saveMutation = useSavePost();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast.info('Link copied to clipboard');
  };

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load this post"
        description="It may have been removed, or something went wrong."
        onRetry={refetch}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn-ghost !p-2 rounded-full mb-4"
        aria-label="Go back"
      >
        <ArrowLeft size={18} strokeWidth={1.75} />
      </button>

      {isLoading ? (
        <div className="card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SkeletonAvatar size="md" />
            <SkeletonText lines={2} className="flex-1" />
          </div>
          <Skeleton className="w-full h-64 rounded-md" />
        </div>
      ) : (
        <div className="card flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar src={post.user.avatarUrl} name={post.user.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{post.user.name}</p>
              <p className="text-xs text-text-tertiary truncate">
                @{post.user.username} · {formatTimeAgo(post.createdAt)}
              </p>
            </div>
          </div>

          <p className="text-base text-text-primary whitespace-pre-wrap">{post.text}</p>

          {post.images.length > 0 && (
            <div className={post.images.length > 1 ? 'grid grid-cols-2 gap-2' : ''}>
              {post.images.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full rounded-md object-cover max-h-[600px]" />
              ))}
            </div>
          )}

          <PostActions
            liked={post.liked}
            saved={post.saved}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            onLike={() => likeMutation.mutate(post.id)}
            onSave={() => saveMutation.mutate(post.id)}
            onComment={() => {}}
            onShare={handleShare}
            onReport={() => showToast.info('Post reported')}
          />
        </div>
      )}

      <div className="card mt-4 !p-4">
        <h2 className="text-sm font-semibold text-text-secondary mb-1">Comments</h2>
        <CommentSection postId={postId} />
      </div>
    </div>
  );
}