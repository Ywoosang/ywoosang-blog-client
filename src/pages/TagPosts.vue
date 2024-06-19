<template>
  <main>
    <post-item :posts="getPostList" />
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

const getUserRole = computed(() => store.getters['users/getUserRole']);
const getTag = computed(() => store.getters['tag/getTag']);
const getPageList = computed(() => store.getters['tag/getPageList']);
const getPostList = computed(() => (getTag.value ? getTag.value.posts : []));

onMounted(async () => {
  const page: number = getPageNumber(route.query.page as RouteQuery);
  const tagId: number = parseInt(route.params.id as string);
  await setTag(page, tagId);
  store.commit('sidebar/SET_SELECTED_TAG_ID', tagId);
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.query.page !== from.query.page || to.params.id !== from.params.id) {
    const tagId: number = parseInt(to.params.id as string);
    const page: number = getPageNumber(to.query.page as RouteQuery);
    await setTag(tagId, page);
    store.commit('sidebar/SET_SELECTED_TAG_ID', tagId);
  }
});

async function setTag(tagId: number, page: number) {
  try {
    await store.dispatch('tag/fetchTag', {
      id: tagId,
      userRole: getUserRole.value,
      page,
    });
  } catch (e) {
    console.error(e);
  }
}
</script>
