import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CommentError from '@/exceptions/comment';
import AuthError from '@/exceptions/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faBars,
	faXmark,
	faLock,
	faLockOpen,
	faCheck,
	faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import '@/styles/default.css';
import '@/styles/tui.css';

library.add(
	faBars,
	faXmark,
	faLock,
	faLockOpen,
	faSquareGithub,
	faPenToSquare,
	faCheck,
	faCaretDown
);

const app = createApp(App);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.errorHandler = (error: any, vm, info) => {
	if(error instanceof CommentError) {
		store.commit('error/ADD_MODAL', error.message);
	}
	if (error.response) {
		if(error.response.status === 401) {
			store.commit('error/ADD_MODAL', '로그인이 필요합니다.');
			store.dispatch('auth/openLoginModal');
		}
	}
	console.error('Global Error Handler', error, info);
};

app.mount('#app');
