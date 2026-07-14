import { useConversations } from '../hooks/useConversations';
import ConversationListItem from './ConversationListItem';
import { SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';
import { MessageCircle } from 'lucide-react';

export default function ConversationList() {
  const { data: conversations, isLoading } = useConversations();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 p-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-2 py-3">
            <SkeletonAvatar size="md" />
            <SkeletonText lines={2} className="flex-1" />
          </div>
        ))}
      </div>
    );
  }

  if (conversations?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-4">
        <MessageCircle size={32} strokeWidth={1.5} className="text-text-tertiary" />
        <p className="text-sm font-semibold text-text-primary">No conversations yet</p>
        <p className="text-xs text-text-secondary">Messages with people you follow will show up here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {conversations.map((conv) => (
        <ConversationListItem key={conv.id} conversation={conv} />
      ))}
    </div>
  );
}