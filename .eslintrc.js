module.exports = {
  extends: [
    'eslint:recommended'
  ],

  env: {
    browser: true,
    es6: true,
    node: true
  },

  parserOptions: {
    //sourceType: 'module',
    ecmaFeatures: {
      //'experimentalObjectRestSpread': true,
    }
  },

  rules: {
    'brace-style': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-style': 'error',
    'eqeqeq': ['off', 'allow-null'],
    'guard-for-in': 'error',
    'indent': ['error', 4, { SwitchCase: 1, outerIIFEBody: 0 }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-bitwise': 'error',
    'no-console': 'warn',
    'no-floating-decimal': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-nested-ternary': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'off',
    'no-unused-vars': ['off', { argsIgnorePattern : '^_' }],
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-concat': 'error',
    'operator-linebreak': 'error',
    'padded-blocks': ['error', 'never'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 'error',
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'radix': 'error',
    'semi': ['error', 'always'],
    'strict': ['off', 'safe'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-unary-ops': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['off', 'inside'],
    'yoda': ['error', 'never', { exceptRange: true}]
  }
};
