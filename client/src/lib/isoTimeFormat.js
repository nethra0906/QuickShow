const isoTimeFormat = (timeValue) => {
  if (!timeValue) return '';

  // If the data is already a simple string like "08:00 AM", return it directly
  if (typeof timeValue === 'string' && (timeValue.includes('AM') || timeValue.includes('PM'))) {
    return timeValue;
  }

  // Fallback for ISO strings if you use them later
  const date = new Date(timeValue);
  if (isNaN(date.getTime())) {
    return timeValue; // Just return the raw value if all else fails
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date);
};

export default isoTimeFormat;