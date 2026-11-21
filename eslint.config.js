// Same rules as olaii-pass-vue, olaii-vouchers-vue and olaii-guestlist-vue-2 (.eslintrc.js),
// written as a flat config for ESLint 9+.
import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/**", "coverage/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  prettierRecommended,

  {
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "warn",
      "no-var": "warn",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "key",
            "parent",
            "functional",
            ["delimiters", "comments"],
            ["components", "directives", "filters"],
            "extends",
            "mixins",
            ["provide", "inject"],
            "ROUTER_GUARDS",
            "layout",
            "middleware",
            "validate",
            "scrollToTop",
            "transition",
            "loading",
            "inheritAttrs",
            "model",
            ["props", "propsData"],
            "emits",
            "setup",
            "asyncData",
            "data",
            "fetch",
            "head",
            "computed",
            "watch",
            "watchQuery",
            "LIFECYCLE_HOOKS",
            "methods",
            ["template", "render"],
            "renderError",
          ],
        },
      ],
    },
  },
];
