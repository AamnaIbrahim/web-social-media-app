import { Server } from 'socket.io';
import { verifyAccessToken } from '../services/token.service.js';
import { User } from '../models/User.js';
import { Preference } from '../models/Preference.js';
import { env } from '../config/env.js';

const userSockets = new Map();
const onlineUsers = new Map();

export function initSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: env.clientUrl, credentials: true } });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Not authenticated'));

      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.sub);
      if (!user) return next(new Error('User not found'));

      socket.userId = String(user._id);
      next();
    } catch {
      next(new Error('Not authenticated'));
    }
  });

  io.on('connection', async (socket) => {
    const { userId } = socket;

    if (!userSockets.has(userId)) userSockets.set(userId, new Set());
    userSockets.get(userId).add(socket.id);

    socket.join(userId);

    const prefs = await Preference.findOne({ userId });
    const canShowActivity = prefs?.privacy?.showActivityStatus ?? true;
    socket.canShowActivity = canShowActivity;

    if (canShowActivity) {
      const wasOffline = !onlineUsers.has(userId);
      onlineUsers.set(userId, (onlineUsers.get(userId) ?? 0) + 1);
      if (wasOffline) socket.broadcast.emit('presence:update', { userId, online: true });
    }

    socket.emit('presence:snapshot', [...onlineUsers.keys()]);

    socket.on('presence:check', (targetUserId, callback) => {
      const isOnline = onlineUsers.has(String(targetUserId));
      callback?.(isOnline);
    });

    socket.on('disconnect', () => {
      userSockets.get(userId)?.delete(socket.id);
      if (userSockets.get(userId)?.size === 0) userSockets.delete(userId);

      if (socket.canShowActivity && onlineUsers.has(userId)) {
        const count = onlineUsers.get(userId) - 1;
        if (count <= 0) {
          onlineUsers.delete(userId);
          socket.broadcast.emit('presence:update', { userId, online: false });
        } else {
          onlineUsers.set(userId, count);
        }
      }
    });
  });

  return io;
}

let ioInstance = null;
export function setIo(io) { ioInstance = io; }
export function getIo() { return ioInstance; }