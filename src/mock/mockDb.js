import seedPosts from './posts.json';
import seedUsers from './users.json';
import seedConversations from './conversations.json';
import seedMessages from './messages.json';
import seedNotifications from './notifications.json';
import { mockStorage } from '@/services/mockStorage';

const POSTS_KEY = 'hue_mock_posts';
const USERS_KEY = 'hue_mock_users';
const CONVERSATIONS_KEY = 'hue_mock_conversations';
const MESSAGES_KEY = 'hue_mock_messages';
const NOTIFICATIONS_KEY = 'hue_mock_notifications';
const FOLLOWS_KEY = 'hue_mock_follows'; // stored as array of "followerId:followedId" strings

let posts = mockStorage.get(POSTS_KEY, seedPosts);
let users = mockStorage.get(USERS_KEY, seedUsers);
let conversations = mockStorage.get(CONVERSATIONS_KEY, seedConversations);
let messages = mockStorage.get(MESSAGES_KEY, seedMessages);
let notifications = mockStorage.get(NOTIFICATIONS_KEY, seedNotifications);
let follows = new Set(mockStorage.get(FOLLOWS_KEY, []));

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
  getNotifications: () => notifications,
  setNotifications: (updater) => {
    notifications = typeof updater === 'function' ? updater(notifications) : updater;
    mockStorage.set(NOTIFICATIONS_KEY, notifications);
    return notifications;
  },
  isFollowing: (followerId, followedId) => follows.has(`${followerId}:${followedId}`),
  toggleFollow: (followerId, followedId) => {
    const key = `${followerId}:${followedId}`;
    const nowFollowing = !follows.has(key);
    if (nowFollowing) follows.add(key);
    else follows.delete(key);
    mockStorage.set(FOLLOWS_KEY, Array.from(follows));
    return nowFollowing;
  },
};