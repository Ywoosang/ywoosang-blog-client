<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">카테고리 관리</div>
        <q-btn label="카테고리 추가" color="primary" @click="openAddDialog" />
      </q-card-section>
      <q-list>
        <q-item v-for="category in categories" :key="category.id">
          <q-item-section>{{ category.name }}</q-item-section>
          <q-item-section side>
            <q-btn
              label="수정"
              color="primary"
              @click="openEditDialog(category)"
            />
            <q-btn
              label="삭제"
              color="negative"
              @click="deleteCategory(category.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- 수정 다이얼로그 -->
    <q-dialog v-model="isEditDialogOpen">
      <q-card class="dialog-card">
        <q-card-section>
          <div class="text-h6">카테고리 수정</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="editCategoryName" label="카테고리 이름" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="취소" color="negative" />
          <q-btn flat label="저장" color="primary" @click="saveCategory" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 추가 다이얼로그 -->
    <q-dialog v-model="isAddDialogOpen">
      <q-card class="dialog-card">
        <q-card-section>
          <div class="text-h6">카테고리 추가</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="newCategoryName" label="카테고리 이름" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="취소" color="negative" />
          <q-btn flat label="추가" color="primary" @click="addCategory" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Category {
  id: number;
  name: string;
}

const categories = ref<Category[]>([]);
const isEditDialogOpen = ref(false);
const isAddDialogOpen = ref(false);
const editCategoryId = ref<number | null>(null);
const editCategoryName = ref('');
const newCategoryName = ref('');

onMounted(() => {
  // 더미 데이터
  categories.value = [
    { id: 1, name: '카테고리 1' },
    { id: 2, name: '카테고리 2' },
    { id: 3, name: '카테고리 3' },
  ];
});

const openEditDialog = (category: Category) => {
  editCategoryId.value = category.id;
  editCategoryName.value = category.name;
  isEditDialogOpen.value = true;
};

const saveCategory = () => {
  if (editCategoryId.value !== null) {
    const category = categories.value.find(
      (cat) => cat.id === editCategoryId.value,
    );
    if (category) {
      category.name = editCategoryName.value;
    }
  }
  isEditDialogOpen.value = false;
};

const openAddDialog = () => {
  newCategoryName.value = '';
  isAddDialogOpen.value = true;
};

const addCategory = () => {
  if (newCategoryName.value.trim()) {
    categories.value.push({
      id: categories.value.length + 1,
      name: newCategoryName.value.trim(),
    });
  }
  isAddDialogOpen.value = false;
};

const deleteCategory = (id: number) => {
  categories.value = categories.value.filter((category) => category.id !== id);
};
</script>

<style scoped>
.dialog-card {
  width: 40vw;
  height: 30vh;
}
</style>
