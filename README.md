# Tiptap office paste extension

This extension fixes format of text copied from MS Office and pasted into the [Tiptap](https://tiptap.dev/) editor.

## Installing

```
npm i --save @csnw/tiptap-extension-office-paste
```

## Features

- Fixes lists
  - Converts mso lists into actual html lists
  - Corrects list levels
  - Parse list type and start
- Removes bookmark tags
- Removes `<o:p>` tags
- Converts `mso` styles
- Removes black text color style

## Usage

```javascript
import OfficePaste from "@csnw/tiptap-extension-office-paste";

const editor = Editor({
  extensions: [StarterKit, OfficePaste],
});
```

# License

The MIT License (MIT). Please see [License File](./LICENSE) for more information.
