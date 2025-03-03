import React, { useEffect, useRef, useState } from 'react';
import { Show } from './show';
import { cn } from '@/utils/tw';

const ClipText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number;
    more?: boolean;
    containerClassName?: string;
  }
>(
  (
    { children, className, containerClassName, lines = 3, more, ...props },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClipped, setIsClipped] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
      if (textRef.current) {
        const { clientHeight, scrollHeight } = textRef.current;
        setIsClipped(scrollHeight > clientHeight);
      }
    }, [children, lines]);

    return (
      <div ref={ref} className={cn(containerClassName)}>
        <div
          ref={textRef}
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: isExpanded ? 'unset' : lines,
          }}
          className={cn(className)}
          {...props}
        >
          {children}
        </div>
        <Show when={more && isClipped && !isExpanded}>
          <span
            role="button"
            title="Read more"
            className={cn(className, 'text-primary font-medium')}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            Read more
          </span>
        </Show>
        <Show when={more && isExpanded}>
          <span
            role="button"
            title="Read less"
            className={cn(className, 'text-primary font-medium')}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          >
            Read less
          </span>
        </Show>
      </div>
    );
  },
);
ClipText.displayName = 'ClipText';

export { ClipText };
