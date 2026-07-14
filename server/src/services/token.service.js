import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '30d';

export function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, env.jwt.accessSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function generateRefreshToken(userId) {
  return jwt.sign({ sub: userId }, env.jwt.refreshSecret, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret);
}

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, matches REFRESH_TOKEN_EXPIRY
  path: '/api/auth',
};