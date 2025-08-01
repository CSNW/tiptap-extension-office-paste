// It is expected that the string passed to parseRomanNumber has already been verified to contain
// only these characters, so Record<string, number | undefined> is not necessary.
const romanValues: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

/**
 * Parses a roman number string into a number
 *
 * Example: IV -> 4, LX -> 60, ...
 */
export function parseRomanNumber(str: string) {
  str = str.toUpperCase();

  let i = str.length;
  let lastVal = 0;
  let value = 0;
  while (i--) {
    const romanValue = romanValues[str.charAt(i)];
    if (romanValue >= lastVal) {
      value += romanValue;
    } else {
      value -= romanValue;
    }
    lastVal = romanValue;
  }

  return value;
}

/**
 * Parses a list item index of letters
 *
 * Example: a -> 1, ab -> 28, ...
 */
export function parseLetterNumber(str: string) {
  const alphaVal = (s: string) => s.toLowerCase().charCodeAt(0) - 97 + 1;
  let value = 0;
  let i = str.length;
  while (i--) {
    const factor = Math.pow(26, str.length - i - 1);
    value += alphaVal(str.charAt(i)) * factor;
  }
  return value;
}

/**
 * Removes the surrounding tag of a node
 */
export function unwrapNode(node: Node) {
  const parent = node.parentNode;
  while (node.firstChild) {
    parent?.insertBefore(node.firstChild, node);
  }
  parent?.removeChild(node);
}

/**
 * Parses arbitrary style properties of an element into an object
 */
export function parseStyleAttribute(el: Element) {
  const styleRaw = el.getAttribute("style") || "";
  const styles = styleRaw
    .split(";")
    .map((line) => {
      const parts = line.split(":");
      return parts.length === 2 ? (parts.map((v) => v.trim()) as [string, string]) : undefined;
    })
    .filter((s) => !!s);
  return Object.fromEntries<string | undefined>(styles);
}
