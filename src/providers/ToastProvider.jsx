import { Toaster } from 'react-hot-toast';

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '0.625rem',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: 'var(--color-success)', secondary: 'var(--color-bg-surface)' } },
          error: { iconTheme: { primary: 'var(--color-error)', secondary: 'var(--color-bg-surface)' } },
          duration: 3500,
        }}
      />
    </>
  );
}