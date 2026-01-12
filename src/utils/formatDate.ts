/**
 * Format date in a consistent, human-readable format
 * Follows the pattern used in PostLayout.astro
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric",
  });
}