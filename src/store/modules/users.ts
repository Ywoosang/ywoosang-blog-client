// users.ts

import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState, UsersState, User } from '@/types/interfaces';
import { UsersRole } from '@/types/enums';
import {
	getUserProfile,
	getPublicUserProfile,
	getUserActivities,
	updateUser
} from '@/services/api/users';
import { updateProfileDto } from '@/types/dto';

const state: UsersState = {
	// 현재 로그인중인 사용자
	user: null,
	// 공개 프로필 추가
	publicProfile: null,
	activities: [],
	pageList: [],
	totalActivitiesCount: 0
};

export const mutations: MutationTree<UsersState> = {
	SET_USER(state, user: User) {
		state.user = user;
	},
	SET_PUBLIC_PROFILE(state, publicProfile: User) {
		state.publicProfile = publicProfile;
	},
	SET_USER_ACTIVITIES(state, activities: any) {
		state.activities = activities;
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
	SET_TOTAL_ACTIVITIES_COUNT(state,count) {
		state.totalActivitiesCount = count;
	}
};

export const actions: ActionTree<UsersState, RootState> = {
	async fetchUser({ commit }) {
		const { data } = await getUserProfile();
		const user = data;
		if(user) {
			commit('SET_USER', user);
		}
		return user;
	},
	async fetchUserActivities({ commit }, payload) {
		const { page, userId } = payload;
		const { data } = await getUserActivities(userId, { page });
		const comments = data.comments;
		const total = data.total;
		commit('SET_PAGE_LIST',{ total, page });
		commit('SET_TOTAL_ACTIVITIES_COUNT', total);
		commit('SET_USER_ACTIVITIES', comments);
	},
	async fetchPublicProfile({ commit }, userId) {
		const { data } = await getPublicUserProfile(userId);
		commit('SET_PUBLIC_PROFILE', data);
	},
	// 사용자 프로필 변경
	async updateUser({ commit }, updateProfileDto: updateProfileDto) {
		const { data } = await updateUser(updateProfileDto);
		commit('SET_USER', data);
	}
};

export const getters: GetterTree<UsersState, RootState> = {
	getUser: (state: UsersState) => state.user,
	getUserRole: (state: UsersState) =>
		state.user ? state.user.role : UsersRole.USER,
	getPublicProfile: (state: UsersState) => state.publicProfile,
	getUserActivities: (state: UsersState) => state.activities,
	getPageList: (state: UsersState) => state.pageList,
	getActivitiesCount: (state: UsersState) => state.totalActivitiesCount
};

const usersModule: Module<UsersState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default usersModule;
