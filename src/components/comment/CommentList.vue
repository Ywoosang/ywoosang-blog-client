<template>
  <div class="wrapper">
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-box">
        <comment-item :comment="comment" />
        <div class="reply-area">
          <ul class="reply-list">
            <li v-for="reply in comment.replies" :key="reply.id" class="reply-box">
              <comment-reply :reply="reply" />
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CommentItem from './CommentItem.vue';
import CommentReply from './ReplyItem.vue';
import { PropType, onMounted } from 'vue';
import { Comment } from '@/types/interfaces';
import { useRoute } from 'vue-router';

const route = useRoute();

const { comments } = defineProps({
  comments: {
    type: Array as PropType<Comment[]>,
    default: () => []
  }
});

onMounted(() => {
  if (route.query.commentId) {
    const commentId = route.query.commentId;
    const comment = document.querySelector(`#comment${commentId}`);
    if (comment) {
      comment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
</script>

<style src="@/styles/comment/list.css" scoped></style>
