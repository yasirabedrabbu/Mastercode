import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Project rule: every source file stays within 111 lines so components stay
    // modular. Split a file into smaller modules rather than raising this limit.
    rules: {
      "max-lines": ["error", { max: 111, skipBlankLines: false, skipComments: false }],
    },
  },
]);

export default eslintConfig;
