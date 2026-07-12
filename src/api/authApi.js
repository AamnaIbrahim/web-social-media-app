import usersData from '@/mock/users.json';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Simulated user "database" with credentials — password included only here,
// mimicking a backend's user table.
const mockCredentials = [
  { email: 'ava@hue.app', password: 'password123', userId: 'u1' },
  { email: 'miles@hue.app', password: 'password123', userId: 'u2' },
];

function generateMockToken(userId) {
  // Not a real JWT — just a base64 payload with an expiry, enough to exercise
  // real expiry/validation logic on the client. Real backend replaces this
  // with an actual signed JWT; the shape consumed below stays the same.
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
  const user = usersData.find((u) => u.id === match.userId);
  const token = generateMockToken(user.id);
  return { token, user };
}

export async function registerRequest({ fullName, username, email, password }) {
  await delay(700);
  const emailTaken = mockCredentials.some((c) => c.email === email);
  if (emailTaken) {
    throw new Error('An account with this email already exists');
  }
  const usernameTaken = usersData.some((u) => u.username === username);
  if (usernameTaken) {
    throw new Error('That username is already taken');
  }

  const newUser = {
    id: `u${usersData.length + 1}`,
    name: fullName,
    username,
    avatarUrl: null,
  };
  usersData.push(newUser);
  mockCredentials.push({ email, password, userId: newUser.id });

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
  const user = usersData.find((u) => u.id === payload.userId);
  if (!user) throw new Error('User not found');
  return user;
}

export async function logoutRequest() {
  await delay(200);
  return true;
}