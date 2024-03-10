import { useStore } from 'vuex';

export default async function (to, from, next) {
	const store = useStore();
	const isLoggedIn = store.getters['auth/isLoggedIn'];
	if (!isLoggedIn) return next({ path: '/404', replace: true });
	const user = store.getters['users/getUser'];
	if (user.userId != to.params.userId) {
		return next({ path: '/404', replace: true });
	}
	next();
}
