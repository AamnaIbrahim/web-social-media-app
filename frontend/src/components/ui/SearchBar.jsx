import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar({ placeholder = 'Search', onSearch, className }) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 350);

  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced]);

  return (
    <div className={`flex items-center gap-2 bg-bg-subtle rounded-full px-4 py-2 ${className ?? ''}`}>
      <Search size={16} className="text-text-tertiary shrink-0" strokeWidth={1.75} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none w-full"
      />
      {value && (
        <button onClick={() => setValue('')} aria-label="Clear search">
          <X size={14} className="text-text-tertiary" />
        </button>
      )}
    </div>
  );
}