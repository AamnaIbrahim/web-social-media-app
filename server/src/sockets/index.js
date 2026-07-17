import { Server } from 'socket.io';
import { verifyAccessToken } from '../services/token.service.js';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

const userSockets = new Map();

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.clientUrl, credentials: true },
  });

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

  io.on('connection', (socket) => {
    const { userId } = socket;

    if (!userSockets.has(userId)) userSockets.set(userId, new Set());
    userSockets.get(userId).add(socket.id);

    socket.join(userId);

    socket.on('disconnect', () => {
      userSockets.get(userId)?.delete(socket.id);
      if (userSockets.get(userId)?.size === 0) userSockets.delete(userId);
    });
  });

  return io;
}

let ioInstance = null;
export function setIo(io) {
  ioInstance = io;
}
export function getIo() {
  return ioInstance;
}