<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="modal-default-button" @click="closeModal">
          <img src="@/assets/images/xmark.png" />
        </button>
        <div class="modal-header">
          <div name="header">
            <h1 class="title">
              {{ modalContent.title }}
            </h1>
          </div>
        </div>
        <div class="modal-body">
          <div name="body">
            <section class="email">
              <h4>이메일로 {{ modalContent.title }}</h4>
              <form v-if="!isEmailSent" @submit.prevent="sendEmail">
                <input v-model="email" type="text" placeholder="이메일을 입력하세요." />
                <button type="submit">
                  {{ modalContent.title }}
                </button>
              </form>
              <div v-else class="email-success">
                <font-awesome-icon class="check" icon="fa-solid fa-check" />
                {{ sentMessage }}
              </div>
            </section>
            <section class="social">
              <h4>소셜 계정으로 {{ modalContent.title }}</h4>
              <div class="btn-group">
                <a :href="GITHUB_LOGIN_URL" class="btn github">
                  <img src="@/assets/images/github.png" />
                </a>
                <a :href="GOOGLE_LOGIN_URL" class="btn google">
                  <img src="@/assets/images/google.png" />
                </a>
                <a :href="KAKAO_LOGIN_URL" class="btn kakao">
                  <img src="@/assets/images/kakao.png" />
                </a>
              </div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <div name="footer">
            <span>{{ modalContent.prompt }}</span>
            <button style="color: #000" @click="switchModalStatus">
              {{ modalContent.btnTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { sendAuthEmail } from '@/services/api/auth';
import { ModalStatus } from '@/types/enums';
import { GOOGLE_LOGIN_URL, GITHUB_LOGIN_URL, KAKAO_LOGIN_URL } from '@/consts';

const store = useStore();

const isEmailSent = ref(false);
let isSending = false;
const sentMessage = ref<string | null>(null);
const email = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const modalStatus = computed(() => store.getters['auth/getModalStatus']);

const switchModalStatus = () => {
  if (modalStatus.value === ModalStatus.SIGNIN) {
    store.commit('auth/SET_MODAL_STATUS', ModalStatus.SIGNUP);
  } else if (modalStatus.value === ModalStatus.SIGNUP) {
    store.commit('auth/SET_MODAL_STATUS', ModalStatus.SIGNIN);
  }
};

const sendEmail = async () => {
  try {
    if (isSending) return;
    isSending = true;
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      store.commit('error/ADD_MODAL', '이메일 형식을 입력해 주세요');
      isSending = false;
      return;
    }
    const authEmailDto = {
      email: email.value
    };
    const { data } = await sendAuthEmail(authEmailDto);
    errorMessage.value = null;
    sentMessage.value = data.message;
    isEmailSent.value = true;
    isSending = false;
  } catch (e) {
    console.log(e);
  }
};

const closeModal = () => {
  store.commit('auth/SET_IS_MODAL_OPEN', false);
  isEmailSent.value = false;
  errorMessage.value = null;
  email.value = null;
};

const modalContent = computed(() => {
  let data;
  if (modalStatus.value === ModalStatus.SIGNUP) {
    data = {
      title: '회원가입',
      prompt: '이미 가입 하셨나요?',
      btnTitle: '로그인'
    };
  } else if (modalStatus.value === ModalStatus.SIGNIN) {
    data = {
      title: '로그인',
      prompt: '아직 가입 전이신가요?',
      btnTitle: '회원가입'
    };
  }
  return data;
});
</script>

<style src="@/styles/auth/modal.css" scoped></style>
