import React, { useEffect, useRef, useCallback } from 'react';

export const useAutoSaveForm = (
  formRef: React.MutableRefObject<HTMLFormElement | null>,
  interval = 5000,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true }),
        );
      }
    }, interval);
  }, [formRef, interval]);

  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;

    formElement.addEventListener('input', handleInputChange);

    return () => {
      formElement.removeEventListener('input', handleInputChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formRef, handleInputChange]);
};
