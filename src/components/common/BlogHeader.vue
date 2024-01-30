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
    <div class="user-profile" v-if="isLoggedIn">
      <router-link to="/users/profile" class="profile">내 프로필</router-link>
      <router-link to="/admin" v-if="isAdmin" class="admin">관리</router-link>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { UsersRole } from '@/types/enums';

export default {
  computed: {
    isAdmin() {
      return this.getUserRole == UsersRole.ADMIN;
    },
    ...mapGetters("sidebar", ["getSidebarStatus"]),
    ...mapGetters("auth", ["isLoggedIn"]),
    ...mapGetters("users", ["getUserRole"])
  },
  methods: {
    ...mapMutations("sidebar", ["SET_SIDEBAR"]),
  },
};
</script>

<style scoped>
header {
  z-index: 0;
  background-color: #fff;
  width: 100%;
  height: 84px;
  position: fixed;
  top: 0;
  padding: 0 20px;
  /* 헤더 가운데 정렬 */
  margin: auto;
  right: 0px;
  left: 0px;
  border: 1px solid #eeeeee;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container {
  display: none;
}

.logo-container .logo{
  font-family: "Noto Sans KR", sans-serif;
  font-weight:700;
  font-size:25px;
}
/* .logo-container img {
  max-height: 40px;
} */

.user-actions {
  display: flex;
  gap: 10px;
}
.side-bar-btn {
  cursor: pointer;
}
.r-btn {
  padding: 8px 16px;
  background-color: #fff;
  color: #007bff;
  text-decoration: none;
  border-radius: 4px;
}

.r-btn:hover {
  font-weight: bold;
}
.btn-signin {
  color: black;
}

.btn-signup {
  background-color: #010101;
  color: #fff;
}

.admin {
  padding-left: 5px;
  margin-left: 5px;
  border-left: 2px solid black;
}

/* 태블릿 */
@media (min-width: 820px) {
  header {
    max-width: calc(1100px);
  }
  .side-bar-btn {
    display: none;
  }
  .logo-container {
    display: block;
  }
}

@media (min-width: 1340px) {
  header {
    max-width: calc(1356px);
  }
}
</style>