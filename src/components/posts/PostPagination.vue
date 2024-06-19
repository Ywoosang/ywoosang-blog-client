<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <li v-for="(pageItem, index) in props.pageList" :key="index" class="page">
        <router-link
          :to="'posts?page=' + pageItem.page"
          :class="{ current: pageItem.page == pageItem.currentPage }"
        >
          {{ pageItem.page }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Page } from '@/types/interfaces';

const props = defineProps({
  pageList: {
    type: Array as () => Page[],
    required: true,
    default: () => [],
  },
});
</script>

<style src="@/styles/common/pagination.css" scoped></style>
