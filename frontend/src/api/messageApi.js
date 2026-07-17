import axiosInstance from './axiosInstance';

export async function fetchConversations() {
  const { data } = await axiosInstance.get('/messages/conversations');
  return data.data;
}

export async function fetchConversationById(conversationId) {
  const { data } = await axiosInstance.get(`/messages/conversations/${conversationId}`);
  return data.data;
}

export async function findOrCreateDirectConversation(otherUserId) {
  const { data } = await axiosInstance.post('/messages/conversations', { userId: otherUserId });
  return data.data;
}

export async function fetchMessages(conversationId) {
  const { data } = await axiosInstance.get(`/messages/conversations/${conversationId}/messages`);
  return data.data;
}

export async function sendMessage({ conversationId, text }) {
  const { data } = await axiosInstance.post(`/messages/conversations/${conversationId}/messages`, { text });
  return data.data;
}

export async function fetchMessageableUsers(query = '') {
  const { data } = await axiosInstance.get('/messages/messageable', { params: { q: query } });
  return data.data;
}