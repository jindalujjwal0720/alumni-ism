import React from 'react';

export const useIsStandalone = () => {
  const [isStandalone, setIsStandalone] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia('(display-mode: standalone)');
    const onChange = () => {
      setIsStandalone(mql.matches);
    };
    mql.addEventListener('change', onChange);
    setIsStandalone(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isStandalone;
};
