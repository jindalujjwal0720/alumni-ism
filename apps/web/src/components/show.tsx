import { PropsWithChildren } from 'react';

// This component is used to conditionally render children based on a condition
export const Show = ({
  children,
  when,
}: PropsWithChildren<{
  when: boolean;
}>) => {
  return when ? <>{children}</> : null;
};
