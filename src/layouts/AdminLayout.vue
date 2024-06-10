<template>
  <div class="container">
    <router-view />
    <error-modal />
  </div>
</template>

<script setup lang="ts">
import ErrorModal from '../components/common/ErrorModal.vue';
</script>

<style src="@/styles/layouts/admin.css" scoped></style>
