import { useTheme } from '@/hooks/useTheme';
import SettingsSection from '@/components/common/SettingsSection';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/utils/cn';

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
];

export default function Appearance() {
  const { theme, setTheme } = useTheme();

  return (
    <SettingsSection title="Appearance" description="Choose how hue looks on this device.">
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {options.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'flex flex-col items-center gap-2 p-5 rounded-lg border-2 transition-colors duration-150',
                theme === value ? 'border-accent bg-accent-subtle' : 'border-border hover:border-border-strong'
              )}
            >
              <Icon size={24} strokeWidth={1.75} className={theme === value ? 'text-accent' : 'text-text-secondary'} />
              <span className={cn('text-sm font-medium', theme === value ? 'text-accent' : 'text-text-primary')}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </SettingsSection>
  );
}