<template>
  <div class="wrapper">
    <div class="write">
      <textarea
        ref="commentTextarea"
        v-model="content"
        placeholder="답글을 작성하세요"
        @input="adjustTextareaHeight"
      ></textarea>
      <div class="btn-wrapper">
        <button v-if="editMode" class="submit" @click="submitReplay">
          수정
        </button>
        <button v-else class="submit" @click="submitReplay">답글 달기</button>
        <button class="close" @click="$emit('close')">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emits = defineEmits(['close']);
const props = defineProps({
  parentCommentId: {
    type: Number,
    default: null,
  },
  replyToId: {
    type: Number,
    default: null,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: null,
  },
  isComment: {
    type: Boolean,
    default: true,
  },
  initialValue: {
    type: String,
    default: '',
  },
});

let content: string = '';
const commentTextarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  content = props.initialValue;
  commentTextarea.value!.value = content; // 실제 내용 설정
  commentTextarea.value!.style.height = `${commentTextarea.value!.scrollHeight}px`; // 높이 설정
});

const submitReplay = async () => {
  const payload: any = {
    parentCommentId: props.parentCommentId,
    id: props.id,
    content: content,
    replyToId: props.replyToId,
  };
  if (!props.editMode) {
    const replyId = await store.dispatch('comment/createReply', payload);
    const createdReply = document.querySelector(`#comment${replyId}`);
    if (createdReply) {
      createdReply.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } else {
    if (props.isComment) {
      await store.dispatch('comment/updateComment', payload);
    } else {
      await store.dispatch('comment/updateReply', payload);
    }
  }
  content = '';
  commentTextarea.value!.style.height = 'auto'; // 초기 높이로 설정
  emits('close');
};

const adjustTextareaHeight = () => {
  commentTextarea.value!.style.height = 'auto'; // 초기 높이로 설정
  commentTextarea.value!.style.height = `${commentTextarea.value!.scrollHeight}px`; // 실제 높이로 조절
};
</script>

<style src="@/styles/comment/write.css" scoped></style>
