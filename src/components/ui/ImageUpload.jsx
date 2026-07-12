import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function ImageUpload({ onFilesAdded, multiple = true, maxSizeMB = 5 }) {
  const onDrop = useCallback(
    (accepted) => onFilesAdded(accepted),
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { 'image/*': [] },
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-10 px-6 cursor-pointer transition-colors duration-150',
        isDragActive ? 'border-accent bg-accent-subtle' : 'border-border hover:border-border-strong bg-bg-subtle'
      )}
    >
      <input {...getInputProps()} />
      <ImagePlus size={28} strokeWidth={1.5} className="text-text-tertiary" />
      <p className="text-sm text-text-secondary">
        {isDragActive ? 'Drop images here' : 'Drag images here, or click to browse'}
      </p>
      <p className="text-xs text-text-tertiary">Up to {maxSizeMB}MB each</p>
    </div>
  );
}