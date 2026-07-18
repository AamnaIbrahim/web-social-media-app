import { Users } from 'lucide-react';
import { useSuggestedUsers, useExploreSearch } from '@/features/explore/hooks/useExplore';
import { useFollow } from '@/features/profile/hooks/useFollow';
import UserCard from '@/components/ui/UserCard';
import SearchBar from '@/components/ui/SearchBar';
import EmptyState from '@/components/ui/EmptyState';
import { SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';
import { Search as SearchIcon } from 'lucide-react';

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

export default function Explore() {
  const { data: suggested, isLoading: suggestedLoading } = useSuggestedUsers();
  const { query, setQuery, data: searchResults, isLoading: searchLoading, isSearching } = useExploreSearch();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Explore</h1>
        <p className="text-sm text-text-secondary">People to follow</p>
      </div>

      <SearchBar
        placeholder="Search people"
        onSearch={setQuery}
        className="mb-6 !bg-bg-surface !border !border-border"
      />

      {isSearching ? (
        <SearchResults query={query} results={searchResults} isLoading={searchLoading} />
      ) : (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} strokeWidth={1.75} className="text-text-tertiary" />
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Who to follow</h2>
          </div>

          <div className="card !p-2 flex flex-col divide-y divide-border">
            {suggestedLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3">
                  <SkeletonAvatar size="md" />
                  <SkeletonText lines={2} className="flex-1" />
                </div>
              ))
            ) : suggested?.length === 0 ? (
              <p className="text-sm text-text-tertiary text-center py-6">
                No suggestions right now — check back later.
              </p>
            ) : (
              suggested.map((user) => (
                <div key={user.id} className="px-3">
                  <SuggestedUserRow user={user} />
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function SearchResults({ query, results, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <SkeletonAvatar size="md" />
            <SkeletonText lines={2} className="flex-1" />
          </div>
        ))}
      </div>
    );
  }

  if (!results?.length) {
    return (
      <EmptyState
        icon={SearchIcon}
        title={`No results for "${query}"`}
        description="Try a different name or username."
      />
    );
  }

  return (
    <div className="card !p-2 flex flex-col divide-y divide-border">
      {results.map((user) => (
        <div key={user.id} className="px-3">
          <SuggestedUserRow user={user} />
        </div>
      ))}
    </div>
  );
}