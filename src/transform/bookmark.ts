import { parseStyleAttribute, unwrapNode } from "../utils.js";

export function transformRemoveBookmarks(doc: Document) {
  const bookmarks = doc.querySelectorAll<HTMLElement>(`[style*="mso-bookmark:"]`);
  bookmarks.forEach((node) => {
    const bookmark = parseStyleAttribute(node)[`mso-bookmark`];
    const bookmarkLink = doc.querySelector<HTMLAnchorElement>(`a[name="${bookmark}"]`);
    if (bookmarkLink) {
      unwrapNode(bookmarkLink);
    }
    unwrapNode(node);
  });
}
