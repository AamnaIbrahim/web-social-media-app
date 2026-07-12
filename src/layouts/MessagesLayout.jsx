import { Outlet, useParams } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';
import ConversationList from '@/features/messages/components/ConversationList';
import { cn } from '@/utils/cn';

export default function MessagesLayout() {
  const { conversationId } = useParams();

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex flex-1 w-full">
        <LeftSidebar />
        <div className="flex flex-1 min-w-0 h-[calc(100vh-4rem)]">
          <div
            className={cn(
              'w-full sm:w-80 shrink-0 border-r border-border overflow-y-auto scrollbar-hide',
              conversationId && 'hidden sm:block'
            )}
          >
            <ConversationList />
          </div>
          <div className={cn('flex-col flex-1 min-w-0', conversationId ? 'flex' : 'hidden sm:flex')}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}