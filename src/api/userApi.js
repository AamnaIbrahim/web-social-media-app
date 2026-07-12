import { mockDb } from '@/mock/mockDb';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let follows = new Set();

export async function fetchUserByUsername(username) {
  await delay(500);
  const user = mockDb.getUsers().find((u) => u.username === username);
  if (!user) throw new Error('User not found');
  return { ...user, isFollowing: follows.has(user.id) };
}

export async function fetchUserPosts(userId) {
  await delay(500);
  return mockDb.getPosts()
    .filter((p) => p.userId === userId)
    .map((p) => ({ ...p, user: mockDb.getUsers().find((u) => u.id === p.userId) }));
}

export async function fetchSavedPosts() {
  await delay(500);
  return mockDb.getPosts()
    .filter((p) => p.saved)
    .map((p) => ({ ...p, user: mockDb.getUsers().find((u) => u.id === p.userId) }));
}

export async function toggleFollow(userId) {
  await delay(300);
  const isNowFollowing = !follows.has(userId);
  if (isNowFollowing) follows.add(userId);
  else follows.delete(userId);
  return { userId, isFollowing: isNowFollowing };
}