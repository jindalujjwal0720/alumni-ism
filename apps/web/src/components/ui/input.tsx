import * as React from 'react';

import { cn } from '@/utils/tw';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'standard' | 'standalone';
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'standalone' &&
            'h-min focus-visible:ring-0 border-0 bg-transparent shadow-none placeholder:italic text-sm p-0 rounded-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
