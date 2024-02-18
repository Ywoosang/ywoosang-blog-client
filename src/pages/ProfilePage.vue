<template>
	<main>
		<profile-info />
	</main>
</template>

<script lang="ts">
import ProfileInfo from '@/components/users/ProfileInfo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		ProfileInfo,
	},
});
</script>

<style></style>
