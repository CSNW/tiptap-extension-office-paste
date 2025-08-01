import { parseStyleAttribute, unwrapNode } from "../utils.js";

export function transformRemoveBookmarks(doc: Document) {
  doc.querySelectorAll<HTMLElement>('[style*="mso-bookmark:"]').forEach((node) => {
    const bookmark = parseStyleAttribute(node)["mso-bookmark"];
    if (!bookmark) return;

    doc.querySelectorAll<HTMLAnchorElement>(`a[name="${CSS.escape(bookmark)}"]`).forEach((anchor) => {
      unwrapNode(anchor);
    });
    unwrapNode(node);
  });

  doc.querySelectorAll<HTMLAnchorElement>("a[name]").forEach((node) => {
    const name = node.getAttribute("name");
    if (!name || node.children.length) return;

    doc.querySelectorAll<HTMLAnchorElement>(`a[href="#${CSS.escape(name)}"]`).forEach((anchor) => {
      unwrapNode(anchor);
    });
    node.remove();
  });
}
