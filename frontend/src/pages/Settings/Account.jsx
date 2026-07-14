import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfile } from '@/features/settings/hooks/useUpdateProfile';
import SettingsSection from '@/components/common/SettingsSection';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Camera } from 'lucide-react';
import { useState } from 'react';

export default function Account() {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const [avatarFile, setAvatarFile] = useState(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { fullName: user?.name, bio: user?.bio ?? '' },
  });

  const bioValue = watch('bio');
  const avatarPreview = avatarFile ? URL.createObjectURL(avatarFile) : user?.avatarUrl;

  const onSubmit = (formData) => {
    updateProfileMutation.mutate({
      name: formData.fullName,
      bio: formData.bio,
      avatarUrl: avatarPreview, // real backend: Multer/Cloudinary upload happens here first
    });
  };

  return (
    <SettingsSection title="Account" description="Update your profile information.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar src={avatarPreview} name={user?.name} size="lg" />
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 bg-accent text-text-inverse rounded-full p-1.5 cursor-pointer hover:bg-accent-hover transition-colors"
            >
              <Camera size={14} strokeWidth={2} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Profile picture</p>
            <p className="text-xs text-text-tertiary">Square works best. Under 2MB.</p>
          </div>
        </div>

        <Input label="Full name" {...register('fullName')} />
        <Input label="Username" value={`@${user?.username}`} disabled />
        <Textarea
          label="Bio"
          maxLength={160}
          value={bioValue}
          {...register('bio')}
        />

        <div className="flex justify-end">
          <Button type="submit" isLoading={updateProfileMutation.isPending}>
            Save changes
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}