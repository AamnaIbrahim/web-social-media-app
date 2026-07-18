import bcrypt from 'bcryptjs';
import { Preference } from '../models/Preference.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

async function getOrCreatePreferences(userId) {
  let prefs = await Preference.findOne({ userId });
  if (!prefs) {
    prefs = await Preference.create({ userId });
  }
  return prefs;
}

export const getPreferences = asyncHandler(async (req, res) => {
  const prefs = await getOrCreatePreferences(req.user._id);
  res.status(200).json({
    success: true,
    data: { privacy: prefs.privacy, notifications: prefs.notifications },
  });
});

export const updatePreferences = asyncHandler(async (req, res) => {
  const { privacy, notifications } = req.body;

  const prefs = await getOrCreatePreferences(req.user._id);

  if (privacy) prefs.privacy = { ...prefs.privacy.toObject(), ...privacy };
  if (notifications) prefs.notifications = { ...prefs.notifications.toObject(), ...notifications };

  await prefs.save();

  res.status(200).json({
    success: true,
    data: { privacy: prefs.privacy, notifications: prefs.notifications },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword) throw new AppError('Current password is required', 400);
  if (!newPassword || newPassword.length < 8) {
    throw new AppError('New password must be at least 8 characters', 400);
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new AppError('Current password is incorrect', 401);

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, data: { message: 'Password updated' } });
});