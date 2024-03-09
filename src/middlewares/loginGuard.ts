import { useStore } from 'vuex';

export default async function (to, from, next) {
	const hash = to.query.hash;
	if (!hash) return next({ path: '/404', replace: true });
	const store = useStore();
	try {
		await store.dispatch('auth/fetchLogin', hash);
	} catch (e) {
		store.dispatch('auth/openLoginModal');
		store.commit('error/ADD_MODAL', '링크가 만료되었습니다. 다시 로그인해주세요.');
	}
	next({ path: '/' });
}
