module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'class-methods-use-this': ['error', { exceptMethods: [] }],
    'no-console': ['error', { allow: ['debug'] }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
}
