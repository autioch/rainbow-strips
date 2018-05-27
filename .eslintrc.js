module.exports = {
  extends: 'qb',
  "parserOptions": {
    "ecmaVersion": 2017
  },
  rules: {
    'max-len': ['error', 140],
    'id-length': ['off'],
    'no-magic-numbers': ['off'],
    'no-multi-assign': ['off'],
    'line-comment-position': ['off'],
    'no-inline-comments': ['off'],
    'no-use-before-define': ['error', { "functions": false }]
  }
};
