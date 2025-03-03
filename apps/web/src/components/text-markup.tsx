import { useMemo, ReactNode } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Link } from 'react-router-dom';

export type TextProcessor = {
  pattern: RegExp;
  component: (match: string, ...groups: string[]) => ReactNode;
};

interface TextMarkupProps {
  children: string;
  processors?: TextProcessor[];
}

// Common URL regex pattern (matches most valid URLs)
const URL_REGEX = /(https?:\/\/[^\s/$.?#].[^\s]*)/gi;

// eslint-disable-next-line react-refresh/only-export-components
export const linkProcessor: TextProcessor = {
  pattern: URL_REGEX,
  component: (originalUrl) => {
    const sanitized = sanitizeUrl(originalUrl);
    return sanitized === 'about:blank' ? (
      originalUrl
    ) : (
      <Link
        to={sanitized}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
      >
        {sanitized}
      </Link>
    );
  },
};

const processText = (
  text: string,
  processors: TextProcessor[],
): ReactNode[] => {
  let elements: ReactNode[] = [text];

  processors.forEach((processor) => {
    const newElements: ReactNode[] = [];

    elements.forEach((element) => {
      if (typeof element !== 'string') {
        newElements.push(element);
        return;
      }

      let lastIndex = 0;
      const matches = element.matchAll(processor.pattern);

      for (const match of matches) {
        const [fullMatch, ...groups] = match;
        const matchStart = match.index!;
        const matchEnd = matchStart + fullMatch.length;

        // Add text before match
        if (matchStart > lastIndex) {
          newElements.push(element.slice(lastIndex, matchStart));
        }

        // Add processed component
        newElements.push(processor.component(fullMatch, ...groups));

        lastIndex = matchEnd;
      }

      // Add remaining text after last match
      if (lastIndex < element.length) {
        newElements.push(element.slice(lastIndex));
      }
    });

    elements = newElements;
  });

  return elements;
};

export const TextMarkup = ({
  children,
  processors = [linkProcessor],
}: TextMarkupProps) => {
  const processedLines = useMemo(() => {
    return children
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line, index) => (
        <p key={`line-${index}`}>{processText(line, processors)}</p>
      ));
  }, [children, processors]);

  return <>{processedLines}</>;
};
