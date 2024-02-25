import { Module, MutationTree, GetterTree } from 'vuex';
import { RootState, ErrorState } from '@/types/interfaces';

const state: ErrorState = {
	isModalOpen: false,
    modalContent: ''
};

const mutations: MutationTree<ErrorState> = {
	SET_IS_MODAL_OPEN(state, isOpen: boolean) {
		state.isModalOpen = isOpen;
	},
    SET_MODAL_CONTENT(state, content: string) {
        state.modalContent = content;
    }
};

const getters: GetterTree<ErrorState, RootState> = {
	isModalOpen: (state) => state.isModalOpen,
    getModalContent: (state) => state.modalContent
};
 
const errorModule: Module<ErrorState, RootState> = {
	namespaced: true,
	state,
	mutations,
	getters,
};

export default errorModule;
