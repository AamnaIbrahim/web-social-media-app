import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getSocket } from '@/services/socketService';
import { useAuth } from '@/hooks/useAuth';

export const PresenceContext = createContext(null);

export default function PresenceProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [onlineUserIds, setOnlineUserIds] = useState(() => new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    const socket = getSocket();
    if (!socket) return;

    const handleSnapshot = (userIds) => setOnlineUserIds(new Set(userIds));
    const handleUpdate = ({ userId, online }) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        if (online) next.add(userId);
        else next.delete(userId);
        return next;
      });
    };

    socket.on('presence:snapshot', handleSnapshot);
    socket.on('presence:update', handleUpdate);
    return () => {
      socket.off('presence:snapshot', handleSnapshot);
      socket.off('presence:update', handleUpdate);
    };
  }, [isAuthenticated]);

  const checkUserOnline = useCallback((userId) => {
    return new Promise((resolve) => {
      const socket = getSocket();
      if (!socket || !userId) return resolve(false);
      socket.emit('presence:check', userId, (isOnline) => {
        setOnlineUserIds((prev) => {
          const next = new Set(prev);
          if (isOnline) next.add(userId);
          else next.delete(userId);
          return next;
        });
        resolve(isOnline);
      });
    });
  }, []);

  const value = useMemo(() => ({ onlineUserIds, checkUserOnline }), [onlineUserIds, checkUserOnline]);
  return <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>;
}