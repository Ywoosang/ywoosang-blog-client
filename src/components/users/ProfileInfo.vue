<template>
	<div class="profile-container">
		<div class="avatar-wrapper">
			<div class="user-avatar">
				<img :src="user.profileImage" alt="프로필 이미지" />
			</div>
		</div>
		<div class="detail-wrapper">
			<div class="nickname-wrapper">
				<div class="view">
					<h2 class="nickname">{{ user.nickname }}</h2>
				</div>
			</div>
			<div class="description-wrapper">
				<div class="view">
					<p class="description">{{ user.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	computed: {
		...mapGetters('users', {
			user: 'getPublicProfile',
		}),
	},
	mounted() {},
});
</script>

<style src="@/styles/users/profile.css" scoped></style>
