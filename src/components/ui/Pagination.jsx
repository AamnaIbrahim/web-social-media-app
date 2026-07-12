import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

function getPageList(current, total) {
  const delta = 1;
  const range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  if (range[0] > 1) range.unshift(range[0] === 2 ? 1 : '...', ...(range[0] === 2 ? [] : [1]));
  if (range.at(-1) < total) range.push(range.at(-1) === total - 1 ? total : '...', ...(range.at(-1) === total - 1 ? [] : [total]));
  return [...new Set(range)];
}

export default function Pagination({ page, totalPages, onChange }) {
  const pages = getPageList(page, totalPages);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="btn-ghost !p-2 rounded-md disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} strokeWidth={1.75} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-tertiary text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              'w-8 h-8 rounded-md text-sm font-medium transition-colors duration-150',
              p === page ? 'bg-accent text-text-inverse' : 'text-text-secondary hover:bg-bg-subtle'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="btn-ghost !p-2 rounded-md disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}