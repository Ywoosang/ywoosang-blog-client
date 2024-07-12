<template>
  <q-page padding>
    <div class="q-gutter-md">
      <!-- 제목 입력 -->
      <q-input v-model="title" label="제목을 입력하세요" outlined />

      <!-- 설명 입력 -->
      <q-input
        v-model="description"
        label="포스트 설명을 입력하세요"
        outlined
        type="textarea"
        rows="4"
      />

      <!-- 공개 설정 버튼 -->
      <div class="q-gutter-sm row q-pb-sm q-pb-md-lg">
        <q-btn
          :flat="!isPublic"
          label="전체 공개"
          class="col black"
          :class="{ selected: isPublic }"
          @click="isPublic = true"
        />
        <q-btn
          :flat="isPublic"
          label="비공개"
          class="col"
          :class="{ selected: !isPublic }"
          @click="isPublic = false"
        />
      </div>

      <!-- 카테고리 선택 -->
      <q-select
        v-model="category"
        :options="categories"
        label="카테고리"
        outlined
      />
    </div>
    <!-- 에디터 -->
    <div ref="editor"></div>
    <div class="q-gutter-sm row q-mt-md">
      <q-btn label="작성" class="col" @click="submitPost" />
      <q-btn label="취소" class="col" @click="cancelPost" />
    </div>
  </q-page>
</template>

<script lang="ts">
const categories = [
  { label: '카테고리 1', value: 'category1' },
  { label: '카테고리 2', value: 'category2' },
  { label: '카테고리 3', value: 'category3' },
];
</script>

<script lang="ts" setup>
const editor = ref();
const category = ref(null);
const title = ref('');
const description = ref('');
const isPublic = ref(true);

const router = useRouter();

onMounted(() => {
  const content = '###테스트\n####테스트2';

  editor.value = toastEditorInstance(editor.value, '100vh', content);
});

const submitPost = () => {
  // 포스트 제출 로직 구현
  console.log('Post submitted:', {
    title,
    description,
    isPublic,
    category,
  });
};

const cancelPost = () => {
  router.back();
};
</script>

<style scoped>
.selected {
  background-color: black;
  color: white;
}
</style>
