import { BrowserRouter } from 'react-router-dom';
import AppProviders from '@/providers/AppProviders';
import AppRoutes from '@/routes/AppRoutes';
import { useSocketListeners } from '@/hooks/useSocketListeners';

function SocketBridge() {
  useSocketListeners();
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <SocketBridge />
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}