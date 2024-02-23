import { useStore } from 'vuex';

export default async function (to, from, next) {
	const store = useStore();
	const userRole = store.getters['users/getUserRole'];
	const id = to.params.id;
	try {
		const post = await store.dispatch('post/fetchPost', { userRole, id });
		document.title = post.title;
		const postId = store.getters['post/getPost'].id;
		await store.dispatch('comment/fetchComments', { postId });
	} catch (e) {
		return next({ path: '/404', replace: true });
	}
	next();
}
