import { parseStyleAttribute } from "../utils.js";

export function transformMsoStyles(doc: Document) {
  doc.querySelectorAll(CSS.escape("o:p")).forEach((node) => {
    node.remove();
  });

  doc.querySelectorAll<HTMLElement>('[style*="mso-"]').forEach((node) => {
    const styles = parseStyleAttribute(node);
    const newStyles: string[] = [];
    for (const prop of Object.keys(styles)) {
      if (prop && !prop.startsWith("mso-")) {
        newStyles.push(`${prop}: ${styles[prop]}`);
      }
    }
    node.setAttribute("style", newStyles.join(";"));
  });

  doc.querySelectorAll<HTMLElement>('[style*="color: black"]').forEach((node) => {
    node.style.removeProperty("color");
  });
}
