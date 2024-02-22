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
		<div class="activity-wrapper">
			<h1>작성한 댓글({{ totalActivitesCount }})</h1>
			<ul class="activity-list">
				<li v-for="(activity, index) in userActivities" :key="index" class="activity">
					<div class="info">
						<p>게시물에 <router-link style="color: rgb(63, 63, 63); font-weight: bold;"
								:to="`/post/${activity.post.id}?commentId=${activity.id}`">댓글</router-link>을
							작성하였습니다.</p>
						<div class="date">{{ formatDate(activity.createdAt) }}</div>
					</div>
					<div class="title">
						<router-link :to="`/post/${activity.post.id}`" style="font-weight:bold;">{{ activity.post.title
						}}</router-link>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils';

const store = useStore();
const route = useRoute();
const user = computed(() => store.getters['users/getPublicProfile']);
const userActivities = computed(() => store.getters['users/getUserActivities']);
const totalActivitesCount = computed(() => store.getters['users/getActivitiesCount'])

onMounted(async () => {
	const page = route.query.page || 1;
	const limit = route.query.limit || 8;
	await store.dispatch('users/fetchUserActivities', { userId: user.value.userId, page, limit });
})

watch(
	route,
	async (to, from) => {
		const page = to?.query.page || 1;
		await store.dispatch('users/fetchUserActivities', { userId: user.value.userId, page });
	}
);

</script>

<style scoped>
@import "@/styles/users/profile.css";
@import "@/styles/users/viewer.css";
</style>
