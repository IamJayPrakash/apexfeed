// Utility to strip HTML tags from a string (for search)
export function stripHtmlTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}
