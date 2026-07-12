import usersData from '@/mock/users.json';
import postsData from '@/mock/posts.json';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let follows = new Set(); // in-memory: current user's following list, keyed by userId

export async function fetchUserByUsername(username) {
  await delay(500);
  const user = usersData.find((u) => u.username === username);
  if (!user) throw new Error('User not found');
  return { ...user, isFollowing: follows.has(user.id) };
}

export async function fetchUserPosts(userId) {
  await delay(500);
  return postsData
    .filter((p) => p.userId === userId)
    .map((p) => ({ ...p, user: usersData.find((u) => u.id === p.userId) }));
}

export async function fetchSavedPosts() {
  await delay(500);
  return postsData
    .filter((p) => p.saved)
    .map((p) => ({ ...p, user: usersData.find((u) => u.id === p.userId) }));
}

export async function toggleFollow(userId) {
  await delay(300);
  const isNowFollowing = !follows.has(userId);
  if (isNowFollowing) follows.add(userId);
  else follows.delete(userId);
  return { userId, isFollowing: isNowFollowing };
}