<template>
  <main>
    <post-viewer/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostViewer from '@/components/posts/PostViewer.vue';

export default defineComponent({
  components: {
    PostViewer
  }
});
</script>