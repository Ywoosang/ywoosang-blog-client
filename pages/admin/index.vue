<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">관리자 대시보드</div>
      </q-card-section>

      <q-card-section>
        <q-btn-group spread>
          <q-btn
            label="사용자 관리"
            color="primary"
            @click="navigateTo('users')"
          />
          <q-btn
            label="카테고리 관리"
            color="secondary"
            @click="navigateTo('categories')"
          />
          <q-btn
            label="게시글 작성"
            color="accent"
            @click="navigateTo('create')"
          />
        </q-btn-group>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (page: string) => {
  router.push(`/admin/${page}`);
};
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: 50px auto;
}
.q-btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
