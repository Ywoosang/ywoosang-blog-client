<template>
	<div class="reply">
		<div class="header">
			<div class="image-wrapper">
				<img :src="props.reply.user.profileImage" />
			</div>
			<div class="content-wrapper">
				<router-link :to="'/profile/' + props.reply.user.userId" class="info">
					<h4>{{ props.reply.user.nickname }}</h4>
					<div class="date">{{ formatDate(props.reply.createdAt) }}</div>
				</router-link>
				<div class="btn-wrapper" v-if="isAuthorized">
					<button v-if="!editMode" class="btn-top update-btn" @click="startEdit">
						수정
					</button>
					<button class="btn-top delete-btn" @click="deleteReply">삭제</button>
				</div>
			</div>
		</div>
		<reply-write v-if="editMode" :editMode="true" @close="endEdit" :id="props.reply.id" :isComment="false"
			:initialValue="props.reply.content" />
		<div v-else class="content">
			<div>
				<router-link :to="'/profile/' + reply.replyTo.userId" class="mention">
					@{{ reply.replyTo.nickname }}
				</router-link>
				<pre style="padding: 0; margin: 0">{{ reply.content }}</pre>
			</div>
		</div>
		<div class="tool">
			<button class="create-btn" @click="openForm">답글 달기</button>
		</div>
		<reply-write v-if="replyMode" @close="closeForm" :parentCommentId="reply.parentCommentId"
			:replyToId="reply.replyTo.id" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatDate } from '@/utils';
import { useStore } from 'vuex';
import { Comment } from '@/types/interfaces';
import ReplyWrite from './ReplyWrite.vue';

const props = defineProps<{
	reply: Comment;
}>();

const store = useStore();
const replyMode = ref(false);
const editMode = ref(false);

const user = computed(() => store.getters['users/getUser']);

const openForm = () => {
	replyMode.value = true;
	editMode.value = false;
};

const startEdit = () => {
	editMode.value = true;
	replyMode.value = false;
};

const endEdit = () => {
	editMode.value = false;
};

const closeForm = () => {
	replyMode.value = false;
};

const deleteReply = async () => {
	try {
		await store.dispatch('comment/deleteReply', { reply: props.reply });
	} catch (e) {
		console.log(e);
	}

};

const isAuthorized = computed(() => {
	return (
		user.value &&
		(props.reply.user.id === user.value.id || user.value.role === 'ADMIN')
	);
});
</script>

<style src="@/styles/comment/item.css" scoped></style>
