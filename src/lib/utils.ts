/**
 * Utility functions for the AI Notes Hub application
 */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function validateNoteData(data: {
  title?: string;
  summary?: string;
  content?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!data.summary || data.summary.trim().length === 0) {
    errors.push("Summary is required");
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (data.title && data.title.length > 200) {
    errors.push("Title must be less than 200 characters");
  }

  if (data.summary && data.summary.length > 500) {
    errors.push("Summary must be less than 500 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
