import axiosInstance from './axiosInstance';

export async function fetchNotifications() {
  const { data } = await axiosInstance.get('/notifications');
  return data.data;
}

export async function markAsRead(notificationId) {
  const { data } = await axiosInstance.patch(`/notifications/${notificationId}/read`);
  return data.data;
}

export async function markAllAsRead() {
  const { data } = await axiosInstance.patch('/notifications/read-all');
  return data.data;
}

export async function fetchUnreadNotificationsCount() {
  const { data } = await axiosInstance.get('/notifications/unread-count');
  return data.data.count;
}