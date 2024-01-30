<template>
  <main>
    <post-viewer :post="getCurrentPost"/>
    <comment-write :postId="getCurrentPost.id"/>
    <comment-list :comments="getComments"/>
  </main>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import PostViewer from '@/components/posts/PostViewer.vue';
import CommentWrite from '@/components/comment/CommentWrite.vue'
import CommentList from '@/components/comment/CommentList.vue';
 

export default defineComponent({
  components: {
    PostViewer,
    CommentList,
    CommentWrite
  },
  computed: {
    ...mapGetters('post', ['getCurrentPost']),
    ...mapGetters('comment', ['getComments'])
  }
});
</script>