<template>
  <div class="wrapper">
    <ul class="comment-list">
      <li class="comment-box" v-for="comment in comments" :key="comment.id">
        <comment-default :comment="comment"/>
        <div class="reply-area">
            <ul class="reply-list">
                <li class="reply-box" v-for="reply in comment.replies" :key="reply.id">
                  <comment-reply :reply="reply"/>
                </li>
            </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommentDefault from './CommentItem.vue';
import CommentReply from './ReplyItem.vue';

export default defineComponent({
  props: ['comments'],
  components: {
    CommentDefault,
    CommentReply
  }
});
</script>

<style scoped>

.comment-list {
  padding: 0;
}
</style>