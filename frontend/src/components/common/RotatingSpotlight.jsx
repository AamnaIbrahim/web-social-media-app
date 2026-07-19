import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useSuggestedUsers } from '@/features/explore/hooks/useExplore';
import Avatar from '@/components/ui/Avatar';

const TIPS = [
  "Long-press a post's bookmark icon to save it for later.",
  'Your Saved shelf is private — only you can see what you bookmark.',
  'Switch between light and dark mode anytime from the top bar.',
  "Comments and likes notify the post's author in real time.",
  'You can message anyone directly from the compose icon in Messages.',
];

export default function RotatingSpotlight() {
  const { data: suggested } = useSuggestedUsers();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const userSlides = (suggested ?? []).slice(0, 3).map((u) => ({ type: 'user', data: u }));
    const tipSlides = TIPS.map((t) => ({ type: 'tip', data: t }));
    const combined = [];
    const maxLen = Math.max(userSlides.length, tipSlides.length);
    for (let i = 0; i < maxLen; i++) {
      if (userSlides[i]) combined.push(userSlides[i]);
      if (tipSlides[i]) combined.push(tipSlides[i]);
    }
    return combined;
  }, [suggested]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const current = slides[index % slides.length];

  return (
    <div className="card !p-4 min-h-[92px] flex items-center">
      {current.type === 'user' ? (
        <button
          onClick={() => navigate(`/profile/${current.data.username}`)}
          className="flex items-center gap-3 w-full text-left"
        >
          <Avatar src={current.data.avatarUrl} name={current.data.name} size="md" />
          <div className="min-w-0">
            <p className="text-xs text-text-tertiary mb-0.5">Spotlight</p>
            <p className="text-sm font-semibold text-text-primary truncate">{current.data.name}</p>
            <p className="text-xs text-text-tertiary truncate">@{current.data.username}</p>
          </div>
        </button>
      ) : (
        <div className="flex items-start gap-2.5">
          <Sparkles size={16} strokeWidth={1.75} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary">{current.data}</p>
        </div>
      )}
    </div>
  );
}