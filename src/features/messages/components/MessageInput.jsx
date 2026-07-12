import { useState } from 'react';
import { Send } from 'lucide-react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
        className="input flex-1 !rounded-full"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="btn-primary !rounded-full !p-2.5 disabled:opacity-40"
        aria-label="Send message"
      >
        <Send size={18} strokeWidth={2} />
      </button>
    </form>
  );
}