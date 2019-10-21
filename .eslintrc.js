module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    // 'prettier',
    // 'plugin:prettier/recommended',
  ],
  // plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
    //   // https://prettier.io/docs/en/options.html
    //   {
    //     singleQuote: true,
    //     semi: true,
    //     useTabs: true,
    //     tabWidth: 2,
    //     trailingComma: 'all',
    //     printWidth: 80,
    //     bracketSpacing: true,
    //     arrowParens: 'avoid',
    //   },
    // ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 1,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
