import { parseStyleAttribute } from "../utils";

export function transformMsoStyles(doc: Document) {
  doc.querySelectorAll(CSS.escape("o:p")).forEach((node) => {
    node.remove();
  });

  doc.querySelectorAll(`[style*="mso-"]`).forEach((node) => {
    const styles = parseStyleAttribute(node);
    const newStyles: string[] = [];
    for (const prop of Object.keys(styles)) {
      if (prop && !prop.startsWith(`mso-`)) {
        newStyles.push(`${prop}: ${styles[prop]}`);
      }
    }
    node.setAttribute(`style`, newStyles.join(`;`));
  });

  doc.querySelectorAll(`[style*="color: black"]`).forEach((node) => {
    (node as HTMLElement).style.removeProperty(`color`);
  });
}
