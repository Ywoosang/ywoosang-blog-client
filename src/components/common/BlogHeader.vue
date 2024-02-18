<template>
	<header>
		<div class="logo-container">
			<a href="/" class="logo">
				윤우상<span style="font-weight: 300">블로그</span>
			</a>
		</div>
		<div class="side-bar-btn">
			<span @click="setSidebar">
				<font-awesome-icon v-if="!getSidebarStatus" :icon="['fas', 'bars']" />
			</span>
		</div>
		<div class="btn-group user-actions" v-if="!isLoggedIn">
			<button @click="openModal(signInStatus)" class="r-btn btn-signin">
				로그인
			</button>
			<button @click="openModal(signUpStatus)" class="r-btn btn-signup">
				회원가입
			</button>
		</div>
		<div class="btn-group user-profile" v-if="isLoggedIn && user">
			<div class="image-wraper">
				<img :src="user.profileImage">
			</div>
			<div class="menu-wrapper">
				<div class="menu">
					<router-link v-if="isAdmin" to="/admin" class="r-btn admin">관리</router-link>
					<router-link :to="'/profile/' + user.userId + '/manage'" class="r-btn profile">설정</router-link>
					<button @click="signout" class="r-btn logout">로그아웃</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ModalStatus, UsersRole } from '@/types/enums';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const signInStatus = ModalStatus.SIGNIN;
const signUpStatus = ModalStatus.SIGNUP;

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const user = computed(() => store.getters['users/getUser']);
const isAdmin = computed(() => user.value?.role === UsersRole.ADMIN);
const getSidebarStatus = computed(
	() => store.getters['sidebar/getSidebarStatus'],
);

const setSidebar = () => {
	store.commit('sidebar/SET_SIDEBAR');
};

const openModal = (status: ModalStatus) => {
	store.commit('auth/SET_IS_MODAL_OPEN', true);
	store.commit('auth/SET_MODAL_STATUS', status);
};

const signout = () => {
	localStorage.clear();
	store.commit('auth/SET_IS_LOGGED_IN', false);
	router.push('/');
};
</script>

<style src="@/styles/header.css" scoped></style>
