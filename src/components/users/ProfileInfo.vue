<template>
  <div class="user-info">
    <div class="user-avatar">
      <img :src="user.profileImage" alt="User Avatar">
    </div>
    <div class="user-details" v-if="user">
      <h2 class="user-nickname">{{ user.nickname }}</h2>
      <p class="user-email">{{ user.email }}</p>
      <p class="user-description">{{ user.description }}</p>
      <p class="user-role">{{ user.role }}</p>
      <p class="user-status">{{ user.status }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters('users',{
            user: 'getPublicProfile'
        })
    },
    mounted() {
        
    }
})
</script>

<style src="@/styles/users/profile.css" scoped>
</style>