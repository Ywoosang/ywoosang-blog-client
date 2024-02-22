<template>
    <div class="pagination-wrapper">
        <ul class="pagination">
            <li class="page" v-for="(pageItem, index) in pageList" :key="index">
                <router-link :to="`/profile/${userId}?page=${pageItem.page}`"
                    :class="{ current: pageItem.page == pageItem.currentPage }">{{ pageItem.page }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const pageList = computed(() => store.getters['users/getPageList']);
const userId = route.params.userId;
</script>

<style src="@/styles/common/pagination.css" scoped></style>