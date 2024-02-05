<template>
  <header>
    <div class="logo-container">
      <a href="/" class="logo">
        윤우상<span style="font-weight: 300">블로그</span>
      </a>
    </div>
    <div class="side-bar-btn">
      <span v-on:click="SET_SIDEBAR">
        <font-awesome-icon :icon="['fas', 'bars']" v-if="!getSidebarStatus" />
      </span>
    </div>
    <div class="user-actions" v-if="!isLoggedIn">
      <router-link to="/auth/signin" class="r-btn btn-signin">로그인</router-link>
      <router-link to="/auth/signup" class="r-btn btn-signup">회원가입</router-link>
    </div>
    <div class="user-profile" v-if="isLoggedIn && getUser">
      <router-link :to="'/profile/'+ getUser.userLoginId + '/manage'" class="profile">내 프로필</router-link>
      <router-link to="/admin" v-if="isAdmin" class="admin">관리</router-link>
      <button @click="signout">로그아웃</button>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { UsersRole } from '@/types/enums';

export default {
  computed: {
    isAdmin() {
      return this.getUser.role == UsersRole.ADMIN;
    },
    ...mapGetters("sidebar", ["getSidebarStatus"]),
    ...mapGetters("auth", ["isLoggedIn"]),
    ...mapGetters("users", ["getUser"])
  },
  methods: {
    signout() {
      localStorage.clear();
      this.$router.push('/auth/signin');
    },
    ...mapMutations("sidebar", ["SET_SIDEBAR"]),
  },
};
</script>

<style src="@/styles/header.css" scoped>
</style>