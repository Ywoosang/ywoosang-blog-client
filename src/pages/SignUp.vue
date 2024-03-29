<template>
  <main>
    <register-title />
    <sign-up-form />
  </main>
</template>

<script>
import SignUpForm from "@/components/auth/SignUpForm.vue";
import RegisterTitle from "@/components/auth/RegisterTitle.vue";

export default {
  components: {
    RegisterTitle,
    SignUpForm,
  },
};
</script>

<style scoped>
main {
  max-width: 800px;
  padding: 0 10px;
  height: 100%;
}
</style>
