import seedTrending from '@/mock/trending.json';
import { mockDb } from '@/mock/mockDb';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function fetchTrendingTopics() {
  await delay(500);
  return [...seedTrending].sort((a, b) => b.postCount - a.postCount);
}

export async function fetchSuggestedUsers(currentUserId) {
  await delay(500);
  return mockDb.getUsers()
    .filter((u) => u.id !== currentUserId)
    .slice(0, 5);
}

export async function searchAll(query) {
  await delay(400);
  if (!query.trim()) return { users: [], topics: [] };

  const lower = query.toLowerCase();
  const users = mockDb.getUsers().filter(
    (u) => u.name.toLowerCase().includes(lower) || u.username.toLowerCase().includes(lower)
  );
  const topics = seedTrending.filter((t) => t.topic.toLowerCase().includes(lower));

  return { users, topics };
}