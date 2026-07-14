import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import Tooltip from './Tooltip';
import Dropdown, { DropdownItem } from './Dropdown';
import { cn } from '@/utils/cn';

function ActionButton({ icon: Icon, label, count, active, activeColor, onClick }) {
  return (
    <Tooltip content={label}>
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary transition-colors duration-150 text-sm',
          active && activeColor
        )}
      >
        <Icon size={19} strokeWidth={1.75} fill={active ? 'currentColor' : 'none'} />
        {count !== undefined && <span>{count}</span>}
      </button>
    </Tooltip>
  );
}

export default function PostActions({ liked, saved, likeCount, commentCount, onLike, onComment, onSave, onShare, onReport }) {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center gap-5">
        <ActionButton icon={Heart} label="Like" count={likeCount} active={liked} activeColor="text-error" onClick={onLike} />
        <ActionButton icon={MessageCircle} label="Comment" count={commentCount} onClick={onComment} />
        <ActionButton icon={Share2} label="Share" onClick={onShare} />
      </div>
      <div className="flex items-center gap-3">
        <ActionButton icon={Bookmark} label="Save" active={saved} activeColor="text-accent" onClick={onSave} />
        <Dropdown
          trigger={
            <button className="btn-ghost !p-1.5 rounded-full" aria-label="More options">
              <MoreHorizontal size={18} strokeWidth={1.75} />
            </button>
          }
        >
          <DropdownItem onClick={onReport} danger>Report post</DropdownItem>
          <DropdownItem>Copy link</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}