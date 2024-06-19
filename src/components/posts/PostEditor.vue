<template>
  <div class="editor-wrapper">
    <div class="selection-container">
      <input
        v-model="title"
        class="post-title"
        placeholder="제목을 입력하세요"
      />
      <textarea
        v-model="description"
        class="post-description"
        placeholder="포스트 설명을 입력하세요"
      ></textarea>
      <div class="settings-wrapper">
        <button
          class="public-btn"
          :class="{ selected: status === PostStatus.PUBLIC }"
          @click="setStatus(PostStatus.PUBLIC)"
        >
          <font-awesome-icon icon="fa-solid fa-lock-open" />
          전체 공개
        </button>
        <button
          class="private-btn"
          :class="{ selected: status === PostStatus.PRIVATE }"
          @click="setStatus(PostStatus.PRIVATE)"
        >
          <font-awesome-icon icon="fa-solid fa-lock" />
          비공개
        </button>
      </div>
      <div class="category-wrapper">
        <h3>카테고리</h3>
        <select v-model="categoryId" class="category-select">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="tag-wrapper">
        <h3>태그 목록</h3>
        <div v-for="tagName in tagNames" :key="tagName" class="tag">
          {{ tagName }}
        </div>
        <input
          v-model="selectedTagName"
          class="tag-input"
          type="text"
          placeholder="태그를 입력하세요"
          @keyup.enter="registerTag"
          @keydown.delete="removeTag"
        />
      </div>
    </div>
    <div id="editor" class="editor"></div>
    <div class="button-container">
      <button class="exit-btn">나가기</button>
      <button class="submit-btn" @click="submitPost">작성하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'prismjs/themes/prism.css';
import Editor from '@toast-ui/editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AxiosResponse } from 'axios';
import { PostStatus } from '@/types/enums';
import { Category } from '@/types/interfaces';
import { create, update } from '@/services/api/post';
import { uploadImageFile } from '@/services/api/file';
import { getCategories } from '@/services/api/category';
import { getPost } from '@/services/api/post';
import { CreatePostDto, UpdatePostDto } from '@/types/dto';
import { FILE_BASE_URL } from '@/consts';
import store from '@/store';

const router = useRouter();
const route = useRoute();

const editor = ref<Editor | null>(null);
const selectedTagName = ref('');
const categories = ref<Category[]>([]);
const title = ref('');
const description = ref('');
const status = ref<PostStatus>(PostStatus.PUBLIC);
const categoryId = ref<number | null>(null);
const tagNames = ref<string[]>([]);
const fileNames = ref<string[]>([]);
const isUpdateMode = computed(() => route.path.includes('/update'));

let postId: number;
let initialValue = '';
let uploadingFileCount = 0;
let isPublishing = false;

onMounted(async () => {
  if (isUpdateMode.value) {
    try {
      postId = Number.parseInt(route.params.id as string);
      const response = await getPost(postId);
      const post = response.data;
      initialValue = post.content;
      if (post.category) {
        categoryId.value = post.category.id;
      }
      status.value = post.status;
      tagNames.value = post.tags.map((tag) => tag.name);
      title.value = post.title;
      description.value = post.description;
    } catch (e) {
      console.error(e);
    }
  }
  const { data } = await getCategories();
  categories.value = data.categories;

  editor.value = new Editor({
    el: document.querySelector('#editor') as HTMLElement,
    previewStyle: 'vertical',
    height: '80vh',
    initialEditType: 'markdown',
    initialValue,
    theme: 'white',
    plugins: [codeSyntaxHighlight],
    hooks: {
      addImageBlobHook: dropedImageUpload,
    },
  });
});

const registerTag = () => {
  const trimmedTagName = selectedTagName.value.trim();
  if (!trimmedTagName) return;
  tagNames.value.push(trimmedTagName);
  selectedTagName.value = '';
};

const removeTag = () => {
  if (selectedTagName.value === '') {
    tagNames.value.pop();
  }
};

const dropedImageUpload = async (file: any, setText) => {
  try {
    if (!file) return false;
    console.log(file);
    const fileSize = file.size;
    if (fileSize > 5242880) {
      const size = (file.size / (1000 * 1000)).toFixed(1);
      const errorMessage = `최대 업로드 사이즈(5 MB)를 초과 하였습니다.\n현재 사이즈 ${size}MB`;
      store.commit('error/ADD_MODAL', errorMessage);
      return false;
    }
    uploadingFileCount++;
    const formData = new FormData();
    formData.append('image', file);
    const response: AxiosResponse = await uploadImageFile(formData);
    if (response.status === 201) {
      const { data } = response;
      const fileName = data.filename;
      setText(`${FILE_BASE_URL}/static/temp/${fileName}`);
      fileNames.value.push(fileName);
    }
  } catch (e: any) {
    const errorMessage = '파일 업로드에 실패했습니다.';
    store.commit('error/ADD_MODAL', errorMessage);
    console.error(e.statusCode);
  } finally {
    uploadingFileCount--;
  }
};

// 작성하기 버튼을 눌렀을 때 호출
const submitPost = async () => {
  if (isPublishing) return;
  let isFormValid = true;
  if (title.value.trim() == '') {
    isFormValid = false;
    editor.value?.getMarkdown() || '';
    store.commit('error/ADD_MODAL', '제목이 비었습니다.');
  }
  const content = editor.value?.getMarkdown() || '';
  if (content.trim() == '') {
    isFormValid = false;
    store.commit('error/ADD_MODAL', '본문이 비었습니다.');
  }

  if (!isFormValid) return;
  isPublishing = true;
  while (uploadingFileCount > 0) {
    await new Promise((resolve) => setTimeout(resolve, 200)); // 100ms 마다 확인
  }
  if (isUpdateMode.value) {
    await updatePost(postId);
  } else {
    await uploadPost();
  }
  router.push(`/posts/${postId}`);
};

// 게시글 업데이트
const updatePost = async (id: number) => {
  try {
    const content = editor.value?.getMarkdown() || '';

    const postData: UpdatePostDto = {
      title: title.value,
      description: description.value,
      content,
      tagNames: tagNames.value,
      status: status.value,
      categoryId: categoryId.value,
      fileNames: fileNames.value,
    };

    await update(id, postData);
  } catch (e) {
    console.log(e);
  }
};

// 게시글 생성
const uploadPost = async () => {
  try {
    const content = editor.value?.getMarkdown() || '';
    const postData: CreatePostDto = {
      title: title.value,
      description: description.value,
      content,
      status: status.value,
    };

    if (categoryId.value) {
      postData.categoryId = categoryId.value;
    }

    if (tagNames.value.length) {
      postData.tagNames = tagNames.value;
    }

    if (fileNames.value.length) {
      postData.fileNames = fileNames.value;
    }
    const response = await create(postData);
    postId = response.data.id;
  } catch (e) {
    console.error(e);
  }
};

// 게시물 공개/비공개 상태 설정
const setStatus = (newStatus: PostStatus) => {
  status.value = newStatus;
};
</script>

<style src="@/styles/post/editor.css" scoped></style>
