import { mockDb } from '@/mock/mockDb';
import { mockStorage } from '@/services/mockStorage';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const PREFS_KEY = 'hue_mock_preferences';

const defaultPreferences = {
  privacy: {
    privateAccount: false,
    showActivityStatus: true,
    allowMentions: true,
  },
  notifications: {
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
  },
};

function loadAllPreferences() {
  return mockStorage.get(PREFS_KEY, {});
}

export async function fetchPreferences(userId) {
  await delay(400);
  const all = loadAllPreferences();
  return all[userId] ?? defaultPreferences;
}

export async function updatePreferences(userId, updates) {
  await delay(300);
  const all = loadAllPreferences();
  const current = all[userId] ?? defaultPreferences;
  const merged = { ...current, ...updates };
  const next = { ...all, [userId]: merged };
  mockStorage.set(PREFS_KEY, next);
  return merged;
}

// Mimics PATCH /users/:id — updates the shared user record everyone else reads.
export async function updateProfile(userId, updates) {
  await delay(600);
  const updatedUsers = mockDb.setUsers((users) =>
    users.map((u) => (u.id === userId ? { ...u, ...updates } : u))
  );
  return updatedUsers.find((u) => u.id === userId);
}

// Mimics PATCH /auth/password 
export async function changePassword({ currentPassword, newPassword }) {
  await delay(600);
  if (currentPassword.length < 1) {
    throw new Error('Current password is required');
  }
  if (newPassword.length < 8) {
    throw new Error('New password must be at least 8 characters');
  }
  return { success: true };
}