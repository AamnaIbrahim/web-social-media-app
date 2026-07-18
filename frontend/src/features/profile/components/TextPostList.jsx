import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { SkeletonText } from '@/components/ui/Skeleton';
import { FileText } from 'lucide-react';
import { formatTimeAgo } from '@/utils/formatDate';

export default function TextPostList({ posts, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card"><SkeletonText lines={2} /></div>
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return <EmptyState icon={FileText} title="No text posts yet" description="Posts without photos will show up here." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <button
          key={post.id}
          onClick={() => navigate(`/post/${post.id}`)}
          className="card !p-4 text-left hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-text-primary whitespace-pre-wrap line-clamp-4">{post.text}</p>
          <div className="flex items-center gap-4 text-text-tertiary text-xs mt-3">
            <span className="flex items-center gap-1"><Heart size={13} strokeWidth={1.75} /> {post.likeCount}</span>
            <span className="flex items-center gap-1"><MessageCircle size={13} strokeWidth={1.75} /> {post.commentCount}</span>
            <span className="ml-auto">{formatTimeAgo(post.createdAt)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}