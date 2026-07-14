import { Camera } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';

export default function ProfileHeader({ profile, isOwnProfile, isLoading, isFollowLoading, onFollowToggle, onEditClick }) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row items-start gap-5 pb-6 border-b border-border">
        <SkeletonAvatar size="lg" />
        <div className="flex-1 w-full">
          <SkeletonText lines={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6 border-b border-border">
      <div className="h-32 sm:h-44 rounded-lg bg-bg-subtle -mx-4 sm:-mx-6 -mt-6 mb-[-2.5rem] sm:mb-[-3rem] overflow-hidden">
        {profile.coverUrl && (
          <img src={profile.coverUrl} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-1">
        <div className="flex items-end gap-4">
          <Avatar
            src={profile.avatarUrl}
            name={profile.name}
            size="xl"
            className="ring-4 ring-bg-surface"
          />
        </div>

        <div>
          {isOwnProfile ? (
            <Button variant="secondary" onClick={onEditClick}>
              Edit profile
            </Button>
          ) : (
            <Button
              variant={profile.isFollowing ? 'secondary' : 'primary'}
              isLoading={isFollowLoading}
              onClick={onFollowToggle}
            >
              {profile.isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-xl font-bold text-text-primary">{profile.name}</h1>
        <p className="text-sm text-text-tertiary">@{profile.username}</p>
        {profile.bio && <p className="text-sm text-text-primary mt-3 max-w-lg">{profile.bio}</p>}

        <div className="flex items-center gap-5 mt-4 text-sm">
          <span><span className="font-semibold text-text-primary">{profile.postCount}</span> <span className="text-text-tertiary">posts</span></span>
          <span><span className="font-semibold text-text-primary">{profile.followerCount.toLocaleString()}</span> <span className="text-text-tertiary">followers</span></span>
          <span><span className="font-semibold text-text-primary">{profile.followingCount}</span> <span className="text-text-tertiary">following</span></span>
        </div>
      </div>
    </div>
  );
}