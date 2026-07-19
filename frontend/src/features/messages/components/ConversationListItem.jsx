import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@/components/ui/Avatar';
import { formatTimeAgo } from '@/utils/formatDate';
import { cn } from '@/utils/cn';
import { useIsOnline } from '@/hooks/usePresence';

function ConversationListItem({ conversation }) {
  const { id, displayName, displayAvatar, lastMessage, unread, otherUser } = conversation;
  const isOnline = useIsOnline(otherUser?.id);

  return (
    <NavLink
      to={`/messages/${id}`}
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-3 px-4 py-3 transition-colors duration-150',
          isActive ? 'bg-bg-subtle' : 'hover:bg-bg-subtle',
          unread && !isActive && 'border-l-2 border-l-accent'
        )
      }
    >
      <Avatar src={displayAvatar} name={displayName} size="md" status={isOnline ? 'online' : 'offline'} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={cn('text-sm truncate', unread ? 'font-bold text-text-primary' : 'font-semibold text-text-primary')}>
            {displayName}
          </p>
          {lastMessage && <span className="text-xs text-text-tertiary shrink-0">{formatTimeAgo(lastMessage.createdAt)}</span>}
        </div>
        <p className={cn('text-xs truncate', unread ? 'text-text-primary font-medium' : 'text-text-tertiary')}>
          {lastMessage?.text ?? 'No messages yet'}
        </p>
      </div>
      {unread && <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-label="Unread" />}
    </NavLink>
  );
}

export default memo(ConversationListItem);