'use strict'

module.exports = {
  root: true,
  env: {
    browser: true,
    node:true,
    es6:true
  },
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },


  extends: ['eslint:recommended', 'plugin:prettier/recommended','plugin:react/recommended'],

  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'all'
      }
    ]
  }
}
