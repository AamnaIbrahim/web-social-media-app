import { Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';

export default function PostGridItem({ post, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-square rounded-md overflow-hidden group bg-bg-subtle"
    >
      {post.images.length > 0 ? (
        <img src={post.images[0]} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <p className="text-xs text-text-secondary text-center line-clamp-4">{post.text}</p>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-150 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
        <span className="flex items-center gap-1.5 text-white text-sm font-medium">
          <Heart size={16} fill="white" strokeWidth={0} /> {post.likeCount}
        </span>
        <span className="flex items-center gap-1.5 text-white text-sm font-medium">
          <MessageCircle size={16} fill="white" strokeWidth={0} /> {post.commentCount}
        </span>
      </div>

      {post.images.length > 1 && (
        <ImageIcon size={14} className="absolute top-2 right-2 text-white drop-shadow" strokeWidth={2} />
      )}
    </button>
  );
}