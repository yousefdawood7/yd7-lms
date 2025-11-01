import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Packages. `react` and `next` related packages come first.
            [
              "server-only",
              "client-only",
              "^react",
              "^next",
              "^@?\\w",
              "^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)",
              "^.+\\.s?css$",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },

  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
    "src/components/ui/**",
    "src/components/sidebar/**",
  ]),
];
export default defineConfig(eslintConfig);
