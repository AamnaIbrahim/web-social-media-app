import { useEffect, useRef } from 'react';
import { AlertCircle, Inbox } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import PostCard from './PostCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

export default function Feed() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const sentinelRef = useRef(null);

  // Infinite scroll: observe a sentinel div at the bottom of the list,
  // fetch the next page when it enters the viewport.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
        <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
        <p className="text-base font-semibold text-text-primary">Couldn't load your feed</p>
        <p className="text-sm text-text-secondary max-w-xs">
          Something went wrong reaching the server. Check your connection and try again.
        </p>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
        <Inbox size={40} strokeWidth={1.5} className="text-text-tertiary" />
        <p className="text-base font-semibold text-text-primary">No posts yet</p>
        <p className="text-sm text-text-secondary max-w-xs">
          Follow a few people to start seeing their posts here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader size="md" />
        </div>
      )}
    </div>
  );
}