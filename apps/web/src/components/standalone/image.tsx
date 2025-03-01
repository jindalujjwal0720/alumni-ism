import React from 'react';

const Image = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }
>(({ className, fallback, src, ...props }, ref) => {
  const [error, setError] = React.useState(false);

  const handleError = React.useCallback(() => {
    console.error('Image failed to load:', src);
    setError(true);
  }, [src]);

  if ((error && fallback) || !src) {
    return <Image {...props} ref={ref} className={className} src={fallback} />;
  } else if (error) {
    return null;
  }

  return (
    <img
      src={src}
      {...props}
      ref={ref}
      className={className}
      onError={handleError}
    />
  );
});
Image.displayName = 'Image';

export { Image };
