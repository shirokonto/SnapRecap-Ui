export const parseTimestamp = (timestampStr: string): number => {
  const normalized = timestampStr.replace(',', '.');
  const parts = normalized.split(':');
  if (parts.length !== 3) return 0;
  const hours = parseFloat(parts[0]);
  const minutes = parseFloat(parts[1]);
  const seconds = parseFloat(parts[2]);
  return hours * 3600 + minutes * 60 + seconds;
};
