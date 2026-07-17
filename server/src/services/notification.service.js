import { Notification } from '../models/Notification.js';

export async function createNotification({ recipientId, actorId, type, targetPostId = null, message }) {
  if (String(recipientId) === String(actorId)) return null;

  return Notification.create({ recipientId, actorId, type, targetPostId, message });
}