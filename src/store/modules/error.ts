import { Module, MutationTree, GetterTree } from "vuex";
import { RootState, ErrorState } from "@/types/interfaces";
import { v4 as uuidv4 } from "uuid"; // ES Modules
import { MAX_MODAL_COUNT } from "@/consts";

const state: ErrorState = {
  modalList: [],
};

const mutations: MutationTree<ErrorState> = {
  ADD_MODAL(state, content: string) {
    const key = uuidv4();
    if (state.modalList.length == MAX_MODAL_COUNT) {
      state.modalList.shift();
    }
    state.modalList.push({
      key,
      content,
    });
  },
  REMOVE_MODAL(state, key) {
    state.modalList = state.modalList.filter((modal) => modal.key != key);
  },
};

const getters: GetterTree<ErrorState, RootState> = {
  getModalList: (state) => state.modalList,
};

const errorModule: Module<ErrorState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
};

export default errorModule;
