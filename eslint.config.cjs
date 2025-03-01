const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const prettier = require("eslint-config-prettier");
const browserGlobals = require("globals").browser;
const nodeGlobals = require("globals").node;
const preferArrow = require("eslint-plugin-prefer-arrow");

module.exports = [
  js.configs.recommended,
  {
    ignores: ["node_modules/*", "dist/*", "lib/*", "build/*", "docs/*"],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      "prefer-arrow": preferArrow,
    },
    rules: {
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      "import/order": [
        "error",
        { groups: ["builtin", "external", "internal"] },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      curly: ["error", "multi-or-nest"],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  prettier,
];
