<template>
  <q-layout view="hHh LpR fFf">
    <BlogHeader />
    <BlogSidebar />
    <q-page-container>
      <slot></slot>
    </q-page-container>
    <q-drawer :width="240" show-if-above side="right" />
  </q-layout>
</template>
<script setup lang="ts"></script>

<style scoped></style>
