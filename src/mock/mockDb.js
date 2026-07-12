import seedPosts from './posts.json';
import seedUsers from './users.json';
import { mockStorage } from '@/services/mockStorage';

const POSTS_KEY = 'hue_mock_posts';
const USERS_KEY = 'hue_mock_users';

let posts = mockStorage.get(POSTS_KEY, seedPosts);
let users = mockStorage.get(USERS_KEY, seedUsers);

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
};