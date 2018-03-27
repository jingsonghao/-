// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 0
    , 'generator-star-spacing': 0
    , 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    , 'spaced-comment': 0
    , 'quotes': 0
    , 'indent': 0
    , 'space-before-function-paren': 0
    , 'key-spacing': 0
    , 'should be placed last': 0
    , 'comma-style': 0
    , 'consistent-spacing': 0
    , 'no-eval': 0
  }
}
