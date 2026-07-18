import { usePreferences, useUpdatePreferences } from '@/features/settings/hooks/usePreferences';
import SettingsSection from '@/components/common/SettingsSection';
import Switch from '@/components/ui/Switch';
import { SkeletonText } from '@/components/ui/Skeleton';

export default function Privacy() {
  const { data: preferences, isLoading } = usePreferences();
  const updateMutation = useUpdatePreferences();

  const handleToggle = (key, value) => {
    updateMutation.mutate({ privacy: { ...preferences.privacy, [key]: value } });
  };

  if (isLoading) {
    return (
      <SettingsSection title="Privacy">
        <div className="p-5"><SkeletonText lines={3} /></div>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection title="Privacy" description="Control who can see your activity.">
      <div className="px-5">
        <Switch
          label="Private account"
          description="Only approved followers can see your posts."
          checked={preferences.privacy.privateAccount}
          onChange={(v) => handleToggle('privateAccount', v)}
        />
        <Switch
          label="Show activity status"
          description="Let others see when you're active."
          checked={preferences.privacy.showActivityStatus}
          onChange={(v) => handleToggle('showActivityStatus', v)}
        />
      </div>
    </SettingsSection>
  );
}