import { User } from '../models/User.js';
import { Follow } from '../models/Follow.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createNotification } from '../controllers/notification.controller.js';

export const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) throw new AppError('User not found', 404);

  const isFollowing = await Follow.exists({ followerId: req.user._id, followedId: user._id });

  res.status(200).json({
    success: true,
    data: { ...user.toPublicJSON(), isFollowing: Boolean(isFollowing) },
  });
});

export const followUser = asyncHandler(async (req, res) => {
  const { id: targetUserId } = req.params;

  if (String(req.user._id) === String(targetUserId)) {
    throw new AppError("You can't follow yourself", 400);
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw new AppError('User not found', 404);

  const existing = await Follow.findOne({ followerId: req.user._id, followedId: targetUserId });
  if (existing) {
    throw new AppError('You already follow this user', 409);
  }

  await Follow.create({ followerId: req.user._id, followedId: targetUserId });

  await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followerCount: 1 } });

  await createNotification({
    recipientId: targetUserId,
    actorId: req.user._id,
    type: 'follow',
    message: `started following you`,
  });

  res.status(200).json({ success: true, data: { userId: targetUserId, isFollowing: true } });
});

export const unfollowUser = asyncHandler(async (req, res) => {
  const { id: targetUserId } = req.params;

  const deleted = await Follow.findOneAndDelete({ followerId: req.user._id, followedId: targetUserId });
  if (!deleted) {
    throw new AppError('You are not following this user', 409);
  }

  await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followerCount: -1 } });

  res.status(200).json({ success: true, data: { userId: targetUserId, isFollowing: false } });
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (bio !== undefined) updates.bio = bio;
  
  if (req.file) updates.avatarUrl = req.file.path;

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });

  res.status(200).json({ success: true, data: user.toPublicJSON() });
});

export const getSuggestedUsers = asyncHandler(async (req, res) => {
  const alreadyFollowing = await Follow.find({ followerId: req.user._id }).distinct('followedId');

  const suggestions = await User.find({
    _id: { $nin: [...alreadyFollowing, req.user._id] },
  }).limit(5);

  res.status(200).json({ success: true, data: suggestions.map((u) => u.toPublicJSON()) });
});

export const searchUsers = asyncHandler(async (req, res) => {
  const { q = '' } = req.query;
  if (!q.trim()) return res.status(200).json({ success: true, data: [] });

  const regex = new RegExp(q.trim(), 'i');
  const users = await User.find({
    _id: { $ne: req.user._id },
    $or: [{ name: regex }, { username: regex }],
  }).limit(10);

  res.status(200).json({ success: true, data: users.map((u) => u.toPublicJSON()) });
});