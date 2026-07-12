import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';

export default function UserCard({ user, isFollowing, onToggleFollow }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile/${user.username}`)}
      className="flex items-center gap-3 py-2 cursor-pointer"
    >
      <Avatar src={user.avatarUrl} name={user.name} size="md" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
        <p className="text-xs text-text-tertiary truncate">@{user.username}</p>
      </div>
      <Button
        size="sm"
        variant={isFollowing ? 'secondary' : 'primary'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFollow(user.id);
        }}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
}