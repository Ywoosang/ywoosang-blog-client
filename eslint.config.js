module.exports = {
    root: true,  // 이 설정 파일이 프로젝트의 루트에 있음을 ESLint에 알림
    env: {
      node: true,  // Node.js에서 실행되는 코드임을 명시
      browser: true,  // 브라우저 환경에서도 사용됨
    },
    extends: [
      'eslint:recommended',  // ESLint의 추천 규칙 적용
      'plugin:vue/vue3-recommended',  // Vue 3에 대한 권장 설정
      '@vue/typescript/recommended',  // TypeScript와 관련된 권장 설정,
      'plugin:prettier/recommended'  // 이 줄 추가
    ],
    parserOptions: {
      ecmaVersion: 2020  // 최신 ECMAScript 문법 지원
    },
    overrides: [
      {
        files: ['*.js', '*.vue', '*.ts'],  // 적용할 파일 확장자 목록
        rules: {
            'vue/html-indent': ['error', 2, { // 'error' 대신 'warn'도 가능
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': []
              }],
          '@typescript-eslint/no-explicit-any': 'off',
        }
      }
    ]
  };
  