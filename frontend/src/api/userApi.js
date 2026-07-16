import axiosInstance from './axiosInstance';

export async function fetchUserByUsername(username) {
  const { data } = await axiosInstance.get(`/users/${username}`);
  return data.data;
}

export async function toggleFollow(currentUserId, targetUserId, isCurrentlyFollowing) {
  const { data } = isCurrentlyFollowing
    ? await axiosInstance.delete(`/users/${targetUserId}/follow`)
    : await axiosInstance.post(`/users/${targetUserId}/follow`);
  return data.data;
}

export async function updateProfile(formData) {
  const { data } = await axiosInstance.patch('/users/me', formData, {
    headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return data.data;
}

export async function fetchSuggestedUsers() {
  const { data } = await axiosInstance.get('/users/suggested');
  return data.data;
}

export async function searchUsers(query) {
  const { data } = await axiosInstance.get('/users/search', { params: { q: query } });
  return data.data;
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