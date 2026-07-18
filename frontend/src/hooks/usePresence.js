import { useContext, useEffect } from 'react';
import { PresenceContext } from '@/contexts/PresenceContext';

export function useIsOnline(userId) {
  const context = useContext(PresenceContext);

  useEffect(() => {
    if (userId) context?.checkUserOnline(userId);
  }, [userId, context]);

  if (!context || !userId) return false;
  return context.onlineUserIds.has(String(userId));
}