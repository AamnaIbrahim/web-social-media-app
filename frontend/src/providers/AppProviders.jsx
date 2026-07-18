import QueryProvider from './QueryProvider';
import ThemeProvider from '@/contexts/ThemeContext';
import AuthProvider from '@/contexts/AuthContext';
import PresenceProvider from '@/contexts/PresenceContext';
import ToastProvider from './ToastProvider';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <PresenceProvider>
            <ToastProvider>{children}</ToastProvider>
          </PresenceProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}