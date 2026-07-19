import { useNavigate } from 'react-router-dom';
import { useSuggestedUsers } from '@/features/explore/hooks/useExplore';
import { useContext } from 'react';
import { PresenceContext } from '@/contexts/PresenceContext';
import Avatar from '@/components/ui/Avatar';
import Tooltip from '@/components/ui/Tooltip';

export default function ActiveNowRow() {
  const { data: suggested } = useSuggestedUsers();
  const presence = useContext(PresenceContext);
  const navigate = useNavigate();

  const onlineUsers = (suggested ?? []).filter((u) => presence?.onlineUserIds.has(String(u.id)));

  if (onlineUsers.length === 0) return null;

  return (
    <section>
      <h3 className="text-sm font-semibold text-text-secondary mb-3">Active now</h3>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {onlineUsers.map((user) => (
          <Tooltip key={user.id} content={user.name}>
            <button onClick={() => navigate(`/profile/${user.username}`)} className="shrink-0">
              <Avatar src={user.avatarUrl} name={user.name} size="md" status="online" />
            </button>
          </Tooltip>
        ))}
      </div>
    </section>
  );
}