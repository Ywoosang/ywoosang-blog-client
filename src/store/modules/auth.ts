import { Module, MutationTree } from 'vuex';
import { signIn } from '@/services/api/auth';
import { RootState, AuthState } from '@/types/interfaces';

const state: AuthState = {
  isLoggedIn: null,
};

const mutations: MutationTree<AuthState> = {
  SET_IS_LOGGED_IN(state, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },
};

const actions = {
  async fetchSignIn({ commit }, userData) {
    const response = await signIn(userData);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    commit('SET_IS_LOGGED_IN', true);
    return response;
  },
};

const getters = {
  isLoggedIn: (state: AuthState) => state.isLoggedIn,
};

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default authModule;
