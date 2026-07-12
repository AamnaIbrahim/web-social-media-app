import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMessages, useSendMessage, useConversation } from '../hooks/useMessages';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Avatar from '@/components/ui/Avatar';
import { SkeletonText } from '@/components/ui/Skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

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
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
        <AlertCircle size={36} strokeWidth={1.5} className="text-error" />
        <p className="text-sm font-semibold text-text-primary">Couldn't load this conversation</p>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <Link to={ROUTES.MESSAGES} className="sm:hidden btn-ghost !p-1.5 rounded-full">
          <ArrowLeft size={18} strokeWidth={1.75} />
        </Link>
        {convLoading ? (
          <SkeletonText lines={1} className="w-32" />
        ) : (
          <>
            <Avatar src={conversation.displayAvatar} name={conversation.displayName ?? 'Group'} size="sm" />
            <p className="text-sm font-semibold text-text-primary truncate">
              {conversation.displayName || conversation.otherParticipants.map((p) => p.name).join(', ')}
            </p>
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
          messages.map((message, i) => {
            const prevMessage = messages[i - 1];
            const showSender = conversation?.type === 'group' && prevMessage?.senderId !== message.senderId;
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === user.id}
                showSender={showSender}
              />
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={(text) => sendMessageMutation.mutate(text)} />
    </div>
  );
}