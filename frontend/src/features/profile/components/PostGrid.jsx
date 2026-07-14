import PostGridItem from './PostGridItem';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Camera, Bookmark } from 'lucide-react';

export default function PostGrid({ posts, isLoading, emptyVariant = 'posts' }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton aspect-square rounded-md" />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    const config =
      emptyVariant === 'saved'
        ? { icon: Bookmark, title: 'Nothing saved yet', desc: 'Posts you save will show up here.' }
        : { icon: Camera, title: 'No posts yet', desc: 'Shared posts will show up here.' };
    const Icon = config.icon;
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
        <Icon size={40} strokeWidth={1.5} className="text-text-tertiary" />
        <p className="text-base font-semibold text-text-primary">{config.title}</p>
        <p className="text-sm text-text-secondary max-w-xs">{config.desc}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-2">
      {posts.map((post) => (
        <PostGridItem key={post.id} post={post} onClick={() => navigate(`/post/${post.id}`)} />
      ))}
    </div>
  );
}