<template>
	<article class="side-bar" :class="{
		'sidebar-open': isSidebarOpen,
		'sidebar-closed': !isSidebarOpen,
	}">
		<div class="my-menu">
			<div class="btn-wrapper">
				<button class="close-bar" @click="toggleSidebar" v-if="isSidebarOpen">
					<img src="@/assets/images/xmark.png" class="close-icon" />
				</button>
			</div>
			<div class="im github">
				<a href="https://github.com/Ywoosang">GitHub <font-awesome-icon icon="fa-brands fa-square-github" /></a>
			</div>
		</div>
		<div class="category-header">
			<h2>카테고리</h2>
		</div>
		<ul class="category-list">
			<li>
				<router-link to="/posts">
					<span class="category-name" :class="{ selected: !selectedCategoryId }">전체보기</span>
					<span class="category-count">({{ postCount }})</span>
				</router-link>
			</li>
			<li v-for="category in sidebarCategories" :key="category.id">
				<router-link :to="'/category/' + category.id">
					<span class="category-name" :class="{ selected: selectedCategoryId === category.id }">{{ category.name
					}}</span>
					<span class="category-count">({{ category.postCount }})</span>
				</router-link>
			</li>
		</ul>
		<div class="tag-header">
			<h2>태그({{ sidebarTags.length }})</h2>
		</div>
		<ul class="tag-list">
			<li v-for="tag in sidebarTags" :key="tag.id" :class="{ selected: selectedTagId === tag.id }">
				<router-link :to="'/tag/' + tag.id">{{ tag.name }}</router-link>
			</li>
		</ul>
	</article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const isSidebarOpen = computed(() => store.getters['sidebar/getSidebarStatus']);
const sidebarCategories = computed(
	() => store.getters['sidebar/getSidebarCategories'],
);
const sidebarTags = computed(() => store.getters['sidebar/getSidebarTags']);
const selectedCategoryId = computed(
	() => store.getters['sidebar/getSelectedCategoryId'],
);
const selectedTagId = computed(() => store.getters['sidebar/getSelectedTagId']);
const postCount = computed(() => store.getters['sidebar/getPostCount']);

const toggleSidebar = () => {
	store.commit('sidebar/SET_SIDEBAR');
};

const toHome = () => {
	router.push('/');
};
</script>

<style src="@/styles/sidebar.css" scoped></style>
