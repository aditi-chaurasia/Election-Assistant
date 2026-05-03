/**
 * Utility function to format dates
 */
export const formatDate = (date: string | Date, format= 'DD/MM/YYYY') => {
const d = typeof date === 'string' ? new Date(date) : date;

if (isNaN(d.getTime())) {
  throw new Error('Invalid date provided');
}  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return format.replace('DD', day).replace('MM', month).replace('YYYY', String(year));
};

/**
 * Calculate days until a date
 */
export const daysUntil = (date: string | Date): number => {
  const today = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const timeDifference = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string to specified length
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
