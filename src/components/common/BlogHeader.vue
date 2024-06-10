<template>
  <header>
    <div class="logo-container" :class="{ visible: isSidebarOpen }">
      <a href="/" class="logo"> 윤우상<span style="font-weight: 300">블로그</span> </a>
    </div>
    <div class="side-bar-btn">
      <span @click="setSidebar">
        <font-awesome-icon v-if="!isSidebarOpen" :icon="['fas', 'bars']" />
      </span>
    </div>
    <div v-if="!isLoggedIn" class="user-actions">
      <button class="r-btn btn-signin" @click="openModal(signInStatus)">로그인</button>
      <button class="r-btn btn-signup" @click="openModal(signUpStatus)">회원가입</button>
    </div>
    <div v-if="isLoggedIn && user" class="user-profile">
      <div class="avatar-wrapper">
        <img :src="user.profileImage" />
      </div>
      <button class="btn-wrapper" @click="toggleDropdown">
        <font-awesome-icon icon="fa-solid fa-caret-down" class="btn-down" />
      </button>
      <div v-if="isDropdownOpen" class="menu-wrapper">
        <div class="menu">
          <router-link v-if="isAdmin" to="/admin" class="menu-item">
            관리<span class="btn admin">admin</span>
          </router-link>
          <router-link :to="'/profile/' + user.userId" class="menu-item"> 활동내역 </router-link>
          <router-link :to="'/profile/' + user.userId + '/manage'" class="menu-item"> 설정 </router-link>
          <button class="menu-item" @click="signout">로그아웃</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ModalStatus, UsersRole } from '@/types/enums';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const signInStatus = ModalStatus.SIGNIN;
const signUpStatus = ModalStatus.SIGNUP;
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const isDropdownOpen = computed(() => store.getters['header/getDropdownStatus']);
const user = computed(() => store.getters['users/getUser']);
const isAdmin = computed(() => user.value?.role === UsersRole.ADMIN);
const isSidebarOpen = computed(() => store.getters['sidebar/getSidebarStatus']);

const setSidebar = () => {
  store.commit('sidebar/SET_SIDEBAR');
};

const toggleDropdown = () => {
  store.commit('header/TOGGLE_DROPDOWN');
};

const openModal = (status: ModalStatus) => {
  store.commit('auth/SET_IS_MODAL_OPEN', true);
  store.commit('auth/SET_MODAL_STATUS', status);
};

const signout = () => {
  store.commit('users/INIT_USER');
  store.dispatch('auth/logout');
};
</script>

<style src="@/styles/header.css" scoped></style>
