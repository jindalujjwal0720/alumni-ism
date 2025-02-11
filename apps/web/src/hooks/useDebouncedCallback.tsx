import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  cb: T,
  delay: number,
) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>): void => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );
};
