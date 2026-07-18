import { Link } from 'react-router-dom';
import { useSuggestedUsers } from '@/features/explore/hooks/useExplore';
import { useFollow } from '@/features/profile/hooks/useFollow';
import UserCard from '@/components/ui/UserCard';
import { SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';
import { ROUTES } from '@/constants/routes';

function SuggestedUserRow({ user }) {
  const followMutation = useFollow(user.username);
  return (
    <UserCard
      user={user}
      isFollowing={user.isFollowing ?? false}
      onToggleFollow={() =>
        followMutation.mutate({ targetUserId: user.id, isCurrentlyFollowing: user.isFollowing ?? false })
      }
    />
  );
}

export default function RightSidebarContent() {
  const { data: suggested, isLoading: suggestedLoading } = useSuggestedUsers();

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-secondary">Who to follow</h3>
        <Link to={ROUTES.EXPLORE} className="text-xs text-accent hover:underline">See all</Link>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {suggestedLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <SkeletonAvatar size="md" />
                <SkeletonText lines={2} className="flex-1" />
              </div>
            ))
          : suggested?.slice(0, 3).map((user) => <SuggestedUserRow key={user.id} user={user} />)}
      </div>
    </section>
  );
}