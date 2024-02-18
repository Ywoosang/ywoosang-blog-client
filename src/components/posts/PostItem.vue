<template>
	<div class="post-container">
		<article class="post" v-for="post in props.posts" :key="post.id">
			<div class="admin-tool">
				<button @click="deletePost(post.id)" v-if="userRole == UsersRole.ADMIN">
					삭제
				</button>
				<button @click="updatePost(post.id)" v-if="userRole == UsersRole.ADMIN">
					수정
				</button>
			</div>
			<h2>
				<router-link :to="{
					name: 'Post',
					params: {
						id: post.id,
					},
				}">{{ post.title }}</router-link>
			</h2>
			<p class="timestamp">{{ formatDate(post.createdAt) }}</p>
			<p class="description">{{ post.description }}</p>
			<div class="tags">
				<router-link :to="`/tag/${tag.id}`" class="tag" v-for="tag in post.tags" :key="tag.id">{{ tag.name
				}}</router-link>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { deleteOne } from '@/services/api/post';
import { formatDate } from '@/utils';
import { Post } from '@/types/interfaces';
import { UsersRole } from '@/types/enums';

const store = useStore();
const router = useRouter();

const userRole = computed(() => store.getters['users/getUserRole']);

const props = defineProps({
	posts: {
		type: Array as () => Post[],
		required: true,
		default: () => []
	}
});

const deletePost = async (id: number) => {
	try {
		const confirmed = window.confirm('정말로 삭제하시겠습니까?');
		if (confirmed) {
			await deleteOne(id);
		}
		location.reload();
	} catch (e) {
		console.log(e);
	}
};

const updatePost = (id: number) => {
	router.push(`/admin/update/${id}`);
};
</script>

<style src="@/styles/post/item.css" scoped></style>
