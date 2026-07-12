import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Portal from './Portal';
import { cn } from '@/utils/cn';

export default function Drawer({ open, onClose, title, children, side = 'right' }) {
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
              initial={{ x: side === 'right' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: side === 'right' ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className={cn(
                'fixed top-0 bottom-0 z-[100] w-full max-w-sm bg-bg-surface border-border flex flex-col',
                side === 'right' ? 'right-0 border-l' : 'left-0 border-r'
              )}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                <button onClick={onClose} className="btn-ghost !p-1.5 rounded-full" aria-label="Close">
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}