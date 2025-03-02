import { cn } from '@/utils/tw';
import React from 'react';

const Chip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'inline-flex items-center px-2 py-1 text-sm text-muted-foreground bg-muted border border-border rounded-md',
        className,
      )}
    >
      {children}
    </div>
  );
});
Chip.displayName = 'Chip';

export { Chip };
