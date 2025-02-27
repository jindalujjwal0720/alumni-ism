import React, { useEffect, useRef, useState } from 'react';
import { Show } from './show';

const ClipText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    lines?: number;
    more?: boolean;
  }
>(({ children, lines = 3, more, ...props }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClipped, setIsClipped] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      setIsClipped(scrollHeight > clientHeight);
    }
  }, [children, lines]);

  return (
    <p ref={ref} {...props}>
      <span
        ref={textRef}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: isExpanded ? 'unset' : lines,
        }}
      >
        {children}
      </span>
      <Show when={more && isClipped && !isExpanded}>
        <span
          role="button"
          title="Read more"
          className="text-primary font-medium"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
        >
          Read more
        </span>
      </Show>
    </p>
  );
});
ClipText.displayName = 'ClipText';

export { ClipText };
