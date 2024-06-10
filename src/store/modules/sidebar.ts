import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { RootState, SidebarState } from '@/types/interfaces';
import { UsersRole } from '@/types/enums';
import { getSidebarTags, getSidebarPublicTags } from '@/services/api/tag';
import { getSidebarCategories, getSidebarPublicCategories } from '@/services/api/category';
import { getPublicCount, getTotalCount } from '@/services/api/post';

const state: SidebarState = {
  isOpen: false,
  categories: [],
  tags: [],
  selectedCategoryId: null,
  selectedTagId: null,
  postCount: 0
};

const mutations: MutationTree<SidebarState> = {
  SET_SIDEBAR(state) {
    state.isOpen = !state.isOpen;
  },
  SET_SIDEBAR_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_SIDEBAR_TAGS(state, tags) {
    state.tags = tags;
  },
  SET_TOTAL_POST_COUNT(state, count) {
    state.postCount = count;
  },
  SET_SELECTED_CATEGORY_ID(state, id: number) {
    state.selectedTagId = -1;
    state.selectedCategoryId = id;
  },
  SET_SELECTED_TAG_ID(state, id: number) {
    state.selectedCategoryId = -1;
    state.selectedTagId = id;
  }
};

const getters: GetterTree<SidebarState, RootState> = {
  getSidebarStatus(state) {
    return state.isOpen;
  },
  getSidebarCategories(state) {
    return state.categories;
  },
  getSidebarTags(state) {
    return state.tags;
  },
  getSelectedCategoryId(state) {
    return state.selectedCategoryId;
  },
  getSelectedTagId: state => state.selectedTagId,
  getPostCount(state) {
    return state.postCount;
  }
};

const actions: ActionTree<SidebarState, RootState> = {
  async fetchSideBar({ commit }, payload) {
    const userRole = payload;
    const postCountPromise = userRole == UsersRole.ADMIN ? getTotalCount() : getPublicCount();
    const tagPromise = userRole === UsersRole.ADMIN ? getSidebarTags() : getSidebarPublicTags();
    const categoryPromise = userRole === UsersRole.ADMIN ? getSidebarCategories() : getSidebarPublicCategories();

    const [postCountResponse, tagResponse, categoryResponse] = await Promise.all([
      postCountPromise,
      tagPromise,
      categoryPromise
    ]);

    const tags = tagResponse.data.tags;
    const categories = categoryResponse.data.categories;
    const postCount = postCountResponse.data.postCount;
    commit('SET_TOTAL_POST_COUNT', postCount);
    commit('SET_SIDEBAR_TAGS', tags);
    commit('SET_SIDEBAR_CATEGORIES', categories);
  }
};

const sidebarModule: Module<SidebarState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

export default sidebarModule;
