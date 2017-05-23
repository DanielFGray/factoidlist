module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'no-console': 0,
    'react/jsx-boolean-value': 0,
    'array-bracket-spacing': [ 'error', 'always' ],
    'no-nested-ternary': 0,
    'react/jsx-filename-extension': [ 'error', { 'extensions': [ '.js', '.jsx' ] } ],
    'react/forbid-prop-types': 'warn',
    'react/require-default-props': 'warn',
    'jsx-a11y/anchor-has-content': 0,
    'space-unary-ops': [
      2, {
        words: true,
        nonwords: false,
        overrides: {
          '!': true,
        },
      },
    ],
  },
};
