import { Router } from 'express';
import {
  getConversations,
  getConversationById,
  findOrCreateConversation,
  getMessages,
  sendMessage,
  getMessageableUsers,
  getUnreadConversationsCount,
} from '../controllers/message.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/unread-count', getUnreadConversationsCount);
router.get('/conversations', getConversations);
router.post('/conversations', findOrCreateConversation);
router.get('/conversations/:id', getConversationById);
router.get('/conversations/:id/messages', getMessages);
router.post('/conversations/:id/messages', sendMessage);
router.get('/messageable', getMessageableUsers);

export default router;