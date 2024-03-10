import { useStore } from 'vuex';

export default async function (to, from, next) {
	try {
		const userId = to.params.userId;
		if (!userId) return next({ path: '/404', replace: true });
		const store = useStore();
		await store.dispatch('users/fetchPublicProfile', userId);
		next();
	} catch (e) {
		// 사용자가 없는 경우 404 페이지로
		next({ path: '/404', replace: true });
	}
}
