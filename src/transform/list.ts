import { parseLetterNumber, parseRomanNumber, parseStyleAttribute } from "../utils.js";

export function transformLists(doc: Document) {
  let listStack: HTMLElement[] = [];
  let currentListId: string | undefined;
  doc.querySelectorAll<HTMLParagraphElement>('p[style*="mso-list:"]').forEach((el) => {
    const msoListStyle = parseStyleAttribute(el)["mso-list"];
    if (!msoListStyle) return;

    const [msoListId, msoListLevel] = parseMsoListAttribute(msoListStyle);

    // Check for start of a new list
    if (currentListId !== msoListId && (hasNonListItemSibling(el) || msoListLevel === 1)) {
      currentListId = msoListId;
      listStack = [];
    }

    while (msoListLevel > listStack.length) {
      const newList = createListElement(el);
      if (listStack.length > 0) {
        listStack[listStack.length - 1].appendChild(newList);
      } else {
        el.before(newList);
      }
      listStack.push(newList);
    }

    while (msoListLevel < listStack.length) {
      listStack.pop();
    }

    // Remove list item numbers and create li
    listStack[listStack.length - 1].appendChild(getListItemFromParagraph(el));
    el.remove();
  });
}

function hasNonListItemSibling(el: HTMLElement) {
  return !el.previousElementSibling || !["OL", "UL"].includes(el.previousElementSibling.nodeName);
}

function getListItemFromParagraph(el: HTMLElement) {
  const li = document.createElement("li");

  let skipNodes = false;
  for (const node of el.childNodes) {
    if (node.nodeType === Node.COMMENT_NODE && node.textContent === "[if !supportLists]") {
      skipNodes = true;
      continue;
    }
    if (!skipNodes) {
      li.appendChild(node.cloneNode(true));
    }
    if (node.nodeType === Node.COMMENT_NODE && node.textContent === "[endif]") {
      skipNodes = false;
    }
  }

  return li;
}

// Parses 'mso-list' style attribute
function parseMsoListAttribute(attr: string) {
  const msoListInfos = attr.split(" ");
  const msoListId = msoListInfos.find((e) => /^l\d/.test(e)) ?? "";
  const msoListLevel = +(msoListInfos.find((e) => /^level\d+$/.test(e))?.substring(5) || 1);

  return [msoListId, msoListLevel] as const;
}

function getListPrefix(el: HTMLElement) {
  for (const node of el.childNodes) {
    if (node.nodeType === Node.COMMENT_NODE && node.textContent === "[if !supportLists]") {
      return node.nextSibling?.textContent?.trim() ?? "";
    }
  }

  return "";
}

function createListElement(el: HTMLElement) {
  const listInfo = getListInfo(getListPrefix(el));
  const list = document.createElement(listInfo.tag);
  if (listInfo.type) {
    list.setAttribute("type", listInfo.type);
  }
  if (listInfo.start > 1) {
    list.setAttribute("start", listInfo.start.toString());
  }
  return list;
}

const listOrderRegex = {
  number: /^[0-9]+$/,
  romanLower: /^(?=[mdclxvi])m*(c[md]|d?c*)(x[cl]|l?x*)(i[xv]|v?i*)$/,
  romanUpper: /^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/,
  letterLower: /^[a-z]+$/,
  letterUpper: /^[A-Z]+$/,
};

function getListInfo(prefix: string) {
  let tag: "ul" | "ol" = "ul";
  let type: string | null = null;
  let start = 1;
  let matches: RegExpMatchArray | null;

  if (prefix.endsWith(".") || prefix.endsWith(")")) {
    prefix = prefix.substring(0, prefix.length - 1).trim();
    if ((matches = prefix.match(listOrderRegex.number))) {
      tag = "ol";
      start = +matches[0];
    } else if ((matches = prefix.match(listOrderRegex.romanLower))) {
      tag = "ol";
      type = "i";
      start = +parseRomanNumber(matches[0]);
    } else if ((matches = prefix.match(listOrderRegex.romanUpper))) {
      tag = "ol";
      type = "I";
      start = +parseRomanNumber(matches[0]);
    } else if ((matches = prefix.match(listOrderRegex.letterLower))) {
      tag = "ol";
      type = "a";
      start = +parseLetterNumber(matches[0]);
    } else if ((matches = prefix.match(listOrderRegex.letterUpper))) {
      tag = "ol";
      type = "A";
      start = +parseLetterNumber(matches[0]);
    }
  }

  return {
    tag,
    start,
    type,
  };
}
