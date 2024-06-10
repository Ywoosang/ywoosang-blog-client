<template>
  <main>
    <post-item :posts="getPostList" />
    <post-pagination :page-list="getPageList" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PostItem from '@/components/posts/PostItem.vue';
import PostPagination from '@/components/posts/PostPagination.vue';

const store = useStore();
const route = useRoute();

const getUserRole = computed(() => store.getters['users/getUserRole']);
const getTag = computed(() => store.getters['tag/getTag']);
const getPageList = computed(() => store.getters['tag/getPageList']);
const getPostList = computed(() => (getTag.value ? getTag.value.posts : []));

async function setTag() {
  const userRole = getUserRole.value;
  // 쿼리파라미터 추출 방식 개선 필요
  const pageParam = route.query.page as string;
  const limitParam = route.query.limit as string;
  const id = route.params.id as string;
  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 15;
  try {
    await store.dispatch('tag/fetchTag', { id, userRole, page, limit });
  } catch (e) {
    console.error(e);
  }
}

function setSelectedTagId(id) {
  store.commit('sidebar/SET_SELECTED_TAG_ID', parseInt(id));
}

onMounted(async () => {
  await setTag();
  setSelectedTagId(route.params.id);
});

watch(
  route,
  async (to, from) => {
    const toPage = to.query.page || 1;
    const toLimit = to.query.limit || 15;
    const fromPage = from.query.page || 1;
    const fromLimit = from.query.limit || 15;
    if (toPage !== fromPage || toLimit !== fromLimit || to.params.id !== from.params.id) {
      await setTag();
      setSelectedTagId(to.params.id);
    }
  },
  { deep: true }
);
</script>
