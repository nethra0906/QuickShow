const isoTimeFormat = (timeValue) => {
  if (!timeValue) return '';

  if (typeof timeValue === 'string' && (timeValue.includes('AM') || timeValue.includes('PM'))) {
    return timeValue;
  }

  const date = new Date(timeValue);
  if (isNaN(date.getTime())) {
    return timeValue; 
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date);
};

export default isoTimeFormat;