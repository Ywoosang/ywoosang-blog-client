<template>
  <form class="signup-form" novalidate @submit.prevent="submitForm">
    <div class="form-group email-group">
      <label for="email">이메일</label>
      <input :value="email" disabled />
      <font-awesome-icon class="email-lock" icon="fa-solid fa-lock" />
    </div>
    <div class="form-group">
      <label for="userId">아이디</label>
      <input id="userId" v-model="userId" type="text" placeholder="아이디를 입력해 주세요" />
    </div>
    <div class="form-group">
      <label for="nickname">닉네임</label>
      <input id="nickname" v-model="nickname" type="text" placeholder="닉네임을 입력해 주세요" />
    </div>
    <div class="form-group">
      <label for="description">소개</label>
      <input id="description" v-model="description" type="text" placeholder="본인을 소개해 주세요" />
    </div>
    <div class="btn-wrapper">
      <button class="btn" type="submit">회원가입</button>
      <span class="btn" @click="goHome">취소</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { signUp } from '@/services/api/auth';
import { AuthRegisterDto } from '@/types/dto';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

// 사용자 입력 값
const userId = ref<string>('');
const nickname = ref<string>('');
const description = ref<string>('');

// 유효성 검사
const idValid = reactive({
  valid: true,
  message: ''
});

const nicknameValid = reactive({
  valid: true,
  message: ''
});

const descriptionValid = reactive({
  valid: true,
  message: ''
});

// 미들웨어에서 설정한 회원가입할 사용자 이메일
const email = store.getters['auth/getEmail'];

const submitForm = async () => {
  if (!formValidCheck()) return;
  try {
    const data: AuthRegisterDto = {
      email: store.getters['auth/getEmail'],
      userId: userId.value,
      nickname: nickname.value,
      description: description.value
    };
    await signUp(data);
    const hash = route.query.hash;
    await store.dispatch('auth/fetchLogin', hash);
    initValids();
    router.push('/');
  } catch (e: any) {
    // 회원가입에 실패한 경우
    if (e.response && e.response.status == 409) {
      const details = e.response.data.details;
      let loginRequired = false;
      if (Array.isArray(details)) {
        details.forEach(detail => {
          switch (detail.field) {
            case 'userId':
              idValid.valid = false;
              idValid.message = detail.message;
              break;
            case 'nickname':
              nicknameValid.valid = false;
              nicknameValid.message = detail.message;
              break;
            case 'email':
              loginRequired = true;
              break;
          }
        });
      }
      // 이미 가입한 사용자일 경우
      if (loginRequired) {
        const hash = route.query.hash;
        await store.dispatch('auth/fetchLogin', hash);
        initValids();
        router.push('/');
      }
    }
  }
};

const initValids = () => {
  idValid.valid = true;
  idValid.message = '';
  nicknameValid.valid = true;
  nicknameValid.message = '';
  descriptionValid.valid = true;
  descriptionValid.message = '';
};

const validateUserId = () => {
  const result = /^[a-zA-Z0-9]{4,10}$/.test(userId.value);
  if (!result) {
    idValid.valid = false;
    idValid.message = '아이디는 4~15자의 영문 또는 숫자여야 합니다.';
  } else {
    idValid.valid = true;
    idValid.message = '';
  }
};

const validateNickname = () => {
  const result = /^.{2,10}$/.test(nickname.value);
  if (!result) {
    nicknameValid.valid = false;
    nicknameValid.message = '닉네임은 2~10자여야 합니다.';
  } else {
    nicknameValid.valid = true;
    nicknameValid.message = '';
  }
};

const validateDescription = () => {
  const result = /^.{0,200}$/.test(description.value);
  if (!result) {
    descriptionValid.valid = false;
    descriptionValid.message = '소개는 200자 이내여야 합니다.';
  } else {
    descriptionValid.valid = true;
    descriptionValid.message = '';
  }
};

const formValidCheck = (): boolean => {
  validateUserId();
  validateNickname();
  validateDescription();
  let isAllFormValid = true;
  const validateResults = [idValid, nicknameValid, descriptionValid];
  validateResults.forEach(field => {
    if (!field.valid) {
      isAllFormValid = false;
      store.commit('error/ADD_MODAL', field.message);
    }
  });
  return isAllFormValid;
};

const goHome = () => {
  router.go(-1);
};
</script>

<style src="@/styles/auth/auth.css" scoped></style>
