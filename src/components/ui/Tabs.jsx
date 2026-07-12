import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'relative px-4 py-3 text-sm font-medium transition-colors duration-150',
            active === tab.value ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          {tab.label}
          {active === tab.value && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}