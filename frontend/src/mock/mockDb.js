import seedPosts from './posts.json';
import seedUsers from './users.json';
import seedConversations from './conversations.json';
import seedMessages from './messages.json';
import seedNotifications from './notifications.json';
import seedComments from './comments.json';
import { mockStorage } from '@/services/mockStorage';

const POSTS_KEY = 'hue_mock_posts';
const USERS_KEY = 'hue_mock_users';
const CONVERSATIONS_KEY = 'hue_mock_conversations';
const MESSAGES_KEY = 'hue_mock_messages';
const NOTIFICATIONS_KEY = 'hue_mock_notifications';
const COMMENTS_KEY = 'hue_mock_comments';
const FOLLOWS_KEY = 'hue_mock_follows';

let posts = mockStorage.get(POSTS_KEY, seedPosts);
let users = mockStorage.get(USERS_KEY, seedUsers);
let conversations = mockStorage.get(CONVERSATIONS_KEY, seedConversations);
let messages = mockStorage.get(MESSAGES_KEY, seedMessages);
let notifications = mockStorage.get(NOTIFICATIONS_KEY, seedNotifications);
let comments = mockStorage.get(COMMENTS_KEY, seedComments);
let follows = new Set(mockStorage.get(FOLLOWS_KEY, []));

const validConversationIds = new Set(
  conversations.filter((c) => c.participantIds.length === 2).map((c) => c.id)
);
const removedAnyConversation = validConversationIds.size !== conversations.length;

if (removedAnyConversation) {
  conversations = conversations.filter((c) => validConversationIds.has(c.id));
  messages = messages.filter((m) => validConversationIds.has(m.conversationId));
  mockStorage.set(CONVERSATIONS_KEY, conversations);
  mockStorage.set(MESSAGES_KEY, messages);
}

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
  getComments: () => comments,
  setComments: (updater) => {
    comments = typeof updater === 'function' ? updater(comments) : updater;
    mockStorage.set(COMMENTS_KEY, comments);
    return comments;
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