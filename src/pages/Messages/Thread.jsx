import { useParams } from 'react-router-dom';
import MessageThread from '@/features/messages/components/MessageThread';

export default function Thread() {
  const { conversationId } = useParams();
  return <MessageThread conversationId={conversationId} />;
}