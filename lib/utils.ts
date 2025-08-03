import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitialsForAvatars = (fullName?: string | null): string => {
  // Handle undefined, null, or empty string cases
  if (!fullName || typeof fullName !== 'string') {
    return 'N/A'; // N/A fallback
  }

  const nameParts = fullName
    .trim()
    .split(' ')
    .filter(part => part.length > 0);

  // If no valid name parts, return N/A
  if (nameParts.length === 0) {
    return 'N/A';
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // If only one name part, use first two characters
  if (nameParts.length === 1) {
    return firstName.slice(0, 2).toUpperCase();
  }

  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
};
