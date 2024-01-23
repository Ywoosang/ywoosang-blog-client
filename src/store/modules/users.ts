import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState, UsersState, User } from '@/types/interfaces';
import { UsersRole } from '@/types/enums';
import { getUser } from '@/services/api/users';

const state: UsersState = {
  user: null
};

export const mutations: MutationTree<UsersState> = {
  SET_USER(state, user: User) {
    state.user = user;
  }
};

export const actions: ActionTree<UsersState, RootState> = {
  async fetchUser({ commit }) {
    try {
      const { data } = await getUser();
      commit('SET_USER', data);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export const getters: GetterTree<UsersState, RootState> = {
  getUser: (state: UsersState) => state.user,
  getUserRole: (state: UsersState) => { 
    return state.user ? state.user.role :  UsersRole.USER;
  }
};

const usersModule: Module<UsersState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default usersModule;
