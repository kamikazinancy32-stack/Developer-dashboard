import js from '@eslint/js'
import globals from 'globals'

export default [
  // Never lint the build output
  { ignores: ['dist/'] },

  // ESLint's recommended rules (catch common bugs)
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // we use import / export
      globals: globals.browser, // allow document, window, etc.
    },
    rules: {
      'no-unused-vars': 'error',
      eqeqeq: 'warn',
    },
  },
]
