import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface NavigationContextType {
  canGoBack: boolean;
  goBack: (fallback: string) => void;
  navigate: (to: To, props?: NavigateOptions) => void;
}

const NavigationContext = React.createContext<NavigationContextType | null>(
  null,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

const viewTransition = (changeDOMCallback: () => void) => {
  if (!document.startViewTransition) {
    changeDOMCallback();
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => {
      changeDOMCallback();
    });
  });
};

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const canGoBack = useMemo(() => {
    return location.state?._previous;
  }, [location.state]);
  const reactNavigate = useNavigate();

  const goBack = useCallback(
    (fallback: string) => {
      if (location.state?._previous) {
        reactNavigate(-1);
      } else {
        reactNavigate(fallback, { replace: true });
      }
    },
    [location.state?._previous, reactNavigate],
  );

  const navigate = useCallback(
    (to: To, props?: NavigateOptions) => {
      viewTransition(() =>
        reactNavigate(to, {
          ...props,
          state: {
            _previous: {
              pathname: location.pathname,
            },
            ...props?.state,
          },
        }),
      );
    },
    [location.pathname, reactNavigate],
  );

  const value = useMemo(
    () => ({ canGoBack, goBack, navigate }),
    [canGoBack, goBack, navigate],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
