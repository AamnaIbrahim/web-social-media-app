// mock/mockDb.js
import seedPosts from './posts.json';
import seedUsers from './users.json';
import seedConversations from './conversations.json';
import seedMessages from './messages.json';
import { mockStorage } from '@/services/mockStorage';

const POSTS_KEY = 'hue_mock_posts';
const USERS_KEY = 'hue_mock_users';
const CONVERSATIONS_KEY = 'hue_mock_conversations';
const MESSAGES_KEY = 'hue_mock_messages';

let posts = mockStorage.get(POSTS_KEY, seedPosts);
let users = mockStorage.get(USERS_KEY, seedUsers);
let conversations = mockStorage.get(CONVERSATIONS_KEY, seedConversations);
let messages = mockStorage.get(MESSAGES_KEY, seedMessages);

export const mockDb = {
  getPosts: () => posts,
  setPosts: (updater) => {
    posts = typeof updater === 'function' ? updater(posts) : updater;
    mockStorage.set(POSTS_KEY, posts);
    return posts;
  },
  getUsers: () => users,
  setUsers: (updater) => {
    users = typeof updater === 'function' ? updater(users) : updater;
    mockStorage.set(USERS_KEY, users);
    return users;
  },
  getConversations: () => conversations,
  setConversations: (updater) => {
    conversations = typeof updater === 'function' ? updater(conversations) : updater;
    mockStorage.set(CONVERSATIONS_KEY, conversations);
    return conversations;
  },
  getMessages: () => messages,
  setMessages: (updater) => {
    messages = typeof updater === 'function' ? updater(messages) : updater;
    mockStorage.set(MESSAGES_KEY, messages);
    return messages;
  },
};