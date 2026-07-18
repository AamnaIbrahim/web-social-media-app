import { usePreferences, useUpdatePreferences } from '@/features/settings/hooks/usePreferences';
import SettingsSection from '@/components/common/SettingsSection';
import Switch from '@/components/ui/Switch';
import { SkeletonText } from '@/components/ui/Skeleton';

export default function NotificationSettings() {
  const { data: preferences, isLoading } = usePreferences();
  const updateMutation = useUpdatePreferences();

  const handleToggle = (key, value) => {
    updateMutation.mutate({ notifications: { ...preferences.notifications, [key]: value } });
  };

  if (isLoading) {
    return (
      <SettingsSection title="Notifications">
        <div className="p-5"><SkeletonText lines={4} /></div>
      </SettingsSection>
    );
  }

  const items = [
    { key: 'likes', label: 'Likes', description: 'When someone likes your post.' },
    { key: 'comments', label: 'Comments', description: 'When someone comments on your post.' },
    { key: 'follows', label: 'New followers', description: 'When someone follows you.' },
  ];

  return (
    <SettingsSection title="Notifications" description="Choose what you get notified about.">
      <div className="px-5">
        {items.map(({ key, label, description }) => (
          <Switch
            key={key}
            label={label}
            description={description}
            checked={preferences.notifications[key]}
            onChange={(v) => handleToggle(key, v)}
          />
        ))}
      </div>
    </SettingsSection>
  );
}