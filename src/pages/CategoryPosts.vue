<template>
  <main>
    <post-item :posts="postList" />
    <post-pagination :page-list="getPageList" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PostItem from '@/components/posts/PostItem.vue';
import PostPagination from '@/components/posts/PostPagination.vue';
import { getPageNumber } from '@/utils';
import RouteQuery from '@/types/route-query';

const store = useStore();
const route = useRoute();

const category = computed(() => store.getters['category/getCategory']);
const getPageList = computed(() => store.getters['category/getPageList']);
const getUserRole = computed(() => store.getters['users/getUserRole']);
const postList = computed(() => (category.value ? category.value.posts : []));

// 처음 로딩시
onMounted(async () => {
  const categoryId: number = parseInt(route.params.id as string);
  const page: number = getPageNumber(route.query.page as RouteQuery);
  await setCategory(categoryId, page);
  store.commit('sidebar/SET_SELECTED_CATEGORY_ID', categoryId);
});

// 쿼리파라미터값 변경 감지
onBeforeRouteUpdate(async (to, from) => {
  if (to.query.page !== from.query.page || to.params.id !== from.params.id) {
    const categoryId: number = parseInt(to.params.id as string);
    const page: number = getPageNumber(to.query.page as RouteQuery);
    await setCategory(categoryId, page);
    store.commit('sidebar/SET_SELECTED_CATEGORY_ID', categoryId);
  }
});

async function setCategory(categoryId: number, page: number) {
  const userRole = getUserRole.value;
  try {
    await store.dispatch('category/fetchCategory', {
      id: categoryId,
      userRole,
      page,
    });
  } catch (e) {
    console.error(e);
  }
}
</script>
