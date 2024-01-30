<template>
  <div class="viewer-wrapper">
    <div class="post-header">
      <h1>{{ post.title }}</h1>
      <div class="post-header-meta">
        <div class="date-wrapper">
          <span class="created-date"
            >작성일: {{ formatDate(post.createdAt) }}</span
          >
          <span class="updated-date" v-if="post.createdAt !== post.updatedAt"
            >마지막 수정: {{ formatDate(post.updatedAt) }}</span
          >
        </div>
        <div class="tag-wrapper">
          <ul class="tag-list">
            <li class="tag"
              v-for="(tag, index) in post.tags"
              :key="index"
            >
              <router-link :to="'/tag/' + tag.id">{{ tag.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="post-content">
      <div id="viewer" style="font-size: 16px"></div>
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
import { formatDate } from "@/utils";

export default defineComponent({
  props: ["post"],
  data() {
    return {
      viewer: null as null | Viewer,
    };
  },
  async mounted() {
    console.log(this.post);
    this.viewer = new Viewer({
      el: document.querySelector("#viewer") as HTMLElement,
      initialValue: this.post.content,
      plugins: [[codeSyntaxHighlight, {}]],
    });
  },
  methods: {
    formatDate,
  },
});
</script>

<style scoped>

ul.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin-bottom:0;
}
.tag-list .tag {
  border: 1px solid #ddd;
  background: #ffffff;
  padding: 4px 5px;
  border-radius: 8px;
  margin-right: 3px;
  margin: 2px 3px 2px 0;
}
.tag a {
  padding: 2px 3px;
}

.post-header {
  margin: 0 0 2rem 0;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #ddd;
}

.post-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
}

.created-date {
  color: rgb(99, 99, 99);
}
</style>

 