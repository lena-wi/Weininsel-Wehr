import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
      react: react,
    },
    files: ["src/**/*.js", "src/**/*.jsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "@stylistic/indent": ["error", 2],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
