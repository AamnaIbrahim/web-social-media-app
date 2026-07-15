import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { PendingRegistration } from '../models/PendingRegistration.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateOtp, hashOtp, compareOtp, OTP_EXPIRY_MINUTES } from '../utils/otp.js';
import { sendOtpEmail } from '../services/email.service.js';
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
  res.status(statusCode).json({ success: true, data: { token: accessToken, user: user.toPublicJSON() } });
}

export const register = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (await User.findOne({ email })) throw new AppError('An account with this email already exists', 409);
  if (await User.findOne({ username })) throw new AppError('That username is already taken', 409);

  const hashedPassword = await bcrypt.hash(password, 12);
  const code = generateOtp();
  const hashedOtp = await hashOtp(code);
  const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await PendingRegistration.findOneAndUpdate(
    { email },
    { name: fullName, username, email, password: hashedPassword, otpCode: hashedOtp, otpExpiresAt },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true } 
  );

  await sendOtpEmail(email, code);

  res.status(201).json({ success: true, data: { email } });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const pending = await PendingRegistration.findOne({ email });
  if (!pending) {
    throw new AppError('Enter a valid email address', 400);
  }
  if (pending.otpExpiresAt < new Date()) {
    throw new AppError('This code has expired. Please register again.', 400);
  }

  const isValid = await compareOtp(code, pending.otpCode);
  if (!isValid) {
    throw new AppError('Incorrect code. Please try again.', 400);
  }

  const user = new User({
    name: pending.name,
    username: pending.username,
    email: pending.email,
    password: pending.password,
  });
  user._skipPasswordHash = true;
  await user.save();

  await PendingRegistration.deleteOne({ email });

  res.status(200).json({ success: true, data: { email: user.email } });
});

export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const pending = await PendingRegistration.findOne({ email });
  if (!pending) {
    throw new AppError('Enter a valid email address', 400);
  }

  const code = generateOtp();
  pending.otpCode = await hashOtp(code);
  pending.otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  await pending.save();

  await sendOtpEmail(email, code);

  res.status(200).json({ success: true, data: { email } });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  issueTokensAndRespond(res, user, 200);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.status(200).json({ success: true, data: null });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user.toPublicJSON() });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new AppError('No refresh token provided', 401);

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user) throw new AppError('User not found', 401);

  issueTokensAndRespond(res, user, 200);
});