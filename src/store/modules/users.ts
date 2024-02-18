// users.ts

import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState, UsersState, User } from '@/types/interfaces';
import { UsersRole } from '@/types/enums';
import {
	getUserProfile,
	getPublicUserProfile,
	updateUser,
} from '@/services/api/users';
import { updateProfileDto } from '@/types/dto';

const state: UsersState = {
	// 현재 로그인중인 사용자
	user: null,
	// 공개 프로필 추가
	publicProfile: null,
};

export const mutations: MutationTree<UsersState> = {
	SET_USER(state, user: User) {
		state.user = user;
	},
	SET_PUBLIC_PROFILE(state, publicProfile: User) {
		state.publicProfile = publicProfile;
	},
};

export const actions: ActionTree<UsersState, RootState> = {
	async fetchUser({ commit }) {
		const { data } = await getUserProfile();
		commit('SET_USER', data);
		return data;
	},

	async fetchPublicProfile({ commit }, userId) {
		const { data } = await getPublicUserProfile(userId);
		commit('SET_PUBLIC_PROFILE', data);
		return data;
	},
	// 사용자 프로필 변경
	async updateUser({ commit }, updateProfileDto: updateProfileDto) {
		const { data } = await updateUser(updateProfileDto);
		commit('SET_USER', data);
	},
};

export const getters: GetterTree<UsersState, RootState> = {
	getUser: (state: UsersState) => state.user,
	getUserRole: (state: UsersState) =>
		state.user ? state.user.role : UsersRole.USER,
	getPublicProfile: (state: UsersState) => state.publicProfile,
};

const usersModule: Module<UsersState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default usersModule;
