<template>
  <q-page class="column" style="max-width: 800px">
    <q-card class="q-pa-md">
      <q-card-section class="text-center">
        <div class="text-h6 text-teal-8">Tech News</div>
        <h4 class="q-mt-md text-weight-bold">
          [TechNews] 유용한 개발 관련 아티클 및 영상 #25
        </h4>
        <div class="text-subtitle1 text-grey-6 q-mt-sm">
          맹냐니개발자 | 2024. 6. 21. 10:00
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
    <!-- 서버사이드에서 붙여주는 html 값 -->
    <div v-if="isSSR" style="color: transparent">{{ rawHtml }}</div>
    <!-- 클라이언트 사이드에서 viewer 적용 -->
    <div ref="viewer" class="col"></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const content = `# Hello World\n\nThis is a markdown viewer with code:\n\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\``;

// 서버사이드 렌더링 여부 체크
const isSSR = ref<boolean>(import.meta.env.SSR);

// 서버사이드 렌더링에서 초기 HTML을 설정
const rawHtml = import.meta.env.SSR ? (marked(content) as string) : '';

// Toast UI Viewer 설정
const viewer = ref<HTMLDivElement | null>(null);
const setupViewer = async () => {
  await import('prismjs/themes/prism.css');
  await import(
    '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
  );

  const { default: codeSyntaxHighlight } = await import(
    '@toast-ui/editor-plugin-code-syntax-highlight'
  );

  const { default: Prism } = await import('prismjs');

  const { Editor } = await import('@toast-ui/editor');
  await import('@toast-ui/editor/dist/toastui-editor.css');

  if (viewer.value) {
    viewer.value = Editor.factory({
      el: viewer.value,
      viewer: true,
      initialValue: content,
      plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    });
  }
};

onMounted(() => {
  // 클라이언트 사이드에서 viewer 적용
  if (!isSSR.value) {
    setupViewer();
  }
});
</script>

<style scoped>
* {
  border: 1px solid red;
}
</style>
