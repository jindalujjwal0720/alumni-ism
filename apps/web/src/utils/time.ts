export const convertDurationToReadable = (
  durationInSeconds: number,
): string => {
  const seconds = Math.floor(durationInSeconds);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  if (minutes > 0) return `${minutes} minutes`;
  return `${seconds} seconds`;
};

export const convertDateTimeToReadable = (dateTime: string | Date): string => {
  const date = new Date(dateTime);
  return Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export const convertDateToReadable = (date: string | Date): string => {
  try {
    const dateObj = new Date(date);
    return Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  } catch (_) {
    return '';
  }
};
