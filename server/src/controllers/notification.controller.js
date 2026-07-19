import { createNotification as createNotificationInDb } from '../services/notification.service.js';
import { Notification } from '../models/Notification.js';
import { getIo } from '../sockets/index.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export async function createNotification(params) {
  const notification = await createNotificationInDb(params);
  if (!notification) return null;

  const actor = await User.findById(params.actorId);
  getIo()?.to(String(params.recipientId)).emit('notification:new', {
    id: notification._id,
    type: notification.type,
    message: notification.message,
    read: notification.read,
    createdAt: notification.createdAt,
    targetPostId: notification.targetPostId,
    user: actor?.toPublicJSON(),
  });

  return notification;
}

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipientId: req.user._id })
    .sort({ createdAt: -1 })
    .populate('actorId', 'name username avatarUrl');

  const hydrated = notifications.map((n) => ({
    id: n._id,
    type: n.type,
    message: n.message,
    read: n.read,
    createdAt: n.createdAt,
    targetPostId: n.targetPostId,
    user: n.actorId,
  }));

  res.status(200).json({ success: true, data: hydrated });
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({ recipientId: req.user._id, read: false });
  res.status(200).json({ success: true, data: { count } });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipientId: req.user._id },
    { read: true },
    { new: true }
  ).populate('actorId', 'name username avatarUrl');

  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }

  res.status(200).json({
    success: true,
    data: {
      id: notification._id,
      type: notification.type,
      message: notification.message,
      read: notification.read,
      createdAt: notification.createdAt,
      targetPostId: notification.targetPostId,
      user: notification.actorId,
    },
  });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipientId: req.user._id, read: false },
    { read: true }
  );

  const notifications = await Notification.find({ recipientId: req.user._id })
    .sort({ createdAt: -1 })
    .populate('actorId', 'name username avatarUrl');

  const hydrated = notifications.map((n) => ({
    id: n._id,
    type: n.type,
    message: n.message,
    read: n.read,
    createdAt: n.createdAt,
    targetPostId: n.targetPostId,
    user: n.actorId,
  }));

  res.status(200).json({ success: true, data: hydrated });
});