import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';
import ConversationList from '@/features/messages/components/ConversationList';
import NewConversationModal from '@/features/messages/components/NewConversationModal';
import { cn } from '@/utils/cn';

export default function MessagesLayout() {
  const { conversationId } = useParams();
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex flex-1 w-full">
        <LeftSidebar />
        <div className="flex flex-1 min-w-0 h-[calc(100vh-4rem)]">
          <div
            className={cn(
              'w-full sm:w-80 shrink-0 border-r border-border flex flex-col',
              conversationId && 'hidden sm:flex'
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <h2 className="text-base font-bold text-text-primary">Messages</h2>
              <button
                onClick={() => setComposerOpen(true)}
                className="btn-ghost !p-2 rounded-full"
                aria-label="New message"
              >
                <SquarePen size={18} strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <ConversationList />
            </div>
          </div>

          <div className={cn('flex-col flex-1 min-w-0', conversationId ? 'flex' : 'hidden sm:flex')}>
            <Outlet />
          </div>
        </div>
      </div>

      <NewConversationModal open={composerOpen} onClose={() => setComposerOpen(false)} />
    </div>
  );
}