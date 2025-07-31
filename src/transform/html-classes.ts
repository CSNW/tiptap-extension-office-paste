export function transformMsoHtmlClasses(doc: Document) {
  doc.querySelectorAll<HTMLParagraphElement>('p[class*="MsoNormal"]').forEach((node) => {
    node.classList.remove("MsoNormal");
  });
}
