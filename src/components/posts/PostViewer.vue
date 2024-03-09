<template>
	<div class="viewer-wrapper">
		<div class="post-header">
			<h1>{{ post.title }}</h1>
			<div class="post-header-meta">
				<div class="date-wrapper">
					<span class="created-date">{{ formatDate(post.createdAt) }}</span>
					<span class="updated-date" v-if="post.createdAt !== post.updatedAt">(업데이트){{
						formatDate(post.updatedAt)
					}}</span>
					<div class="admin-tool">
				<button @click="deletePost(post.id)" v-if="userRole == UsersRole.ADMIN">
					삭제
				</button>
				<button @click="updatePost(post.id)" v-if="userRole == UsersRole.ADMIN">
					수정
				</button>
	</div>
			</div>
				<div class="tag-wrapper">
					<ul class="tag-list">
						<li class="tag" v-for="(tag, index) in post.tags" :key="index">
							<router-link :to="'/tag/' + tag.id">{{ tag.name }}</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="post-content">
			<div id="viewer" style="font-size: 16px"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { formatDate } from '@/utils';
import { UsersRole } from '@/types/enums';
	import { deleteOne } from '@/services/api/post';
import { Post } from '@/types/interfaces';
import { onMounted, defineProps, computed } from 'vue';
import { useStore } from 'vuex';	
import { useRouter } from 'vue-router';
	
const store = useStore();
const router = useRouter();

const props = defineProps({
	post: {
		type: Object as () => Post,
		required: true
	}
});

const userRole = computed(() => store.getters['users/getUserRole']);


onMounted(() => {
	new Viewer({
		el: document.querySelector('#viewer') as HTMLElement,
		initialValue: props.post.content,
		plugins: [[codeSyntaxHighlight, {}]],
	});
});
	
	
const deletePost = async (id: number) => {
	try {
		const confirmed = window.confirm('정말로 삭제하시겠습니까?');
		if (confirmed) {
			await deleteOne(id);
		}
		router.push('/')
	} catch (e) {
		console.log(e);
	}
};

const updatePost = (id: number) => {
	router.push(`/admin/update/${id}`);
};
</script>

<style src="@/styles/post/viewer.css" scoped></style>
