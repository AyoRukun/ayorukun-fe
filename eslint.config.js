import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      ecmaVersion: 2020,
    }
  },
  ...compat.extends("airbnb"),
  {
    rules: {
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-param-reassign': 'off',
      'import/extensions': 'off',
      'import/order': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'camelcase': 'off',
      'max-len': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off'
    }
  }
];
