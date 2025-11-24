/* eslint-disable no-undef */
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('eslint-config-expo', 'plugin:prettier/recommended'),
  ...compat.extends('plugin:import/recommended', 'plugin:import/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'ios/**',
      'android/**',
      'coverage/**',
      '.maestro/**',
      '.rnstorybook/**',
      '.storybook/**',
      'jest.setup.js',
      'jest.config.js',
    ],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Prefer absolute imports using @ aliases over relative imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                'Please use absolute imports with @ aliases instead of relative parent imports.',
            },
          ],
        },
      ],
    },
  },
];
