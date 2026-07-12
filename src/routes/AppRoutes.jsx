// routes/AppRoutes.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';

import LandingLayout from '@/layouts/LandingLayout';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import MessagesLayout from '@/layouts/MessagesLayout';
import SettingsLayout from '@/layouts/SettingsLayout';

import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

import Landing from '@/pages/Landing/Landing';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Home from '@/pages/Home/Home';
import Explore from '@/pages/Explore/Explore';
import Saved from '@/pages/Saved/Saved';
import Notifications from '@/pages/Notifications/Notifications';
import Profile from '@/pages/Profile/Profile';
import Messages from '@/pages/Messages/Messages';
import Thread from '@/pages/Messages/Thread';
import Account from '@/pages/Settings/Account';
import Privacy from '@/pages/Settings/Privacy';
import NotificationSettings from '@/pages/Settings/NotificationSettings';
import Appearance from '@/pages/Settings/Appearance';
import Security from '@/pages/Settings/Security';
import NotFound from '@/pages/NotFound';
import PostDetail from '@/pages/PostDetail/PostDetail';


// Lightweight cross-fade applied to every top-level page. Kept fast (0.15s,
// opacity-only) so it signals a page change without adding perceptible
// latency to navigation in a feed-scrolling app.
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route element={<LandingLayout />}>
          <Route path={ROUTES.LANDING} element={<PageTransition><Landing /></PageTransition>} />
        </Route>

        {/* Guest-only */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<PageTransition><Login /></PageTransition>} />
            <Route path={ROUTES.REGISTER} element={<PageTransition><Register /></PageTransition>} />
          </Route>
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProfileLayout />}>
            <Route path={ROUTES.PROFILE} element={<PageTransition><Profile /></PageTransition>} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<PageTransition><Home /></PageTransition>} />
            <Route path={ROUTES.EXPLORE} element={<PageTransition><Explore /></PageTransition>} />
            <Route path={ROUTES.NOTIFICATIONS} element={<PageTransition><Notifications /></PageTransition>} />
            <Route path={ROUTES.SAVED} element={<PageTransition><Saved /></PageTransition>} />
            <Route path={ROUTES.POST_DETAIL} element={<PageTransition><PostDetail /></PageTransition>} />
          </Route>

          <Route element={<SettingsLayout />}>
            <Route path={ROUTES.SETTINGS} element={<Navigate to={ROUTES.SETTINGS_ACCOUNT} replace />} />
            <Route path={ROUTES.SETTINGS_ACCOUNT} element={<PageTransition><Account /></PageTransition>} />
            <Route path={ROUTES.SETTINGS_PRIVACY} element={<PageTransition><Privacy /></PageTransition>} />
            <Route path={ROUTES.SETTINGS_NOTIFICATIONS} element={<PageTransition><NotificationSettings /></PageTransition>} />
            <Route path={ROUTES.SETTINGS_APPEARANCE} element={<PageTransition><Appearance /></PageTransition>} />
            <Route path={ROUTES.SETTINGS_SECURITY} element={<PageTransition><Security /></PageTransition>} />
          </Route>

          <Route element={<MessagesLayout />}>
            <Route path={ROUTES.MESSAGES} element={<PageTransition><Messages /></PageTransition>} />
            <Route path="/messages/:conversationId" element={<PageTransition><Thread /></PageTransition>} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}