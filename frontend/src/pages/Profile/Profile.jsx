import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useUserPosts, useSavedPosts } from '@/features/profile/hooks/useProfilePosts';
import { useFollow } from '@/features/profile/hooks/useFollow';
import ProfileHeader from '@/features/profile/components/ProfileHeader';
import PostGrid from '@/features/profile/components/PostGrid';
import TextPostList from '@/features/profile/components/TextPostList';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';

export default function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = currentUser?.username === username;

  const { data: profile, isLoading: profileLoading, isError, refetch } = useProfile(username);
  const { data: posts, isLoading: postsLoading } = useUserPosts(username);
  const { data: savedPosts, isLoading: savedLoading } = useSavedPosts(isOwnProfile && activeTab === 'saved');
  const followMutation = useFollow(username);

  const mediaPosts = posts?.filter((p) => p.images.length > 0) ?? [];
  const textPosts = posts?.filter((p) => p.images.length === 0) ?? [];

  const tabs = [
    { label: 'Posts', value: 'posts' },
    { label: 'Text', value: 'text' },
    ...(isOwnProfile ? [{ label: 'Saved', value: 'saved' }] : []),
  ];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-24">
        <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
        <p className="text-base font-semibold text-text-primary">Couldn't load this profile</p>
        <p className="text-sm text-text-secondary max-w-xs">This account may not exist, or something went wrong.</p>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        isLoading={profileLoading}
        isFollowLoading={followMutation.isPending}
        onFollowToggle={() => followMutation.mutate({ targetUserId: profile.id, isCurrentlyFollowing: profile.isFollowing })}
        onEditClick={() => {}}
      />

      <div className="mt-4">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === 'posts' && <PostGrid posts={mediaPosts} isLoading={postsLoading} emptyVariant="posts" />}
          {activeTab === 'text' && <TextPostList posts={textPosts} isLoading={postsLoading} />}
          {activeTab === 'saved' && isOwnProfile && <PostGrid posts={savedPosts} isLoading={savedLoading} emptyVariant="saved" />}
        </div>
      </div>
    </div>
  );
}