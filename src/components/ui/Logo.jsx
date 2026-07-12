import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';

const sizeMap = { sm: 'w-6 h-6 text-base', md: 'w-8 h-8 text-lg', lg: 'w-10 h-10 text-xl' };

export default function Logo({ size = 'md', withText = true, inverse = false, className }) {
  return (
    <Link to={ROUTES.LANDING} className={cn('inline-flex items-center gap-2', className)}>
      <span className={cn('rounded-full bg-accent shrink-0', sizeMap[size].split(' ')[0], sizeMap[size].split(' ')[1])} />
      {withText && (
        <span className={cn('font-bold', sizeMap[size].split(' ')[2], inverse ? 'text-text-inverse' : 'text-text-primary')}>
          hue
        </span>
      )}
    </Link>
  );
}