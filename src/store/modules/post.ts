import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, PostState, Post } from '@/types/interfaces';
import { getPublicPosts, getPosts } from '@/services/api/post';
import { UsersRole } from '@/types/enums';

const state: PostState = {
  postList : [],
  total: null,
  pageList: []
};

export const mutations: MutationTree<PostState> = {
  SET_TOTAL(state, total: number) {
    state.total = total;
  },
  SET_POST_LIST(state, postList: Post[]) {
    state.postList = postList;
  },
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
  }
};

export const actions: ActionTree<PostState, RootState> = {
  async fetchPostList({ commit }, payload) {
    try{
      const { userRole, page, limit } = payload;
      let response;
      if(userRole == UsersRole.ADMIN) {
        response = await getPosts(page, limit);
      } else {
        response = await getPublicPosts(page, limit);
      }
      const { posts, total} = response.data;
      commit('SET_POST_LIST', posts);
      commit('SET_TOTAL', total);
      commit('SET_PAGE_LIST', { total, page, limit })
    } catch(e) {
      throw e;
    }
  },
};

const getters: GetterTree<PostState, RootState>  = {
  getPostList: (state: PostState) => state.postList,
  getTotal: (state: PostState) => state.total,
  getPageList: (state: PostState) =>  state.pageList
};

const postModule: Module<PostState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default postModule;
