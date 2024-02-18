<template>
	<div class="viewer-wrapper">
		<div class="post-header">
			<h1>{{ props.post.title }}</h1>
			<div class="post-header-meta">
				<div class="date-wrapper">
					<span class="created-date">{{ formatDate(props.post.createdAt) }}</span>
					<span class="updated-date" v-if="props.post.createdAt !== props.post.updatedAt">(업데이트){{
						formatDate(props.post.updatedAt)
					}}</span>
				</div>
				<div class="tag-wrapper">
					<ul class="tag-list">
						<li class="tag" v-for="(tag, index) in props.post.tags" :key="index">
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
import { Post } from '@/types/interfaces';
import { onMounted, defineProps } from 'vue';

const props = defineProps({
	post: {
		type: Object as () => Post,
		required: true
	}
})

onMounted(() => {
	new Viewer({
		el: document.querySelector('#viewer') as HTMLElement,
		initialValue: props.post.content,
		plugins: [[codeSyntaxHighlight, {}]],
	});
});
</script>

<style src="@/styles/post/viewer.css" scoped></style>
