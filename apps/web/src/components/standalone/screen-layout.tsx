import { cn } from '@/utils/tw';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { Show } from '../show';
import { useStandaloneNavigation } from './navigation';
import { useLocation } from 'react-router-dom';
import { Image } from './image';
import useNetworkStatus from '@/hooks/useNetworkStatus';

const ScreenLayoutContext = React.createContext<{
  title?: string;
  setTitle: (title: string) => void;
} | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useScreenLayout = () => {
  const context = React.useContext(ScreenLayoutContext);
  if (!context) {
    throw new Error('useScreenLayout must be used within a ScreenLayout');
  }
  return context;
};

const isPathActive = (path: string, currentPath: string) => {
  if (path === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(path);
};

const ScreenLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const { isOnline } = useNetworkStatus();

  const contextValue = React.useMemo(() => ({ title, setTitle }), [title]);

  return (
    <ScreenLayoutContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(
          'h-screen w-screen flex flex-col items-center justify-center overflow-hidden',
          className,
        )}
        {...props}
      >
        <Show when={!isOnline}>
          <div className="w-screen py-1 bg-yellow-500 text-xs tracking-wide text-center">
            You are offline, some features may not work properly
          </div>
        </Show>
        {children}
      </div>
    </ScreenLayoutContext.Provider>
  );
});
ScreenLayout.displayName = 'ScreenLayout';

const ScreenTitleBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    back?: boolean;
    title?: string;
    size?: 'standard' | 'large';
    actions?: React.ReactNode;
    logo?: boolean;
  }
>(
  (
    {
      className,
      title,
      size = 'standard',
      back = true,
      logo = false,
      actions,
      children,
      ...props
    },
    ref,
  ) => {
    const { goBackTitle, canGoBack, goBack } = useStandaloneNavigation();
    const { setTitle } = useScreenLayout();
    const logoPosition =
      (canGoBack && back) || size === 'standard' ? 'inside' : 'outside';

    React.useEffect(() => {
      if (title !== undefined) {
        setTitle(title);
      }
    }, [title, setTitle]);

    return (
      <div
        ref={ref}
        className={cn(
          'w-full overflow-hidden flex flex-col bg-card shadow-sm',

          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex flex-col gap-2 relative p-2',
            size === 'standard' && 'h-14',
            // size === 'large' && 'h-20',
          )}
        >
          <div className="flex-1 flex items-center justify-between">
            <Show when={back && canGoBack}>
              <Button
                variant="link"
                className="p-0 h-max hover:no-underline hover:bg-muted/10 text-sm flex items-center"
                onClick={() => goBack('/')}
              >
                <ChevronLeft size={24} />
                <span>{goBackTitle || 'Back'}</span>
              </Button>
            </Show>
            <Show when={title !== undefined && size === 'standard'}>
              <h1
                className={cn(
                  'flex-1 text-center text-lg font-medium',
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                )}
              >
                {title}
              </h1>
            </Show>
            <Show when={actions !== undefined || logo}>
              <div className="w-full flex items-center justify-end gap-3">
                {actions}

                <Show when={logo && logoPosition === 'inside'}>
                  <Image
                    src="/iit-ism-logo.png"
                    alt="logo"
                    className="h-7 mr-1"
                  />
                </Show>
              </div>
            </Show>
          </div>
          <Show when={title !== undefined && size === 'large'}>
            <div className="flex-1 flex justify-between pl-2">
              <h1 className="text-3xl font-semibold text-start">{title}</h1>
              <Show when={logo && logoPosition === 'outside'}>
                <Image
                  src="/iit-ism-logo.png"
                  alt="logo"
                  className="h-7 mr-1"
                />
              </Show>
            </div>
          </Show>
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
      className={cn('flex-1 w-full overflow-hidden relative', className)}
      {...props}
    >
      <div className="h-full overflow-y-auto overflow-hidden">{children}</div>
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
        'w-full flex items-center justify-between bg-card h-16 border-t border-border z-10',
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
    /** The base path to be used for the initial navigate */
    base?: string;
    icon?:
      | React.ReactNode
      | ((props: { selected: boolean }) => React.ReactNode);
  }
>(({ className, title, base: basePath, path, icon, ...props }, ref) => {
  const location = useLocation();
  const { navigate } = useStandaloneNavigation();

  const handleNavigate = () => {
    if (isPathActive(path, location.pathname)) {
      return;
    }

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
        isPathActive(basePath ?? path, location.pathname)
          ? 'text-primary fill-primary'
          : 'text-primary/60',
      )}
      onClick={handleNavigate}
      {...props}
    >
      {typeof icon === 'function'
        ? icon({ selected: isPathActive(path, location.pathname) })
        : icon}
      <Show when={title !== undefined}>
        <span className="text-xs font-medium">{title}</span>
      </Show>
    </div>
  );
});

const ScreenTopNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('w-full z-10', className)} {...props}>
      <div className="pb-0.5 flex items-center justify-between w-full overflow-x-auto no-scrollbar">
        {children}
      </div>
    </div>
  );
});
ScreenTopNav.displayName = 'ScreenTopNav';

const ScreenTopNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    path: string;
  }
>(({ className, title, path, ...props }, ref) => {
  const location = useLocation();
  const { navigate } = useStandaloneNavigation();

  const handleNavigate = () => {
    if (isPathActive(path, location.pathname)) {
      return;
    }

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
      role="button"
      title={title}
      ref={ref}
      className={cn(
        'flex-1 shrink-0 min-w-max flex items-center justify-center border-b-2 border-transparent px-5 py-3',
        isPathActive(path, location.pathname)
          ? 'text-primary border-primary'
          : 'text-muted-foreground',
      )}
      onClick={handleNavigate}
      {...props}
    >
      <Show when={title !== undefined}>
        <span
          className={cn(
            'text-sm',
            location.pathname === path
              ? 'text-primary font-medium'
              : 'text-muted-foreground',
          )}
        >
          {title}
        </span>
      </Show>
    </div>
  );
});
ScreenTopNavItem.displayName = 'ScreenTopNavItem';

const ScreenFloatingButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {}
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn('absolute bottom-4 right-4 z-10 shadow-lg', className)}
      {...props}
    >
      {children}
    </Button>
  );
});
ScreenFloatingButton.displayName = 'ScreenFloatingButton';

export {
  ScreenLayout,
  ScreenTitleBar,
  ScreenContent,
  ScreenBottomNav,
  ScreenBottomNavItem,
  ScreenTopNav,
  ScreenTopNavItem,
  ScreenFloatingButton,
};
