import { X } from 'lucide-react';

export default function ImagePreview({ files, onRemove }) {
  if (!files?.length) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
      {files.map((file, i) => {
        const url = typeof file === 'string' ? file : URL.createObjectURL(file);
        return (
          <div key={i} className="relative aspect-square rounded-md overflow-hidden group">
            <img src={url} alt={`preview-${i}`} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              aria-label="Remove image"
              className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}