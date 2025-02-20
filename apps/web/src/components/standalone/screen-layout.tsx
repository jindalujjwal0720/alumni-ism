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
        'h-dvh w-dvw flex flex-col items-center justify-center bg-background overflow-hidden',
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
    actions?: React.ReactNode;
  }
>(
  (
    {
      className,
      title,
      variant = 'standard',
      back = true,
      actions,
      children,
      ...props
    },
    ref,
  ) => {
    const { goBackTitle, canGoBack, goBack } = useNavigation();

    return (
      <div
        ref={ref}
        className={cn(
          'w-full p-4 overflow-hidden flex flex-col',
          variant === 'standard' && 'min-h-14 shadow-sm',
          variant === 'large' && 'min-h-20',
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
                <span>{goBackTitle || 'Back'}</span>
              </Button>
            </Show>
          </div>
          <Show when={title !== undefined}>
            <h1
              className={cn(
                'flex-1 text-center text-lg font-medium',
                variant === 'large' && 'text-3xl font-semibold text-start',
              )}
            >
              {title}
            </h1>
          </Show>
          <div>{actions}</div>
        </div>
        <div className="w-full overflow-x-hidden">{children}</div>
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
      <div className="h-full overflow-y-auto">{children}</div>
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
        'w-full flex items-center justify-between bg-background h-16 border-t border-border z-10',
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

    navigate(path, '', {
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
        'flex-1 flex flex-col gap-1 items-center justify-center',
        location.pathname === path ? 'text-primary' : 'text-muted-foreground',
      )}
      onClick={handleNavigate}
      {...props}
    >
      {icon}
      <Show when={title !== undefined}>
        <span className="text-xs font-medium">{title}</span>
      </Show>
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
