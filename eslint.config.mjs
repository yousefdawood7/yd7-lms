import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/generated/**",
      "src/components/ui/**",
      "src/components/sidebar/**",
    ],
  },
];

export default eslintConfig;
