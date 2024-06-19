<template>
  <main>
    <post-item :posts="postList" />
    <post-pagination :page-list="pageList" />
  </main>
</template>

<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue';
import PostPagination from '@/components/posts/PostPagination.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import RouteQuery from '@/types/route-query';
import { getPageNumber } from '@/utils';
const store = useStore();
const route = useRoute();

// 처음 로딩시
onMounted(async () => {
  const page: number = getPageNumber(route.query.page as RouteQuery);
  await setPostList(page);
});

// 쿼리파라미터값 변경 감지
onBeforeRouteUpdate(async (to, from) => {
  if (to.query.page != from.query.page) {
    const page: number = getPageNumber(to.query.page as RouteQuery);
    await setPostList(page);
  }
});

const postList = computed(() => store.getters['post/getPostList']);
const pageList = computed(() => store.getters['post/getPageList']);
const userRole = computed(() => store.getters['users/getUserRole']);

const setPostList = async (page: number) => {
  try {
    await store.dispatch('post/fetchPostList', {
      userRole: userRole.value,
      page,
    });
  } catch (e) {
    console.error(e);
  }
};
</script>
