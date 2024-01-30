<template>
<form @submit.prevent="submitForm" class="signup-form" novalidate>
    <div class="form-group">
      <label for="email">이메일:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="이메일을 입력하세요"
      />
    </div>
    <div class="error-message">
      <span v-if="!emailValid">올바른 이메일 형식을 입력해 주세요.</span>
    </div>
    <div class="form-group">
      <label for="userLoginId">아이디:</label>
      <input
        type="text"
        id="userLoginId"
        v-model="userLoginId"
        placeholder="4~20자여야 합니다."
      />
    </div>
    <div class="error-message">
      <span v-if="!userLoginIdValid">아이디는 4~20자여야 합니다.</span>
    </div>
    <div class="form-group">
      <label for="nickname">닉네임:</label>
      <input
        type="text"
        id="nickname"
        v-model="nickname"
        placeholder="2~10자여야 합니다."
      />
    </div>
    <div class="error-message">
      <span v-if="!nicknameValid">닉네임은 2~10자여야 합니다.</span>
    </div>
    <div class="form-group">
      <label for="password">비밀번호:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="6~15자의 영문 또는 숫자 또는 특수문자(@!) 여야 합니다."
        autocomplete="off"
      />
    </div>
    <div class="error-message">
      <span v-if="!passwordValid">비밀번호는 6~15자의 영문, 숫자, 특수문자(@!)만 가능합니다.</span>
    </div>
    <div class="form-group">
      <label for="passwordConfirm">비밀번호 확인:</label>
      <input
        type="password"
        id="passwordConfirm"
        v-model="passwordConfirm"
        placeholder="비밀번호를 한번 더 입력하세요"
      />
    </div>
    <div class="error-message">
      <span v-if="!passwordConfirmValid">비밀번호가 일치하지 않습니다.</span>
    </div>
    <div class="btn-wrapper">
      <button class="submit-btn" type="submit">
        회원가입
      </button>
      <button class="cancel-btn" @click="goToSignup">취소</button>
    </div>
  </form>
</template>

<script lang="ts">
import { signUp } from '@/services/api/auth';
import { AuthRegisterDto } from '@/types/dto';
import { defineComponent } from 'vue';

export default defineComponent({
data() {
    return {
      email: "" as string,
      userLoginId: "" as string,
      nickname: "" as string,
      password: "" as string,
      passwordConfirm: "" as string,
      // 검증
      emailValid: true as boolean,
      userLoginIdValid: true as boolean,
      nicknameValid: true as boolean,
      passwordValid: true as boolean,
      passwordConfirmValid: true as boolean
    };
  },
  methods: {
    async submitForm() {
        // this.validateEmail() 
        // this.validateUserLoginId()
        // this.validateNickname()
        // this.validatePassword()
        // this.validatePasswordConfirm();
        // if(!this.emailValid || !this.userLoginIdValid || !this.nicknameValid || !this.passwordValid || !this.passwordConfirmValid) return;
        try {
          const data: AuthRegisterDto = {
            email: this.email,
            userLoginId: this.userLoginId,
            nickname: this.nickname,
            password: this.password,
          }
          const user = await signUp(data);
          console.log(user);
        } catch(e) {
          console.log(e);
          console.log(e);
        }
        // axios 요청 처리
        

    },
    validateEmail() {
      this.emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    validateUserLoginId() {
      this.userLoginIdValid = /^.{4,20}$/.test(this.userLoginId);
    },
      validateNickname() {
      this.nicknameValid = /^[a-zA-Z가-힣]{2,10}$/.test(this.nickname);
    },
    validatePassword() {
      this.passwordValid =
        /^[a-zA-Z0-9!@]{6,15}$/.test(
          this.password
        );
    },
    validatePasswordConfirm() {
      this.passwordConfirmValid = this.password == this.passwordConfirm;
    },
    goToSignup() {
      this.$router.push('/signin');
    }
  }
});
</script>

<style scoped>
.signup-form {
}
.form-group {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.form-group label {
  min-width: 120px;
  line-height: 37px;
}
.form-group input {
  /* flex: 1; */
}
.error-message {
  height: 20px;
  text-align: end;
  font-size: 12px;
  color: red;
  padding: 4px 0px 0px 0px;
}

.btn-wrapper {
  text-align: center;
}
.btn-wrapper button {
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  margin: 0 0 0 5px;
  border: 1px solid #ddd;
}
.btn-wrapper .submit-btn {
  color: black;
}
.btn-wrapper .cancel-btn {
  background: #ffffff;
}
</style>