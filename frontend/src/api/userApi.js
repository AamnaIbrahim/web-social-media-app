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

export async function fetchUserPosts(username) {
  const { data } = await axiosInstance.get(`/users/${username}/posts`);
  return data.data;
}

export async function fetchSavedPosts() {
  const { data } = await axiosInstance.get('/posts/saved');
  return data.data;
}

export async function fetchMyWeeklyInsights() {
  const { data } = await axiosInstance.get('/users/me/insights');
  return data.data;
}