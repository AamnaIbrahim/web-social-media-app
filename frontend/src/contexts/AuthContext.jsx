import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loginRequest, registerRequest, verifyOtpRequest, resendOtpRequest, fetchCurrentUser, logoutRequest } from '@/api/authApi';
import { tokenStorage } from '@/services/storageService';
import { useQueryClient } from '@tanstack/react-query';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until session check resolves
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchCurrentUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setIsAuthenticated(true);
      })
      .catch(() => {
        tokenStorage.clear();
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user: loggedInUser } = await loginRequest(credentials);
    tokenStorage.set(token);
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  }, []);

  const register = useCallback(async (formData) => {
    const { email } = await registerRequest(formData);
    return email;
  }, []);

  const verifyEmail = useCallback(async ({ email, code }) => {
    return verifyOtpRequest({ email, code });
  }, []);

  const resendOtp = useCallback((email) => resendOtpRequest(email), []);

  const logout = useCallback(async () => {
    await logoutRequest();
    tokenStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, register, logout, setUser, verifyEmail, resendOtp }),
    [user, isAuthenticated, isLoading, login, register, logout, verifyEmail, resendOtp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}