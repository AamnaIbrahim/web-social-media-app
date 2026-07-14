import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from './Portal';

export default function Tooltip({ children, content, side = 'top' }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const showTooltip = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    const top = side === 'top' ? rect.top - 8 : rect.bottom + 8;
    setCoords({ top, left: rect.left + rect.width / 2 });
    setOpen(true);
  };

  return (
    <span
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={() => setOpen(false)}
      onFocus={showTooltip}
      onBlur={() => setOpen(false)}
      className="inline-flex"
    >
      {children}
      <Portal>
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, y: side === 'top' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                transform: `translate(-50%, ${side === 'top' ? '-100%' : '0'})`,
              }}
              className="z-[100] px-2.5 py-1 rounded-sm text-xs font-medium bg-text-primary text-bg-base whitespace-nowrap pointer-events-none"
            >
              {content}
            </motion.span>
          )}
        </AnimatePresence>
      </Portal>
    </span>
  );
}