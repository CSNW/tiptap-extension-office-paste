import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 120,
  quoteProps: "consistent",
  trailingComma: "es5",
  sortPackageJson: false,
  ignorePatterns: [],
  overrides: [
    {
      files: ["*.jsonc"],
      options: { trailingComma: "none" },
    },
  ],
});
