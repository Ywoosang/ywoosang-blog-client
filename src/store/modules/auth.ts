import { GetterTree, Module, MutationTree } from 'vuex';
import { getEmail, signIn } from '@/services/api/auth';
import { RootState, AuthState } from '@/types/interfaces';
import { ModalStatus } from '@/types/enums';

const state: AuthState = {
	isModalOpen: false,
	isLoggedIn: null,
	modalStatus: ModalStatus.SIGNIN,
	//
	email: null,
};

const mutations: MutationTree<AuthState> = {
	SET_IS_LOGGED_IN(state, isLoggedIn: boolean) {
		state.isLoggedIn = isLoggedIn;
	},
	SET_IS_MODAL_OPEN(state, isModalOpen: boolean) {
		state.isModalOpen = isModalOpen;
	},
	SET_MODAL_STATUS(state, status: ModalStatus) {
		state.modalStatus = status;
	},
	SET_EMAIL(state, email: string) {
		state.email = email;
	},
};

const actions = {
	openLoginModal({ commit }) {
		commit('SET_IS_MODAL_OPEN', true);
		commit('SET_MODAL_STATUS', ModalStatus.SIGNIN);
	},
	async fetchLogin({ commit }, hash: string) {
		const authLoginDto = {
			hash,
		};
		const response = await signIn(authLoginDto);
		const { accessToken, refreshToken } = response.data;
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		commit('SET_IS_LOGGED_IN', true);
	},
	async fetchUserEmail({ commit }, hash: string) {
		const response = await getEmail(hash);
		const { email } = response.data;
		commit('SET_EMAIL', email);
	},
	logout({ commit }) {
		localStorage.clear();
		commit('SET_IS_LOGGED_IN', false);
	}
};

const getters: GetterTree<AuthState, RootState> = {
	isLoggedIn: (state: AuthState) => state.isLoggedIn,
	isModalOpen: (state: AuthState) => state.isModalOpen,
	getModalStatus: (state: AuthState) => state.modalStatus,
	getEmail: (state: AuthState) => state.email,
};

const authModule: Module<AuthState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default authModule;
