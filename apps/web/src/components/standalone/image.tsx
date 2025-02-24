import React from 'react';

const Image = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => {
  const [error, setError] = React.useState(false);

  const handleError = React.useCallback(() => {
    console.error('Image failed to load:', props.src);
    setError(true);
  }, [props.src]);

  if (error) {
    return null;
  }

  return (
    <img {...props} ref={ref} className={className} onError={handleError} />
  );
});
Image.displayName = 'Image';

export { Image };
