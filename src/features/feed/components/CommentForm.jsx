import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function CommentForm({ onSubmit, isSubmitting }) {
  const { user } = useAuth();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3 py-4 border-t border-border">
      <Avatar src={user?.avatarUrl} name={user?.name} size="sm" />
      <div className="flex-1 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="input flex-1 !rounded-full"
        />
        <Button type="submit" size="sm" disabled={!text.trim()} isLoading={isSubmitting}>
          Post
        </Button>
      </div>
    </form>
  );
}