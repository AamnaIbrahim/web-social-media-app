import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';

const sizeMap = {
  sm: { box: 'w-6 h-6', text: 'text-base', letter: 'text-xs' },
  md: { box: 'w-8 h-8', text: 'text-lg', letter: 'text-sm' },
  lg: { box: 'w-10 h-10', text: 'text-xl', letter: 'text-base' },
};

function Mark({ size, inverse }) {
  return (
    <span
      className={cn(
        'rounded-full bg-accent shrink-0 flex items-center justify-center font-bold',
        sizeMap[size].box,
        sizeMap[size].letter,
        inverse ? 'text-accent' : 'text-text-inverse'
      )}
      style={inverse ? { backgroundColor: 'white' } : undefined}
    >
      E
    </span>
  );
}

export default function Logo({ size = 'md', withText = true, inverse = false, interactive = true, className }) {
  const content = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Mark size={size} inverse={inverse} />
      {withText && (
        <span className={cn('font-bold', sizeMap[size].text, inverse ? 'text-text-inverse' : 'text-text-primary')}>
          echo
        </span>
      )}
    </span>
  );

  if (!interactive) {
    return content;
  }

  return (
    <Link to={ROUTES.LANDING} className="inline-flex">
      {content}
    </Link>
  );
}