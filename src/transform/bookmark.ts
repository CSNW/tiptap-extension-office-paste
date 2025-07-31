import { parseStyleAttribute, unwrapNode } from "../utils.js";

export function transformRemoveBookmarks(doc: Document) {
  doc.querySelectorAll<HTMLElement>('[style*="mso-bookmark:"]').forEach((node) => {
    const bookmark = parseStyleAttribute(node)["mso-bookmark"];
    if (!bookmark) return;

    const bookmarkLink = doc.querySelector<HTMLAnchorElement>(`a[name="${bookmark}"]`);
    if (bookmarkLink) {
      unwrapNode(bookmarkLink);
    }
    unwrapNode(node);
  });
}
