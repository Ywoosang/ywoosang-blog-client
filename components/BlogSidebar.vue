<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :width="240"
    show-if-above
    side="left"
    class="side-bar"
    bordered
  >
    <q-list class>
      <q-item v-ripple class="">
        <NuxtLink to="/">
          <q-item-section class="text-center">전체보기 (352)</q-item-section>
        </NuxtLink>
      </q-item>
      <q-separator />

      <q-item v-for="i in 10" :key="i" v-ripple clickable>
        <NuxtLink to="/">
          <q-item-section>인공지능 (19)</q-item-section>
        </NuxtLink>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { useDrawerState } from '@/composables/useDrawerState';

const { leftDrawerOpen } = useDrawerState();
</script>

<style scoped>
a {
  line-height: 30px;
  color: black;
}
</style>
