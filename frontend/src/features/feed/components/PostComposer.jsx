import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import Textarea from '@/components/ui/Textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import ImagePreview from '@/components/ui/ImagePreview';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useCreatePost } from '../hooks/useCreatePost';

const MAX_CHARS = 280;
const MAX_IMAGES = 4;

export default function PostComposer({ open, onClose }) {
  const { user } = useAuth();
  const createPostMutation = useCreatePost();

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [showUploadZone, setShowUploadZone] = useState(false);

  const canSubmit = (text.trim().length > 0 || images.length > 0) && text.length <= MAX_CHARS;

  const handleAddImages = (files) => {
    setImages((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
    setShowUploadZone(false);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetAndClose = () => {
    setText('');
    setImages([]);
    setShowUploadZone(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await createPostMutation.mutateAsync({ text: text.trim(), images, userId: user.id });
    resetAndClose();
  };

  return (
    <Modal open={open} onClose={resetAndClose} title="Create post">
      <div className="flex gap-3">
        <Avatar src={user?.avatarUrl} name={user?.name} size="md" />

        <div className="flex-1 min-w-0">
          <Textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_CHARS}
            rows={4}
            className="!border-0 !p-0 !shadow-none text-base focus:!shadow-none resize-none"
          />

          <ImagePreview files={images} onRemove={handleRemoveImage} />

          {showUploadZone && (
            <div className="mt-3">
              <ImageUpload onFilesAdded={handleAddImages} maxSizeMB={5} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <button
          onClick={() => setShowUploadZone((v) => !v)}
          disabled={images.length >= MAX_IMAGES}
          className="btn-ghost !p-2 rounded-full disabled:opacity-30"
          aria-label="Add images"
        >
          <ImageIcon size={20} strokeWidth={1.75} />
        </button>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          isLoading={createPostMutation.isPending}
        >
          Post
        </Button>
      </div>
    </Modal>
  );
}