<template>
  <q-page padding class="column items-center">
    <PostCard v-for="i in 8" :key="i" />
  </q-page>
</template>

<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
</script>

<style scoped></style>
