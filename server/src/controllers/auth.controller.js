import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  refreshCookieOptions,
} from '../services/token.service.js';

function issueTokensAndRespond(res, user, statusCode) {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  res.status(statusCode).json({
    success: true,
    data: { token: accessToken, user: user.toPublicJSON() },
  });
}

export const register = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new AppError('An account with this email already exists', 409);
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new AppError('That username is already taken', 409);
  }

  const user = await User.create({ name: fullName, username, email, password });

  issueTokensAndRespond(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // .select('+password') needed since the schema excludes it by default
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    // Deliberately identical message for "no such email" and "wrong password" —
    // distinguishing them lets an attacker enumerate which emails have accounts.
    throw new AppError('Invalid email or password', 401);
  }

  issueTokensAndRespond(res, user, 200);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.status(200).json({ success: true, data: null });
});

export const me = asyncHandler(async (req, res) => {
  // req.user is already attached by the requireAuth middleware
  res.status(200).json({ success: true, data: req.user.toPublicJSON() });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new AppError('No refresh token provided', 401);
  }

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError('User not found', 401);
  }

  // Rotate the refresh token on every use
  issueTokensAndRespond(res, user, 200);
});