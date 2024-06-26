module.exports = {
  root: true,
  env: {
    browser: true, // 브라우저 환경에서 실행
    node: true, // 노드 환경에서 실행
  },
  parser: 'vue-eslint-parser', // Vue.js 코드를 분석할 때 사용할 파서 지정
  parserOptions: {
    ecmaVersion: 'latest', // 최신 ECMAScript 버전 사용
    parser: '@typescript-eslint/parser', // TypeScript 코드를 파싱하는 데 사용할 파서 지정
    sourceType: 'module', // ECMAScript 모듈 형식으로 코드 작성
  },
  plugins: ['@typescript-eslint', 'vue'],
  extends: [
    'eslint:recommended', // ESLint에서 권장 규칙 (eslint)
    'plugin:vue/recommended', // Vue.js 권장 규칙 (eslint-plugin-vue)
    'plugin:@typescript-eslint/recommended', // TypeScript ESLint 규칙 (@typescript-eslint/eslint-plugin)
    'plugin:prettier/recommended', // ESLint, Prettier 충돌방지 (eslint-config-prettier, eslint-plugin-prettier)
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'on',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        arrowSpacing: ['error', { before: true, after: true }],
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
  },
};
