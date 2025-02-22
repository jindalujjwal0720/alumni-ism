import * as React from 'react';

import { cn } from '@/utils/tw';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    variant?: 'standard' | 'standalone';
  }
>(({ className, variant, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        variant === 'standalone' &&
          'h-min focus-visible:ring-0 border-0 bg-transparent shadow-none placeholder:italic text-sm p-0 resize-none rounded-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    variant?: 'standard' | 'standalone';
    minHeight?: number;
  }
>((props, forwardedRef) => {
  // Create mutable ref for internal use
  const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

  // Combine refs using callback ref pattern
  const setRefs = React.useCallback(
    (element: HTMLTextAreaElement | null) => {
      // Update internal ref
      internalRef.current = element;

      // Forward the ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    },
    [forwardedRef],
  );

  const adjustHeight = () => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustHeight();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    const emptyRegex = /^\s*$/;
    if (emptyRegex.test(e.target.value)) {
      e.target.value = '';
    }
    props.onInput?.(e);
  };

  return (
    <Textarea
      ref={setRefs}
      {...props}
      onInput={handleInput}
      style={{
        ...props.style,
        minHeight: props.minHeight ?? 60,
        overflow: 'hidden',
      }}
    />
  );
});
AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export { Textarea, AutoResizeTextarea };
