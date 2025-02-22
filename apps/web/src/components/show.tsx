import { PropsWithChildren } from 'react';

// This component is used to conditionally render children based on a condition
export const Show = ({
  children,
  when,
}: PropsWithChildren<{
  when: unknown;
}>) => {
  return !when ? null : <>{children}</>;
};
