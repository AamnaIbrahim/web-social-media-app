import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import Landing from '@/pages/Landing/Landing';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Profile from '@/pages/Profile/Profile';
import LandingLayout from '@/layouts/LandingLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import Saved from '@/pages/Saved/Saved';
import Notifications from '@/pages/Notifications/Notifications';


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
          <Route path={ROUTES.EXPLORE} element={null} />
          <Route path={ROUTES.PROFILE} element={null} />
          <Route path={ROUTES.MESSAGES} element={null} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.SAVED} element={<Saved />} />          
          <Route path={ROUTES.SETTINGS} element={null} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}