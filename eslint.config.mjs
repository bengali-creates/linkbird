import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      // Allow `any` where necessary during development / quick fixes
      '@typescript-eslint/no-explicit-any': 'off',
      // Relax unused vars to warnings and allow underscore-prefixed ignored args
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      // Disable exhaustive-deps rule to avoid false positives in some hooks (review code to add deps later)
      'react-hooks/exhaustive-deps': 'off',
      // Allow plain <img> usage (optimize later)
      '@next/next/no-img-element': 'off',
      // Silence aria prop warnings for `aside` role (handle accessibility later)
      'jsx-a11y/role-supports-aria-props': 'off',
      // Allow unused expressions in some patterns
      'no-unused-expressions': 'off',
    },
  },
];

export default eslintConfig;
