import { useStore } from 'vuex';

export default async function (to, from, next) {
	const userId = to.params.userId;
	if (!userId) return next({ path: '/404', replace: true });
	const store = useStore();
	try {
		await store.dispatch('users/fetchPublicProfile', userId);
	} catch (e) {
		// 사용자가 없는 경우 404 페이지로
		console.log(e);
	}
	next();
}
