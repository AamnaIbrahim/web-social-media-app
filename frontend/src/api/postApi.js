import { mockDb } from '@/mock/mockDb';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function hydratePost(post) {
  return { ...post, user: mockDb.getUsers().find((u) => u.id === post.userId) };
}

export async function fetchPosts({ pageParam = 1, limit = 5 }) {
  await delay(600);
  const posts = mockDb.getPosts();
  const start = (pageParam - 1) * limit;
  const pagePosts = posts.slice(start, start + limit);
  return {
    data: pagePosts.map(hydratePost),
    nextPage: start + limit < posts.length ? pageParam + 1 : undefined,
  };
}

export async function fetchPostById(postId) {
  await delay(400);
  const post = mockDb.getPosts().find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');
  return hydratePost(post);
}
export async function fetchComments(postId) {
  await delay(400);
  const users = mockDb.getUsers();
  return mockDb
    .getComments()
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((c) => ({ ...c, user: users.find((u) => u.id === c.userId) }));
}

export async function addComment({ postId, userId, text }) {
  await delay(400);

  const newComment = {
    id: `cm${Date.now()}`,
    postId,
    userId,
    text,
    createdAt: new Date().toISOString(),
  };
  mockDb.setComments((comments) => [...comments, newComment]);
  mockDb.setPosts((posts) =>
    posts.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p))
  );

  const user = mockDb.getUsers().find((u) => u.id === userId);
  return { ...newComment, user };
}

export async function toggleLike(postId) {
  await delay(200);
  const updated = mockDb.setPosts((posts) =>
    posts.map((p) =>
      p.id === postId ? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 } : p
    )
  );
  return hydratePost(updated.find((p) => p.id === postId));
}

export async function toggleSave(postId) {
  await delay(200);
  const updated = mockDb.setPosts((posts) =>
    posts.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p))
  );
  return hydratePost(updated.find((p) => p.id === postId));
}

export async function createPost({ text, images, userId }) {
  await delay(800);
  const newPost = {
    id: `p${Date.now()}`,
    userId,
    text,
    images: images.map((file) => (typeof file === 'string' ? file : URL.createObjectURL(file))),
    likeCount: 0,
    commentCount: 0,
    liked: false,
    saved: false,
    createdAt: new Date().toISOString(),
  };
  mockDb.setPosts((posts) => [newPost, ...posts]);
  return hydratePost(newPost);
}