module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "standard"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ],
    "space-before-function-paren": 0,
    "max-classes-per-file": [0, 0],
    "class-methods-use-this": [0, { exceptMethods: [] }],
    "react/jsx-boolean-value": [0, { never: [] }],
    "comma-dangle": [0, 0],
    "react/destructuring-assignment": [0, 0],
    "no-console": ["error", { allow: ["debug"] }]
  }
};
