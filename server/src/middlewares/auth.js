import { verifyAccessToken } from '../services/token.service.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    throw new AppError('Not authenticated', 401);
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError('Session expired', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError('User not found', 401);
  }

  req.user = user;
  next();
});