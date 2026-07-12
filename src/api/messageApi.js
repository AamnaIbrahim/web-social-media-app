import { mockDb } from '@/mock/mockDb';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function hydrateConversation(conv, currentUserId) {
  const users = mockDb.getUsers();
  const otherParticipants = conv.participantIds
    .filter((id) => id !== currentUserId)
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean);

  const allMessages = mockDb.getMessages().filter((m) => m.conversationId === conv.id);
  const lastMessage = [...allMessages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  // Direct conversations display the other person's identity;
  // group conversations use their own name/avatar.
  const displayName = conv.type === 'group' ? conv.name : otherParticipants[0]?.name;
  const displayAvatar = conv.type === 'group' ? conv.avatarUrl : otherParticipants[0]?.avatarUrl;

  return {
    ...conv,
    otherParticipants,
    displayName,
    displayAvatar,
    lastMessage: lastMessage ?? null,
  };
}

export async function fetchConversations(currentUserId) {
  await delay(500);
  return mockDb
    .getConversations()
    .filter((c) => c.participantIds.includes(currentUserId))
    .map((c) => hydrateConversation(c, currentUserId))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export async function fetchConversationById(conversationId, currentUserId) {
  await delay(300);
  const conv = mockDb.getConversations().find((c) => c.id === conversationId);
  if (!conv) throw new Error('Conversation not found');
  return hydrateConversation(conv, currentUserId);
}

export async function fetchMessages(conversationId) {
  await delay(400);
  const users = mockDb.getUsers();
  return mockDb
    .getMessages()
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((m) => ({ ...m, sender: users.find((u) => u.id === m.senderId) }));
}

export async function sendMessage({ conversationId, senderId, text }) {
  await delay(250);

  const newMessage = {
    id: `m${Date.now()}`,
    conversationId,
    senderId,
    text,
    createdAt: new Date().toISOString(),
  };

  mockDb.setMessages((messages) => [...messages, newMessage]);
  mockDb.setConversations((convs) =>
    convs.map((c) => (c.id === conversationId ? { ...c, updatedAt: newMessage.createdAt } : c))
  );

  const users = mockDb.getUsers();
  return { ...newMessage, sender: users.find((u) => u.id === senderId) };
}