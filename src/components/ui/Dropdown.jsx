import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { cn } from '@/utils/cn';

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full mt-2 min-w-[180px] rounded-lg border border-border bg-bg-surface shadow-lg py-1.5 z-50',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            onClick={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({ icon, children, danger, ...props }) {
  return (
    <button
      className={cn(
        'w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left transition-colors duration-150',
        danger ? 'text-error hover:bg-error-subtle' : 'text-text-primary hover:bg-bg-subtle'
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}