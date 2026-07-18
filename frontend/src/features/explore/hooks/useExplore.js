import { useQuery } from '@tanstack/react-query';
import { fetchSuggestedUsers, searchUsers } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { useState } from 'react';

export function useSuggestedUsers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['suggestedUsers', user?.id],
    queryFn: fetchSuggestedUsers,
    enabled: !!user?.id,
  });
}

export function useExploreSearch() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 350);

  const searchQuery = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchUsers(debounced),
    enabled: debounced.trim().length > 0,
  });

  return { query, setQuery, ...searchQuery, isSearching: debounced.trim().length > 0 };
}