import type { OxlintConfig } from "oxlint";

const config: OxlintConfig = {
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "no-multi-spaces": "warn",
    "no-trailing-spaces": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
  },
};

export default config;