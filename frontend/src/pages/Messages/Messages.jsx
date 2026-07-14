import { MessageCircle } from 'lucide-react';

export default function Messages() {
  return (
    <div className="hidden sm:flex flex-1 flex-col items-center justify-center text-center gap-3">
      <MessageCircle size={40} strokeWidth={1.5} className="text-text-tertiary" />
      <p className="text-base font-semibold text-text-primary">Select a conversation</p>
      <p className="text-sm text-text-secondary max-w-xs">Choose someone from the list to start chatting.</p>
    </div>
  );
}