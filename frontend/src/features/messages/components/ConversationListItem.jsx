import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@/components/ui/Avatar';
import { formatTimeAgo } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

function ConversationListItem({ conversation }) {
  const { id, displayName, displayAvatar, lastMessage } = conversation;

  return (
    <NavLink
      to={`/messages/${id}`}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-3 transition-colors duration-150',
          isActive ? 'bg-bg-subtle' : 'hover:bg-bg-subtle'
        )
      }
    >
      <Avatar src={displayAvatar} name={displayName} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
          {lastMessage && (
            <span className="text-xs text-text-tertiary shrink-0">{formatTimeAgo(lastMessage.createdAt)}</span>
          )}
        </div>
        <p className="text-xs text-text-tertiary truncate">{lastMessage?.text ?? 'No messages yet'}</p>
      </div>
    </NavLink>
  );
}
export default memo(ConversationListItem);