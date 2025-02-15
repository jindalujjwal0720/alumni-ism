import { cn } from '@/utils/tw';
import { Menu, X } from 'lucide-react';
import React from 'react';

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-background flex flex-col h-screen w-[100dvw] overflow-hidden',
      className,
    )}
    {...props}
  />
));
PageLayout.displayName = 'PageLayout';

const PageBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full flex-1 flex overflow-hidden', className)}
    {...props}
  />
));
PageBody.displayName = 'PageBody';

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full flex items-center justify-between border-b-2 border-muted',
      className,
    )}
    {...props}
  />
));
PageHeader.displayName = 'PageHeader';

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-auto bg-background', className)}
    {...props}
  />
));
PageContent.displayName = 'PageContent';

const PageSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsible?: boolean;
    position?: 'left' | 'right';
  }
>(({ className, collapsible, position = 'left', children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div
      ref={ref}
      className={cn(
        'w-72 h-full bg-background border-muted transition-width overflow-hidden flex flex-col z-10',
        position === 'left' ? 'border-r-2' : 'border-l-2',
        className,
        !isOpen && 'w-12',
      )}
      {...props}
    >
      {collapsible && (
        <div className="w-full relative">
          {isOpen ? (
            <span
              onClick={() => setIsOpen(false)}
              className={cn(
                'absolute top-0.5 rounded-full p-2 hover:stroke-primary hover:bg-muted cursor-pointer z-20 right-1',
              )}
            >
              <X size={20} className="text-muted-foreground" />
            </span>
          ) : (
            <span
              onClick={() => setIsOpen(true)}
              className={cn(
                'absolute top-0.5 rounded-full p-2 hover:stroke-primary hover:bg-muted cursor-pointe z-20 right-1',
              )}
            >
              <Menu size={20} className="text-muted-foreground" />
            </span>
          )}
        </div>
      )}
      {isOpen && (
        <div className="w-full flex-1 overflow-hidden">{children}</div>
      )}
    </div>
  );
});
PageSidebar.displayName = 'PageSidebar';

export { PageLayout, PageBody, PageHeader, PageContent, PageSidebar };
