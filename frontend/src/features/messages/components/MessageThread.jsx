import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMessages, useSendMessage, useConversation } from '../hooks/useMessages';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Avatar from '@/components/ui/Avatar';
import { SkeletonText } from '@/components/ui/Skeleton';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ErrorState from '@/components/ui/ErrorState';

export default function MessageThread({ conversationId }) {
  const { user } = useAuth();
  const { data: conversation, isLoading: convLoading } = useConversation(conversationId);
  const { data: messages, isLoading: messagesLoading, isError, refetch } = useMessages(conversationId);
  const sendMessageMutation = useSendMessage(conversationId);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ErrorState title="Couldn't load this conversation" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-14 lg:pb-0">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
        <Link to={ROUTES.MESSAGES} className="sm:hidden btn-ghost !p-1.5 rounded-full">
          <ArrowLeft size={18} strokeWidth={1.75} />
        </Link>
        {convLoading ? (
          <SkeletonText lines={1} className="w-32" />
        ) : (
          <>
            <Avatar src={conversation.displayAvatar} name={conversation.displayName} size="sm" />
            <p className="text-sm font-semibold text-text-primary truncate">{conversation.displayName}</p>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messagesLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonText key={i} lines={1} className="w-40" />
            ))}
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} isOwn={message.senderId === user.id} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={(text) => sendMessageMutation.mutate(text)} />
    </div>
  );
}