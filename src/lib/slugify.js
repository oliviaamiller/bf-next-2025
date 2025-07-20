export function safeSlug(slug) {
  return slug.replace(/\s+/g, "-").toLowerCase();
}
