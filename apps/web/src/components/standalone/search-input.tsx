import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/utils/tw';

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search
        size={16}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={ref}
        placeholder="Search"
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
