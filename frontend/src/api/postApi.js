import axiosInstance from './axiosInstance';

export async function fetchPosts({ pageParam = 1, limit = 5 }) {
  const { data } = await axiosInstance.get('/posts', { params: { page: pageParam, limit } });
  return { data: data.data, nextPage: data.nextPage };
}

export async function fetchPostById(postId) {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data.data;
}

export async function toggleLike(postId) {
  const { data } = await axiosInstance.patch(`/posts/${postId}/like`);
  return data.data;
}

export async function toggleSave(postId) {
  const { data } = await axiosInstance.patch(`/posts/${postId}/save`);
  return data.data;
}

export async function createPost({ text, images }) {
  const formData = new FormData();
  formData.append('text', text);
  images.forEach((file) => {
    if (typeof file !== 'string') formData.append('images', file);
  });

  const { data } = await axiosInstance.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function fetchComments(postId) {
  const { data } = await axiosInstance.get(`/posts/${postId}/comments`);
  return data.data;
}

export async function addComment({ postId, text }) {
  const { data } = await axiosInstance.post(`/posts/${postId}/comments`, { text });
  return data.data;
}

export async function fetchSavedPosts() {
  const { data } = await axiosInstance.get('/posts/saved');
  return data.data;
}