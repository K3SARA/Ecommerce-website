import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names.
 *
 * It uses clsx to handle conditional class names and tailwind-merge to remove
 * conflicting Tailwind CSS classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
