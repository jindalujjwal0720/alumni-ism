import { cn } from '@/utils/tw';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { Show } from '../show';
import { useNavigation } from './navigation';
import { useLocation } from 'react-router-dom';

const ScreenLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'h-dvh w-screen flex flex-col items-center justify-center bg-background overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ScreenLayout.displayName = 'ScreenLayout';

const ScreenTitleBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    back?: boolean;
    title?: string;
    variant?: 'standard' | 'large';
  }
>(
  (
    { className, title, variant = 'standard', back = true, children, ...props },
    ref,
  ) => {
    const { canGoBack, goBack } = useNavigation();

    return (
      <div
        ref={ref}
        className={cn(
          'w-full p-4 overflow-hidden flex flex-col',
          variant === 'standard' && 'h-14 shadow-sm',
          variant === 'large' && 'h-24',
          className,
        )}
        {...props}
      >
        <div className="flex-1 flex items-center justify-between">
          <div>
            <Show when={back && canGoBack}>
              <Button
                variant="link"
                className="px-0 hover:no-underline hover:bg-muted/10"
                onClick={() => goBack('/')}
              >
                <ChevronLeft size={24} />
                <span>Back</span>
              </Button>
            </Show>
          </div>
          <Show when={variant === 'standard' && title !== undefined}>
            <h1 className="text-center text-lg font-medium">{title}</h1>
          </Show>
          <div>{children}</div>
        </div>
        <Show when={variant === 'large' && title !== undefined}>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </Show>
      </div>
    );
  },
);
ScreenTitleBar.displayName = 'ScreenTitleBar';

const ScreenContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 w-full overflow-hidden', className)}
      {...props}
    >
      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
});

const ScreenBottomNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'w-full flex items-center justify-between bg-background h-14 border-t border-border z-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ScreenBottomNav.displayName = 'ScreenBottomNav';

const ScreenBottomNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    path: string;
    icon?: React.ReactNode;
  }
>(({ className, title, path, icon, ...props }, ref) => {
  const location = useLocation();
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    if (location.pathname === path) return;

    navigate(path, {
      replace: true,
      state: {
        // to disable the back button when changing tabs
        _previous: undefined,
      },
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex-1 flex flex-col items-center justify-center',
        location.pathname === path ? 'text-primary' : 'text-muted-foreground',
      )}
      onClick={handleNavigate}
      {...props}
    >
      {icon}
      <span className="text-xs">{title}</span>
    </div>
  );
});

export {
  ScreenLayout,
  ScreenTitleBar,
  ScreenContent,
  ScreenBottomNav,
  ScreenBottomNavItem,
};
