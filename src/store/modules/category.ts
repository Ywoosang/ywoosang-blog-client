import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, CategoryState, Category } from '@/types/interfaces';
import { getCategory, getPublicCategory } from '@/services/api/category';
import { UsersRole } from '@/types/enums';

const state: CategoryState = {
  category: null,
  pageList: [],
};

export const mutations: MutationTree<CategoryState> = {
  SET_PAGE_LIST(state, payload) {
    const { total, page } = payload;
    const currentPage = page ? page : 1;
    const postsPerPage = 8;
    state.pageList = Array.from({
      length: Math.ceil(total / postsPerPage),
    }).map((_, index) => {
      return {
        page: index + 1,
        currentPage,
      };
    });
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
};

export const actions: ActionTree<CategoryState, RootState> = {
  async fetchCategory({ commit }, payload) {
    try {
      const { id, userRole, page } = payload;
      let response;
      if (userRole == UsersRole.ADMIN) {
        response = await getCategory(id, page);
      } else {
        response = await getPublicCategory(id, page);
      }
      const category: Category = response.data;
      const total = category.posts?.length;
      commit('SET_CATEGORY', category);
      commit('SET_PAGE_LIST', { total, page });
    } catch (e) {
      console.log(e);
    }
  },
};

const getters: GetterTree<CategoryState, RootState> = {
  getCategory: (state: CategoryState) => state.category,
  getPageList: (state: CategoryState) => state.pageList,
};

const categoryModule: Module<CategoryState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default categoryModule;
