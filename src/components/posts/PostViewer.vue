<template>
  <div class='viewer-wrapper'>
    <div class="post-header">
      <h1>{{ getCurrentPost.title }} </h1>
      <div class="post-header-meta">
        <div class="date-wrapper">
          <span class="created-date">작성일: {{ formatDate(getCurrentPost.createdAt) }}</span>
          <span class="updated-date"
            v-if="getCurrentPost.createdAt !== getCurrentPost.updatedAt"
            >마지막 수정: {{ formatDate(getCurrentPost.updatedAt) }}</span>
        </div>
      </div>
    </div>
    <div class="post-content">
      <div id="viewer" style="font-size:16px;">
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";  
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { formatDate } from '@/utils';

export default defineComponent({
  data() {
    return {
      viewer: null as null | Viewer,
    };
  },
  async mounted() {
    this.viewer = new Viewer({
      el: document.querySelector("#viewer") as HTMLElement,
      initialValue: this.getCurrentPost!.content,
      plugins: [[codeSyntaxHighlight, {}]],
    });
  },
  computed: {
    ...mapGetters('post', ['getCurrentPost'])
  },
  methods: {
    formatDate
  }
});
</script>

<style>
.toastui-editor-contents pre {
  border-radius: 10px !important;
}
.toastui-editor-contents p{
  font-size: 16px;
}

</style>

 