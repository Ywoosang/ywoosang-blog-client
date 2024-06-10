<template>
  <div :id="`comment${comment.id}`" class="comment">
    <div class="header">
      <div class="avatar-wrapper">
        <img :src="comment.user.profileImage" />
      </div>
      <div class="content-wrapper">
        <router-link :to="'/profile/' + comment.user.userId" class="info">
          <h4>{{ comment.user.nickname }}</h4>
          <div class="date">
            {{ formatDate(comment.createdAt) }}
          </div>
        </router-link>
        <div v-if="isAuthorized" class="btn-wrapper">
          <button v-if="!editMode" class="btn-top update-btn" @click="startEdit">수정</button>
          <button class="btn-top delete-btn" @click="deleteComment">삭제</button>
        </div>
      </div>
    </div>
    <reply-write v-if="editMode" :id="comment.id" :edit-mode="true" :initial-value="comment.content" @close="endEdit" />
    <div v-else class="content">
      {{ comment.content }}
    </div>
    <div class="tool">
      <button class="create-btn" @click="openForm">답글 달기</button>
    </div>
    <reply-write v-if="isOpen" :parent-comment-id="comment.id" :reply-to-id="comment.user.id" @close="closeForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ReplyWrite from './ReplyWrite.vue';
import { formatDate } from '@/utils';
import { Comment } from '@/types/interfaces';

// https://ko.vuejs.org/guide/components/props
const props = defineProps<{
  comment: Comment;
}>();

const comment: Comment = props.comment;

const store = useStore();
const isOpen = ref(false);
const editMode = ref(false);

const user = computed(() => store.getters['users/getUser']);

const isAuthorized = computed(() => {
  return user.value && (props.comment!.user.id === user.value.id || user.value.role === 'ADMIN');
});

const deleteComment = async () => {
  await store.dispatch('comment/deleteComment', { comment: props.comment });
};

const openForm = () => {
  isOpen.value = true;
};

const closeForm = () => {
  isOpen.value = false;
};

const startEdit = () => {
  editMode.value = true;
};

const endEdit = () => {
  editMode.value = false;
};
</script>

<style src="@/styles/comment/item.css" scoped></style>
