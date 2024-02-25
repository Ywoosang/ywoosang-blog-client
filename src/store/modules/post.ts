import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, PostState, Post } from '@/types/interfaces';
import {
	getPublicPosts,
	getPosts,
	getPost,
	getPublicPost,
} from '@/services/api/post';
import { UsersRole } from '@/types/enums';

const state: PostState = {
	postList: [],
	total: null,
	pageList: [],
	// 게시물 조회
	post: null,
	editingPost: null,
};

export const mutations: MutationTree<PostState> = {
	SET_TOTAL(state, total: number) {
		state.total = total;
	},
	SET_POST_LIST(state, postList: Post[]) {
		state.postList = postList;
	},
	SET_PAGE_LIST(state, payload) {
		const { total, page } = payload;
		const currentPage = page ? page : 1;
		state.pageList = Array.from({
			length: Math.ceil(total / 8),
		}).map((_, index) => {
			return {
				page: index + 1,
				currentPage,
			};
		});
	},
	// 게시물 조회시 이용
	SET_CURRENT_POST(state, post) {
		state.post = post;
	},
	SET_EDITING_POST(state, post) {
		state.editingPost = post;
	},
};

export const actions: ActionTree<PostState, RootState> = {
	async fetchPostList({ commit }, payload) {
		const { userRole, page } = payload;
		let response;
		if (userRole == UsersRole.ADMIN) {
			response = await getPosts(page);
		} else {
			response = await getPublicPosts(page);
		}
		const { posts, total } = response.data;
		commit('SET_POST_LIST', posts);
		commit('SET_TOTAL', total);
		commit('SET_PAGE_LIST', { total, page });
	},
	async fetchPost({ commit }, payload) {
		let response;
		const { userRole, id } = payload;
		if (userRole == UsersRole.ADMIN) {
			response = await getPost(id);
		} else {
			response = await getPublicPost(id);
		}
		const post = response.data;
		commit('SET_CURRENT_POST', post);
		return post;
	},
	async fetchEditingPost({ commit }, payload) {
		const { id } = payload;
		const response = await getPost(id);
		const post = response.data;
		commit('SET_EDITING_POST', post);
	},
};

const getters: GetterTree<PostState, RootState> = {
	getPostList: (state: PostState) => state.postList,
	getTotal: (state: PostState) => state.total,
	getPageList: (state: PostState) => state.pageList,
	getPost: (state: PostState) => state.post,
	getEditingPost: (state: PostState) => state.editingPost,
};

const postModule: Module<PostState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default postModule;
