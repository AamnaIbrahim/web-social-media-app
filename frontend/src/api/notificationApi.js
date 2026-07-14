import seedNotifications from '@/mock/notifications.json';
import { mockDb } from '@/mock/mockDb';
import { mockStorage } from '@/services/mockStorage';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const NOTIFS_KEY = 'hue_mock_notifications';

let notifications = mockStorage.get(NOTIFS_KEY, seedNotifications);

function persist() {
  mockStorage.set(NOTIFS_KEY, notifications);
}

function hydrate(n) {
  return { ...n, user: mockDb.getUsers().find((u) => u.id === n.userId) };
}

export async function fetchNotifications() {
  await delay(500);
  return [...notifications]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(hydrate);
}

export async function markAsRead(notificationId) {
  await delay(150);
  notifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n));
  persist();
  return hydrate(notifications.find((n) => n.id === notificationId));
}

export async function markAllAsRead() {
  await delay(300);
  notifications = notifications.map((n) => ({ ...n, read: true }));
  persist();
  return notifications.map(hydrate);
}