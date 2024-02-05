<template>
  <main>
    <profile-edit/>
  </main>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import ProfileEdit from "@/components/users/ProfileEdit.vue";

export default defineComponent({
  components: {
    ProfileEdit,
  },
});
</script>

<style>
</style>