import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Portal from './Portal';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export default function Modal({ open, onClose, title, children, footer }) {
  const containerRef = useFocusTrap(open, onClose);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-[90]"
            />
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-lg bg-bg-surface rounded-lg shadow-lg border border-border"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 id="modal-title" className="text-lg font-semibold text-text-primary">{title}</h2>
                <button onClick={onClose} className="btn-ghost !p-1.5 rounded-full" aria-label="Close">
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>
              <div className="px-6 py-5">{children}</div>
              {footer && <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">{footer}</div>}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}