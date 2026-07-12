import { useQuery } from '@tanstack/react-query';
import { fetchTrendingTopics, fetchSuggestedUsers, searchAll } from '@/api/exploreApi';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { useState } from 'react';

export function useTrendingTopics() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrendingTopics,
  });
}

export function useSuggestedUsers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['suggestedUsers', user?.id],
    queryFn: () => fetchSuggestedUsers(user.id),
    enabled: !!user?.id,
  });
}

export function useExploreSearch() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 350);

  const searchQuery = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchAll(debounced),
    enabled: debounced.trim().length > 0,
  });

  return { query, setQuery, ...searchQuery, isSearching: debounced.trim().length > 0 };
}