import { unwrapNode } from "../utils.js";

export function transformRemoveLineNumberWrapper(doc: Document) {
  doc.querySelectorAll<HTMLElement>('[class*="MsoLineNumber"]').forEach(unwrapNode);
}
