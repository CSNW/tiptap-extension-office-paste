import { unwrapNode } from "../utils";

export function transformRemoveLineNumberWrapper(doc: Document) {
  const lineNumbers = doc.querySelectorAll<HTMLElement>(`[class*="MsoLineNumber"]`);
  lineNumbers.forEach((node) => {
    unwrapNode(node);
  });
}
