// pages/Saved/Saved.jsx
import { AlertCircle } from 'lucide-react';
import { useSavedPosts } from '@/features/profile/hooks/useProfilePosts';
import PostGrid from '@/features/profile/components/PostGrid';
import Button from '@/components/ui/Button';

export default function Saved() {
  const { data: savedPosts, isLoading, isError, refetch } = useSavedPosts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Saved</h1>
        <p className="text-sm text-text-secondary">Your private shelf — only you can see this</p>
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
          <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
          <p className="text-base font-semibold text-text-primary">Couldn't load saved posts</p>
          <p className="text-sm text-text-secondary max-w-xs">
            Something went wrong. Check your connection and try again.
          </p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <PostGrid posts={savedPosts} isLoading={isLoading} emptyVariant="saved" />
      )}
    </div>
  );
}