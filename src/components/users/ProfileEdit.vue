<template>
  <div class="profile-container">
    <div class="avatar-wrapper">
      <div class="user-avatar">
        <img :src="currentProfileImage" alt="프로필 이미지" />
        <div class="upload-layer">
          <input
            id="file"
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileChange"
          />
          <label for="file" class="upload-image">업로드</label>
        </div>
      </div>
      <button class="update-image" @click="updateImage">이미지 적용</button>
      <button class="reset-image" @click="resetProfileImage">취소</button>
    </div>

    <div class="detail-wrapper">
      <div class="nickname-wrapper">
        <div v-if="!editMode.nickname" class="view">
          <h2 class="nickname">
            {{ user.nickname }}
          </h2>
          <button class="update-btn" @click="editNickname">
            <font-awesome-icon
              icon="fa-regular fa-pen-to-square"
              class="icon"
            />
          </button>
        </div>
        <div v-else class="edit">
          <input v-model="editedUser.nickname" type="text" />
          <button class="save-btn" @click="saveNickname">저장</button>
        </div>
      </div>
      <div class="description-wrapper">
        <div v-if="!editMode.description" class="view">
          <p class="description">
            {{ user.description }}
          </p>
          <button class="update-btn" @click="editDescription">
            <font-awesome-icon
              icon="fa-regular fa-pen-to-square"
              class="icon"
            />
          </button>
        </div>
        <div v-else class="edit">
          <textarea
            ref="descriptionTextarea"
            v-model="editedUser.description"
            type="text"
            @input="adjustTextareaHeight"
          ></textarea>
          <button class="save-btn" @click="saveDescription">저장</button>
        </div>
      </div>
    </div>
    <div class="info-wrapper">
      <div>
        <div class="wrapper">
          <div class="title-wrapper">
            <h3>이메일 주소</h3>
          </div>
          <div class="content-wrapper">
            <p class="user-email">
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="wrapper">
          <div class="title-wrapper">
            <h3>아이디</h3>
          </div>
          <div class="content-wrapper">
            <p class="user-email">
              {{ user.userId }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
  nextTick,
  ref,
  reactive,
  onMounted,
  ComputedRef,
} from 'vue';
import { useStore } from 'vuex';
import { uploadImageFile } from '@/services/api/file';
import { User } from '@/types/interfaces';
import { FILE_BASE_URL } from '@/consts';

const store = useStore();

const user: ComputedRef<User> = computed(() => store.getters['users/getUser']);
const prevProfileImage = ref<string>('');
const currentProfileImage = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);
const descriptionTextarea = ref<HTMLTextAreaElement | null>(null);
const maxFileSize = 1024 * 1024;

const editMode = reactive({
  nickname: false,
  description: false,
});

const editedUser = reactive({
  nickname: '',
  description: '',
});

onMounted(() => {
  prevProfileImage.value = user.value.profileImage;
  currentProfileImage.value = user.value.profileImage;
});

watch(
  () => editMode.description,
  (newValue) => {
    if (newValue) {
      nextTick(adjustTextareaHeight);
    }
  },
);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size <= maxFileSize) {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadImageFile(formData);
      const { data } = response;
      const fileName = data.filename;
      currentProfileImage.value = `${FILE_BASE_URL}/static/temp/${fileName}`;
      console.log(fileName);
    } else {
      const errorMessage = '파일 용량이 너무 큽니다.';
      store.commit('error/ADD_MODAL', errorMessage);
      event.target.value = '';
    }
  }
};

const updateImage = async () => {
  try {
    if (prevProfileImage.value != currentProfileImage.value) {
      await store.dispatch('users/updateUser', {
        profileImage: currentProfileImage.value,
      });
      prevProfileImage.value = user.value.profileImage;
      currentProfileImage.value = user.value.profileImage;
    }
  } catch (e) {
    console.log(e);
  }
};

const resetProfileImage = () => {
  fileInput.value = null;
  currentProfileImage.value = prevProfileImage.value;
};

const editNickname = () => {
  editMode.nickname = true;
  editedUser.nickname = user.value.nickname;
};

const editDescription = () => {
  editMode.description = true;
  editedUser.description = user.value.description as string;
};

const saveNickname = async () => {
  if (editedUser.nickname.trim() != user.value.nickname.trim()) {
    try {
      await store.dispatch('users/updateUser', {
        nickname: editedUser.nickname.trim(),
      });
    } catch (e) {
      console.log(e);
    }
  }
  editMode.nickname = false;
};

const saveDescription = async () => {
  if (editedUser.description.trim() != user.value.nickname.trim()) {
    try {
      await store.dispatch('users/updateUser', {
        description: editedUser.description.trim(),
      });
    } catch (e) {
      console.log(e);
    }
  }
  editMode.description = false;
};

const adjustTextareaHeight = () => {
  descriptionTextarea.value!.style.height = 'auto';
  descriptionTextarea.value!.style.height = `${descriptionTextarea.value!.scrollHeight}px`;
};
</script>

<style scoped>
@import '@/styles/users/profile.css';
@import '@/styles/users/edit.css';
</style>
