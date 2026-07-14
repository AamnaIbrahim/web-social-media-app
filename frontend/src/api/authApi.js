import { mockDb } from '@/mock/mockDb';
import { mockStorage } from '@/services/mockStorage';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const CREDS_KEY = 'hue_mock_credentials';

// Seed credentials — only used the very first time the app runs on a browser
// with no persisted state yet. After that, mockStorage's persisted copy wins.
const seedCredentials = [
  { email: 'ava@hue.app', password: 'password123', userId: 'u1' },
  { email: 'miles@hue.app', password: 'password123', userId: 'u2' },
];

let mockCredentials = mockStorage.get(CREDS_KEY, seedCredentials);

function persistCredentials() {
  mockStorage.set(CREDS_KEY, mockCredentials);
}

function generateMockToken(userId) {
  const payload = { userId, exp: Date.now() + 1000 * 60 * 60 * 24 }; // 24h
  return btoa(JSON.stringify(payload));
}

function decodeMockToken(token) {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

export async function loginRequest({ email, password }) {
  await delay(700);
  const match = mockCredentials.find((c) => c.email === email && c.password === password);
  if (!match) {
    throw new Error('Invalid email or password');
  }
  const user = mockDb.getUsers().find((u) => u.id === match.userId);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const token = generateMockToken(user.id);
  return { token, user };
}

export async function registerRequest({ fullName, username, email, password }) {
  await delay(700);

  const emailTaken = mockCredentials.some((c) => c.email === email);
  if (emailTaken) {
    throw new Error('An account with this email already exists');
  }

  const usernameTaken = mockDb.getUsers().some((u) => u.username === username);
  if (usernameTaken) {
    throw new Error('That username is already taken');
  }

  const newUser = {
    id: `u${Date.now()}`,
    name: fullName,
    username,
    avatarUrl: null,
    bio: '',
    coverUrl: null,
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
    joinedAt: new Date().toISOString(),
  };

  // Persisted via mockDb (shared with postApi/userApi — single source of truth for users)
  mockDb.setUsers((users) => [...users, newUser]);

  // Credentials persisted separately since they're auth-specific, not part of
  // the public user object other API files read from.
  mockCredentials = [...mockCredentials, { email, password, userId: newUser.id }];
  persistCredentials();

  const token = generateMockToken(newUser.id);
  return { token, user: newUser };
}

// Mimics GET /auth/me — called on app load to validate a stored token
// and rehydrate the session without asking the user to log in again.
export async function fetchCurrentUser(token) {
  await delay(400);
  const payload = decodeMockToken(token);
  if (!payload || payload.exp < Date.now()) {
    throw new Error('Session expired');
  }
  const user = mockDb.getUsers().find((u) => u.id === payload.userId);
  if (!user) throw new Error('User not found');
  return user;
}

export async function logoutRequest() {
  await delay(200);
  return true;
}