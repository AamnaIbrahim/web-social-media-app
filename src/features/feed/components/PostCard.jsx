import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import PostActions from '@/components/ui/PostActions';
import { useLikePost, useSavePost } from '../hooks/usePostActions';
import { formatTimeAgo } from '@/utils/formatDate';
import { showToast } from '@/components/ui/toast';

function renderTextWithHashtags(text) {
  return text.split(/(\#\w+)/g).map((part, i) =>
    part.startsWith('#') ? (
      <span key={i} className="text-accent hover:underline cursor-pointer">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function PostCard({ post }) {
  const navigate = useNavigate();
  const likeMutation = useLikePost();
  const saveMutation = useSavePost();

  const renderedText = useMemo(() => renderTextWithHashtags(post.text), [post.text]);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    showToast.info('Link copied to clipboard');
  };

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={post.user.avatarUrl} name={post.user.name} size="md" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{post.user.name}</p>
          <p className="text-xs text-text-tertiary truncate">
            @{post.user.username} · {formatTimeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      <p className="text-sm text-text-primary whitespace-pre-wrap">{renderedText}</p>

      {post.images.length > 0 && (
        <div className={post.images.length > 1 ? 'grid grid-cols-2 gap-2' : ''}>
          {post.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-full rounded-md object-cover max-h-[480px]"
            />
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
        onComment={() => navigate(`/post/${post.id}`)}
        onShare={handleShare}
        onReport={() => showToast.info('Post reported')}
      />
    </Card>
  );
}

export default memo(PostCard);