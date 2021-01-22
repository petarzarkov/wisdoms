module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  ignorePatterns: ['.eslintrc.js'], // ignore urself
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/indent": "error",
    "@typescript-eslint/member-delimiter-style": [
        "error",
        {
            "multiline": {
                "delimiter": "semi",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "semi",
                "requireLast": false
            }
        }
    ],
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/quotes": [
        "error",
        "double"
    ],
    "@typescript-eslint/semi": [
        "error",
        "always"
    ],
    "brace-style": [
        "error",
        "1tbs"
    ],
    "curly": [
        "error",
        "multi-line"
    ],
    "max-len": [
        "error",
        {
            "code": 180
        }
    ],
    "no-caller": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-eval": "error",
    "no-extra-semi": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-multiple-empty-lines": [
        "error",
        {
            "max": 1
        }
    ],
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-regex-spaces": "error",
    "no-restricted-syntax": [
        "error",
        "ForInStatement"
    ],
    "no-trailing-spaces": "error"
  },
};
