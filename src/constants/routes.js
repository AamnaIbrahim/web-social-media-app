// path constants live here, not in routes/, so features/ can import paths without importing routing logic
export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  EXPLORE: '/explore',
  PROFILE: '/profile/:username',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  SAVED: '/saved',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
};