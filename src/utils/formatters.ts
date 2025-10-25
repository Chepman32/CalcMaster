export const formatNumberWithSeparators = (num: string, useSeparators: boolean = true): string => {
  if (!useSeparators) return num;

  const parts = num.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else if (diffInHours < 168) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};
