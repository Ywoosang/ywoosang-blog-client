<template>
  <div class="wrapper">
    <div class="write">
      <textarea ref="commentTextarea" v-model="content" placeholder="댓글을 작성하세요" @input="adjustTextareaHeight" />
      <div class="btn-wrapper">
        <button class="create" @click="submitComment">댓글 작성</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { CreateCommentDto } from '@/types/dto';

const store = useStore();
const content = ref<string>('');
const commentTextarea = ref<HTMLTextAreaElement | null>(null);

const submitComment = async () => {
  const postId = store.getters['post/getPost'].id;
  const payload: CreateCommentDto = {
    content: content.value,
    postId
  };
  const commentId = await store.dispatch('comment/createComment', payload);
  content.value = '';
  const textarea = commentTextarea.value;
  if (textarea) {
    textarea.style.height = 'auto'; // 초기 높이로 설정
  }
  const createdComment = document.querySelector(`#comment${commentId}`);
  if (createdComment) {
    createdComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

const adjustTextareaHeight = () => {
  const textarea = commentTextarea.value;
  if (textarea) {
    textarea.style.height = 'auto'; // 초기 높이로 설정
    textarea.style.height = `${textarea.scrollHeight}px`; // 실제 높이로 조절
  }
};
</script>

<style src="@/styles/comment/write.css" scoped></style>
