<template>
    <div class="pagination-wrapper">
      <ul class="pagination">
        <li class="page" v-for="(pageItem, index) in pageList" :key="index">
          <router-link :to="'post?page='+ pageItem.page"  :class="{ 'current': pageItem.page == pageItem.currentPage }">{{ pageItem.page }}</router-link>
        </li>
      </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ['pageList'],
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding:0px;
}
.pagination .page {
  padding: 0 3px;
}
.pagination .page .current {
  font-weight: bold;
}
/* 태블릿 */
@media (min-width: 860px) {
}
/* 데스크톱 */
@media (min-width: 1340px) {
}
</style>