<template>
  <article
    class="side-bar"
    :class="{
      'sidebar-open': isSidebarOpen,
      'sidebar-closed': !isSidebarOpen,
    }"
  >
    <div class="my-menu">
      <div class="btn-wrapper">
        <button v-if="isSidebarOpen" class="close-bar" @click="toggleSidebar">
          <img src="@/assets/images/xmark.png" class="close-icon" />
        </button>
      </div>
      <div class="im github">
        <a href="https://github.com/Ywoosang"
          >GitHub <font-awesome-icon icon="fa-brands fa-square-github"
        /></a>
      </div>
    </div>
    <div class="category-header">
      <h2>카테고리</h2>
    </div>
    <ul class="category-list">
      <li>
        <router-link to="/">
          <span
            class="category-name"
            :class="{
              selected: $route.name == 'AllPosts',
            }"
            >전체보기</span
          >
          <span class="category-count">({{ postCount }})</span>
        </router-link>
      </li>
      <li v-for="category in sidebarCategories" :key="category.id">
        <router-link :to="`/category/${category.id}`">
          <span
            class="category-name"
            :class="{ selected: isSelectedCategory(category.id) }"
            >{{ category.name }}</span
          >
          <span class="category-count">({{ category.postCount }})</span>
        </router-link>
      </li>
    </ul>
    <div class="tag-header">
      <h2>태그({{ sidebarTags.length }})</h2>
    </div>
    <ul class="tag-list">
      <li
        v-for="tag in sidebarTags"
        :key="tag.id"
        :class="{ selected: isSelectedTag(tag.id) }"
      >
        <router-link :to="'/tag/' + tag.id">
          {{ tag.name }}
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

// 사이드바 상태
const isSidebarOpen = computed(() => store.getters['sidebar/getSidebarStatus']);
const toggleSidebar = () => store.commit('sidebar/SET_SIDEBAR');

// 현재 위치
const selectedCategoryId = computed(
  () => store.getters['sidebar/getSelectedCategoryId'],
);
const selectedTagId = computed(() => store.getters['sidebar/getSelectedTagId']);

// 전체 게시글 개수
const postCount = computed(() => store.getters['sidebar/getPostCount']);

// 카테고리/태그 목록
const sidebarTags = computed(() => store.getters['sidebar/getSidebarTags']);
const sidebarCategories = computed(
  () => store.getters['sidebar/getSidebarCategories'],
);

const isSelectedCategory = (id: number) => {
  return route.name == 'Category' && selectedCategoryId.value == id;
};

const isSelectedTag = (id: number) => {
  return route.name == 'Tag' && selectedTagId.value == id;
};
</script>

<style src="@/styles/sidebar.css" scoped></style>
