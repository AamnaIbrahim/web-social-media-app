import { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Users } from 'lucide-react';
import { useTrendingTopics, useSuggestedUsers, useExploreSearch } from '@/features/explore/hooks/useExplore';
import { useFollow } from '@/features/profile/hooks/useFollow';
import TrendingCard from '@/components/ui/TrendingCard';
import UserCard from '@/components/ui/UserCard';
import SearchBar from '@/components/ui/SearchBar';
import { Skeleton, SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';

function SuggestedUserRow({ user }) {
  const followMutation = useFollow(user.username);
  return (
    <UserCard
      user={user}
      isFollowing={user.isFollowing ?? false}
      onToggleFollow={() => followMutation.mutate(user.id)}
    />
  );
}

export default function Explore() {
  const { data: trending, isLoading: trendingLoading } = useTrendingTopics();
  const { data: suggested, isLoading: suggestedLoading } = useSuggestedUsers();
  const { query, setQuery, data: searchResults, isLoading: searchLoading, isSearching } = useExploreSearch();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Explore</h1>
        <p className="text-sm text-text-secondary">Trending topics and people to follow</p>
      </div>

      <SearchBar
        placeholder="Search people and topics"
        onSearch={setQuery}
        className="mb-6 !bg-bg-surface !border !border-border"
      />

      {isSearching ? (
        <SearchResults query={query} results={searchResults} isLoading={searchLoading} />
      ) : (
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} strokeWidth={1.75} className="text-text-tertiary" />
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Trending</h2>
            </div>

            {trendingLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {trending.map((topic) => (
                  <TrendingCard
                    key={topic.id}
                    topic={topic.topic}
                    category={topic.category}
                    postCount={topic.postCount}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} strokeWidth={1.75} className="text-text-tertiary" />
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Who to follow</h2>
            </div>

            <div className="card !p-2 flex flex-col divide-y divide-border">
              {suggestedLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
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
        </div>
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

  const hasResults = results?.users.length > 0 || results?.topics.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
        <SearchIcon size={40} strokeWidth={1.5} className="text-text-tertiary" />
        <p className="text-base font-semibold text-text-primary">No results for "{query}"</p>
        <p className="text-sm text-text-secondary max-w-xs">
          Try a different name, username, or topic.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {results.users.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">People</h2>
          <div className="card !p-2 flex flex-col divide-y divide-border">
            {results.users.map((user) => (
              <div key={user.id} className="px-3">
                <SuggestedUserRow user={user} />
              </div>
            ))}
          </div>
        </section>
      )}

      {results.topics.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.topics.map((topic) => (
              <TrendingCard
                key={topic.id}
                topic={topic.topic}
                category={topic.category}
                postCount={topic.postCount}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}