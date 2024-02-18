<template>
	<div class="wrapper">
		<ul class="comment-list">
			<li class="comment-box" v-for="comment in props.comments" :key="comment.id">
				<comment-item :comment="comment" />
				<div class="reply-area">
					<ul class="reply-list">
						<li class="reply-box" v-for="reply in comment.replies" :key="reply.id">
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
import { Comment } from '@/types/interfaces';

const props = defineProps({
	comments: Array as () => Comment[]
});
</script>

<style src="@/styles/comment/list.css" scoped></style>
