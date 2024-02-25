<template>
	<main>
		<post-item :posts="postList" />
		<post-pagination :pageList="pageList" />
	</main>
</template>

<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue';
import PostPagination from '@/components/posts/PostPagination.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const store = useStore();
const route = useRoute();

// 처음 로딩시 게시물을 불러옴
onMounted(async () => {
	const page = route.query.page ? route.query.page : '1';
	if (typeof page == 'string') {
		await setPostList(page);
		store.commit('sidebar/SET_SELECTED_CATEGORY_ID', null);
	}
})


const postList = computed(() => store.getters['post/getPostList']);
const pageList = computed(() => store.getters['post/getPageList']);
const userRole = computed(() => store.getters['users/getUserRole']);

const setPostList = async (page: string) => {
	try {
		await store.dispatch('post/fetchPostList', { userRole: userRole.value, page });
	} catch (e) {
		console.log(e);
	}
};

onBeforeRouteUpdate(async (to, from) => {
	if (to.query.page != from.query.page && typeof to.query.page == 'string') {
		await setPostList(to.query.page);
		store.commit('sidebar/SET_SELECTED_CATEGORY_ID(null)');
	}
})
</script>
