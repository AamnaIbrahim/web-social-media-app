import axiosInstance from './axiosInstance';

export async function loginRequest({ email, password }) {
  const { data } = await axiosInstance.post('/auth/login', { email, password });
  return data.data;
}

export async function registerRequest(formData) {
  const { data } = await axiosInstance.post('/auth/register', formData);
  return data.data;
}

export async function fetchCurrentUser() {
  const { data } = await axiosInstance.get('/auth/me');
  return data.data;
}

export async function logoutRequest() {
  await axiosInstance.post('/auth/logout');
  return true;
}