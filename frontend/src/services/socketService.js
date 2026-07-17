import { io } from 'socket.io-client';
import { tokenStorage } from './storageService';

let socket = null;

export function connectSocket() {
  if (socket?.connected) return socket;

  const token = tokenStorage.get();
  if (!token) return null;

  socket = io(import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5000', {
    auth: { token },
    withCredentials: true,
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function getSocket() {
  return socket;
}