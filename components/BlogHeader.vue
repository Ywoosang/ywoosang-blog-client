<template>
  <q-header bordered class="bg-white row" :style="headerStyle">
    <q-toolbar class="row justify-between">
      <!-- 사이드바 토글 버튼 -->
      <div class="flex items-center">
        <img src="#" alt="윤우상 블로그" class="logo" />
      </div>
      <q-btn
        v-if="$q.screen.lt.md"
        dense
        flat
        color="grey-10"
        icon="menu"
        :style="iconStyle"
        @click="toggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useDrawerState } from '@/composables/useDrawerState';

const { toggleLeftDrawer } = useDrawerState();
const $q = useQuasar();

// 헤더 스타일을 반응형으로 설정
const headerStyle = computed(() => ({
  height: $q.screen.lt.md ? '60px' : '90px',
}));

// 로고 스타일을 반응형으로 설정
const iconStyle = computed(() => ({
  height: $q.screen.lt.md ? '40px' : '60px',
}));
</script>

<style scoped></style>
