import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { RootState, HeaderState } from '@/types/interfaces';

const state: HeaderState = {
	isDropdownOpen: false,
};

const mutations: MutationTree<HeaderState> = {
	TOGGLE_DROPDOWN(state) {
		state.isDropdownOpen = !state.isDropdownOpen;
	}
};

const getters: GetterTree<HeaderState, RootState> = {
	getDropdownStatus(state) {
		return state.isDropdownOpen;
	}
};
 
const headerModule: Module<HeaderState, RootState> = {
	namespaced: true,
	state,
	mutations,
	getters,
};

export default headerModule;
