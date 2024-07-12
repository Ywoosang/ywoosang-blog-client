<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">사용자 목록</div>
      </q-card-section>
      <q-list>
        <q-item v-for="user in users" :key="user.id">
          <q-item-section>{{ user.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
}

const users = ref<User[]>([]);

onMounted(() => {
  // 더미 데이터
  users.value = [
    { id: 1, name: '사용자 1' },
    { id: 2, name: '사용자 2' },
    { id: 3, name: '사용자 3' },
  ];
});
</script>
