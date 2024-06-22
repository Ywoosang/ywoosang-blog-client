<template>
  <div>
    <v-md-editor v-model="text" height="400px" />
  </div>
</template>

<script setup lang="ts">
const text = ref<string>('#가나다라');
</script>
<style scoped></style>
