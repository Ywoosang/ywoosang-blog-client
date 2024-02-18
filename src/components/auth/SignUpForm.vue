<template>
	<form @submit.prevent="submitForm" class="signup-form" novalidate>
		<div class="form-group email-group">
			<label for="email">이메일</label>
			<input :value="email" disabled />
			<font-awesome-icon class="email-lock" icon="fa-solid fa-lock" />
		</div>
		<div class="form-group">
			<label for="userId">아이디</label>
			<input type="text" id="userId" v-model="userId" placeholder="아이디를 입력해 주세요" />
		</div>
		<div class="error-message">
			<span v-if="!idValid.valid">{{ idValid.message }}</span>
		</div>
		<div class="form-group">
			<label for="nickname">닉네임</label>
			<input type="text" id="nickname" v-model="nickname" placeholder="닉네임을 입력해 주세요" />
		</div>
		<div class="error-message">
			<span v-if="!nicknameValid.valid">{{ nicknameValid.message }}</span>
		</div>
		<div class="form-group">
			<label for="description">소개</label>
			<input type="text" id="description" v-model="description" placeholder="본인을 소개해 주세요" />
		</div>
		<div class="error-message">
			<span v-if="!descriptionValid.valid">{{ descriptionValid.message }}</span>
		</div>
		<div class="btn-wrapper">
			<button class="submit-btn" type="submit">회원가입</button>
			<button class="cancel-btn" @click="goHome">취소</button>
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
})

const descriptionValid = reactive({
	valid: true,
	message: ''
})

// 미들웨어에서 설정한 회원가입할 사용자 이메일
const email = store.getters['auth/getEmail'];

const submitForm = async () => {
	validateUserId();
	validateNickname();
	validateDescription();
	if (!idValid.valid || !nicknameValid.valid || !descriptionValid.valid)
		return;
	try {
		const data: AuthRegisterDto = {
			email: store.getters['auth/getEmail'],
			userId: userId.value,
			nickname: nickname.value,
			description: description.value,
		};
		await signUp(data);
		const hash = route.query.hash;
		console.log(`에러전${hash}`)
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
				console.log('로그인 필요');
				const hash = route.query.hash;
				console.log(`에러후${hash}`)
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
		idValid.message = '4~15자의 영문 또는 숫자를 입력하세요';
	} else {
		idValid.valid = true
		idValid.message = '';
	}
};

const validateNickname = () => {
	const result = /^[a-zA-Z가-힣0-9]{2,10}$/.test(nickname.value);
	if (!result) {
		nicknameValid.valid = false;
		nicknameValid.message = '2~10자의 영문 또는 한글 또는 숫자를 입력하세요';
	} else {
		nicknameValid.valid = true;
		nicknameValid.message = '';
	}
};

const validateDescription = () => {
	const result = /^.{0,200}$/.test(description.value);
	if (!result) {
		descriptionValid.valid = false;
		descriptionValid.message = '200자 이내로 입력해주세요.';
	} else {
		descriptionValid.valid = true;
		descriptionValid.message = '';
	}
};

const goHome = () => {
	router.push('/');
};
</script>

<style src="@/styles/auth/auth.css" scoped></style>
