import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

async function hydrateConversations(conversations, currentUserId) {
  const otherUserIds = conversations.map(
    (c) => c.participantIds.find((id) => String(id) !== String(currentUserId))
  );
  const conversationIds = conversations.map((c) => c._id);

  const [users, lastMessages] = await Promise.all([
    User.find({ _id: { $in: otherUserIds } }),
    Message.aggregate([
      { $match: { conversationId: { $in: conversationIds } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$conversationId', doc: { $first: '$$ROOT' } } },
    ]),
  ]);

  const userMap = new Map(users.map((u) => [String(u._id), u.toPublicJSON()]));
  const lastMessageMap = new Map(lastMessages.map((m) => [String(m._id), m.doc]));

  return conversations
    .map((conv) => {
      const otherUserId = conv.participantIds.find((id) => String(id) !== String(currentUserId));
      const otherUser = userMap.get(String(otherUserId));
      const lastMessage = lastMessageMap.get(String(conv._id));

      return {
        id: conv._id,
        displayName: otherUser?.name,
        displayAvatar: otherUser?.avatarUrl,
        otherUser,
        lastMessage: lastMessage
          ? { id: lastMessage._id, text: lastMessage.text, senderId: lastMessage.senderId, createdAt: lastMessage.createdAt }
          : null,
        updatedAt: conv.updatedAt,
      };
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ participantIds: req.user._id });
  const hydrated = await hydrateConversations(conversations, req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({
    _id: req.params.id,
    participantIds: req.user._id, // guarantees you can only fetch conversations you're actually part of
  });
  if (!conversation) throw new AppError('Conversation not found', 404);

  const [hydrated] = await hydrateConversations([conversation], req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const findOrCreateConversation = asyncHandler(async (req, res) => {
  const { userId: otherUserId } = req.body;

  if (String(otherUserId) === String(req.user._id)) {
    throw new AppError("You can't message yourself", 400);
  }

  const otherUser = await User.findById(otherUserId);
  if (!otherUser) throw new AppError('User not found', 404);

  let conversation = await Conversation.findOne({
    participantIds: { $all: [req.user._id, otherUserId], $size: 2 },
  });

  if (!conversation) {
    conversation = await Conversation.create({ participantIds: [req.user._id, otherUserId] });
  }

  const [hydrated] = await hydrateConversations([conversation], req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const getMessages = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({
    _id: req.params.id,
    participantIds: req.user._id,
  });
  if (!conversation) throw new AppError('Conversation not found', 404);

  const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
  const senderIds = [...new Set(messages.map((m) => String(m.senderId)))];
  const senders = await User.find({ _id: { $in: senderIds } });
  const senderMap = new Map(senders.map((u) => [String(u._id), u.toPublicJSON()]));

  const hydrated = messages.map((m) => ({
    id: m._id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    text: m.text,
    createdAt: m.createdAt,
    sender: senderMap.get(String(m.senderId)),
  }));

  res.status(200).json({ success: true, data: hydrated });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) throw new AppError('Message cannot be empty', 400);

  const conversation = await Conversation.findOne({
    _id: req.params.id,
    participantIds: req.user._id,
  });
  if (!conversation) throw new AppError('Conversation not found', 404);

  const message = await Message.create({
    conversationId: conversation._id,
    senderId: req.user._id,
    text: text.trim(),
  });

  conversation.updatedAt = message.createdAt;
  await conversation.save();

  res.status(201).json({
    success: true,
    data: {
      id: message._id,
      conversationId: message.conversationId,
      senderId: message.senderId,
      text: message.text,
      createdAt: message.createdAt,
      sender: req.user.toPublicJSON(),
    },
  });
});

export const getMessageableUsers = asyncHandler(async (req, res) => {
  const { q = '' } = req.query;

  const filter = { _id: { $ne: req.user._id } };
  if (q.trim()) {
    const regex = new RegExp(q.trim(), 'i');
    filter.$or = [{ name: regex }, { username: regex }];
  }

  const users = await User.find(filter).limit(20);
  res.status(200).json({ success: true, data: users.map((u) => u.toPublicJSON()) });
});