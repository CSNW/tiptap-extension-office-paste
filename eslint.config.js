// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "eslint-plugin-json";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: ["**/dist/", "**/package-lock.json"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.[jt]s"],
    languageOptions: { ecmaVersion: 2023 },
    rules: {
      "no-implicit-globals": "error",
      "no-lonely-if": "error",
      "new-cap": [
        "error",
        {
          newIsCap: true,
          capIsNew: false,
          properties: false,
        },
      ],
      "no-extend-native": "error",
      "no-use-before-define": ["error", { functions: false }],
      "linebreak-style": ["error", "windows"],
      "no-var": "error",
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,[mc]js,json}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "next",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ...json.configs.recommended,
    ignores: ["**/tsconfig.json"],
  },
  {
    ...json.configs["recommended-with-comments"],
    files: ["**/tsconfig.json"],
  },
  {
    files: ["esling.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "no-implicit-globals": "off",
    },
  },
  prettier
);
