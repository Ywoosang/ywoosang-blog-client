import { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// Step 1. Import prismjs
import Prism from 'prismjs';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-docker.js';
import 'prismjs/components/prism-xml-doc.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-markup.js';

export const toastEditorInstance = (
  divId: HTMLElement,
  height?: string,
  initialValue?: string,
): Editor => {
  const editor = new Editor({
    el: divId,
    // 기본 에디터 모드를 마크다운으로 설정
    initialEditType: 'markdown',
    // 마크다운모드만 사용하기 위해 wizwig 전환 비활성화
    hideModeSwitch: true,
    language: 'ko-KR',
    // 세로로 나눠서 마크다운 결과 확인
    previewStyle: 'vertical',
    // 에디터 초기값 설정
    initialValue,
    // 에이터 생성시 자동 focus
    autofocus: true,
    // 높이 설정
    height: height || '100vh',
    // 플러그인 목록
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
  });
  return editor;
};
