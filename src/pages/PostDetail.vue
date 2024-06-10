<template>
  <main>
    <post-viewer :post="post" />
    <comment-write :post-id="post.id" />
    <comment-list :comments="comments" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import PostViewer from '@/components/posts/PostViewer.vue';
import CommentWrite from '@/components/comment/CommentWrite.vue';
import CommentList from '@/components/comment/CommentList.vue';

const store = useStore();

const post = computed(() => store.getters['post/getPost']);
const comments = computed(() => store.getters['comment/getComments']);
</script>
