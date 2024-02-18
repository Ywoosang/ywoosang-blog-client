import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faBars,
	faXmark,
	faLock,
	faLockOpen,
	faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import '@/styles/default.css';

library.add(
	faBars,
	faXmark,
	faLock,
	faLockOpen,
	faSquareGithub,
	faPenToSquare,
	faCheck,
);

const app = createApp(App);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
