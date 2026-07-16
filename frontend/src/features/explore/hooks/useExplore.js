import { useQuery } from '@tanstack/react-query';
import { fetchSuggestedUsers, searchUsers } from '@/api/userApi';
import { fetchTrendingTopics } from '@/api/exploreApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useState } from 'react';

export function useTrendingTopics() {
  return useQuery({ queryKey: ['trending'], queryFn: fetchTrendingTopics });
}

export function useSuggestedUsers() {
  return useQuery({ queryKey: ['suggestedUsers'], queryFn: fetchSuggestedUsers });
}

export function useExploreSearch() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 350);

  const searchQuery = useQuery({
    queryKey: ['search', debounced],
    queryFn: async () => ({ users: await searchUsers(debounced), topics: [] }),
    enabled: debounced.trim().length > 0,
  });

  return { query, setQuery, ...searchQuery, isSearching: debounced.trim().length > 0 };
}