import { useState } from 'react';
import { Plus } from 'lucide-react';
import Feed from '@/features/feed/components/Feed';
import PostComposer from '@/features/feed/components/PostComposer';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Home</h1>
        <p className="text-sm text-text-secondary">Latest from people you follow</p>
      </div>

      {/* Composer trigger — mimics the "what's on your mind" entry point pattern */}
      <button
        onClick={() => setComposerOpen(true)}
        className="w-full flex items-center gap-3 card !py-3 mb-4 text-left hover:shadow-md transition-shadow"
      >
        <Avatar src={user?.avatarUrl} name={user?.name} size="md" />
        <span className="text-sm text-text-tertiary">What's on your mind?</span>
      </button>

      <Feed />

      <PostComposer open={composerOpen} onClose={() => setComposerOpen(false)} />
    </div>
  );
}