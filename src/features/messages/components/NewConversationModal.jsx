import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/ui/Modal';
import SearchBar from '@/components/ui/SearchBar';
import Avatar from '@/components/ui/Avatar';
import Loader from '@/components/ui/Loader';
import { useMessageableUsers } from '../hooks/useMessageableUsers';
import { useStartConversation } from '../hooks/useStartConversation';

export default function NewConversationModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const { data: users, isLoading } = useMessageableUsers(query);
  const startConversation = useStartConversation();
  const navigate = useNavigate();

  const handleSelectUser = async (userId) => {
    const conversation = await startConversation.mutateAsync(userId);
    onClose();
    navigate(`/messages/${conversation.id}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="New message">
      <SearchBar
        placeholder="Search people"
        onSearch={setQuery}
        className="mb-4 !bg-bg-subtle"
      />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : users?.length === 0 ? (
        <p className="text-sm text-text-tertiary text-center py-8">No one found.</p>
      ) : (
        <div className="flex flex-col max-h-80 overflow-y-auto -mx-2">
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => handleSelectUser(u.id)}
              disabled={startConversation.isPending}
              className="flex items-center gap-3 px-2 py-2.5 rounded-md hover:bg-bg-subtle transition-colors duration-150 text-left disabled:opacity-50"
            >
              <Avatar src={u.avatarUrl} name={u.name} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{u.name}</p>
                <p className="text-xs text-text-tertiary truncate">@{u.username}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}