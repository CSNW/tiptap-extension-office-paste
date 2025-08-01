import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { transformMsoStyles } from "./transform/style.js";
import { transformRemoveBookmarks } from "./transform/bookmark.js";
import { transformLists } from "./transform/list.js";
import { transformRemoveLineNumberWrapper } from "./transform/line-number.js";
import { transformMsoHtmlClasses } from "./transform/html-classes.js";

const OfficePastePlugin = new Plugin({
  key: new PluginKey("office-paste"),
  props: {
    transformPastedHTML(html) {
      if (typeof DOMParser === "undefined") {
        return html;
      }

      if (html.indexOf("microsoft-com") < 0 || html.indexOf("office") < 0) {
        return html;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      transformLists(doc);
      transformRemoveBookmarks(doc);
      transformMsoStyles(doc);
      transformMsoHtmlClasses(doc);
      transformRemoveLineNumberWrapper(doc);

      return doc.documentElement.outerHTML;
    },
  },
});

const OfficePaste = Extension.create({
  priority: 200,
  name: "office-paste",

  addProseMirrorPlugins() {
    return [OfficePastePlugin];
  },
});

export default OfficePaste;
