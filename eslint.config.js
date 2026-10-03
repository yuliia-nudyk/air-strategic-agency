import js from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]
