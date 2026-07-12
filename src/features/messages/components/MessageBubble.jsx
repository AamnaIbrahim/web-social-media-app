import { cn } from '@/utils/cn';

export default function MessageBubble({ message, isOwn, showSender }) {
  return (
    <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end self-end' : 'items-start self-start')}>
      {showSender && !isOwn && (
        <span className="text-xs text-text-tertiary mb-1 ml-1">{message.sender?.name}</span>
      )}
      <div
        className={cn(
          'px-4 py-2.5 rounded-2xl text-sm',
          isOwn
            ? 'bg-accent text-text-inverse rounded-br-md'
            : 'bg-bg-subtle text-text-primary rounded-bl-md',
          message.isOptimistic && 'opacity-60'
        )}
      >
        {message.text}
      </div>
    </div>
  );
}