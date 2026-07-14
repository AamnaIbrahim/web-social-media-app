import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loginRequest, registerRequest, fetchCurrentUser, logoutRequest } from '@/api/authApi';
import { tokenStorage } from '@/services/storageService';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until session check resolves
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    const { token, user: newUser } = await registerRequest(formData);
    tokenStorage.set(token);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    tokenStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, register, logout, setUser }),
    [user, isAuthenticated, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}