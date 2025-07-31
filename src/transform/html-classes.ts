export function transformMsoHtmlClasses(doc: Document) {
  doc.querySelectorAll(`p[class*="MsoNormal"]`).forEach((node) => {
    node.classList.remove(`MsoNormal`);
  });
}
