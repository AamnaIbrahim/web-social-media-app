import { Notification } from '../models/Notification.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipientId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  const actorIds = [...new Set(notifications.map((n) => String(n.actorId)))];
  const actors = await User.find({ _id: { $in: actorIds } });
  const actorMap = new Map(actors.map((u) => [String(u._id), u.toPublicJSON()]));

  const hydrated = notifications.map((n) => ({
    id: n._id,
    type: n.type,
    message: n.message,
    read: n.read,
    createdAt: n.createdAt,
    targetPostId: n.targetPostId,
    user: actorMap.get(String(n.actorId)),
  }));

  res.status(200).json({ success: true, data: hydrated });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipientId: req.user._id },
    { read: true },
    { new: true }
  );

  res.status(200).json({ success: true, data: notification });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ recipientId: req.user._id, read: false }, { read: true });

  const notifications = await Notification.find({ recipientId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: notifications });
});