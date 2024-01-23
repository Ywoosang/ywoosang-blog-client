<template>
  <div class="user-info">
    <div class="user-avatar">
      <!-- Display user avatar or profile picture here -->
      <!-- Example: <img :src="user.avatarUrl" alt="User Avatar"> -->
    </div>
    <div class="user-details" v-if="getUser">
      <h2 class="user-nickname">{{ getUser.nickname }}</h2>
      <p class="user-email">{{ getUser.email }}</p>
      <p class="user-description">{{ getUser.description }}</p>
      <p class="user-role">{{ getUser.role }}</p>
      <p class="user-status">{{ getUser.status }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('users',['getUser'])
    },
    mounted() {

    }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  background-color: #333; /* Set background color for the avatar */
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  color: rgb(0, 0, 0); /* Set text color to white */
}

.user-nickname {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.user-email,
.user-description,
.user-role,
.user-status {
  margin-bottom: 10px;
}
</style>