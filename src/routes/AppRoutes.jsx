import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Navigate } from 'react-router-dom';

import SettingsLayout from '@/layouts/SettingsLayout';
import Account from '@/pages/Settings/Account';
import Privacy from '@/pages/Settings/Privacy';
import NotificationSettings from '@/pages/Settings/NotificationSettings';
import Appearance from '@/pages/Settings/Appearance';
import Security from '@/pages/Settings/Security';

import Landing from '@/pages/Landing/Landing';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Profile from '@/pages/Profile/Profile';
import LandingLayout from '@/layouts/LandingLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import Saved from '@/pages/Saved/Saved';
import Notifications from '@/pages/Notifications/Notifications';
import Explore from '@/pages/Explore/Explore';
import Messages from '@/pages/Messages/Messages';
import Thread from '@/pages/Messages/Thread';
import MessagesLayout from '@/layouts/MessagesLayout';

import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<LandingLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />
      </Route>

      {/* Guest-only */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProfileLayout />}>
          <Route path={ROUTES.PROFILE} element={<Profile />} />
       </Route>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />          
          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.SAVED} element={<Saved />} />          
        </Route>
        <Route element={<SettingsLayout />}>
          <Route path={ROUTES.SETTINGS} element={<Navigate to={ROUTES.SETTINGS_ACCOUNT} replace />} />
            <Route path={ROUTES.SETTINGS_ACCOUNT} element={<Account />} />
            <Route path={ROUTES.SETTINGS_PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.SETTINGS_NOTIFICATIONS} element={<NotificationSettings />} />
            <Route path={ROUTES.SETTINGS_APPEARANCE} element={<Appearance />} />
            <Route path={ROUTES.SETTINGS_SECURITY} element={<Security />} />
          </Route>
          <Route element={<MessagesLayout />}>
            <Route path={ROUTES.MESSAGES} element={<Messages />} />
            <Route path="/messages/:conversationId" element={<Thread />} />
          </Route>
      </Route> 

      {/* 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}