import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import {
  Link as ReactLink,
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface NavigationContextType {
  canGoBack: boolean;
  goBackTitle: string;
  goBack: (fallback: string) => void;

  navigate: (to: To, from?: string, props?: NavigateOptions) => void;
}

const NavigationContext = React.createContext<NavigationContextType | null>(
  null,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useStandaloneNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useStandaloneNavigation must be used within a NavigationProvider',
    );
  }
  return context;
};

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const goBackTitle = useMemo<string>(() => {
    return location.state?._previous?.title || '';
  }, [location.state?._previous?.title]);
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
    (to: To, from?: string, props?: NavigateOptions) => {
      reactNavigate(to, {
        ...props,
        state: {
          _previous: {
            title: from,
            pathname: location.pathname,
          },
          ...props?.state,
        },
      });
    },
    [location.pathname, reactNavigate],
  );

  const value = useMemo(
    () => ({
      canGoBack,
      goBackTitle,
      goBack,
      navigate,
    }),
    [canGoBack, goBack, goBackTitle, navigate],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const Link = ({
  to,
  from,
  ...props
}: {
  to: To;
  from?: string;
} & React.ComponentProps<typeof ReactLink>) => {
  const { navigate } = useStandaloneNavigation();
  return (
    <ReactLink
      to={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to, from);
      }}
      {...props}
    />
  );
};
