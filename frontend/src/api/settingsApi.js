import axiosInstance from './axiosInstance';

export async function fetchPreferences() {
  const { data } = await axiosInstance.get('/preferences');
  return data.data;
}

export async function updatePreferences(updates) {
  const { data } = await axiosInstance.patch('/preferences', updates);
  return data.data;
}

export async function changePassword({ currentPassword, newPassword }) {
  const { data } = await axiosInstance.patch('/preferences/password', { currentPassword, newPassword });
  return data.data;
}