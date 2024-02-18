import { useStore } from 'vuex';

export default async function (to, from, next) {
	const hash = to.query.hash;
	if (!hash) return next({ path: '/404', replace: true });
	const store = useStore();
	try {
		await store.dispatch('auth/fetchLogin', hash);
		console.log('로그인 가드 실행됌');
		return next({ path: '/' });
	} catch (e) {
		// 사용자가 없는 경우 404 페이지로
		console.log(e);
		return next({ path: '/404', replace: true });
	}
}
