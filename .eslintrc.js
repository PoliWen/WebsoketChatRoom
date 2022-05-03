module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/no-multiple-template-root': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-alert': 0
  }
}
