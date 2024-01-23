import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, TagState } from '@/types/interfaces';
import { getPublicTag, getTag } from '@/services/api/tag';
import { UsersRole } from '@/types/enums';
import { Tag } from '@/types/interfaces';
 

const state: TagState = {
    tag: null,
    pageList: []
};

export const mutations: MutationTree<TagState> = {
  SET_PAGE_LIST(state, payload) {
    const { total, page, limit } = payload;
    const currentPage = page ? page : 1;
    const postsPerPage = limit ? limit : 1;
    state.pageList = Array.from({ length: Math.ceil(total / postsPerPage) })
      .map((_, index) => {
        return {
          page: index+1,
          currentPage
        }
      });
  },
  SET_TAG(state, tag) {
    state.tag = tag;
  }
};

export const actions: ActionTree<TagState, RootState> = {
  async fetchTag({ commit }, payload) {
    try{
      const { id, userRole, page, limit } = payload;
      let response;
      if(userRole == UsersRole.ADMIN) {
        response = await getTag(id, page, limit);
      } else {
        response = await getPublicTag(id, page, limit);
      }
      const tag: Tag = response.data;
      const total = tag.posts?.length;
      commit('SET_TAG', tag);
      commit('SET_PAGE_LIST', { total, page, limit })
    } catch(e) {
      throw e;
    }
  },
};

const getters: GetterTree<TagState, RootState>  = {
  getTag: (state: TagState) => state.tag,
  getPageList: (state: TagState) =>  state.pageList
};

const tagModule: Module<TagState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default tagModule;