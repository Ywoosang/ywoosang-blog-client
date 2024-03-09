<template>
	<div class="container">
		<blog-header />
		<section class="section">
			<blog-sidebar />
			<router-view/>
			<div class="filter" v-if="isSidebarOpen"></div>
			<auth-modal :class="{ none: !isAuthModalOpen }" />
		</section>
		<error-modal></error-modal>
	</div>
</template>

<script setup lang="ts">
import ErrorModal from '../components/common/ErrorModal.vue';
import BlogHeader from '../components/common/BlogHeader.vue';
import BlogSidebar from '../components/common/BlogSidebar.vue';
import AuthModal from '../components/auth/AuthModal.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isAuthModalOpen = computed(() => store.getters['auth/isModalOpen']);
const isSidebarOpen = computed(() => store.getters['sidebar/getSidebarStatus']);
</script>

<style src="@/styles/layouts/blog.css" scoped></style>
