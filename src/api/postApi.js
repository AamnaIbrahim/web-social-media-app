import postsData from '@/mock/posts.json';
import usersData from '@/mock/users.json';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let posts = postsData.map((p) => ({ ...p }));

function hydratePost(post) {
  return { ...post, user: usersData.find((u) => u.id === post.userId) };
}

// Mimics a real paginated REST endpoint: GET /posts?page=1&limit=5
export async function fetchPosts({ pageParam = 1, limit = 5 }) {
  await delay(600);
  const start = (pageParam - 1) * limit;
  const pagePosts = posts.slice(start, start + limit);
  return {
    data: pagePosts.map(hydratePost),
    nextPage: start + limit < posts.length ? pageParam + 1 : undefined,
  };
}

// Mimics PATCH /posts/:id/like
export async function toggleLike(postId) {
  await delay(200);
  posts = posts.map((p) =>
    p.id === postId
      ? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 }
      : p
  );
  return hydratePost(posts.find((p) => p.id === postId));
}

// Mimics PATCH /posts/:id/save
export async function toggleSave(postId) {
  await delay(200);
  posts = posts.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p));
  return hydratePost(posts.find((p) => p.id === postId));
}