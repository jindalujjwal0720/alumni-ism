import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/utils/tw';

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {}
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={ref}
        placeholder="Search"
        type="search"
        {...props}
        className={cn(
          'w-full shadow-none focus-visible:ring-0 border-none bg-muted pl-10',
          className,
        )}
      />
    </div>
  );
});
SearchInput.displayName = 'SearchInput';

export { SearchInput };
