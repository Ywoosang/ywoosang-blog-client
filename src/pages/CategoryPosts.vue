<template>
  <main>
    <post-item :posts="postList" />
    <post-pagination :page-list="getPageList" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PostItem from '@/components/posts/PostItem.vue';
import PostPagination from '@/components/posts/PostPagination.vue';

const store = useStore();
const route = useRoute();

const category = computed(() => store.getters['category/getCategory']);
const getPageList = computed(() => store.getters['category/getPageList']);
const getUserRole = computed(() => store.getters['users/getUserRole']);
const postList = computed(() => (category.value ? category.value.posts : []));

const categoryId = ref<string>(route.params.id as string);

async function setCategory() {
  const userRole = getUserRole.value;
  const page = route.query.page || 1;
  const limit = route.query.limit || 15;
  try {
    await store.dispatch('category/fetchCategory', {
      id: categoryId.value,
      userRole,
      page,
      limit
    });
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await setCategory();
  store.commit('sidebar/SET_SELECTED_CATEGORY_ID', parseInt(categoryId.value));
});

watch(
  route,
  async (to, from) => {
    const toPage = to.query.page || 1;
    const toLimit = to.query.limit || 15;
    const fromPage = from.query.page || 1;
    const fromLimit = from.query.limit || 15;
    if (toPage !== fromPage || toLimit !== fromLimit || to.params.id !== from.params.id) {
      await setCategory();
      store.commit('sidebar/SET_SELECTED_CATEGORY_ID', parseInt(to.params.id as string));
    }
  },
  { deep: true }
);
</script>
