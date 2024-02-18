<template>
	<div class="container">
		<blog-header />
		<section class="section">
			<blog-sidebar />
			<router-view />
			<auth-modal :class="{ none: !isModalOpen }" />
		</section>
	</div>
</template>

<script setup lang="ts">
import BlogHeader from '../components/common/BlogHeader.vue';
import BlogSidebar from '../components/common/BlogSidebar.vue';
import AuthModal from '../components/common/AuthModal.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isModalOpen = computed(() => store.getters['auth/isModalOpen'])
</script>

<style src="@/styles/layouts/blog.css" scoped></style>
