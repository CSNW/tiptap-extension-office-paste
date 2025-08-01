import "./style.css";
import { Editor, Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import OfficePaste from "@csnw/tiptap-extension-office-paste";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import format from "html-format";

const editor = new Editor({
  element: document.querySelector(".editor")!,
  extensions: [
    Color,
    OfficePaste,
    TextStyle,
    TableRow,
    TableCell,
    TableHeader,
    Table,
    StarterKit,
    Extension.create({
      priority: 201,
      onUpdate: () => {
        document.querySelector(`.output-html`)!.textContent = format(editor.getHTML());
      },
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: new PluginKey("get-paste-paste"),
            props: {
              transformPastedHTML(html: string): string {
                document.querySelector(`.input-html`)!.textContent = format(html);
                return html;
              },
            },
          }),
        ];
      },
    }),
  ],
  content: "<p>Hello World!</p>",
});
