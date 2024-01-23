 <template>
  <form @submit.prevent="submitForm" class="signup-form" novalidate>
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
      <span v-if="!userLoginIdValid">4~20자의 올바른 아이디를 입력하세요</span>
    </div>
    <div class="form-group">
      <label for="password">비밀번호:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="6~10자의 영문, 숫자, 특수문자(@!)여야 합니다."
      />
    </div>
    <div class="error-message">
      <span v-if="!passwordValid"
        >6~10자 영문, 숫자, 특수문자(@!)를 각각 하나 이상 포함한 올바른
        비밀번호를 입력하세요</span
      >
    </div>
    <div class="btn-wrapper">
      <button class="submit-btn" type="submit">로그인</button>
      <button class="cancel-btn" @click="goToHome">홈으로</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex'

export default defineComponent({
  data() {
    return {
      userLoginId: "",
      password: "",
      userLoginIdValid: true,
      passwordValid: true,
    };
  },
  methods: {
    ...mapActions('users', ['fetchUser']),
    ...mapActions('auth', ['fetchSignIn']),
    async submitForm() {
      this.validateUserLoginId();
      this.validatePassword();
      if (!this.userLoginIdValid || !this.passwordValid) return;
      try {
        const userData = {
          userLoginId: this.userLoginId,
          password: this.password,
        };
        await this.fetchSignIn(userData);
        await this.fetchUser();
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    validateUserLoginId() {
      this.userLoginIdValid = /^.{4,20}$/.test(this.userLoginId);
    },
    validatePassword() {
      this.passwordValid =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!])[A-Za-z\d@!]{6,10}$/.test(
          this.password
        );
    },
    goToHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
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