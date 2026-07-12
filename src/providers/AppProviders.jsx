import QueryProvider from './QueryProvider';
import ThemeProvider from '@/contexts/ThemeContext';
import AuthProvider from '@/contexts/AuthContext';
import ToastProvider from './ToastProvider';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}