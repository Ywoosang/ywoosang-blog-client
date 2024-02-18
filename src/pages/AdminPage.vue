<template>
	<main>
		<category-manage />
		<post-create-button />
	</main>
</template>

<script>
import CategoryManage from '@/components/categories/CategoryManage.vue';
import PostCreateButton from '@/components/posts/PostCreateButton.vue';
export default {
	components: {
		CategoryManage,
		PostCreateButton,
	},
};
</script>

<style scoped></style>
